## Degree project - Jira but better
This project was developed as part of my final degree project in Front End Development (400 YH) at Grit Academy.

## :pushpin: Overview
Designed as an agile project management tool, the application helps manage projects, organize tasks, and assign them efficiently. Inspired by Jira, it offers a straightforward and easy-to-navigate interface. 
The tech stack includes:
- Next.js
- Typescript
- Prisma
- PostgreSQL
- NextAuth
- ShadCN UI
- Tailwind CSS
- hello-pangea/dnd (drag-and-drop library).

## :sparkles: Features
- Task management: create, edit, and delete tasks with priority labels and rich text descriptions.
- User assignment: assign users to specific tasks.
- Boards & columns: create, rename, and delete both boards and columns.
- User authentication: register, log in, update password, and delete account.
- Dashboard: landing page showing latest projects and tasks assigned to the logged-in user.
- Drag-and-drop for moving tasks within and between columns.

## :rocket: Getting Started
Follow these steps to set up the project locally:

1. **Install dependencies:**
```bash
yarn install
# or
npm install
```

2. **Set up environment variables**
   
Create a `.env` file in the root directory with these variables:

```ini
# Required
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_SECRET="a_string"
NEXTAUTH_URL="http://localhost:3000"

```

3. **Run database migrations:**
```bash
npx prisma migrate dev
```

4. **Start the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **(Optional) Start Prisma Studio to inspect your database:**

```bash
npx prisma studio
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Live Demo

🔗 [https://jira-but-better.vercel.app/](https://jira-but-better.vercel.app/)

## Author

- [Andréa Jandergren](https://github.com/andjan3)
