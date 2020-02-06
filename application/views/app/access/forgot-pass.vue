<template>
<div>
  <q-card-section class="q-ma-none q-pa-none" v-show="windowWidth<600">
    <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo-cell">
    <span class="logotext-cell">LINKSTREAM</span>
  </q-card-section>
  <q-card class="self-center" :class="[ windowWidth<600 ? 'my-card-cell' : 'my-card' ]" square flat bordered>
    <div class="row">
      <div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div v-show="windowWidth>=600">
          <q-card-section class="q-pa-md row justify-center">
            <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" >
          </q-card-section>
          <q-card-section class="q-ma-none q-pa-none row justify-center">
            <div class="logotext">LINKSTREAM</div>
          </q-card-section>
        </div>        
        <q-card-section class="q-pa-none q-mb-md">
          <div :class="[ windowWidth<600 ? 'forgot-cell' : 'signintxt' ]">Forgot Password</div>
        </q-card-section>
        <q-card-section class="q-pa-none col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <q-form @submit.prevent.stop="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
            <div class="q-mt-md">
              <label class="form">Email address</label>
              <div class="q-mt-xs row justify-center">
                <q-input class="q-ma-none q-pb-sm col-xs-11 col-sm-10 col-md-10 col-lg-10 col-xl-10 forminput" v-model.trim="$v.email.$model" :error-message="emailErrors" :error="$v.email.$anyError"
                  outlined square bg-color="white" bottom-slots dense type="email" id="email" name="email"></q-input>
              </div>
            </div>
            <q-btn class="q-mt-lg forgotbtn"  flat type="submit">
              <div class="signuptxt">Reset Password</div>
            </q-btn>
            <div class="q-mt-lg forgotpassword">
              <a :href="login">Sign In</a>
            </div>
          </q-form>
        </q-card-section>
      </div>
      <div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" :class="[windowWidth<600 ? 'streamylink-cell' : 'streamylink']">
        <q-card-section class="q-pa-lg row justify-center" :class="[ windowWidth<600 ? '' : 'btnemails' ]">
          <q-btn class="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-ma-xs btnemail" no-caps flat type="a" :href="register">
            <div>Sign up with email</div>
          </q-btn>
          <q-btn class="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-ma-xs btninstagram" no-caps flat type="a" :href="instagram">
            <div>Sign up with Instagram</div>
          </q-btn>
          <q-btn class="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-ma-xs btngoogle" no-caps flat type="a" href="#">
            <div>Sign up with Google</div>
          </q-btn>
        </q-card-section>
      </div>
    </div>
  </q-card>
</div>  
</template>
<script>
import {
  required,
  email
} from "../../../../assets/node_modules/vuelidate/lib/validators";
export default {
   props: {
    baseurl: {
      type: String,
      default: ""
    }
  },
  name: "forgot_password",
  data() {
    return {
      email: "",
      login: this.baseurl + "login",
      forgot: this.baseurl + "forgot",      
      index: this.baseurl + "index",
      register: this.baseurl + "register",
      instagram: this.baseurl + "instagram_register",
      windowWidth: 0,
      windowHeight: 0
    };
  },
  validations: {
    email: {
      required,
      required,
      email
    }
  },
  computed: {
    emailErrors() {
      if (!this.$v.email.required) return "* Required";
      if (!this.$v.email.email) return "You must enter a valid email address";
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight()
    })
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      (this.windowWidth >= 600) 
        ? document.getElementById('loginContainer').className = 'vertical-center' 
        : document.getElementById('loginContainer').className = '' 
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
      window.removeEventListener('resize', this.getWindowHeight)
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
      }
    }
  }
};
</script>
<style>
</style>