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
        
        if ($formData[0] = 'client') {
            $sql = "SELECT * FROM users WHERE username = '".$formData[1][1]."' AND pass = '".$formData[1][2]."'";
        } else {
            $sql = "SELECT * FROM shopusers WHERE username = '".$formData[1][1]."' AND pass = '".$formData[1][2]."'";
        }
        
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

    public function insertClient($formData) {
        $sql = "";
        $id = rand();
        
        $sql = "INSERT INTO users (id, email, username, pass, token)
        VALUES ('".$id."', '".$formData[0][1][0]."', '".$formData[0][1][1]."', '".$formData[0][1][2]."', '".$formData[1]."');";
        
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
        $id = rand();

        $sql = "INSERT INTO shopusers (id, email, username, pass, token)
        VALUES ('".$id."', '".$formData[0][1][0]."', '".$formData[0][1][1]."', '".$formData[0][1][2]."', '".$formData[1]."');";
        
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

    public function activate($token) {
        $sql = "";

        $sql = "UPDATE users SET activated = 1 WHERE token = '".$token."';";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $token;
    }

    public function tokenForRecover($email) {
        $sql = "";

        $sql = "SELECT token FROM users WHERE email = '".$email."';";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = "";
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                $data = $row;
            }
        } else {
            $data = null;
        }
        connect::close($conexion);

        return $data;
    }

    public function updatePass($data) {
        $sql = "";

        $sql = "UPDATE users SET pass = '".$data[0]."' WHERE token = '".$data[1]."';";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = true;
        } else {
            $data = false;
        }
        connect::close($conexion);

        return $data;
    }

    public function socialLogin($data) {
        $sql = "";

        if ($data[3] == 'google') {
            $sql = "SELECT * FROM users WHERE email = '".$data[1]."' AND id LIKE 'GM%'";
        } else {
            $sql = "SELECT * FROM users WHERE email = '".$data[1]."' AND id LIKE 'GH%'";
        }
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        if($res == true) {
            $data = "";
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                $data = $row;
            }
        } else {
            $data = null;
        }

        connect::close($conexion);

        return $data;
    }

    public function insertSocialLogin($data) {
        $sql = "";
        $id = rand();

        if ($data[0][3] == 'google') {
            $sql = "INSERT INTO users (id, email, username, pass, avatar, activated, token)
            VALUES ('GM".$id."', '".$data[0][1]."', '".$data[0][0]."', ' ', '".$data[0][2]."', '1', '".$data[1]."');";
        } else {
            $sql = "INSERT INTO users (id, email, username, pass, avatar, activated, token)
            VALUES ('GH".$id."', '".$data[0][1]."', '".$data[0][0]."', ' ', '".$data[0][2]."', '1', '".$data[1]."');";
        }
        
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