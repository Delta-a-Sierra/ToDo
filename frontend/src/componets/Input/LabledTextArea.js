import "../../sass/main.css";

const LabeledTextArea = ({
  labeled,
  FormErrors,
  onChange,
  Form,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className="Input">
      <h3 className="Input__title">{name}</h3>
      <label
        title={`label-${name}`}
        htmlFor={name}
        className={`Input__textarea-label ${
          FormErrors[name] !== "" && "Input__textarea-label--error"
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

        <textarea
          className="Input__textarea"
          type={type}
          placeholder={placeholder}
          name={name}
          value={Form[name]}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default LabeledTextArea;
