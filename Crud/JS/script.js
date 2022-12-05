var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDes");
var productContainer = [];
var mode='add';
var currentItem;

//var ProductName
//var x=document.getElementById("addProduct").innerHTML;
if (localStorage.getItem('ourProduct') != null) 
{
    productContainer = JSON.parse(localStorage.getItem('ourProduct'));
    display();
}

function addProduct() 
{
    var products =
    {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value

    }
    if(mode==='add')
     {
       
        productContainer.push(products);
        localStorage.setItem('ourProduct', JSON.stringify(productContainer));
         display();
         clear()

     }
     else
     {
        productContainer[currentItem]=products;
        display();
        clear()
        mode='add';
        document.getElementById("addProduct").innerHTML="Add Product";

    }
   

   
}
function clear()
{
    productName.value="";
    productPrice.value="";
    productDescription.value="";
}
function display()
 {
    var productItem = ``;
    for (var i = 0; i < productContainer.length; i++) {
        productItem += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td> <button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td> <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`

    }
    document.getElementById("tBody").innerHTML = productItem;
}

function deleteProduct(index) 
{
    productContainer.splice(index, 1);
    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    display();
}
function searchProduct(term) {
    var productItem = ``;

    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {

            productItem += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td> <button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td> <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`

        }
    }
    document.getElementById("tBody").innerHTML = productItem;
}

function updateProduct(i) 
{
    
    productName.value = productContainer[i].name;
    productPrice.value = productContainer[i].price;
    productDescription.value = productContainer[i].description;
    document.getElementById("addProduct").innerHTML="Update Product";
    mode='update';
     currentItem=i;
     scroll(
        {
            top:0,behavior:'smooth'
        }
        )


}





































