<?php
//credenciales de la base de datos

define('DB_USUARIO', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'agendaphp');

$conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE ); //opcion de quinto parametro si no funciona: el puerto o port

// echo $conn->ping(); // si entras a http://localhost/00%20AgendaPHP/inc/funciones/bd.php y ves un 1 es que hizo la ocnexion





?> 