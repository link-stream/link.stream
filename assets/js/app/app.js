import Vue from "vue";
require("../../../assets/css/streamy.css");

import Quasar from "quasar";
import { Notify } from "quasar";
import { LocalStorage, SessionStorage } from "quasar";
import { Platform } from 'quasar';
import axios from "axios";
import Vuelidate from "vuelidate";

import sign_in from "../../../application/views/app/access/sign-in";
import sign_up from "../../../application/views/app/access/sign-up";
import forgot_password from "../../../application/views/app/access/forgot-pass";

Vue.use(Quasar);
Vue.use(Vuelidate);
window._ = require("lodash");
Vue.prototype.$http = axios;

let app = new Vue({
  el: "#q-app",
  props: [],
  components: {
    sign_in,
    sign_up,
    forgot_password
  },
  Quasar,
  data: function() {
    return {
      size: window.screen.height,
      version: Quasar.version,
      drawerState: true,
      left: false,
      focus: true,
      dynamicWidth: 128,
      menuState: "",
      submenu: false,
      selectedMenu: "Dashboard",
      submenuList: [],
      menuList: [
        {
          icon: "img:assets/images/icons/tachometer-alt.svg",
          label: "Dashboard",
          linkTo: "#",
          submenu: []
        },
        {
          icon: "img:assets/images/icons/icon-user-circle.svg",
          label: "My Profile",
          linkTo: "#",
          submenu: [
            { linkTo: "#", label: "Edit Profile" },
            { linkTo: "#", label: "View Profile" }
          ]
        },
        {
          icon: "img:assets/images/icons/icon-tracks.svg",
          label: "My Tracks",
          linkTo: "#",
          submenu: [
            { linkTo: "#", label: "Add New Tracks" },
            { linkTo: "#", label: "Manage Tracks" },
            { linkTo: "#", label: "Manage Reposts" }
          ]
        },
        {
          icon: "img:assets/images/icons/icon-user-circle.svg",
          label: "My Content",
          linkTo: "#",
          submenu: [
            { linkTo: "#", label: "Add Content" },
            { linkTo: "#", label: "Manage Content" }
          ]
        },
        {
          icon: "img:assets/images/icons/icon-link.svg",
          label: "My Links",
          linkTo: "#",
          submenu: [
            { linkTo: "#", label: "Add Links" },
            { linkTo: "#", label: "Manage Links" }
          ]
        },
        {
          icon: "img:assets/images/icons/chart-bar.svg",
          label: "Analytics",
          linkTo: "#",
          submenu: []
        },
        {
          icon: "img:assets/images/icons/icon-reports.svg",
          label: "Reports",
          linkTo: "#",
          submenu: []
        },
        {
          icon: "img:assets/images/icons/icon-upgrade.svg",
          label: "Upgrade",
          linkTo: "#",
          submenu: []
        },
        {
          icon: "img:assets/images/icons/icon-settings.svg",
          label: "Account Settings",
          linkTo: "#",
          submenu: []
        }
      ],
      notificationsMenu: [
        {
          icon: "assets/images/testimonials/1.png",
          notification: "theredfantastic started following you 1h"
        },
        {
          icon: "assets/images/testimonials/2.png",
          notification: "jmirra started following you 2d"
        }
      ],
      accountSettings: [
        { setting: "Account Settings" },
        { setting: "Billing History" },
        { setting: "Sign Out" }
      ]
    };
  },
  mounted() {
    this.submenu = false;
  },
  watch: {
    left() {
      this.left === false
        ? (this.menuState = "assets/images/icons/bars.svg")
        : (this.menuState = "assets/images/icons/icon-close-sharp.svg");
    },
    submenu() {
      this.submenu ? (this.dynamicWidth = 256) : (this.dynamicWidth = 128);
    },
    focus() {
      console.log(this.focus);
    }
  },
  methods: {
    onItemClick() {
      // console.log('Clicked on an Item')
    },

    setActiveItem(item) {
      this.selectedMenu = item.label;
      if (item.submenu.length !== 0) {
        this.submenuList = item.submenu;
        this.submenu = true;
      } else {
        this.submenu = false;
      }
    }
  }
});
