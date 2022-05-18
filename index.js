let refresh = document.getElementById("refresh");
let operators = document.querySelectorAll(".head-item");
let deleteBtn = document.querySelector(".del");
let equal = document.getElementById("equal");
let num = document.querySelectorAll(".nums");
let allClear = document.getElementById("refresh");
let outputSoln = document.getElementById("show-soln");
let previousOperandTextElement = document.querySelector(".previous-operand");
let currentOperandTextElement = document.querySelector(".current-operand");

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand += number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== " ") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {
        let calc;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (prev == "" || current == "") return;
        switch (this.operation) {
            case "+":
                calc = prev + current;
                break;
            case "-":
                calc = prev - current;
                break;
            case "x":
                calc = prev * current;
                break;
            case "'/,":
                calc = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = calc;
        this.operation = undefined;
        this.previousOperand = "";
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
    }
    getDisplayNumber(number) {
        const stringNum = number.toString();
        const interDigits = parseFloat(stringNum.split("." [0]));
        const decimalDigits = stringNum.split(".")[1];
        let integerDisplay;
        if (isNaN(interDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = interDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}
const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

num.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.target.classList.add("bg");
        setTimeout(() => {
            event.target.classList.remove("bg");
        }, 70);
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});
operators.forEach((operatorbtn) => {
    operatorbtn.addEventListener("click", () => {
        calculator.chooseOperation(operatorbtn.innerText);
        calculator.updateDisplay();
    });
});
equal.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});
allClear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});