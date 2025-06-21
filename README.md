# Tarkony - 2025.06.21 - Readme is coming! 
### Guide

On the main page, all on-hand items are listed first.

Displayed categories are top-level categories; by selecting them, the user is taken to the subcategories. For each selected category, all items within its subcategories are also displayed.

Each item has a dropdown data field that displays additional necessary information, and when hovering over these data points, related items are also shown — for example, what the given item can be bartered for.

In the detailed data section, there's an All Data button that redirects the user to the selected item's separate page, where all of its data is accessible.

### Done:

 - Started to use React.memo for ItemBaseDisplay (and tired to optimalise the page)
 - Skeleton on isLoading (first iteration)
 - Logger taken out, started to rendering while other component rendered so it was a big problem. Using console.log now
 - Error status component in case of fetching isError
 - Combination with prices in Combination componenet
 - Item Single page Quests & ItemDetails

### Next:

- Checkout: "Colt M4A1 5.56x45 assault rifle" - name problem
- Themes Implement
- Checkpoint!

- IsItWorth? Bartel vs Craft Vs Trader Page
- Modder compare Page
- ItemSingle as pop-up as separeted window in ItemList
- (In the end) Whole UI refactor

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
│   ├── adapters/
│   │   ├── itemsAdapter.ts 
│   │   └── ItemSingleAdapter.ts
│   ├── api/
│   │   ├── old/ 
│   │   ├── graphQLClient.ts
│   │   ├── itemSingleQuery.ts
│   │   └── itemsQuery.ts
│   ├── components/
│   │   ├── Items/
│   │   │   ├── categoryLogic.ts
│   │   │   ├── CategoryMenu.tsx
│   │   │   ├── ItemDetails.tsx
│   │   │   └── ItemList.tsx
│   │   ├── layout./
│   │   │   ├── Footer.tsx
│   │   │   └── LoggerComponents.tsx
│   │   └── ui/
│   │       ├── Combination.tsx
│   │       ├── CountedItem.tsx
│   │       ├── MUIHover.tsx
│   │       ├── Tabs.tsx
│   │       └── SearchBar.tsx
│   ├── hooks/
│   │   └── APICalls.ts
│   ├── pages/
│   │   ├── Items.tsx 
│   │   ├── MainLayout.tsx 
│   │   └── ItemSingle.tsx
│   ├── types/
│   │   ├── ItemSingle/ 
│   │   │   ├── queryTyoe.ts
│   │   │   └── responseType.ts
│   │   └── items/
│   │       ├── queryTyoe.ts
│   │       └── responseType.ts
│   ├── devtools/
│   │   ├── utility.ts
│   │   └── Logger.tsx
│   └── App.tsx
├── index.html
└── README.md
```
## Key Modules

## Routing
  '/' -> Items.tsx
  '/item/normalizedName' -> ItemSingle.tsx

### `graphQLClient.ts` + `itemSingleQuery.ts` + `itemsQuery.ts`

This module manages GraphQL request logic using Axios, integrating with useQuery to fetch pre-defined queries via custom hooks.
In progress: developing a standalone asynchronous fetch function (fetchQuery), not tied to React hooks.

### `APICalls.ts`

For direct usage, parameterized custom hooks from `graphQLClient.ts`, are available as Single query hook functions.

### `CategoryMenu.tsx` + `categoryLogic.ts`

This component handles category selection, allowing the user to browse items by category.
It uses an intermediate parallel category processing, which collects the names of all child categories at every level under the selected category, and based on this, displays all related items across all levels of the selected category.

### `ItemList.tsx`

This displays items from the selected category. Data is retrieved from QueryData.
The query format is intentionally concise to avoid overloading the system, as there are 4000+ items, each with extensive associated data.
The list includes several MUI components, most notably:

Paginator many details per item are displayed in collapsible panels, keeping the UI clean

ItemDetails (see below)

SearchBar (see below)

Accordion mostly displays simple text, so I had to override its parent component to improve layout.

Separating the ItemBaseDisplay for useMemo porpuse


### `ItemDetail.tsx`

Part of ItemList. This simple component receives an item ID and fetches its remaining data.
Currently, it renders a box-based layout to verify data integrity, and with hover will shows the deals for that

### `MUIHover.tsx`

I don't want to overload the detail view with too much information. I'd like to keep it simple yet effective. The idea is to display short tags per data group — for example, the number of barter-related items.
On hover, it will show the icons of those related items. For instance, the "Bottle of Water" item on the first page.
This logic will be generalized across other detailed data groups. The goal is to simplify rendering while improving clarity.

### `SearchBar.tsx`

As part of the search functionality, a SearchBar component was created.
It receives a delayed setter function from ItemList, which updates a keyword used for filtering the item list.

### `CountedItem.tsx`

Display the input / output items under each other with icon and name

### `Combination.tsx`

Display the Whole combination Input -> With -> Output. Makes the code and array clean

### `queryType.ts`

Contains all query and fragments for every GraphQL call used on the site, paired with adapters to process fetch results directly.  

### `responseType.ts`

Stores target type structures after Adapter processing.


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
For improved clarity and cleaner parameter handling, Single versions of the hooks were introduced. These are easier to call and reason about, without side effects or unnecessary parameter pollution.

Fetching roadmap:

- Basic local query execution with direct call and local state storage
- Introduction of a dynamic query object
- Addition of an adapter to handle varying data structures
- Transition to cache-based data storage and access
- Single versions

Later: At ItemDetails, I considered creating a regular fetch function (not a hook).
I ran into problems with fetchQuery, and I still don't fully understand the issue.
While ItemDetails may be more efficient as a hook, I still plan to implement the plain function version, just to learn from the process and understand how not to approach it.

