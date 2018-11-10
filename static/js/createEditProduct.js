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
                Message.innerHTML = message
                if (message = 'Product created Successfully') {
                    
                    window.location.reload()
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
