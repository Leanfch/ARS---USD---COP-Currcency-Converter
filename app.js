// Tasas de cambio fijas
const RATES = {
  USD_TO_COP: 3800,
  USD_TO_ARS: 1420,
};

// Referencias a los inputs
const inputs = {
  cop: document.getElementById('cop'),
  usd: document.getElementById('usd'),
  ars: document.getElementById('ars'),
};

function convertFrom(source, value) {
  if (value === '' || isNaN(value)) {
    Object.keys(inputs).forEach((key) => {
      if (key !== source) inputs[key].value = '';
    });
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
}

function round(num) {
  return Math.round(num * 100) / 100;
}

Object.keys(inputs).forEach((key) => {
  inputs[key].addEventListener('input', (e) => {
    convertFrom(key, e.target.value);
  });
});
