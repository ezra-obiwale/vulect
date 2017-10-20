<template>
  <div class="sub-menu">
    <div class="row">
      <div class="col-md-4">
        <div class="title" v-if="title">
          <span v-html="title"></span>
          <loading v-if="loading" :inline="true"></loading>
        </div>
      </div>
      <div class="col-md-6">
        <div class="menu-list" v-if="links">
          <template v-for="link in links">
            <a :href="link.url" @click="linkClicked(link)" :key="link.text">{{ link.text }}</a>
          </template>
        </div>
      </div>
      <div class="col-md-2">
        <div class="options" v-if="button">
          <div style="margin-right: 0.7rem;" class="pull-right">
            <button v-if="button.modalId" type="button" data-toggle="modal" :data-target="`#${button.modalId}`" @click="buttonClicked" class="btn btn-primary">
              <span :class="button.icon" style="font-weight: bold"></span>
              {{ button.text }}
            </button>
            <button v-else type="button" @click="buttonClicked" class="btn btn-primary">
              <span :class="button.icon" style="font-weight: bold"></span>
              {{ button.text }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "@/components/util/loading";
export default {
  name: "Submenu",
  props: {
    button: {
      type: Object
    },
    links: {
      type: Array
    },
    title: {
      type: String
    },
    loading: Boolean
  },
  components: { loading },
  methods: {
    buttonClicked() {
      this.eventBus.$emit('submenu.button.clicked');
    },
    linkClicked(link) {
      if (link.event)
        this.eventBus.$emit(link.event);
    }
  }
}
</script>
