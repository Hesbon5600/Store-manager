// Get the modal
let add_modal = document.getElementById("product-modal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let product_route = "http://localhost:5000/api/v2/products/"
let sale_route = "http://localhost:5000/api/v2/sales"
let token = localStorage.getItem("token");
let header = {
    "Content-type": "application/json",
    "x-access-token": token
}
// When the user clicks the product, open the modal
const displayModal = (product_id) => {
    let prod_id = product_id;
    fetch(product_route + prod_id, {
        mode: "cors",
        headers: header
    })
        .then((res) => res.json())
        .then((data) => {
            let prod = data.product;
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
                    <input required id="salequantity" type="number" placeholder="...Quantity to sell..." style="width:61%; margin-left: 21%; border-radius: .5rem; background-color: #f0f5f8;">
                    </form>
                    <div id="footer" class="product-footer">
                        <a id="cost" href="" title="">Ksh <span class="first">${prod.price}</span></a>
                        <a style="cursor: pointer;" onclick="makeSale('${product_id}')"><span class="last"><span>Make sale <i class="fa fa-plus"></i></span></a>
                    </div>
                </div>
            `;
            add_modal.innerHTML = output;
            console.log(data)
        })
    add_modal.style.display = "block";
    // let current_user = JSON.parse(localStorage.getItem("current_user"));
    // if (current_user.role === "attendant") {
    // }
}

// When the user makes a sale, this function is invoked
const makeSale = (product_id) => {
    let salequantity = document.getElementById("salequantity").value
    let data = JSON.stringify({
        product_id: parseInt(product_id),
        product_quantity: parseInt(salequantity)
    })
    fetch(sale_route, {
        method: "POST",
        mode: "cors",
        headers: header,
        body: data
    })
        .then(res => res.json())
        .then((data) => {
            if (data.message == "You must enter a product quantity") {
                alert(data.message)
            } else {

                alert(data.message)
                closeModal()
            }

        })
}
// When the user clicks on <span> (x), close the modal
const closeModal = () => add_modal.style.display = "none";


// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == add_modal) {
        add_modal.style.display = "none";
    }
}