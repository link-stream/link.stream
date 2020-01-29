<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="google-signin-client_id" content="<?= GOOGLE_LOGIN_CLIENT_ID ?>">
        <title>Streamy - Login</title>
        <link rel="icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color.png" type="image/png">
        <link rel="apple-touch-icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color.png">
        <link rel="shortcut icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color_BkH_icon.ico" type="image/x-icon">
        <link href="<?= HTTP_ASSETS ?>css/streamy.css" rel="stylesheet" />
        <link href="<?= HTTP_ASSETS ?>node_modules/quasar/dist/quasar.min.css" rel="stylesheet" />
        <link href="<?= HTTP_ASSETS ?>node_modules/typeface-montserrat/index.css" rel="stylesheet" />   
    </head>
    <?php
        $data = array();        
    ?>
    <body>
        <div id="q-app1">            
            <template>  
                <q-card class="self-center my-card" square flat bordered>  
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
                                <div class="q-mt-md">
                                    <label class="form">Email address</label>
                                    <div class="q-mt-xs row justify-center">                                    
                                        <q-input class="q-ma-none q-pa-none forminput" v-model="email" outlined square bg-color="white" dense type="email" />
                                    </div>
                                </div>                                
                                <div class="q-mt-md">
                                    <label class="form">Password</label>
                                    <div class="q-mt-xs row justify-center">                                    
                                        <q-input class="q-ma-none q-pa-none forminput" v-model="password" outlined square bg-color="white" dense type="password" />
                                    </div>
                                </div>   
                                <q-btn class="q-mt-lg signupbtn" flat>
                                    <div class="signuptxt">Sign in</div>
                                </q-btn>   
                                <div class="q-mt-lg forgotpassword"><a href="#">Forgot Password?</a></div>                                                         
                            </q-card-section>                            
                        </div>
                        <div class="col streamylink">                            
                            <q-card-section class="q-pa-lg row justify-center btnemails">
                                <q-btn class="q-ma-xs btnemail" no-caps flat>
                                    <div>Sign up with email</div>
                                </q-btn>
                                <q-btn class="q-ma-xs btninstagram" no-caps flat>
                                    <div>Sign up with Instagram</div>
                                </q-btn>
                                <q-btn class="q-ma-xs btngoogle" no-caps flat>
                                    <div>Sign up with Google</div>
                                </q-btn>
                            </q-card-section>
                        </div>                        
                    </div>                    
                </q-card>           
            </template>
        <?php $this->load->view('app/_inc/footer-sign', $data); ?>

            <script src="<?= HTTP_ASSETS ?>node_modules/vue/dist/vue.min.js"></script>
            <script src="<?= HTTP_ASSETS ?>node_modules/quasar/dist/quasar.umd.min.js"></script>
            <script>
                new Vue({
                    el: '#q-app1',
                    components: {
                    },
                    data: function () {
                        return {                            
                            username: '',
                            email: '',
                            password: '',
                            rpassword: '',
                        }
                    }                    
                })
            </script>
            <script> var urlBase = "<?= base_url(); ?>";</script>            
        </div>
    </body>
</html>
<style lang="sass">
    body {
        background-color: rgb(0,0,0); 
        display: grid;
        height: 100vh;
        margin: 0;
        place-items: center center;
        align-items: center;
        justify-content: center;
    }

    .invalid-tooltip label{
        color:#ffffff !important;        
    }

    .my-card {    
        height: 503px;	
        width: 678px;     
        background-color: #FFFFFF;
        border-color: #F5F5F5;    
    }

    .streamylink {
        background-color: #F5F5F5;
        height: 503px;	
    }

    .signin {
        background-color: #FFFFFF;
        height: 503px;	
    }

    .logo {
        width: 52px;
        height: 52px;
        margin-top: 20px;
    }

    .logotext {     
        color: #000000;	
        font-family: Montserrat;	
        font-size: 16px;	
        font-weight: bold;	
        letter-spacing: 0.12px;	
        line-height: 24px;
    }

    .btnemail {
        box-sizing: border-box;	
        height: 37px;	
        width: 272px;	
        border: 2px solid #915EC6;	
        border-radius: 25px;
        color: #915EC6;	
        font-family: Montserrat;	
        font-size: 13px;	
        font-weight: 500;	
        line-height: 16px;
    }

    .btninstagram {
        box-sizing: border-box;	
        height: 37px;	
        width: 272px;	
        border: 2px solid #3897F1;	
        border-radius: 25px;
        color: #3898EF;	
        font-family: Montserrat;	
        font-size: 13px;	
        font-weight: 500;	
        line-height: 16px;	
        text-align: center;
    }

    .btngoogle {
        box-sizing: border-box;	
        height: 37px;	
        width: 272px;	
        border: 2px solid #F1736C;	
        border-radius: 25px;
        color: #F1736C;	
        font-family: Montserrat;	
        font-size: 13px;	
        font-weight: 500;	
        line-height: 16px;	
        text-align: center;
    }

    .signintxt {	
        margin-top: 30px;
        margin-left: 30px;
        height: 24px;	
        width: 67px;	
        color: #000000;	
        font-family: Montserrat;	
        font-size: 16px;	
        font-weight: bold;	
        letter-spacing: 0.12px;	
        line-height: 24px;
    }

    .form {	
        color: #000000;	
        font-family: Montserrat;	
        font-size: 14px;	
        letter-spacing: 0.11px;	
        line-height: 24px;
        margin-left: 30px;
    }

    .forminput {	
        width: 280px;
    }

    .signupbtn {
        height: 50px;	
        width: 156px;
        margin-left: 30px;
        border-radius: 25px;
        background-color: #DC2EA6;
    }

    .signuptxt {	
        height: 18px;	
        width: 75px;	
        color: #FFFFFF;	
        font-family: Montserrat;	
        font-size: 14px;	
        font-weight: bold;	
        letter-spacing: 2px;	
        line-height: 18px;	
        text-align: center;
    }

    .btnemails {
        margin-top: 175px;
    }

    .forgotpassword {
        color: #000000;	
        font-family: Montserrat;	
        font-size: 14px;	
        letter-spacing: 0.11px;	
        line-height: 24px;
        margin-left: 25px;        
    }

    a:link {
        color: #000000;	
    }

    a:visited {

    }

</style>