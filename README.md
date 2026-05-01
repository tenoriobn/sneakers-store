# 🛍️ Sneakers Store

Uma aplicação de e-commerce desenvolvida com **React + TypeScript + Vite**, focada em **componentização**, **boa experiência do usuário**, **código limpo** e **arquitetura escalável**.

O projeto simula uma loja virtual moderna, permitindo navegar por produtos, visualizar detalhes, controlar quantidades e gerenciar um carrinho persistido no navegador.

---

## 🚀 Preview

- 🌐 **Produção (Vercel):**  
  https://sneakers-store-app.vercel.app

---

## 🧰 Tecnologias

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Context API
- Local Storage

---

## ✨ Funcionalidades

### 🛒 Catálogo de produtos

- Listagem de produtos
- Busca por nome
- Filtro por categoria
- Ordenação:
  - Nome (A-Z / Z-A)
  - Menor preço
  - Maior preço
- Paginação

### 📦 Detalhes do produto

- Página individual
- Produtos relacionados
- Controle de quantidade
- Compra rápida

### 🧺 Carrinho

- Adicionar produto
- Atualizar quantidade
- Remover produto
- Total automático
- Persistência com Local Storage

### 💡 Experiência do usuário (UX)

- Layout responsivo
- Loading state
- Empty state
- Error state
- Navegação SPA sem recarregamento

---

## 🏗️ Arquitetura

```txt
src/
 ├─ components/
 ├─ context/
 ├─ hooks/
 ├─ layouts/
 ├─ pages/
 ├─ routes/
 ├─ services/
 ├─ types/
 └─ utils/

public/
 ├─ data/
 │   └─ products.json
 └─ images/
```

````

### 📐 Padrões adotados

- Componentes desacoplados
- Hooks customizados
- Princípio da responsabilidade única
- Tipagem forte com TypeScript
- Reutilização de componentes
- Código previsível e legível

---

## ⚙️ Como rodar localmente

### 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

### 2. Acessar a pasta

```bash
cd react-store
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🗄️ Fonte de dados

O projeto utiliza dados mockados estáticos:

```txt
public/data/products.json
```

### Motivos da escolha:

- Simplicidade
- Zero dependência de backend
- Deploy facilitado
- Comportamento previsível
- Ideal para demonstração técnica front-end

---

## 🚀 Deploy

Aplicação publicada na **Vercel**, com:

- Build automático
- SPA routing configurado
- Suporte a refresh (F5)
- Assets estáticos otimizados

---

## 🔮 Melhorias futuras

- Wishlist
- Checkout
- Feedback com toast
- Skeleton loading
- Testes unitários
- Testes E2E
- Integração com API real

---

## 🎯 Objetivo do projeto

Demonstrar habilidades em:

- Arquitetura front-end
- Componentização
- Gerenciamento de estado
- Persistência de dados
- Roteamento
- Responsividade
- Experiência do usuário
- Boas práticas de código
````
