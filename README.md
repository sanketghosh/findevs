<div align="center">
<h1>findevs</h1>
<p>Findevs is a developer-focused job board connecting tech talent with companies, offering curated job listings, advanced filters, and seamless application management.</p>
</div>

---

<div align="center">
  <br />
    <a href="https://github.com/sanketghosh/findevs" target="_blank">
      <img src="https://github.com/sanketghosh/findevs/blob/main/public/findevs.png" alt="Project Banner">
    </a>
  <br />
</div>

---

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs" height="40" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=prisma" height="40" alt="prisma logo"  />
</div>

<div align="center">
  <br />
    <a href="https://github.com/sanketghosh/findevs" target="_blank">
      <img src="https://github.com/sanketghosh/findevs/blob/main/public/findevsdemo.png" alt="Project Banner">
    </a>
  <br />
</div>

###

</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

**Findevs** is a specialized job board designed exclusively for developers. It bridges the gap between talented developers and companies looking for skilled professionals. Whether you're a developer searching for your next opportunity or a company seeking top-tier tech talent, Findevs provides a streamlined platform tailored to the tech industry.

Findevs leverages the power of **Next.js** for lightning-fast performance and seamless navigation, while **Bun** and **PostgreSQL** provide a robust backend to manage job postings and applications. The app's modern design, powered by **Shadcn UI** and **TailwindCSS**, ensures an intuitive and developer-friendly user experience.

## <a name="tech-stack">Tech Stack</a>

- **Framework**: Next.js, TypeScript, TailwindCSS, Shadcn UI
- **Database**: PostgreSQL
- **Authentication**: BetterAuth
- **ORM**: Prisma
- **Deployment**: Vercel (Frontend), Bun (Backend)

## <a name="features">Features</a>

- **Developer-Focused Job Listings**: A curated platform exclusively for developer roles, including full-time, freelance, and remote opportunities.
- **Advanced Search and Filters**: Search for jobs based on programming languages, frameworks, experience levels, and more.
- **Job Posting for Employers**: Employers can post job openings with detailed descriptions, requirements, and company details.
- **Responsive Design**: Optimized for all devices to ensure seamless job browsing and posting, whether on desktop or mobile.
- **User Authentication**: Secure sign-up and login using industry-standard authentication methods.
- **Job Application Management**: Track job applications easily with a user-friendly dashboard.
- **Bookmark Jobs**: Save favorite job postings to revisit them later.
- **Scalability**: Designed to handle a large volume of job listings and user traffic effortlessly.
- **Admin Panel**: Manage job approves, rejection, deletion etc.

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)
- [PostgreSQL](https://www.postgresql.org/)

**Cloning the Repository**

```bash
git clone https://github.com/sanketghosh/findevs.git
cd findevs
```

**Installing Dependencies**

Install all the project dependencies using Bun:

```bash
bun install
```

**Setup environment variables**
Create a new file named `.env` in the root directory and add the following content:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/findevs
BETTER_AUTH_SECRET=<secret_key>
BETTER_AUTH_URL=http://localhost:3000
```

Generate a key using this command:

```bash
openssl rand -hex 64
```

**Prisma Setup and Schema Migration**

Run the following commands to initialize the database and apply schema migrations:

```bash
bun prisma generate
bun prisma migrate dev --name init
```

To visualize and edit your data, you can use Prisma Studio:

```bash
bun prisma studio
```

**Running the Application**
Start the development server:

```bash
bun run dev
```

Open `http://localhost:3000` in your browser to view the project.

Your application is now up and running!
