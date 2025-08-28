A modern web application that allows users to discover, book, and review stays while enabling hosts to showcase and manage their listings.

✨ Features

✅ User Functionality

Register and log in securely (JWT-based authentication)

Browse listings with filters for location, price, guests, and property type

View detailed property pages with images, descriptions, amenities, and reviews

Book stays directly from the platform

Access personal dashboard to track upcoming and past bookings

Leave ratings and reviews after completed stays

✅ Host Functionality

Create and manage property listings with title, description, price, images, and availability

Host dashboard with insights on listings, bookings, and reviews

Accept or manage bookings for their properties

View feedback and ratings from guests

✅ General Functionality

Secure authentication and role-based access (guest vs host)

Image upload and storage with Cloudinary (or local storage)

Booking system with availability conflict checks

Session summary after each stay with ratings and reviews

Responsive UI for both desktop and mobile

🛠 Tech Stack

Frontend: EJS, Tailwind CSS / Bootstrap, Axios

Backend: Node.js, Express.js

Database: MongoDB (Atlas/local)

Authentication: JSON Web Tokens (JWT) + bcrypt

Storage: Cloudinary for images

Optional: Stripe/Razorpay for payments

📌 Project Highlights

Role-specific dashboards for hosts and guests

Real-time booking validation to avoid conflicts

Integrated review and rating system for properties

Clean architecture with controllers, services, and middleware separation

RESTful API design with secure endpoints
