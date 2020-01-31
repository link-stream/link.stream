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
                    <q-btn class="q-ma-xs btnemail" no-caps flat type="a" href="http://localhost/streamy.link/register">
                        <div>Sign up with email</div>
                    </q-btn>
                    <q-btn class="q-ma-xs btninstagram" no-caps flat type="a" href="http://localhost/streamy.link/instagram_register">
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
                    <q-form @submit="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
                        <div>
                            <label class="form">Username</label>
                            <div class="row justify-center">                                    
                                <q-input class="q-ma-none q-pa-none forminput" v-model="sign_up.username" outlined square bg-color="white" dense id="username" name="username"
                                        :rules="[val => !!val || 'The username is required']" no-error-icon ref="username" lazy-rules/>
                            </div>
                        </div>
                        <div class="q-mt-md">
                            <label class="form">Email</label>
                            <div class="q-mt-xs row justify-center">                                    
                                <q-input class="q-ma-none q-pa-none forminput" v-model="sign_up.email" outlined square bg-color="white" dense type="email" id="email" name="email" 
                                        error-message="You must enter a valid email address" :error="!isEmailValid" no-error-icon ref="email" lazy-rules/>
                            </div>
                        </div>                                
                        <div class="q-mt-md">
                            <label class="form">Password</label>
                            <div class="q-mt-xs row justify-center">                                    
                                <q-input class="q-ma-none q-pa-none forminput" v-model="sign_up.password" outlined square bg-color="white" dense type="password" id="password" name="password"
                                        :rules="[val => !!val || 'The password is required']" no-error-icon ref="password" lazy-rules/>
                            </div>
                        </div>                                
                        <div class="q-mt-md">
                            <label class="form">Retype Password</label>
                            <div class="q-mt-xs row justify-center">                                    
                                <q-input class="q-ma-none q-pa-none forminput" v-model="sign_up.rpassword" outlined square bg-color="white" dense type="password" id="rpassword" name="rpassword"
                                        error-message="The password does not match" :error="!isRPasswordValid" no-error-icon ref="rpassword" lazy-rules/>
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
    export default {
        name: "sign_up",
        data () {
            return {    
                sign_up: {
                    username: '',
                    email: '',
                    password: '',
                    rpassword: ''
                },
                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
                errorMessage: ''                
            }
        },
        computed: {
            isEmailValid () {
                return (this.sign_up.email == "")? "" : (this.reg.test(this.sign_up.email)) ? true : false;
            },
            isRPasswordValid () {
                return (this.sign_up.rpassword == "")? "" : (this.sign_up.rpassword === this.sign_up.password) ? true : false;
            }
        },  
    }
</script> 
<style>
    body {
        background-color: rgb(0,0,0); 
        display: grid;
        height: 100vh;
        margin: 0;
        place-items: center center;
        align-items: center;
        justify-content: center;
    }
</style>

