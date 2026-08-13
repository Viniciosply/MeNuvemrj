/* ==========================================================================
   Menuvem.RJ - Live Interactive Smartphone Menu Simulator Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('phone-menu-items');
  const catChips = document.querySelectorAll('.phone-cat-chip');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('btn-phone-checkout');

  if (!menuContainer) return;

  // Carioca Inspired Products
  const products = [
    {
      id: 1,
      category: 'lanches',
      name: 'Podrão Carioca Completo',
      desc: 'Hambúrguer duplo, bacon, presunto, ovo, milho, batata palha, molho verde e queijo derretido.',
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      category: 'lanches',
      name: 'Galeto Copacabana (Porção)',
      desc: 'Galeto assado na brasa, acompanhado de farofa temperada, vinagrete e batata frita crocante.',
      price: 38.90,
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      category: 'acai',
      name: 'Açaí do Arpoador 500ml',
      desc: 'Açaí cremoso com leite em pó, banana fatiada, morango, granola crocante e leite condensado.',
      price: 18.90,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      category: 'pizzas',
      name: 'Pizza Carioca (Grande 8 Fatias)',
      desc: 'Mussarela premium, presunto especial, ovos de granja, cebola roxa, azeitonas pretas e orégano.',
      price: 46.00,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 5,
      category: 'bebidas',
      name: 'Guaraná Antarctica 2L (Gelado)',
      desc: 'Garrafa 2 Litros estalando de gelada.',
      price: 11.00,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80'
    }
  ];

  let cart = [];
  let activeCategory = 'lanches';

  function formatBRL(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  function renderMenuItems(cat) {
    menuContainer.innerHTML = '';
    const filtered = cat === 'todos' ? products : products.filter(p => p.category === cat);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.innerHTML = `
        <div class="menu-item-img" style="background-image: url('${item.image}')"></div>
        <div class="menu-item-details">
          <h5>${item.name}</h5>
          <p>${item.desc}</p>
          <div class="menu-item-price">${formatBRL(item.price)}</div>
        </div>
        <button class="btn-add-item" data-id="${item.id}">+ Add</button>
      `;
      menuContainer.appendChild(card);
    });

    // Attach click events to Add buttons
    const addBtns = menuContainer.querySelectorAll('.btn-add-item');
    addBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = parseInt(btn.getAttribute('data-id'), 10);
        addToCart(pId);
      });
    });
  }

  function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    cart.push(item);
    updateCartUI();
  }

  function updateCartUI() {
    const totalCount = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    if (cartCountEl) cartCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;
    if (cartTotalEl) cartTotalEl.textContent = formatBRL(totalPrice);
  }

  // Category Filter clicks
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-cat');
      renderMenuItems(cat);
    });
  });

  // Simulated Checkout Click
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('👉 Adicione pelo menos 1 item delicioso do cardápio para simular a compra!');
        return;
      }

      const total = cart.reduce((sum, i) => sum + i.price, 0);
      alert(`🎉 Demonstração de Pedido Enviada com Sucesso!\n\nNo Menuvem.RJ, o pedido do seu cliente é enviado formatado diretamente para o seu WhatsApp com total de ${formatBRL(total)} e sem cobrar nenhuma comissão!`);
    });
  }

  // Initial render
  renderMenuItems('lanches');
});
