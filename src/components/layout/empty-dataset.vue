<template>
  <div v-if="!data.length" class="empty-set text-center">
    <loading v-if="loading" :inline="true"></loading>
    <div v-else>
      <slot>
        You have an empty data set
      </slot>
      <div v-if="submenu && submenu.button">
        <button v-if="submenu.button.modalId" type="button" data-toggle="modal" :data-target="`#${submenu.button.modalId}`" @click="buttonClicked" class="btn btn-primary">
          <span :class="submenu.button.icon" style="font-weight: bold"></span>
          {{ submenu.button.text }}
        </button>
        <button v-else type="button" @click="buttonClicked" class="btn btn-primary btn-sm">
          <span :class="submenu.button.icon" style="font-weight: bold"></span>
          {{ submenu.button.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/util/loading';
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    loading: Boolean,
    submenu: Object,
  },
  components: {
    Loading
  },
  methods: {
    buttonClicked() {
      this.$emit();
      this.eventBus.$emit('submenu.button.clicked');
    },
    linkClicked(link) {
      if (link.event)
        this.eventBus.$emit(link.event);
    }
  }
};
</script>

<style>
.empty-set {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  z-index: 1039;
}
</style>
