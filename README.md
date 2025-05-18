As a junior, it's important for me to maintain something like a 'JJ' – a Junior Journal – which includes detailed commenting, continuously updating the README, and logging any methods or solutions that get replaced along the way

"Tarkony"
It's related to an online shooter game, Escape From Tarkov.
Real-time item prices for both flea market and vendors. 
Vendor availability
Crafting cost analysis: Comparing crafting cost vs purchase cost
Price-to-value rankings for armors and weapon
Weapon Permutation builder
Access to the site will be restricted via a minimalist login system, due gaming cultural reasons

API Source - GraphQL
[https://tarkov.dev/api/](https://tarkov.dev/api/)

```bash
Tarkony
├── public/
├── src/
│ ├── api/
│ │ ├── graphQLClient.ts
│ │ └── query.ts
│ ├── devtools/
│ │ └── dataShow.tsx
│ ├── App.tsx
│ └── type.ts
├── index.html
└── README.md
```

Query.ts
It contains the fragmens for every call the page actual use. It builds the Queries with a generator and every time whe it's expanded with a new fragment the container need to updates manually.

graphQLClients.ts
Process logic happen here, using Axios, using the preRendered queries and dinamically easy to use async fetchGraphQL('FragmantName')

dataShow.tsx
Just a simple Component page to testing the fetching. 