# Laravel & React Project

This is a full-stack project built with Laravel for the backend and React for the frontend. Below you will find instructions on how to set up and run the project locally, along with explanations of the design decisions and trade-offs made during development.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Design Decisions](#design-decisions)
- [Trade-offs](#trade-offs)

---

## Requirements

To run this project, you will need the following dependencies:

- PHP >= 8.1
- Composer
- Laravel >= 9.x
- MySQL (or another database supported by Laravel)
- Node.js & npm
- Git
- React (for the frontend)

## Installation

### Backend (Laravel)

1. **Clone the repository**:

    
    git clone https://github.com/Afsalbro/blog.git
    cd blog-backend

2. **Install PHP dependencies**:

    Run the following command to install all Laravel dependencies via Composer:

    
    composer install
    

3. **Set up environment variables**:

    Copy the `.env.example` file and create your own `.env` file:

    
    cp .env.example .env
    

    Update your `.env` file to include your database credentials:

    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    

4. **Generate an application key**:

    Laravel requires an application encryption key. Run this command to generate one:

    
    php artisan key:generate
    

5. **Run database migrations**:

    Migrate the database tables by running:

    
    php artisan migrate

6. **Run database seed**:

    Run the following command for seed:
    
    php artisan db:seed UserSeeder

### Frontend (React)

1. **Navigate to the frontend directory** (if the React app is in a separate folder like `/frontend`):

    
    cd blog-frontend
    

2. **Install Node.js dependencies**:

    Install the front-end dependencies via npm:

    
    npm install
    

3. **Run the React development server**:

    Start the React app in development mode:

    
    npm start
    

    By default, the React app will be accessible at `http://localhost:3000`.

### Running Laravel & React Together

1. **Start the Laravel development server**:

    In the root of your Laravel project (not the frontend directory), run:

    
    php artisan serve
    

    This will start the Laravel server at `http://localhost:8000`.

2. **API Integration**:  
   The React frontend will communicate with the Laravel backend API. Ensure that API routes in Laravel (defined in `routes/api.php`) match the endpoints used in your React application.

## Running the Project

1. **Laravel**:

    Visit `http://localhost:8000` to view the Laravel backend (API and any server-rendered pages).

2. **React**:

    Visit `http://localhost:3000` to view the React frontend.

## Design Decisions

### Backend (Laravel)

1. **Framework Choice (Laravel)**:  
   Laravel was chosen for its robust backend framework, featuring powerful routing, middleware, and ORM (Eloquent). It also simplifies the development process with built-in authentication and API management.

2. **Database (MySQL)**:  
   MySQL was selected for its scalability and ease of integration with Laravel. Eloquent ORM is used to manage database interactions in an efficient, object-oriented manner.

3. **API-First Architecture**:  
   The backend follows an API-first approach, exposing routes for use with the React frontend through RESTful endpoints. This allows for greater flexibility and separation of concerns.

### Frontend (React)

1. **React for SPA**:  
   React was chosen as the frontend framework due to its component-based architecture and ability to create dynamic, fast, and interactive single-page applications (SPAs). This enhances the user experience and offers seamless transitions between pages.

2. **State Management**:  
   Local state is managed using React's `useState` and `useEffect` hooks for simplicity. If the project grows, a more complex state management library like Redux could be introduced.

3. **Component Reusability**:  
   Components were designed to be reusable, such as form components for creating and updating blog posts, and cards for displaying blog posts.

### Integration Between Laravel & React

1. **Backend API**:  
   Laravel provides RESTful endpoints for handling blog posts, user authentication, and other CRUD operations. React makes API calls using the Fetch API or Axios to communicate with the Laravel backend.

2. **Frontend-Backend Separation**:  
   Laravel serves as a pure API, while React handles all the UI/UX on the client side. This separation of concerns ensures that the frontend can easily scale independently from the backend.

## Trade-offs

1. **Monolithic vs Microservices**:  
   While this project is a monolithic structure, dividing the frontend (React) and backend (Laravel) into separate services provides better scalability. However, the current setup may be limited in terms of microservices architecture.

2. **Session vs Token-Based Authentication**:  
   The choice between session-based and token-based (Sanctrum) authentication was considered. For simplicity, Laravel's built-in session-based authentication was used, but in larger projects, Sanctrum might be a better choice for a full SPA.

3. **Development Time vs Complexity**:  
   While Laravel Mix (or Vite) could be used to combine the frontend and backend into a single deployment pipeline, separating React and Laravel completely helps reduce complexity but may require additional setup for production.

---

## License

This project is licensed under the MIT License.
