async function generator() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    
    if (response.ok === false) {
      errorDevice();
      return;
    }
    
    const req = await response.json();

    insertAdvice(req);

  } catch (error) {
    errorDevice();
  }
}

function insertAdvice(advice) {
  const deviceID = document.querySelector('#adviceID');
  const device = document.querySelector('#advice');

  deviceID.textContent = `Advice #${advice.slip.id}`;
  device.textContent = `${advice.slip.advice}`;
}

function errorDevice() {
  const deviceID = document.querySelector('#adviceID');
  const device = document.querySelector('#advice');

  deviceID.textContent = `Advice #-`;
  device.textContent = `Error when searching for a new advice :(`;
}

generator();

document.querySelector('.btn').addEventListener('click', (event) => {
  generator();
  event.preventDefault();
})
