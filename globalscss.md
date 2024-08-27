//Backup globals.css with cool comic book look to website want to keep this 

/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Root variables for consistent color usage */
:root {
  --foreground-rgb: 0, 0, 0;
  --background-color: #f0f0f0; /* Light grey background */
  --input-background-color: #ffffff; /* White for input fields */
}

/* General body styling */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  color: rgb(var(--foreground-rgb)) !important;
  background-color: var(--background-color) !important;
}

/* Specific overrides for form elements and modals */
.modal, .form, .input, .textarea, .dropdown-menu, .dropdown-content {
  background-color: var(--background-color) !important;
  color: rgb(var(--foreground-rgb)) !important;
}

input, select, textarea, button {
  background-color: var(--input-background-color) !important;
  color: rgb(var(--foreground-rgb)) !important;
  border: 1px solid rgb(var(--foreground-rgb)) !important;
}

/* Force dark mode to be ignored */
@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-color: #f0f0f0;
    --input-background-color: #ffffff;
  }
  html, body {
    color: rgb(var(--foreground-rgb)) !important;
    background-color: var(--background-color) !important;
  }
  .modal, .form, .input, .textarea, .dropdown-menu, .dropdown-content {
    background-color: var(--background-color) !important;
    color: rgb(var(--foreground-rgb)) !important;
  }
  input, select, textarea, button {
    background-color: var(--input-background-color) !important;
    color: rgb(var(--foreground-rgb)) !important;
    border: 1px solid rgb(var(--foreground-rgb)) !important;
  }
}