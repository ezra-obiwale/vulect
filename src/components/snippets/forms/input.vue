<template>
  <span>
    <!-- file input fields -->
    <template v-if="type === 'file'">
      <!-- required -->
      <input v-if="required" required type="file" :id="name" @change="fileSelected" class="form-control" :class="css">
      <!-- not required -->
      <input v-else type="file" :id="name" @change="fileSelected" class="form-control" :class="css">
    </template>
    <!-- checkbox or radio fields -->
    <template v-else-if="(type == 'checkbox' || type == 'radio')" v-for="option in (options || deepValue(name, rowOptions))">
      <label :key="option.value" :class="option.labelClass">
        <!-- checked -->
        <input :name="name" :type="type" @change="optionSelected" :value="option.value !== undefined ? option.value : option.label" :class="option.class" v-if="isChecked(field, option)" checked>
        <!-- not checked -->
        <input :name="name" :type="type" @change="optionSelected" :value="option.value !== undefined ? option.value : option.label" :class="option.class" v-else> {{ option.label }}
      </label>
    </template>
    <!-- other input fields -->
    <template v-else>
      <!-- required -->
      <input v-if="required" required :type="type" :id="name" @change="changed" class="form-control" :class="css" :autocomplete="autocomplete === false ? 'off' : 'on'" :value="deepValue(name, data) || value">
      <!-- not required -->
      <input v-else :type="type" :id="name" @change="changed" class="form-control" :class="css" :autocomplete="autocomplete === false ? 'off' : 'on'" :value="deepValue(name, data) || value">
    </template>
  </span>
</template>

<script>
export default {
  name: "Input",
  props: {
    autocomplete: {
      type: Boolean
    },
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
    type: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    value: {}
  },
  beforeMount() {
    if (this.url && this.meta) {
      this.http.get(this.url)
        .then(resp => {
          let meta = this.meta;
          resp.data.forEach(data => {
            let row = {};
            if (meta.label) row.label = data[meta.label];
            if (meta.value) row.value = data[meta.value];
            this.push(this.rowOptions, row);
          });
        });
    }
  },
  data() {
    return {
      rowOptions: []
    };
  },
  methods: {
    isChecked(field, option) {
      if (!this.data && !this.value) return false;
      let value1 = this.deepValue(this.name, this.data) || this.value,
        value2 = option.value !== undefined ? option.value : option.label;
      return value1 == value2;
    },
    changed(e) {
      this.emit('input.changed', e);
    },
    fileSelected(e) {
      this.emit('file.selected', e);
    },
    optionSelected(e) {
      this.emit('option.selected', e);
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
