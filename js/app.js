// app.js
import { homeTemplate, projetosTemplate, cadastroTemplate } from './templates.js';
import { setupFormValidation, renderSubmissionsList } from './formValidation.js';

const main = document.querySelector('main');
const navLinks = document.querySelectorAll('nav a');
const btnHamburguer = document.getElementById('btn-hamburguer');
const navMain = document.getElementById('main-nav');

function animateMain() {
  const items = main.querySelectorAll('.animate-in');
  items.forEach((el, i) => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 80 * i);
  });
}

function loadPage(page) {
  if (!main) return;
  if (page === 'home') {
    main.innerHTML = homeTemplate();
  } else if (page === 'projetos') {
    main.innerHTML = projetosTemplate();
  } else if (page === 'cadastro') {
    main.innerHTML = cadastroTemplate();
  } else {
    main.innerHTML = '<h2>Página não encontrada</h2>';
  }

  // anima entrada do conteúdo
  animateMain();

  // ativa validação se for página cadastro
  if (page === 'cadastro') {
    setupFormValidation();
    // renderiza lista de inscrições salvas
    renderSubmissionsList();
  }

  // se for projetos, também pode mostrar lista de inscritos (opcional)
  if (page === 'projetos') {
    renderSubmissionsList();
  }

  // atualiza estado ativo do menu
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === page) link.classList.add('active');
    else link.classList.remove('active');
  });

  // fecha menu mobile ao navegar
  if (navMain && navMain.style.display === 'block') {
    navMain.style.display = 'none';
    if (btnHamburguer) btnHamburguer.setAttribute('aria-expanded', 'false');
  }
}

// navegação: clique nos links do menu
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  });
});

// hamburguer toggle (mobile)
if (btnHamburguer && navMain) {
  btnHamburguer.addEventListener('click', () => {
    const isVisible = navMain.style.display === 'block';
    navMain.style.display = isVisible ? 'none' : 'block';
    btnHamburguer.setAttribute('aria-expanded', String(!isVisible));
  });
}

// Fecha menu hamburguer ao pressionar ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (btnHamburguer.getAttribute('aria-expanded') === 'true') {
      navMain.style.display = 'none';
      btnHamburguer.setAttribute('aria-expanded', 'false');
      btnHamburguer.focus();
    }
  }
});

// inicial: carrega a home
window.addEventListener('DOMContentLoaded', () => {
  loadPage('home');
});

// Expõe loadPage globalmente caso queira navegar por script/CTA
window.renovaLoadPage = loadPage;
