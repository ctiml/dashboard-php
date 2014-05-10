<?php

class IndexController extends Pix_Controller
{
    public function init()
    {
        $this->doc = Doc::instance();
    }
    public function indexAction()
    {
        $this->view->menu = $this->doc->getMenu();
        $this->view->setjs = ['index.js'];
        $this->view->setcss = ['index.css'];
    }
}
