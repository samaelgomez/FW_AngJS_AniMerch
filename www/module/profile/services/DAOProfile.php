<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';

function executor($query) {
    $connection = connect::con();
    $res = mysqli_query($connection, $query);

    if($res == true) {
        try {
            $data = [];
            while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                $data[] = $row;
            }
        } catch (\Throwable $th) {
            $data = [];
        }
    } else{
        return $data = null;
    }

    connect::close($connection);

    return $data;
}

function executorNoReturn($query) {
    $connection = connect::con();
    $resolve = true;
    $res = mysqli_query($connection, $query);

    connect::close($connection);
    return $res;
}