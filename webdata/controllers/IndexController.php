<?php

class IndexController extends Pix_Controller
{
    public function init()
    {
        $this->doc = new Doc();
    }
    public function indexAction()
    {
        $this->view->menu = $this->doc->getMenu();
        $this->view->setjs = ['index.js'];
        $this->view->setcss = ['index.css'];
    }
}
