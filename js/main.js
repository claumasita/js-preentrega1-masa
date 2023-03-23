const getArticulo =()=> {
    //Solicita un código de Artículo
    // (Para facilitar el ingreso, se utiliza el código)
    let articulo = "0";
    do{
        articulo = parseInt(prompt("Seleccione el código de artículo (1-5). (Ingrese 0 para Cancelar)"));
        
        // En este caso, se puede verificar el articulo con un simple IF porque los 
        // códigos son correlativos entre 0 y 5.
        // Más adelante, se deberá cambiar el método de comprobación.
        if(articulo < parseInt("0") || articulo > parseInt("5")){
        
            // Fuerza el valor NaN para que se solicite un artículo nuevamente
            console.log("Código no válido.");
            articulo = NaN;
        }
    }while(isNaN(articulo))
    return articulo;
}

const getCantidad = (descrip, precio) =>{
    let cantidad = "0";

    // Solicita la Cantidad
    if(precio > parseInt("0")){
        do{
            cantidad = prompt("Ingrese la cantidad para el artículo " + descrip + ": $" + precio + " (0 para descartar item)");
            if(cantidad < parseInt("0")){
                // Fuerza el valor NaN para que se solicite el ingreso nuevamente
                console.log("Cantidad no válida.");
                cantidad = NaN;
            }
        }while(isNaN(cantidad))
        return parseInt(cantidad);
    }
}

const getPrecio = (codigo) =>{
    // Obtiene el precio unitario:
    switch (codigo){
        case parseInt("1"):
            return parseFloat("223.50");
        case parseInt("2"):
            return parseFloat("431.99");
        case parseInt("3"):
            return parseFloat("157.20");
        case parseInt("4"):
            return parseFloat("510.50");
        case parseInt("5"):
            return parseFloat("619.99");
        default:
            return parseFloat("0");
    }
}

const getDescrip = (codigo) =>{
    // Obtiene la Descripción del Artículo:
    switch (codigo){
        case parseInt("1"):
            return "Producto A";
        case parseInt("2"):
            return "Producto B";
        case parseInt("3"):
            return "Producto C";
        case parseInt("4"):
            return "Producto D";
        case parseInt("5"):
            return "Producto E";
        default:
            return "Producto no encontrado";
    }
}

const generarDetalle = (articulo, descrip, cantidad, totalItem) =>{
    return (descrip + " (cód. " + articulo + ") " + cantidad + " Un. SubTotal: $" + totalItem);
}

const agregarItem = (articulo, descrip, cantidad, precioUn) =>{
    let totalItem = "0";
    let detalle;
    totalItem = parseFloat(cantidad * precioUn).toFixed(2);
    detalle = generarDetalle(articulo, descrip, cantidad, totalItem);
    if(confirm("Agregar " + detalle + "?") === true){
        return totalItem;
    }else{
        return "0";
    };
}

const agregarDetalle = (detalle, articulo, descrip, cantidad, totalItem) =>{
    let linea = generarDetalle(articulo, descrip, cantidad, totalItem);
    if (detalle !== null){
        linea = detalle + "\n" + linea;
    }
    console.log("\nDetalle\n============\n" + linea);
    return linea;
}

const calcularTotal = (total, subTotal) =>{
    let miTotal = parseFloat(total) + parseFloat(subTotal);
    miTotal = miTotal.toFixed(2);
    console.log("SubTotal: $" + miTotal);
    return(miTotal);
}

const calcularDescuento = (total, porcentaje, beneficio) =>{
    let descuento = 0;
    if (parseFloat(total) >= parseFloat(beneficio)){
        descuento = ( parseFloat(porcentaje) * parseFloat(total) ) / parseInt("100");
        descuento = parseFloat(descuento).toFixed(2);
        console.log("Descuento(" + porcentaje + "%): $" + descuento);
    }
    return descuento;
}

const calcularFinal = (total, descuento) =>{
    valorFinal = (parseFloat(total - descuento)).toFixed(2);
    console.log("Total: $" + valorFinal);
    return valorFinal;
}

const mostrarFinal = (detalle, subTotal, descuento, porcentaje, montoFinal) =>{
    if(montoFinal > parseFloat("0")){
        let detalleFinal = "Detalle\n============\n" + detalle + "\n";
        detalleFinal = detalleFinal + "\n============\nSubtotal: $" + subTotal + "\n";
        if (descuento>parseFloat("0")){
            detalleFinal = detalleFinal + "Descuento(" + porcentaje + "%): $" + descuento + "\n";
        }else{
            detalleFinal = detalleFinal + "Descuento(" + porcentaje + "%): <No Aplica>\n";
        }
        detalleFinal = detalleFinal + "Total: $" + valorFinal;
        alert(detalleFinal)
    }
}

/*************************/
//   Función Principal
/*************************/
// La idea es que ejecute esta función luego de mostrar el contenido HTML.
// Por algún motivo, a veces muestra primero el HTML y luego corre el SCRIPT, pero otras veces, no.
// Otras personas que tuvieron ese problema lo solucionaron usando WINDOW.ONLOAD
window.onload = function(){
    //Declaración de Constantes
    const porcentaje = 10;
    const beneficio  = 15000;

    //Declaración de Variables
    let nombre;
    let articulo;
    let descripcion;
    let precioUn;
    let cantidad;
    let subTotal;
    let total = 0;
    let descuento = 0;
    let valorFinal = 0;
    let detalle = null;

    nombre = prompt("Ingrese nombre y apellido (Presiones ESC para cancelar el proceso)");

    // Verifica que el nombre no sea NULO
    if(nombre !== null){

        // Si el nombre no es NULO, comienza el proceso:
        console.log("Usuario: " + nombre);

        do{
        articulo = getArticulo();

            if(articulo !== parseInt("0")){
                descripcion = getDescrip(articulo);
                precioUn    = getPrecio(articulo);
                cantidad    = getCantidad(descripcion, precioUn);

                // Realiza los cálculos:
                if (cantidad > parseInt("0")){
                    subTotal   = agregarItem(articulo, descripcion, cantidad, precioUn);
                    
                    //Verifica que SubTotal no sea 0
                    //(el usuario pudo cancelar el proceso en "agregarItem")
                    if (subTotal > parseFloat("0")){
                        detalle    = agregarDetalle(detalle, articulo, descripcion, cantidad, subTotal);
                        total      = calcularTotal(total, subTotal);
                        descuento  = calcularDescuento(total, porcentaje, beneficio);
                        valorFinal = calcularFinal(total, descuento);
                    }
                }
            }
        }while(confirm("Desea agregar más artículos?"))
        mostrarFinal(detalle, total, descuento, porcentaje, valorFinal);
    }
}
