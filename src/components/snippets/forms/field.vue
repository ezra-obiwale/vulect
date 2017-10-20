<template>
  <div>
    <!-- textarea -->
    <template v-if="type == 'textarea'">
      <form-textarea :required="required" :name="name" :css="css" :data="fieldData" :value="value" :showIf="showIf"></form-textarea>
    </template>
    <!-- select -->
    <template v-else-if="type == 'select'">
      <form-select :required="required" :name="name" :css="css" :url="url" :meta="meta" :data="fieldData" :value="value" :options="options" :showIf="showIf"></form-select>
    </template>
    <!-- group -->
    <template v-else-if="type == 'group'">
      <form-group :label="label" :multiple="multiple" :fields="fields" :name="name" :field-data="fieldData" :showIf="showIf"></form-group>
    </template>
    <!-- button, submit, reset -->
    <template v-else-if="isButton()">
      <form-button :css="css" :text="text" :type="type" :event="event"  :showIf="showIf"></form-button>
    </template>
    <!-- label -->
    <template v-else-if="type == 'label'">
      <form-label :name="name" :value="value" :showIf="showIf"></form-label>
    </template>
    <!-- inputs -->
    <template v-else>
      <form-input :type="type" :required="required" :name="name" :autocomplete="autocomplete" :css="css" :url="url" :meta="meta" :data="fieldData" :value="value" :options="options"  :showIf="showIf"></form-input>
    </template>
  </div>
</template>
<script>
import FormInput from '@/components/snippets/forms/input';
import FormSelect from '@/components/snippets/forms/select';
import FormTextarea from '@/components/snippets/forms/textarea';
import FormButton from '@/components/snippets/forms/button';
import FormLabel from '@/components/snippets/forms/label';

export default {
  name: "Field",
  props: {
    autocomplete: {
      type: Boolean
    },
    css: {
      type: String
    },
    event: {
      type: Object
    },
    fieldData: {
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
    showIf: Object,
    url: {
      type: String
    },
    value: {}
  },
  components: { FormInput, FormSelect, FormTextarea, FormButton, FormLabel },
  methods: {
    isButton() {
      return this.type === 'button'
        || this.type === 'submit'
        || this.type === 'reset';
    }
  }
}
</script>
