// Tasas de cambio fijas
const RATES = {
  USD_TO_COP: 3700,
  USD_TO_ARS: 1420,
};

// Referencias a los inputs y sus secciones padre
const inputs = {
  cop: document.getElementById('cop'),
  usd: document.getElementById('usd'),
  ars: document.getElementById('ars'),
};

function round(num) {
  return Math.round(num * 100) / 100;
}

// Aplica animación de highlight a un input calculado
function flash(input) {
  input.classList.remove('updated');
  // Forzar reflow para reiniciar la animación si ya estaba activa
  void input.offsetWidth;
  input.classList.add('updated');
}

function convertFrom(source, value) {
  const otherKeys = Object.keys(inputs).filter((k) => k !== source);

  if (value === '' || isNaN(value)) {
    otherKeys.forEach((k) => (inputs[k].value = ''));
    return;
  }

  const amount = parseFloat(value);

  if (source === 'usd') {
    inputs.cop.value = round(amount * RATES.USD_TO_COP);
    inputs.ars.value = round(amount * RATES.USD_TO_ARS);
  } else if (source === 'cop') {
    const usd = amount / RATES.USD_TO_COP;
    inputs.usd.value = round(usd);
    inputs.ars.value = round(usd * RATES.USD_TO_ARS);
  } else if (source === 'ars') {
    const usd = amount / RATES.USD_TO_ARS;
    inputs.usd.value = round(usd);
    inputs.cop.value = round(usd * RATES.USD_TO_COP);
  }

  otherKeys.forEach((k) => flash(inputs[k]));
}

// Highlight de la card activa y conversión en tiempo real
Object.keys(inputs).forEach((key) => {
  const section = inputs[key].closest('section');

  inputs[key].addEventListener('focus', () => {
    section.classList.add('active');
  });

  inputs[key].addEventListener('blur', () => {
    section.classList.remove('active');
  });

  inputs[key].addEventListener('input', (e) => {
    convertFrom(key, e.target.value);
  });
});

// Botón limpiar
document.getElementById('clear-btn').addEventListener('click', () => {
  Object.values(inputs).forEach((input) => {
    input.value = '';
    input.classList.remove('updated');
  });
  inputs.cop.focus();
});
