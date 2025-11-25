// Função auto-executável para aplicar o tema antes da página carregar completamente
(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        // Define o modo escuro como padrão se nenhuma preferência for encontrada
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;

    // Atualiza o ícone do botão com base no tema atual
    const updateButtonIcon = () => {
        if (bodyElement.classList.contains('dark-mode')) {
            themeToggleButton.textContent = '☀️'; // Sol para modo escuro
        } else {
            themeToggleButton.textContent = '🌙'; // Lua para modo claro
        }
    };

    // Define o ícone inicial
    updateButtonIcon();

    themeToggleButton.addEventListener('click', () => {
        bodyElement.classList.toggle('dark-mode');

        const newTheme = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);

        updateButtonIcon();
    });
});