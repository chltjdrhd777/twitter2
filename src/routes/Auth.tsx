import { authService, persistence } from "dataSource/firebaseDB";
import { icons } from "dataSource/Icons";
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
  persistence();
  //? ///////////////////////////////////////////////////////////////

  //?button actions//////////////////////////////////////////////////////
  const onCreate = () => {
    window.location.href = "#popup1";
    setEmail("");
    setPassword("");
  };
  const onClose = () => {
    window.location.href = "#";
    setEmail("");
    setPassword("");
  };

  const onSubmitLogin = async (e: any) => {
    try {
      e.preventDefault();
      await authService.signInWithEmailAndPassword(email, password);
      console.log(authService.currentUser);
    } catch (err) {
      alert(err.message);
    }
  };

  const onSubmitCreateAccount = async (e: any) => {
    try {
      e.preventDefault();
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  //? /////////////////////////////////////////////////////////////////////

  return (
    <AuthBody>
      <icons.TwitterIcon />
      <TwitterTitle>Twitter 2</TwitterTitle>
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

          <input type="submit" value="Log In" className="login__btn" />
        </form>

        <InfoDiv>
          <button onClick={onCreate}>Create your account</button>
          <button>Start with Google</button>
          <button>Start with Github</button>
        </InfoDiv>

        {/* for popup*/}
        <OverlayDiv id="popup1">
          <PopUpDiv>
            <h2>Please enter your Email && password</h2>
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

              <input
                type="submit"
                value="Create Account"
                className="create_input"
              />
            </form>
            <CloseButton onClick={onClose}>close</CloseButton>
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
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const AuthPartDiv = styled.div`
  background-color: lightgrey;
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .login__btn {
    font-weight: 700;
    transition: all 0.2s ease-in;
    background: #0278ae;
    color: white;

    &:hover {
      transform: translateY(-3px);
      background: var(--twitter-color);
      color: #0278ae;
    }

    &:active {
      transform: translateY(3px);
    }
  }

  & input {
    border: none;
    border-radius: 3px;
    padding: 3px;
    margin-left: 5px;
    ::-webkit-input-placeholder {
      color: var(--twitter-background);
      text-align: center;
    }
    transition: all 0.2s ease-out;

    &:focus {
      background: var(--twitter-color);
      ::-webkit-input-placeholder {
        color: var(--twitter-color);
      }
      outline: none;
    }
  }
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
    &:focus {
      outline: none;
    }
  }
`;

const OverlayDiv = styled.div`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50vh;
  width: 70vh;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid var(--twitter-color);

  background: var(--twitter-background);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;

  &:target {
    opacity: 1;
    visibility: visible;
  }

  & .for_popup {
    width: 100vh;
    height: 100vh;
    background: black;
  }
`;

const PopUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;

  & form {
    display: flex;
    flex-direction: column;
    margin-top: 17px;

    & > input {
      margin-top: 3px;
    }

    & > .create_input {
      &:hover {
        background: var(--twitter-color);
        color: white;
      }
    }
  }

  & h2 {
    font-size: 15px;
  }
`;
const CloseButton = styled.button`
  background: var(--twitter-color);
  padding: 5px;
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  transition: all 0.2s ease-in-out;
  border: none;

  &:hover {
    background-color: lightgray;
    color: black;
  }

  &:focus {
    outline: none;
  }
`;

export default Auth;
