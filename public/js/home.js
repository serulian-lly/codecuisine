const cartContainer = document.getElementById("cart-container");
const toggleCartButton = document.getElementById("toggle-cart-button");
const cartItemsList = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const couponInput = document.getElementById("coupon-input");
const applyCouponButton = document.getElementById("apply-coupon-button");
const checkoutgarcom = document.getElementById("garçom");
const buyAgainButton = document.getElementById("buy-again");
const removeItemButton = document.getElementById("remove-item");

let cartItems = [];
let total = 0;
    
    // subtotal
    function updateSubtotal() {
        total = cartItems.reduce((acc, item) => acc + item.price, 0);
        subtotalElement.textContent = total.toFixed(2);
    }
    
    // adicionar item carrinho
    function addItemToCart(item) {
        cartItems.push(item);
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)}`;
        
        // Crie um botão "Remover Item" para cada item no carrinho
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover Item";
        removeButton.classList.add("remove-item-button");
        
        // Adicione um manipulador de eventos para o botão "Remover Item"
        removeButton.addEventListener("click", () => {
            removeItemFromCart(item);
        });
        
        cartItem.appendChild(removeButton); // Adicione o botão "Remover Item" ao item no carrinho
        
        cartItemsList.appendChild(cartItem);
        updateSubtotal();
    }
    
    // remover item do carrinho
    function removeItemFromCart(item) {
        const itemIndex = cartItems.indexOf(item);
        if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1); // Remove o item do array
            renderCartItems();
            updateSubtotal();
        }
    }
    
    // Função para renderizar todos os itens do carrinho
    function renderCartItems() {
        cartItemsList.innerHTML = "";
    
        cartItems.forEach(function (item) {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover Item";
            removeButton.classList.add("remove-item-button");
            
            removeButton.addEventListener("click", () => {
                removeItemFromCart(item);
            });
            
            cartItem.appendChild(removeButton);
            
            cartItemsList.appendChild(cartItem);
        });
    }
    
    // botão "Comprar Novamente"
    buyAgainButton.addEventListener("click", () => {
        // reiniciar o carrinho
        cartItems = []; // Limpar o array 
        cartItemsList.innerHTML = ""; // Remover os itens da lista
        updateSubtotal(); // zera o subtotal
    
        // Limpar mensagens de cupom e de conclusão
        const couponMessage = document.getElementById("coupon-message");
        const finishMessage = document.getElementById("finish-message");
        couponMessage.textContent = "";
        finishMessage.textContent = "";
    });
    
    const mostrarImagemButton = document.getElementById("mostrar-imagem");
    const imagem = document.getElementById("imagem");

    mostrarImagemButton.addEventListener("click", () => {
        if (imagem.style.display === "none") {
            imagem.style.display = "block"; // Mostra a imagem
        } else {
            imagem.style.display = "none"; // Oculta a imagem
        }
        setTimeout(() => {
            const finishMessage = document.getElementById("finish-message");
            finishMessage.textContent = `O Garçom chegará em tempo estimado de 15 minutos com seu prato`;
        }, 4500); // 45 minutos (45000 ms)
    });
        
    
    checkoutgarcom.addEventListener("click", () => {
        // Exemplo: Simulação de tempo estimado para o pedido ficar pronto
        setTimeout(() => {
            const finishMessage = document.getElementById("finish-message");
            finishMessage.textContent = `O Garçom chegará em tempo estimado de 5 minutos com a máquina de Débito ou Crédito`;
        }, 450); // 45 minutos (45000 ms)
    });
    
    // Evento de clique no botão para abrir/fechar o carrinho
    toggleCartButton.addEventListener("click", () => {
        if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
            cartContainer.style.display = "block";
        } else {
            cartContainer.style.display = "none";
        }
    });
    
    
    const cupons = [
        { code: "DESCONTO10", discount: 0.1 }, // 10% de desconto
        { code: "DESCONTO25", discount: 0.25 }, 
        { code: "DESCONTO30", discount: 0.30 },
    ];
    
    // Função para aplicar um cupom de desconto
    let couponApplied = false; // Variável de controle para verificar se o cupom já foi aplicado
    
function applyCoupon(couponCode) {
    if (couponApplied) {
        return; // Se o cupom já foi aplicado, saia da função
    }

    const coupon = cupons.find((c) => c.code === couponCode);
    const couponMessage = document.getElementById("coupon-message");

    if (coupon) {
        // Aplicar o desconto ao subtotal
        total *= 1 - coupon.discount;
        subtotalElement.textContent = total.toFixed(2);

        // Exibir mensagem de cupom aplicado
        couponMessage.textContent = `Cupom ${couponCode} aplicado com sucesso!`;
        couponMessage.classList.remove("error"); // Remover classe de erro, se houver

        couponApplied = true; // Defina a variável de controle como true para indicar que o cupom foi aplicado
    } else {
        // Exibir mensagem de cupom inválido
        couponMessage.textContent = "Cupom inválido. Verifique o código e tente novamente.";
        couponMessage.classList.add("error"); // Adicionar classe de erro
    }
}
    
    
    // Evento de clique no botão "Aplicar Cupom"
    applyCouponButton.addEventListener("click", () => {
        const couponCode = couponInput.value;
        // Chame a função applyCoupon com o código do cupom
        applyCoupon(couponCode);
    });
    
    // Evento de clique no botão "Comprar" na página inicial
    const buyButtons = document.querySelectorAll(".buy-button");
    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Coleta os detalhes do item com base na estrutura do seu HTML
            const menuItem = button.closest("li"); // Encontra o elemento <li> mais próximo
            const itemName = menuItem.querySelector("h3").textContent;
            const itemPrice = parseFloat(menuItem.querySelector("p").textContent.split("R$ ")[1]);
    
            // Crie um objeto de item
            const item = {
                name: itemName,
                price: itemPrice,
            };
    
            // Adicione o item ao carrinho
            addItemToCart(item);
        });
    });