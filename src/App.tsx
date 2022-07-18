import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
