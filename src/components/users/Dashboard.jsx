import Navbar from "../common/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import todoData from "../todoData.json";

const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);
  const [count, setCount] = useState(0);
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todo", {
          withCredentials: true,
        });

        const apiResponse = response.data;

        if (apiResponse.isError === false) {
          setTodoList(apiResponse.data);
        } else {
          alert(`Unsuccessful response with message: ${apiResponse.message}`);
        }
      } catch (error) {
        console.log("Error Response", error);

        if (error.response) {
          const { message } = error.response.data;
          if (error.response.status === 400) {
            alert(message);
          }
        } else {
          alert("Error Occurred while calling backend");
        }
      }
    };
    fetchTodoList();
  }, []);

  // useEffect(() => {
  //   console.log("Empty Dependency Array Called");
  //   //Call countries api
  // }, []);

  // useEffect(() => {
  //   console.log("Empty Dependency Array Called");
  //   //Call Cities API with countryId
  //   //http://localhost:3000/api/cities/`${countrId}
  // }, [countryId]);

  return (
    <>
      <Navbar />
      <div>
        <p>Refresh Count: {count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Refresh
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
