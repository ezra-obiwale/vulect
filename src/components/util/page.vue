<template>
  <component :is="theDashboard" :sidebar="sidebar" :submenu="submenu" :profilesubmenu="profilesubmenu" :actions="actions" :error.sync="error"
    :emptySet="emptySet">
    <loading v-if="blockWithLoader"></loading>
    <alert></alert>
    <div slot="empty-message">
      <slot name="empty-data-message"></slot>
    </div>
    <slot :data="data" name="content">
      <div class="row" v-if="card">
        <div id="boxes">
          <div :class="card" v-for="(crd, index) in data" :key="crd.id">
            <slot :item="crd" :index="index" name="card-template">
              {{ crd }}
            </slot>
          </div>
        </div>
      </div>
      <div class="row" v-if="table">
        <div class="user-table-container">
          <app-table :selectable="table.selectable" :sn="table.sn" :headers="table.headers" :moreBtn="table.moreBtn" :rowData="table.rowData" :data="data" :event="table.event" :rows="table.rows"></app-table>
        </div>
      </div>
    </slot>
    <modal v-if="modal" id="data" :title="modalTitle" closeBtnText="Close" :actionBtnText="saveBtnText" :loading="modalLoader">
      <slot :item="currentData" :index="viewingIndex" name="modal-form">
        <form class="form-horizontal">
          <div class="tabbable-panel" v-if="modal.tabs">
            <div class="tabbable-line">
              <ul class="nav nav-tabs ">
                <template v-for="tab in modal.tabs">
                  <li :class="{active : tab.active}" :key="tab.title" v-if="showTab(tab)">
                    <a :href="`#${tab.title.replace(/\s/g, '')}`" @click.prevent="openTab">
                      {{ tab.title }}
                    </a>
                  </li>
                </template>
              </ul>
              <div class="tab-content">
                <template v-for="(tab, index) in modal.tabs" v-if="showTab(tab)">
                  <div class="tab-pane" :key="tab.title" :class="{active:tab.active}" :id="`${tab.title.replace(/\s/g, '')}`">
                    <slot :tab="tab" :index="index" :name="indexed('modal-tab-', index)">
                      <form-fields :fields="tab.fields" :for="id" :fieldData="currentData" :create="create"></form-fields>
                    </slot>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <form-fields v-else-if="modal.fields" :fields="modal.fields" :create="create" :for="id" :fieldData="currentData"></form-fields>
          <error-message :error="error"></error-message>
        </form>
      </slot>
    </modal>
    <div class="modal fade" id="upload" tabindex="-1" role="dialog" aria-labelledby="uploadLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="uploadLabel">Upload Students</h4>
          </div>
          <div class="modal-body">
            <div class="alert alert-info" role="alert">Download students excel template
              <a href="" class="pull-right" style="font-weight: 600">Click here</a>
            </div>
            <div class="">
              <div class="input-group image-preview">
                <input placeholder="" type="text" class="form-control image-preview-filename" disabled="disabled">
                <span class="input-group-btn">
                  <button type="button" class="btn btn-default image-preview-clear" style="display:none;">
                    <span class="glyphicon glyphicon-remove"></span> Clear </button>
                  <!-- image-preview-input -->
                  <div class="btn btn-default image-preview-input">
                    <span class="glyphicon glyphicon-folder-open"></span>
                    <span class="image-preview-input-title">Browse</span>
                    <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview" />
                    <!-- rename it -->
                  </div>
                  <button type="button" class="btn btn-labeled btn-primary">
                    <span class="btn-label">
                      <i class="glyphicon glyphicon-upload"></i>
                    </span>Upload</button>
                </span>
              </div>

              <br />
              <div class="upload-drop-zone" id="drop-zone"> Or drag and drop files here </div>
              <br />
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                  <span class="sr-only">60% Complete</span>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <item-view slot="view-info" v-if="view" :title="view.title" :size="view.width">
      <slot :index="viewingIndex" :item="currentData" name="item-view">
        <div class="tabable-content" style="padding-top:0;padding-bottom:0">
          <div class="row" v-if="view.card">
            <div class="col-md-3" v-if="view.card.image">
              <img v-if="view.card.image.src && view.card.image.src !== '#'" :src="view.card.image.src" :alt="view.card.image.alt" :class="view.card.image.class" />
              <span v-else class="ion-person f-lg"></span>
            </div>
            <div class="col-md-9" style="margin-top: 27px;" v-if="view.card.lines">
              <template v-for="line in view.card.lines">
                <span :class="line.class" :key="line.fields.join('')">
                  <template v-for="field in line.fields">
                    <template v-if="notEmpty(field)">
                      {{ viewing[field] }}
                    </template>
                    <template v-else>
                      <span class="text-capitalize">{{ emptyText(field) }}:</span>
                      <span class="empty-cell"></span>
                    </template>
                  </template>
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="tabbable-line" v-if="view.tabs">
          <tabs id="item-view" :tabs="view.tabs">
            <template slot="content" scope="cur">
              <tab :scope="cur">
                <div class='row user-profile'>
                  <div class='tabable-content'>
                    <div v-if="cur.tab.fields" class="col-md-12 table-responsive">
                      <table class="table">
                        <tbody>
                          <template v-for="tab in cur.tab.fields">
                            <tr :key="tab.name">
                              <td v-html="tab.label" :class="tab.labelClass"></td>
                              <td v-if="viewing[tab.name] || viewing[tab.name] == 0" class="fater" :class="tab.class">{{ viewing[tab.name] }}</td>
                              <td v-else class="fater empty-cell" :class="tab.class">{{ viewing[tab.name] }}</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </tab>
            </template>
          </tabs>
        </div>
      </slot>
    </item-view>
    <slot name="more-content"></slot>
  </component>
