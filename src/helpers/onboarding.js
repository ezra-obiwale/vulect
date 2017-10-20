import store from '@/store/onboarding';
import http from '@/helpers/http';
import PreviousNext from '@/pages/onboarding/components/previous-next';

const Onboarding = {
  store: store,
  start(e) {
    e.preventDefault();
    store.dispatch('resetData');
    this.$router.replace(e.target.getAttribute('href'));
  },
  component(index, props, form, requestCallback) {
    const _component = {
      components: {
        'previous-next': PreviousNext
      },
      computed: {
        data: {
          get() { return store.state.data[index]; },
          set(value) { store.dispatch('updateData', { index: index, value: value }); }
        },
        customDomain() {
          return store.state.data[0].custom_domain;
        },
        loading() {
          return store.state.loading;
        }
      },
      methods: {
        sendData(e) {
          e.preventDefault();
          this.error = '';
          if (form) {
            // required entries not completed
            if (!form[0].reportValidity()) return;

            let files = form[0].querySelectorAll('[type="file"]'),
              options = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              };
            // form has file
            if (files.length) {
              var fd = new FormData();
              files.forEach(function (file) {
                if (file.files.length)
                  fd.append(file.name, file.files[0]);
              });
              for (let a in this.data) {
                fd.append(a, this.data[a]);
              }
            }
            // send json data
            else {
              options = {};
              var fd = this.data;
            }
            const self = this;
            let method = 'post',
              url = '/on-board/step' + (index + 1);

            // current step has been previously saved
            if (store.state.saved >= store.state.step) {
              method = 'put';
              url += '/' + store.state.data[1].organization_id;
              // nothing changed
              if (JSON.stringify(store.state.previous) === JSON.stringify(store.state.data[index])) {
                return this.next(e);
              }
            }
            store.dispatch('update', { key: 'loading', value: true });
            http[method](url, fd, options)
              .then(resp => {
                if (typeof requestCallback === 'function') requestCallback.call(store, resp.data);
                store.dispatch('update', { key: 'loading', value: false });
                store.dispatch('update', { key: 'saved', value: store.state.step });
                self.next(e);
              })
              .catch(resp => {
                this.processErrors(resp);
                store.dispatch('update', { key: 'loading', value: false });
              });
          }
          else this.next(e);
        },
        next(e) {
          store.dispatch('incrementStep');
          if (store.state.saved >= store.state.step)
            store.dispatch('update', { key: 'previous', value: store.state.data[index + 1] });
          else
            store.dispatch('update', { key: 'previous', value: {} });

          let href = e.target.getAttribute('href');
          if (href && href.startsWith('//')) {
            store.dispatch('resetData');
            location.replace(href);
          }
          else this.$router.replace(href);
        },
        previous(e) {
          e.preventDefault();
          store.dispatch('update', { key: 'previous', value: store.state.data[index - 1] })
          store.dispatch('decrementStep');
          this.error = '';
          this.$router.replace(e.target.getAttribute('href'));
        }
      }
    };
    // set up computed properties
    if (Array.isArray(props)) {
      props.forEach(function (prop) {
        _component.computed[prop] = {
          get() { return this.data[prop] },
          set(value) { store.dispatch('updateData', { index: index, key: prop, value: value }) }
        };
      });
    }
    return _component;
  }
};
export default Onboarding;
