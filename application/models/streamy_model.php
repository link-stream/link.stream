<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of streamy
 *
 * @author paolo
 */
class Streamy_model extends CI_Model {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    public function insert_streamy($data) {
        $this->db->insert('streamy', $data);
        return $this->db->insert_id();
    }

    public function update_streamy($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('streamy', $data);
    }

    public function fetch_streamy_by_id($id) {
        $this->db->from('streamy');
        $this->db->where('id', $id);
        $query = $this->db->get();
        $result = $query->row_array();
        $query->free_result();
        return $result;
    }

    public function fetch_streamys_by_search($search) {
        $this->db->from('streamy');
        if (!empty($search['user'])) {
            $this->db->where('user', $search['user']); //By Usew
        }
        if (!empty($search['type'])) {
            $this->db->where('type', $search['type']); //By Type
        }
        if (!empty($search['public'])) {
            $this->db->where('public', $search['public']); //By Public
        }
        if (!empty($search['status'])) {
            $this->db->where('status', $search['status']); //By Status
        }
        if (!empty($search['status'])) {
            $this->db->where('status', $search['status']); //By Status
        }
        $query = $this->db->get();
        $result = $query->result_array();
        $query->free_result();
        return $result;
    }

}
