<template>
  <div class="modal fade" :id="`${id}-modal`" tabindex="-1" role="dialog" :aria-labelledby="`${id}-label`">
    <div class="modal-dialog" :class="{'modal-sm': small && !large, 'modal-lg': large && !small}" role="document">
      <div class="modal-content">
        <div class="modal-header" v-if="title">
          <h4 class="modal-title" :id="`${id}-label`">
            {{title}}
            <loading v-if="loading" :inline="true"></loading>
          </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: #fff;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style="padding: 0px">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="closeBtnText || actionBtnText">
          <button type="button" class="btn btn-default" data-dismiss="modal" v-if="closeBtnText" v-html="closeBtnText"></button>
          <button type="button" class="btn btn-primary" v-if="actionBtnText" @click="action" v-html="actionBtnText"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/util/loading";

export default {
  name: "Modal",
  props: {
    actionBtnText: String,
    closeBtnText: String,
    id: {
      type: String,
      required: true
    },
    large: Boolean,
    small: Boolean,
    title: String,
    loading: Boolean
  },
  components: {
    Loading
  },
  methods: {
    close(e) {
      if (this.id)
        this.eventBus.$emit(this.id + '-modal.closed', e);
    },
    action(e) {
      this.eventBus.$emit(this.id + '-modal.action', e);
    }
  },
  created() {
    $('body').on('hide.bs.modal', '#' + this.id + '-modal',
      e => {
        this.close(e);
      });
  },
  beforeDestroy() {
    $('body').off('hide.bs.modal', '#' + this.id + '-modal');
  },
};
</script>
