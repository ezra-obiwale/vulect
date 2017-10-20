<template>
  <div :id="field.name" v-html="field.value"></div>
</template>
<script>
  export default {
    name: "Label",
    props: {
      value: {
        type: String
      },
      name: {
        type: String
      } 
    }
  }
</script>
