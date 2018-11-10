window.onload = getAllSales();
salesrecords = document.getElementById('salesrecords')
grandTotal = document.getElementById('total')
function getAllSales() {
    let token = localStorage.getItem('token')
    fetch('https://store-manager-v2.herokuapp.com/api/v2/sales', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        // .then((data) => console.log(data.products))
        .then((data) => {
            let sales = data.Sales
            output = ``;
            let grand_total = 0
            sales.forEach(sale => {
                let total = 0;
                total = sale.quantity_sold * sale.product_price;
                output += `
                <tr>
                        <td>${sale.sale_id}</td>
                        <td>
                            ${sale.product_title}
                        </td>
                        <td>${sale.product_description}</td>
                        <td>${sale.product_price}</td>
                        <td>${sale.quantity_sold}</td>
                        <td>${sale.product_quantity}</td>
                        <td>${sale.attendant_name}</td>
                        <td>${total}</td>
                        
                    </tr>
                
                `
                grand_total += total
            });
            salesrecords.innerHTML = output;
            gtotal = `
            <td colspan="6"></td>
            <td colspan="3">${grand_total}</td>
            `
            grandTotal.innerHTML = gtotal;
        });

}
window.onload = getAttendants();
let attendant = document.getElementById('attendant')
function getAttendants(){
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
            let output = `<option selected disabled>..Attendant..</option>
            `
            users.forEach(user => {
                localStorage.setItem('users', JSON.stringify({
                    users: users
                }))
                if(user.role == 'attendant'){
                    output +=`
                    <option">
                        ${user.username}
                    </option>
                    `
                }
            });
            attendant.innerHTML = output;
        });
}
