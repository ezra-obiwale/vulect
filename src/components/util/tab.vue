<template>
  <div role="tabpanel" class="tab-pane" :class="{active: scope.tab.active}" :id="scope.tabId">
    <slot>
      TAB {{ scope.tabId }} CONTENT
    </slot>
  </div>
</template>
<script>
export default {
  name: "Tab",
  props: {
    scope: {
      required: true,
      type: Object
    }
  }
};
</script>
