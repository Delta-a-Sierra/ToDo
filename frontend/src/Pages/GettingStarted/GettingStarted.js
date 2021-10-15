import "../../sass/main.css";
import GirlImage from "../../util/images/girl.png";
import { LargeButton } from "../../componets";

const GettingStarted = ({ toggleNewTask }) => {
  return (
    <div className="Getting-started">
      <img
        className="Getting-started__image"
        alt="girl reading list"
        src={GirlImage}
      />
      <div className="Getting-started__container">
        <h1 className="Getting-started__title">Get Started</h1>
        <p className="Getting-started__body">
          Ready to get all of those pesky task in order
        </p>
        <LargeButton
          onClick={toggleNewTask}
          className="Getting-started__button"
          text="Create Task"
        />
      </div>
    </div>
  );
};

export default GettingStarted;
