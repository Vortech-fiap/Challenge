# Liga das Campeãs — Front-end (Futebol Feminino)

Aplicação web responsiva para acompanhar notícias, jogos, equipes, classificação, peneiras e perfil do usuário no universo do futebol feminino.

Stack: HTML • CSS • JavaScript • Tailwind CSS • Consumo de API (fetch) • LocalStorage

## Equipe 

> Luara Ramos - rm565573
 
> Jean Feltran - rm566534

> Kaio Galvão - rm566536

## 🔥 Visão geral

Interface moderna com Tailwind e pequenos complementos em CSS.

JS modular: renderização de componentes, roteamento leve e integração com APIs.

LocalStorage para preferências do usuário, filtros, favoritos e cache rápido de respostas.

Acessível (teclado/foco) e preparada para integrar VLibras.

##  🧱 Tecnologias utilizadas
- HTML

Estrutura semântica (header, nav, main, section, article).

Componentes reutilizáveis (cards de notícia, lista de jogos, chips de trending).

Marcação preparada para aria-attributes (ícones, botões de ação, badges e estados).

- CSS

Camada fina para detalhes não cobertos por utilitários (ex.: animações de hover, blur de fundo).

Variáveis e classes utilitárias próprias quando necessário (.shadow-card, .animate-float, etc.).

- Tailwind CSS

Produtividade com utilitários para layout, espaçamento e tipografia.

Tema visual com cores da marca (botões, badges, estados ativo/hover).

Responsividade com breakpoints (sm, md, lg) direto no HTML.

Gradientes e glassmorphism (ex.: bg-white/80 backdrop-blur).

Você pode usar Tailwind pelo CDN (mais simples) ou com build (purga de classes e bundle menor). Veja instruções abaixo.

- JavaScript

Modular: api.js, storage.js, ui/*.js (componentes), router.js (SPA por hash), main.js.

fetch API para ler dados (jogos, escudos, notícias).

Renderização declarativa: funções que recebem dados e devolvem HTML (strings ou document.createElement).

Acessibilidade: foco gerenciado, atalhos de teclado e aria labels nos controles interativos.

- Consumo de API

Implementado com fetch + async/await, tratamento de erro e timeout.

Cache rápido no LocalStorage para reduzir chamadas repetidas (com TTL).

Normalização de respostas para o formato interno da UI (ex.: times, escudos, partidas, notícias).


## 🧭 Abas (overview funcional)

- Início
Resumo rápido: destaque do dia, atalho para jogos e notícias, chips de tendências.

- Jogos
Lista de partidas com data/hora, escudo do time (carregado via API), status (agendado/ao vivo/encerrado), placar e filtros (rodada/competição).
Integração com LocalStorage para lembrar filtros e favoritos.

- Notícias
Cards com título, imagem, categorias e CTA “Ler”. Área de Trending com chips filtráveis. Contadores de leitura/likes podem persistir no LocalStorage.

- Equipes
Grade de equipes com escudo, nome, informações essenciais. Clique abre detalhes (elenco resumido, últimos jogos, estatísticas).

- Classificação
Tabela com pontos, vitórias, saldo, aproveitamento. Ordenação e destaque visual para zona de classificação/descenso quando aplicável.

- Meu Perfil
Preferências (tema, notificações), avatar, gerenciamento de favoritos e inscrições. Tudo persistido no LocalStorage.

- Peneiras
Lista de peneiras disponíveis e minhas inscrições (status: inscrito, aprovado, pendente). Salvo em lc:tryouts.

- Sair
Limpa chaves sensíveis do LocalStorage e retorna ao estado “visitante”.
