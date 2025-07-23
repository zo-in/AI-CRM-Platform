# AI-Powered Sales CRM (Backend)

This is a Node.js + Express backend for a Sales CRM system powered by AI.  
It extracts customer preferences, objections, and patterns from sales notes using OpenRouter's API.

## Features

- Customer and Interaction Management (CRUD)
- AI Memory Consolidation (preferences, objections, buying signals)
- Deal Pipeline with stage tracking
- Activity logs for updates and actions
- Soft delete support
- Prisma + PostgreSQL with full schema

## AI Integration

Uses OpenRouter API with DeepSeek model to extract structured customer insights.

---

## Tech Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- OpenRouter (LLM API)
- Postman (for testing)

---

## Project Structure

```
src/
├── controllers/       # Handle request logic
├── routes/            # Define RESTful routes
├── services/          # Business logic and DB access
├── utils/             # Memory scoring and helpers
├── models/prismaClient.js
prisma/
├── schema.prisma      # Database schema
```

---

## Setup Instructions

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd your-repo
npm install
npx prisma migrate dev --name init
npx prisma studio   # Optional: to view DB
npm run dev
```

Create a `.env` file with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_crm"
OPENROUTER_API_KEY="sk-..."
```

---

## Postman Test Collection

All endpoints are testable via Postman:

- `POST /customers`
- `POST /interactions`
- `POST /interactions/:id/ai-summarize`
- `GET /interactions/memory/:customerId`
- `POST /deals`, `PUT /deals/:id`, `DELETE /deals/:id`
- `GET /activity`
- `GET /customers/search/query?q=name`

---

## Memory Logic

- Extracted from interaction notes via OpenRouter
- Stored as type: `preference`, `objection`, etc.
- Merged with conflict resolution:
  - Combines `confidence + recency` into a score
  - Keeps most relevant and trustworthy data

---

## Activity Tracking

All updates to customers and deals are logged:

- `customer_update`, `deal_stage_change`, etc.
- Query via `GET /activity`

---
