<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Home
 *
 * @author paolo
 */
class Home extends CI_Controller {

    //put your code here
    private $loc_url = 'app';
    private $loc_path = 'home';
    private $error;
    private $ses_name = 'app_session';
    private $limit = 9;

    public function __construct() {
        parent::__construct();
        //Vars
        $this->error = '';
        //Models
        $this->load->model("user_model");
        $this->load->model("streamy_model");
        $this->load->model("visitor_model");
        //
        $this->load->library('user_agent');
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

    public function index() {
        $username = $this->uri->segment(1);
        if (!empty($username)) {
            $register_user = $this->user_model->fetch_user_by_search(array('user_name' => $username));
            if (!empty($register_user)) {
                $data = array();
                $streamys = $this->streamy_model->fetch_streamys_by_search(array('user' => $username, 'status' => '1'), $this->limit, 0);
                $streamys_count = $this->streamy_model->fetch_streamys_count_by_search(array('user' => $username, 'status' => '1'));
                $stramy_list = array();
                foreach ($streamys as $streamy) {
                    // $stramy_list[] = $this->streamy_desc($streamy);
//                    $streamy['embeed'] = ''; //$this->embed_url($streamy['url'], $streamy['type']);
//                    $streamy['type_desc'] = ($streamy['type'] == '1') ? 'SoundCloud' : (($streamy['type'] == '2') ? 'YouTube' : 'LinkStreams');
//                    $streamy['public_desc'] = ($streamy['public'] == '1') ? 'Public' : 'Private';
//                    $streamy['priority_desc'] = ($streamy['priority'] == '1') ? 'High' : (($streamy['priority'] == '2') ? 'Normal' : 'Low');
//                    $streamy['publish_at'] = date('m/d/Y', strtotime($streamy['publish_at']));
//                    $stramy_list[] = $streamy;
                }
                $data['streamys'] = $stramy_list;
                //$data['streamys_view'] = $this->load->view('app/content/my_content_list', $data, true);
                //$data['streamys_nav'] = ''; 
                $data['user'] = $register_user;
                //Update Analytics
                $this->analytics($register_user);
                //
                $this->load->view('app/content/my_live_content', $data);
            } else {
                $data = array();
                $this->load->view($this->loc_path . 'index', $data);
            }
        } else {
            $data = array();
            $this->load->view($this->loc_path . '/index', $data);
        }
        //$this->load->view($this->loc_path . '/index');
    }

    private function analytics($register_user) {
        $session_id = session_id();
        $visitor = $this->visitor_model->fetch_visitor_by_search(array('user_id' => $register_user['id'], 'session_id' => $session_id));
        if (empty($visitor)) {
            //IP
            $ip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
            $ip = ($ip == '::1') ? '170.55.19.206' : $ip;
            //
            //USER AGENT
            if ($this->agent->is_browser()) {
                $agent = $this->agent->browser() . ' ' . $this->agent->version();
            } elseif ($this->agent->is_robot()) {
                $agent = $this->agent->robot();
            } elseif ($this->agent->is_mobile()) {
                $agent = $this->agent->mobile();
            } else {
                $agent = 'Unidentified User Agent';
            }
            $platform = $this->agent->platform(); // Platform info (Windows, Linux, Mac, etc.)
            //
        //LOCATION
            $location = file_get_contents('http://ip-api.com/json/' . $ip);
            $data_loc = json_decode($location, true);
            //
            $data = array(
                'user_id' => $register_user['id'],
                'session_id' => $session_id,
                'ip' => $ip,
                'agent' => $agent,
                'platform' => $platform,
                'country' => ($data_loc['status'] == 'success') ? $data_loc['country'] : 'United States',
                'countryCode' => ($data_loc['status'] == 'success') ? $data_loc['countryCode'] : 'US',
                'region' => ($data_loc['status'] == 'success') ? $data_loc['region'] : 'FL',
                'regionName' => ($data_loc['status'] == 'success') ? $data_loc['regionName'] : 'Florida',
                'city' => ($data_loc['status'] == 'success') ? $data_loc['city'] : 'Miami',
                'zip' => ($data_loc['status'] == 'success') ? $data_loc['zip'] : '33132',
                'lat' => ($data_loc['status'] == 'success') ? $data_loc['lat'] : '25.7806',
                'lon' => ($data_loc['status'] == 'success') ? $data_loc['lon'] : '-80.1826',
                'timezone' => ($data_loc['status'] == 'success') ? $data_loc['timezone'] : 'America/New_York'
            );
//            echo '<pre>';
//            print_r($data);
//            echo '</pre>';
            //VISITOR
            $this->visitor_model->insert_visitor($data);
        }
    }

    public function landing_click() {
        $data = array();
        $this->load->view($this->loc_path . '/landing-click', $data);
    }

    public function landing_form() {
        $data = array();
        $this->load->view($this->loc_path . '/landing-form', $data);
    }

    public function landing_lead() {
        $data = array();
        $this->load->view($this->loc_path . '/landing-lead', $data);
    }

    public function legal() {
        $data = array();
        $this->load->view($this->loc_path . '/legal', $data);
    }

}
