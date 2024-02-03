import "./App.css";
import Login from "./components/authentication/Login";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home Page</h1>
      <a
        onClick={() => {
          navigate("/login");
        }}
      >
        For Login Click here
      </a>
    </>
  );
}

export default App;
