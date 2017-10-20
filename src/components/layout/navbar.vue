<template>
  <nav class="navbar navbar-expand-lg bg-white">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" style="margin-left: 0px;">
        <li class="nav-item dropdown dropdown-extend">
          <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" style="font-size: 24.5px;">
            <i class="ion-grid"></i>
          </a>
          <div class="dropdown-menu dropdown-extend-menu no-padding" role="menu" style="background: none; border: none!important; padding: 0.5rem 0!important; box-shadow: none!important; border-radius: 0px!important">
            <div class="flyout-menu">
              <div class="header">
                <p>Schoolable apps
                  <i class="ion-close float-right"></i>
                </p>
              </div>
              <div class="mbody">
                <div class="row">
                  <div class="col-3 text-center">
                    <router-link class="fater fly-text" :to="routerURL('hr')">
                      <img src="/static/img/hr.svg" width="30%" alt=""><br>
                      <span>HR</span>
                    </router-link>
                  </div>
                  <div class="col-3 text-center">
                    <router-link class="fater fly-text" :to="routerURL('payroll')">
                      <img src="/static/img/payroll.svg" width="30%" alt=""><br>
                      <span>Payroll</span>
                    </router-link>
                  </div>
                  <div class="col-3 text-center">
                    <a class="fater fly-text" href="#">
                      <img src="/static/img/users.svg" width="30%" alt=""><br>
                      <span>Users</span>
                    </a>
                  </div>
                  <div class="col-3 text-center">
                    <a class="fater fly-text" href="#">
                      <img src="/static/img/loan.svg" width="30%" alt=""><br>
                      <span>School Credit</span>
                    </a>
                  </div>
                </div>
                <div class="row mt-30">
                  <div class="col-3 text-center">
                    <a class="fater fly-text" href="#">
                      <img src="/static/img/finance.svg" width="30%" alt=""><br>
                      <span>Finance</span>
                    </a>
                  </div>
                  <div class="col-3 text-center">
                    <a class="fater fly-text" href="#">
                      <img src="/static/img/academics.svg" width="30%" alt=""><br>
                      <span>Academics</span>
                    </a>
                  </div>
                  <!-- <div class="col-3 text-center">
                    <img src="/static/img/loan.svg" width="30%" alt="">
                    <a class="fater fly-text" href="#">School Credit</a>
                  </div> -->
                </div>
                <div class="row mt-30">
                  <!-- <div class="col-3 text-center">
                    <img src="/static/img/academics.svg" width="30%" alt="">
                    <a class="fater fly-text" href="#">Academics</a>
                  </div> -->
                  <!-- <div class="col-3 text-center">
                    <img src="/static/img/finance.svg" width="30%" alt="">
                    <a class="fater fly-text" href="#">Finance</a>
                  </div> -->
                </div>
              </div>
              <hr>
              <div class="mbody submenuz">
                <p>
                  You are logged in as
                  <strong class="fater" v-text="store.state.sd.cui.email"></strong>
                </p>
                <p>
                  <a href="#" class="fater">manage your profile</a>
                </p>
                <p>
                  <a href="#" class="fater">Sign out</a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <li class="nav-item dropdown">
          <a class="nav-item nav-link dropdown-toggle mr-md-2 nav-icon" href="#" id="bd-notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="icon ion-ios-bell-outline"></i>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-item nav-link dropdown-toggle mr-md-2 nav-icon n-left" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="icon ion-gear-a"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
            <a class="dropdown-item" href="#">Sign Out</a>
            <a class="dropdown-item" href="#">Settings</a>
            <a class="dropdown-item" href="#">HELP</a>
          </div>
        </li>
      </ul>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
  <!-- <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-slide-dropdown">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#" style="color: #ccc!important">The School Name</a>
              </div>
              <ul class="nav navbar-nav navbar-right">
                <li>
                  <a href="#">
                    <span class="glyphicon glyphicon-bell"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="glyphicon glyphicon-cog "></span>
                  </a>
                </li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-user"></span>
                  </a>
                  <ul class="dropdown-menu" role="menu">
                    <li>
                      <a href="#">Action</a>
                    </li>
                    <li>
                      <a href="#">Another action</a>
                    </li>
                    <li>
                      <a href="#">Something else here</a>
                    </li>
                    <li class="divider"></li>
                    <li>
                      <a href="#">Separated link</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div class="collapse navbar-collapse" id="bs-slide-dropdown">
                <ul class="nav navbar-nav">
                  <li class="dropdown" v-for="nav in navs" :key="nav.header">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      {{ nav.header }}
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li v-for="link in nav.links" :key="link.text">
                        <router-link class="fater" :to="link.url">
                          {{ link.text }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav> -->
</template>

<style>
.navbar-nav:not(.navbar-right) {
  margin-left: 100px;
}
.fater.fly-text img {
  margin-top: -1em;
  margin-bottom: 0.5em;
}
</style>

<script>
import hr from '@/pages/hr/navs';
import payroll from '@/pages/payroll/navs';

export default {
  name: "Navbar",
  props: {
    navs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      routers: {
        hr: hr,
        payroll: payroll,
      }
    };
  },
  mounted(){
    // console.log(this)
  },
  methods: {
    routerURL(router) {
      let route = this.routers[router];
      return route.links[ route.default].url;
    }
  }
}
</script>
