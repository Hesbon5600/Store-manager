// Create, update, and delete product.
// Create, promote user,
// Dashboard
// All sales records pages are reserved only for the admin
window.onload = onlyAdmin();
function onlyAdmin(){
    let current_user = JSON.parse(localStorage.getItem("current_user"));
    if(!current_user){
        window.location.replace("index.html");
    }
    if (current_user.role != "admin"){
        window.location.replace("products.html")
    }
}