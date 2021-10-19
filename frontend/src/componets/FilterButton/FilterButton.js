const FilterButton = ({ active, onClick, text, testid }) => {
  return (
    <button
      data-testid={testid}
      className={`Filter-button ${active && "Filter-button--active"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterButton;
