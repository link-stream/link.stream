<template>
  <div>
    <q-card-section class="q-ma-none q-pa-none" v-show="windowWidth<600">
      <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo-cell">
      <span class="logotext-cell">LINKSTREAM</span>
    </q-card-section>
    <q-card class="self-center" :class="[ windowWidth<600 ? 'my-card-cell' : 'my-card' ]"  square flat bordered>
      <div class="row">
        <div class="col col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" >    
          <div v-show="windowWidth>=600">
            <q-card-section class="q-pa-md row justify-center" >
              <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" >
            </q-card-section>
            <q-card-section class="q-ma-none q-pa-none row justify-center">
              <div class="logotext">LINKSTREAM</div>
            </q-card-section>
          </div>     
          <q-card-section class="col q-pa-none q-mb-md">
            <div :class="[ windowWidth<600 ? 'signintxt-cell' : 'signintxt' ]" >Sign In</div>
          </q-card-section>
          <q-card-section class="q-pa-none col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-form @submit.prevent.stop="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
              <div class="q-mt-md">
                <label class="form" >Email address</label>
                <div class="q-mt-xs row justify-center">
                  <q-input class="q-ma-none q-pb-sm col-xs-11 col-sm-10 col-md-10 col-lg-10 col-xl-10 forminput" v-model.trim="$v.email.$model" :error-message="emailErrors" :error="$v.email.$anyError" @input="$v.email.$touch()" 
                  outlined square bg-color="white" bottom-slots dense type="email" id="email" name="email"></q-input>
                </div>
              </div>
              <div class="q-mt-md">
                <label class="form" >Password</label>
                <div class="q-mt-xs row justify-center">
                  <q-input class="q-ma-none q-pb-sm col-xs-11 col-sm-10 col-md-10 col-lg-10 col-xl-10 forminput" v-model.trim="$v.password.$model" :error-message="passwordErrors" :error="$v.password.$anyError" @input="$v.password.$touch()"
                    outlined square bg-color="white" dense type="password" id="password" name="password" />
                </div>
              </div>
              <q-btn class="q-mt-lg signinbtn" flat type="submit">
                <div class="signuptxt">Sign in</div>
              </q-btn>
              <div class="q-mt-lg forgotpassword">
                <a :href="forgot">Forgot Password?</a>
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
import axios from "../../../../assets/node_modules/axios";
import { required, email, minLength } from "../../../../assets/node_modules/vuelidate/lib/validators";
export default {
  props: {
    baseurl: {
      type: String,
      default: ""
    }
  },
  name: 'sign_in',
  data() {
    return {      
      email: '',
      password: '',
      cardClasses: 'self-center my-card midlle',
      signinClass: 'signintxt',
      login: this.baseurl + 'login',
      forgot: this.baseurl + 'forgot',
      register: this.baseurl + 'register',
      instagram: this.baseurl + 'instagram_register',
      windowWidth: 0,
      windowHeight: 0
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  computed: {
    emailErrors () {
      if (!this.$v.email.required) return '* Required';
      if (!this.$v.email.email) return 'You must enter a valid email address';
    },
    passwordErrors () {
      if (!this.$v.password.required) return '* Required';
      if (!this.$v.password.minLength) return 'The password must have at least 8 characters';
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
    onSubmit () {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        let formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);
        let sign_in = {};
        formData.forEach(function(value, key){
            sign_in[key] = value;
        });
        axios({
          method: 'post',
          url: this.baseurl + 'app/login_js',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => {
            if (response.data.status === 'Success') {
              window.location = 'app';
            } else
              this.$q.notify({ message: response.data.msg, color: 'negative', icon: 'error' });
          })
          .catch(function(error) {
            console.log(error);
          });          
      }
    }
  }
};
</script> 
<style>
</style>