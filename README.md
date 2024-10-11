# User List
This SPA fetches user data from [jsonplaceholder](https://jsonplaceholder.typicode.com/users) and displays user information in cards.

## Features
- **User Cards:** each card showcases a user's name, email address and profile picture.
- **Profile Pictures:** images are sourced from [Gravatar](https://docs.gravatar.com/api/avatars/images/). If a user hasn't uploaded a profile picture, Gravatar generates a unique themed image based on the user's email address.
- **Client-Side Filtering:** search for users by name through a computed property that filters the user list.
- **Pagination:** implemented using [PrimeVue Paginator](https://primevue.org/paginator/), allowing for navigation through the user list. Options for items per page are dynamically calculated based on the total number of users to display.
- **Loading State:** a loading spinner is displayed while user data is being fetched.
- **Image Loading State:** skeleton loaders are shown until profile images are fully loaded, enhancing the user experience.
- **User Detail Popup:** when a user card is clicked, a popup displays detailed information about the selected user.

## Technologies Used
`Vue` `TypeScript` `Vite` `Tailwind CSS`

## Installation
To run this application locally:

1. Clone the repository:  
`git clone <repository-url>`
2. Navigate to the project directory:  
`cd <project-directory>`
3. Install the dependencies:  
`npm install`
4. Start the application:  
`npm run dev`

# Vue 3 + TypeScript + Vite

The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
