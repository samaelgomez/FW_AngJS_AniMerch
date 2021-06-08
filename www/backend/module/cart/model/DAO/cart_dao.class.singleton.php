<?php

class cart_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function loadCart($figures) {
        $sql = "SELECT * FROM figures WHERE";
        
        foreach ($figures as $key => $value) {
            $sql .= " figureName = '".$value."' OR";
        }

        $sql = substr($sql, 0, -3);
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        connect::close($conexion);

        return $data;
    }

    public function substractStock($figures) {
        $conexion = connect::con();

        foreach ($figures as $key => $value) {
            $sql = "UPDATE figures SET stock = stock-".$value[1]." WHERE figureName = '".$value[0]."';";
            mysqli_query($conexion, $sql);
        }

        connect::close($conexion);
    }

    public function purchase($data) {
        $conexion = connect::con();

        foreach ($data[1] as $key => $value) {
            for ($i=0; $i < $value[1]; $i++) { 
                $sql = "INSERT INTO purchases (user, figure) VALUES ('".$data[0]."', '".$value[0]."');";
                mysqli_query($conexion, $sql);
            }
        }

        connect::close($conexion);
    }
}