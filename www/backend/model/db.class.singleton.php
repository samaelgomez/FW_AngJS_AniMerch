<?php
	class db{
		static $_instance;
		
		public static function connect(){
			$ini_file = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/backend/model/apis/apis.ini');
			$connection = mysqli_connect($ini_file['host'], $ini_file['user'], $ini_file['pass'], $ini_file['database'], $ini_file['port']);

			return $connection;
		}

		public static function close($connection){
			mysqli_close($connection);
		}
}