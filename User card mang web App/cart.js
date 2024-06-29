document.addEventListener('DOMContentLoaded', () => {
    const cartCardsContainer = document.getElementById('cart-cards-container');
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartCards() {
        cartCardsContainer.innerHTML = '';
        cart.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <button onclick="removeFromCart(${user.id})">Delete</button>
            `;
            cartCardsContainer.appendChild(card);
        });
    }

    window.removeFromCart = function(id) {
        const index = cart.findIndex(user => user.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartCards();
            alert('User removed from cart');
        }
    }
    

    renderCartCards();
});
