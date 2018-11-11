window.onload = redirect();
function redirect(){
let current_user = JSON.parse(localStorage.getItem('current_user'));
    if(!current_user){
        window.location.replace('index.html')
    }
}