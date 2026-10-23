'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// contact form: static hosting cannot process submissions, so prevent the
// page reload / query-string navigation. Replace this with a Formspree or
// Web3Forms endpoint when you are ready for a working form.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("The contact form is still under development. Please email me directly at contact.jrdpimentel@gmail.com");
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Blog Modal

const blogModal = document.querySelector("#blog-modal");
const blogModalBody = document.querySelector(".blog-modal-body");
const blogModalClose = document.querySelector(".blog-modal-close");

// Open modal for any blog item
document.querySelector(".blog-posts-list").addEventListener("click", function (event) {

  const blogLink = event.target.closest(".blog-modal-trigger");

  if (!blogLink) return;

  event.preventDefault();

  // Get the selected blog card
  const blogCard = blogLink.querySelector(".blog-content");
  const blogImage = blogLink.querySelector(".blog-banner-box");

  // Display the selected card's content in the modal
  const extraContent = blogCard.querySelector(".blog-extra-content");

  blogModalBody.innerHTML = `
    <figure class="blog-modal-banner">
      ${blogImage.innerHTML}
    </figure>

    <div class="blog-modal-content">
      ${blogCard.innerHTML}
      ${extraContent ? extraContent.innerHTML : ""}
    </div>
  `;

  // Show modal
  blogModal.classList.add("active");
  document.body.style.overflow = "hidden";

});

// Close modal using close button
blogModalClose.addEventListener("click", function () {
  blogModal.classList.remove("active");
  document.body.style.overflow = "";
});

// Close modal when clicking outside the box
blogModal.addEventListener("click", function (event) {
  if (event.target === blogModal) {
    blogModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Close modal using Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    blogModal.classList.remove("active");
    document.body.style.overflow = "";
    if (modalContainer.classList.contains("active")) { testimonialsModalFunc(); }
  }
});