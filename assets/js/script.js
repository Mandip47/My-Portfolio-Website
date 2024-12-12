'use strict';

// element toggle function
const elementToggleFunc = function(elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });


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
const testimonialsModalFunc = function() {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function() {

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
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
/////////////////////////////////////////////////
////////

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const username = 'mandip47';
    // const API_KEY_LinkPreview = '006e7bfeab5ff5611d21784adea6df64';
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const specificNames = ['Nest-js-with-microservice', 'complete-javascript-course', 'sleepr', 'Mandip47','My-Portfolio-Website','DSA','packages','Python-intro','Mandip47.github.io','Machine-Learning','Django'];
    let html = '';

    const response = await fetch(apiUrl);
    const repos = await response.json();

    const projectList = document.querySelector('.project-list');

    for (const [i, repo] of Object.values(repos).entries()) {
      
      if (specificNames.includes(repo.name)) continue;
      const language = repo.language === 'C' || repo.language === 'Python' || repo.language === 'CSS' || repo.language === 'JavaScript' ? repo.language : 'Other Projects';
      
      // const api = "https://v1.nocodeapi.com/kyahai/link_preview/EmIXjHiwkYvsmRhO";
      // const api = `https://api.linkpreview.net/?key=${API_KEY_LinkPreview}`;

      const api = `https://api.microlink.io/`
      
      const url = repo.html_url;
      setTimeout(() => {
        fetch(`${api}?url=${url}`)
          .then((response) => response.json())
          .then((data) => {
            html = `
                    <li class="project-item active filter-item-js" data-filter-item data-category="${language}">
                        <a href="${repo.html_url}">
                            <figure class="project-img">
                                <div class="project-item-icon-box">
                                    <ion-icon name="eye-outline"></ion-icon>
                                </div>
                                <img src="${data.data.image.url}" alt="${repo.name}" loading="lazy">
                            </figure>
                            <h3 class="project-title">${repo.name}</h3>
                            <p class="project-category">${repo.language}</p>
                        </a>
                    </li>
                `;
            projectList.insertAdjacentHTML('beforeend', html);
          });
      }, 500)

    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
  }
});

///////////////////////////////////////////

select.addEventListener("click", function() { elementToggleFunc(this); console.log(this)});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function() {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

const filterItems = document.getElementsByClassName("filter-item-js");
const filterFunc = function(selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    console.log(filterItems[i], filterItems.length);
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      console.log(filterItems[i])
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

/// -----
// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function() {

    console.log(this);
    let selectedValue = this.innerText.toLowerCase();
    console.log(selectedValue);
    // selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function() {

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

/// form validation 
const form = document.querySelector('.form');
const formInputs = document.querySelectorAll('[data-form-input]');
const submitBtn = document.querySelector('[data-form-btn]');

// Validate form inputs
function validateForm() {
  let isValid = true;

  for (const input of formInputs) {
    if (!input.value) {
      isValid = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  }

  // Validate email format
  
  const emailInput = document.querySelector('[name="email"]');
  if (!isValidEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add('invalid');
  } else {
    emailInput.classList.remove('invalid');
  }

  return isValid;
}

/// this is not working right now

// Check if email format is valid
function isValidEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// Enable submit button when form is valid
form.addEventListener('input', () => {
  if (validateForm()) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', '');
  }
});

// Send message to Gmail using SendGrid
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_SENDGRID_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: {
        email: 'mandipchhetri49@gmail.com',
        name: formData.get('fullname'),
      },
      to: [
        {
          email: 'mandipchhetri49@gmail.com',
          name: 'Mandip Chhetri',
        },
      ],
      subject: 'Contact Form Message',
      html: formData.get('message'),
    }),
  })
    .then((response) => response.json())
    .then(() => {
      alert('Message sent successfully!');
      form.reset();
    })
    .catch((error) => {
      alert('Error sending message:', error);
    });
});

///
const serviceJs = document.querySelector('.service-js');
const portfolieSection = document.querySelector('.portfolio');
const aboutSection = document.querySelector('.about');
const aboutBtn = document.querySelector('.aboutBtn');
const portfolioBtn = document.querySelector('.portfolioBtn');

// Show portfolio section when portfolio link is clicked
serviceJs.addEventListener('click', () => {
  aboutSection.classList.remove('active');
  aboutBtn.classList.remove('active');
  
  portfolioBtn.classList.add('active');
  portfolieSection.classList.add('active');
});



                