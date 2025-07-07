import { Outlet } from "react-router";
import Navbar from "./components/LayoutComponents/Navbar";
import Footer from "./components/LayoutComponents/Footer";

function App() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
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
