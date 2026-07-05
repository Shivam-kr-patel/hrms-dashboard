This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# HRMS Dashboard

A modern Human Resource Management System (HRMS) built with Next.js, MongoDB, NextAuth, and Tailwind CSS. This application provides authentication and employee management with modules for departments, attendance, leaves, payroll, recruitment, and reports.

---

## Features

### Authentication
- Secure login with NextAuth
- Protected dashboard routes
- Session management

### Dashboard
- HRMS overview dashboard
- Employee statistics
- Attendance overview
- Recent employees
- Responsive dashboard cards

### Employee Management
- Add Employee
- View Employee
- Update Employee
- Delete Employee
- Employee profile details

### Department Management
- Create Department
- View Department
- Edit Department
- Delete Department

### Leave Management
- Apply Leave
- View Leave
- Edit Leave
- Delete Leave

### Attendance Management
- Mark Attendance
- View Attendance
- Update Attendance
- Delete Attendance

### Other Modules
- Payroll
- Recruitment
- Reports
- User Profile
- Settings

---

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS 4
- Lucide React Icons

### Backend
- Next.js API Routes
- MongoDB
- Mongoose

### Authentication
- NextAuth.js

### Forms
- React Hook Form

### Security
- bcryptjs

### Development Tools
- Git
- GitHub
- Playwright
- Bruno
- ESLint

---

## Folder Structure

```text
hrms-dashboard/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── models/
│   └── middleware.js
│
├── public/
│
├── tests/
│
├── bruno/
│
├── scripts/
│
├── package.json
├── next.config.mjs
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go into the project

```bash
cd hrms-dashboard
```

Install dependencies

```bash
npm install
```

Create environment variables

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000
```

Run development server

```bash
npm run dev
```

Production build

```bash
npm run build
```

Start production

```bash
npm start
```

---

## API Endpoints

### Authentication

```
/api/auth/[...nextauth]
```

### Employees

```
GET    /api/employees
POST   /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
DELETE /api/employees/:id
```

### Departments

```
GET
POST
PUT
DELETE
```

### Leaves

```
GET
POST
PUT
DELETE
```

### Attendance

```
GET
POST
PUT
DELETE
```

---

## Testing

### Playwright

```bash
npx playwright test
```

### Bruno

API collections are available inside the `bruno/` directory.

---

## Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Create production build.

```bash
npm run start
```

Run production server.

```bash
npm run lint
```

Run ESLint.

---

## Future Improvements

- Dashboard analytics from database
- Search and filtering
- Pagination
- File upload
- Email notifications
- Role-based access control
- Payroll management
- Recruitment workflow
- Report generation
- Charts and analytics
- Docker support
- CI/CD pipeline

---

## Screenshots

### Login

Add screenshot here

### Dashboard

Add screenshot here

### Employees

Add screenshot here

### Departments

Add screenshot here

### Leave Management

Add screenshot here

### Attendance

Add screenshot here

---

## Author

**Shivam**

Software Engineer

GitHub: https://github.com/Shivam-kr-patel

---

## License

This project is developed for educational and portfolio purposes.