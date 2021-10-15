import { useEffect, useState } from "react";
import "../../sass/main.css";

const GroupDropdown = ({
  FormErrors,
  onChange,
  Form,
  name,
  items,
  SetGroup,
}) => {
  const [DropdownActive, setDropdownActive] = useState(false);
  const [CreateNew, setCreateNew] = useState(false);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !DropdownActive);
  };

  return (
    <div className="Dropdown">
      <h3 className="Input__title">{name}</h3>
      <label
        data-testid="dropdown-parent"
        onMouseEnter={ToggleDropdown}
        title={`label-${name}`}
        htmlFor={name}
        className={`Input__label ${DropdownActive && "Input__label--active"} ${
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

        {CreateNew ? (
          <input
            className="Dropdown__input"
            type="text"
            placeholder="name new group"
            value={Form[name]}
            onChange={onChange}
            name={name}
          />
        ) : (
          <div className="Dropdown" onMouseLeave={ToggleDropdown}>
            <input
              data-testid="dropdown-dropdown"
              className={`Dropdown__input  ${
                DropdownActive && "Dropdown__input--active"
              }`}
              type="text"
              placeholder="select a group"
              value={Form[name]}
              name={name}
              readOnly
            />
            {DropdownActive && (
              <ul
                data-testid="dropdown-container"
                className="Dropdown__container"
              >
                {items.map((item) => {
                  return (
                    <li
                      className="Dropdown__item"
                      data-testid="dropdown-item"
                      onClick={() => SetGroup(item.name)}
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default GroupDropdown;
