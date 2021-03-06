<?php

require 'autoload.php';
$_POST = json_decode(file_get_contents('php://input'), true);

class router {
    private $uriModule;
    private $uriFunction;
    private $nameModule;
    static $_instance;
    
    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function __construct() {
        $this -> uriModule = ($_GET['page']) ? $_GET['page'] : 'home';
        $this -> uriFunction = $_GET['op'] ? $_GET['op'] : 'list';
    }

    function routingStart() {
        try {
            call_user_func(array($this -> loadModule(), $this -> loadFunction()));
        }catch(Exception $e) {
            // common::loadError();
        }
    }
    
    private function loadModule() {
        if (file_exists('resources/modules.xml')) {
            $modules = simplexml_load_file('resources/modules.xml');
            foreach ($modules as $row) {
                if (in_array($this -> uriModule, (Array) $row -> uri)) {
                    $path = MODULES_PATH . $row -> name . '/controller/controller_' . (String) $row -> name . '.class.php';
                    if (file_exists($path)) {
                        require_once($path);
                        $controllerName = 'controller_' . (String) $row -> name;
                        $this -> nameModule = (String) $row -> name;
                        return new $controllerName;
                    }
                }
            }
        }
        throw new Exception('No module found.');
    }
    
    private function loadFunction() {
        $path = MODULES_PATH . $this -> nameModule . '/resources/functions.xml';
        if (file_exists($path)) {
            $functions = simplexml_load_file($path);
            foreach ($functions as $row) {
                if (in_array($this -> uriFunction, (Array) $row -> uri)) {
                    return (String) $row -> name;
                }
            }
        }
        throw new Exception('No function found.');
    }
}

router::getInstance() -> routingStart();