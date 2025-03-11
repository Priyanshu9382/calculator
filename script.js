let currentDisplay = document.getElementById('current');
let historyDisplay = document.getElementById('calculation-body');
let memoryStorage = 0;
let advancedVisible = false;

function appendNumber(number) {
  if (currentDisplay.innerText === '0' || currentDisplay.innerText === 'Error') {
    currentDisplay.innerText = number;
  } else {
    currentDisplay.innerText += number;
  }
}

function appendOperator(operator) {
  if (currentDisplay.innerText === '0' || currentDisplay.innerText === 'Error') {
    currentDisplay.innerText = '0';
    currentDisplay.innerText = operator;
  }
  const lastChar = currentDisplay.innerText.slice(-1);
  if ('+-*/%'.includes(lastChar)) {
    currentDisplay.innerText = currentDisplay.innerText.slice(0, -1) + operator;
  } else {
    currentDisplay.innerText += operator;
  }
}

function appendAdvanced(func) {
  currentDisplay.innerText = func +'';
}

function clearDisplay() {
  currentDisplay.innerText = '0';
  historyDisplay.innerText = '';
}

function deleteLast() {
  currentDisplay.innerText = currentDisplay.innerText.slice(0, -1) || '0';
}

function calculateResult() {
  try {
    let exp = currentDisplay.innerText.split(/([-+*/])/)
    let length = exp.length;
    if(exp[0]==='-'){
      exp[1]*= -1
    }
    for (i = 0; i < length; i++) {
      if (exp[i]==='/') {
        exp[i-1]/=exp[i+1];
        exp = exp.filter((_,index)=>index !== i && index !== i + 1)
      }
    }
    for (i = 0; i < length; i++) {
      if (exp[i]==='*') {
        exp[i-1]*=exp[i+1];
        exp = exp.filter((_,index)=>index !== i && index !== i + 1)
      }
    }
    for (i = 0; i < length; i++) {
      if (exp[i]==='-') {
        exp[i-1]-=exp[i+1];
        exp = exp.filter((_,index)=>index !== i && index !== i + 1)
      }
    }
    for (i = 0; i < length; i++) {
      if (exp[i]==='+') {
        exp[i-1]=Number(exp[i-1]) + Number(exp[i+1]);
        exp = exp.filter((_,index)=>index !== i && index !== i + 1)
      }
    }
    const result = exp[0]
    historyDisplay.innerText = currentDisplay.innerText + ' =';
    currentDisplay.innerText = result;
  } catch {
    currentDisplay.innerText = 'Error';
  }
}

currentDisplay.addEventListener("keydown", (e)=>{
  if(e.key === 'Enter'){
    e.preventDefault()
    calculateResult();
  }
})

function toggleAdvanced() {
  const advanced = document.getElementById('advanced-functions');
  advancedVisible = !advancedVisible;
  advanced.style.display = advancedVisible ? 'flex' : 'none';
  advanced.style.justifyContent = advancedVisible ? 'space-between' : 'none';
}

function memory(action) {
  switch (action) {
    case 'MC':
      memoryStorage = 0;
      break;
    case 'MR':
      currentDisplay.innerText = memoryStorage;
      break;
    case 'M+':
      memoryStorage += parseFloat(currentDisplay.innerText);
      break;
    case 'M-':
      memoryStorage -= parseFloat(currentDisplay.innerText);
      break;
  }
}
