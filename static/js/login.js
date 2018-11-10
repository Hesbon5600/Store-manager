document.getElementById('login').addEventListener('submit', login);
let Message = document.getElementById('Message');
function login(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch('https://store-manager-v2.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            Message.innerHTML = data.message;
            if(data.message == 'Successfully logged in'){
                localStorage.setItem('token', data.token);
                window.location.replace('products.html')

            }
        })
        .catch((err) => console.log(err))
}
