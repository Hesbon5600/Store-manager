// When a user clicks logout, 
// The user session is destroyed
function logout() {
    let token = localStorage.getItem("token")
    fetch("https://store-manager-v2.herokuapp.com/api/v2/auth/logout", {
        method: "POST",
        mode: "cors",
        headers: {
            "x-access-token": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.clear();
            window.location.replace("index.html")
        });
}