<?php

class Doc
{
    protected $_json = null;

    public function __construct()
    {
        $fp = file_get_contents(ROOTPATH . "/" . Config::get('doc'));
        if (!$fp) {
            die ("Can't open doc file: " . Config::get('doc'));
        }
        $this->_json = json_decode($fp);
        //var_dump($this->_json->menu);
    }

    public function getMenu() {
        return $this->_json->menu;
    }
}
