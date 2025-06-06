# IPT Final Project

A comprehensive React-based web application for managing organizational resources, including accounts, departments, employees, and requests. Built with modern web technologies and a focus on user experience.

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd ipt-final-2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at http://localhost:3000.

## Features

### Account Management
- User authentication and authorization
- Role-based access control
- Account status tracking
- User profile management

### Department Management
- Create and manage departments
- Track department descriptions and details
- View department-specific information
- Department-wise employee organization

### Employee Management
- Comprehensive employee profiles
- Department assignment
- Position tracking
- Employee status management
- Detailed employee information storage

### Request Management
- Equipment request handling
- Leave request processing
- Request status tracking (Pending, Approved, Disapproved)
- Request history
- Multi-item request support
- Request approval workflow

## Technical Features

- **Modern UI/UX**: Built with Material-UI for a professional and responsive interface
- **Type Safety**: Full TypeScript implementation for robust development
- **State Management**: Efficient local state management using React hooks
- **Data Persistence**: Local storage-based data management
- **Responsive Design**: Mobile-friendly interface
- **Pagination**: Efficient data display with pagination support
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Robust error management system

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── services/      # Business logic and data services
└── types/         # TypeScript type definitions
```

## Technologies Used

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **Development Tools**: 
  - Create React App
  - ESLint
  - Jest for testing

## Development

- **Code Style**: Follows TypeScript best practices
- **Component Architecture**: Modular and reusable components
- **State Management**: React hooks for local state
- **Type Safety**: Strict TypeScript configuration

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
