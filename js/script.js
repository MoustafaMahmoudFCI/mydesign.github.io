// toggle setting box
document.querySelector(".icon").onclick = function () {
    // toggle icon
    document.querySelector('.fa-cog').classList.toggle('fa-spin');
    // toggle setting box
    document.querySelector('.setting-box').classList.toggle("open");
}

// get main color from local stoarge
let colorLocalItem = localStorage.getItem('main_color');
if (colorLocalItem !== null) {
    document.documentElement.style.setProperty('--main-color', colorLocalItem);
    //remove  class active from colors list
    document.querySelectorAll(".colors li").forEach(element => {
        element.classList.remove("active");

        // add class active to element
        if (colorLocalItem === element.dataset.color) {
            element.classList.add('active');
        }
    });
}
// switch main color
let colorsItems = document.querySelectorAll(".setting-content .colors li");
colorsItems.forEach(item => {
    item.addEventListener("click", (e) => {
        //set color in root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        // set main color in local storage
        localStorage.setItem('main_color', e.target.dataset.color);

        handleClassActive(e);
    });
});

// background interval (used to clear interval)
let backgroundInterval;

let backgroundOption = true;
// get background option from local storage
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    backgroundOption = backgroundLocalItem === 'true' ? true : false;
    // remove class active from background span
    document.querySelectorAll('.random-background span').forEach(element => {
        element.classList.remove('active');
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector('.random-background .yes').classList.add('active');
    } else {
        document.querySelector(".random-background .no").classList.add('active');
    }
}

function randomBackground() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

            let landingPage = document.querySelector('.landing-page');

            let randomNum = Math.floor(Math.random() * imgs.length);
            landingPage.style.backgroundImage = `url('imgs/landing-page/${imgs[randomNum]}')`;
        }, 7000);
    } else {
        // clear timer
        clearInterval(backgroundInterval);
    }
}
randomBackground();

// switch random background option (user choose to run random background or not)
let randomElements = document.querySelectorAll('.random-background span');
// loop through span (elements)
randomElements.forEach(span => {
    //remove class active
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add('active');
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomBackground();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// popup gallery images 
let galleryImgs = document.querySelectorAll(".gallery-imgs img");
galleryImgs.forEach(img => {
    img.addEventListener("click", (e) => {
        // create overlay div
        let overlayDiv = document.createElement("div");
        // add class popup-overlay to div
        overlayDiv.className = "popup-overlay";
        // append overlay div to body
        document.body.appendChild(overlayDiv);
        // create img box
        let imgBox = document.createElement("div");
        // add class to imgBox
        imgBox.className = "overlay-img-box";
        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");
            // add img alt attribute to heading
            imgHeading.textContent = img.alt;
            // append heading to imgBox
            imgBox.appendChild(imgHeading);
        }
        // create img element
        let imgElement = document.createElement("img");
        // add src attribute to img
        imgElement.src = img.src;
        // append imgElement to div->imgBox
        imgBox.appendChild(imgElement);
        // append imgBox to body
        document.body.appendChild(imgBox);
        //create close btn
        let closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", 'close-btn');
        closeBtn.textContent = "x";
        //add close btn to img box
        imgBox.appendChild(closeBtn);
    });
});

// close popup
document.addEventListener("click", (e) => {
    if (e.target.className === 'close-btn') {
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }
});

// get all bullets
let bullets = document.querySelectorAll('.bullets .item');
scrollToSection(bullets);

let bulletsItems = document.querySelectorAll('.show-bullets span');
let bulletsContainer = document.querySelector(".bullets");
let bulletsLocalOption = localStorage.getItem('bulletsOption');
bulletsItems.forEach(item => {
    item.addEventListener("click", (e) => {
        if (item.dataset.bullets === 'show') {
            bulletsContainer.style.display = "block";
            localStorage.setItem('bulletsOption', 'block');
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem('bulletsOption', 'none');
        }
        handleClassActive(e);
    });
});
if (bulletsLocalOption !== null) {
    bulletsItems.forEach(item => {
        item.classList.remove('active');
    });
    if (bulletsLocalOption === 'block') {
        document.querySelector('.show-bullets .yes').classList.add('active');
        bulletsContainer.style.display = "block";
    } else {
        document.querySelector('.show-bullets .no').classList.add('active');
        bulletsContainer.style.display = "none";
    }
}
// get all links
let links = document.querySelectorAll('.links a');
scrollToSection(links);

// reset options
document.querySelector("#reset-options").onclick = function (e) {
    localStorage.removeItem("main_color");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bulletsOption");
    window.location.reload();
}

//######################### function area ###########################//
// function scroll to section
function scrollToSection(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector("." + e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

// function to remove active class from all element and add it to current element
function handleClassActive(event) {
    // remove class active 
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add class active to itself
    event.target.classList.add("active");
}

//toggle navbar menu
let toggleBtn = document.querySelector('.toggle-menu');
let linksMenu = document.querySelector('.header-area .links');
toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation();
    this.classList.toggle('menu-active');
    linksMenu.classList.toggle("open");

}
linksMenu.onclick = function (e) {
    e.stopPropagation();
}
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== linksMenu) {
        if (linksMenu.classList.contains("open")) {
            linksMenu.classList.remove("open");
            toggleBtn.classList.toggle("menu-active");
        }
    }
});