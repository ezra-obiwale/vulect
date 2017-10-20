<template>
  <div class="row">
    <div :class="dimmedClass()" @click="close">&nbsp;</div>
    <div :class="viewClass()" style="padding-left: 0px;">
      <div class="user-profile view-info">
        <div class="menu">
          <div class="tabbable-panel ">
            <div class="header">
              <h4>{{ title }}</h4>
              <span class="close">
                <span @click="close" class="ion-android-close close-view"></span>
              </span>
            </div>
          </div>
          <div class="tabbable-panel">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dimmed {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

<script>
export default {
  name: "ItemView",
  props: {
    title: {
      type: String
    },
    size: {
      type: Number
    }
  },
  data() {
    return {
      defSize: 6
    };
  },
  methods: {
    offset() {
      return  12 - (this.size || this.defSize);
    },
    dimmedClass() {
      return 'col-md-' + this.offset() + ' dimmed';
    },
    viewClass() {
      let width = this.size || this.defSize;
      return 'col-md-' + width + ' col-md-offset-' + this.offset();
    },
    close() {
      this.eventBus.$emit('hide.details');
    }
  }
}
</script>
