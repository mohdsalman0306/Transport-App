# Transport Management App

A comprehensive MERN stack application for managing transportation operations, including driver management, vehicle tracking, expense management, and detailed analytics.

## 🚛 Features

### Core Management

- **Driver Management**: Add, edit, and manage driver profiles and information
- **Vehicle Management**: Track and maintain vehicle fleet data
- **Expense Types**: Categorize different types of operational expenses
- **Expense Management**: Record, track, and manage all transportation expenses

### Analytics & Reporting

- **Dashboard**: Interactive charts showing data for:
  - Monthly trends
  - Weekly analysis
  - Last 30 days overview
- **Reports**: Download detailed reports in various formats

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Charts**: Chart.js / Recharts (for dashboard visualization)

## 📁 Project Structure

```
Transport-App/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── ...
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/mohdsalman0306/Transport-App.git
cd Transport-App
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transport-app
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

The application will be available at:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🔧 Environment Variables

### Server (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transport-app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Client (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

### Drivers

- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create new driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Vehicles

- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Expenses

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Reports

- `GET /api/reports/monthly` - Monthly report data
- `GET /api/reports/weekly` - Weekly report data
- `GET /api/reports/last30days` - Last 30 days report data
- `GET /api/reports/download` - Download report file

## 🎨 Screenshots

<!-- Add screenshots of your application here -->
<!-- ![Dashboard](screenshots/dashboard.png) -->
<!-- ![Driver Management](screenshots/drivers.png) -->

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammad Salman**

- GitHub: [@mohdsalman0306](https://github.com/mohdsalman0306)

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `build` folder

### Backend (Heroku/Railway)

1. Set environment variables
2. Deploy the server directory

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact me.

---

⭐ **If you find this project helpful, please give it a star!** ⭐
