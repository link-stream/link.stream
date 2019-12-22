<?php

/*
  |--------------------------------------------------------------------------
  | Instagram
  |--------------------------------------------------------------------------
  |
  | Instagram client details
  |
 */


$url = (isset($_SERVER['HTTP_HOST'])) ? $_SERVER['HTTP_HOST'] : 'www.streamy.link';
$chk = explode('.', $url);
if ($chk[0] == "localhost") {
    $config['instagram_client_name'] = 'Streamy.link';
    $config['instagram_client_id'] = '697592760647122';
    $config['instagram_client_secret'] = '6d3fb59a094855ce9471b9c88e8bfbbe';
    $config['instagram_callback_url'] = 'https://localhost/streamy.link/app/instagram_oauth'; //e.g. http://yourwebsite.com/authorize/get_code/
    $config['instagram_website'] = 'https://localhost/streamy.link'; //e.g. http://yourwebsite.com/
    $config['instagram_description'] = '';
    //$db['default']['db_debug'] = TRUE;
} elseif ($chk[0] == "streamylinkdevenv") {
    $config['instagram_client_name'] = 'Streamy.link';
    $config['instagram_client_id'] = '697592760647122';
    $config['instagram_client_secret'] = '6d3fb59a094855ce9471b9c88e8bfbbe';
    $config['instagram_callback_url'] = 'https://streamy-dev.streamy.link/app/instagram_oauth'; //e.g. http://yourwebsite.com/authorize/get_code/
    $config['instagram_website'] = 'https://streamy-dev.streamy.link'; //e.g. http://yourwebsite.com/
    $config['instagram_description'] = '';
} else {
    $config['instagram_client_name'] = 'Streamy.link';
    $config['instagram_client_id'] = '697592760647122';
    $config['instagram_client_secret'] = '6d3fb59a094855ce9471b9c88e8bfbbe';
    $config['instagram_callback_url'] = 'https://www.streamy.link/app/instagram_oauth'; //e.g. http://yourwebsite.com/authorize/get_code/
    $config['instagram_website'] = 'https://www.streamy.link'; //e.g. http://yourwebsite.com/
    $config['instagram_description'] = '';
}


/**
 * Instagram provides the following scope permissions which can be combined as likes+comments
 * 
 * basic - to read any and all data related to a user (e.g. following/followed-by lists, photos, etc.) (granted by default)
 * comments - to create or delete comments on a user’s behalf
 * relationships - to follow and unfollow users on a user’s behalf
 * likes - to like and unlike items on a user’s behalf
 * 
 */
$config['instagram_scope'] = '';

// There was issues with some servers not being able to retrieve the data through https
// If you have this problem set the following to FALSE 

$config['instagram_ssl_verify'] = TRUE;
