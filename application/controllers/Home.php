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

    public function __construct() {
        parent::__construct();
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

    public function index() {
        $data = array();
        $this->load->view('index', $data);
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

}
