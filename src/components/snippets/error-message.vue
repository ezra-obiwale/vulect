<template>
  <div class="alert alert-danger text-center" :class="{hidden:!error}">
    {{error}}
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    error: {
      required: true,
      type: String
    }
  }
};
</script>
