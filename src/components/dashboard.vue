<template>
  <div>
    <view-info>
      <slot name="view-info"></slot>
    </view-info>
    <sidebar v-if="sidebar" :active="sidebar.active" :header="theSidebar.header" :links="theSidebar.links"></sidebar>
    <div class="content-wrapper">
      <div class="col-md-12 no-padding">
        <navbar :navs="navs"></navbar>
        <empty-dataset v-if="emptySet" :data="emptySet.data" :loading="emptySet.loading" :submenu="submenu" :message="emptySet.message">
          <slot name="empty-message">
            blah balh
          </slot>
        </empty-dataset>
        <submenu v-if="submenu" :title="submenu.title" :links="submenu.links" :button="submenu.button" :loading="showSubmenuLoader"></submenu>
        <profile-submenu v-if="profilesubmenu"></profile-submenu>
        <div class="row">
          <div class="col-md-12" style="padding:0 60px; height: 100vh">
            <actions v-if="actions" :filters="actions.filters" :options="actions.options"></actions>
            <error-message :error="error"></error-message>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <modal id="delete" title="Confirm Delete" closeBtnText="Cancel" actionBtnText="Yes, delete" :small="true">
      <p>
        Are you sure you want to perform this delete action?
      </p>
    </modal>
  </div>
</template>

<script>
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import Submenu from "@/components/layout/submenu";
import ProfileSubmenu from "@/components/layout/profilesubmenu";
import ViewInfo from "@/components/layout/view-info";
import Actions from "@/components/layout/actions";
import EmptyDataset from "@/components/layout/empty-dataset";

import Modal from '@/components/util/modal';
import ErrorMessage from "@/components/snippets/error-message";

import active from '@/pages/active';
import sidebars from '@/sidebars';

export default {
  props: {
    actions: {
      type: Object
    },
    emptySet: {
      type: Object
    },
    error: {
      type: String,
      default: ''
    },
    profilesubmenu: {
      type: Boolean
    },
    sidebar: {
      type: Object
    },
    submenu: {
      type: Object
    },
  },
  // default() {
  //   return {
  //     debug: true,
  //     action: {}
  //   }
  // },
  data(){
    return {
      showSubmenuLoader: true
    };
  },
  computed: {
    navs() {
      let navs = [];
      active.forEach(mod => {
        try {
          // get module navs
          let nav = require('@/pages/' + mod + '/navbar').default;
          if (!nav.header) nav.header = 'NAV #';
          // add to navs array
          navs = navs.concat(nav);
        }
        catch (e) {
        }
      });
      return navs;
    },
    theSidebar() {
      return this.sidebar
        ? sidebars[this.sidebar.name] || {}
        : {};
    }
  },
  components: {
    Navbar,
    Sidebar,
    Submenu,
    ViewInfo,
    Actions,
    ErrorMessage,
    Modal,
    ProfileSubmenu,
    EmptyDataset
  },
  methods: {
    ajaxStarted() {
      this.showSubmenuLoader = true;
    },
    ajaxEnded() {
      this.showSubmenuLoader = false;
    },
    showDelete(action) {
      $('#delete-modal').modal('show');
      this.action = action;
    },
    modalClosed(e) {
      $('#delete-modal').modal('hide');
    },
    /**
     * Emit delete event on bus
     */
    doDelete(e) {
      let event = 'delete';
      if (this.action.type)
        event += '.' + this.action.type;
      this.eventBus.$emit(event + '.confirmed', this.action);
    }
  },
  created() {
    this.eventBus.$on('show.delete', this.showDelete);
    this.eventBus.$on('delete-modal.action', this.doDelete);
    this.eventBus.$on('delete-modal.closed', this.modalClosed);
    this.eventBus.$on('ajax.started', this.ajaxStarted);
    this.eventBus.$on('ajax.ended', this.ajaxEnded);
  },
  beforeDestroy() {
    this.eventBus.$off('show.delete', this.showDelete);
    this.eventBus.$off('delete-modal.action', this.doDelete);
    this.eventBus.$off('delete-modal.closed', this.modalClosed);
    this.eventBus.$off('ajax.started', this.ajaxStarted);
    this.eventBus.$off('ajax.ended', this.ajaxEnded);
  },
}
</script>
