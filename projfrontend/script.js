document.addEventListener('DOMContentLoaded', () => {

    //code for active lesson
    let dropdown = document.getElementsByClassName("sidebar-dropdown-btn");
    let i;
    for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active-lesson");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    } else {
    dropdownContent.style.display = "block";
    }
    });
    }

    //code for active link in nav bar can be used later
    // Get the container element
// var btnContainer = document.querySelector(".navbar");

// // Get all buttons with class="btn" inside the container
// var btns = btnContainer.getElementsByClassName("nav-link");

// // Loop through the buttons and add the active class to the current/clicked button
// for ( i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     console.log(current);
//     console.log(this);
//     // If there's no active class
//     if (current.length > 0) {
//       current[0].className = current[0].className.replace(" active", "");
//     }

//     // Add the active class to the current/clicked button
//     this.className += " active";
//   });
// }

let btnContainer = document.querySelector(".nav-tabs");

// Get all buttons with class="btn" inside the container
let btns = btnContainer.getElementsByClassName("nav-link");

// Loop through the buttons and add the active class to the current/clicked button
for ( i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    // var current = document.getElementsByClassName("active");
    let current = document.querySelectorAll(".nav-tabs .active");
    console.log(current);
    // If there's no active class
    for(i=0; i<current.length; i++) {
      current[i].className = current[i].className.replace("active", "");

    }
    // if (current.length > 0) {
    //   current[0].className = current[0].className.replace("active", "");
    // }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

