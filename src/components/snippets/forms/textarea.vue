<template>
  <span>
    <!-- required -->
    <textarea class="form-control" :class="css" :id="name" v-if="required" required @change="changed" :value="deepValue(name, data) || value" v-html="deepValue(name, data) ||value"></textarea>
    <!-- not required -->
    <textarea class="form-control" :class="css" :id="name" v-else @change="changed" :value="deepValue(name, data) || value" v-html="deepValue(name, data) || value"></textarea>
  </span>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    css: {
      type: String
    },
    data: {
      type: Object
    },
    meta: {
      type: Object
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array
    },
    required: {
      type: Boolean
    },
    url: {
      type: String
    },
    value: {},
  },
  methods: {
    changed(e) {
      this.emit('textarea.changed', e);
    },
    emit(evtStr, evtObj) {
      let $target = $(evtObj.target);

      if (this.id || this.name)
        this.eventBus.$emit((this.id || this.name) + '.' + evtStr, $target.val(), evtObj);
      this.eventBus.$emit(evtStr, $target.attr('id') || $target.attr('name'), $target.val(), evtObj);
    }
  }
}
</script>
