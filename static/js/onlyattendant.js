// Only the attendant can view his/her sales records
window.onload = onlyAttendant();
function onlyAttendant() {
    let current_user = JSON.parse(localStorage.getItem("current_user"));
    if (!current_user) {
        window.location.replace("index.html");
    }
    if (current_user.role != "attendant") {
        window.location.replace("products.html")
    }
}