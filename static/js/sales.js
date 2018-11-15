// Gets all sales from the database and display them
window.onload = getAllSales();
salesrecords = document.getElementById("salesrecords")
grandTotal = document.getElementById("total")
function getAllSales() {
    let token = localStorage.getItem("token")
    fetch("https://store-manager-v2.herokuapp.com/api/v2/sales", {
        mode: "cors",
        headers: {
            "x-access-token": token
        }
    })
        .then((res) => res.json())
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
function getAttendants(){
    let attendant = document.getElementById("attendant")
    fetch("https://store-manager-v2.herokuapp.com/api/v2/users", {
        mode: "cors"
    })
        .then((res) => res.json())
        .then((data) => {
            users = data.users
            let output = `<option selected disabled>..Attendant..</option>
            `
            users.forEach(user => {
                if(user.role === "attendant"){
                    output +=`
                    <option">
                        ${user.username}
                    </option>
                    `
                    attendant.innerHTML = output;
                }
            });
        });
}
function findSale(){
    let input, sort, table, tr, td, i;
  input = document.getElementById("searchInput");
  sort = input.value.toUpperCase();
  table = document.getElementById("allrecords");
  tr = table.getElementsByTagName("tr");
 
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(sort) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
 }