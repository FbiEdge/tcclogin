// Armazenamento simples de usuários (em um projeto real, use um backend)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Elementos do formulário de login
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginUsernameError = document.getElementById('login-username-error');
const loginPasswordError = document.getElementById('login-password-error');

// Elementos do formulário de cadastro
const registerForm = document.getElementById('register-form');
const registerEmail = document.getElementById('register-email');
const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');
const registerConfirmPassword = document.getElementById('register-confirm-password');
const registerButton = document.getElementById('register-button');
const registerEmailError = document.getElementById('register-email-error');
const registerUsernameError = document.getElementById('register-username-error');
const registerPasswordError = document.getElementById('register-password-error');
const registerConfirmPasswordError = document.getElementById('register-confirm-password-error');
const registerSuccess = document.getElementById('register-success');

// Elementos do formulário de recuperação de senha
const forgotPasswordForm = document.getElementById('forgot-password-form');
const forgotEmail = document.getElementById('forgot-email');
const recoverButton = document.getElementById('recover-button');
const forgotEmailError = document.getElementById('forgot-email-error');
const forgotSuccess = document.getElementById('forgot-success');

// Links
const createAccountLink = document.getElementById('create-account-link');
const backToLoginLink = document.getElementById('back-to-login-link');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginFromForgotLink = document.getElementById('back-to-login-from-forgot-link');

// Função para alternar entre formulários
function showForm(formToShow) {
    loginForm.classList.remove('visible');
    loginForm.classList.add('hidden');
    
    registerForm.classList.remove('visible');
    registerForm.classList.add('hidden');
    
    forgotPasswordForm.classList.remove('visible');
    forgotPasswordForm.classList.add('hidden');
    
    formToShow.classList.remove('hidden');
    formToShow.classList.add('visible');
    
    // Limpar erros e campos
    clearErrors();
    clearFields();
}

// Função para limpar mensagens de erro
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
    
    const successElements = document.querySelectorAll('.success');
    successElements.forEach(element => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

// Função para limpar campos
function clearFields() {
    loginUsername.value = '';
    loginPassword.value = '';
    registerEmail.value = '';
    registerUsername.value = '';
    registerPassword.value = '';
    registerConfirmPassword.value = '';
    forgotEmail.value = '';
}

// Event listeners para os links
createAccountLink.addEventListener('click', () => showForm(registerForm));
backToLoginLink.addEventListener('click', () => showForm(loginForm));
forgotPasswordLink.addEventListener('click', () => showForm(forgotPasswordForm));
backToLoginFromForgotLink.addEventListener('click', () => showForm(loginForm));

// Validação de login
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors();
    
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    
    let isValid = true;
    
    if (!username) {
        loginUsernameError.textContent = 'Por favor, digite seu usuário';
        loginUsernameError.style.display = 'block';
        isValid = false;
    }
    
    if (!password) {
        loginPasswordError.textContent = 'Por favor, digite sua senha';
        loginPasswordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Login bem-sucedido - redireciona para o site especificado
            window.location.href = 'https://fbiedge.github.io/chaveamento/';
        } else {
            loginPasswordError.textContent = 'Usuário ou senha incorretos';
            loginPasswordError.style.display = 'block';
        }
    }
});

// Validação de cadastro
registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors();
    
    const email = registerEmail.value.trim();
    const username = registerUsername.value.trim();
    const password = registerPassword.value.trim();
    const confirmPassword = registerConfirmPassword.value.trim();
    
    let isValid = true;
    
    // Validação de email
    if (!email) {
        registerEmailError.textContent = 'Por favor, digite seu email';
        registerEmailError.style.display = 'block';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        registerEmailError.textContent = 'Por favor, digite um email válido';
        registerEmailError.style.display = 'block';
        isValid = false;
    }
    
    // Validação de usuário
    if (!username) {
        registerUsernameError.textContent = 'Por favor, digite um nome de usuário';
        registerUsernameError.style.display = 'block';
        isValid = false;
    } else if (users.some(u => u.username === username)) {
        registerUsernameError.textContent = 'Este nome de usuário já está em uso';
        registerUsernameError.style.display = 'block';
        isValid = false;
    }
    
    // Validação de senha
    if (!password) {
        registerPasswordError.textContent = 'Por favor, digite uma senha';
        registerPasswordError.style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        registerPasswordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
        registerPasswordError.style.display = 'block';
        isValid = false;
    }
    
    // Validação de confirmação de senha
    if (!confirmPassword) {
        registerConfirmPasswordError.textContent = 'Por favor, confirme sua senha';
        registerConfirmPasswordError.style.display = 'block';
        isValid = false;
    } else if (password !== confirmPassword) {
        registerConfirmPasswordError.textContent = 'As senhas não coincidem';
        registerConfirmPasswordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Adiciona o novo usuário
        users.push({ email, username, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Mostra mensagem de sucesso
        registerSuccess.textContent = 'Conta criada com sucesso! Faça login para continuar.';
        registerSuccess.style.display = 'block';
        
        // Limpa os campos
        registerEmail.value = '';
        registerUsername.value = '';
        registerPassword.value = '';
        registerConfirmPassword.value = '';
        
        // Volta para o login após 2 segundos
        setTimeout(() => {
            showForm(loginForm);
        }, 2000);
    }
});

// Recuperação de senha
recoverButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors();
    
    const email = forgotEmail.value.trim();
    
    if (!email) {
        forgotEmailError.textContent = 'Por favor, digite seu email';
        forgotEmailError.style.display = 'block';
        return;
    }
    
    const user = users.find(u => u.email === email);
    
    if (user) {
        // Em um sistema real, você enviaria um email com instruções para redefinir a senha
        forgotSuccess.textContent = `Instruções para redefinir sua senha foram enviadas para ${email}`;
        forgotSuccess.style.display = 'block';
        forgotEmail.value = '';
    } else {
        forgotEmailError.textContent = 'Nenhuma conta encontrada com este email';
        forgotEmailError.style.display = 'block';
    }
});