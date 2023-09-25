var numbers = document.querySelectorAll("[data-number]");
var operators = document.querySelectorAll("[data-operator]");
var equals = document.querySelector("[data-equals]");
var deleteOne = document.querySelector("[data-delete]");
var clearAll = document.querySelector("[data-clear-all]");
var previousOperandDisplay = document.querySelector("[data-previous-operand]");
var currentOperandDisplay = document.querySelector("[data-current-operand]");
var parcentBtn = document.querySelector("[data-parcent]");

const inputValue = [];
var numberValue;
var operation;

function appendNumbers(number){
    inputValue.push(number);
    numberValue = inputValue.join('');
}

function updateDisplay(){
    currentOperandDisplay.innerHTML = numberValue;
}


function operandChoise(operand){
    operation = operand;
    previousOperandDisplay.innerHTML += currentOperandDisplay.innerHTML.toString() + operand;
    currentOperandDisplay.innerHTML = '';
    inputValue.splice(0, inputValue.length);
    numberValue = '';
}

function comput(){
    const previous = parseFloat(previousOperandDisplay.innerHTML);
    const current = parseFloat(currentOperandDisplay.innerHTML);
    if((operation ==="+" || operation ==="-" || operation ==="*" || operation ==="/" || operation ==="%") && previous !== "NaN"){
        switch (operation) {
            case '+':
                currentOperandDisplay.innerHTML = eval(previous + current);
                inputValue.splice(0, inputValue.length);
                break;
            case '-':
                currentOperandDisplay.innerHTML = eval(previous) - current;
                inputValue.splice(0, inputValue.length);
                break;
            case '*':
                currentOperandDisplay.innerHTML = previous * current;
                inputValue.splice(0, inputValue.length);
                break;
            case '/':
                if(current===0){
                    currentOperandDisplay.innerHTML = 0;
                    inputValue.splice(0, inputValue.length); 
                }else{
                    currentOperandDisplay.innerHTML = previous / current;
                    inputValue.splice(0, inputValue.length); 
                }
                break;
            default:
                return;
        }
    }
    // currentOperandDisplay.innerHTML = operation;
    previousOperandDisplay.innerHTML = '';
}

numbers.forEach((number) =>{
    number.addEventListener('click', ()=>{
        var num = number.innerHTML;
        if (num === '.' && numberValue.includes('.')) return;
        appendNumbers(num);
        updateDisplay();
    })
});

operators.forEach(operator =>{
    operator.addEventListener('click', ()=>{
        var operatorChoosed = operator.innerHTML;
        operandChoise(operatorChoosed);
    })
})

equals.addEventListener('click', ()=>{
    updateDisplay();
    comput();
})

parcentBtn.addEventListener('click', ()=>{
    var currentPac = currentOperandDisplay.innerHTML.toString();
    var parcent = parseFloat(currentPac.substring(0,currentPac.length-1));
    currentOperandDisplay.innerHTML = parcent / 100;
    inputValue.splice(0, inputValue.length);
})

clearAll.addEventListener('click', ()=>{
    previousOperandDisplay.innerHTML = '';
    currentOperandDisplay.innerHTML = '';
    numberValue = undefined;
    inputValue.splice(0, inputValue.length); 
})