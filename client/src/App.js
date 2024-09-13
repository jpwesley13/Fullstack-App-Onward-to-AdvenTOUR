import AuthProvider from "./context and hooks/AuthContext";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { Outlet} from "react-router-dom";


function App() {

  return (
    <AuthProvider>
      <header>
        <NavBar />
      </header>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
