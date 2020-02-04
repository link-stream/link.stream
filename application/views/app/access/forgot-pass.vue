<template>
  <q-card class="self-center my-card midlle" square flat bordered>
    <div class="row">
      <div class="col signin">
        <q-card-section class="q-pa-md row justify-center">
          <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" >
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-none row justify-center">
          <div class="logotext">LINKSTREAM</div>
        </q-card-section>
        <q-card-section class="q-pa-none q-mb-md">
          <div class="signintxt">Forgot Password</div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-form @submit.prevent.stop="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
            <div class="q-mt-md">
              <label class="form">Email address</label>
              <div class="q-mt-xs row justify-center">
                <q-input class="q-ma-none q-pb-sm forminput" v-model.trim="$v.email.$model" :error-message="emailErrors" :error="$v.email.$anyError"
                  outlined square bg-color="white" bottom-slots dense type="email" id="email" name="email"></q-input>
              </div>
            </div>
            <q-btn class="q-mt-lg forgotbtn" flat type="submit">
              <div class="signuptxt">Reset Password</div>
            </q-btn>
            <div class="q-mt-lg forgotpassword">
              <a :href="login">Sign In</a>
            </div>
          </q-form>
        </q-card-section>
      </div>
      <div class="col streamylink">
        <q-card-section class="q-pa-lg row justify-center btnemails">
          <q-btn class="q-ma-xs btnemail" no-caps flat type="a" :href="register">
            <div>Sign up with email</div>
          </q-btn>
          <q-btn class="q-ma-xs btninstagram" no-caps flat type="a" :href="instagram">
            <div>Sign up with Instagram</div>
          </q-btn>
          <q-btn class="q-ma-xs btngoogle" no-caps flat type="a" href="#">
            <div>Sign up with Google</div>
          </q-btn>
        </q-card-section>
      </div>
    </div>
  </q-card>
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
    if (this.$q.platform.is.mobile) {    
      document.getElementById('loginContainer').className = '';     
    } else {      
      document.getElementById('loginContainer').className = 'vertical-center'; 
    }
  },
  methods: {
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