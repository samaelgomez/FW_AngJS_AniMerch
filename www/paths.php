<?php

define ('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/'); // Site Root
define ('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST']); // Site Path
define ('MODULES_PATH', SITE_ROOT . 'module/'); // Modules Path
define ('VIEW_PATH_INC', SITE_ROOT . 'view/inc/'); // View Path Inc

// Home
define ('VIEW_PATH_HOME', SITE_ROOT . 'module/home/view/');
define ('MODEL_PATH_HOME', SITE_ROOT . 'module/home/model/model/');

// Friendly
define('URL_FRIENDLY', TRUE);

if ($_GET['op'] == 'get') {
    echo json_encode(URL_FRIENDLY);
}