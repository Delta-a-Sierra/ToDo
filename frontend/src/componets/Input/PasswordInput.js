import "../../sass/main.css";

const PasswordInput = ({
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
        width="36"
        height="36"
        viewBox="0 0 36 36"
      >
        <path
          id="Icon_awesome-key"
          data-name="Icon awesome-key"
          d="M36,12.375A12.382,12.382,0,0,1,21.317,24.534l-1.688,1.9A1.687,1.687,0,0,1,18.367,27H15.75v2.813A1.687,1.687,0,0,1,14.063,31.5H11.25v2.813A1.687,1.687,0,0,1,9.563,36H1.688A1.687,1.687,0,0,1,0,34.313V28.824a1.688,1.688,0,0,1,.494-1.193L11.871,16.254A12.376,12.376,0,1,1,36,12.375ZM23.625,9A3.375,3.375,0,1,0,27,5.625,3.375,3.375,0,0,0,23.625,9Z"
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
        type="password"
        placeholder={placeholder}
        name={name}
        value={Form[name]}
        onChange={onChange}
      />
    </label>
  );
};

export default PasswordInput;
