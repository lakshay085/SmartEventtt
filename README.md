# SmartEventtt 🎫

SmartEventtt is a full-stack event ticketing mobile application built with React Native (Expo), Node.js, and MongoDB Atlas.
Users can browse events, book tickets, receive a QR code ticket and verify tickets through a QR scanner.

The app demonstrates a complete mobile + backend architecture with real-time API communication and cloud database integration.



# Features

* Browse available events
* View event details
* Search events
* Book tickets
* Automatic QR code ticket generation
* QR ticket verification via scanner
* MongoDB Atlas cloud database
* Cross-platform support (Mobile + Web via Expo)

---

# Tech Stack

### Frontend

* React Native (Expo)
* Expo Router
* React Native Paper
* Axios
* Expo Camera
* Expo Linear Gradient

### Backend

* Node.js
* Express.js
* QRCode generator

### Database

* MongoDB Atlas

---

# Architecture


Mobile App (React Native)
 ↓
REST API (Node.js + Express)
 ↓
MongoDB Atlas Database
 ↓
QR Ticket Generation & Verification


---


## Screenshots

### Events Screen
![Events Screen](screenshots/eventlist.png)

### Event Details
![Event Details](screenshots/events.png)

### QR Ticket
![QR Ticket](screenshots/booking.png)

### Ticket Scanner
![Scanner](screenshots/verification.png)


# Installation

Clone the repository

```
git clone https://github.com/lakshay085/SmartEventtt.git
```

Navigate into the project

```
cd SmartEvent
```

Install dependencies

```
npm install
```

---

# Running the App

Start the frontend (Expo)

```
npx expo start
```

Start the backend server

```
cd backend
node server.js
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

# Project Structure

```
SmartEvent
 ├ app                # Expo Router pages
 ├ backend            # Node.js API server
 ├ assets             # Images & icons
 ├ components         # Reusable UI components
 ├ constants          # App constants
 ├ hooks              # Custom hooks
 ├ screenshots        # App screenshots
 └ README.md
```

---

# Future Improvements

* User authentication
* Admin dashboard for event management
* Ticket history for users
* Payment gateway integration
* Cloud deployment
* Push notifications for events

---

# Author

Lakshay Panwar

Computer Science Engineering Student
Full-Stack Developer (Mobile + Backend)

---

# License

This project is open source and available under the **MIT License**.

---

