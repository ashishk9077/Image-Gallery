//selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = () => { //after window loaded
  filterItem.onclick = (selectedItem) => { //if user click on filterItem div
    if (selectedItem.target.classList.contains("item")) { //if user selected item has .item class
      filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
      selectedItem.target.classList.add("active"); //add that active class on user selected item
      let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name"); //getting image data-name value
        //if user selected item data-name value is equal to images data-name value
        //or user selected item data-name value is equal to "all"
        if ((filterImges == filterName) || (filterName == "all")) {
          image.classList.remove("hide"); //first remove the hide class from the image
          image.classList.add("show"); //add show class in image
        } else {
          image.classList.add("hide"); //add hide class in image
          image.classList.remove("show"); //remove show class from the image
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)"); //adding onclick attribute in all available images
  }
}

//fullscreen image preview function
//selecting all required elements
const previewBox = document.querySelector(".preview-box"),
  categoryName = previewBox.querySelector(".title p"),
  previewImg = previewBox.querySelector("img"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow"),
  prevBtn = previewBox.querySelector(".prev"),
  nextBtn = previewBox.querySelector(".next");

let currentImgIndex; // to store the index of the current image

function preview(element) {
  // Get the index of the clicked image
  currentImgIndex = Array.from(filterImg).indexOf(element);
  
  //once user click on any image then remove the scroll bar of the body, so user can't scroll up or down
  document.querySelector("body").style.overflow = "hidden";
  
  // function to show the image details
  showImageDetails();
  
  previewBox.classList.add("show"); //show the preview image box
  shadow.classList.add("show"); //show the light grey background
  
  closeIcon.onclick = () => { //if user click on close icon of preview box
    previewBox.classList.remove("show"); //hide the preview box
    shadow.classList.remove("show"); //hide the light grey background
    document.querySelector("body").style.overflow = "auto"; //show the scroll bar on body
  }
}

function showImageDetails() {
  let selectedPrevImg = filterImg[currentImgIndex].querySelector("img").src; //getting user clicked image source link and stored in a variable
  let selectedImgCategory = filterImg[currentImgIndex].getAttribute("data-name"); //getting user clicked image data-name value
  previewImg.src = selectedPrevImg; //passing the user clicked image source in preview image source
  categoryName.textContent = selectedImgCategory; //passing user clicked data-name value in category name
}

// Previous button click event
prevBtn.onclick = () => {
  currentImgIndex--; // decrement index
  // if index is less than 0, loop to the last image
  if (currentImgIndex < 0) {
    currentImgIndex = filterImg.length - 1;
  }
  showImageDetails();
}

// Next button click event
nextBtn.onclick = () => {
  currentImgIndex++; // increment index
  // if index is greater than or equal to the total number of images, loop to the first image
  if (currentImgIndex >= filterImg.length) {
    currentImgIndex = 0;
  }
  showImageDetails();
}