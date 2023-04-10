//Selectors
const textParent = document.querySelector("#blog-text-parent");
const textGeneratorForm = document.querySelector("#text-generator");
const textInput = document.querySelector("#text-input");
const selectionWindow = document.querySelector("#selection-window");
const searchedKeyword = document.querySelector("#keyword");
const headingOne = document.querySelector("#heading-one");
const selectItem = document.querySelectorAll(".select-item");
const selectedItemParent = document.querySelector("#selected-item-parent");

selectItem.forEach((select) => {
  select.addEventListener("click", () => {
    switch (select.attributes.id.nodeValue) {
      case "heading-one":
        selectedItemParent.innerHTML = `<h1 id="head-1" spellcheck="true" contenteditable="true"></h1>`;
        break;
    }
  });
});

//Helper functions
const revealItem = (element) => {
  element.style.opacity = 1;
  element.style.zIndex = 1;
};

//Event Listeners
textGeneratorForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

textInput.addEventListener("input", (e) => {
  searchedKeyword.innerText = e.target.value;
  switch (e.target.value) {
    case "/":
      revealItem(selectionWindow);
      headingOne.style.display = "none";
      break;
    case "/1":
      revealItem(selectionWindow);
      headingOne.style.display = "flex";
      break;
    default:
      selectionWindow.style.opacity = 0;
      selectionWindow.style.zIndex = 0;
      headingOne.style.display = "none";
  }
});
