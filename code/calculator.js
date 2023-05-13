let clear = document.getElementById("c");
let bracket = document.getElementById("()");
let percent = document.getElementById("%");
let divide = document.getElementById("÷");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let times = document.getElementById("×");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let minus = document.getElementById("-");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let plus = document.getElementById("+");
let sign = document.getElementById("±");
let zero = document.getElementById("0");
let decimal = document.getElementById(".");
let equals = document.getElementById("=");
let screen = document.getElementById("screen");
let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let yellow = document.getElementById("yellow");
let numbers = [zero, one, two, three, four, five, six, seven, eight, nine];
let allBracketsClosed = true;
let numOpenBrackets = 0;
let numClosedBrackets = 0;
let timesBracketTriggers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ")",
  "%",
];
let openBracketsTriggers = ["-", "+", "×", "−", "÷"];
let operationPlaced = false;
let currentNumberLength = 0;

clear.addEventListener("click", clearScreen);
bracket.addEventListener("click", writeSymbol);
percent.addEventListener("click", writeSymbol);
divide.addEventListener("click", writeSymbol);
times.addEventListener("click", writeSymbol);
minus.addEventListener("click", writeSymbol);
plus.addEventListener("click", writeSymbol);
sign.addEventListener("click", writeSymbol);
decimal.addEventListener("click", writeSymbol);
equals.addEventListener("click", writeSymbol);

red.addEventListener("click", changeBackground);
blue.addEventListener("click", changeBackground);
green.addEventListener("click", changeBackground);
yellow.addEventListener("click", changeBackground);

numbers.forEach(numberListeners);

function changeBackground() {
  console.log(document.body.style);
  document.body.style.background = `radial-gradient(circle,${getComputedStyle(
    this
  ).getPropertyValue("--first")},${getComputedStyle(this).getPropertyValue(
    "--second"
  )})`;
  console.log(document.body.style);
}

function clearScreen() {
  screen.innerHTML = "";
  numClosedBrackets = 0;
  numOpenBrackets = 0;
  allBracketsClosed = true;
  operationPlaced = false;
  currentNumberLength = 0;
}

function numberListeners(item) {
  item.addEventListener("click", writeNumber);
}

function writeNumber() {
  for (let i = 0; i < numbers.length; i++) {
    if (this == numbers[i]) {
      if (
        screen.innerHTML[screen.innerHTML.length - 1] == ")" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "%"
      ) {
        screen.innerHTML += "×" + i;
      } else {
        screen.innerHTML += i;
      }
      operationPlaced = true;
      currentNumberLength += 1;
    }
  }
}

