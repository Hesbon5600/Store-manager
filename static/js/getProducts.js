// Get all products to be 
// displayed in the products page
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
                    
                    <form>
                        <label   href="" title="" id="description">${product.title}</label>
                    </form>
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

function findProduct(){
    let input, sort, maindiv, singlediv, divdata, i;
  input = document.getElementById("searchInput");
  sort = input.value.toUpperCase();
  maindiv = document.getElementById("products");
  singlediv = maindiv.getElementsByTagName("div");
 
  for (i = 0; i < singlediv.length; i++) {
    divdata = singlediv[i].getElementsByTagName("label")[0];
    if (divdata) {
      if (divdata.innerHTML.toUpperCase().indexOf(sort) > -1) {
        singlediv[i].style.display = "";
      } else {
        singlediv[i].style.display = "none";
      }
    }
  }
 }