document.addEventListener('DOMContentLoaded', inicializar);

const cuentas = [
    { "nombre": "María Rodríguez", "saldo": 200, "contraseña": "mR100" },
    { "nombre": "José Penagos", "saldo": 290, "contraseña": "jP100" },
    { "nombre": "Pedro Aristizabal", "saldo": 200, "contraseña": "pA100" },
    { "nombre": "Jesús Pedrozo", "saldo": 250, "contraseña": "jP100" },
    { "nombre": "Leidy Palma", "saldo": 550, "contraseña": "lP100" },
];

const nombresTransacción = [
    { "nombre": "Consulta de Saldo", "función": createFormSaldo },
    { "nombre": "Depoósito en Efectivo", "función": createFormDepósitoRetiro },
    { "nombre": "Retiro en Efectivo", "función": createFormDepósitoRetiro },
    { "nombre": "Terminar", "función": termiar },
];

function inicializar() {
    const listaCuentas = document.getElementById('listaCuentas');
    const listaTransacciones = document.getElementById('listaTransacciones');
    const formulario = document.getElementById('formulario');
    const mensaje = document.getElementById('mensaje');

    var cuentaActual;
    var transacciónActual;

    mostrarCuentas();
}

function mostrarCuentas() {
    for (let index = 0; index < cuentas.length; index++) {
        const element = cuentas[index];
        mostrarCuenta(element.nombre, false);
    }
}

function mostrarCuenta(nombre, disabled) {
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = nombre;
    button.id = nombre;
    button.disabled = disabled;
    button.addEventListener('click', createFormLogin);
    let li = document.createElement('li');
    li.appendChild(button);
    listaCuentas.appendChild(li);
}

function createFormLogin() {
    esconderFormulario();

    mensaje.textContent = "";

    // Tomo el contenido del botón presionado y lo guardo como nombre (nombre del cliente)
    let nombre = this.textContent;
    // En el listado de cuentas busco un elemento cuyo nombre sea igual al que estaba en el botón
    // y guardo toda la cuenta en cuentaActual
    cuentaActual = cuentas.find(element => element.nombre === nombre);

    let label = document.createElement('label');
    label.for = "contraseña";
    label.textContent = "Contraseña:";

    let input = document.createElement('input');
    input.type = "password";
    input.id = "contraseña";

    let button = document.createElement('button');
    button.type = "button";
    button.id = "continuarContraseña";
    button.textContent = "Continuar";
    button.addEventListener('click', validarContraseña)

    formulario.appendChild(label);
    formulario.appendChild(input);
    formulario.appendChild(button);
}

function validarContraseña() {
    let contraseña = document.getElementById('contraseña');
    if (contraseña.value != "") {
        let formulario = document.getElementById("formulario");
        esconderFormulario();
        if (cuentaActual.contraseña != contraseña.value) {
            mensaje.textContent = "Contraseña Incorrecta";
        }
        else {
            mensaje.textContent = `Bienvenid@ ${cuentaActual.nombre}`;
            esconderCuentas();
            mostrarTransacciones()
        }
    }
}

function esconderFormulario() {
    while (formulario.firstChild) {
        formulario.removeChild(formulario.firstChild);
    }
}

function muestraContraseña(contraseña) {
    alert(contraseña);
}

function esconderCuentas() {
    while (listaCuentas.firstChild) {
        listaCuentas.removeChild(listaCuentas.firstChild)
    }
    mostrarCuenta(cuentaActual.nombre, true);
}

function esconderTransacciones() {
    while (listaTransacciones.firstChild) {
        listaTransacciones.removeChild(listaTransacciones.firstChild)
    }
}

function mostrarTransacciones() {
    for (let index = 0; index < nombresTransacción.length; index++) {
        const element = nombresTransacción[index];
        mostrarTransacción(element);
    }
}

function mostrarTransacción(element) {
    let button = document.createElement('button');
    button.type = "button";
    button.id = element.nombre;
    button.textContent = element.nombre;
    button.addEventListener('click', element.función);

    let li = document.createElement('li');
    li.appendChild(button);

    listaTransacciones.appendChild(li);
}

function createFormSaldo() {
    esconderFormulario();

    let label = document.createElement('label');
    label.textContent = "Saldo: ";

    let labelSaldo = document.createElement('label');
    labelSaldo.textContent = cuentaActual.saldo;

    formulario.appendChild(label);
    formulario.appendChild(labelSaldo);
}

function createFormDepósitoRetiro() {
    esconderFormulario();
    mensaje.textContent = "";

    // Tomo el contenido del botón presionado y lo guardo como nombre (nombre de la transacción)
    let nombre = this.textContent;
    // En el listado de transacciones busco un elemento cuyo nombre sea igual al que estaba en el botón
    // y guardo toda la transacción en transacciónActual
    transacciónActual = nombresTransacción.find(element => element.nombre === nombre);

    let label = document.createElement('label');
    label.for = "monto";
    label.textContent = nombre;

    let input = document.createElement('input');
    input.type = "number";
    input.id = "monto";

    let button = document.createElement('button');
    button.type = "button";
    button.id = "continuar";
    button.textContent = "Continuar";
    button.addEventListener('click', actualiceSaldo)

    formulario.appendChild(label);
    formulario.appendChild(input);
    formulario.appendChild(button);
}

function actualiceSaldo() {
    let input = document.getElementById('monto');

    if (transacciónActual.nombre == "Depoósito en Efectivo") {
        cuentaActual.saldo += parseInt(input.value);
        if (cuentaActual.saldo > 990) {
            esconderFormulario();
            mensaje.textContent = "No puede exceder el saldo máximo de 990";
            cuentaActual.saldo -= parseInt(input.value);
        }
    }
    else{
        cuentaActual.saldo -= parseInt(input.value);
        if (cuentaActual.saldo < 10) {
            esconderFormulario();
            mensaje.textContent = "El saldo mínimo permitido es 10";
            cuentaActual.saldo += parseInt(input.value);
        }
    }

    esconderFormulario();
    createFormSaldo();
}

function createFormRetiro() {
    esconderFormulario();
}

function termiar() {
    esconderFormulario()
    esconderTransacciones()
    listaCuentas.removeChild(listaCuentas.firstChild);
    mostrarCuentas();
    mensaje.textContent = "";
}
