# Server

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Description

Here i use Nest.js with prisma. Provide you cloud mongo not to setup postgresql inside docker.

I implemented JWT (access and refresh) tokens auth.

Server api endpoints you can see with swagger.

You can seed routes in db using script in `prisma` directory

---

# Client

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Description

On the client i used next js as a framework, RTK, RTK query, axios for requests and interceptors. Tailwind and shadcn for styling. Zod for validation and type safety. RHF for ux with forms in the app.

---

## Notes

This project misses support for roles, and searching for train routes (tickets) based on waypoints. Also would be nice to make transfer support.

Anothe thing that is not here – panel or UI for admins, and user profile, though api endpoints for them alreadu exhist.
