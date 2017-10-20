import http from '@/helpers/http';
import AppStore from '@/store/app';
import EventBus from '@/helpers/event-bus';

export default {
  data() {
    let obj = {
      http: http,
      store: AppStore,
      eventBus: EventBus,
      tempState: {},
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    // add `error` if no error prop
    if (!this.$props || !this.$props.hasOwnProperty('error'))
      obj.error = '';
    else obj.errorInProps = true;
    return obj;
  },
  methods: {
    clone(obj) {
      if (typeof obj === 'object')
        return JSON.parse(JSON.stringify(obj));
      return {};
    },
    currentOrganization() {
      return this.fromStore('sd');
    },
    currentUser() {
      return this.fromStore('sd').cui;
    },
    deepDelete(target, baseObject) {
      let value = baseObject || {},
        parts = target.split('.'),
        last = parts.pop(parts.length - 1),
        next = parts.shift();

      if (Array.isArray(baseObject) && next === '*') {
        parts.push(last);
        let joined = parts.join('.');
        baseObject.forEach((val, i) => {
          this.deepDelete(joined, baseObject[i]);
        });
      }
      else {
        while (next !== undefined) {
          let cur = value[next];
          if (typeof cur === 'object') {
            parts.push(last);
            return this.deepDelete(parts.join('.'), value[next]);
          }
          else
            value = value[next];
          next = parts.shift();
        }

        if (Array.isArray(value))
          value.splice(last, 1);
        else if (typeof value === 'object')
          delete value[last];
      }
      return baseObject;
    },
    deepValue(target, baseObject, def) {
      if (!target) return def;
      let value = baseObject || {},
        parts = target.split('.');
      for (let i = 0; i < parts.length; i++) {
        if (!value) break;
        let cur = value[parts[i]];
        value = cur;
      }
      return value !== undefined && value !== null
        ? value : def;
    },
    env(key, def, noeval) {
      let env = process.env[key.toUpperCase()];
      if (env !== undefined) {
        if (noeval) return env;

        try {
          return eval(env);
        }
        catch (e) {
          return env;
        }
      }
      return def;
    },
    findBy(key, value, data) {
      if (this.tempState[value]) return this.tempState[value];
      let result = null;
      if (Array.isArray(data)) {
        result = data.find(function (item) {
          return item[key] == value;
        });
      }
      else {
        for (let a in data) {
          if (data[a][key] == value) {
            result = data[a];
            break;
          }
        }
      }
      if (result) this.tempState[result[key]] = result;
      return result || {};
    },
    fromStore(key, remove) {
      let value = this.store.state[key];
      if (remove)
        this.store.dispatch('remove', key);
      return value;
    },
    getTargets(obj, key, asIs) {
      if (!asIs && typeof key === 'string' && key.indexOf('.') !== -1) {
        let parts = key.split('.');
        key = parts.pop();
        parts.forEach(part => {
          if (Array.isArray(obj)) {
            while (obj[part] === undefined) {
              obj.push({});
            }
          }
          else if (!obj[part]) {
            obj[part] = {};
          }
          obj = obj[part];
        });
      }
      return {
        key: key,
        obj: obj
      };
    },
    notify(message, type) {
      type = type || 'success';
      if (type === 'danger') {
        if (!this.errorInProps) this.error = message;
        return message;
      }
      else {
        alert(type + ': ' + message);
      }
    },
    organizationId() {
      return this.currentOrganization().id;
    },
    processErrors(resp, def) {
      if (!resp) {
        this.error = 'Request was not completed!';
        return this.error;
      }
      let error = def || '';
      error = 'An error occured! Check console for details.';

      // toekn error
      if (resp.errors && resp.errors.code === 10118) {
        this.fromStore('sd', true);
        $('.modal').modal('hide');
        setTimeout(() => {
          // go to login page after js is done
          this.$router.push('/login');
        }, 500);
        error = 'Session expired! Redirecting to login page.';
      }
      // return this.notify(error, 'danger');
      return this.eventBus.$emit('show-error', error, 8000);
    },
    pull(obj, key) {
      let targets = this.getTargets(obj, key);
      if (Array.isArray(targets.obj)) {
        return targets.obj.splice(targets.key, 1)[0];
      }
      else if (targets.obj) {
        return this.$delete(targets.obj, targets.key);
      }
    },
    pullValue(obj, value) {
      let pos,
        targets = this.getTargets(obj, key);
      if (Array.isArray(targets.obj)) {
        pos = targets.obj.indexOf(value);
        if (pos === -1) return;
      }
      else if (targets.obj) {
        let _value = typeof value === 'object'
          ? JSON.stringify(value)
          : value;
        for (let a in targets.obj) {
          let _value2 = typeof targets.obj[a] === 'object'
            ? JSON.stringify(targets.obj[a])
            : targets.obj[a];

          if (_value == _value2) {
            pos = a;
            break;
          }
        }
      }
      if (targets.obj) this.pull(targets.obj, pos);
    },
    push(obj, value, key, asIs) {
      let targets = this.getTargets(obj, key, asIs);
      if (Array.isArray(targets.obj)) {
        if (targets.key === undefined) obj.push(value);
        else obj.splice(targets.key, 0, value);
      }
      else if (targets.obj) {
        this.$set(targets.obj, targets.key, value);
      }
    },
    range(start, end, step) {
      let range = [],
        increment = start < end,
        current = start;
      step = step || 1;
      while (current !== end) {
        range.push(current);
        if (increment) current += step;
        else current -= step;
      }
      return range;
    },
    reportModalValidity() {
      let $form = $('.modal.in form'),
        $panel = $form.find('.tabbable-panel'),
        valid = true,
        $container;
      if ($panel.length) {
        $container = $panel.find('.tab-content>.active');
      }
      else {
        $container = $form;
      }
      $container.find('[required]')
        .each(function () {
          if (!$(this).val() && $(this).val() !== 0) {
            valid = false;
            return false;
          }
        });
      if (!valid) $form.get(0).reportValidity()
      return valid;
    },
    set(obj, key, value) {
      if (!key) return;
      let targets = this.getTargets(obj, key);
      if (Array.isArray(targets.obj)) {
        targets.obj.splice(targets.key, 1, value);
      }
      else if (targets.obj) {
        this.push(targets.obj, value, targets.key);
      }
    },
    toStore(key, value) {
      return this.store.dispatch('set', { key: key, value: value });
    }
  }
};
