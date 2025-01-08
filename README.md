# Crypto Tracker - Cryptocurrency Insight Tool

**Crypto Tracker** is a web application that allows users to monitor and analyze cryptocurrency trends. The app provides detailed insights on cryptocurrency prices, market capitalization, trading volume, and supply metrics. Users can add favorite cryptocurrencies to their personal list, dynamically view trends, and track market performance.

## Technologies

- **React**: For building a dynamic and responsive user interface.
- **TypeScript**: Enhances reliability through static typing and improved code maintainability.
- **SASS**: For advanced styling with features like variables, nesting, and mixins.
- **Vite**: Provides fast development environment and optimized builds.
- **React Router**: Implements seamless navigation across multiple pages using hooks like `useMatch` and `useNavigate`.
- **React Hooks**: 
  - **useState**: For managing component state.
  - **useEffect**: Handles side effects like updating favorites and fetching data.
  - **useContext**: Manages global state across the app.
  - **useLayoutEffect**: Synchronizes updates directly with the DOM.
  - **useMemo**: Optimizes performance by memoizing expensive computations.
- **Material-UI**: Enhances UI with pre-styled components like buttons, inputs, and icons.
- **LocalStorage**: Persists user data (e.g., favorites) across sessions.
- **GSAP (GreenSock Animation Platform)**: Adds smooth and dynamic animations.
- **Custom Selectors**: For creating and styling dropdowns and other UI elements.

## Installation and Running

To run the project, follow these steps:

1. Clone the repository:

git clone https://github.com/yourusername/crypto-tracker.git

2. Navigate to the project directory:

  cd crypto-tracker

3. Install dependencies:

   npm install

4. Start the project:

   npm start

5. Go to [http://localhost:3000](http://localhost:3000) to view the app in action.

## Functionality

### Main Features

1. **Live Cryptocurrency Data**:  
   View real-time data for over 100 cryptocurrencies, including:  
   - Price (USD)  
   - Market capitalization  
   - Trading volume (24h)  
   - Circulating and max supply  
   - Price change (24h)  

2. **Trend Detection**:  
   Highlights bullish and bearish trends based on 24-hour price changes:  
   - **Bullish**: Change > 3%  
   - **Bearish**: Change < -10%  

3. **Favorites Management**:  
   - Add cryptocurrencies to a personalized favorites list.  
   - Remove items from favorites with a single click.  
   - Favorites persist between sessions using `localStorage`.  

4. **Interactive Pages**:  
   - **Top 100**: Browse the top 100 cryptocurrencies by market cap.  
   - **Favorites**: View and manage your saved cryptocurrencies.  
   - **Search**: Search for specific cryptocurrencies by name or symbol.  

5. **Responsive Design**:  
   Fully responsive UI, optimized for various screen sizes.  

---

### Aesthetic Features

- **Theme Styling**: Bullish and bearish trends are visually highlighted with distinct styles and animations.  
- **Animations**: Smooth hover and transition effects using GSAP.  
- **Tooltips**: Informative tooltips enhance user interactions with icons and buttons.  

---

## Components

- **CryptoCard**: Displays detailed information for a single cryptocurrency.  
- **FavoritesPage**: Shows a personalized list of saved cryptocurrencies.  
- **SearchPage**: Allows users to search for specific coins.  
- **Top100Page**: Lists the top 100 cryptocurrencies with sorting and filtering capabilities.  

---

## How It Works

- **useState**: Manages app states like favorite coins and trend indicators.  
- **useEffect**: Synchronizes state updates with `localStorage` and fetches cryptocurrency data.  
- **useContext**: Provides a global state for toggling features like favorites.  
- **LocalStorage API**: Saves and retrieves user favorites for persistence across sessions.  
- **GSAP**: Animates trend icons and card hover effects.  
- **Material-UI**: Adds polished components for better user experience.  

---

## Planned Improvements

1. **Portfolio Tracker**: Allow users to track investments with dynamic profit/loss calculations.  

---

## Author

**Aleksandr Barabanov**

## Contacts

<div>
  <a href="https://www.linkedin.com/in/aleksandr-barabanov/">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a> 
  <a href="mailto:barabanov.codes@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
  </a>
  <a href="https://profile.indeed.com/?hl=en_CA&co=CA&from=gnav-notifcenter">
    <img src="https://img.shields.io/badge/indeed-003A9B?style=for-the-badge&logo=indeed&logoColor=white" alt="Indeed"/>
  </a>
  <a href="https://www.codewars.com/users/Aleksandr-Barabanov">
    <img src="https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=codewars&logoColor=grey" alt="Codewars"/>
  </a>
</div>

© 2024 Nutrition Analyzer
