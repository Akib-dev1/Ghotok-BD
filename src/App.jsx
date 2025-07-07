import { Outlet } from "react-router";
import Navbar from "./components/LayoutComponents/Navbar";
import Footer from "./components/LayoutComponents/Footer";

function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
