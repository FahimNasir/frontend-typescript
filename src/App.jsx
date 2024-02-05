import { useContext } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import MyContext from "./context/MyContext";

function App() {
  const navigate = useNavigate();
  const { myState, updateState } = useContext(MyContext);
  return (
    <>
      <h1>Context State - {myState}</h1>

      <button
        onClick={() => {
          updateState("New Value");
        }}
      >
        Update Context
      </button>
      <br />
      <a
        href="#"
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
