document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('details-container');

    const params = new URLSearchParams(window.location.search);
    const orgName = params.get('org');

    if (!orgName) {
        container.innerHTML = '<p>Organização não encontrada.</p>';
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const org = data.find(o => o.nome === orgName);

            if (!org) {
                container.innerHTML = '<p>Detalhes da organização não encontrados.</p>';
                return;
            }

            // Define a cor de destaque para a página
            document.documentElement.style.setProperty('--org-color', org.cor_destaque);
            document.title = org.nome; // Atualiza o título da página

            // Cria o cabeçalho da organização
            const header = `
                <div class="org-header">
                    <img src="${org.logo}" alt="Logo da ${org.nome}">
                    <h1>${org.nome}</h1>
                </div>
                <p>${org.descrição}</p>
            `;

            // Cria a seção de Jogos Principais
            const gamesSection = document.createElement('div');
            gamesSection.className = 'games-section';
            
            const gamesTitle = document.createElement('h2');
            gamesTitle.textContent = 'Jogos Principais';
            gamesSection.appendChild(gamesTitle);

            const gamesList = document.createElement('div');
            gamesList.className = 'games-list';

            org.jogos_principais.forEach(game => {
                const gameTag = document.createElement('span');
                gameTag.className = 'game-tag';
                gameTag.textContent = game;
                gamesList.appendChild(gameTag);
            });
            gamesSection.appendChild(gamesList);

            // Cria a seção de jogadores notáveis
            const playersSection = document.createElement('div');
            playersSection.className = 'players-section';

            const playersTitle = document.createElement('h2');
            playersTitle.textContent = 'Jogadores Notáveis';
            playersSection.appendChild(playersTitle);

            const playersGrid = document.createElement('div');
            playersGrid.className = 'players-grid';

            org.jogadores_notaveis.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card base-card';

                const playerName = document.createElement('h3');
                playerName.textContent = player.nome;

                const conquistasList = document.createElement('ul');
                conquistasList.className = 'conquistas-lista';
                player.conquistas.forEach(conquista => {
                    conquistasList.innerHTML += `<li>${conquista}</li>`;
                });
                
                playerCard.appendChild(playerName);
                playerCard.appendChild(conquistasList);
                playersGrid.appendChild(playerCard);
            });

            playersSection.appendChild(playersGrid);

            container.innerHTML = ''; // Limpa qualquer conteúdo anterior
            container.insertAdjacentHTML('beforeend', header); // Adiciona o cabeçalho
            container.appendChild(gamesSection);
            container.appendChild(playersSection);
        })
        .catch(error => {
            console.error('Erro ao carregar detalhes da organização:', error);
            container.innerHTML = '<p>Não foi possível carregar as informações. Tente novamente mais tarde.</p>';
        });
});