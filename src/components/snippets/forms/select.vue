<template>
  <span v-if="options || dataOptions" v-show="show">
    <!-- required -->
    <select v-if="required" required class="form-control" :class="css" :id="name" @change="select" :value="deepValue(name, data) || value">
      <template v-for="option in options">
        <template v-if="option.type === 'group'">
          <optgroup :label="option.label" :key="option.label">
            <template v-for="g_option in option.options">
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" selected v-if="g_option.selected">{{ g_option.label }}</option>
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" v-else>{{ g_option.label }}</option>
            </template>
          </optgroup>
        </template>
        <option v-else-if="option.selected" :key="option.value" :value="option.value !== undefined ? option.value : option.label" selected>{{ option.label }}</option>
        <option v-else :key="option.value" :value="option.value !== undefined ? option.value : option.label">{{ option.label }}</option>
      </template>
      <template v-for="option in dataOptions">
        <template v-if="option.type === 'group'">
          <optgroup :label="option.label" :key="option.label">
            <template v-for="g_option in option.options">
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" selected v-if="g_option.selected">{{ g_option.label }}</option>
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" v-else>{{ g_option.label }}</option>
            </template>
          </optgroup>
        </template>
        <option v-else-if="option.selected" :key="option.value" :value="option.value !== undefined ? option.value : option.label" selected>{{ option.label }}</option>
        <option v-else :key="option.value" :value="option.value !== undefined ? option.value : option.label">{{ option.label }}</option>
      </template>
    </select>
    <!-- not required -->
    <select v-else class="form-control" :class="css" :id="name" @change="select" :value="deepValue(name, data) || value">
      <template v-for="option in options">
        <template v-if="option.type === 'group'">
          <optgroup :label="option.label" :key="option.label">
            <template v-for="g_option in option.options">
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" selected v-if="g_option.selected">{{ g_option.label }}</option>
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" v-else>{{ g_option.label }}</option>
            </template>
          </optgroup>
        </template>
        <option v-else-if="option.selected" :key="option.value" :value="option.value !== undefined ? option.value : option.label" selected>{{ option.label }}</option>
        <option v-else :key="option.value" :value="option.value !== undefined ? option.value : option.label">{{ option.label }}</option>
      </template>
      <template v-for="option in dataOptions">
        <template v-if="option.type === 'group'">
          <optgroup :label="option.label" :key="option.label">
            <template v-for="g_option in option.options">
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" selected v-if="g_option.selected">{{ g_option.label }}</option>
              <option :key="g_option.value" :value="g_option.value !== undefined ? g_option.value : g_option.label" v-else>{{ g_option.label }}</option>
            </template>
          </optgroup>
        </template>
        <option v-else-if="option.selected" :key="option.value" :value="option.value !== undefined ? option.value : option.label" selected>{{ option.label }}</option>
        <option v-else :key="option.value" :value="option.value !== undefined ? option.value : option.label">{{ option.label }}</option>
      </template>
    </select>
  </span>
</template>

<script>
export default {
  name: "Select",
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
    showIf: Object,
    url: {
      type: String
    },
    value: {},
  },
  data() {
    return {
      dataOptions: [],
      show: true
    };
  },
  methods: {
    isSelected(field, option) {
      if (!this.data && !this.value) return false;
      let value1 = this.deepValue(this.name, this.data) || this.value,
        value2 = option.value !== undefined ? option.value : option.label;
      return value1 == value2;
    },
    select(e) {
      this.emit('option.selected', e);
    },
    emit(evtStr, evtObj) {
      let $target = $(evtObj.target);

      if (this.id || this.name)
        this.eventBus.$emit((this.id || this.name) + '.' + evtStr, $target.val(), evtObj);
      this.eventBus.$emit(evtStr, $target.attr('id') || $target.attr('name'), $target.val(), evtObj);
    },
    showOrHide(value) {
      this.show = value === this.showIf.value;
    }
  },
  created() {
    if (this.data) this.data = this.data;
    if (!this.name) this.name = 's' + Date.now();
    if (this.url && this.meta) {
      this.http.get(this.url)
        .then(resp => {
          let meta = this.meta;
          resp.data.forEach(data => {
            let row = {};
            if (meta.label) row.label = data[meta.label];
            if (meta.value) row.value = data[meta.value];
            if (this.data[this.name] && row.value == this.data[this.name])
              row.selected = true;
            this.dataOptions.push(row);
          });
        })
        .catch(this.processErrors);
    }
    if (this.showIf) {
      this.show = this.showIf.default;
      this.eventBus.$on(this.showIf.event, this.showOrHide);
    }
  },
  beforeDestroy() {
    if (this.showIf) {
      this.eventBus.$off(this.showIf.event, this.showOrHide);
    }
  },
  beforeMount() {
  },
}
</script>
