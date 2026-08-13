/* ==========================================================================
   SOCIAL PROOF TOASTS LOGIC - MENU VEM RJ
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const socialEvents = [
    { name: "Hamburgueria Arpoador", city: "Ipanema, RJ", action: "economizou R$ 2.450 este mês", time: "há 3 minutos" },
    { name: "Pizzeria Don Corleone", city: "Niterói, RJ", action: "ativou o bônus de 30 dias grátis", time: "há 7 minutos" },
    { name: "Sushi Rio Barra", city: "Barra da Tijuca, RJ", action: "acaba de cadastrar seu cardápio", time: "há 12 minutos" },
    { name: "Quiosque Sol & Mar", city: "Copacabana, RJ", action: "economizou R$ 1.890 em comissões", time: "há 18 minutos" },
    { name: "Bistrô da Serra", city: "Petrópolis, RJ", action: "migrou 100% dos pedidos para o Menuvem", time: "há 24 minutos" },
    { name: "Açaí Carioca", city: "Madureira, RJ", action: "ativou impressora automática de comandas", time: "há 35 minutos" },
    { name: "Cantina da Baixada", city: "Nova Iguaçu, RJ", action: "economizou R$ 3.100 no último mês", time: "há 42 minutos" }
  ];

  let eventIndex = 0;

  function showNextToast() {
    const data = socialEvents[eventIndex];
    eventIndex = (eventIndex + 1) % socialEvents.length;

    const toast = document.createElement('div');
    toast.className = 'social-toast';
    toast.innerHTML = `
      <div class="toast-avatar">RJ</div>
      <div>
        <div class="toast-text"><strong>${data.name}</strong> (${data.city}) ${data.action}</div>
        <div class="toast-time">${data.time}</div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Auto dismiss after 6s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 6000);
  }

  // Show first toast after 4s, then loop every 12s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 12000);
  }, 4000);
});
