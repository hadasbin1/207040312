function onToggleModal(ev){
    ev.preventDefault();
    const elModal = document.querySelector('.modal')
    const elScreen = document.querySelector('.screen-overly')
    elModal.classList.toggle('open')
    elScreen.classList.toggle('open')
}
