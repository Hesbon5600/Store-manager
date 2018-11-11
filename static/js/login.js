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
            // console.log(data)
            if(data.message == 'Successfully logged in'){
                getUserInfo(username);
                localStorage.setItem('token', data.token);
            }
            else{
                Message.innerHTML = data.message;
            }
        })
        .catch((err) => console.log(err))
    }
    
    function getUserInfo(username){
        fetch('https://store-manager-v2.herokuapp.com/api/v2/users', {
            mode: 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            users = data.users
            users.forEach(user => {
                if (user.username == username) {
                    localStorage.setItem('current_user', JSON.stringify({
                        current_user: user
                    }))
                    window.location.replace('products.html')
                }
            });
        });

}