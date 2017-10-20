<template>
  <div :class="type" class="alert alert-dismissible fade show" v-show="show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <span v-text="message"></span>
    </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      show: false,
      message: "",
      type: ""
    }
  },
  created(){
    this.eventBus.$on('show-success', this.showSuccess);
    this.eventBus.$on('show-error', this.showError);
    this.eventBus.$on('show-info', this.showInfo);
  },
  beforeDestroy(){
    this.eventBus.$off('show-success', this.showSuccess);
    this.eventBus.$off('show-error', this.showError);
    this.eventBus.$off('show-info', this.showInfo);
  },
  methods: {
    showSuccess (message, duration) {
      this.showAlert("alert-success", message, duration);
    },
    showError (message, duration) {
      this.showAlert("alert-danger", message, duration);
    },
    showInfo (message, duration) {
      this.showAlert("alert-secondary", message, duration);
    },
    showAlert(type, message, waitDuration) {
      this.type = type;
      this.message = message;
      this.show = true;
      setTimeout(this.hide, waitDuration || 5000);
    },
    hide(){
      this.show = false;
    }
  }
}
</script>

<style>
.alert {
  position: fixed;
  right: 1vw;
  top: 2vh;
  height: 3em;
  line-height: 1.5em;
}
button.close:hover {
  color: white !important;
}
.alert.alert-success {
  background: #4CAF50;
  color: white;
}
.alert.alert-danger {
  color: white;
  background: #EF5350;
}
.alert.alert.alert-secondary {
  color: white;
  background: #607D8B;
}
</style>
