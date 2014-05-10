<?php

class Doc
{
    protected static $_instance = null;
    public static function instance() {
        if (self::$_instance == null) {
            self::$_instance = new Doc();
        }
        return self::$_instance;
    }

    protected $_json = null;

    protected function __construct()
    {
        $fp = file_get_contents(ROOTPATH . "/" . Config::get('doc'));
        if (!$fp) {
            die ("Can't open doc file: " . Config::get('doc'));
        }
        $this->_json = json_decode($fp);
    }

    public function getMenu()
    {
        return $this->_json->menu;
    }

    public function getIndex($id, $sub_id)
    {
        $menu = array_pop(array_filter($this->_json->menu, function($a) use ($id) {
            return $a->id == $id;
        }));
        if (isset($sub_id) && isset($menu->submenu)) {
            $menu = array_pop(array_filter($menu->submenu, function($a) use ($sub_id) {
                return $a->id == $sub_id;
            }));
        }
        if ($menu && isset($menu->index)) {
            return $menu->index;
        } else {
            return [];
        }
    }
}
