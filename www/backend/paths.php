<?php

define ('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/backend/'); // Site Root
define ('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . '/backend/'); // Site Path
define ('MODULES_PATH', SITE_ROOT . 'module/'); // Modules Path

// Home
define ('MODEL_PATH_HOME', SITE_ROOT . 'module/home/model/model/');

//Shop
define ('MODEL_PATH_SHOP', SITE_ROOT . 'module/shop/model/model/');

//Auth
define ('MODEL_PATH_AUTH', SITE_ROOT . 'module/auth/model/model/');

//Cart
define ('MODEL_PATH_CART', SITE_ROOT . 'module/cart/model/model/');