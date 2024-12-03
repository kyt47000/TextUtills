import React, { useState } from "react";
import styled from "styled-components";

const Button = ({ text, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>{text}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 20px 20px; /* Changed to make the button square */
    border-radius: 0; /* Removed border-radius to make it square */
    cursor: pointer;
    border: 0;
    background-color: white;
    box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 15px;
    transition: all 0.5s ease;
  }

  button:hover {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
  }

  button:active {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }
`;
export default Button;