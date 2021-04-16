<?php
	class connect{
		public static function con(){
			$host = 'mysql';  
    		$user = "root";                     
    		$pass = "samael";                             
    		$db = "figure_db";                      
    		$port = 3306;
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}