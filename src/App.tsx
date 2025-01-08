import './App.scss';
import { BrowserRouter } from "react-router-dom";
import NavigationMenu from "@/components/NavigationMenu";
import AppRoutes from "@/components/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationMenu />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;