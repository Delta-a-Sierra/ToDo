import "../../sass/main.css";

const EmailInput = ({
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
      <svg
        className="Input__input-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="24"
        viewBox="0 0 30 24"
      >
        <path
          id="Icon_material-mail-outline"
          data-name="Icon material-mail-outline"
          d="M30,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V9A3.009,3.009,0,0,0,30,6Zm0,21H6V12l12,7.5L30,12ZM18,16.5,6,9H30Z"
          transform="translate(-3 -6)"
          opacity="0.51"
        />
      </svg>
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
        type="email"
        placeholder={placeholder}
        name={name}
        value={Form[name]}
        onChange={onChange}
      />
    </label>
  );
};

export default EmailInput;
