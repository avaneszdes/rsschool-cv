let calc = document.querySelector('.calc-input');
let calculate = document.querySelector('.calculate');

calc.addEventListener('input', (e) =>  {
    insertIntoInput(num)})

calculate.addEventListener('click', (e) => calc.value = +calculatee(parseCalculationString(calc.value)).toFixed(2))

const insert = (num) =>  insertIntoInput(num);

const clearAll = () => calc.value = "";

const deleteLastElement = () =>  calc.value = calc.value.slice(0, calc.value.length - 1);

const insertIntoInput =(num) => {
    calc.value = calc.value + num;

    if (/[+*/^]/.test(calc.value[0])) {
        calc.value = calc.value.slice(0, -1);
    }
    else if (calc.value.length > 1 & /[+*/.]/.test(calc.value[calc.value.length - 1]) && /[-+*/.]/.test(calc.value[calc.value.length - 2])
        || calc.value[calc.value.length - 1] === '-' && calc.value[calc.value.length - 2] === '-') {
            calc.value = calc.value.slice(0, -1);
    }
    else if (calc.value[calc.value.length - 1] === '√' && !/[*-/+]/.test(calc.value[calc.value.length - 2]) && calc.value[0] !== '√' || calc.value[1] === '√' ) {
        calc.value = calc.value.slice(0, -1);
    }
    
    if(/[*/+-]/.test(calc.value[calc.value.length - 1]) &&  /[*/+-]/.test(num)){
        calc.value = calc.value.slice(0, -1);
        calc.value = calc.value + num;
    }

}

const parseCalculationString= (s) => {
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('√^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

const calculatee = (cal) => {
    var ops = [{ '√': (a, b) => Math.sqrt(b) }, { '^': (a, b) => Math.pow(a, b) },
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b }],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < cal.length; j++) {

            if (ops[i][cal[j]]) {
                currentOp = ops[i][cal[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], cal[j]);
                currentOp = null;
            } else {
                newCalc.push(cal[j]);
            }
        }
        cal = newCalc;
        newCalc = [];
    }
    if (cal.length > 1) {
        return cal;
    } else {
        return cal[0];
    }
}


