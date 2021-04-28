<?php

class shop_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_all_figures() {
        $sql = "SELECT * FROM figures ORDER BY visits DESC";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        connect::close($conexion);

        return $data;
    }
}