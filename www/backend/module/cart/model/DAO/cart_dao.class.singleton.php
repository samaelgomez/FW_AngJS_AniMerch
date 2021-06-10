<?php

class cart_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function loadCart($username) {
        $sql = "SELECT * FROM figures
        WHERE figureName IN (SELECT figure FROM cart WHERE user = '$username');";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }

    public function addToCart($data) {
        $connection = db::connect();

        $sql = "SELECT * FROM cart WHERE user = '$data[0]' AND figure = '$data[1]';";
        $res = mysqli_query($connection, $sql)->fetch_object();

        if (!$res) {
            $sql = "INSERT INTO cart (user, figure) VALUES ('".$data[0]."', '".$data[1]."');";
            mysqli_query($connection, $sql);
        }

        db::close($connection);
    }

    public function removeFromCart($data) {
        $connection = db::connect();

        $sql = "DELETE FROM cart WHERE user = '$data[0]' AND figure = '$data[1]';";
        mysqli_query($connection, $sql);

        db::close($connection);
    }

    public function substractStock($figures) {
        $connection = db::connect();

        foreach ($figures as $key => $value) {
            $sql = "UPDATE figures SET stock = stock-".$value[1]." WHERE figureName = '".$value[0]."';";
            mysqli_query($connection, $sql);
        }

        db::close($connection);
    }

    public function purchase($data) {
        $connection = db::connect();

        foreach ($data[1] as $key => $value) {
            for ($i=0; $i < $value[1]; $i++) { 
                $sql = "INSERT INTO purchases (user, figure) VALUES ('".$data[0]."', '".$value[0]."');";
                mysqli_query($connection, $sql);
                $sql = "DELETE FROM cart WHERE user = '$data[0]' AND figure = '$value[0]';";
                mysqli_query($connection, $sql);
            }
        }

        db::close($connection);
    }
}