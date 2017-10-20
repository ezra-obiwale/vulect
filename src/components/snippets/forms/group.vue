<template>
  <fieldset>
    <legend v-if="label" v-html="label"></legend>
    <div v-if="multiple">
      <div v-for="n in groups" class="group-item">
        <form-fields v-if="fields" :fields="fields" :groupName="name" :groupIndex="n-1" :fieldData="fieldData"></form-fields>
        <div class="btn btn-xs btn-default group-close">&times;</div>
      </div>
      <button type="button" @click="addGroup" :class="btnClass(field)" v-html="btnText(field)"></button>
    </div>
    <form-fields v-else-if="fields" :fields="fields" :fieldData="fieldData"></form-fields>
  </fieldset>
</template>

<style>
  .group-item {
    position: relative!important;
  }
  .group-remove {
    position: absolute;
    bottom: 0;
    right: 10px;
  }
</style>

<script>
export default {
  name: "Group",
  props: {
    fields: {
      type: Array
    },
    fieldData: {
      type: Object
    },
    label: {
      type: String
    },
    multiple: {
      type: Object
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      groups: 1
    };
  },
  methods: {
    btnClass(field) {
      return this.multiple && this.multiple.btn && this.multiple.btn.class
        ? this.multiple.btn.class
        : 'btn btn-default';
    },
    btnText(field) {
      return this.multiple && this.multiple.btn && this.multiple.btn.text
        ? this.multiple.btn.text
        : 'More';
    },
    addGroup() {
      if (!this.reportModalValidity()) return;
      this.groups++;
    }
  }
}
</script>
