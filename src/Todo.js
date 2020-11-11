import React, { useState } from "react";
import "./Todo.css";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  List,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // Update the Message with new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <form>
            <h4>Edit your message here</h4>
            <input
              className="input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              className="cursors"
              variant="contained"
              color="secondary"
              type="sumbit"
              onClick={updateTodo}
            >
              Update Message
            </Button>
          </form>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Message recieved to Xoxoxoxo official group"
          />
        </ListItem>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => setOpen(true)}
        >
          Edit
        </Button>
        <DeleteForeverIcon
          className="edit cursors"
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
