import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UseEffectExample = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const navigate = useNavigate();
  //* When to use useEffect() hook.

  //* Navigate to some other screen
  useEffect(() => {
    if (localStorage.getItem("loggedInUser") != null) {
      navigate("/dashboard");
    }

    // * Calling API here is WRONG
  });

  const disableWholeUI = () => {
    console.log("Function called!");
  };

  // *If you want to load some data on component render
  // *If you want to call a server backend api and get some data.
  // useEffect(() => {
  //   console.log("Login Screen!!");
  // }, []);

  useEffect(() => {
    //console.log("Login Screen!!");
    disableWholeUI();
    //UpdateActiveInactiveUI();
    //Call API MarkUserActive(true)
  }, [count]);
  return (
    <>
      <p>Count Old: {count}</p>
      <p>Count New: {count2}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>

      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        Increment New
      </button>
    </>
  );
};

export default UseEffectExample;
