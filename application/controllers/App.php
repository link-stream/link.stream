<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

    private $loc_url = 'app';
    private $loc_path = ''; //app/
    private $error;
    private $ses_name = 'app_session';

    public function __construct() {
        parent::__construct();
        //Session
        $this->update_cookie();
        //Libraries
        $this->load->library('instagram_api');
        //Vars
        $this->error = '';
    }

    public function _remap($method, $params = array()) {
        $method = str_replace('-', '_', $method);
        if (method_exists(__CLASS__, $method)) {
            $count = count($params);
            if ($count == 0)
                $this->$method();
            elseif ($count == 1)
                $this->$method($params[0]);
            elseif ($count == 2)
                $this->$method($params[0], $params[1]);
            elseif ($count == 3)
                $this->$method($params[0], $params[1], $params[2]);
            elseif ($count == 4)
                $this->$method($params[0], $params[1], $params[2], $params[3]);
        } else {
            redirect('/' . $this->loc_url, 'location', 302);
        }
    }

    private function create_cookie($streamy_user) {
        $encrypted_user = $this->urlsafe_b64encode($streamy_user);
        $cookie_user = array(
            'name' => $this->ses_name,
            'value' => serialize(array('user' => $encrypted_user)),
            'expire' => 7200
        );
        $this->input->set_cookie($cookie_user);
    }

    private function get_cookie() {
        $cookie = unserialize($this->input->cookie($this->ses_name));
        $user_encrypt = $cookie['user'];
        $user = json_decode($this->urlsafe_b64decode($user_encrypt), true);
        return $user;
    }

    private function update_cookie() {
        if ($this->input->cookie($this->ses_name) != '') {
            $cookie_value = $this->input->cookie($this->ses_name);
            $cookie_user = array(
                'name' => $this->ses_name,
                'value' => $cookie_value,
                'expire' => 7200
            );
            $this->input->set_cookie($cookie_user);
        }
    }

    private function encrypt_txt($cadena) {
        $cadena_encriptada1 = md5($cadena); //Encriptacion nivel 1
        $cadena_encriptada2 = crc32($cadena_encriptada1); //Encriptacion nivel 1
        $cadena_encriptada3 = crypt($cadena_encriptada2, "xtemp"); //Encriptacion nivel 2
        $cadena_encriptada4 = sha1("xtemp" . $cadena_encriptada3); //Encriptacion nivel 3
        return $cadena_encriptada4;
    }

    public function urlsafe_b64encode($string) {
        $data = base64_encode($string);
        $data = str_replace(array('+', '/', '='), array('-', '_', '.'), $data);
        return $data;
    }

    public function urlsafe_b64decode($string) {
        $data = str_replace(array('-', '_', '.'), array('+', '/', '='), $string);
        $mod4 = strlen($data) % 4;
        if ($mod4) {
            $data .= substr('====', $mod4);
        }
        return base64_decode($data);
    }

    public function index() {
        $data = array();
        if ($this->input->cookie($this->ses_name) != '') {
            $user = $this->get_cookie();
            //echo 'Welcome ' . $user['user_name'];
            $data['user_name'] = $user['user_name'];
            $this->load->view('welcome_message', $data);


//            $var = $this->session->userdata;
//            echo $var['instagram-token'];
//            echo '<br>';
//            echo $var['instagram-user-id'];
//            echo '<br>';
//            $user = $this->instagram_api->getUserInfo($var['instagram-user-id'], 'id,username,account_type,media_count', $var['instagram-token']);
//            print_r($user);
//            echo '<br>';
        } else {
            $this->load->view('welcome_message', $data);
        }
    }

    /* Login & Register Section */

    public function login() {
        $data['error'] = '';
        $this->load->view($this->loc_path . 'login', $data);
    }

    public function register() {
        $data = array();
        if ($this->input->post()) {
            $email = $this->input->post('email', TRUE);
            $user = $this->input->post('user', TRUE);
            $password = $this->input->post('password', TRUE);
            $confirm_password = $this->input->post('confirm_password', TRUE);
            $password_encripted = $this->encrypt_txt($password);
            //Check Email And User
            //Create Account
            //Create Cookie
            $streamy_user = json_encode(array(
                'id' => '1',
                'email' => 'paolofq@gmail.com',
                'user_name' => 'paolo_streamy',
                'role' => '1',
                'instagram_id' => ''
            ));
            $this->create_cookie($streamy_user);
            redirect($this->loc_url, 'location', 302);
        }
        $this->load->view($this->loc_path . 'register', $data);
    }

    public function register_instagram() {
        $url = $this->instagram_api->instagramLogin(); //get credential
        redirect($url, 'location', 302);
    }

    public function instagram_callback() {
        //if (isset($_GET['code']) && $_GET['code'] != '') {}
        if (!empty($this->input->get('code'))) {
            $auth_response = $this->instagram_api->authorize($this->input->get('code', TRUE));
            //Set up session variables containing some useful Instagram data
//            $this->session->set_userdata('instagram-token', $auth_response->access_token);
//            $this->session->set_userdata('instagram-user-id', $auth_response->user_id);
//            redirect('http://localhost/streamy.link/app/index', 'location', 302);
            $access_token = $auth_response->access_token;
            $user_id = $auth_response->user_id;
            $user = $this->instagram_api->getUserInfo($user_id, 'id,username,account_type,media_count', $access_token);
            print_r($access_token);
            echo '<br>';
            print_r($user_id);
            echo '<br>';
            print_r($user);
            echo '<br>';
            $photoURL = $this->get_photo($user->username);
            print_r($photoURL);
            echo '<br>';
            //Create Cookie
//            $streamy_user = json_encode(array(
//                'id' => '1',
//                'email' => 'paolofq@gmail.com',
//                'user_name' => 'paolo_streamy',
//                'role' => '1',
//                'instagram_id' => ''
//            ));
//            $this->create_cookie($streamy_user);
//            redirect($this->loc_url, 'location', 302);
        }
    }

    private function get_photo($user_name) {
        $getValues = file_get_contents('https://www.instagram.com/' . $user_name . '/?__a=1');
        $jsonObj = json_decode($getValues, TRUE);
        $photoURL = $jsonObj["graphql"]["user"]["profile_pic_url_hd"];
        //print_r($photoURL);
        return $photoURL;
    }

