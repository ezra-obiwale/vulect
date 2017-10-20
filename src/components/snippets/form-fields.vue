<template>
  <div style="margin: 12px 20px 20px;">
    <template v-for="(field, index) in fields">
      <div :class="formGroupClass(field)" :key="field.name" v-if="show(field)" v-show="isVisible[field.name]">
        <div :class="fieldWidthClass(field)" :style="removePadding(field)">
          <label v-if="canHaveLabel(field)" :for="field.name" class="pull-left" :class="field.labelClass">{{ field.label }}</label>
          <!-- divider -->
          <template v-if="field.type == 'divider'">
            <h3>{{field.label}}</h3>
            <hr />
          </template>
          <form-field v-else :field-data="fieldData" :type="formField(field).type" :required="formField(field).required" :name="formField(field).name" :autocomplete="formField(field).autocomplete" :css="formField(field).class" :url="formField(field).url" :meta="formField(field).meta" :value="formField(field).value" :options="formField(field).options" :event="formField(field).event"></form-field>
        </div>
      </div>
      <form-field v-else-if="field.type == 'group'" :fields="formField(field).fields" :label="formField(field).label" :field-data="fieldData" :multiple="formField(field).multiple" :name="formField(field).name" :key="field.label"></form-field>
    </template>
  </div>
</template>
<style>
.margin-bottom {
  margin-bottom: 15px!important;
}
</style>
<script>
import FormField from '@/components/snippets/forms/field';

export default {
  name: "FormFields",
  props: {
    create: {
      type: Boolean
    },
    fields: {
      type: Array,
      required: true
    },
    fieldData: {
      type: Object
    },
    groupIndex: {
      type: Number
    },
    groupName: {
      type: String
    }
  },
  data() {
    return {
      options: {},
      isVisible: {}
    }
  },
  components: { FormField },
  methods: {
    canHaveLabel(field){
      return field.type !== 'divider' && field.type !== 'button'
        && field.type !== 'submit' && field.type !== 'reset'
        && field.type !== 'label';
    },
    formField(field) {
      if (this.groupName && field.name) {
        field.name = this.groupName + '.' + this.groupIndex + '.' + field.name
      }
      return field;
    },
    removePadding(field) {
      return field.class ? 'padding-left:0' : '';
    },
    formGroupClass(field) {
      return field.class ? '' : 'form-group';
    },
    fieldWidthClass(field) {
      return field.class ? field.class + ' margin-bottom' : 'col-md-12';
    },
    show(field) {
      this.set(this.isVisible, field.name, !field.showIf || field.showIf.default === true)
      if (field.showIf) {
        if (!window.showOrHide) window.showOrHide = {};
        let eventObject = window.showOrHide[field.showIf.event] || {};
        if (!eventObject[field.name]){
          eventObject[field.name] = value => {
            this.push(this.isVisible, field.showIf.value === value, field.name);
          };
          window.showOrHide[field.showIf.event] = eventObject;
          this.eventBus.$on(field.showIf.event, window.showOrHide[field.showIf.event][field.name]);
        }
      }
      return field.type !== 'group' && (field.noEdit !== true || this.create);
    }
  },
  beforeDestroy() {
    for (let evt in window.showOrHide) {
      for (let name in window.showOrHide[evt]) {
        this.eventBus.$off(evt, window.showOrHide[evt][name]);
        delete window.showOrHide[evt][name];
      }
    }
  }
};
</script>
