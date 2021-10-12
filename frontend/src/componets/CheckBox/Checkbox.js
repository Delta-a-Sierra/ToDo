const CheckBox = ({ onClick, name, text }) => {
  return (
    <label className="Checkbox__container" htmlFor={name}>
      <input
        className="Checkbox__checkbox"
        name={name}
        onClick={onClick}
        type="checkbox"
      />
      <h3 className="Checkbox__text">{text}</h3>
    </label>
  );
};

export default CheckBox;
