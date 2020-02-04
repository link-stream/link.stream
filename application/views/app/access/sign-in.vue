<template>
  <q-card class="self-center my-card midlle" square flat bordered>
    <div class="row">
      <div class="col signin">
        <q-card-section class="q-pa-md row justify-center">
          <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" />
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-none row justify-center">
          <div class="logotext">streamy.link</div>
        </q-card-section>
        <q-card-section class="q-pa-none q-mb-md">
          <div class="signintxt">Sign In</div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-form
            @submit.prevent.stop="onSubmit"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
          >
            <div class="q-mt-md">
              <label class="form">Email address</label>
              <div class="q-mt-xs row justify-center">
                <q-input
                  class="q-ma-none q-pb-sm forminput"
                  v-model.trim="$v.signIn.email.$model"
                  :error-message="emailErrors"
                  :error="$v.signIn.email.$anyError"
                  outlined
                  square
                  bg-color="white"
                  bottom-slots
                  dense
                  type="email"
                  id="email"
                  name="email"
                ></q-input>
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Password</label>
              <div class="q-mt-xs row justify-center">
                <q-input
                  class="q-ma-none q-pb-sm forminput"
                  v-model.trim="$v.signIn.password.$model"
                  :error-message="passwordErrors"
                  :error="$v.signIn.password.$anyError"
                  outlined
                  square
                  bg-color="white"
                  dense
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
            </div>
            <q-btn class="q-mt-lg signupbtn" flat type="submit">
              <div class="signuptxt">Sign in</div>
            </q-btn>
            <div class="q-mt-lg forgotpassword">
              <a :href="forgot">Forgot Password?</a>
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
import axios from "../../../../assets/node_modules/axios";
import {
  required,
  email,
  minLength
} from "../../../../assets/node_modules/vuelidate/lib/validators";

export default {
  props: {
    baseurl: {
      type: String,
      default: ""
    }
  },
  name: "sign_in",
  data() {
    return {
      signIn: {
        email: "",
        password: ""
      },
      login: this.baseurl + "login",
      forgot: this.baseurl + "forgot",
      register: this.baseurl + "register",
      instagram: this.baseurl + "instagram_register"
    };
  },
  validations: {
    signIn: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  computed: {
    emailErrors() {
      if (!this.$v.signIn.email.required) return "* Required";
      if (!this.$v.signIn.email.email)
        return "You must enter a valid email address";
    },
    passwordErrors() {
      if (!this.$v.signIn.password.required) return "* Required";
      if (!this.$v.signIn.password.minLength)
        return "The password must have at least 8 characters";
    }
  },
  mounted() {
    sessionStorage.setItem("baseUrl", this.baseurl);
  },
  methods: {
    onSubmit() {
      this.$v.signIn.$touch();
      if (!this.$v.signIn.$invalid) {
        axios
          .post(this.baseurl + "app/login_js", this.signIn)
          .then(response => {
            if (response.data.status === "Success") {
              window.location = "app";
            } else
              this.$q.notify({
                message: response.data.msg,
                color: "negative",
                icon: "error"
              });
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