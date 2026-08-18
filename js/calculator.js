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

  // Official Menuvem Plan Base Monthly Prices
  const basePrices = {
    secreto: 100,
    bronze: 167,
    prata: 227,
    ouro: 267
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

    // Dynamic TCG Card Highlight
    const tcgCards = document.querySelectorAll('.tcg-card');
    tcgCards.forEach(c => c.classList.remove('recommended'));

    let recommendedCardId = 'plan-prata';
    if (revenue <= 5000) {
      recommendedCardId = 'plan-secreto';
    } else if (revenue <= 15000) {
      recommendedCardId = 'plan-bronze';
    } else if (revenue <= 35000) {
      recommendedCardId = 'plan-prata';
    } else {
      recommendedCardId = 'plan-ouro';
    }

    const recCard = document.getElementById(recommendedCardId);
    if (recCard) {
      recCard.classList.add('recommended');
    }

    // Update Prices based on Billing Cycle
    const multiplier = isAnnual ? 0.8 : 1.0; // 20% discount on Annual

    const elSecreto = document.getElementById('price-secreto');
    const elBronze = document.getElementById('price-bronze');
    const elPrata = document.getElementById('price-prata');
    const elOuro = document.getElementById('price-ouro');

    if (elSecreto) elSecreto.textContent = Math.round(basePrices.secreto * multiplier);
    if (elBronze) elBronze.textContent = Math.round(basePrices.bronze * multiplier);
    if (elPrata) elPrata.textContent = Math.round(basePrices.prata * multiplier);
    if (elOuro) elOuro.textContent = Math.round(basePrices.ouro * multiplier);

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

