const cosherCheckbox = document.querySelector('#cosherCheckbox');
const veganCheckbox = document.querySelector('#veganCheckbox');
cosherCheckbox.addEventListener('click', filterCoffeeShops);
veganCheckbox.addEventListener('click', filterCoffeeShops);

function onToggleModal(name, sockets, quiet_place, wifi, cosher, vegan, free_places){
    const elModal = document.querySelector('.modal')
    const elScreen = document.querySelector('.screen-overly-shop')
    elModal.classList.toggle('open')
    elScreen.classList.toggle('open')

    const elCoffeeShop = elModal.querySelector('h1');
    elCoffeeShop.innerText = name;
    
    // change bit(1/0) to icon(V/X)
    const elSockets = elModal.querySelector('.sockets');
    if(sockets == 1)
        elSockets.innerText = "V";
    else
        elSockets.innerText = "X";

    const elQuiet_place = elModal.querySelector('.quiet_place');
    if(quiet_place == 1)
        elQuiet_place.innerText = "V";
    else
        elQuiet_place.innerText = "X";    

    const elWifi = elModal.querySelector('.wifi');
    if(wifi == 1)
        elWifi.innerText = "V";
    else
        elWifi.innerText = "X";   

    const elCosher = elModal.querySelector('.cosher');
    if(cosher == 1)
        elCosher.innerText = "V";
    else
        elCosher.innerText = "X";   

    const elVegan = elModal.querySelector('.vegan');
    if(vegan == 1)
        elVegan.innerText = "V";
    else
        elVegan.innerText = "X";    

    const elFreePlace = elModal.querySelector('.places');
    if(free_places == 0)
        elFreePlace.innerText = "מתנצלים, כרגע לא ניתן להזמין מקומות בבית הקפה הזה"
    else
        elFreePlace.innerText = free_places + " :מקומות פנויים " 

    const elShopButton = elModal.querySelector('.shopButton');
    if(free_places == 0)
        elShopButton.style.display = 'none';
    else
        elShopButton.style.display = 'inline-block';
}

function filterCoffeeShops() {
    const cosherCheckbox = document.querySelector('#cosherCheckbox');
    const veganCheckbox = document.querySelector('#veganCheckbox');
    const shopConList = document.querySelectorAll('.shopCon');

    shopConList.forEach(function(shopCon) {
      const isCosher = cosherCheckbox.checked ? shopCon.classList.contains('cosher') : true;
      const isVegan = veganCheckbox.checked ? shopCon.classList.contains('vegan') : true;
      shopCon.style.display = isCosher && isVegan ? 'block' : 'none';
    });
  }

