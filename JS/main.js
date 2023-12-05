// main.js

const btnCalcular = document.getElementById('btnCalcular');
const cuotaResultado = document.getElementById('cuota');
const interes = document.getElementById('interes');
const capital = document.getElementById('capital');
const plazo = document.getElementById('plazo');
const total = document.getElementById('total');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const cuotaDisplay = document.querySelector('.cuota');
cuotaDisplay.style.display = 'none';

function mostrarMensaje(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        button: false,
        timer: 3000,
    });
    cuotaDisplay.style.display = 'none';
}

function calcular() {
    const valoresVacios = interes.value === '' || capital.value === '' || plazo.value === '';
    if (valoresVacios) {
        mostrarMensaje('error', 'Oops!', 'Todos los valores son obligatorios!');
        return;
    }

    const valoresNegativos = interes.value < 0 || capital.value < 0 || plazo.value < 0;
    if (valoresNegativos) {
        mostrarMensaje('error', 'Oops!', 'Los valores no pueden ser negativos!');
        return;
    }

    const tasaInteresMensual = parseFloat(interes.value) / 100 / 12;
    const montoPrestamo = parseFloat(capital.value);
    const plazoMeses = parseFloat(plazo.value);

    const cuota = montoPrestamo * tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));

    cuotaResultado.innerHTML = `
        La cuota mensual es: <strong>${formatter.format(cuota)}</strong><br>
        El pago de interes total es: <strong>${formatter.format(((cuota * plazoMeses) - montoPrestamo))}</strong>
    `;
    
    cuotaDisplay.style.display = 'block';
}

btnCalcular.addEventListener('click', calcular);
