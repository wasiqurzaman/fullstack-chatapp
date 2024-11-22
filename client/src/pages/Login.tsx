import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-red-200"></div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-left w-1/2 text-4xl font-bold mb-4">Log in</h1>
        <LoginForm />
        <div className="flex gap-4">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
