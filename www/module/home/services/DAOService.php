<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include ($path . 'model/connect.php');

class DAOService{

    function select_all_banners(): array
    {
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