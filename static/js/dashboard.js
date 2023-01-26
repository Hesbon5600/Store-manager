// Get the statistics of the users, sales and products
window.onload = stats();
function stats() {
    let token = localStorage.getItem("token");
    let userSummary = document.getElementById("userSummary");
    let salesSummary = document.getElementById("salesSummary");
    let prodSummary = document.getElementById("prodSummary");


    fetch("http://localhost:5000/api/v2/users", {
        mode: "cors",
        headers: {
            "x-access-token": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            allusers = data.users.length
            userSummary.innerHTML = allusers
        });
    fetch("http://localhost:5000/api/v2/sales", {
        mode: "cors",
        headers: {
            "x-access-token": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            allsales = data.sales.length
            salesSummary.innerHTML = allsales
        });

    fetch("http://localhost:5000/api/v2/products", {
        mode: "cors",
        headers: {
            "x-access-token": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            allprod = data.products.length
            prodSummary.innerHTML = allprod
        })


}