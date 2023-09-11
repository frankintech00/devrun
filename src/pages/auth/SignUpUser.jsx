import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext.jsx";

function SignUpUser() {
  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      signUp(data.email, data.password);
      setLoading(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-md mx-auto flex flex-col"
    >
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
    </form>
  );
}

export default SignUpUser;