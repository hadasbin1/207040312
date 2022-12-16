const Entrance = document.querySelector('.Entrance');
Entrance.addEventListener('click',function(){
    if(!checkbox.checked)
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
        window.location.href='./shops.html';
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

