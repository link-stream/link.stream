<html>
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
        <div id="q-app">  
            <q-layout class="horizontal-center"> 
                <q-page-container class="vertical-center">  
                    <?= $body_content ?>    
                </q-page-container>
            </q-layout>            
        </div>
        <script src="assets/public/app.js"></script>
        <script> var urlBase = "<?= base_url(); ?>";</script> 
    </body>
</html>
