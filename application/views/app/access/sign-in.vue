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
                    <q-form @submit="onSubmit" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
                        <div class="q-mt-md">
                            <label class="form">Email address</label>
                            <div class="q-mt-xs row justify-center">   
                                <q-input class="q-ma-none q-pb-sm forminput" v-model.trim="sign_in.email" outlined square bg-color="white" dense type="email" id="email" name="email" 
                                    error-message="You must enter a valid email address" :error="!isEmailValid" no-error-icon ref="email" />
                            </div>
                        </div>                                
                        <div class="q-mt-md">
                            <label class="form">Password</label>
                            <div class="q-mt-xs row justify-center">                                    
                                <q-input class="q-ma-none q-pb-sm forminput" v-model="sign_in.password" outlined square bg-color="white" dense type="password" id="password" name="password"
                                    :rules="[val => !!val || 'The password is required']" no-error-icon ref="password"/>
                            </div>
                        </div>   
                        <q-btn class="q-mt-lg signupbtn" flat type="submit">
                            <div class="signuptxt">Sign in</div>
                        </q-btn>   
                        <div class="q-mt-lg forgotpassword"><a href="http://localhost/streamy.link/forgot">Forgot Password?</a></div>     
                    </q-form>                                                  
                </q-card-section>                            
            </div>
            <div class="col streamylink">                            
                <q-card-section class="q-pa-lg row justify-center btnemails">
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
        </div>                    
    </q-card>           
</template> 

<script>    
    import axios from '../../../../assets/node_modules/axios';
    export default {
        name: "sign_in",
        data () {
            return {  
                sign_in: {
                    email: '',
                    password: ''
                },
                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
                errorMessage: ''                
            }
        },
        computed: {
            isEmailValid () {
                return (this.sign_in.email == "")? "" : (this.reg.test(this.sign_in.email)) ? true : false;
            }
        },
        methods: {            
            onSubmit () { 
                if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
                    axios.post('http://localhost/streamy.link/login', this.sign_in)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } else console.log('eeeee')
            }
        }        
    }
</script> 

<style>
    body {
        background-color: rgb(0,0,0); 
        display: grid;
        height: 100vh;       
    }
    .horizontal-center {
        position: relative;
    }
    .vertical-center {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -251px 0 0 -339px;   
    } 

</style>