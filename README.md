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

## Junior Journal - 2025.05.26

### Roadmap:

- Item details: Barter, Task, craft needs show 
- Searchbar - works same as category
- Daily price update
- Routing - "All detail" single item page

---

## Reflections on fetching implementation

To retrieve the data, I approached the problem from multiple angles, aiming to design a dynamic, easily callable yet flexible system. While in this phase of the project a few direct fetch calls and local state would have sufficed, I deliberately built a more generalized solution that is maintainable, reusable, and scalable in the long term.

Since distinct use cases arose, I created a custom hook to accommodate them:

```typescript
  useFetchIntoCache<QueryType[],AdapterType[]>(
    Query,
    QueryAdapter,
  );
```

This custom hook performs a GraphQL query (currently via Axios.post), forwarding the query.query object. It then extracts the relevant branch from the data.data object in the response and, optionally, transforms the structure using an adapter function tailored to the consumption context.

The hook is integrated with React Query, thus it:

- Caches the response data using query.name as the cache key
- Retains data across navigation events
- Refreshes data on a daily basis via the staleTime setting

Rather than returning the fetched data directly, the hook writes it into the React Query cache. The data can later be accessed using queryClient.getQueryData(...), even across multiple components.

Fetching roadmap:

- Basic local query execution with direct call and local state storage
- Introduction of a dynamic query object
- Addition of an adapter to handle varying data structures
- Transition to cache-based data storage and access

