<div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input 
                type="text" 
                placeholder="Nombre Contacto" 
                id="nombre"
                value= "<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : ''; ?>"
                >

            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" placeholder="Nombre Empresa" id="empresa"
                value= "<?php  echo (isset($contacto['empresa'])) ? $contacto['empresa'] : '';  ?>"
                
                >
            </div>
            <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input type="tel" placeholder="Número Teléfono" id="telefono"
                value= "<?php  echo (isset($contacto['telefono'])) ? $contacto['telefono'] : '';  ?>"
                >
            </div>
            
        </div>

        <div class="campo enviar">
            <?php 
                $textoBtn = (isset($contacto['telefono'])) ? 'Guardar' : 'Añadir';
                $accion = (isset($contacto['telefono'])) ? 'editar' : 'crear';
                //operador ternario: es un if en una sola linea


            ?>
            
            <?php 
                if(isset($contacto['id'])){ ?>
                      <input type="hidden" id="id" value="<?php  echo $contacto['id'] ?>">

               <?php }  ?>
               <input type="hidden" id="accion" value="<?php  echo $accion; ?>">


            <input type="submit" value = "<?php  echo $textoBtn; ?>" >
         </div>
