let refresh = document.getElementById("refresh");
let multiply = document.getElementById("multiply");
let plus = document.getElementById("plus");
let subtract = document.getElementById("subtract");
let number = document.getElementById("numbers");
let equal = document.getElementById("equal");
let num = document.querySelectorAll(".num");
let outputSoln = document.getElementById("show-soln");
const numberCall = document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.target.classList.add("bg");
    setTimeout(() => {
      event.target.classList.remove("bg");
    }, 70);
    let num = event.target;

    if (num.classList.contains("refresh")) {
      outputSoln.innerText = "0";
    }
    if (num.classList.contains("nums")) {
      //let firstInput = outputSoln.innerText + num.innerText;
	let inp = num.innerText
      //outputSoln.innerText = firstInput;
      if (inp === "." && (outputSoln.innerText.includes(".")||outputSoln.innerText==undefined||outputSoln.innerText.length<=0) ) {
        return
      } else  {
        outputSoln.innerText+=inp
      }
    }


  });
});
