/**
 * Trilha Devs — Login
 * Interações de Front-end da tela de login.
 *
 * IMPORTANTE — SIMULAÇÃO DE AUTENTICAÇÃO
 * Este projeto é uma interface de demonstração (UI/UX + Front-end).
 * Não existe Back-end, banco de dados nem autenticação real:
 * - as credenciais abaixo são PÚBLICAS e exibidas na própria tela;
 * - a "verificação" acontece apenas no navegador, para demonstrar o fluxo;
 * - nenhum dado digitado é enviado, salvo ou armazenado.
 * Em um sistema real, a senha nunca deve ser comparada no Front-end.
 */
(function () {
  "use strict";

  // Credenciais públicas da demonstração (não são dados de nenhum usuário real)
  const DEMO_CREDENTIALS = Object.freeze({
    email: "demo@trilhadevs.com",
    password: "123456",
  });

  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const SIMULATED_DELAY_MS = 900;
  const TOAST_DURATION_MS = 6000;

  // ---------- Elementos ----------
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const submitBtn = document.getElementById("submit-btn");
  const fillDemoBtn = document.getElementById("fill-demo");
  const createAccountBtn = document.getElementById("create-account");
  const forgotPasswordBtn = document.getElementById("forgot-password");
  const loginView = document.getElementById("login-view");
  const successView = document.getElementById("success-view");
  const successTitle = document.getElementById("success-title");
  const logoutBtn = document.getElementById("logout-btn");
  const toastRegion = document.getElementById("toast-region");

  // ---------- Regras de validação ----------
  const validators = {
    email(value) {
      if (!value) return "Informe seu e-mail.";
      if (!EMAIL_PATTERN.test(value)) return "Digite um e-mail válido, como nome@dominio.com.";
      return "";
    },
    password(value) {
      if (!value) return "Informe sua senha.";
      if (value.length < MIN_PASSWORD_LENGTH) {
        return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
      }
      return "";
    },
  };

  const getValue = (input) => (input.name === "email" ? input.value.trim() : input.value);

  /**
   * Valida um campo e atualiza o feedback visual e os atributos de acessibilidade.
   * @param {HTMLInputElement} input
   * @returns {boolean} true se o campo for válido
   */
  function validateField(input) {
    const message = validators[input.name](getValue(input));
    setFieldState(input, message);
    return !message;
  }

  /** Aplica (ou remove) o estado de erro de um campo. */
  function setFieldState(input, message) {
    const field = input.closest(".field");
    field.classList.toggle("is-invalid", Boolean(message));
    field.classList.toggle("is-valid", !message);
    input.setAttribute("aria-invalid", String(Boolean(message)));
    document.getElementById(`${input.id}-error`).textContent = message;
  }

  function resetField(input) {
    delete input.dataset.authError;
    input.closest(".field").classList.remove("is-invalid", "is-valid");
    input.removeAttribute("aria-invalid");
    document.getElementById(`${input.id}-error`).textContent = "";
  }

  // ---------- Toast (mensagens curtas e discretas) ----------
  const TOAST_ICONS = { info: "i", error: "!", success: "✓" };

  /**
   * Exibe uma notificação curta dentro da tela do app.
   * @param {{title: string, message: string, type?: "info"|"error"|"success"}} options
   */
  function showToast({ title, message, type = "info" }) {
    // Mantém apenas uma notificação por vez, para não poluir a tela
    toastRegion.querySelectorAll(".toast").forEach((toast) => toast.remove());

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon" aria-hidden="true">${TOAST_ICONS[type]}</span>
      <div class="toast__content">
        <p class="toast__title"></p>
        <p class="toast__message"></p>
      </div>
      <button type="button" class="toast__close" aria-label="Fechar mensagem">&times;</button>`;
    // textContent evita interpretar qualquer texto como HTML
    toast.querySelector(".toast__title").textContent = title;
    toast.querySelector(".toast__message").textContent = message;

    const close = () => {
      if (!toast.isConnected || toast.classList.contains("is-leaving")) return;
      toast.classList.add("is-leaving");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
      window.setTimeout(() => toast.remove(), 400); // garantia caso a animação esteja desativada
    };

    toast.querySelector(".toast__close").addEventListener("click", close);
    toastRegion.appendChild(toast);
    window.setTimeout(close, TOAST_DURATION_MS);
  }

  // ---------- Validação em tempo real ----------
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("blur", () => {
      // Não apaga a mensagem de "credenciais incorretas" só porque o campo perdeu o foco
      if (input.value && !input.dataset.authError) validateField(input);
    });

    input.addEventListener("input", () => {
      delete input.dataset.authError;
      const field = input.closest(".field");
      if (!input.value) {
        resetField(input);
      } else if (field.classList.contains("is-invalid") || field.classList.contains("is-valid")) {
        validateField(input);
      }
    });
  });

  // ---------- Preencher credenciais de demonstração ----------
  fillDemoBtn.addEventListener("click", () => {
    emailInput.value = DEMO_CREDENTIALS.email;
    passwordInput.value = DEMO_CREDENTIALS.password;
    validateField(emailInput);
    validateField(passwordInput);
    submitBtn.focus();
    showToast({
      type: "info",
      title: "Dados preenchidos",
      message: "Agora é só clicar em Entrar para testar o login de demonstração.",
    });
  });

  // ---------- Mostrar / ocultar senha ----------
  togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));
    togglePasswordBtn.setAttribute("aria-label", isHidden ? "Ocultar senha" : "Mostrar senha");
    passwordInput.focus();
  });

  // ---------- Login (SIMULADO) ----------
  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("is-loading", isLoading);
    submitBtn.querySelector(".btn-primary__label").textContent = isLoading ? "Entrando..." : "Entrar";
    if (isLoading) submitBtn.setAttribute("aria-busy", "true");
    else submitBtn.removeAttribute("aria-busy");
  }

  function shakeForm() {
    form.classList.remove("is-shaking");
    void form.offsetWidth; // reinicia a animação
    form.classList.add("is-shaking");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    const isEmailValid = validateField(emailInput);
    const isPasswordValid = validateField(passwordInput);

    if (!isEmailValid || !isPasswordValid) {
      (isEmailValid ? passwordInput : emailInput).focus();
      shakeForm();
      return;
    }

    setLoading(true);

    // Simula o tempo de resposta de um servidor (não há requisição de rede)
    window.setTimeout(() => {
      setLoading(false);

      const email = getValue(emailInput).toLowerCase();
      const isDemoUser =
        email === DEMO_CREDENTIALS.email && passwordInput.value === DEMO_CREDENTIALS.password;

      if (!isDemoUser) {
        setFieldState(emailInput, "");
        setFieldState(passwordInput, "Credenciais de demonstração incorretas.");
        passwordInput.dataset.authError = "true";
        shakeForm();
        passwordInput.focus();
        passwordInput.select();
        showToast({
          type: "error",
          title: "Credenciais incorretas",
          message: "Use o acesso de demonstração: demo@trilhadevs.com e senha 123456.",
        });
        return;
      }

      // Sucesso: troca para a tela de boas-vindas
      toastRegion.innerHTML = "";
      loginView.hidden = true;
      successView.hidden = false;
      successTitle.focus();
    }, SIMULATED_DELAY_MS);
  });

  // ---------- Sair da demonstração ----------
  logoutBtn.addEventListener("click", () => {
    form.reset();
    resetField(emailInput);
    resetField(passwordInput);
    passwordInput.type = "password";
    togglePasswordBtn.setAttribute("aria-pressed", "false");
    togglePasswordBtn.setAttribute("aria-label", "Mostrar senha");
    successView.hidden = true;
    loginView.hidden = false;
    emailInput.focus();
  });

  // ---------- Funcionalidades demonstrativas ----------
  createAccountBtn.addEventListener("click", () => {
    showToast({
      type: "info",
      title: "Criar conta",
      message:
        "O cadastro faz parte do fluxo planejado no protótipo, mas ainda não possui Back-end implementado.",
    });
  });

  forgotPasswordBtn.addEventListener("click", () => {
    showToast({
      type: "info",
      title: "Recuperação de senha",
      message:
        "A recuperação de senha faz parte do fluxo planejado no protótipo, mas ainda não possui Back-end implementado.",
    });
  });
})();
