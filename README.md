# Mini-HRMS-System

A Human Resource Management System where administrators can manage employee information, salary details, attendance records, and payroll processing efficiently.

## 📋 Features

- **Employee Management** - Add, edit, and delete employee records
- **Salary Management** - Manage salary details including basic pay, allowances, and deductions
- **Attendance Tracking** - Record and track employee attendance
- **Payroll Processing** - Generate and manage monthly payroll with net salary calculations
- **Dashboard** - View key metrics including total employees, active employees, on-leave employees, and total monthly payroll
- **Search & Filter** - Quick search functionality across all modules

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MySQL** (v5.7 or higher) or any compatible SQL database

## 📥 Installation Guide

### 1. Clone/Download the Project

```bash
cd Mini-HRMS-System
```

### 2. Backend Setup

#### Step 1: Navigate to Backend Directory

```bash
cd backend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Environment Configuration

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=8800
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=minihrms
```

#### Step 4: Database Setup

- Create a MySQL database named `minihrms`
- Update the database credentials in `.env` file

#### Step 5: Import SQL Data

To import the provided SQL file with sample data:

**Using MySQL Command Line:**

```bash
mysql -u root -p minihrms < path/to/database.sql
```

**Using MySQL Workbench:**

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to `Server` → `Data Import`
4. Select the SQL file from the project
5. Choose `minihrms` as the default target schema
6. Click `Start Import`

**Using phpMyAdmin:**

1. Open phpMyAdmin in your browser
2. Select the `minihrms` database
3. Click the `Import` tab
4. Choose the SQL file
5. Click `Go` to import

#### Step 6: Start Backend Server

```bash
npm start
```

The backend server will run on `http://localhost:8800`

### 3. Frontend Setup

#### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Environment Configuration

Create a `.env` file in the `frontend` folder:

```
REACT_APP_API_URL=http://localhost:8800
```

#### Step 4: Start Frontend Application

```bash
npm start
```

The frontend will open in your browser at `http://localhost:3000`

## 🚀 Running the Application

1. **Start Backend** (in backend directory):

   ```bash
   npm start
   ```

2. **Start Frontend** (in frontend directory):

   ```bash
   npm start
   ```

3. Access the application at: `http://localhost:3000`

## 📁 Project Structure

```
Mini-HRMS-System/
├── backend/
│   ├── CONTROLLER/       # Business logic controllers
│   ├── MODEL/            # Database models
│   ├── ROUTE/            # API routes
│   ├── index.js          # Server entry point
│   ├── dbConfig.js       # Database configuration
│   └── package.json
│
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── COMPONENT/    # Reusable React components
│   │   ├── PAGES/        # Page components
│   │   ├── App.js        # Main app component
│   │   └── index.js      # React entry point
│   └── package.json
│
└── README.md
```

## 🔧 Technologies Used

**Backend:**

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL

**Frontend:**

- React.js
- Material-UI (Joy)
- Axios
- React Router

## 📝 Available Scripts

### Backend

- `npm start` - Start the backend server
- `npm install` - Install dependencies

### Frontend

- `npm start` - Start the React development server
- `npm build` - Build for production
- `npm test` - Run tests

## 🐛 Troubleshooting

**Backend won't start:**

- Verify MySQL is running
- Check database credentials in `.env` file
- Ensure port 8800 is not in use

**Frontend won't connect to backend:**

- Verify backend is running on port 8800
- Check `REACT_APP_API_URL` in frontend `.env` file
- Clear browser cache and restart the development server

## SCREENSHOTS
<img width="1365" height="602" alt="Screenshot 2026-06-23 214002" src="https://github.com/user-attachments/assets/c466743b-7173-457c-978a-f65ddb3029c5" />
<img width="1365" height="606" alt="Screenshot 2026-06-23 213946" src="https://github.com/user-attachments/assets/93702d5b-1236-4e4f-acab-411305a4e36f" />
<img width="1365" height="604" alt="Screenshot 2026-06-23 213932" src="https://github.com/user-attachments/assets/16308f44-9695-4d61-81f4-6de9a285d1e3" />
<img width="1364" height="604" alt="Screenshot 2026-06-23 213905" src="https://github.com/user-attachments/assets/cd97996b-053b-41b4-8c3c-2da731c096a2" />
<img width="1359" height="602" alt="Screenshot 2026-06-23 213751" src="https://github.com/user-attachments/assets/fd829e57-6998-4579-a1fe-1c092f176d2e" />
<img width="1365" height="601" alt="Screenshot 2026-06-24 155427" src="https://github.com/user-attachments/assets/5b7aabe1-0b82-495a-9a36-ce1b0958bf2c" />
<img width="1363" height="600" alt="Screenshot 2026-06-23 214638" src="https://github.com/user-attachments/assets/80f1ba9e-0309-44c1-82c0-0f2bf0b55599" />

