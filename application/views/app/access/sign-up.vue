<template>
  <q-card class="self-center my-card" square flat bordered>
    <div class="row">
      <div class="col streamylink">
        <q-card-section class="q-pa-md row justify-center">
          <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" />
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-none row justify-center">
          <div class="logotext">streamy.link</div>
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-lg row justify-center">
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
      <div class="col signin">
        <q-card-section class="q-pa-none q-mb-md">
          <div class="signup">Sign Up</div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-form
            @submit.prevent.stop="onSubmit"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
          >
            <div>
              <label class="form">Username</label>
              <div class="row justify-center">
                <q-input
                  class="q-ma-none q-pb-xs forminput"
                  v-model.trim="$v.signUp.username.$model"
                  :error-message="usernameErrors"
                  :error="$v.signUp.username.$anyError"
                  outlined
                  square
                  bg-color="white"
                  bottom-slots
                  dense
                  @blur="evt => onChangedUsername(evt.target.value)"
                  id="username"
                  name="username"
                />
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Email</label>
              <div class="q-mt-xs row justify-center">
                <q-input
                  class="q-ma-none q-pb-xs forminput"
                  v-model.trim="$v.signUp.email.$model"
                  :error-message="emailErrors"
                  :error="$v.signUp.email.$anyError"
                  outlined
                  square
                  bg-color="white"
                  dense
                  @blur="evt => onChangedEmail(evt.target.value)"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Password</label>
              <div class="q-mt-xs row justify-center">
                <q-input
                  class="q-ma-none q-pb-xs forminput"
                  v-model.trim="$v.signUp.password.$model"
                  :error-message="passwordErrors"
                  :error="$v.signUp.password.$anyError"
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
            <div class="q-mt-md">
              <label class="form">Retype Password</label>
              <div class="q-mt-xs row justify-center">
                <q-input
                  class="q-ma-none q-pb-xs forminput"
                  v-model.trim="$v.signUp.rpassword.$model"
                  :error-message="rpasswordErrors"
                  :error="$v.signUp.rpassword.$anyError"
                  outlined
                  square
                  bg-color="white"
                  dense
                  type="password"
                  id="rpassword"
                  name="rpassword"
                />
              </div>
            </div>
            <q-btn class="q-mt-lg signupbtn" flat type="submit">
              <div class="signuptxt">Sign up</div>
            </q-btn>
          </q-form>
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
  sameAs,
  not,
  minLength
} from "../../../../assets/node_modules/vuelidate/lib/validators";
export default {
  name: "sign_up",
  data() {
    return {
      signUp: {
        username: "",
        email: "",
        password: "",
        rpassword: ""
      },
      bdUsername: "",
      bdEmail: "",
      index: sessionStorage.baseUrl + "index",
      register: sessionStorage.baseUrl + "register",
      instagram: sessionStorage.baseUrl + "instagram_register"
    };
  },
  validations: {
    signUp: {
      username: {
        required,
        minLength: minLength(5),
        sameAsUsername: not(
          sameAs(function() {
            return this.bdUsername;
          })
        )
      },
      email: {
        required,
        email,
        sameAsEmail: not(
          sameAs(function() {
            return this.bdEmail;
          })
        )
      },
      password: {
        required,
        minLength: minLength(8)
      },
      rpassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    usernameErrors() {
      if (!this.$v.signUp.username.required) return "* Required";
      if (!this.$v.signUp.username.minLength)
        return "The username must have at least 4 characters";
      if (!this.$v.signUp.username.sameAsUsername)
        return "The username is already in use";
    },
    emailErrors() {
      if (!this.$v.signUp.email.required) return "* Required";
      if (!this.$v.signUp.email.email)
        return "You must enter a valid email address";
      if (!this.$v.signUp.email.sameAsEmail)
        return "The email is already in use";
    },
    passwordErrors() {
      if (!this.$v.signUp.password.required) return "* Required";
      if (!this.$v.signUp.password.minLength)
        return "The password must have at least 8 characters";
    },
    rpasswordErrors() {
      if (!this.$v.signUp.rpassword.required) return "* Required";
      if (!this.$v.signUp.rpassword.rpassword)
        return "The password does not match";
    }
  },
  mounted() {
    console.log(sessionStorage);
  },
  methods: {
    onChangedUsername(value) {
      console.log(value);
      if (value.length > 5) {
        axios
          .post(sessionStorage.baseUrl + "app/verify_username", value)
          .then(response => {
            if (response.data === false) {
              this.bdUsername = value;
            } else {
              this.bdUsername = "";
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onChangedEmail(value) {
      console.log(value);
      axios
        .post(sessionStorage.baseUrl + "app/verify_email", value)
        .then(response => {
          if (response.data === false) {
            this.bdEmail = value;
          } else {
            this.bdEmail = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  onSubmit() {
    this.$v.signUp.$touch();
    if (!this.$v.signUp.$invalid) {
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
};
</script> 
<style>
</style>

