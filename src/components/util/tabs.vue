<template>
  <div :id="id" v-if="tabs">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs nav-justified" role="tablist">
      <slot v-for="(tab, index) in tabs" :tab="tab" :index="index" :tabId="tabId(tab, index)" name="header">
        <li role="presentation" :class="{active: tab.active}">
          <a :href="tabId(tab, index, true)" :aria-controls="tabId(tab, index)" role="tab" data-toggle="tab" v-html="tab.title"></a>
        </li>
      </slot>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <slot v-for="(tab, index) in tabs" :tab="tab" :index="index" :tabId="tabId(tab, index)" name="content">
        <tabs :id="tabId(tab, index)" :active="tab.active" v-html="tab.content"></tabs>
      </slot>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/util/tabs';
export default {
  name: "Tabs",
  props: {
    id: {
      required: true,
      validator: value => {
        return typeof value !== 'object';
      }
    },
    tabs: {
      type: Array
    }
  },
  components: { Tabs },
  methods: {
    tabId(tab, index, hash) {
      let id = 'tab-' + this.id + '-' + index;
      return hash ? '#' + id : id;
    }
  }
};
</script>
 
