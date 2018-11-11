window.onload = getAttendantRecords();
function getAttendantRecords(){
    let salesrecord = document.getElementById('mysales');
    grandTotal = document.getElementById('total')
    let current_user = JSON.parse(localStorage.getItem('current_user'));
    let token = localStorage.getItem('token')
    fetch('https://store-manager-v2.herokuapp.com/api/v2/sales', {
        mode: 'cors',
        headers: {
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            sales = data.Sales
            output = ``;
            let total = 0;
            let grand_total = 0
            sales.forEach(sale => {
                if (sale.attendant_id == current_user.current_user.user_id){
                    total = sale.quantity_sold * sale.product_price;
                    output +=`
                    <tr>
                        <td>${sale.sale_id}</td>
                        <td>
                            ${sale.product_title}
                        </td>
                        <td>${sale.product_description}</td>
                        <td>${sale.product_category}</td>
                        <td>${sale.product_price}</td>
                        <td>${sale.quantity_sold}</td>
                        <td>${sale.product_quantity}</td>
                        <td>${total}</td>
                        
                    </tr>
                    `
                grand_total += total

                }
                gtotal = `
                <td colspan="6"></td>
                <td colspan="3">${grand_total}</td>
                `
                salesrecord.innerHTML = output
                grandTotal.innerHTML = gtotal;
            });
        });
}