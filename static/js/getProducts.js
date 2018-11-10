
window.onload = getProducts();
function getProducts() {
    let token = localStorage.getItem('token');
    let allProducts = document.getElementById('products')

    fetch('https://store-manager-v2.herokuapp.com/api/v2/products', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.Message == 'Token is invalid') {
                alert('You must login to access this page');
                window.location.replace('index.html')
            }
            if (data.Message == 'No available products') {
                alert('No available products at the moment');
                window.location.replace('index.html')
            }
            let result = '';
            data.products.forEach(product => {
                result += `
                <div onclick="displayModal('${product.product_id}')" class="single-product" id="getsingleproduct">
                <div>
                        <a  href="#" title=""><img  src="images/img_8.jpg" alt="Product1"></a>
                    </div>
                    
                    <div>
                        <a   href="" title=""><p id="description">${product.title}</p></a>
                    </div>
                    <div class="product-footer">
                    <a href="" title="">Ksh<span class="first" id="price">${product.price}</span></a>
                    <span  class="last"><a  href="#" title="">Buy <i class="fa fa-plus"></i></a></span>
                    </div>
                    </div>
                    `;
                    allProducts.innerHTML = result;
                });
            localStorage.setItem('products', JSON.stringify(data.products));
        })
        .catch((error) => console.log(error))

}

