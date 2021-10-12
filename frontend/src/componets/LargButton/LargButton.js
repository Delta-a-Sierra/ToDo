import "../../sass/main.css";

const LargeButton = ({ text, onClick }) => {
  return (
    <button className="LargeButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default LargeButton;
