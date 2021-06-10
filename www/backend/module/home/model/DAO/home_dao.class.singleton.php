<?php

class home_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_all_banners() {
        $sql = "SELECT * FROM images WHERE name LIKE 'Banner%'";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }

    public function select_all_categories() {
        $sql = "SELECT * FROM images WHERE name NOT LIKE 'Banner%';";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }
}