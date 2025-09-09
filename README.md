# Indian Barber Management & Salon Booking App

This project is a full-stack, monorepo-style web application for managing and booking salon appointments. It is built to be PWA-ready and mobile-first, with a focus on a clean and modern Indian design palette.

## ✨ Features (MVP)
- **Phone OTP Authentication**: Seamless login/signup using a phone number and OTP.
- **Salon Search**: Browse salons by location.
- **Booking Flow**: A calendar-based system for selecting date, time, and service.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) and npm
- A Supabase project with the provided schema.
- A Firebase project for authentication.
- A Razorpay account for payments.

### Installation
1.  **Clone the project**:
    ```bash
    git clone [https://github.com/your-username/barber-app.git](https://github.com/your-username/barber-app.git)
    cd barber-app
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file at the root of the project and fill it with your API keys from `.env.example`.

### Running the App
The project uses `concurrently` to run both the frontend and backend servers with a single command.
```bash
npm run dev