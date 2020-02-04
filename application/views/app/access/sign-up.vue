<template>
  <q-card class="self-center my-card" square flat bordered>
    <div class="row">
      <div class="col streamylink">
        <q-card-section class="q-pa-md row justify-center">
          <img src="assets/images/icons/streamy-logo.svg" alt="logo" class="logo" >
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-none row justify-center">
          <div class="logotext">LINKSTREAM</div>
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
          <q-form @submit.prevent.stop="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
            <div>
              <label class="form">Username</label>
              <div class="row justify-center">
                <q-input class="q-ma-none q-pb-xs forminput" v-model.trim="$v.username.$model" :error-message="usernameErrors" :error="$v.username.$anyError" @input="$v.username.$touch()" 
                  outlined square bg-color="white" bottom-slots dense @blur="evt => onChangedUsername(evt.target.value)" id="username" name="username" :loading="loadingUsername" />
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Email</label>
              <div class="q-mt-xs row justify-center">
                <q-input class="q-ma-none q-pb-xs forminput" v-model.trim="$v.email.$model" :error-message="emailErrors" :error="$v.email.$anyError" @input="$v.email.$touch()" 
                 outlined square bg-color="white" dense @blur="evt => onChangedEmail(evt.target.value)" type="email" id="email" name="email" :loading="loadingEmail" />
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Password</label>
              <div class="q-mt-xs row justify-center">
                <q-input class="q-ma-none q-pb-xs forminput" v-model.trim="$v.password.$model" :error-message="passwordErrors" :error="$v.password.$anyError" @input="$v.password.$touch()" 
                  outlined square bg-color="white" dense type="password" id="password" name="password">
                  <q-tooltip max-width="250px" content-style="font-size: 12px">Must contain upper and lower case letters, numbers and special characters (@#$%&) </q-tooltip>
                  </q-input>
              </div>
            </div>
            <div class="q-mt-md">
              <label class="form">Retype Password</label>
              <div class="q-mt-xs row justify-center">
                <q-input class="q-ma-none q-pb-xs forminput" v-model.trim="$v.repassword.$model" :error-message="repasswordErrors" :error="$v.repassword.$anyError" @input="$v.repassword.$touch()" 
                  outlined square bg-color="white" dense type="password" id="repassword" name="repassword" />
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
import { required, email, sameAs, not, minLength } from "../../../../assets/node_modules/vuelidate/lib/validators";
export default {
  props: {
    baseurl: {
      type: String,
      default: ""
    }
  },
  name: "sign_up",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repassword: "",
      bdUsername: "",
      bdEmail: "",
      index: this.baseurl + "index",
      register: this.baseurl + "register",
      instagram: this.baseurl + "instagram_register",
      loading: false,
      loadingUsername: false,
      loadingEmail: false,
      prueba: 'Must contain upper and lower case letters, numbers and (@#$%&)'
    };
  },
  validations: {    
    username: {
      required,
      minLength: minLength(5),
      sameAsUsername: not(sameAs(function() { return this.bdUsername })),
      isUsernameValid(username) {
        const regex = /^[a-zA-Z0-9_]*$/;
        return regex.test(username);
      }
    },
    email: {
      required,
      email,
      sameAsEmail: not(sameAs(function() { return this.bdEmail}))
    },
    password: {
      required,
      minLength: minLength(8),
      isPasswordValid(password) {
        const regex = /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
        return regex.test(password);
      }
    },
    repassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  computed: {
    usernameErrors() {
      if (!this.$v.username.required) return "* Required";
      if (!this.$v.username.minLength) return "The username must have at least 5 characters";
      if (!this.$v.username.sameAsUsername) return "The username is already in use";
      if (!this.$v.username.isUsernameValid) return "Only accept alphanumeric characters and _";
    },
    emailErrors() {
      if (!this.$v.email.required) return "* Required";
      if (!this.$v.email.email) return "You must enter a valid email address";
      if (!this.$v.email.sameAsEmail) return "The email is already in use";
    },
    passwordErrors() {
      if (!this.$v.password.required) return "* Required";
      if (!this.$v.password.minLength) return "The password must have at least 8 characters";
      if (!this.$v.password.isPasswordValid) return "Invalid format";
    },
    repasswordErrors() {
      if (!this.$v.repassword.required) return "* Required";
      if (!this.$v.repassword.repassword) return "The password does not match";
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
    onChangedUsername(value) {      
      if (value.length > 5) {
        this.loadingUsername = true;
        let formData = new FormData();
        formData.append('username', this.username);
        axios({
          method: 'post',
          url: this.baseurl + "app/verify_username",
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })        
        .then(response => {
          if (response.data === false) {
            this.bdUsername = value;
          } else {
            this.bdUsername = "";
          }
          this.loadingUsername = false
        })
        .catch(function(error) {
          console.log(error);
          this.loadingUsername = false
        });        
      }    
    },
    onChangedEmail(value) {
      this.loadingEmail =  true;
      let formData = new FormData();
      formData.append('email', this.email);
      axios({
          method: 'post',
          url: this.baseurl + "app/verify_email",
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        }) 
        .then(response => {
          if (response.data === false) {
            this.bdEmail = value;
          } else {
            this.bdEmail = "";
          }
          this.loadingEmail =  false;
        })
        .catch(function(error) {
          console.log(error);
          this.loadingEmail =  false
        })
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.loading = true;
        let formData = new FormData();
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('repassword', this.repassword);
        axios({
          method: 'post',
          url: this.baseurl + "app/register_js",
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => {
            if (response.data.status === "Success") {
              debugger
              window.location = "register_confirm";
            } else
              this.$q.notify({ message: response.data.msg, color: "negative", icon: "error" });
            this.loading = false;
          })
          .catch(function(error) {
            console.log(error);
            this.loading = false;
          });          
      }

/*

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
      }*/
    }
  },
  
};
</script> 
<style>
</style>

