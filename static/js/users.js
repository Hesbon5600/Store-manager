document.getElementById('signup').addEventListener('submit', signup);
let Message = document.getElementById('Message');
function signup(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let role = document.getElementById('role').value;
    if (password != password2) {
        Message.innerHTML = 'Password not matching'
    }
    else{
        fetch('https://store-manager-v2.herokuapp.com/api/v2/auth/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: role
            })
        })
        .then(res => res.json())
            .then((data) => {
                message = data.message
                Message.innerHTML = message

            });
        }
}
window.onload = getAllUsers();
function getAllUsers(){
    allusers = document.getElementById('users')
    let token = localStorage.getItem('token')
    fetch('https://store-manager-v2.herokuapp.com/api/v2/users', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            users = data.users
            output = ``;
            users.forEach(user => {
                output +=`
                <tr>
                <td>${user.user_id}</td>
                <td>
                    ${user.username}
                </td>
                <td>
                    ${user.email}
                </td>
                <td>${user.role}</td>
                <td class="btn">
                    <a onclick="promoteUser('${user.user_id}')"class="fa fa-upload edit" href="#">
                    </a>
                </td>
            </tr>
                `
            });
            allusers.innerHTML = output;

        })
}
