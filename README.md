# Tarkony - 2025.06.02

### Done:

- SearchBar – filters the displayed data based on user input
- Singleton API call variants – simplified, pre-configured versions of API calls for easier reuse

### Next:

- Routing - "All detail" single item page
- Guide modal
- Category refactoring

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
│   │   ├── old/ 
│   │   ├── graphQLClient.ts
│   │   └── query.ts
│   ├── components/
│   │   ├── CategoryMenu.tsx
│   │   ├── ItemList.ts
│   │   ├── ItemDetail.ts
│   │   ├── MUIHover.ts
│   │   └── SearchBar.ts
│   ├── types/
│   │   ├── responseType.ts 
│   │   ├── queryType.ts
│   │   └── type.ts
│   ├── devtools/
│   │   └── dataShow.tsx
│   └── App.tsx
├── index.html
└── README.md
```
## Key Modules

### `dataShow.tsx`

Still used as a dev tool playground; later it will be merged into App.tsx.
This file currently executes the initial API calls using the useQuery hook and manages category display logic.

### `graphQLClient.ts`


This module manages GraphQL request logic using Axios, integrating with useQuery to fetch pre-defined queries via custom hooks.
For direct usage, parameterized custom hooks are available as singleton query functions.
In progress: developing a standalone asynchronous fetch function (fetchQuery), not tied to React hooks.

### `CategoryMenu.tsx`

This component handles category selection, allowing the user to browse items by category.
Currently: only downward mapping is implemented. Planned: a full bidirectional (up-down) browsing structure that maintains visibility of parent categories, improving usability.

### `ItemList.tsx`

This displays items from the selected category. Data is retrieved from QueryData, fetched by dataShow.
The query format is intentionally concise to avoid overloading the system, as there are 4000+ items, each with extensive associated data.
The list includes several MUI components, most notably:

Paginator

Accordion: many details per item are displayed in collapsible panels, keeping the UI clean

ItemDetails (see below)

Accordion mostly displays simple text, so I had to override its parent component to improve layout.
Yes, the console currently looks bad due to the category structure, which is why I plan to refactor that component. For now, it’s functional.

### `ItemDetail.tsx`

Part of ItemList. This simple component receives an item ID and fetches its remaining data.
Currently, it renders a box-based layout to verify data integrity, and with hover will shows the deals for that

### `MUIHover.tsx`

I don't want to overload the detail view with too much information (as of 06.01).
I'd like to keep it simple yet effective. The idea is to display short tags per data group — for example, the number of barter-related items.
On hover, it will show the icons of those related items. For instance, the "Bottle of Water" item on the first page.
This logic will be generalized across other detailed data groups. The goal is to simplify rendering while improving clarity.

### `SearchBar.tsx`

As part of the search functionality, a SearchBar component was created.
It receives a delayed setter function from ItemList, which updates a keyword used for filtering the item list.

### `queryType.ts`

Contains all query and fragments for every GraphQL call used on the site, paired with adapters to process fetch results directly.  

### `responseType.ts`

Stores target type structures after Adapter processing.

### `type.ts`

Testing and miscellaneous types; will be sorted later.

---

## Junior Journal - 2025.06.01


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
- Refreshes data on a weekly basis via the staleTime setting

Rather than returning the fetched data directly, the hook writes it into the React Query cache. The data can later be accessed using queryClient.getQueryData(...), even across multiple components.
For improved clarity and cleaner parameter handling, singleton-style versions of the hooks were introduced. These are easier to call and reason about, without side effects or unnecessary parameter pollution.

Fetching roadmap:

- Basic local query execution with direct call and local state storage
- Introduction of a dynamic query object
- Addition of an adapter to handle varying data structures
- Transition to cache-based data storage and access
- Singleton versions

Later: At ItemDetails, I considered creating a regular fetch function (not a hook).
I ran into problems with fetchQuery, and I still don't fully understand the issue.
While ItemDetails may be more efficient as a hook, I still plan to implement the plain function version, just to learn from the process and understand how not to approach it.

