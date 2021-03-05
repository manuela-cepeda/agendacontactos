<?php 

function obtenerContactos(){
    include'bd.php';
    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos" );
    }catch(exception $e){
        echo "Eror!!" . $e->getMessage() . "<br>";
        return false;
    }
}


//OBTIENE UN CONTACTO Y TOMA UN ID

function obtenerContacto($id){
    include'bd.php';
    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos WHERE id=$id" );
    }catch(exception $e){
        echo "Eror!!" . $e->getMessage() . "<br>";
        return false;
    }
}

