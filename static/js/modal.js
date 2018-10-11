// Get the modal
let add_modal = document.getElementById('product-modal');

let cart_modal = document.getElementById('cart-modal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let span2 = document.getElementsByClassName("close-cart")[0];

// When the user clicks the product, open the modal 
function displayModal() {
    add_modal.style.display = "block";
}
function displayCart(){
    cart_modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    add_modal.style.display = "none";
}

span2.onclick = function() {
    cart_modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == add_modal) {
        add_modal.style.display = "none";
    }
    if (event.target == cart_modal) {
        cart_modal.style.display = "none";
    }
}