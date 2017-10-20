<template>
  <div :id="id">
    <slot :item="item" :index="index" v-for="(item, index) in items"></slot>
    <button v-if="btn !== false" type="button" class="btn" :class="btnClass || 'btn-default'" @click="increment" v-html="btnText || 'More'"></button>
  </div>
</template>

<script>
export default {
  name: "Multiples",
  props: {
    id: {
      type: String,
      required: true
    },
    btn: Boolean,
    btnClass: String,
    btnText: String,
    items: Array
  },
  methods: {
    increment() {
      this.eventBus.$emit(this.id + '.multiples.increment');
    },
  },
}
</script>
