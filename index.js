//Selectors
const textParent = document.querySelector("#blog-text-parent");
const textGeneratorForm = document.querySelector("#text-generator");
const textInput = document.querySelector("#text-input");
const selectionWindow = document.querySelector("#selection-window");
const searchedKeyword = document.querySelector("#keyword");
const headingOne = document.querySelector("#heading-one");
const paragraph = document.querySelector("#paragraph");
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
const handleH1Keyup = (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    e.preventDefault();
    if (currentH1) {
      // Check if currentH1 is not null
      currentH1.blur(); // Remove focus from the h1.
    }
    revealItem(textGeneratorForm);
    textInput.focus(); // Bringing the focus back to the form field.
  }
};

const handleOptionsMenuReveal = () => {
  const optionsMenuIcon = document.querySelector(".option-menu-icon");
  optionsMenuIcon.addEventListener("click", (e) => {
    const optionsMenu = document.querySelector(".option-menu");
    revealItem(optionsMenu);
  });
};

const handleDeleteItem = () => {
  const deleteItem = document.querySelector("#delete-item");

  deleteItem.addEventListener("click", (e) => {
    const elementParent = e.target.parentElement.parentElement.parentElement;
    elementParent.remove();
    revealItem(textGeneratorForm);
    textInput.focus(); // Bringing the focus back to the form field.
  });
};

handleTagsMenuReveal = () => {
  const tagsOptionsSelect = document.querySelector("#turn-into");
  const tagsList = document.querySelector(".tags-list");
  const handleClickOrHover = () => {
    tagsList.classList.add("tags-list-reveal");
  };
  tagsOptionsSelect.addEventListener("click", handleClickOrHover);
  tagsOptionsSelect.addEventListener("mouseenter", handleClickOrHover);
  tagsList.addEventListener("mouseleave", () => {
    tagsList.classList.remove("tags-list-reveal");
  });
};

handleTagChange = () => {
  const tagOptions = document.querySelectorAll(".tag-option");

  tagOptions.forEach((tag, index) => {
    tag.addEventListener("click", (e) => {
      const tagType = e.target.attributes.dataset.value;
      const currentTag =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.children[1];

      const newTag = document.createElement(tagType);
      newTag.innerHTML = currentTag.innerHTML;
      newTag.classList.add(tagType + "-" + index);
      newTag.setAttribute("spellcheck", "true");
      newTag.setAttribute("contenteditable", "true");
      newTag.setAttribute("autofocus", "");
      newTag.addEventListener("keyup", handleH1Keyup);
      currentTag.parentNode.replaceChild(newTag, currentTag);

      const optionsMenu = document.querySelector(".option-menu");
      hideItem(optionsMenu);
    });
  });
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
      paragraph.style.display = "none";
      break;
    case "/1":
      revealItem(selectionWindow);
      headingOne.style.display = "flex";
      break;
    case "/p":
      revealItem(selectionWindow);
      paragraph.style.display = "flex";
      break;
    default:
      selectionWindow.style.opacity = 0;
      selectionWindow.style.zIndex = 0;
      headingOne.style.display = "none";
      paragraph.style.display = "none";
  }
});

// Tag generator.
selectItem.forEach((select, index) => {
  select.addEventListener("click", () => {
    const tagName = select.attributes.dataset.value; // get the data set from the button

    const newContentContainer = document.createElement("div");
    newContentContainer.classList.add("content-container");
    newContentContainer.innerHTML = `
    <div>
      <img class="option-menu-icon" src="./images/CiHamburger.svg" />
      <div class="option-menu">
        <div class="option-item" id="delete-item">
          <img src="./images/BiTrash3.svg" />
          <div>Delete</div>
        </div>
        <div class="option-item" id="turn-into">
          <img src="./images/change.svg" />
          <div>Turn into</div>
          <img class="option-right-arrow" src="./images/right-arrow.svg" />
          <div class="tags-list">
            <div class="tag-option" dataset="h1">
              <img src="./images/header.png" />
              <div dataset="h1">Heading 1</div>
            </div>
            <div class="tag-option" dataset="p">
              <img src="./images/paragraph-icon.png" />
              <div dataset="p">Paragraph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    selectedItemParent.appendChild(newContentContainer);
    const newTag = document.createElement(tagName);
    newTag.classList.add(tagName + "-" + index);
    newTag.setAttribute("spellcheck", "true");
    newTag.setAttribute("contenteditable", "true");
    newTag.setAttribute("autofocus", "");
    newTag.addEventListener("keyup", handleH1Keyup);

    // Append the new tag to the parent element
    newContentContainer.appendChild(newTag);

    //Invoke options menu
    handleOptionsMenuReveal();

    //Call delete item function
    handleDeleteItem();

    //Tags list reveal function
    handleTagsMenuReveal();

    //Change tag list function
    handleTagChange();

    // wait 100ms before calling the focus() method.
    setTimeout(() => {
      newTag.focus();
    }, 100);

    // Clear the input field
    textInput.value = "";

    // Hide the selection window and text generator form
    hideItem(selectionWindow);
    hideItem(textGeneratorForm);
  });
});
