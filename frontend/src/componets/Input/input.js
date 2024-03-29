import "../../sass/main.css";

const Input = ({
  labeled,
  FormErrors,
  onChange,
  Form,
  name,
  type,
  placeholder,
}) => {
  return (
    <label
      title={`label-${name}`}
      htmlFor={name}
      className={`Input__label ${
        FormErrors[name] !== "" && "Input__label--error"
      }`}
    >
      <h4
        data-testid={`errorText-${name}`}
        className={`Input__error-txt ${
          FormErrors[name] === "" && "Input__error-txt--invisible"
        } `}
      >
        {FormErrors[name]}
      </h4>

      <input
        className="Input__input"
        type={type}
        placeholder={placeholder}
        name={name}
        value={Form[name]}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
