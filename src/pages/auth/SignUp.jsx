import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signUp(email, password, confirmPassword);
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      <div className="w-full max-w-md p-6 rounded-lg shadow-2xl lg:max-w-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label" htmlFor="email">
              <span className="text-primary text-lg">Email</span>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="text-primary text-lg">Password</span>
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="flex items-center justify-center shadow-md btn btn-block btn-primary"
              onClick={handleSignUp}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
