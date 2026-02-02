# Search user data webapp

This is the implementation of a Single Page Application that allows to enter user data and search for existing user data. 

It is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Design
The following technologies were selected to create this app:
* React - to go with the developer's familiarity.
* Next.js / TypeScript - as it is a common modern and supported framework to support React apps.
* MaterialUI - as the main UI library because it provides a number of flexible components.

## Initial setup

Ensure Node.js was installed, following the instructions in the [main ReadMe file](../ReadMe.md).

Install the dependencies with:
```bash
npm install
```

## Running the web app

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running the tests

Unit tests were create to validate the component content.
They cover basic behaviour and would benefit from being extended, in particular of the SearchForUserData component that has more complex behaviour, in particular with autocompletion.
This was left out due to time constraints.

They can be run with:
```bash
npm test
```