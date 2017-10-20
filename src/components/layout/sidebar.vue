<template>
  <aside class="klipboard-side-bar">
    <div class="loggedin_user">
      <div @click="toggleSidebarHeader">
        <!-- <div class="openAndClose_toggle">
          <i v-if="!store.state.sidebar_header_open" class="icon ion-ios-arrow-down"></i>
          <i v-if="store.state.sidebar_header_open" class="icon ion-ios-arrow-up"></i>
        </div> -->
        <h2 class="current_school_opened" v-text="store.state.sd.name">School</h2>
        <h4 class="loggedin_user_fullname">{{ store.state.sd.cui.first_name }} {{ store.state.sd.cui.last_name }}</h4>
        <!-- <p v-if="store.state.sidebar_header_open">Add another School</p> -->
      </div>
    </div>
    <div class="menu">
      <p class="menu-header text-uppercase" v-if="header" v-html="header"></p>
      <ul class="nav flex-column" v-if="links">
        <template v-for="(link, key) in links">
          <li role="presentation" class="nav-item" :class="{active: isActive(key)}" :key="link.text">
            <router-link :to="link.url" class="nav-link">
              <span :class="link.icon"></span>&nbsp {{ link.text }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <div class="menu-divider"></div>
    <div class="menu">
      <ul class="nav nav-bordered nav-vertical flex-md-column">
        <li class="nav-header"></li>
        <li class="nav-item">
          <a class="nav-link other-menu" href="#">
            Integrations
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link other-menu" href="#">
            App Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link other-menu" href="#">
            User Documentation
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    active: {
      type: String
    },
    header: {
      type: String
    },
    links: {
      type: Object
    },
  },
  mounted() {
    this.toStore('sidebar_header_open', false);
  },
  methods: {
    isActive(key) {
      return this.active === key;
    },
    toggleSidebarHeader(){
      this.toStore('sidebar_header_open', !this.fromStore('sidebar_header_open'));
    }
  }
}
</script>

<style scoped>
.loggedin_user {
  padding: 11px 10px 3px 11px;
  float: left;
  width: calc(100% - 14px);
  top: 7px;
  left: 7px;
  position: absolute;
  background: #1d3449;
  border-radius: 3px;
  box-shadow: 0 5px 4px rgba(0, 0, 0, .05);
  z-index: 10;
  transition: all .3s ease;
  -webkit-transition: all .3s ease;
  color: white;
}

.loggedin_user .current_school_opened {
  font-size: 20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loggedin_user .loggedin_user_fullname {
  opacity: .6;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
}

.loggedin_user .openAndClose_toggle {
  position: absolute;
  top: 15px;
  right: 12.5px;
  font-size: 22px;
  padding: 5px 10px 0;
  border-radius: 3px;
  margin-top: -0.3em;
  cursor: pointer;
}

.loggedin_user .openAndClose_toggle:hover, .loggedin_user .openAndClose_toggle:focus {
  background: #37474F;
}

.loggedin_user .openAndClose_toggle .icon {
  font-size: 1.4rem;
}
</style>


