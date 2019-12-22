<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Streamy Register</title>
    </head>
    <body>
        <div class="form-field-group">
            <a href="<?= base_url() . 'register_instagram' ?>">Register With Instagram</a>
        </div> 
        <br>
        <form action="" method="post" class="form-inline" role="form" id="login" >
            <div class="smart-forms">
                <div class="form-field-group">
                    <div class="form-group">
                        <label class="field">
                            <input type="text" id="email" name="email" class="gui-input ignore xinput" placeholder="" value="" tabindex="1">
                            <label for="email" class="placeholder">Email</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="field">
                            <input type="text" id="user" name="user" class="gui-input ignore xinput" placeholder="" value=""   tabindex="1">
                            <label for="user" class="placeholder">User Name</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="field">
                            <input type="password" id="password" name="password" class="gui-input ignore xinput" placeholder="" value=""   tabindex="2">
                            <label for="password" class="placeholder">Password</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="field">
                            <input type="password" id="confirm_password" name="confirm_password" class="gui-input ignore xinput" placeholder="" value=""   tabindex="2">
                            <label for="confirm_password" class="placeholder">Confirm Password</label>
                        </label>
                    </div>
                </div>
                <div id="error"><?= (!empty($error)) ? '<div class="addr_fail alert alert-danger">' . $error . '</div>' : '' ?></div>
                <br />
                <button type="submit" class="btn-pill btn-pill-outline-neg btn-lg btn-block">Register Now</button>
            </div>
        </form> 
        <br>
        <div class="form-field-group">
            <a href="login">Already have an account?</a>
        </div> 

    </body>
</html>
