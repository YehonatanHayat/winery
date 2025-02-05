
# React Winery Application Frontend

This repository contains the frontend implementation of a winery management system built using **React**. The application includes several key features to manage and interact with the backend services.

---

### Features

- **Dynamic Role-Based Access:**
  - Admin users can manage inventory, orders, and finances.
  - Customers can view information, place orders, and interact with relevant content.

- **Server Communication:**
  - The application fetches and posts data to a Node.js backend using REST API endpoints.
  - Token-based authentication ensures secure communication.

- **Component Architecture:**
  - The project is modular, with reusable components like `ProtectedRoute`, `Login`, and `Signup`.
  - Components are structured for scalability and ease of maintenance.

- **Modern Design:**
  - Styled using CSS with responsive layouts and animations for a user-friendly experience.
  - Aesthetic designs for each page, including an **Info** page and **Order Management**.

- **Core Pages:**
  - **Login & Signup:** Handles user authentication.
  - **Orders:** Enables customers to place and review orders.
  - **Inventory Management (Admin):** Allows admins to manage stock.
  - **Finance Management (Admin):** Provides insights into income and expenses.

---

### Project Structure

- **Components:**
  - `Info.js`: Displays general information with a welcoming layout.
  - `Orders.js`: Handles order placement and customer details.
  - `Inventory.js`: Provides inventory management tools for admins.
  - `Finance.js`: Tracks income and expenses.
  - `ProtectedRoute.js`: Secures admin-only routes.

- **Styling:**
  - Custom CSS for each component, ensuring clean and consistent design.
  - Responsive design for compatibility across devices.

---

### API Communication

The application interacts with a backend server through the following API routes:
- **User Authentication:** `/api/users`
- **Order Management:** `/api/orders`
- **Inventory Management:** `/api/inventory`
- **Finance Management:** `/api/finance`
- **Info Page Data:** `/api/info`

---

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm start
   ```

3. **Ensure backend server is running** to enable data fetching and other interactions.
   You can find the backend repository here: [Winery Server](https://github.com/YehonatanHayat/Winery-server.git).

---

### Notes

- The project was designed to demonstrate a clean, modular structure and best practices in React development.
- All sensitive information, such as API keys and database URIs, are stored securely and excluded from the repository.
