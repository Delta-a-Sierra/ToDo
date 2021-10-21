const GroupDropDownPresentation = ({
  name,
  Form,
  FormErrors,
  onChange,
  DropdownActive,
  ToggleDropdown,
  CreateNew,
  SetGroup,
  items,
  ToggleCreateNew,
  CancelNewGroup,
  CreateNewGroup,
}) => {
  return (
    <div className="Dropdown">
      <h3 className="Input__title">{name}</h3>
      <label
        data-testid="dropdown-parent"
        title={`label-${name}`}
        htmlFor={name}
        className={`Input__label ${DropdownActive && "Input__label--active"} ${
          FormErrors[name] !== "" && "Input__label--error"
        }`}
      >
        <h4
          data-testid={`errorText-${name}`}
          className={`Input__label-error-txt ${
            FormErrors[name] === "" && "Input__label-error-txt--invisible"
          } `}
        >
          {FormErrors[name]}
        </h4>

        {CreateNew ? (
          <div className="Dropdown__cancel-input">
            <input
              className="Dropdown__input"
              type="text"
              placeholder="name new group"
              value={Form[name]}
              onChange={onChange}
              name={name}
            />
            <div className="Dropdown__cancel-buttons">
              <button
                data-testid="newGroup-button-confirm"
                className="Dropdown__cancel-button"
                onClick={CreateNewGroup}
              >
                Confirm
              </button>
              <button
                className="Dropdown__cancel-button Dropdown__cancel-button--danger"
                data-testid="newGroup-button-cancel"
                onClick={CancelNewGroup}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="Dropdown" onMouseLeave={ToggleDropdown}>
            <input
              onMouseEnter={ToggleDropdown}
              onClick={ToggleDropdown}
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
                <li onClick={ToggleCreateNew} className="Dropdown__item">
                  Create New Group
                </li>
              </ul>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default GroupDropDownPresentation;
