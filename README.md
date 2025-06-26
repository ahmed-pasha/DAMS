# DAMS
Digital assets management system.
# DAMS (Digital Assets Management System)

## Project Overview
DAMS is a comprehensive Digital Assets Management System designed to facilitate secure storage, management, and sharing of digital assets. The system features user authentication, asset upload and management, payment integration, and a responsive frontend built with modern web technologies.

## Features
- User registration, login, and profile management
- Secure file upload and management of digital assets
- Payment gateway integration for premium features or asset purchases
- Responsive and intuitive user interface
- Role-based access control and protected routes
- Real-time asset display and management dashboard

## Technology Stack
- Frontend: React 19, TypeScript, React Router DOM
- Backend: Node.js, Express.js
- Styling: Tailwind CSS (inferred from tailwind.config.js presence)
- Database: (Not explicitly mentioned, but likely MongoDB or similar based on typical Node.js stack)
- Other: File upload middleware, payment processing controllers

## Installation

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Database setup (if applicable, configure in server/config/db.js)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CDAC_project
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd CDAC_project/server
   npm install
   cd ..
   ```

3. Configure environment variables:
   Create a `.env` file in the `server` directory and add necessary configuration such as database connection strings, payment gateway keys, and JWT secrets.

## Running the Project

### Backend
From the `server` directory, start the backend server:
```bash
npm start
```
or
```bash
node index.js
```

### Frontend
From the root project directory, start the frontend development server:
```bash
npm run dev
```
This will launch the React app, typically accessible at `http://localhost:3000`.

## Project Structure

```
CDAC_project/
├── src/                    # Frontend source code (React components, pages, context)
├── server/                 # Backend source code (controllers, routes, middleware, models)
├── public/ or index.html   # Frontend entry HTML
├── package.json            # Frontend dependencies and scripts
├── server/package.json     # Backend dependencies and scripts (if separate)
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## API Endpoints (Brief Overview)
- `/api/users` - User registration, login, profile management
- `/api/assets` - Asset upload, retrieval, and management
- `/api/payments` - Payment processing routes

Refer to the backend `server/routes` and `server/controllers` for detailed API implementation.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure code quality and add tests where applicable.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or support, please contact the project maintainer at ahmedrys007@gmaim.com

