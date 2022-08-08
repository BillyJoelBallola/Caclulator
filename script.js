class Calculator {
    constructor(previousOperandNum, currentOperandNum){
        this.previousOperandNum = previousOperandNum
        this.currentOperandNum = currentOperandNum
        this.clearAll()
    }

    clearAll () {
        this.currentNum = ""
        this.previousNum = ""
        this.operation = ""
        this.updateDisplay()
    }

    delete () {
        this.currentNum = this.currentNum.toString().slice(0, -1)
        this.updateDisplay()
    }

    display (number) {
        if (number === "." && this.currentNum.includes(".")) return
        this.currentNum += number.toString()
    }

    choosenOperation (operation) {
        if (this.currentNum === "") return
        if (this.previousNum !== ""){
            this.solve()
        }
        this.operation = operation
        this.previousNum = this.currentNum
        this.currentNum = ""
    }

    solve () {
        let computation 
        const previous = parseFloat(this.previousNum)
        const current = parseFloat(this.currentNum)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case "+":
                computation = previous + current 
                break
            case "-":
                computation = previous - current 
                break
            case "*":
                computation = previous * current 
                break
            case "/":
                computation = previous / current 
                break
            default:
                return
        }
        this.currentNum = computation
        this.operation = ""
        this.previousNum = ""
    }

    displayNumber (number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }

    }

    updateDisplay () {
        this.currentOperandNum.innerText = this.displayNumber(this.currentNum)
        if (this.operation !== null){
            this.previousOperandNum.innerText = 
            `${this.displayNumber(this.previousNum)} ${this.operation}`
        }
    }
}

const selectTheme = document.querySelector("#themeStyleLink")
const btnNumbers = document.querySelectorAll("[data-number]")
const btnOperation = document.querySelectorAll("[data-operation]")
const btnDelete = document.querySelector("[data-delete]")
const btnClearAll = document.querySelector("[data-clear-all]")
const btnEquals = document.querySelector("[data-equal]")
const previousNum = document.querySelector("[data-previous]")
const currentNum = document.querySelector("[data-current]")
const displayNum = document.querySelector(".calc__display")
const calcContainer = document.querySelector(".calc__container")
const btnTheme = document.querySelectorAll(".ctrl__theme .btn__theme")
const bgMain = document.querySelector(".bg__main")
const btnWhite = document.querySelector(".white")
const btnDark = document.querySelector(".dark")
const btnViolet = document.querySelector(".violet")

const calculator = new Calculator (previousNum, currentNum)

for (let numberButtons of btnNumbers){
    numberButtons.addEventListener('click', () => {
        calculator.display(numberButtons.innerText)
        calculator.updateDisplay()
    })
}

for (let operationButtons of btnOperation){
    operationButtons.addEventListener('click', () => {
        calculator.choosenOperation(operationButtons.innerText)
        calculator.updateDisplay()
    })
}

btnClearAll.addEventListener('click', () =>{
    calculator.clearAll()
})

btnEquals.addEventListener('click', () =>{
    calculator.solve()
    calculator.updateDisplay()
})

btnDelete.addEventListener('click', () =>{
    calculator.delete()
})

//theme
for (let theme of btnTheme){
    theme.addEventListener('click', () => {
        document.querySelector(".theme__active").classList.remove("theme__active")
        theme.classList.add("theme__active")
        changeTheme()
    })
}

const activeTheme = (theme) => {
    selectTheme.setAttribute("href", `css/${theme}.css`)
}

const changeTheme = () =>{
    if (btnWhite.classList.contains("theme__active")){
       activeTheme("white")
    }else if (btnDark.classList.contains("theme__active")){
        activeTheme("dark")
    }else if (btnViolet.classList.contains("theme__active")){
        activeTheme("violet")
    }
}


