// This funtion gets the sale records for a apescific attendant
window.onload = getAttendantRecords();
function getAttendantRecords() {
  let salesrecord = document.getElementById("mysales");
  grandTotal = document.getElementById("total")
  let current_user = JSON.parse(localStorage.getItem("current_user"));
  let token = localStorage.getItem("token")
  fetch("http://localhost:5000/api/v2/sales", {
    mode: "cors",
    headers: {
      "x-access-token": token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      sales = data.sales
      output = ``;
      let total = 0;
      let grand_total = 0
      sales.forEach(sale => {
        if (sale.attendant_id === current_user.user_id) {
          output += `
                    <tr>
                        <td>${sale.sale_id}</td>
                        <td>
                            ${sale.product_title}
                        </td>
                        <td>${sale.product_description}</td>
                        <td>${sale.product_category}</td>
                        <td>${sale.product_price}</td>
                        <td>${sale.quantity_sold}</td>
                        <td>${sale.total_price}</td>

                    </tr>
                    `
          grand_total += sale.total_price

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
function findSale() {
  let input, sort, table, tr, td, i;
  input = document.getElementById("searchInput");
  sort = input.value.toUpperCase();
  table = document.getElementById("allrecords");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(sort) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}