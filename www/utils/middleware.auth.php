<?php
    ////////////////////////////////////////////////
    //https://github.com/miguelangel-nubla/JWT-PHP//
    ////////////////////////////////////////////////
    include(__DIR__ . "/../classes/JWT.php");

    function token($action, $data) {
        $header = '{"typ":"JWT", "alg":"HS256"}';
        $secret = 'elpsycongroo';
        
        $JWT = new JWT;
        if($action == 'encode') {
            $payload = '{
                "iat":'.'20000000000'.', 
                "exp":'.'20000003600'.',
                "name":"'.$data.'"
            }';

            return $token = $JWT->encode($header, $payload, $secret);
        } else {
            $JWT->decode($data, $secret);

            return $JWT;
        }
    }