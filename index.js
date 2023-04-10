//Selectors
const textParent = document.querySelector("#blog-text-parent");
const textGeneratorForm = document.querySelector("#text-generator");
const textInput = document.querySelector("#text-input");
const selectionWindow = document.querySelector("#selection-window");
const searchedKeyword = document.querySelector("#keyword");
const headingOne = document.querySelector("#heading-one");
const selectItem = document.querySelectorAll(".select-item");
const selectedItemParent = document.querySelector("#selected-item-parent");

// An empty variable that keep tracks of the h1.
let currentH1 = null;

// Helper functions.
const revealItem = (element) => {
  element.style.opacity = 1;
  element.style.zIndex = 1;
  element.style.display = "block";
};

const hideItem = (element) => {
  element.style.opacity = 0;
  element.style.zIndex = -1;
  element.style.display = "none";
};
// Prevents the editable field from going to a new line.
const handleH1Keydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    currentH1.blur(); // Remove focus from the h1.
    revealItem(textGeneratorForm);
    textInput.focus(); // Bringing the focus back to the form field.
  }
};

// Event Listeners.
// Prevent the page from refreshing after submitting the form.
textGeneratorForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// A listener that shows specific results depending on the input inside the field.
textInput.addEventListener("input", (e) => {
  // The little blue span value inside the popup window.
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

// H1 generator.
selectItem.forEach((select) => {
  select.addEventListener("click", () => {
    switch (select.attributes.id.nodeValue) {
      case "heading-one":
        const newHeadingOne = document.createElement("h1");
        newHeadingOne.classList.add("head-1");
        newHeadingOne.setAttribute("spellcheck", "true");
        newHeadingOne.setAttribute("contenteditable", "true");
        newHeadingOne.setAttribute("autofocus", ""); // add autofocus attribute.
        newHeadingOne.addEventListener("keydown", handleH1Keydown);
        currentH1 = newHeadingOne;
        selectedItemParent.appendChild(newHeadingOne);
        // wait 100ms before calling the focus() method.
        setTimeout(() => {
          newHeadingOne.focus();
        }, 100); // set focus to the new h1 element.
        textInput.value = "";
        break;
    }
    hideItem(selectionWindow);
    hideItem(textGeneratorForm);
  });
});
