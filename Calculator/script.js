let calc = document.querySelector('.calc-input');
let calculate = document.querySelector('.calculate');
let isPasteFlag = false;
let savedValueBeforePaste = '';
let regex = /[-+*/.]/;
calc.addEventListener('input', (e) => {
    let lastValue = calc.value[calc.value.length - 1];
    let preLast = calc.value[calc.value.length - 2];
    if (lastValue.search(/[-+*/.]/) !== -1 && preLast.search(/[-+*/.]/) !== -1
        || lastValue.search(/[()]/) !== -1 && preLast.search(/[()]/) !== -1
        || lastValue.search(/[^\d-+*/.()]/g) !== -1) {
        calc.value = calc.value.slice(0, -1);
    }
});

// || (/[()]/.test(preLast) && /[()]/.test(preLast))

const insert = (num) => {

    if (calc.value.length > 1) {
        let preLast = calc.value[calc.value.length - 1];


        if ((regex.test(num) && regex.test(preLast))) {
            calc.value = calc.value.slice(0, -1);

            if (/[*/]/.test(preLast) && /[-+]/.test(num)) {
                calc.value = calc.value + (preLast + '(');
            }

            calc.value = calc.value + num;
            return;
        }
    }
    calc.value = calc.value + num;
}

const clearAll = () => {
    calc.value = "";
}

const deleteLastElement = () => {
    calc.value = calc.value.slice(0, calc.value.length - 1);
}

calculate.addEventListener('click', (e) => {
    calc.value = calculatee(parseCalculationString(calc.value));
});

function parseCalculationString(s) {
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

function calculatee(cal) {

    var ops = [ { '√': (a, b) => Math.sqrt(b) },{ '^': (a, b) => Math.pow(a, b) },
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


