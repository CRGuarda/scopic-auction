# Scopic Auction

Built with NextJS with no RSC using (just REST API). Using SQLite for database, the DB is filled with dummy antiques items. There are random images for the items but generated with a seed. This project can be refactored using RSC and more love.

## Credentials

Can logged in using this credentials: ( name | password )

- user1 | user1
- user 2 | user2
- admin1 | admin1
- admin2 | admin2

## Installation

Run the project in local. This example uses `npm`

Open the repo and follow this instructions:

First need to install the packages used:

```bash
  npm install
```

And run to start the server:

Development server:

```bash
  npm run dev
```

Production version

```bash
  npm run build
```

## Drizzle ORM scripts

There are 3 scripts in `package.json`. This scripts are just for development according to the [docs](https://orm.drizzle.team/). This app is already fill with more than 20 dummy items for test purposes. Don't need to run any of this drizzle scripts already.

```bash
  "drizzle:generate": "drizzle-kit generate",
  "drizzle:migrate": "drizzle-kit migrate",
  "drizzle:studio": "drizzle-kit studio"
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AUTH_SECRET`

This ensure encryption for the client jwt. Can be any string.
