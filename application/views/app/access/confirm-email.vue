<template>
    <div>
        <div class="top-nav">
            <q-card-section class="q-ma-none q-pa-none logo-linkstream">            
                <img :src="'assets/images/icons/streamy-logo.svg'" alt="logo" class="streamy-icon">
                <span class="linkstream">LINKSTREAM</span>
            </q-card-section>            
        </div>
        <div class="container">
            <q-card-section class="row justify-center social-sign-up-options">                      
              <div class="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 txt-login-big">Confirm Email Address</div>                                
              <div class="row justify-center enter-email txt-confirm-email">Please check your inbox to confirm your email address and complete sign up.</div>  
              <a href="#" class="row justify-center resend-confirmation link-login">Resend confirmation email</a>
            </q-card-section>                      
        </div> 
    </div>
</template>
<script>
import { required, email } from "../../../../assets/node_modules/vuelidate/lib/validators";
export default {
   props: {
    baseurl: {
      type: String,
      default: ""
    }
  },
  name: "confirm_email",
  data() {
    return {
      email: "",
      login: this.baseurl + "login",
      forgot: this.baseurl + "forgot",      
      index: this.baseurl + "index",
      register: this.baseurl + "register",
      instagram: this.baseurl + "instagram_register"
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