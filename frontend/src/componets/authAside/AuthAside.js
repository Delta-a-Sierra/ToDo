import { Link } from "react-router-dom";
import "./style.css";

function AuthAside({ Text, btnTxt, btnLink }) {
  return (
    <div className="AuthAside">
      <h1>Hello, Friend</h1>
      <p>{Text}</p>
      <Link to={btnLink}>
        <button>{btnTxt}</button>
      </Link>
    </div>
  );
}

export default AuthAside;
