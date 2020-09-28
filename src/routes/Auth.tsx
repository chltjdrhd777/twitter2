import { authService } from "dataSource/firebaseDB";
import { icons } from "dataSource/Icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./test.css";

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
  const onClose = (e: any) => {
    window.location.href = "#popup1";
  };

  const onSubmitLogin = async (e: any) => {
    try {
      e.preventDefault();
      await authService.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmitCreateAccount = async (e: any) => {
    try {
      e.preventDefault();
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err.message);
    }
  };
  //? ////////////////////////////////

  //?button actions//
  //? /////////////////

  return (
    <AuthBody>
      <icons.TwitterIcon />
      <TwitterTitle>Twitter2</TwitterTitle>
      <AuthPartDiv>
        <form onSubmit={onSubmitLogin}>
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

        <InfoDiv>
          <button onClick={onClose}>Create your account</button>
          <button>Start with Google</button>
          <button>Start with Github</button>
        </InfoDiv>

        {/* for popup*/}
        <OverlayDiv id="popup1">
          <PopUpDiv>
            <h2>Please enter your Email && password</h2>
            <CloseA href="#">close</CloseA>
            <form onSubmit={onSubmitCreateAccount}>
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

              <input type="submit" value="Create Account" />
            </form>
          </PopUpDiv>
        </OverlayDiv>
        {/*for popup*/}
      </AuthPartDiv>
    </AuthBody>
  );
}

const AuthBody = styled.div`
  background: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > svg {
    color: var(--twitter-background);
    font-size: 100px;
  }
`;

const TwitterTitle = styled.div`
  color: var(--twitter-background);
  font-size: 100px;
  margin-bottom: 10px;
  font-weight: 800;
`;

const AuthPartDiv = styled.div`
  background-color: lightgrey;
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 50vh;
  & button {
    background-color: var(--twitter-background);
    border: none;
    color: white;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      background: var(--twitter-color);
    }
    margin-top: 10px;
  }
`;

const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--twitter-background);
  transition: opacity 0.5s;
  opacity: 0;
  visibility: hidden;

  &:target {
    opacity: 1;
    visibility: visible;
  }
`;

const PopUpDiv = styled.div``;
const CloseA = styled.a``;

export default Auth;
