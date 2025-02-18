// Función que añade fondo blanco al header al finalizar el scroll de la portada.
window.onscroll = function () {
    const portadaGif = document.getElementById('portada-gif');
    let headerIndex = document.getElementById("header-index");

    if(portadaGif) {
        if(window.scrollY > (portadaGif.clientHeight - headerIndex.clientHeight)) {
            headerIndex.style.backgroundColor = "white";
        } else {
            headerIndex.style.backgroundColor = "transparent";
        }
    }
}

// Función que hace visible/invisible los botones abrir/cerrar del menú hamburguesa.
function initHeaderMenu() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");
    
    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });
    
    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });
}

// Función que crea un efecto de sombra sobre contenedores.
function colorBox(event) {

    event.currentTarget.style.boxShadow = "10px 20px 30px #ffdb20";
}

// Función que vuelve transparente la sombra de color de la función colorBox().
function uncolorBox(event) {
    event.currentTarget.style.boxShadow = "0 0 0 transparent"
}

// Función que carga el archivo JSON.
function getNews() {
    $.ajax({
        url: 'https://lorenanv.github.io/LorenaJS/data/myData.json',
        type: 'GET',
        success: function (data) {
            let newsContainers = document.getElementsByClassName('container-news');

            for(let i = 0; i < newsContainers.length; i++) {
                newsContainers[i].innerHTML = `
                    <h4>${data.noticias[i].titulo}</h4>
                    <p>${data.noticias[i].fecha + ' | ' + data.noticias[i].fuente}</p>
                    <p>${data.noticias[i].contenido}</p>
                    <a class='news-enlace' href='${data.noticias[i].enlace}'>Ver más [...]</a>
                    <img class='news-img' src='${data.noticias[i].imagen}' alt='Post publicitario Brew Infine' width='1080' height='1080'>
                    `;
            }
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}

// Función que calcula el precio total.
function getTotalPrice() {
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.getElementsByClassName("extraProducto");
    let descuentoPlazo;
    let totalExtras = 0;
    let precioTotal = 0;

    if(plazo.value<=5){
        descuentoPlazo = 0.0;
    }else if(plazo.value<=15){
        descuentoPlazo = 3.99;
    }else{
        descuentoPlazo = 5.99;
    }

    for(let i = 0; i < extras.length; i++){
        if(extras[i].checked){
            totalExtras = totalExtras + 6;
        }
    }

    precioTotal = precioTotal + producto.value - descuentoPlazo + totalExtras;

    return precioTotal;
}

// Función que calcula el descuento según el plazo indicado.
function getTotalDiscount() {
    const plazo = document.getElementById("plazo");
    let descuentoPlazo;

    if(plazo.value<=5){
        descuentoPlazo = 0.0;
    }else if(plazo.value<=15){
        descuentoPlazo = 3.99;
    }else{
        descuentoPlazo = 5.99;
    }

    return descuentoPlazo;
}

// Función que muestra el precio total y el descuento aplicado al usuario.
function showTotalPrice() {
    const precioTotal = getTotalPrice();
    const descuentoTotal = getTotalDiscount();
    let precio = document.getElementById("precio");
    let descuento = document.getElementById("descuentoTotal");

    precio.innerHTML = precioTotal.toFixed(2) + "€";
    descuento.innerHTML = descuentoTotal.toFixed(2) + "€";
}

// Función que los datos del formulario introducidos por el usuario.
function validar(form) {
    let valido = true;
    let mensaje = 'No se ha podido enviar el formulario.';
    
    let nombre = form.firstName;
    let apellidos = form.lastName;
    let telefono = form.tlf;
    let correo = form.mail;

    const nombreRegEx = /[a-zA-Z]{3,15}$/;
    const apellidosRegEx = /^[A-Za-z]{3,20}(\s[A-Za-z]{3,20})*$/;
    const tlfRegEx = /^(\+34[\s\-]?)?(6|7|9)\d{8}$/;
    const mailRegEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

    if(nombreRegEx.test(nombre.value) == false) {
        valido = false;
        mensaje= mensaje + '\nIntroduzca un nombre válido.';
    }

    if(apellidosRegEx.test(apellidos.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca apellidos válidos.';
    }

    if(tlfRegEx.test(telefono.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca un número de teléfono válido (XXXXXXXXX).';
    }

    if(mailRegEx.test(correo.value) == false) {
        valido = false;
        mensaje = mensaje + '\nIntroduzca un email válido (texto@texto.ej).';
    }

    if (valido && form.checkValidity()){
       alert("Se ha enviado correctamente");
        
       return true;
    }else{
        alert(mensaje);
    
        return false;
    }
}