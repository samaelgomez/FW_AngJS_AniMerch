<?php

class shop_dao {
    static $_instance;

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_all_figures($username) {
        if ($username == 'guest') {
            $sql = "SELECT * FROM figures";
        } else {
            $sql = "SELECT *, 
                            IF((SELECT figureName FROM liked WHERE liked.figureName = figures.figureName AND liked.username = '".$username."') IS NULL, '', 'active') AS liked 
                            FROM figures";
        }
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        connect::close($conexion);

        return $data;
    }

    public function getBrands() {
        $sql = "SELECT DISTINCT brand FROM figures;";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        connect::close($conexion);

        return $data;
    }

    public function getFranchises() {
        $sql = "SELECT DISTINCT franchise FROM figures;";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        connect::close($conexion);

        return $data;
    }

    function select_filtered_figures($filters)
    {
        if ($filters[1] == 'guest') {
            $sql = "SELECT * FROM figures WHERE ".$filters[0];
        } else {
            $sql = "SELECT *, 
                            IF((SELECT figureName FROM liked WHERE liked.figureName = figures.figureName AND liked.username = '".$filters[1]."') IS NULL, FALSE, TRUE) AS liked 
                            FROM figures WHERE ".$filters[0];
        }
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        connect::close($conexion);

        return $data;
    }

    function addVisit($filters)
    {
        $sql = "UPDATE figures SET visits = visits + 1 WHERE ".$filters;
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        $sql = "SELECT * FROM figures WHERE ".$filters;
        $res = mysqli_query($conexion, $sql);
        
        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        connect::close($conexion);

        return $data;
    }

    function addLike($data)
    {
        $sql = "INSERT INTO liked (figureName, username) VALUES ('".$data[1]."', '".$data[0]."');";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        
        $sql = "UPDATE figures SET likes = likes + 1 WHERE figureName = '".$data[1]."'";
        $res = mysqli_query($conexion, $sql);

        $sql = "SELECT * FROM figures WHERE figureName = '".$data[1]."';";
        $res = mysqli_query($conexion, $sql);

        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        connect::close($conexion);

        return $data;
    }

    function removeLike($data)
    {
        $sql = "DELETE FROM liked WHERE figureName = '".$data[1]."' AND username = '".$data[0]."';";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        
        $sql = "UPDATE figures SET likes = likes - 1 WHERE figureName = '".$data[1]."'";
        $res = mysqli_query($conexion, $sql);

        $sql = "SELECT * FROM figures WHERE figureName = '".$data[1]."';";
        $res = mysqli_query($conexion, $sql);

        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        connect::close($conexion);

        return $data;
    }
}