import "../../sass/main.css";
import { Link } from "react-router-dom";

const PopoutItem = ({ name, id }) => {
  return (
    <li className="Popout-item__container">
      <Link className="Popout-item__item" to={`/groups/${id}`}>
        {name}
      </Link>
    </li>
  );
};

export default PopoutItem;
