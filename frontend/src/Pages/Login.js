import Form from "../componets/form/Form";
import AuthAside from "../componets/authAside/AuthAside";
import "./style.css";

const Login = () => {
  const Text = "Enter your personal details and start your journey with us";

  return (
    <div className="login">
      <AuthAside Text={Text} btnTxt="Sign Up" btnLink="/Signup" />

      <Form title="Log In" type="login" />
    </div>
  );
};

export default Login;
