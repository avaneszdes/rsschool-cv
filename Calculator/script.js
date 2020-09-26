{/* <input type="text" class="minimalistic-calc">
<input type="button" class="calculate" value="=">
<script> */}
/*
* Минималистичный калькулятор без eval
* Вводятся только целые, дробные числа и знаки .+*-/()
* Копированием вставляется только строка, которую можно вычислить 
*/
let calc = document.querySelector('.calc-input'); //поле ввода
let calculate = document.querySelector('.calculate'); //кнопка вычислить
let isPasteFlag = false; //флаг - было ли значение вставлено
let savedValueBeforePaste = '';//сохранить значение которое было до вставки

//обработчик сработает при изменении значения в поле - ввод, вставка, удаление Backspace
calc.addEventListener('input', (e) => {
    if (!calc.value) return; //если значения нет - выход (при Backspace)
    if (isPasteFlag) { //если значение было скопировано и вставлено
      if (calc.value.search(/[^\d-+*/.()]/g) !== -1) { //если во вставленной строке есть что-то кроме цифр и знаков .+*-/(), значит строка не вычислится
        calc.value = savedValueBeforePaste; // установить значение которое было до вставки
        isPasteFlag = false; // установить флаг в первоначальное состояние
        savedValueBeforePaste = '';// установить в первоначальное состояние
      }
    }
    //ввод значений с клавиатуры
    else { 
      let lastValue = calc.value[calc.value.length -1];// получить последний введенный символ
      if (lastValue.search(/\d|[-+*/.()]/) === -1) { // если последний введенный символ не цифра и не знаки .+*-/()
         calc.value = calc.value.slice(0, -1); //удалить последний символ
      }
   }
 });

//обработчик сработает при вставке скопированного значения
calc.addEventListener('paste', (e) => {
  savedValueBeforePaste = calc.value;// сохранить значение до вставки
  isPasteFlag = true; //вставка была
});

const insert = (num) =>{
    calc.value = calc.value + num;
}

const clearAll = () =>{
    calc.value = "";
}

const deleteLastElement =() => {
    calc.value = calc.value.slice(0, calc.value.length - 1);
}


//обработчик сработает при клике по кнопке
  calculate.addEventListener('click', (e) => {
    if (!calc.value) return; //если значения нет - выход
    //new Function как и eval вычислит строку
    let getResult = new Function(`return ${calc.value}`);
    calc.value = getResult(); //вставить вычисленный результат в поле ввода
 });

// </script>