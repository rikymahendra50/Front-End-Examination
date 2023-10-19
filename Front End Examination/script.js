let productsHTML = '';

products.forEach((product) => {
    productsHTML += `<div class="list-pizza">
            <img src="${product.image}">
            <p title="${product.title}">${product.title}</p>
            <p class="price">$${product.totalPrice}</p>
        </div>`
});

document.querySelector('.container-list-pizza').innerHTML = productsHTML;

// fungsi click content 
const popUp = document.querySelector(".pop-up-topping");

document.querySelectorAll(".list-pizza").forEach((itemPizza, index) => {
    itemPizza.addEventListener("click", () => {
        // Menampilkan Pop Up topping
        popUp.style.display = "flex";
        
        // Mengambil nama dan price dari elemen yang di click
        const images = itemPizza.querySelector('img[src]');
        const srcGambar = images.getAttribute('src');

        const title = itemPizza.querySelector('p[title]').textContent;
        const price = itemPizza.querySelector('.price').textContent; 

        // Menghapus karakter '$' dan mengonversi teks menjadi angka
        const priceItem = parseFloat(price.replace('$', ''));

        inputTopping(title,priceItem,srcGambar);

    });
});

// fungsi Close Pop Up
const close = document.querySelector(".tombol-close");

close.addEventListener("click", () => {

    if (popUp.style.display = "flex"){
        popUp.style.display = "none";
    } else {
        popUp.style.display = "flex";
    }

});

let keranjangBelanjaFix = [];
let cartQuantity = 0;

// fungsi input topping
function inputTopping(title,itemPrice,srcGambar) {

    let listToppingValid = [];

    let keranjangBelanja = {
        images: srcGambar,
        title: title,
        listToppingValid: listToppingValid,
        totalPrice: itemPrice
    };

    let totalPriceElemen = document.querySelector(".total-price > span");
    totalPriceElemen.innerHTML = "$" + itemPrice;

    document.querySelectorAll('.one-dollars > input').forEach((listTopping, index) => {
        listTopping.addEventListener("change", () => {

            if (listTopping.checked) {

                // Menambah list Topping ke variable topping
                listToppingValid.push(listTopping.value);

                // Menambahkan angka ke harga saat ini
                keranjangBelanja.totalPrice += 1;

            } else {

                // Jika user uncheck maka hapus dari array
                const indexToRemove = listToppingValid.indexOf(listTopping.value);
                if (indexToRemove !== -1) {
                    listToppingValid.splice(indexToRemove, 1);
                }
                // Mengurangi bayaran jika uncheck
                keranjangBelanja.totalPrice -= 1;

            }

            totalPriceElemen.innerHTML = "$" +  keranjangBelanja.totalPrice;
        })
    });

    document.querySelectorAll('.two-dollars > input').forEach((listTopping, index) => {
        listTopping.addEventListener("change", () => {

            if (listTopping.checked) {

                // Menambah list Topping ke variable topping
                listToppingValid.push(listTopping.value);

                // Menambahkan angka ke harga saat ini
                keranjangBelanja.totalPrice += 2;

            } else {

                // Jika user uncheck maka hapus dari array
                const indexToRemove = listToppingValid.indexOf(listTopping.value);
                if (indexToRemove !== -1) {
                    listToppingValid.splice(indexToRemove, 1);
                }
                // Mengurangi bayaran jika uncheck
                keranjangBelanja.totalPrice -= 2;
                
            }

            totalPriceElemen.innerHTML = "$" +  keranjangBelanja.totalPrice;

        })
    });

    document.querySelectorAll('.three-dollars > input').forEach((listTopping, index) => {
        listTopping.addEventListener("change", () => {

            if (listTopping.checked) {

                // Menambah list Topping ke variable topping
                listToppingValid.push(listTopping.value);

                // Menambahkan angka ke harga saat ini
                keranjangBelanja.totalPrice += 3;

            } else {

                // Jika user uncheck maka hapus dari array
                const indexToRemove = listToppingValid.indexOf(listTopping.value);
                if (indexToRemove !== -1) {
                    listToppingValid.splice(indexToRemove, 1);
                }
                // Mengurangi bayaran jika uncheck
                keranjangBelanja.totalPrice -= 3;
                
            }

            totalPriceElemen.innerHTML = "$" +  keranjangBelanja.totalPrice;
        })
        
    });

    // keranjangBelanja['totalPrice'] = itemPrice;

    keranjangBelanjaFix.push(keranjangBelanja);

    listToppingValid.length = 0;

    const tambahCart = document.querySelector(".addCart");

    tambahCart.addEventListener("click", () => {
            if (popUp.style.display === "flex") {
                popUp.style.display = "none";
                tampilCart();
            }
        }
    );

    uncheckAllCheckboxesInCategory('.one-dollars')
    uncheckAllCheckboxesInCategory('.two-dollars')
    uncheckAllCheckboxesInCategory('.three-dollars')

}

