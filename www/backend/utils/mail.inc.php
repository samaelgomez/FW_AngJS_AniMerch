<?php
//////
class mail {
    function setEmail($email) {
        $content = "";
        //////
        switch ($email['type']) {
            case 'recover';
                $email['fromEmail'] = 'samaelgomezherrera@gmail.com';
                $email['inputMatter'] = 'Recover password.';
                $content .= '<h2>Recover password.</h2>';
                $content .= '<a href = "http://localhost/#/auth/' . $email['token'] . '">Click here to recover your password.</a>';
                break;
                //////
            case 'validate';
                $email['fromEmail'] = 'samaelgomezherrera@gmail.com';
                $email['inputMatter'] = 'Email verification.';
                $content .= '<h2>Email verification.</h2>';
                $content .= '<a href = "http://localhost/#/auth/activate/' . $email['token'] . '">Click here to verify your email.</a>';
                break;
                //////
        }// end_switch
        //////
        $email['inputMessage'] .= $content;
        //////
        return self::sendMailGun($email);
    }// end_setEmail
    
    function sendMailGun($values) {
        $ini_file = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/backend/model/apis/apis.ini');
        $config = array();
        //////
        $config['api_key'] = $ini_file['mailGunKey'];
        $config['api_url'] = $ini_file['mailGunURL'];
        $message = array();
        $message['from'] = $values['fromEmail'];
        $message['to'] = $values['toEmail'];
        $message['h:Reply-To'] = $values['inputEmail'];
        $message['subject'] = $values['inputMatter'];
        $message['html'] = $values['inputMessage'];
        //////
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $config['api_url']);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_POST, true); 
        curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
        $result = curl_exec($ch);
        curl_close($ch);
        //////
        return $result;
    }// end_sendMailGun
}// end_mail