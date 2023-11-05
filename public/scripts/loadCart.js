const cart_items_container = document.querySelector(".cart_items");
const cart_num = document.querySelector("#cart_toggle > label");
async function loadCart(){

    const cart_items = localStorage.getItem("cart_items");
    var newCart = JSON.parse(cart_items);

    var float_cart_vlr = 0;

    if(!newCart){
        cart_items_container.innerHTML = "";
        cart_price.innerHTML = formatter.format(0);
        cart_num.innerHTML = 0;
        return
    }

    if(newCart.length < 1){
        cart_items_container.innerHTML = "";
        cart_price.innerHTML = formatter.format(0);
        cart_num.innerHTML = 0;
        return
    }

    var items = [];

    for (let i = 0; i < newCart.length; i++) {
        var cupcake = await fetchInfo(`/api/v1/cupcake/${newCart[i].product_id}`);
        cupcake.data.item_quantity = newCart[i].quantity;
        items.push(cupcake.data);
    }

   

    var newHtml = "";
    for (let i = 0; i < items.length; i++) {
        float_cart_vlr += items[i].selling_price * items[i].item_quantity;
        newHtml += 
        `<div class="cart_item">
            <img src="${items[i].cover_image}" alt="">
            <div>
                <h4>${items[i].name}</h4>
                <div>
                    <h3>${formatter.format(items[i].selling_price * items[i].item_quantity)}</h3> <h3>${items[i].item_quantity} un</h3>
                </div>
            </div>
        </div>`
    }

    cart_price.innerHTML = formatter.format(float_cart_vlr);
    cart_num.innerHTML = items.length;
    cart_items_container.innerHTML = newHtml;
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
