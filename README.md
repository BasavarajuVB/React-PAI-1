Problem Statement
Read carefully and implement the solution

Problem Statement: Dynamic & Responsive Photo Gallery (By using React-Vite)
Objective
Build a single-page web application for a dynamic photo gallery that allows users to view, search, and manage a collection of images. The application should be fully responsive and leverage modern web development techniques.

Core Features
Responsive Layout: The gallery should display an aesthetic grid of images that adapts gracefully to different screen sizes (mobile, tablet, and desktop).
User Authentication: Implement a simple sign-in and sign-out functionality using Firebase Realtime-DB. Only authenticated users should be able to view and interact with the gallery.
Dynamic Gallery Display: Photos and their associated data (e.g., title, tags) must be fetched from a Firebase Realtime-DB. The gallery should update in real-time as new photos are added or existing ones are modified.
Live Search & Filtering: Create a search bar that filters the displayed photos by their title or tags as the user types. Implement debouncing to optimize the Firebase queries.
Dynamic Pagination & Sorting:
Implement infinite scroll to load photos in chunks as the user scrolls down, using Firebase's pagination capabilities.
Add a dropdown to sort the photos by title in ascending or descending order.
Advanced Interaction: Clicking on a photo should open a modal that displays a larger version of the image and its details.
Persisting State:
Use Firebase to persist the gallery data.
Use LocalStorage to persist the user's last-used sorting and filtering preferences, so they are remembered on subsequent visits.
Code Structure: Organize the application logic using JavaScript modules.
Deliverables
The github repo link of the parent folder of this specific problem statement .
