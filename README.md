## Degree project - Jira but better
This project was developed as part of my final degree project in Front End Development(400 YH) at Grit Academy.

## Overview
This application is designed as an agile project management tool to help organize projects and assign tasks efficiently. Inspired by Jira, it offers a straightforward and easy-to-navigate interface. 
The tech stack includes Next.js, Prisma, PostgreSQL, NextAuth, ShadCN UI and Tailwind CSS.

## Features
- Task management: create, edit, and delete tasks with priority labels and rich text descriptions.
- User assignment: assign users to specific tasks.
- Boards & columns: create, rename, and delete both boards and columns.
- User authentication: register, log in, update password, and delete account.
- Dashboard: landing page showing latest projects and tasks assigned to the logged-in user.

## Getting Started
1. **Install dependencies:**
```bash
yarn install
# or
npm install
```

2. **Run database migrations:**
```bash
npx prisma migrate dev
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **(Optional) Start Prisma Studio to inspect your database:**

```bash
npx prisma studio
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 🌐 Live Demo

🔗 [https://jira-but-better.vercel.app/](https://jira-but-better.vercel.app/)

## Author

- [Andréa Jandergren](https://github.com/andjan3)
