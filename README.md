# BiteWise

BiteWise is a web application designed to help users find the best deals on their favorite meals from various food delivery services like DoorDash and Uber Eats. With BiteWise, users can discover tasty deals in their area, compare rates, and save money while enjoying delicious food.

## Features

- **Search Functionality**: Users can search for specific items or restaurants they are craving.
- **Location-Based Results**: BiteWise provides results based on the user's location, making it easy to find nearby restaurants.
- **Restaurant Listings**: Users can view a list of restaurants in their area along with their ratings, delivery times, and price range.
- **Recommended Food Items**: BiteWise offers personalized recommendations for food items based on user preferences.
- **Deal Notifications**: Users are notified about special deals and discounts available for specific food items.
- **Google OAuth Registration**: Users can register and log in using their Google accounts for a seamless experience.

## Technologies Used

- **MongoDB**: Database to store user data, restaurant information, and food items.
- **Express.js**: Node.js web application framework used for building the backend API.
- **React.js**: JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime environment for running server-side code.
- **HTML/CSS**: Markup and styling for the frontend interface.
- **Bootstrap**: Frontend framework for responsive design and layout.
- **Axios**: Promise-based HTTP client for making API requests.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Google OAuth**: Authentication service for user registration and login.
- **Redux**: State management library for managing application state.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/CS160-04-Spring2024/Group7_BiteWise.git
   ```

2. Install dependencies:

   ```
   cd GROUP7_BITEWISE/client
   npm install

   cd GROUP7_BITEWISE/server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=8080
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:

   frontend:
   ```
   cd client
   npm start
   ```

   backend:
   ```
   cd server
   npm start
   ```

## Contributors

- Bhagyesh Rathi
- Janani Pandurangan
- Jason Tobin 
- Ricky Nguyen
- Rachel Liao
- Shreyass Prem Sankar

## Contact

For inquiries, please contact us at support@bitewise.com.

---
