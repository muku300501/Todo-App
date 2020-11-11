import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from "firebase";
import db from "./firebase";
import Todo from "./Todo";
import Navbar from "./Navbar";
import "./Todo.css";
import "./App.css";
import Info from "./info";

function App() {
  // const [state, setState] = useState([]);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the database and fetch new todos as they get added/remove
  // useEffect(function :- this code here...fires when the app.js loads, dependancies :- []);
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // will stop the REFRESH

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(""); // clear up the input after hitting submit
  };

  return (
    <div className="App">
      <Navbar></Navbar>
      <form className="enterMeassage">
        <FormControl>
          <InputLabel>Enter Message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          className="cursors"
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <Info></Info>
    </div>
  );
}

export default App;