function writeSymbol() {
  if (this == bracket) {
    currentNumberLength = 0;
    let inList = false;
    for (let i = 0; i < openBracketsTriggers.length; i++)
      if (
        screen.innerHTML[screen.innerHTML.length - 1] == openBracketsTriggers[i]
      ) {
        inList = true;
        break;
      }
    if (
      screen.innerHTML[screen.innerHTML.length - 1] == "(" ||
      allBracketsClosed ||
      inList
    ) {
      let inList = false;
      for (let i = 0; i < timesBracketTriggers.length; i++)
        if (
          screen.innerHTML[screen.innerHTML.length - 1] ==
          timesBracketTriggers[i]
        ) {
          screen.innerHTML += "×(";
          inList = true;
          break;
        }
      if (!inList) {
        screen.innerHTML += "(";
      }
      numOpenBrackets += 1;
      if (numOpenBrackets == numClosedBrackets) {
        allBracketsClosed = true;
      } else {
        allBracketsClosed = false;
      }
    } else {
      screen.innerHTML += ")";
      numClosedBrackets += 1;
      if (numOpenBrackets == numClosedBrackets) {
        allBracketsClosed = true;
      } else {
        allBracketsClosed = false;
      }
    }
  } else {
    if (this == sign) {
      allBracketsClosed = false;
      if (
        screen.innerHTML[screen.innerHTML.length - 1] == ")" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "%"
      ) {
        screen.innerHTML += "×(-";
        numOpenBrackets += 1;
      } else if (screen.innerHTML[screen.innerHTML.length - 1] == "(") {
        screen.innerHTML += "(-";
        numOpenBrackets += 1;
      } else if (
        screen.innerHTML[screen.innerHTML.length - 1] != "-" &&
        screen.innerHTML[screen.innerHTML.length - 2] != "("
      ) {
        let inList = false;
        for (let i = 0; i < timesBracketTriggers.length - 1; i++) {
          if (
            timesBracketTriggers[i] ==
            screen.innerHTML[screen.innerHTML.length - 1]
          ) {
            if (
              screen.innerHTML[
                screen.innerHTML.length - (currentNumberLength + 1)
              ] == "-" &&
              screen.innerHTML[
                screen.innerHTML.length - (currentNumberLength + 2)
              ] == "("
            ) {
              let str = screen.innerHTML;
              str =
                str.slice(0, str.lastIndexOf("(")) +
                str.slice(str.lastIndexOf("(") + 2);
              numOpenBrackets -= 1;
              screen.innerHTML = str;
              inList = true;
            } else {
              let str = screen.innerHTML;
              str =
                str.slice(
                  0,
                  str.lastIndexOf(timesBracketTriggers[i]) -
                    (currentNumberLength - 1)
                ) +
                "(-" +
                str.slice(
                  str.lastIndexOf(timesBracketTriggers[i]) -
                    (currentNumberLength - 1)
                );
              numOpenBrackets += 1;
              screen.innerHTML = str;
              inList = true;
            }
          }
        }
        if (!inList) {
          screen.innerHTML += "(-";
          numOpenBrackets += 1;
        }
      } else {
        let str = screen.innerHTML;
        str =
          str.slice(0, str.lastIndexOf("(")) +
          str.slice(str.lastIndexOf("(") + 2);
        numOpenBrackets -= 1;
        screen.innerHTML = str;
      }
    } else if (this == decimal) {
      if (
        screen.innerHTML == "" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "(" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "+" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "-" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "×" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "÷" ||
        screen.innerHTML[screen.innerHTML.length - 1] == "−"
      ) {
        screen.innerHTML += "0.";
        currentNumberLength += 2;
      } else if (
        screen.innerHTML[screen.innerHTML.length - 1] == "%" ||
        screen.innerHTML[screen.innerHTML.length - 1] == ")"
      ) {
        screen.innerHTML += "×0.";
        currentNumberLength = 2;
      } else {
        screen.innerHTML += ".";
        currentNumberLength += 1;
      }
    } else if (this != equals) {
      currentNumberLength = 0;
      let inList = false;
      for (let i = 0; i < timesBracketTriggers.length - 1; i++)
        if (
          screen.innerHTML[screen.innerHTML.length - 1] ==
            timesBracketTriggers[i] ||
          screen.innerHTML[screen.innerHTML.length - 1] == "("
        ) {
          inList = true;
          break;
        }
      if (inList) {
        if (this == percent) {
          screen.innerHTML += "%";
        }
        if (this == divide) {
          screen.innerHTML += "÷";
        }
        if (this == times) {
          screen.innerHTML += "×";
        }
        if (this == minus) {
          screen.innerHTML += "−";
        }
        if (this == plus) {
          screen.innerHTML += "+";
        }
        operationPlaced = false;
      }
    } else {
      for (let i = 0; i < screen.innerHTML.length; i++) {
        if (screen.innerHTML[i] == "×") {
          let str = screen.innerHTML;
          str = str.slice(0, i) + "*" + str.slice(i + 1);
          screen.innerHTML = str;
        } else if (screen.innerHTML[i] == "÷") {
          let str = screen.innerHTML;
          str = str.slice(0, i) + "/" + str.slice(i + 1);
          screen.innerHTML = str;
        } else if (screen.innerHTML[i] == "−") {
          let str = screen.innerHTML;
          str = str.slice(0, i) + "-" + str.slice(i + 1);
          screen.innerHTML = str;
        } else if (screen.innerHTML[i] == "%") {
          let str = screen.innerHTML;
          str = str.slice(0, i) + "/100" + str.slice(i + 1);
          screen.innerHTML = str;
        }
        while (!allBracketsClosed) {
          console.log("test");
          screen.innerHTML += ")";
          numClosedBrackets += 1;
          if (numClosedBrackets == numOpenBrackets) {
            allBracketsClosed = true;
          }
        }
      }
      try {
        let answer = eval(screen.innerHTML);
        if (isFinite(answer)) {
          screen.innerHTML = answer;
        } else {
          screen.innerHTML = "Error";
        }
      } catch (err) {
        screen.innerHTML = "Error";
      }
    }
  }
}
