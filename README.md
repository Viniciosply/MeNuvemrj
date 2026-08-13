# 🚀 Menuvem RJ - Cardápio Digital & Plataforma de Vendas (Rio de Janeiro)

Plataforma web oficial do **Menuvem RJ** projetada para restaurantes, lanchonetes, hamburguerias e quiosques no Estado do Rio de Janeiro.

---

## 💻 Estrutura dos Arquivos (Static & Web Ready)
O projeto foi totalmente otimizado com caminhos relativos para hospedagem direta e imediata no **GitHub Pages**:

```
menuvem-rj/
├── index.html            # Página principal semântica (SEO + Open Graph RJ)
├── .nojekyll             # Garante carregamento estático rápido no GitHub Pages
├── README.md             # Instruções do repositório
├── css/
│   ├── design-system.css # Design system carioca (Dark mode + Glassmorphism)
│   ├── header-hero.css   # Header fixo, logo Menuvem.RJ e Hero
│   ├── calculator-plans.css # Calculadora de faturamento e comparador de taxas
│   ├── features-fator.css   # Grid de soluções e Fator Carioca
│   └── modals-toasts.css    # Modais, botão WhatsApp FAB e prova social
├── js/
│   ├── main.js           # Scroll reveal, menu mobile e FAQ sanfonado
│   ├── calculator.js     # Lógica do slider de economia contra comissões
│   └── social-proof.js   # Toasts automáticos de lojas cadastradas no RJ
└── img/
    └── hero-mockup.png   # Visual do painel e cardápio mobile
```

---

## 🛠️ Como Hospedar no GitHub Pages

### Passo 1: Inicializar o repositório Git
No seu terminal (dentro da pasta do projeto):
```bash
git init
git add .
git commit -m "Initial commit - Menuvem RJ Website"
```

### Passo 2: Vincular ao repositório do GitHub
Crie um novo repositório no seu GitHub (ex: `menuvem-rj`) e execute:
```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/menuvem-rj.git
git push -u origin main
```

### Passo 3: Ativar o GitHub Pages
1. Vá nas **Settings** do seu repositório no GitHub.
2. Na barra lateral esquerda, clique em **Pages**.
3. Em **Build and deployment > Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**.

Em poucos segundos, o site estará no ar na URL:
`https://SEU_USUARIO.github.io/menuvem-rj/`

*(Caso utilize um domínio próprio como `menuvemrj.com.br`, basta configurá-lo na mesma seção de Custom Domain do GitHub Pages!)*
