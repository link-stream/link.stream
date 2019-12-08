<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Streamy Login</title>
    </head>
    <body>
        <div class="form-field-group">
            <a href="<?= base_url() . 'register_instagram' ?>">Log In Instagram</a>
        </div> 
        <br>
        <form action="" method="post" class="form-inline" role="form" id="login" >
            <div class="smart-forms">
                <div class="form-field-group">
                    <div class="form-group">
                        <label class="field">
                            <input type="text" id="email" name="email" class="gui-input ignore xinput" placeholder="" value="" required=""  tabindex="1">
                            <label for="email" class="placeholder">Email</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="field">
                            <input type="password" id="password" name="password" class="gui-input ignore xinput" placeholder="" value="" required=""  tabindex="2">
                            <label for="password" class="placeholder">Password</label>
                        </label>
                    </div>
                </div>
                <div id="error"><?= (!empty($error)) ? '<div class="addr_fail alert alert-danger">' . $error . '</div>' : '' ?></div>
                <br />
                <button type="submit" class="btn-pill btn-pill-outline-neg btn-lg btn-block">Log In</button>
                <br>
                <div class="form-field-group">
                    <a href="#">Forgot your password? Click to reset</a>
                </div> 
            </div>
        </form>
        <br>
        <div class="form-field-group">
            <a href="register">Don't have an account?</a>
        </div> 
    </body>
</html>
