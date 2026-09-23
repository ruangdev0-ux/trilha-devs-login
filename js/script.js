/**
 * Trilha Devs — Login
 * Interações de Front-end da tela de login.
 *
 * Importante: este projeto é apenas uma interface de demonstração (UI/UX).
 * Não há Back-end, banco de dados nem autenticação real — nenhum dado
 * digitado é enviado ou armazenado.
 */
(function () {
  "use strict";

  // ---------- Elementos ----------
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const submitBtn = document.getElementById("submit-btn");
  const createAccountBtn = document.getElementById("create-account");
  const forgotPasswordBtn = document.getElementById("forgot-password");
  const feedback = document.getElementById("feedback");

  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  /**
   * Valida um campo e atualiza o feedback visual e os atributos de acessibilidade.
   * @param {HTMLInputElement} input
   * @returns {boolean} true se o campo for válido
   */
  function validateField(input) {
    const value = input.name === "email" ? input.value.trim() : input.value;
    const message = validators[input.name](value);
    const field = input.closest(".field");
    const errorEl = document.getElementById(`${input.id}-error`);

    field.classList.toggle("is-invalid", Boolean(message));
    field.classList.toggle("is-valid", !message);
    input.setAttribute("aria-invalid", String(Boolean(message)));
    errorEl.textContent = message;

    return !message;
  }

  /** Remove o estado visual de validação de um campo. */
  function resetField(input) {
    const field = input.closest(".field");
    field.classList.remove("is-invalid", "is-valid");
    input.removeAttribute("aria-invalid");
    document.getElementById(`${input.id}-error`).textContent = "";
  }

  /**
   * Exibe uma mensagem na área de feedback.
   * @param {string} text
   * @param {"info"|"success"|"error"} type
   */
  function showFeedback(text, type = "info") {
    feedback.hidden = false;
    feedback.className = `feedback feedback--${type}`;
    feedback.textContent = text;
  }

  function hideFeedback() {
    feedback.hidden = true;
    feedback.textContent = "";
  }

  // ---------- Validação em tempo real ----------
  [emailInput, passwordInput].forEach((input) => {
    // Valida ao sair do campo (se o usuário digitou algo)
    input.addEventListener("blur", () => {
      if (input.value) validateField(input);
    });

    // Depois de um erro, revalida enquanto o usuário corrige
    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field.classList.contains("is-invalid") || field.classList.contains("is-valid")) {
        validateField(input);
      }
      if (!input.value) resetField(input);
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

  // ---------- Envio do formulário (simulado) ----------
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideFeedback();

    const isEmailValid = validateField(emailInput);
    const isPasswordValid = validateField(passwordInput);

    if (!isEmailValid || !isPasswordValid) {
      showFeedback("Verifique os campos destacados antes de continuar.", "error");
      // Leva o foco para o primeiro campo com problema
      (isEmailValid ? passwordInput : emailInput).focus();
      return;
    }

    // Simula o tempo de resposta de um servidor apenas para demonstrar o estado de carregamento
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    submitBtn.setAttribute("aria-busy", "true");

    window.setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      submitBtn.removeAttribute("aria-busy");
      showFeedback(
        "Campos validados com sucesso! Esta é uma demonstração Front-end: não existe autenticação real e nenhum dado foi enviado.",
        "success"
      );
    }, 1200);
  });

  // ---------- Links secundários ----------
  createAccountBtn.addEventListener("click", () => {
    showFeedback(
      "A tela de cadastro faz parte do fluxo planejado no protótipo e ainda não foi implementada nesta versão de demonstração.",
      "info"
    );
  });

  forgotPasswordBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email || validators.email(email)) {
      validateField(emailInput);
      emailInput.focus();
      showFeedback("Para recuperar a senha, informe primeiro um e-mail válido no campo Email.", "info");
      return;
    }

    showFeedback(
      `Em um sistema real, as instruções de recuperação seriam enviadas para ${email}. Nesta demonstração nenhum e-mail é enviado.`,
      "info"
    );
  });
})();
