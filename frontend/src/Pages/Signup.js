import Form from "../componets/form/Form";
import AuthAside from "../componets/authAside/AuthAside";

const Signup = () => {
  const Text = "Enter your personal details and Work with us again";

  return (
    <div className="login">
      <AuthAside Text={Text} btnTxt="Log in" btnLink="/login" />

      <Form title="Sign up" type="signup" />
    </div>
  );
};

export default Signup;
