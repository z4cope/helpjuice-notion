//Selectors
const textParent = document.querySelector("#blog-text-parent");
const textGeneratorForm = document.querySelector("#text-generator");
const textInput = document.querySelector("#text-input");
const selectionWindow = document.querySelector("#selection-window");

//Event Listeners
textGeneratorForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

textInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  switch (e.target.value) {
    case "/1":
      selectionWindow.style.opacity = 1;
      selectionWindow.style.zIndex = 1;
      break;
    default:
      selectionWindow.style.opacity = 0;
      selectionWindow.style.zIndex = 0;
  }
});
