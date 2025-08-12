# Tarkony - 2025.08.01

## In progress:

ExpressJS - Backend, is currently being developed to handle GraphQL data, perform data testing, store data in the database, and serve the frontend to avoid unnecessary API calls to the source on every frontend request.

## Repository

This repository represents the monolithic repository that handles the entire multi-repo system. Modules like react-frontend and express-backend work as multi-repos to avoid managing every change directly in the main monolith.

Muti-repos:
[React, Typescript, Material UI, Tanstack - Frontend Git Repo](https://github.com/Sz-Daniel/Tarkony-react-frontend)
[NodeJS / ExpressJS - Backend Git Repo](https://github.com/Sz-Daniel/Tarkony-express-backend)

## Future

The current focus of the project is to stabilize the core functionality: listing items on the main page and displaying detailed information on a single item view. The “Worth” and “Modding” pages are currently on hold, but are intended for future development. These sections will provide additional value and depth to the project once the core architecture is stabilized.

A separate backend will be developed to handle the external data source. Instead of fetching data on each render, the backend will retrieve and store the data in a local database. The frontend will then access the data via a dedicated REST API.

A long-term goal is to implement multiple, independent backend versions using different technology stacks (e.g., Express.js, .NET, Laravel). The purpose is to practice and demonstrate backend logic replication across various programming environments while maintaining functional parity.

Each backend stack will be maintained in its own repository (multi-repo structure), while a central monorepo will coordinate shared infrastructure components—such as user management, deployment logic, and stack-routing functionality.

The project will include a containerized (Docker-based) CI/CD pipeline, ensuring streamlined and independent deployment for each backend stack. The overall goal is to create a complex yet maintainable architecture that supports technological flexibility and scalability.

## Guide

### About Game

This is a first-person shooter multiplayer game with extremely complex mechanics, such as looting, bartering, detailed weapon structures, ballistic and armor systems, and a character skill system.

### About Site

The website related to the Escape from Tarkov game aims to provide quick and easily accessible information about in-game items. This includes, for example, current selling prices, as well as concise key data such as prices from other traders and the role of items in barter crafting or quests. In the future, I plan to enable users to assess whether it is worthwhile to invest in a particular item based on additional crafting or barter connections. Additionally, a separate module will be available to compare the values and performance of weapon mods.

On the main page, all on-hand items are listed first.

Displayed categories are top-level categories; by selecting them, the user is taken to the subcategories. For each selected category, all items within its subcategories are also displayed.

Each item has a dropdown data field that displays additional necessary information. ~~and when hovering over these data points, related items are also shown — for example, what the given item can be bartered for~~ By tabs the usre can choose which type of information want to see

In the detailed data section, there's an All Data button that redirects the user to the selected item's separate page, where all of its data is accessible.

## Overview

As a junior developer, I find it essential to maintain a **Junior Journal (JJ)** — a disciplined practice of detailed commenting, continuously updating the README, and logging any replaced methods or solutions. This helps track progress and decisions transparently.

---

## Project Description

**Tarkony** is a tool related to the online shooter game _Escape From Tarkov_. It provides:

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
│   │   ├── adapters/
│   │   │   ├── adapters.ts
│   │   │   ├── itemsAdapter.ts
│   │   │   ├── ItemSingleAdapter.ts
│   │   │   └── worthAdapter.ts

├── index.html
└── README.md
```

## Junior Journal

Right from the start, I want to emphasize an important experience. As a junior, I considered it essential to thoroughly understand how LLM works. At first, I used ChatGPT to get familiar and experiment with how I can use it as an aid. However, it has often been more of a hindrance so far. Gradually, I reduced its usage and only sought guidance from it. Often, I deliberately did not put it aside, but I encountered many problems and lost a lot of time because of it. I did gain experience, though, and the final result was always the same: among its suggestions, there were some good functions worth seeing, but when I wrote the code myself, it was much shorter and worked more efficiently — the best example is the React Frontend Category (see below: Categorical problems).
