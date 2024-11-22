import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-red-200"></div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-left w-1/2 text-3xl font-bold mb-4">
          Create new account
        </h1>
        <SignupForm />
        <div className="flex gap-4">
          <p>Already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
