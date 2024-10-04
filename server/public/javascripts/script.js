'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

// Function to handle pinning places
const pinPlace = function (elem) {
  const favoriteList = document.getElementById('favorite-list');

  elem.forEach(pinBtn => {
    pinBtn.addEventListener('click', function () {
      const placeName = this.getAttribute('data-name');
      const placeLink = this.parentElement.querySelector('a').getAttribute('href');

      // Check if the place is already pinned
      if (!favoriteList.querySelector(`[data-name="${placeName}"]`)) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-name', placeName);
        listItem.innerHTML = `<a href="${placeLink}">${placeName}</a>`;
        favoriteList.appendChild(listItem);
      }
    });
  });
};

// Call the pinPlace function with all pin buttons
pinPlace(document.querySelectorAll('.pin-btn'));



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
    document.querySelector('.hero input').classList.add("fixed-search");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
    document.querySelector('.hero input').classList.remove("fixed-search");
  }

});
const sidebarToggle = document.querySelector('.sidebar-toggle');
const favoritePlaces = document.querySelector('.favorite-places');

sidebarToggle.addEventListener('click', () => {
  favoritePlaces.classList.toggle('active');
});
