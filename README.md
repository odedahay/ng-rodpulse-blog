# Multi-Blog Website

A modern blog platform built with Angular, designed for creating, editing, and viewing blog posts. The project demonstrates best practices in Angular development, modular architecture, and user authentication.

## Tech Stack

- **Frontend Framework:** Angular
- **Banckend:** Firebase / Firestore
- **Language:** TypeScript
- **Styling:** CSS, PostCSS
- **Package Management:** npm

## Features

- User authentication (login, logout, register)
- Create, edit, and view blog posts
- Dashboard with statistics
- Responsive navigation bar with logged-in/logged-out states
- Modular and scalable code structure

## Project Structure

```
ng-rodpulse-blog/
├── src/
│   ├── app/
│   │   ├── core/         # Core modules, services, guards, helpers
│   │   ├── features/     # Feature modules (dashboard, home, post, user)
│   │   ├── shared/       # Shared services and components
│   │   └── app.*         # Root app files
│   ├── environments/     # Environment configs
│   └── assets/           # Static assets (images, icons)
├── angular.json          # Angular CLI config
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher)

## License

This project is licensed under the MIT License.
