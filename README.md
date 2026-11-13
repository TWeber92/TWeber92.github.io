# portfolio-v2

A multi-backend portfolio runtime. Six live services, one frontend carousel, zero build-step frameworks.

**Live:** [TWeber92.github.io](https://TWeber92.github.io)

---

## What this is

Most portfolios are a static site with a few screenshots. This one is a **runtime** — a carousel that assembles each project's UI on demand, caches it in a DOM-based virtual database, and keeps the visuals in sync with live backends through a shared repository/service contract.

Each project is a different backend stack (Spring Boot, Maven, PostgreSQL-backed Spring Security, Java/Spring, Cloudflare Workers) with its own cold-start profile, DTO shape, and CRUD semantics. The frontend treats them uniformly through a small set of inherited primitives.

---

## Architecture at a glance

```text
ProjectService (contract)
 ├─ AuthorsNovelsService  → AuthorsNovelsRepository  → Render (Spring Boot + Postgres)
 ├─ MavenLibraryService   → MavenLibraryRepository   → Render (Java/Maven)
 ├─ CabBookingService     → CabBookingRepository     → Render (Spring Boot)
 └─ ...                   → ...                      → Cloudflare Workers (schema/cache)
```

### The execution flow

Events do not bind directly to components. The app uses a delegated event routing system to keep the DOM tree decoupled from business logic:

```text
EventRegister (global listeners)
  ↓
index.js (routes by node id and listener type)
  ↓
Specific Handler
  ↓
Controller (orchestrates request/response)
  ↓
Service (inherits ProjectService contract)
  ↓
Repository (DOM cache or network)
  ↓
Client (API or Browser)
```

### The seam

Every service inherits the same primitives — `handleTerminal`, `putTableTogether`, `putRowIntoTable`, `getRowByColumnValue`, `deleteRowFromTable` — and only differs in DTO→schema mapping and endpoint calls. Adding a backend means writing **one repo and one service**. The base doesn't change.

### The store

The DOM *is* the database. `#entity[key]` holds each assembled project. `DocumentClient` provides `GET` / `PUT` / `DELETE` over cached nodes. Mutations happen in place; the terminal shows raw API responses alongside the synced canvas.

### The network

| Layer | Provider | Role | Cold start |
|---|---|---|---|
| Schema | Cloudflare Workers | Serves table shapes | ❌ none |
| CRUD | Render (Spring Boot, Java/Maven) | Live data operations | ✅ yes |
| Cache | In-memory `#entity` | Assembled projects | — |

The frontend caches assembled projects so slide-switching is a node swap, not a refetch.

---

## Working projects (5 of 7)

| Project | Stack | Highlights | Status |
|---|---|---|---|
| **Authors & Novels** | Spring Boot + Postgres | CRUD, cascade delete, nested DTOs | ✅ |
| **Maven Library** | Java/Maven + Postgres | Members, books, FK traversal | ✅ |
| **Cab Booking** | Spring Boot + Postgres | Booking flow, live availability mutation | ✅ |
| **Spring Security** | Spring Boot + Postgres | Customer CRUD | ✅ |
| **Coin Collection** | Cloudflare Workers | External API consumer | ✅ |
| Two more | — | — | 🚧 in progress |

---

## Why it's built this way

> **Inheritance for contract, not sharing.**
> Six backends, one set of primitives. The base enforces the response gate and DOM-write patterns so no service can drift.

> **DTOs as schema mappers.**
> Each backend's response shape maps to a table schema in one place — `AuthorsNovelsDTO`, `MavenLibraryDTO`. Hibernate for the DOM.

> **DOM as persistence.**
> No client-side framework, no state library. The canvas *is* the state, and the seams (`#entity`, `DocumentClient`) make it addressable.

---

## Known trade-offs

- ⚠️ **Cold starts on Render are real** — the cache layer exists because of them.
- ⚠️ **DTO mapping is per-project** — the abstraction stops at *shape → schema*, which is where the real variation lives.
- ⚠️ **Two projects still in progress** — the carousel handles a not-yet-ready project gracefully.

---

## Run locally

Static HTML / CSS / JS. No build step. No bundler. The browser is the runtime.

```bash
npx serve .
```

or

```bash
python3 -m http.server
```

Then open `http://localhost:3000` (or `:8000`).

---

## Repository Layout

```text
TWeber92.github.io/
├── assets/
├── src/
│   ├── weber-profile-client/       # API, Browser, and Document clients
│   ├── weber-profile-controller/   # Orchestrates request/response
│   ├── weber-profile-dto/          # Response -> DOM Schema mappers
│   ├── weber-profile-entity/       # Project, Carousel, Header models
│   ├── weber-profile-enum/         # Routes, BaseUrls, Assets
│   ├── weber-profile-exception/    # Custom error handling
│   ├── weber-profile-repository/   # DOM cache and network routing
│   ├── weber-profile-service/      # Business logic (inherits ProjectService)
│   ├── weber-profile-utility/      # Logger
│   ├── weber-profile-validation/   # Form validators
│   ├── weber-profile-view/         # ProjectView, EventRegister, HtmlStore
│   ├── styles/                     # carousel.css, header.css, project.css, index.css
│   ├── weber-profile-functions/    # Global event handlers (post, update, etc.)
│   ├── Application.js
│   ├── EventRegister.js
│   ├── HtmlStore.js
│   ├── View.js
│   └── index.js                    # Entry point and event router
└── tests/
```

---

<p align="center"><em>Six backends. One carousel. No framework.</em></p>