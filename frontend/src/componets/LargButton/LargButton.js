import "../../sass/main.css";
import { Link } from "react-router-dom";

const LargeButton = ({ text, onClick, link }) => {
  if (link) {
    return (
      <Link to={`/${link}`}>
        <button className="LargeButton" onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button className="LargeButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default LargeButton;
