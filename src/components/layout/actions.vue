<template>
  <div class="actions">
        <div class="row">
            <div class="col-md-6">
              <dropdown v-if="filters" :buttonText="filters.text" :links="filters.links" :default="filters.default"></dropdown>
            </div>
            <div class="col-md-6" v-if="options">
              <div class="float-right">
                   <dropdown :buttonText="options.text" :links="options.links" :default="options.default"></dropdown>
              </div>
            </div>
       </div>
  </div>
</template>

<script>
import Dropdown from "@/components/util/dropdown";
export default {
  name: 'Actions',
  props: {
    filters: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  components: {
    dropdown: Dropdown
  },
}
</script>
