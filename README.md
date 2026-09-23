# Trilha Devs — Login

Tela de login da **Trilha Devs**, criada originalmente por mim no **Figma** como protótipo mobile e depois reconstruída como interface Front-end funcional com **HTML5, CSS3 e JavaScript puro**.

🔗 **Demonstração online:** https://ruangdev0-ux.github.io/trilha-devs-login/

<p align="center">
  <img src="assets/preview/mobile.png" alt="Tela de login da Trilha Devs na versão mobile" width="300">
  &nbsp;&nbsp;
  <img src="assets/preview/validacao.png" alt="Tela de login mostrando mensagens de validação nos campos de e-mail e senha" width="300">
</p>

---

## Sobre o projeto

A **Trilha Devs** é a tela de login de um app pensado para estudantes de programação. Eu desenhei a interface durante o **primeiro semestre do curso de Análise e Desenvolvimento de Sistemas (ADS)**, em atividades sobre **UI/UX, design de interfaces e prototipagem**.

O protótipo original foi feito no Figma, em um frame mobile (iPhone, 402 × 844 px), com:

- cabeçalho e rodapé azuis;
- ícone `</>` como logo;
- título "Faça Login";
- campos de e-mail e senha;
- botão "Entrar";
- links "Criar conta" e "Esqueceu sua senha".

## Objetivo

Levar o protótipo do Figma para código, reconstruindo a tela com HTML, CSS e JavaScript em vez de exportar uma imagem, sem perder a identidade visual original.

Aproveitei a implementação para ajustar alguns pontos em relação ao protótipo:

- espaçamentos e alinhamentos;
- acessibilidade;
- responsividade;
- validação e feedback visual nos campos.

## Do Figma para o Front-end

| No protótipo (Figma) | Na implementação |
| --- | --- |
| Frame mobile de 402 × 844 px | Tela cheia no celular e "aparelho" centralizado a partir de 600 px de largura |
| Cores `#1E3A8A`, `#0D37A3`, `#D9D9D9` e `#111827` | Mesmas cores, definidas como variáveis CSS (*design tokens*) |
| Tipografia Inter (Semi Bold Italic, Medium, Bold Italic, Light Italic) | Inter via Google Fonts, com os mesmos pesos e estilos |
| Logo `</>` em um retângulo azul | Logo feita em HTML e CSS, sem usar imagem |
| Campos cinza com texto de exemplo | Inputs reais com `placeholder`, foco visível e estados de erro e sucesso |
| Botão "Entrar", "Criar conta" e "Esqueceu sua senha" | Botões com estados de hover, foco, carregamento e mensagens de retorno |

## Tecnologias

- **HTML5**: estrutura semântica (`main`, `section`, `form`, `label`)
- **CSS3**: variáveis CSS, Flexbox, Grid, `clamp()`, media queries e animações
- **JavaScript (ES6+)**: validação e interações, sem frameworks nem bibliotecas
- **Figma**: protótipo original (UI/UX)
- **GitHub Pages**: publicação

## Funcionalidades

- Validação do e-mail (campo obrigatório e formato válido)
- Validação da senha (campo obrigatório e mínimo de 6 caracteres)
- Mensagens de erro abaixo de cada campo, com borda e fundo destacados
- Validação em tempo real, que é refeita enquanto o usuário corrige o campo
- Botão para mostrar e ocultar a senha, que também atualiza `aria-pressed` e `aria-label`
- Estado de carregamento no botão "Entrar" (envio simulado)
- Mensagens de retorno para "Entrar", "Criar conta" e "Esqueceu sua senha"
- Estados de hover e foco em todos os elementos interativos
- Navegação completa por teclado (Tab, Shift + Tab e Enter)
- Mensagens anunciadas por leitores de tela (`aria-live`, `role="status"` e `aria-invalid`)
- Respeita a preferência do sistema por menos animações (`prefers-reduced-motion`)

> ⚠️ **Este é um projeto Front-end de demonstração.**
> Ele não tem Back-end, banco de dados nem autenticação real. Os dados digitados não são enviados nem armazenados. O envio do formulário é apenas simulado para mostrar os estados da interface.

## Responsividade

O projeto mantém o foco mobile do protótipo e foi testado nas larguras **320, 375, 430, 768, 1024, 1440 e 1920 px**, sem rolagem horizontal nem conteúdo cortado.

- **Celular (até 599 px):** a interface ocupa a tela inteira, como no protótipo.
- **Tablet e desktop (600 px ou mais):** a tela aparece dentro de um "aparelho" centralizado, com cantos arredondados e sombra, preservando as proporções do frame original.

<p align="center">
  <img src="assets/preview/desktop.png" alt="Versão desktop com a tela de login centralizada em formato de aparelho" width="720">
</p>

## Estrutura de arquivos

```
trilha-devs-login/
├── index.html            # Estrutura da página
├── css/
│   └── style.css         # Estilos, design tokens e responsividade
├── js/
│   └── script.js         # Validações e interações
├── assets/
│   ├── img/
│   │   └── favicon.svg   # Ícone </> da aba do navegador
│   └── preview/          # Imagens usadas neste README
└── README.md
```

## Como executar

Não é preciso instalar nada.

1. Clone o repositório:
   ```bash
   git clone https://github.com/ruangdev0-ux/trilha-devs-login.git
   ```
2. Abra o arquivo `index.html` no navegador.

Também dá para acessar direto pela [demonstração online](https://ruangdev0-ux.github.io/trilha-devs-login/).

## Autor

**Ruan Gomes**, estudante de Análise e Desenvolvimento de Sistemas.
Design original (Figma) e implementação Front-end.

- GitHub: [@ruangdev0-ux](https://github.com/ruangdev0-ux)
