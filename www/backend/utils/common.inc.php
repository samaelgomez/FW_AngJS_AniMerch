<?php

class common {
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
}