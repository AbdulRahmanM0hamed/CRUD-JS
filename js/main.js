var productName = document.getElementById('productNameInp');
var productPrice = document.getElementById('productPriceInp');
var productCategory = document.getElementById('productCategoryInp');
var productDesc = document.getElementById('productDescInp');
var AddProduct = document.getElementById('AddProduct');
var setUpdate = document.getElementById('setUpdate');
var temp;

var productContiner = [];

if (localStorage.getItem('databass2') != null) {
    productContiner = JSON.parse(localStorage.getItem('databass2'));
    displayProduct();
}
function addProduct() {
    if (regxeAddProduct()) {
        var products = {
            Name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            Desc: productDesc.value,
        }

        productContiner.push(products);
        localStorage.setItem('databass2', JSON.stringify(productContiner));
        clearForm();
        displayProduct();
    }

    else {

    }
}

function displayProduct() {
    var cartoona = '';
    for (var i = 0; i < productContiner.length; i++) {
        cartoona += `
            <tr>
        <td>${i + 1}</td>
        <td>${productContiner[i].Name}</td>
        <td>${productContiner[i].price}</td>
        <td>${productContiner[i].category}</td>
        <td>${productContiner[i].Desc}</td>
        <td><button type="button" onclick="displayUpdateProduct(${i})"  class=" btn btn-outline-warning btn-sm rounded" >Update</button></td>
        <td><button type="button" onclick="deleteProduct(${i})" class=" btn btn-outline-danger  btn-sm rounded">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = cartoona;

}

function clearForm() {

    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";

    productName.classList.add("is-invalid");
    productPrice.classList.add("is-invalid");
    productCategory.classList.add("is-invalid");
    productDesc.classList.add("is-invalid");
}

function deleteProduct(index) {

    productContiner.splice(index, 1);
    localStorage.setItem('databass2', JSON.stringify(productContiner));

    displayProduct();
}

function search(term) {


    term.toLowerCase();
    var cartoona = '';
    for (var i = 0; i < productContiner.length; i++) {
        if (productContiner[i].Name.toLowerCase().includes(term.toLowerCase())) {
            cartoona += `
            <tr>
        <td>${i + 1}</td>
        <td>${productContiner[i].Name}</td>
        <td>${productContiner[i].price}</td>
        <td>${productContiner[i].category}</td>
        <td>${productContiner[i].Desc}</td>
        <td><button type="button "onclick="deleteProduct(${i})" class="btn btn-outline-warning btn-sm" >Update</button></td>
        <td><button type="button "onclick="deleteProduct(${i})" class="btn btn-outline-danger  btn-sm">Delete</button></td>
            </tr>
        `
        }
    }
    document.getElementById('tbody').innerHTML = cartoona;

}

function regxeAddProduct() {
    var patterns = {
        name: /^[A-Z][a-zA-Z]{3,8}$/,
        price: /^([1-9]\d{1,2}|10000)$/,
        category: /^(tv|mobile|device)$/,
        description: /^.{1,500}$/
    };

    var inputs = {
        name: productName,
        price: productPrice,
        category: productCategory,
        description: productDesc
    };

    var isValid = true;

    for (var key in patterns) {
        if (patterns[key].test(inputs[key].value)) {
            inputs[key].classList.replace("is-invalid", "is-valid");
        } else {
            inputs[key].classList.add("is-invalid");
            isValid = false;
        }
    }

    return isValid;
}

function displayUpdateProduct(i) {
    AddProduct.classList.add('d-none');
    setUpdate.classList.remove('d-none');
    productName.value = productContiner[i].Name;
    productPrice.value = productContiner[i].price;
    productCategory.value = productContiner[i].category;
    productDesc.value = productContiner[i].Desc;
    displayProduct();
    regxeAddProduct();
    temp = i;
}

function setUpdate2(temp) {

    productContiner[temp].Name = productName.value;
    productContiner[temp].price = productPrice.value;
    productContiner[temp].category = productCategory.value;
    productContiner[temp].Desc = productDesc.value;
    localStorage.setItem('databass2', JSON.stringify(productContiner));
    AddProduct.classList.remove('d-none');
    setUpdate.classList.add('d-none');
    clearForm();
    displayProduct();
}

