// Restricting access to specific pages is done here 
window.onload = navigation();
function navigation(){
    let navigation = document.getElementById('navigation');
    let userInfo = document.getElementById('user-info');
    let current_user = JSON.parse(localStorage.getItem('current_user'));
    // Attendant navigation
    if (current_user.current_user.role == 'admin') {
        nav = `
        <li style="margin:1% 10%"><a href="index.html" title="home">Home <i class="fa fa-home"></i></a></li>
        <li style="margin:1% 10%" class="current"><a href="products.html" title="products">Products <i class="fa fa-clipboard"></i></a></li>
        <li style="margin:1% 10%"><a href="dashboard.html" title="dashboard">Dashboard <i class="fa fa-dashboard"></i></a></li>
        `
        navigation.innerHTML = nav;
    }
    // Attendant navigation
    if (current_user.current_user.role == 'attendant'){
        nav = `
        <li><a href="index.html" title="home">Home <i class="fa fa-home"></i></a></li>
        <li class="current"><a href="products.html" title="products">Products <i class="fa fa-clipboard"></i></a></li>
        <li><a href="attendant_records.html" title="attendant records">My Records <i class="fa fa-save"></i></a></li>
        <li onclick="displayCart()"><a href="#" title="">Cart <i class="fa fa-shopping-cart"></i></a></li>
        `
        navigation.innerHTML = nav
    }
    username = current_user.current_user.username
    info = `
    ${username} |
    <a style="cursor: pointer; "id="logout" onclick="logout()" class="logout-btn">logout</a>
    `
    userInfo.innerHTML = info;
}
