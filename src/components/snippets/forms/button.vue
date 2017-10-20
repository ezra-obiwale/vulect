<template>
  <button v-if="field" :type="type || 'submit'" class="btn btn-default" :class="css" @click="clicked" v-html="text"></button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      css: {
        type: String
      },
      event: {
        type: Object
      },
      text: {
        type: String
      },
      type: {
        type: String
      },
    },
    data() {
      return {
        event: 'button.clicked',
        eventValue: null
      };
    },
    beforeMount() {
      if (this.event) {
        this.event = this.event || this.event;
        this.eventValue = this.eventValue || this.eventValue;
      }
    },
    methods: {
      clicked() {
        this.eventBus.$emit(this.event, this.eventValue);
      }
    }
  };
</script>
