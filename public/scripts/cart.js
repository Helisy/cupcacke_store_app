const cart_toggle = document.querySelector("#cart_toggle");
const cart_menu = document.querySelector("#cart_menu");
const cart_close  = document.querySelector("#cart_close");

cart_toggle.addEventListener('mouseover', e => {
    cart_menu.classList.toggle("open")
})

cart_close.addEventListener('click', e => {
    cart_menu.classList.toggle("open")
})