function uncheckAllCheckboxesInCategory(categorySelector) {
    const checkboxes = document.querySelectorAll(categorySelector + ' input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

// Fungsi Tampil Cart
function tampilCart(){
    let tampilHTML = '';
    const itemCartHTML = document.querySelector(".cart-fix");
    const notYet = document.querySelector(".container-kanan > .cart-fix p");
    const notYet2 = document.querySelector(".container-kanan .cart-fix");

    notYet.style.display = "none";
    notYet2.style.margin = "0";
    notYet2.style.textAlign = "left";

    // Mendapatkan elemen terakhir dari array
    const objKeranjang = keranjangBelanjaFix[keranjangBelanjaFix.length - 1];

    console.log(objKeranjang)

    // tambah cart qunatity
    cartQuantity += 1;

    const cartQuantityHTML = document.querySelector(".quantity");
    let content = window.getComputedStyle(cartQuantityHTML, "::after").getPropertyValue("content");

    // Gabungkan content dengan cartQuantity
    content = `${cartQuantity}`;


    // Jika tolling terlalu panjang, ringkas dengan ...
    let panjangTopping = [];

    if (objKeranjang.listToppingValid.length == 0) {

        panjangTopping.push('Without Topping');

    } else if (objKeranjang.listToppingValid.length < 5){

        panjangTopping.push(objKeranjang.listToppingValid);

    } else if (objKeranjang.listToppingValid.length > 3) {

        for(let i = 0; i < 3; i++){

            let jikaMaxText = objKeranjang.listToppingValid[i];
            panjangTopping.push(jikaMaxText)
        }
        panjangTopping.push('etc..');

    }


    // Setel kembali ke HTML
    cartQuantityHTML.innerHTML = content

        tampilHTML += `<div class="item-cart">
                        <div class="images">
                            <img src="${objKeranjang.images}" alt="">
                        </div>
                        <div class="deskripsi">
                            <h5>${objKeranjang.title}</h5>
                            <p>${panjangTopping}</p>
                            <p>$${objKeranjang.totalPrice}</p>
                        </div>
                    </div>`
    
    itemCartHTML.innerHTML += tampilHTML;

    panjangTopping = [];

    totalPrice();

}

let totalPriceFix = 0;

// Hitung total Keseluruhan
function totalPrice(){

    const arrayLength = keranjangBelanjaFix.length;


    keranjangBelanjaFix.forEach((values,index) => {
        let eachPrice = values.totalPrice;

        if (index === arrayLength - 1) {
            totalPriceFix += eachPrice;
        }
    });

    const elemenPrice = document.querySelector(".total-price-fix > span");

    elemenPrice.innerHTML = totalPriceFix;

}

// Fungis tombol cart
const logoCartButton = document.querySelector(".cart");

let tombol = true;

logoCartButton.addEventListener("click", () => {
    
    const containerKananHtml = document.querySelector(".container-kanan");

    if (tombol){

        containerKananHtml.style.display = "flex";
        tombol = false;

    } else {

        containerKananHtml.style.display = "none";
        tombol = true;
    }

});
  

// if(lebarLayar > 800px){

// }