import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Calls from "./components/Calls";
function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Calls />
    </div>
  );
}

export default App;
