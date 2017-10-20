<template>
  <div id="view-info-parent" v-show="show">
    <slot></slot>
  </div>
</template>

<style>
#view-info-parent {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, .3);
  z-index: 9999;
}

.view-info {
  background-color: #fff;
  overflow-y: auto;
}
</style>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {
    this.eventBus.$on('show.details', this.showDetails);
    this.eventBus.$on('hide.details', this.hideDetails);
  },
  beforeDestroy() {
    this.eventBus.$off('show.details', this.showDetails);
    this.eventBus.$off('hide.details', this.hideDetails);
  },
  methods: {
    showDetails() {
      this.show = true;
      $('body').addClass('no-scroll');
    },
    hideDetails() {
      this.show = false;
      $('body').removeClass('no-scroll');
    }
  }
}
</script>
