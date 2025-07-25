# Quest-Pokedex 

Este projeto é construído com React que consome dados da [PokéAPI](https://pokeapi.co/).  
Ele foi desenvolvido como parte de um desafio do curso de programação, com o objetivo de praticar o uso de APIs, hooks, roteamento e estilização de componentes.

---

## 🚀 Funcionalidades

- 🔍 Listagem dos 10 primeiros Pokémons.
- ➕ Botão para carregar mais Pokémons de 10 em 10.
- 🎨 Filtro por tipo de Pokémon utilizando um campo `<select>`.
- 📄 Página de detalhes de cada Pokémon, exibindo:
  - Nome
  - Imagem
  - Movimentos (moves)
  - Tipos
  - Habilidades (com descrição)
- 🌗 Tema claro/escuro com botão de alternância.
- ✅ Testes unitários com Jest.
- ❌ Tratamento de erros com `try/catch`.

---

## 🛠️ Ferramentas utilizadas

- **React**: biblioteca principal para construção da interface.
- **React Router Dom**: para navegação entre a lista e a página de detalhes.
- **Styled-components**: usado para estilização dinâmica da página de detalhes, com suporte a tema.
- **Jest**: para criação de testes unitários.
- **PokéAPI**: API pública para dados de Pokémon.

> As ferramentas foram escolhidas por serem modernas, amplamente utilizadas no mercado e por permitirem flexibilidade tanto no layout quanto no desenvolvimento incremental.

---

## 🧠 Decisões de projeto

- A tela inicial foi separada em um componente `Pokelist`, mantendo responsabilidade única.
- A listagem é feita de forma paginada (limit + offset), para evitar requisições pesadas.
- O detalhamento dos Pokémons está em uma rota separada (`/pokemon/:name`) usando o React Router.
- O filtro por tipo atua sobre os Pokémons já carregados, garantindo performance e simplicidade.
- O tema claro/escuro foi feito com CSS nativo (media query), e o estilo interno da página de detalhes com `styled-components` como bônus.
- Foi implementado tratamento de erros com `try/catch`, e simulação de falhas via testes para demonstrar robustez.

---

## 🧪 Testes

Foi criado um teste que simula erro no `fetch` dos Pokémons e valida que o erro é capturado corretamente e exibido no `console.error`.

---

## 🖥️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/devCintia/Quest-Pokedex.git
cd Quest-Pokedex