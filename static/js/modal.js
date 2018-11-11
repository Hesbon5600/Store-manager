// Get the modal
let add_modal = document.getElementById('product-modal');

let cart_modal = document.getElementById('cart-modal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let span2 = document.getElementsByClassName("close-cart")[0];

// When the user clicks the product, open the modal 
function displayModal(product_id) {
    let prod_id = product_id;
    let token = localStorage.getItem('token');
    fetch('https://store-manager-v2.herokuapp.com/api/v2/products/' + prod_id, {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            let prod = data.Product;
            let output = `
            <div class="single-product" id="modal-product">
                    <div id="M-top">
                    <span onclick="closeModal()"><i class="close fa fa-times"></i></span>
                    <h6>${prod.description}</h6>
                    
                    </div>
                    <div>
                    </div>  
                    <div>
                        <a href="" title="" class="prod"><p>
                            <ul style="list-style: none; color: #ffffff;">
                                <li>Title: ${prod.title} </li>
                                <li>Quantity: ${prod.quantity}</li>
                                <li>Minimum Inventory: ${prod.lower_inventory}</li> 
                            </ul>
                        
                        
                        </p></a>
                    </div>
                    <form>
                    <input required id="salequantity" type="text" placeholder="...Quantity to sell..." style="width:61%; margin-left: 21%; border-radius: .5rem; background-color: #f0f5f8;">
                    </form>
                    <div id="footer" class="product-footer">
                        <a id="cost" href="" title="">Ksh <span class="first">${prod.price}</span></a>
                        <a style="cursor: pointer;" onclick="makeSale('${prod.title}')"><span class="last"><span>Make sale <i class="fa fa-plus"></i></span></a>
                    </div>
                </div>
            `;
            add_modal.innerHTML = output;
        })

    add_modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
function closeModal() {
    add_modal.style.display = "none";
}

function makeSale(product_title){
    console.log(product_title)
    let prduct_title = product_title
    let token = localStorage.getItem('token')
    let salequantity = document.getElementById("salequantity").value
    console.log(salequantity)
    fetch('https://store-manager-v2.herokuapp.com/api/v2/sales', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                product_title: prduct_title,
                product_quantity: salequantity
            })
        })
        .then(res => res.json())
            .then((data) => {
                alert(data.message)
                closeModal()
                
            })

}

function displayCart() {
    cart_modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    add_modal.style.display = "none";
}

span2.onclick = function () {
    cart_modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == add_modal) {
        add_modal.style.display = "none";
    }
    if (event.target == cart_modal) {
        cart_modal.style.display = "none";
    }
}