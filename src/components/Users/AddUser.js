import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "../Users/AddUser.module.css";
import Card from "../UI/Card";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // Refを使っているので不要
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty value)",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid number",
        message: "Please enter a valid number",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    // inputに値を入れた後、空にする
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (e) => {
  //   setEnteredUsername(e.target.value);
  // };
  // const ageChangeHandler = (e) => {
  //   setEnteredAge(e.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="usename"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
