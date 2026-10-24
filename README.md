# Angular restaurant frontend

The Angular 6 frontend for L’Étoile presents restaurant content in a structured, Material-inspired interface with a teal palette. It has its own design language while using the same live API and reservation capacity as the React application.

## Pages

- `/home` — restaurant overview and featured content.
- `/menu` — API-backed menu and categories.
- `/dishdetail/:id` — dish details.
- `/about` — team profiles.
- `/contactus` — guest contact and feedback.
- `/reservations` — live seating availability and reservation requests.

Angular Router handles navigation; Angular services retrieve menu, team, reviews and reservation data from the Express API.

## Runtime requirement

This is an Angular 6 / Angular CLI 6 project using `node-sass@4.14`. Use Node.js 12.22.12 for local development; current Node releases are not compatible with this legacy toolchain. The root launcher locates the portable Node 12 runtime and starts the app at http://localhost:4200:

```powershell
..\scripts\start-angular.ps1
```

For a fresh checkout, install dependencies while using Node 12:

```powershell
npm install
node node_modules/@angular/cli/bin/ng serve --host 127.0.0.1
```

The full Windows runtime and database setup is documented in the [root setup guide](../LOCAL_SETUP.md). Start MongoDB and the API before using data-backed pages.

## API connection

`src/app/shared/baseurl.ts` configures the API base URL. In the workspace it points to `http://localhost:8002/`. The backend defaults to port 8000 outside this local setup.

This app reads shared resources including `/dishes`, `/leaders`, `/promotions`, `/comments`, `/restaurant/overview`, and `/reservations/availability`. Reservation form submissions create pending requests, not instant confirmations.

## Scripts

- `npm start` — start the Angular development server (use Node 12).
- `npm run build` — build the application (use Node 12).
- `npm test` — run unit tests.
- `npm run lint` — run TSLint.

## Design direction

The Angular app intentionally uses a distinct, component-oriented and Material-inspired presentation. It shares backend data and behavior with React without duplicating React's editorial styling.
