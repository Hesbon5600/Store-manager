window.onload = stats();
function stats() {
    let token = localStorage.getItem('token');
    let userSummary = document.getElementById('userSummary');
    let salesSummary = document.getElementById('salesSummary');
    let prodSummary = document.getElementById('prodSummary');


    fetch('https://store-manager-v2.herokuapp.com/api/v2/users', {
        mode: 'cors'
    })
        .then((res) => res.json())
        .then((data) => {
            allusers = data.users.length
            userSummary.innerHTML = allusers
        });
    fetch('https://store-manager-v2.herokuapp.com/api/v2/sales', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => { 
            allsales = data.Sales.length
            salesSummary.innerHTML = allsales
        });

    fetch('https://store-manager-v2.herokuapp.com/api/v2/products', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            allprod = data.products.length
            prodSummary.innerHTML = allprod
        })


}