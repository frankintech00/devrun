import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button, TextField, CircularProgress, Box } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  border-radius: 0.875rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 3rem auto;
  @media (min-width: 1024px) {
    max-width: 30rem;
  }
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 50px;
  display: block;
`;

function SignUpUser() {
  const { signUp, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      await signUp(data.email, data.password);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : null}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password must contain 8 characters, 1 number, and 1 special character",
          },
        })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : null}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        {...register("confirmPassword", {
          required: true,
          validate: (value) => value === watch("password"),
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword && "Passwords do not match"}
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "1rem 0" }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </StyledButton>

      <StyledButton
        onClick={handleGoogleSignIn}
        variant="contained"
        style={{
          margin: "1rem 0",
          width: "300px",
          backgroundColor: "#4285F4",
          color: "white",
        }}
        startIcon={<FaGoogle />}
      >
        Sign Up with Google
      </StyledButton>
    </FormContainer>
  );
}

export default SignUpUser;
