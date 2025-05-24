# Tarkony

## Overview

As a junior developer, I find it essential to maintain a **Junior Journal (JJ)** — a disciplined practice of detailed commenting, continuously updating the README, and logging any replaced methods or solutions. This helps track progress and decisions transparently.

---

## Project Description

**Tarkony** is a tool related to the online shooter game *Escape From Tarkov*. It provides:

- Real-time item prices from both the flea market and vendors  
- Vendor availability  
- Crafting cost analysis (comparing crafting cost versus purchase cost)  
- Price-to-value rankings for armor and weapons  
- A weapon permutation builder  

Due to gaming culture sensitivities, access to the site is restricted behind a minimalist login system.

---

## API Source

Data is fetched from a GraphQL API:  
[https://tarkov.dev/api/](https://tarkov.dev/api/)

---

## Project Structure

```bash
Tarkony
├── public/
├── src/
│   ├── api/
│   │   ├── graphQLClient.ts
│   │   └── query.ts
│   ├── devtools/
│   │   └── dataShow.tsx
│   ├── App.tsx
│   └── type.ts
├── index.html
└── README.md
```
## Key Modules

### `query.ts`

Contains the fragments for every GraphQL call used on the site, paired with adapters to process fetch results directly.  
*Note:* Earlier, queries were dynamically generated, but adding new fragments required manual container updates — a limitation worth reconsidering.

### `graphQLClient.ts`

This module handles request logic using Axios, executing pre-rendered queries dynamically with an easy async interface: `fetchGraphQL('FragmentName')`.

### `dataShow.tsx`

A simple component page used for testing the fetching functionality.

---

## Junior Journal - 2025.05.24

### Upcoming tasks related to fetching:

- Implement daily price updates only, with larger data fetches limited to weekly intervals.
- Rename `query.query` to `query.fragment` for clarity and consistency.

---

## Reflections on fetching implementation

I experimented extensively to develop a fetching system that is dynamic, simple to invoke, yet flexible enough for various use cases. Although targeted function calls might have sufficed at this stage and scope, I managed to design a construct that properly handles queries both as types, query structures, and at the state management level — supporting long-term maintainability.

Since distinct use cases arose, I created a custom hook to accommodate them:

```typescript
useFetchintoState<useStateType[]>(
  SpecialQuery, 
  setState, 
  SpecialQueryAdapterToState
);
```
At its core, this relies on an Axios POST function, which currently suffices for GraphQL queries. The query fragment is passed as a parameter (fetchGQLwQuery). The hook integrates with React’s useQuery pattern, ensuring cache persistence even if the user navigates away, keyed by query name.

API data refreshes daily. For now, I monitor queries and results via the console, though I plan to migrate to more advanced tools later.

Because this data set will be used across multiple components, I persist it in state. A coherent flow emerged by passing result.data as a dependency in the hook’s array, so state updates consistently reflect query updates, preserving data consistency.