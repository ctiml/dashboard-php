<?php

class ApiController extends Pix_Controller
{
    public function init()
    {
        $this->doc = Doc::instance();
    }

    public function getindexAction()
    {
        list(, /*api*/, /*getindex*/, $id, $sub_id) = explode('/', $this->getURI());
        if (!$id) {
            $id = Config::get('home');
        }
        return $this->json($this->doc->getIndex($id, $sub_id));
    }
}
