<?php

class common {
    function loadView($topPage, $view) {
        $topPage = VIEW_PATH_INC . $topPage;

        if ((file_exists($topPage)) && (file_exists($view))) {
            require_once ($topPage);
            require_once (VIEW_PATH_INC . 'header.html');
            require_once ($view);
            require_once (VIEW_PATH_INC . 'footer.html');
        }else {
            self::loadError();
        }
    }

    function accessModel($model, $function = null, $args = null) {
        $dir = explode('_', $model);
        $path = constant('MODEL_PATH_' . strtoupper($dir[0])) .  $model . '.class.singleton.php';
        if (file_exists($path)) {
            require_once ($path);
            if (method_exists($model, $function)) {
                $obj = $model::getInstance();
                if ($args != null) {
                    return call_user_func(array($obj, $function), $args);
                }
                return call_user_func(array($obj, $function));
            }
        }
        throw new Exception();
    }

    function friendlyURL($url) {
        $link = "";
        if (URL_FRIENDLY) {
            $url = explode("&", str_replace("?", "", $url));
            foreach ($url as $key => $value) {
                $aux = explode("=", $value);
                $link .=  $aux[1]."/";
            }
        } else {
            $link = "index.php?" . $url;
        }
        return SITE_PATH . $link;
    }
}