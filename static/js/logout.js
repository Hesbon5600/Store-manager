// When a user clicks logout,
// The user session is destroyed
function logout() {
    localStorage.clear();
    window.location.href = "index.html";

    // let token = localStorage.getItem("token")
    // fetch("http://localhost:5000/api/v2/auth/logout", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "x-access-token": token
    //     }
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         localStorage.clear();
    //         window.location.replace("index.html")
    //     });
}