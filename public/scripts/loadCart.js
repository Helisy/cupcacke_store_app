const cart_items_container = document.querySelector(".cart_items");
const cart_num = document.querySelector("#cart_toggle > label");
async function loadCart(){

    const cart_items = localStorage.getItem("cart_items");
    var newCart = JSON.parse(cart_items);

    if(!newCart){
        cart_items_container.innerHTML = "";
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

    cart_num.innerHTML = items.length;
    cart_items_container.innerHTML = newHtml;
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
