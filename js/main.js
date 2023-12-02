const arrayDestinos = [{id: 1, descripcion: 'Refacciones de hogar 🏠', interes: 1.4987},
                       {id: 2, descripcion: 'Comprar vehículo 🚘 🏍️', interes: 1.3875},
                       {id: 3, descripcion: 'Vacaciones merecidas 🛳️🏖️', interes: 1.6267},
                       {id: 4, descripcion: 'Otros 🖥️💻📱🛵', interes: 1.8152},]

// ENLACE DOM A elementos HTML
const inputMonto = document.querySelector("input#montoPrestamo")
const inputPlazo = document.querySelector("input#plazoPago")
const selectDestinos = document.querySelector("select")
const btnCalcular = document.querySelector("button.button-calcular")

// LOGICA DE LA APLICACIÓN  

function cargarDestinos() {
    if (arrayDestinos.length > 0) {
        arrayDestinos.forEach((destino)=> {
            selectDestinos.innerHTML += `<option>${destino.descripcion}</option>`
        })
    }
}

function retornarInteres(descripcion) {
    let destino = arrayDestinos.find((destino)=> destino.descripcion === descripcion )
    return destino.interes
}

function guardarEnLS(dinero, meses, interes, cuota, destino) {
    let datosDelPrestamo = {
        dinero: dinero,
        meses: meses, 
        interes: interes,
        cuota: cuota,
        destino: destino
    }

    localStorage.setItem("DatosDelPrestamo", JSON.stringify(datosDelPrestamo))
}

function calcularPrestamo() {
    // recuperar datos cargados por el usuario en pantalla (HTML)
    let dineroSolicitado = parseInt(inputMonto.value)
    let plazoEnMeses = parseInt(inputPlazo.value)
    let interesAplicado = retornarInteres(selectDestinos.value)

    // instanciar el objeto Prestamo()
    const prestamo = new Prestamo(dineroSolicitado, interesAplicado, plazoEnMeses)
    let cuotaMensual = prestamo.calcularCuota()

    // guardar en LS los datos cargados
    guardarEnLS(dineroSolicitado, plazoEnMeses, interesAplicado, cuotaMensual, selectDestinos.value)

    // redireccionamos al usuario a la página detalle
    location.href = "cotizacion.html"
}


// EVENTO
btnCalcular.addEventListener("click", ()=> calcularPrestamo())

cargarDestinos()