//    public function register2() {
//
//        $data['error'] = '';
//        if (isset($_GET['code']) && $_GET['code'] != '') {
//            echo 'Response';
//            echo $_GET['code'];
//            $auth_response = $this->instagram_api->authorize($_GET['code']);
//            //print_r($auth_response);
//            //Set up session variables containing some useful Instagram data
//            $this->session->set_userdata('instagram-token', $auth_response->access_token);
////            $this->session->set_userdata('instagram-username', $auth_response->user->username);
////            $this->session->set_userdata('instagram-profile-picture', $auth_response->user->profile_picture);
//            $this->session->set_userdata('instagram-user-id', $auth_response->user_id);
////            $this->session->set_userdata('instagram-full-name', $auth_response->user->full_name);
//            //redirect($this->loc_url . '/register_2', 'location', 302);
//            redirect('http://localhost/streamy.link/app/register_2', 'location', 302);
//        }
//        $data['url'] = $this->instagram_api->instagramLogin(); //get credential
////        if (isset($_GET['code']) && $_GET['code'] != '') {
////            $auth_response = $this->instagram_api->authorize($_GET['code']);
////            // Set up session variables containing some useful Instagram data
//////            $this->session->set_userdata('instagram-token', $auth_response->access_token);
//////            $this->session->set_userdata('instagram-username', $auth_response->user->username);
//////            $this->session->set_userdata('instagram-profile-picture', $auth_response->user->profile_picture);
//////            $this->session->set_userdata('instagram-user-id', $auth_response->user->id);
//////            $this->session->set_userdata('instagram-full-name', $auth_response->user->full_name);
////            echo '<pre>';
////            print_r($auth_response);
////            echo '</pre>';
////        }else{
////            
////        }
//        //print_r($data['url']);
//        $this->load->view($this->loc_path . 'register', $data);
//    }
//
//    public function register_2() {
//        $var = $this->session->userdata;
//        echo $var['instagram-token'];
//        echo '<br>';
//        echo $var['instagram-user-id'];
//        echo '<br>';
//        $user = $this->instagram_api->getUserInfo($var['instagram-user-id'], 'id,username,account_type,media_count', $var['instagram-token']);
//        print_r($user);
//        echo '<br>';
////        $user2 = $this->instagram_api->getUserInfoMe('id,username,account_type,media_count', $var['instagram-token']);
////        print_r($user2);
//    }
//
//    public function google() {
//        
//    }

    /* End Login & Register Section */

    public function sound_cloud_test() {
        $url = "https://soundcloud.com/iamstarinthesky/snow-angel-feat-skele-and-shigaraki-prod-sogimura";
//$url = 'https://soundcloud.com/iamstarinthesky';
        $search_link = 'https://soundcloud.com/iamstarinthesky/if-stars-could-wish-feat-whywewish-prod-young-flaco';
//Get the JSON data of song details with embed code from SoundCloud oEmbed
        $getValues = file_get_contents('http://soundcloud.com/oembed?format=js&url=' . $url . '&iframe=true');
        print_r($getValues);
        echo '<br>';
        $pos = strpos($getValues, $search_link);
        echo '<br>';
        if ($pos === FALSE) {
            echo 'No exist';
        } else {
            echo 'Exist, Position: ' . $pos;
        }

//        //Clean the Json to decode
//        $decodeiFrame = substr($getValues, 1, -2);
//        //json decode to convert it as an array
//        $jsonObj = json_decode($decodeiFrame);
//        //Change the height of the embed player if you want else uncomment below line
//        //echo $jsonObj->html;
//        //Print the embed player to the page
//        echo str_replace('height="4000"', 'height="2400"', $jsonObj->html);
    }

//    public function sound_cloud_view() {
//        $data = array();
//        $this->load->view($this->loc_path . 'soundcloud', $data);
//    }
}
