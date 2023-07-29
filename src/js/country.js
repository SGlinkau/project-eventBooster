import { countryList } from "./countryList.js"

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
let countryParam;
const markup = countryList
     .map(object => {
       return `  <div class="option">
       <input
         class="radio"
         data-code = "${object.code}"
       />
       <label for="${object.name}">${object.name}</label>
     </div>
     `
     })
     .join('');
     optionsContainer.insertAdjacentHTML('beforeend', markup);

     const optionsList = document.querySelectorAll(".option");
     optionsList.forEach(option => {
     option.addEventListener("click", () => {
     selected.innerHTML = option.querySelector("label").innerHTML;
     let dataCode = option.querySelector("input[data-code]")
     countryParam = dataCode.dataset.code;
     selected.setAttribute("value",countryParam)
    optionsContainer.classList.remove("active");
  });
});

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

export function searchCountryCode(){
  return selected.getAttribute('value')
}