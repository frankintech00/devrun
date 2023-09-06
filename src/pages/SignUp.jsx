import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div className="flex flex-col items-center h-screen mt-10 text-primary">
      <div className="w-full max-w-md p-6 lg:max-w-xl rounded-lg shadow-2xl ">
        <h1 className="mb-6 text-3xl font-semibold text-center">
          Sign in to your account.
        </h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="label">
              <span className="text-primary text-lg label-text">Email</span>
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              <span className="text-primary text-lg label-text">Password</span>
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              className="w-full input input-bordered input-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div></div>
          <div>
            <button
              type="button"
              className="shadow-md btn btn-block btn-primary"
              onClick={handleSignIn}
            >
              Sign In.
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-block bg-white text-[#4285F4] flex items-center justify-center shadow-md"
              onClick={handleSignInWithGoogle}
            >
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
