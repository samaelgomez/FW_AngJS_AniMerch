<?php

class auth_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function login($formData) {
        $sql = "";
        
        $sql = "SELECT * FROM ".$formData[0].$formData[1][1]." WHERE username = '".$formData[1][1]."' AND pass = '".$formData[1][2]."'";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                $data[] = $row;
            }
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }

    public function createClient($username) {
        $sql = "";
        
        $sql = "CREATE TABLE if not exists client".$username." (
                    email       varchar(40) Primary Key not null,
                    username    varchar(25) not null,
                    pass        longtext    not null,
                    avatar      varchar(500)   DEFAULT 'https://i.imgur.com/XiyeGgN.jpeg',
                    money       varchar(12)    DEFAULT 0
                );";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }

    public function insertClient($formData) {
        $sql = "";
        
        $sql = "INSERT INTO client".$formData[1][1]." (email, username, pass)
        VALUES ('".$formData[1][0]."', '".$formData[1][1]."', '".$formData[1][2]."');";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }

    public function createShop($username) {
        $sql = "";
        
        $sql = "CREATE TABLE if not exists shop".$username." (
                    email       varchar(40) Primary Key not null,
                    brand_name  varchar(200) DEFAULT 'Kadokawa',
                    username    varchar(25),
                    pass        longtext,
                    avatar      varchar(500) DEFAULT 'https://i.imgur.com/XiyeGgN.jpeg',
                    FOREIGN KEY (brand_name) REFERENCES shops(shopName)
                );";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }

    public function insertShop($formData) {
        $sql = "";
        
        $sql = "INSERT INTO shop".$formData[1][1]." (email, username, pass)
        VALUES ('".$formData[1][0]."', '".$formData[1][1]."', '".$formData[1][2]."');";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }
}