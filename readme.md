# Enciclopédia de Times de E-sports

Este é um projeto de front-end que funciona como uma enciclopédia interativa sobre as maiores e mais influentes organizações de e-sports do mundo. A aplicação web exibe informações detalhadas sobre cada time, carregando os dados dinamicamente a partir de um arquivo JSON.

##  Visão Geral

O objetivo principal é apresentar de forma clara e organizada os dados de diversas equipes de e-sports, como sua história, jogos principais, jogadores notáveis e links para suas páginas oficiais. A interface foi projetada para ser intuitiva, permitindo que os usuários explorem e conheçam mais sobre o cenário competitivo global.

![Exemplo da Aplicação](https-i-imgur-com-7v7j2vj-png)

##  Funcionalidades

- **Carregamento Dinâmico:** As informações das equipes são carregadas de forma assíncrona a partir do arquivo `data.json`, sem a necessidade de recarregar a página.
- **Listagem de Equipes:** Exibe cartões com as informações essenciais de cada organização, incluindo logo e nome.
- **Detalhes Expansivos:** Ao interagir com um cartão, o usuário pode visualizar detalhes completos, como descrição, jogadores notáveis e suas conquistas.
- **Design Responsivo (sugerido):** A interface pode ser adaptada para funcionar em diferentes tamanhos de tela, de desktops a dispositivos móveis.

##  Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web fundamentais:

- **HTML5:** Para a estruturação semântica do conteúdo.
- **CSS3:** Para a estilização, layout e design da interface.
- **JavaScript:** Para a manipulação do DOM, lógica da aplicação e para buscar e processar os dados do arquivo `data.json`.

## 📂 Estrutura do Projeto

O repositório está organizado da seguinte forma:


/
├── 📄 index.html         # Arquivo principal da aplicação
├── 📁 css/
│   └── 📄 style.css      # Folha de estilos
├── 📁 js/
│   └── 📄 script.js       # Lógica da aplicação
├── 📁 data.json           # Banco de dados com as informações das equipes
├── 📁 imagens/            # Pasta com os logotipos das equipes
└── 📄 readme.md           # Documentação do projeto