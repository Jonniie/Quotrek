# Quotrek - Travel Tracker

Quotrek is a React-based travel tracking application that allows users to log their travel experiences, track visited cities, and visualize their journeys on an interactive map. The app integrates Clerk for authentication and Supabase for data storage, ensuring a secure and seamless user experience.

---

## Features

- **User Authentication**: Secure login and signup functionality powered by [Clerk](https://clerk.dev).
- **Dynamic Navigation**: Navigation adapts based on user authentication state.
- **City Tracking**: Add, view, and manage cities you've visited.
- **Country Overview**: Explore countries based on your travel history.
- **Interactive Map**: Visualize your travel history on a map.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Custom Styling**: Styled with CSS modules for scoped and maintainable styles.

---

## Tech Stack

- **Frontend**: React, React Router
- **Authentication**: Clerk
- **Database**: Supabase
- **Styling**: CSS Modules
- **Build Tool**: Vite

---

## Project Structure

```
src/
├── assets/               # Static assets (e.g., images, fonts)
├── components/           # Reusable UI components
├── pages/                # Page-level components
├── data/                 # Static data (e.g., JSON files)
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
├── index.css             # Global styles
├── App.css               # App-specific styles
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jonniie/quotrek.git
   cd quotrek
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`.

---

## Usage

### Authentication

- Users can sign up or log in using the Clerk-powered authentication system.
- After logging in, users are redirected to the `/app` route.

### City Tracking

- Add cities you've visited, along with notes and travel dates.
- View your travel history in a list or on an interactive map.

### Navigation

- The navigation bar dynamically updates based on the user's authentication state:
  - **Logged Out**: Links to "Login" or "Signup".
  - **Logged In**: Links to "Dashboard".

---

## Deployment

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider (e.g., Vercel, Netlify).

3. Ensure the environment variables are configured in your hosting platform.

---

## Environment Variables

| Variable                     | Description                              |
| ---------------------------- | ---------------------------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for authentication |
| `VITE_SUPABASE_URL`          | Supabase project URL                     |
| `VITE_SUPABASE_ANON_KEY`     | Supabase anonymous key                   |

---

## Key Components

### `App.jsx`

- Defines the main routes of the application using `react-router-dom`.

### `PageNav.jsx`

- Dynamic navigation bar that adapts based on the user's authentication state.

### `Login.jsx`

- Handles both login and signup functionality using Clerk's `SignIn` and `SignUp` components.

### `AppLayout.jsx`

- Main dashboard layout that integrates the sidebar, map, and user data.

### `SideBar.jsx`

- Displays user information, navigation links, and a list of tracked cities.

---

## Styling

- **CSS Modules**: Scoped styles for each component to avoid class name conflicts.
- **Global Variables**: Defined in `index.css` for consistent theming.
- **Custom Fonts**: Includes the `Qurova` font for branding, defined in `Logo.module.css`.

---

## Dependencies

### Core

- `react`: Frontend library
- `react-router-dom`: Routing
- `@clerk/clerk-react`: Authentication
- `@supabase/supabase-js`: Database integration

### Dev Tools

- `vite`: Build tool
- `eslint`: Linting

---

## Future Enhancements

- Add support for uploading images for each city.
- Implement social sharing for travel logs.
- Add analytics to track user activity and travel trends.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [Clerk](https://clerk.dev) for authentication.
- [Supabase](https://supabase.com) for database services.
- [Leaflet](https://leafletjs.com) for map integration.

---
