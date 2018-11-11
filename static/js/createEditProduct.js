window.onload = getAllProducts();
document.getElementById('create_product').addEventListener('submit', createProduct);
let edit_product = document.getElementById('edit_product')
let all_products = document.getElementById('all_products');
let Message = document.getElementById('Message');
function createProduct(e) {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let lower_inventory = document.getElementById('lower_inventory').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    // console.log(category)
    
        fetch('https://store-manager-v2.herokuapp.com/api/v2/products', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                title: title,
                price: price,
                quantity: quantity,
                lower_inventory: lower_inventory,
                description: description,
                category: category
            })
        })
        .then(res => res.json())
            .then((data) => {
                message = data.message
                if (message = 'Product created Successfully') {
                    
                    window.location.reload()
                }
                else{

                    Message.innerHTML = message
                }

            });

            
}
// Display the products at the side modal
function getAllProducts(){
    let token = localStorage.getItem('token');
    fetch('https://store-manager-v2.herokuapp.com/api/v2/products', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        // .then((data) => console.log(data.products))
        .then((data) => {
            products = data.products
            if (data.Message == 'Token is invalid') {
                alert('You must login to access this page');
                window.location.replace('index.html')
            }
            if (data.Message == 'No available products') {
                alert('No available products at the moment');
                window.location.replace('index.html')
            }
            let result = '';
            products.forEach(product => {
                result +=`
                <tr>
                    <td>${product.product_id}</td>
                    <td>
                        ${product.title}
                    </td>
                    <td>${product.description}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td class="btn">
                        <a onclick="getThisProduct('${product.product_id}')" class="fa fa-pencil edit" href="#">
                        </a>
                    </td>
                    <td class="btn">
                        <a onclick="deleteProduct('${product.product_id}')" class="fa fa-trash-o delete" href="#">
                        </a>
                    </td>
                </tr>`
                all_products.innerHTML = result;
            });
        });
}
function getThisProduct(product_id){
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
            let product = data.Product;
            let product_id = product.product_id
            localStorage.setItem('product_id', product_id)
            document.getElementById('title2').value = product.title
            document.getElementById('price2').value = product.price
            document.getElementById('quantity2').value = product.quantity
            document.getElementById('lower_inventory2').value = product.lower_inventory
            document.getElementById('category2').value = product.category
            document.getElementById('description2').value = product.description
                        
        })
        document.getElementById('create_product').style.display = "none";
        edit_product.style.display = "block";
}

document.getElementById('edit_product').addEventListener('submit', editProduct);
function editProduct(e){
    e.preventDefault();
    let product_id = localStorage.getItem('product_id')
    let token = localStorage.getItem('token');
    let title = document.getElementById('title2').value;
    let price = document.getElementById('price2').value;
    let quantity = document.getElementById('quantity2').value;
    let lower_inventory = document.getElementById('lower_inventory2').value;
    let description = document.getElementById('description2').value;
    let category = document.getElementById('category2').value;

    fetch('https://store-manager-v2.herokuapp.com/api/v2/products/' + product_id, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
                title: title,
                price: price,
                quantity: quantity,
                lower_inventory: lower_inventory,
                description: description,
                category: category
            })
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message)
            window.location.reload()
        })
}
function deleteProduct(product_id){
    let token = localStorage.getItem('token');
    message = 'Are you sure you want to delete this product?'
    con = confirm(message)
    if (con) {
        fetch('https://store-manager-v2.herokuapp.com/api/v2/products/' + product_id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'x-access-token': token
        }})
        .then((res) => res.json())
        .then((data) => {
            alert(data.message)
            window.location.reload()
        });
                
    }
}
