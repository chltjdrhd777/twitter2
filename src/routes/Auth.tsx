import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

function Auth() {
  const storecheck = useSelector((store: any) => store);
  const dispatch = useDispatch();

  //? only for email,password typing and submit ////////////////////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  //? ////////////////////////////////

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          required
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
        />

        <input type="submit" value="Log In" />
      </form>
      <button>Start with Google</button>
      <button>Start with Github</button>
    </div>
  );
}

export default Auth;
