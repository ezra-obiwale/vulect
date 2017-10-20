<template>
  <img v-if="inline" class="loading inline" :src="src || '/static/img/loading.gif'" :alt="alt" :title="title" />
  <div v-else class="loading-backdrop">
    <img class="loading" :src="src || '/static/img/loading.gif'" :alt="alt" :title="title" />
  </div>
</template>

<style>
  .loading-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    text-align: center;
  }

  img.loading.inline {
    width: 20px;
    height: 20px;
    margin:auto 10px;
  }

  .loading-backdrop img.loading {
    margin: auto;
    display: flex;
  }
</style>

<script>
export default {
  name: "Loading",
  props: {
    alt: {
      type: String
    },
    inline: {
      type: Boolean
    },
    src: {
      type: String
    },
    title: {
      type: String
    },
  },
};
</script>
