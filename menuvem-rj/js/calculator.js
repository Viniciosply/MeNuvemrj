/* ==========================================================================
   Menuvem.RJ - Revenue & Plan Calculator Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('faturamento-slider');
  const displayVal = document.getElementById('faturamento-val');
  const toggleMensal = document.getElementById('toggle-mensal');
  const toggleAnual = document.getElementById('toggle-anual');
  
  if (!slider || !displayVal) return;

  let isAnnual = false;

  // Base Monthly Plan Prices
  const basePrices = {
    bronze: 147,
    prata: 197,
    ouro: 297,
    vip: 497
  };

  function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  }

  function updateCalculator() {
    const revenue = parseInt(slider.value, 10);
    displayVal.textContent = formatBRL(revenue);

    // Dynamic Plan Highlight
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(c => c.classList.remove('recommended'));

    let recommendedCardId = 'plan-prata';
    if (revenue <= 8000) {
      recommendedCardId = 'plan-bronze';
    } else if (revenue <= 25000) {
      recommendedCardId = 'plan-prata';
    } else if (revenue <= 45000) {
      recommendedCardId = 'plan-ouro';
    } else {
      recommendedCardId = 'plan-vip';
    }

    const recCard = document.getElementById(recommendedCardId);
    if (recCard) {
      recCard.classList.add('recommended');
    }

    // Update Prices based on Billing Cycle
    const multiplier = isAnnual ? 0.8 : 1.0; // 20% discount on Annual

    document.getElementById('price-bronze').textContent = Math.round(basePrices.bronze * multiplier);
    document.getElementById('price-prata').textContent = Math.round(basePrices.prata * multiplier);
    document.getElementById('price-ouro').textContent = Math.round(basePrices.ouro * multiplier);
    document.getElementById('price-vip').textContent = Math.round(basePrices.vip * multiplier);

    // Calculate Savings vs iFood 12% commission
    const ifoodCommissionCost = revenue * 0.12;
    const menuvemCost = basePrices.prata;
    const monthlyEconomy = Math.max(0, ifoodCommissionCost - menuvemCost);

    const economyEl = document.getElementById('calc-economy-text');
    if (economyEl) {
      economyEl.innerHTML = `Economia estimada de <strong>${formatBRL(monthlyEconomy)}/mês</strong> em relação a taxas de aplicativos!`;
    }
  }

  slider.addEventListener('input', updateCalculator);

  if (toggleMensal && toggleAnual) {
    toggleMensal.addEventListener('click', () => {
      isAnnual = false;
      toggleMensal.classList.add('active');
      toggleAnual.classList.remove('active');
      updateCalculator();
    });

    toggleAnual.addEventListener('click', () => {
      isAnnual = true;
      toggleAnual.classList.add('active');
      toggleMensal.classList.remove('active');
      updateCalculator();
    });
  }

  // Initial calculation
  updateCalculator();
});