</template>

<style scoped>
#boxes {
  margin-left: -15px;
  margin-right: -15px;
}
</style>

<script>
import Dashboard from "@/components/dashboard";
import AppTable from "@/components/util/table";
import FormFields from "@/components/snippets/form-fields";
import ItemView from "@/components/snippets/item-view";
import ErrorMessage from "@/components/snippets/error-message";
import Modal from "@/components/util/modal";
import Tabs from "@/components/util/tabs";
import Tab from "@/components/util/tab";
import Loading from "@/components/util/loading";
import Alert from "@/components/util/alert";

// CONFIG KEY:
// sidebar (object), submenu (object), profilesubmenu (boolean), actions (object)
// id (string), url (string), modal (object), view (object), fields (array)

// modal && view keys: tabs (array) [- title (string), fields (array)], title (string)
// field keys: name, type, label, class, options (array), labelClass
// option keys: label, value, labelClass, class, checked, selected

export default {
  name: "Page",
  props: {
    actions: Object,
    additionalData: Object,
    card: String,
    dashboard: Object,
    error: {
      type: String,
      default: ''
    },
    id: {
      required: true,
      type: String
    },
    modal: Object,
    profilesubmenu: Object,
    sidebar: Object,
    submenu: Object,
    table: Object,
    url: String,
    view: Object
  },
  data() {
    return {
      justified: false,
      viewingIndex: -1,
      data: [],
      newData: {},
      editingData: {},
      tabHasNext: true,
      create: true,
      loadingData: true,
      blockWithLoader: false,
      modalLoader: false
    };
  },
  computed: {
    theDashboard() {
      return this.dashboard || Dashboard;
    },
    emptySet() {
      return {
        loading: this.loadingData,
        data: this.data
      };
    },
    modalTitle() {
      return (this.create ? 'Add New ' : 'Edit ') + this.modal.title;
    },
    saveBtnText() {
      if (!this.modal.tabs) return 'Save';
      return this.tabHasNext ? 'Next &rarr;' : 'Finish';
    },
    currentData: {
      get() {
        let data = this.newData;
        if (!this.create) {
          this.editingData = {};
          Object.assign(this.editingData, this.data[this.viewingIndex]);
          data = this.editingData;
        }
        if (this.store.state.sd) data.organization_id = this.store.state.sd.id;
        return data;
      },
      set(data) {
        if (this.create) this.newData = data;
        else this.editingData = data;
      }
    },
    viewing: {
      get() {
        if (this.viewingIndex < 0) return {};
        return this.data[this.viewingIndex];
      },
      set(data) {
        this.data[this.viewingIndex] = data
      }
    },
  },
  components: {
    Dashboard,
    AppTable,
    ItemView,
    FormFields,
    ErrorMessage,
    Modal,
    Tabs,
    Tab,
    Loading,
    Alert,
  },
  methods: {
    sendData(callback) {
      if (!callback) return;
      callback(this.data, this.editingData, this.viewingIndex, this.create);
    },
    clickedSubmenu(e) {
      this.create = true;
    },
    show(index, e) {
      this.viewingIndex = index;
      this.eventBus.$emit('viewing.' + this.id, this.viewing, this.viewingIndex);
      this.error = '';
    },
    edit(index, e) {
      if (!this.modal) return;
      this.editByIndex(index);
    },
    editByIndex(index) {
      this.viewingIndex = index;
      this.eventBus.$emit('editing.' + this.id, this.viewing);
      this.create = false;
      $('#data-modal').modal('show');
    },
    deleteEvent(index, e) {
      this.eventBus.$emit('show.delete', {
        type: this.id,
        index: index
      });
      this.error = '';
    },
    deleteConfirmed(action) {
      this.delete(action.index);
    },
    modalClosed() {
      $('#data-modal').find('.nav-tabs>li.active, .tab-pane.active')
        .each(function() {
          $(this).removeClass('active')
            .parent().children(':first-child')
            .addClass('active')
            .get(0).focus();
        });
    },
    indexed(label, index) {
      return label + (index + 1);
    },
    notEmpty(field) {
      let allowEmpty = true,
        value = this.viewing[field];
      if (field.startsWith('!')) {
        field = field.substr(1);
        allowEmpty = false;
      }
      return value || value == 0 || allowEmpty;
    },
    emptyText(field) {
      if (field.startsWith('!')) field = field.substr(1);
      return field.replace(/_/g, ' ');
    },
    updateData(key, value) {
      this.set(this.currentData, key, value);
    },
    resetNewData() {
      this.tabHasNext = this.modal && this.modal.tabs && this.modal.tabs.length > 1;
      this.newData = {};
      if (this.store.state.sd) this.newData.organization_id = this.store.state.sd.id;
    },
    showTab(tab) {
      return (this.create && !tab.editOnly) || (!this.create && !tab.createOnly);
    },
    openTab(e) {
      let $target = $(e.target).parent('li');
      if (!this.reportModalValidity()) return;
      this.tabHasNext = $target.next().length > 0;
      $target.addClass('active').siblings().removeClass('active');
      $target.closest('ul').siblings('.tab-content').children($(e.target).attr('href'))
        .addClass('active').siblings().removeClass('active');
    },
    next(e) {
      if (!this.tabHasNext) return this.save(e);
      if (!this.reportModalValidity()) return;

      let $modal = $(e.target).closest('.modal'),
        self = this;

      $modal.find('.nav-tabs>li.active, .tab-pane.active')
        .each(function(i, v) {
          let $current = $(v).removeClass('active').next().addClass('active');
          self.tabHasNext = $current.next().length > 0;
        });
    },
    save(e) {
      this.error = '';
      if (!$(e.target).closest('.modal').find('form')
        .get(0).reportValidity()) return;
      let method = 'post',
        url = this.url.split('?')[0],
        data = this.clone(this.currentData),
        on = 'onCreate';

      if (!this.create) {
        method = 'put';
        url += '/' + data.id;
        on = 'onEdit';
      }
      if (this.additionalData) {
        let _data = this.clone(this.additionalData);
        for (let a in _data) {
          data[a] = _data[a];
        }
      }
      let remove = this.deepValue(on + '.removeAttr', this.modal);
      if (remove) {
        remove.forEach(key => {
          this.deepDelete(key, data);
        });
      }
      this.eventBus.$emit('modal.form.beforeSubmit', url, data, this.create);
      this.http[method](url, data)
        .then(resp => {
          if (this.create) {
            this.push(this.data, resp.data);
            this.newData = {};
            this.eventBus.$emit('show-success', "Saved successfully");
          }
          else {
            this.set(this.data, this.viewingIndex, resp.data);
            this.eventBus.$emit('show-success', "Edit successfull");
          };
          this.eventBus.$emit('modal.form.submitted', resp, this.create);
          if (this.create) {
            let editOnCreate = this.deepValue('onCreate.edit', this.modal);
            if (editOnCreate) {
              this.editByIndex(this.data.length - 1);
              // make tab with index active
              if (typeof editOnCreate === 'object' && editOnCreate.hasOwnProperty('tabIndex')) {
                setTimeout(function() {
                  let $modal = $(e.target).closest('.modal');
                  $modal.find('.nav-tabs>li, .tab-pane').removeClass('active');
                  let tabIndex = editOnCreate.tabIndex + 1,
                    $current = $modal.find('.nav-tabs>li:nth-child(' + tabIndex + '),'
                      + ' .tab-pane:nth-child(' + tabIndex + ')').addClass('active');
                  console.log($current);
                  self.tabHasNext = $current.next().length > 0;
                });
              }
              return;
            }
          }
          $('#data-modal.modal').modal('hide');
        })
        .catch(resp => {
          this.processErrors(resp);
        });
    },
    delete(index) {
      console.log(JSON.stringify(this.url, null, 2));
      console.log("index:", index);
      this.http.delete(this.url.split('?')[0] + '/' + this.data[index].id)
        .then(resp => {
          this.data.splice(index, 1);
          $('#delete-modal.modal').modal('hide');
          this.eventBus.$emit("show-success", "Delete successful");
        })
        .catch(resp => {
          this.processErrors(resp);
          this.eventBus.$emit("show-error", "Error: Failed to delete");
        });
    },
    updatePageData(data, index) {
      this.set(this.data, index, data);
    },
    ajaxStarted() {
      this.modalLoader = true;
    },
    ajaxEnded() {
      this.modalLoader = false;
    },
  },
  created() {
    // button events
    this.eventBus.$on('submenu.button.clicked', this.clickedSubmenu);
    this.eventBus.$on('show.' + this.id, this.show);
    this.eventBus.$on('edit.' + this.id, this.edit);
    this.eventBus.$on('delete.' + this.id, this.deleteEvent);
    this.eventBus.$on('delete.' + this.id + '.confirmed', this.deleteConfirmed);
    if (this.modal && !this.modal.ignoreBtns) {
      this.eventBus.$on('data-modal.action', this.next);
      this.eventBus.$on('data-modal.closed', this.modalClosed);
    }
    // field events
    this.eventBus.$on('textarea.changed', this.updateData);
    this.eventBus.$on('input.changed', this.updateData);
    this.eventBus.$on('file.selected', this.updateData);
    this.eventBus.$on('option.selected', this.updateData);

    this.eventBus.$on(this.id + '.update-page-data', this.updatePageData);
    this.eventBus.$on(this.id + '.page-data', this.sendData);

    this.eventBus.$on('ajax.started', this.ajaxStarted);
    this.eventBus.$on('ajax.ended', this.ajaxEnded);
  },
  beforeDestroy() {
    this.eventBus.$off('submenu.button.clicked', this.clickedSubmenu);
    this.eventBus.$off('show.' + this.id, this.show);
    this.eventBus.$off('edit.' + this.id, this.edit);
    this.eventBus.$off('delete.' + this.id, this.deleteEvent);
    this.eventBus.$off('delete.' + this.id + '.confirmed', this.deleteConfirmed);
    this.eventBus.$off('data-modal.action', this.next);
    this.eventBus.$off('data-modal.closed', this.modalClosed);
    this.eventBus.$off('textarea.changed', this.updateData);
    this.eventBus.$off('input.changed', this.updateData);
    this.eventBus.$off('file.selected', this.updateData);
    this.eventBus.$off('option.selected', this.updateData);
    this.eventBus.$off(this.id + '.update-page-data', this.updatePageData);
    this.eventBus.$off(this.id + '.page-data', this.sendData);

    this.eventBus.$off('ajax.started', this.ajaxStarted);
    this.eventBus.$off('ajax.ended', this.ajaxEnded);
  },
  beforeMount() {
    let self = this;
    if (this.url) {
      if (this.table) this.table.data = this.data;
      this.http.get(this.url)
        .then(resp => {
          this.push(this, resp.data, 'data');
          this.eventBus.$emit('page.data.loaded', resp.data);
          this.loadingData = false;
        })
        .catch(resp => {
          this.loading = false;
          this.processErrors(resp);
        });
    }
    else this.loadingData = false;
    $('#data-modal').on('hide.bs.modal', () => {
      this.resetNewData();
      this.error = '';
    });
    this.resetNewData();
    if (this.submenu && this.submenu.button) this.submenu.button.modalId = 'data-modal';
    if (this.table) this.table.event = this.id;
  },
  mounted() {
    this.tabHasNext = this.modal && this.modal.tabs && this.modal.tabs.length > 1;
  },
}
</script>
