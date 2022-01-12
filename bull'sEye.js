"use strict";
const btnCheck = document.getElementById("btncheck");
const btnAgain = document.getElementById("btnAgain");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const hits = document.getElementById("hit");
const miss = document.getElementById("miss");
const counter = document.getElementById("tries");
const secret = document.querySelector(".hid");
const gen1 = document.getElementById("gen1");
const gen2 = document.getElementById("gen2");
const gen3 = document.getElementById("gen3");
const gen4 = document.getElementById("gen4");
let rnd;
//checking if there is an identify value in the array
const identifyVal = function (index, arr) {
  for (let i = index - 1; i >= 0; i--) if (arr[index] === arr[i]) return true;
  return false;
};
// generating a random number
const generateRndNum = function () {
  return Math.floor(Math.random() * 10);
};
//returns an array which has different values
const generateRndArr = function () {
  let arr = [0, 0, 0, 0];
  arr[0] = generateRndNum();
  for (let i = 1; i < arr.length; ) {
    arr[i] = generateRndNum();
    if (!identifyVal(i, arr)) i++;
  }
  return arr;
};
const emptyValues = function () {
  num1.value = null;
  num2.value = null;
  num3.value = null;
  num4.value = null;
};
const checking = function () {
  const arr = creatInputArray();
  counter.textContent++;
  console.log(arr);
  hits.textContent = 0;
  miss.textContent = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < rnd.length; j++) {
      if (arr[i] === rnd[j] && i === j) hits.textContent++;
      else if (arr[i] === rnd[j]) miss.textContent++;
    }
    num1.focus();
  }
  if (Number(hits.textContent) !== 4) {
    emptyValues();
  } else secret.classList.remove("hidden");
};
function moveOnMax(field, nextFieldID) {
  if (field.value.length >= field.maxLength) {
    document.getElementById(nextFieldID).focus();
  }
}
//creat input array
const creatInputArray = function () {
  let arr = [
    Number(num1.value),
    Number(num2.value),
    Number(num3.value),
    Number(num4.value),
  ];
  return arr;
};

//reset function
const reset = function () {
  num1.focus();
  counter.textContent = 0;
  rnd = generateRndArr();
  console.log(rnd);
  //puting the values in the right places in the secret array
  gen1.textContent = rnd[0];
  gen2.textContent = rnd[1];
  gen3.textContent = rnd[2];
  gen4.textContent = rnd[3];
  emptyValues();
  secret.classList.add("hidden");
  hits.textContent = 0;
  miss.textContent = 0;
};

reset();

btnCheck.addEventListener("click", checking);
btnAgain.addEventListener("click", function () {
  reset();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") checking();
});
