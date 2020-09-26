
let calc = document.querySelector('.calc-input');
let calculate = document.querySelector('.calculate');
let isPasteFlag = false;
let savedValueBeforePaste = '';


calc.addEventListener('input', (e) => {

    let lastValue = calc.value[calc.value.length - 1];
    if (lastValue.search(/\d|[-+*/.()]/) === -1) { 
        calc.value = calc.value.slice(0, -1);

    }
});

const insert = (num) => {
    calc.value = calc.value + num;
}

const clearAll = () => {
    calc.value = "";
}

const deleteLastElement = () => {
    calc.value = calc.value.slice(0, calc.value.length - 1);
}

calculate.addEventListener('click', (e) => {
   
    let getResult = new Function(`return ${calc.value}`);
    calc.value = getResult();
});

