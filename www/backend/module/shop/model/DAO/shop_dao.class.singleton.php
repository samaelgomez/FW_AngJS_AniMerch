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

        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }
    
    public function searchProducts($search) {
        $sql = "SELECT * FROM figures WHERE figureName LIKE '%".$search."%';";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }

    public function getBrands() {
        $sql = "SELECT DISTINCT brand FROM figures;";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }

    public function getFranchises() {
        $sql = "SELECT DISTINCT franchise FROM figures;";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $data = [];
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        db::close($connection);

        return $data;
    }

    function addVisit($filters)
    {
        $sql = "UPDATE figures SET visits = visits + 1 WHERE ".$filters;
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);

        $sql = "SELECT * FROM figures WHERE ".$filters;
        $res = mysqli_query($connection, $sql);
        
        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        db::close($connection);

        return $data;
    }

    function addLike($data)
    {
        $sql = "INSERT INTO liked (figureName, username) VALUES ('".$data[1]."', '".$data[0]."');";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);
        
        $sql = "UPDATE figures SET likes = likes + 1 WHERE figureName = '".$data[1]."'";
        $res = mysqli_query($connection, $sql);

        $sql = "SELECT * FROM figures WHERE figureName = '".$data[1]."';";
        $res = mysqli_query($connection, $sql);

        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        db::close($connection);

        return $data;
    }

    function removeLike($data)
    {
        $sql = "DELETE FROM liked WHERE figureName = '".$data[1]."' AND username = '".$data[0]."';";
        
        $connection = db::connect();
        $res = mysqli_query($connection, $sql);
        
        $sql = "UPDATE figures SET likes = likes - 1 WHERE figureName = '".$data[1]."'";
        $res = mysqli_query($connection, $sql);

        $sql = "SELECT * FROM figures WHERE figureName = '".$data[1]."';";
        $res = mysqli_query($connection, $sql);

        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            $data[] = $row;
        }
        } catch (\Throwable $th) {
            $data = [];
        }

        db::close($connection);

        return $data;
    }
}