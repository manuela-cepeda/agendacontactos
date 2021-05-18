<?php
//credenciales de la base de datos

define('DB_USUARIO', 'mmeiobkozewfyc');
define('DB_PASSWORD', '271355a9f6d13799aeabd8f58ebb91ed9c478d648d2c430415a1e2e2072b680d');
define('DB_HOST', 'ec2-52-209-134-160.eu-west-1.compute.amazonaws.com');
define('DB_NOMBRE', 'd5qolsmqdf8h50');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE ); //opcion de quinto parametro si no funciona: el puerto o port

// echo $conn->ping(); // si entras a http://localhost/00%20AgendaPHP/inc/funciones/bd.php y ves un 1 es que hizo la ocnexion





?> 
