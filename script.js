document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('org-container');
    const searchInput = document.getElementById('search-input');
    container.setAttribute('aria-live', 'polite'); // Anuncia mudanças no conteúdo (busca)
    const body = document.body;
    const backToTopButton = document.getElementById('back-to-top-btn');
    const favoritesFilter = document.getElementById('favorites-filter');
    let allOrgsData = []; // Armazena todos os dados carregados

    // --- Lógica de Favoritos ---
    const getFavorites = () => {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    };

    const toggleFavorite = (orgName) => {
        let favorites = getFavorites();
        if (favorites.includes(orgName)) {
            favorites = favorites.filter(name => name !== orgName);
        } else {
            favorites.push(orgName);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Se o filtro de favoritos estiver ativo, atualiza a visualização
        if (favoritesFilter.checked) {
            applyFiltersAndRender();
        }
    };
    // Função para renderizar os cartões na tela
    const renderCards = (orgs) => {
        container.innerHTML = ''; // Limpa o container antes de renderizar
        if (orgs.length === 0) container.textContent = 'Nenhuma organização encontrada.';

        orgs.forEach((org, index) => {
            // Cria os elementos HTML para o cartão
            const favorites = getFavorites();
            const card = document.createElement('div');
            card.className = 'card base-card';
            card.style.animationDelay = `${index * 0.05}s`; // Adiciona um atraso escalonado
            card.style.setProperty('--org-color', org.cor_destaque); // Define a cor de destaque

            card.setAttribute('role', 'article'); // Define o papel semântico do card

            const favButton = document.createElement('button');
            favButton.className = 'favorite-btn';
            favButton.innerHTML = '&#10084;'; // Coração
            favButton.setAttribute('aria-label', `Marcar ${org.nome} como favorito`);
            if (favorites.includes(org.nome)) {
                favButton.classList.add('favorited');
            }

            favButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o clique no botão acione outros eventos
                toggleFavorite(org.nome);
                favButton.classList.toggle('favorited');
            });

            const logo = document.createElement('img');
            logo.src = org.logo;
            logo.alt = `Logo da ${org.nome}`;
            logo.className = 'org-logo';
            logo.loading = 'lazy'; // Melhora a performance adiando o carregamento de imagens fora da tela

            const name = document.createElement('h2');
            name.textContent = org.nome;

            const description = document.createElement('p');
            description.textContent = org.descrição;

            const link = document.createElement('a');
            // Modificado para levar à página de detalhes
            link.href = `detalhes.html?org=${encodeURIComponent(org.nome)}`;
            link.textContent = 'Ver Detalhes';
            link.rel = 'noopener noreferrer'; // Boa prática de segurança

            const liquipediaLink = document.createElement('a');
            liquipediaLink.href = org.liquipedia_link;
            liquipediaLink.textContent = 'Saiba mais';
            liquipediaLink.target = '_blank'; // Abre em nova aba
            liquipediaLink.rel = 'noopener noreferrer';
            liquipediaLink.className = 'liquipedia-link'; // Adiciona classe para estilização

            // Cria um container para os botões
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'card-buttons';
            buttonsContainer.appendChild(link);
            buttonsContainer.appendChild(liquipediaLink);

            // Adiciona os elementos ao cartão e o cartão ao container principal
            card.appendChild(favButton);
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(buttonsContainer);
            container.appendChild(card);
        });
    };

    // Função unificada para aplicar filtros e renderizar
    const applyFiltersAndRender = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const showFavoritesOnly = favoritesFilter.checked;
        const favorites = getFavorites();

        let filteredOrgs = allOrgsData;

        // 1. Filtra por favoritos, se ativado
        if (showFavoritesOnly) {
            filteredOrgs = filteredOrgs.filter(org => favorites.includes(org.nome));
        }

        // 2. Filtra pelo termo de busca
        filteredOrgs = filteredOrgs.filter(org => 
            org.nome.toLowerCase().includes(searchTerm)
        );

        // 3. Ordena a lista para colocar os favoritos no topo
        filteredOrgs.sort((a, b) => {
            const aIsFavorite = favorites.includes(a.nome);
            const bIsFavorite = favorites.includes(b.nome);

            if (aIsFavorite && !bIsFavorite) return -1; // 'a' (favorito) vem antes
            if (!aIsFavorite && bIsFavorite) return 1;  // 'b' (favorito) vem antes
            
            return 0; // Mantém a ordem original (alfabética) se ambos forem ou não forem favoritos
        });

        renderCards(filteredOrgs);
    };

    // **NOVO**: Função centralizada para lidar com qualquer mudança de filtro
    const handleFilterChange = () => {
        // Salva o estado do filtro de favoritos sempre que houver uma mudança
        localStorage.setItem('favoritesFilterState', favoritesFilter.checked);
        applyFiltersAndRender();
    };

    // Função para mostrar/esconder o loader
    const showLoader = (show) => {
        const loaderContainer = document.querySelector('.loader-container');
        loaderContainer.style.display = show ? 'flex' : 'none';
    };

    // Carrega os dados do JSON
    showLoader(true);
    fetch('data.json')
        .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
        .then(data => {
            // Ordena os dados em ordem alfabética pelo nome da organização
            data.sort((a, b) => a.nome.localeCompare(b.nome));
            allOrgsData = data; // Guarda os dados originais já ordenados

            // **NOVO**: Verifica e aplica o estado do filtro de favoritos ao carregar a página
            const savedFilterState = localStorage.getItem('favoritesFilterState');
            if (savedFilterState === 'true') {
                favoritesFilter.checked = true;
            }

            // Adiciona eventos de filtro DEPOIS que os dados forem carregados
            searchInput.addEventListener('input', handleFilterChange);
            favoritesFilter.addEventListener('change', handleFilterChange);

            handleFilterChange(); // Renderiza o estado inicial, já salvando o estado do filtro
        })
        .catch(error => {
            console.error('Houve um problema ao carregar os dados:', error);
            container.textContent = 'Falha ao carregar as organizações.';
        })
        .finally(() => showLoader(false)); // Esconde o loader ao final, com sucesso ou erro

    // --- Lógica do Botão "Voltar ao Topo" ---
    window.addEventListener('scroll', () => {
        // Mostra o botão se o scroll passar de 300px
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        // Rola a página para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});