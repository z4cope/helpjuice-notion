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
const handleTagKeyup = (e) => {
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
  const optionsMenuIcon = document.querySelectorAll(".option-menu-icon");
  optionsMenuIcon.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      revealItem(e.target.nextElementSibling);
    });
  });
};

const handleDeleteItem = () => {
  const deleteItem = document.querySelectorAll(".delete-item");
  deleteItem.forEach((delItem) => {
    delItem.addEventListener("click", (e) => {
      const elementParent = e.target.parentElement.parentElement.parentElement;
      elementParent.remove();
      revealItem(textGeneratorForm);
      textInput.focus(); // Bringing the focus back to the form field.
    });
  });
};

const handleTagsMenuReveal = () => {
  const tagsOptionsSelect = document.querySelectorAll(".turn-into");
  const tagsList = document.querySelectorAll(".tags-list");

  tagsOptionsSelect.forEach((tagOption, index) => {
    tagOption.addEventListener("mouseenter", () => {
      const currentTagsList = tagsList[index];
      currentTagsList.classList.add("tags-list-reveal");
    });
  });
};

handleTagChange = () => {
  const tagOptions = document.querySelectorAll(".tag-option");

  tagOptions.forEach((tag, index) => {
    tag.addEventListener("click", (e) => onClickTagOption(e, index));
  });
};

const onClickTagOption = (e, index) => {
  const tagType = e.currentTarget.attributes.dataset.value;
  const currentTag = e.currentTarget.closest(".content-container").children[1];

  if (currentTag) {
    const newTag = document.createElement(tagType);
    newTag.innerHTML = currentTag.innerHTML;
    newTag.classList.add(tagType + "-" + index);
    newTag.setAttribute("spellcheck", "true");
    newTag.setAttribute("contenteditable", "true");
    newTag.setAttribute("autofocus", "");
    newTag.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        newTag.blur();
        revealItem(textGeneratorForm);
        textInput.focus();
      }
    });
    currentTag.parentNode.replaceChild(newTag, currentTag);
    hideItem(e.target.closest(".option-menu"));
  }
};

// Listen for the click event on the document object
document.addEventListener("click", (event) => {
  const optionMenus = document.querySelectorAll(".option-menu");

  optionMenus.forEach((optionMenu) => {
    const isClickInsideContextMenu = optionMenu.contains(event.target);
    if (
      !isClickInsideContextMenu &&
      !event.target.classList.contains("option-menu-icon")
    ) {
      hideItem(optionMenu);
    }
  });
});

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
        <div class="option-item delete-item">
          <img src="./images/BiTrash3.svg" />
          <div>Delete</div>
        </div>
        <div class="option-item turn-into">
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
    newTag.addEventListener("keyup", handleTagKeyup);

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
