// templates.js

export function homeTemplate() {
  return `
    <section class="hero animate-in">
      <h1>Bem-vindo à ONG Renova</h1>
      <p>Oferecemos apoio a famílias carentes, alfabetização, oficinas e ações que promovem recomeço.</p>
      <a href="#" class="cta" data-page="projetos">Conheça nossos projetos</a>
    </section>

    <section class="animate-in">
      <h2>Nossos Serviços</h2>
      <ul class="services-list">
        <li>Alfabetização e aulas de reforço</li>
        <li>Apoio a mulheres agredidas (advogados e psicólogos)</li>
        <li>Doações para recomeço</li>
        <li>Oficinas de artesanato para profissionalização</li>
      </ul>
    </section>

    <section class="animate-in">
      <h2>Contato</h2>
      <p>Telefone: (62) 98484-7171</p>
      <p>Email: <a href="mailto:contato@ongrenova.org">contato@ongrenova.org</a></p>
    </section>
  `;
}

export function projetosTemplate() {
  return `
    <h1 class="animate-in">Projetos Sociais</h1>

    <section class="projects-grid">
      <article class="card animate-in">
        <h2>Voluntariado</h2>
        <p>Descubra como participar dos nossos projetos e ajudar a transformar vidas.</p>
        <img class="projeto-img" src="imagens/projeto1.jpg" alt="Projeto de Voluntariado">
      </article>

      <article class="card animate-in">
        <h2>Doações</h2>
        <p>Contribua com nossas ações e faça a diferença na vida das famílias.</p>
        <img class="projeto-img" src="imagens/projeto2.jpg" alt="Projeto de Doações">
      </article>

      <article class="card animate-in">
        <h2>Oficinas de Artesanato</h2>
        <p>Aprenda e ajude a profissionalizar pessoas da comunidade.</p>
        <img class="projeto-img" src="imagens/projeto3.jpg" alt="Oficinas de Artesanato">
      </article>
    </section>

    <section class="animate-in">
      <h2>Inscrições Recebidas</h2>
      <div id="submissionsList"></div>
    </section>
  `;
}

export function cadastroTemplate() {
  return `
    <h1 class="animate-in">Cadastro de Voluntário</h1>

    <form id="cadastroForm" novalidate class="animate-in">
      <label>Nome Completo
        <input type="text" id="nome" name="nome" required>
      </label>

      <label>E-mail
        <input type="email" id="email" name="email" required>
      </label>

      <label>CPF
        <input type="text" id="cpf" name="cpf" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" required>
      </label>

      <label>Telefone
        <input type="tel" id="telefone" name="telefone" pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}" placeholder="(00) 00000-0000" required>
      </label>

      <label>Data de Nascimento
        <input type="date" id="nascimento" name="nascimento" required>
      </label>

      <label>Endereço
        <input type="text" id="endereco" name="endereco" required>
      </label>

      <label>CEP
        <input type="text" id="cep" name="cep" pattern="\\d{5}-\\d{3}" placeholder="00000-000" required>
      </label>

      <label>Cidade
        <input type="text" id="cidade" name="cidade" required>
      </label>

      <label>Estado
        <input type="text" id="estado" name="estado" required>
      </label>

      <button type="submit" class="btn-primary">Cadastrar</button>
    </form>

    <div id="formMessage" class="animate-in" aria-live="polite"></div>

    <section class="animate-in">
      <h2>Últimas Inscrições</h2>
      <div id="submissionsList"></div>
    </section>
  `;
}
