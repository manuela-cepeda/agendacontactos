
<?php 

if( isset($_POST['accion'])){
if($_POST['accion'] == 'crear'){
    //creara un nuevo registro en la base de datos

    require_once('../funciones/bd.php');

    //validar las entradas
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING); //GOOGLEAR FILTROS DE SANEAMIENTO PARA MAS INFO
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

    try{
        //prepare statement
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?,?,?)");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
        if($stmt->affected_rows == 1){
                $respuesta = array(
                'respuesta' =>'correcto',
            
                'datos' => array (
                    'nombre'=> $nombre,
                    'empresa'=> $empresa,
                    'telefono'=> $telefono,
                    'id_insertado' => $stmt->insert_id
                )
            );
        }
        $stmt->close();
        $conn->close();


    }catch(Exception $e){
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}
}

if( isset($_GET['accion'])){
if($_GET['accion']=='borrar'){
    require_once('../funciones/bd.php');
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
 
    try{
        //prepare statement
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id =?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if($stmt->affected_rows == 1){
                $respuesta = array(
                'respuesta' =>'correcto'
            );
        }
        $stmt->close();
        $conn->close();


    }catch(Exception $e){
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}
}

if( isset($_POST['accion'])){
    if($_POST['accion'] == 'editar'){
        //creara un nuevo registro en la base de datos

        require_once('../funciones/bd.php');

        //validar las entradas
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING); 
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

        try{
            //prepare statement
            $stmt = $conn->prepare("UPDATE contactos SET nombre=?, empresa=?, telefono=? WHERE id=?");
            $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                    $respuesta = array(
                    'respuesta' =>'correcto',
                                
                );
            }

            $stmt->close();
            $conn->close();
    
    
        }catch(Exception $e){
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
    
        echo json_encode($respuesta);
 


    }
}





?>