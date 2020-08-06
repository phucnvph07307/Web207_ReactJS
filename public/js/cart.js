// Định nghĩa một mảng chứa phần tử sẽ bỏ vào giỏ hàng
var shoppingCartItems = [];


// Kiểm tra nếu đã có sessionStorage["shopping-cart-items"] đã tồn tại hay chưa ?
if (sessionStorage["shopping-cart-items"] != null) {
    shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString());

    // Hiển thị thông tin từ giỏ hàng
    displayShoppingCartItems();
}


function addCart(id) {
    var button = document.querySelector(`#add-to-cart-${id}`);

    var id = button.getAttribute('data-id'); // id của sản phẩm là id của button
    var name = button.getAttribute('data-name'); // name của sản phẩm là thuộc tính data-name của button
    var image = button.getAttribute('data-image'); // image của sản phẩm là thuộc tính data-image của button
    var price = button.getAttribute('data-price'); // price của sản phẩm là thuộc tính data-price của button
    var quantity = 1; // Số lượng

    var item = {
        id: id,
        name: name,
        image: image,
        price: price,
        quantity: quantity
    };



    var exists = false; // Cờ hiệu
    if (shoppingCartItems.length > 0) {
        for (var i = 0; i < shoppingCartItems.length; i++) {
            if (shoppingCartItems[i].id == item.id) {
                shoppingCartItems[i].quantity++;
                exists = true;
                break;
            }
        }
    }

    // Nếu mặt hàng chưa tồn tại trong giỏ hàng thì bổ sung vào mảng
    if (!exists) {
        shoppingCartItems.push(item);
    }


    // Lưu thông tin vào sessionStorage
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems); // Chuyển thông tin mảng shoppingCartItems sang JSON trước khi lưu vào sessionStorage
    // Gọi hàm hiển thị giỏ hàng
    displayShoppingCartItems();
    alert('Thêm Giỏ hàng thành công!')

}

// Hiển thị giỏ hàng ra table
function displayShoppingCartItems() {
    if (sessionStorage["shopping-cart-items"] != null) {
        shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString()); // Chuyển thông tin từ JSON trong sessionStorage sang mảng shoppingCartItems.
        console.log(shoppingCartItems);
        var tbody = document.querySelector('#table-products > tbody');
        var viewTotal = document.querySelector('#table-products > tfoot #viewTotal');

        var content = "";
        var toTal = 0;

        // Duyệt qua mảng shoppingCartItems để append từng item dòng vào table

        shoppingCartItems.forEach(element => {
            var amount = element.price * element.quantity;
            toTal += amount;
            content += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td><img  width="80px" src="${element.image}"></td>
                <td>$${element.price}</td>
                <td> <input style="width: 80px;" type="number" class="form-control" min="0" value="${element.quantity}" onchange="changeItem(${element.id},this.value)"> </td>
                <td>$${amount}</td>
                <td><button class="btn btn-sm btn-outline-danger"  onclick="removeItem(${element.id})">
                <i class="fa fa-trash"></i>
                </button>
                </td>
            </tr>

            `;

        });
        tbody.innerHTML = content;
        viewTotal.innerText = toTal;

    }




}


// Xóa hết giỏ hàng shoppingCartItems
function clearCart() {
    shoppingCartItems = [];
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
    displayShoppingCartItems();
}



//Xóa sản phẩm trong giỏ hàng
function removeItem(id) {
    var test = confirm('Bạn có muốn xóa Sản phẩm này ?');
    if (test == true) {

        for (let i = 0; i < shoppingCartItems.length; i++) {
            if (shoppingCartItems[i].id == id) {
                shoppingCartItems.splice(i, 1);
                break;
            }
        }

        sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
        displayShoppingCartItems();
    }

}



//Sự kiên thay đổi Số lượng sản phẩm trong giỏ hành
function changeItem(id, quantity) {

    if (quantity <= 0) {
        var test = confirm('Bạn có muốn xóa Sản phẩm này ?');
        if (test == true) {

            for (let i = 0; i < shoppingCartItems.length; i++) {
                if (shoppingCartItems[i].id == id) {
                    shoppingCartItems.splice(i, 1);
                    break;
                }
            }

            sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
            displayShoppingCartItems();
        } else {
            sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
            displayShoppingCartItems();
        }
    } else {

        for (let i = 0; i < shoppingCartItems.length; i++) {
            if (shoppingCartItems[i].id == id) {
                shoppingCartItems[i].quantity = quantity;
                break;
            };

        }
        sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems);
        displayShoppingCartItems();
    }

}