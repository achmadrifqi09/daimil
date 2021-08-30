const toggleMenu = document.querySelector('.nav .toggle-menu');
const nav = document.querySelector('.nav .navbar-nav');

toggleMenu.addEventListener('click', function () {
    nav.classList.toggle('show');
});



let message = 'https://wa.me/6282233439515?text=Permisi%20min%20saya%20mau%20pesan:%0A'
let product = [];
let priceArr = [];
let flavour = [];
let piecesArr = [];
let idProducts = [];
let ulList = document.getElementById('cart-list');




function addCart(piecesId, descId, productId, name, price, btnId) {

    let pieces = document.getElementById(piecesId).value;
    let desc = document.getElementById(descId).value;
    if (pieces == '') {
        alert('Order tidak valid, harap masukkan jumlah pesanan.');
    } else if (desc == '') {
        alert('Order tidak valid, harap masukkan deskripsi varian rasa.');
    } else {
        let varConfirm = confirm('Yakin mau dimasukin ke keranjang ?');
        if (varConfirm == true) {

            product.push(name);
            piecesArr.push(pieces);
            priceArr.push(price * pieces);
            flavour.push(desc);
            idProducts.push(productId);
            const el = document.createElement('li');
            el.setAttribute('id', 'coba')
            const elMarkup = `
                        <div class="card">
                            <div class="item">
                                <p id="product_name">Produk : ${name}</p>
                                <p>Varian rasa : ${desc}</p>
                                <p>Jumlah : ${pieces} pcs</p>
                                <p>Subharga : ${price*pieces}</p>
                            </div>
                            <button class="btn-cancel" id="${productId}" onClick="removeItem(this, this.id)">Batal</button>
                        </div>`;
            el.innerHTML = elMarkup;
            ulList.appendChild(el);
            checkCart();
            document.getElementById(btnId).innerText = "Dipilih";
            document.getElementById(btnId).style.background = '#FF0000';
            document.getElementById(btnId).disabled = true;
            document.getElementById(piecesId).value = '';
            document.getElementById(descId).value = '';
        } else {
            document.getElementById(piecesId).value = '';
            document.getElementById(descId).value = '';
        }
    }
}

function checkCart() {
    console.table(product);
    if (Array.isArray(product) && product.length) {
        if (product.length == 1) {
            let noCart = document.getElementById('no-item');
            noCart.classList.toggle('thereIs');
            let orderAtt = document.getElementById('order-attribute');
            orderAtt.classList.toggle('valid');
        }


    } else {
        let noCart = document.getElementById('no-item');
        noCart.classList.remove('thereIs');
        let orderAtt = document.getElementById('order-attribute');
        orderAtt.classList.remove('valid');
    }
}

function removeItem(el, productId) {

    document.getElementById(productId).innerText = "Masukkan Keranjang";
    document.getElementById(productId).style.background = '#FFD31D';
    document.getElementById(productId).disabled = false;

    let index = idProducts.indexOf(productId);

    if (index > -1) {
        product.splice(index, 1);
        priceArr.splice(index, 1);
        flavour.splice(index, 1);
        piecesArr.splice(index, 1);
        idProducts.splice(index, 1);
    }

    el.parentElement.remove();
    checkCart();
}

function order() {
    if (Array.isArray(product) && product.length) {


        let btnOrder = document.getElementById('checkout');
        let getSelectedValue = document.querySelector(
            'input[name="ewallet"]:checked');

        let address = document.getElementById('address').value;


        if (getSelectedValue == null && address == '') {
            alert('Harap masukkan alamat dan metode pembayaran yang sesuai.')
        } else if (address == '') {
            alert('Harap masukkan alamat yang sesuai.')
        } else if (getSelectedValue == null) {
            alert('Harap masukkan metode pembayaran yang sesuai.')
        } else if (payment != null && address != '') {

            let payment = getSelectedValue.value;
            for (let i = 0; i < product.length; i++) {
                message += "- " + product[i] + " [" + "Jumlah :" + piecesArr[i] + ", " + "Varian rasa :" + flavour[i] + "]" + "%0A"
            }
            let priceResult = 0;
            for (let x = 0; x < priceArr.length; x++) {
                priceResult += priceArr[x];
            }
            message = message + "%0ATotal harga : " + priceResult + "%0A" + "Alamat pengiriman : " + address + "%0AMetode Pembayaran : " + payment;
            btnOrder.href = message;
            setTimeout(reloadPage, 5000)
        }


    } else {
        let cfm = confirm('Maaf keranjang anda kosong, mau belanja ?');
        console.log(cfm);
        if (cfm == true) {
            let btnOrder = document.getElementById('checkout');
            btnOrder.href = "#products";
        }
    }
}

function reloadPage() {
    location.reload();
}