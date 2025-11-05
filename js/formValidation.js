// formValidation.js

// nome da chave no localStorage
const STORAGE_KEY = 'renova_submissions_v1';

function showToast(msg = '', duration = 3000) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=> t.classList.add('show'));
  setTimeout(()=> {
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 300);
  }, duration);
}

function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSubmission(obj) {
  const arr = getSubmissions();
  arr.unshift(obj); // coloca no começo
  // mantém só últimos 20
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, 20)));
}

export function renderSubmissionsList() {
  const container = document.getElementById('submissionsList');
  if (!container) return;
  const arr = getSubmissions();
  if (arr.length === 0) {
    container.innerHTML = '<p>Nenhuma inscrição ainda.</p>';
    return;
  }

  container.innerHTML = arr.map(s => `
    <div class="card" style="margin-bottom:10px;">
      <strong>${escapeHtml(s.nome)}</strong> — ${escapeHtml(s.cidade || '')} <br/>
      <small>${escapeHtml(s.email)}</small>
    </div>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validateForm() {
  const form = document.getElementById('cadastroForm');
  const messageDiv = document.getElementById('formMessage');
  if (!form) return false;
  if (messageDiv) messageDiv.textContent = '';

  // validação nativa
  if (!form.checkValidity()) {
    Array.from(form.elements).forEach(el => {
      if (el.checkValidity && !el.checkValidity()) {
        el.classList.add('input-error');
        setTimeout(()=> el.classList.remove('input-error'), 2500);
      }
    });
    showToast('Por favor, preencha os campos corretamente', 3000);
    if (messageDiv) {
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Existem campos inválidos. Verifique e tente novamente.';
    }
    return false;
  }

  // validações custom (formatos)
  const cpf = form.querySelector('input[name="cpf"]').value.trim();
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfRegex.test(cpf)) {
    showToast('CPF inválido. Use o formato 000.000.000-00', 3000);
    if (messageDiv) { messageDiv.style.color = 'red'; messageDiv.textContent = 'CPF inválido.'; }
    return false;
  }

  const telefone = form.querySelector('input[name="telefone"]').value.trim();
  const telRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (!telRegex.test(telefone)) {
    showToast('Telefone inválido. Use o formato (00) 00000-0000', 3000);
    if (messageDiv) { messageDiv.style.color = 'red'; messageDiv.textContent = 'Telefone inválido.'; }
    return false;
  }

  const cep = form.querySelector('input[name="cep"]').value.trim();
  const cepRegex = /^\d{5}-\d{3}$/;
  if (!cepRegex.test(cep)) {
    showToast('CEP inválido. Use o formato 00000-000', 3000);
    if (messageDiv) { messageDiv.style.color = 'red'; messageDiv.textContent = 'CEP inválido.'; }
    return false;
  }

  // tudo ok: salva em localStorage
  const submission = {
    nome: form.querySelector('input[name="nome"]').value.trim(),
    email: form.querySelector('input[name="email"]').value.trim(),
    cpf,
    telefone,
    nascimento: form.querySelector('input[name="nascimento"]').value,
    endereco: form.querySelector('input[name="endereco"]').value.trim(),
    cep,
    cidade: form.querySelector('input[name="cidade"]').value.trim(),
    estado: form.querySelector('input[name="estado"]').value.trim(),
    when: new Date().toISOString()
  };

  saveSubmission(submission);
  renderSubmissionsList();
  showToast('Cadastro salvo (simulado) com sucesso!', 3000);
  form.reset();
  if (messageDiv) { messageDiv.style.color = 'green'; messageDiv.textContent = 'Cadastro salvo com sucesso.'; }
  return true;
}

export function setupFormValidation() {
  const form = document.getElementById('cadastroForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
  });
}
