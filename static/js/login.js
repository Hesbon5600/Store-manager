document.getElementById("login").addEventListener("submit", login);
let Message = document.getElementById("Message");
// This function Authenticates the user then logs in the user
function login(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch("http://localhost:5000/api/v2/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data?.token) {
                const current_user = JSON.parse(atob(data?.token?.split('.')[1]))
                localStorage.setItem("current_user", JSON.stringify(current_user));
                localStorage.setItem("token", data.token);
                window.location.href = "products.html";
            }
            else {
                Message.innerHTML = data.message;
            }
        })
}
