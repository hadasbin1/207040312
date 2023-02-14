// -------------------------------------------- geoLocation --------------------------------------------
const Entrance = document.querySelector('.Entrance');
Entrance.addEventListener('click',function(){
    if(!checkbox.checked)
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
        window.location.href = '/shops';
} )
//update checkbox position and save the cordination of the users position
function successCallback(position) {
    checkbox.checked = true;
    x = position.coords.latitude;
    y = position.coords.longitude;
}
//if there is no geoLocation access checkbox is false 
function errorCallback(error) {
    if(error.code == error.PERMISSION_DENIED) {
        checkbox.checked = false;
    }
}
//Add on click listener for button
Entrance.addEventListener('click', function() {
    //Select (h1) heading by id, and then change it's value to (bananas)
    document.querySelector('.MyHeading').innerText = "אנא הפעל מיקום בעת שימוש באתר"
})

// -------------------------------------------- validation --------------------------------------------
function validateContactForm() {
    var contactName = document.forms["contactForm"]["contactName"].value;
    if (contactName.length < 3) {
        alert("Contact name must contain at least 3 characters.");
        return false;
    }
}

function validateResForm() {
    var full_name = document.forms["reservationForm"]["full_name"].value;
    if (full_name.length < 3) {
        alert("Contact name must contain at least 3 characters.");
        return false;
    }
}

// -------------------------------------------- Logo --------------------------------------------
var imageSources = [src="../media/Logo1.png", src="../media/Logo2.png", src="../media/Logo3.png", src="../media/Logo4.png"]

var index = 0;
setInterval (function(){
  if (index === imageSources.length) {
    index = 0;
  }
  document.getElementById("image").src = imageSources[index];
  index++;
} , 500);
