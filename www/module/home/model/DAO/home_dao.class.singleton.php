<?php
//////
class home_dao {
    static $_instance;
    //////
    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }// end_if
        return self::$_instance;
    }// end_getInstance

    public function select_all_banners() {
        $sql = "SELECT * FROM images";
        
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