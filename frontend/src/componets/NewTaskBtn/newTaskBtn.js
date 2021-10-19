const NewTaskBtn = ({ onClick }) => {
  return (
    <div className="NewTask-btn" onClick={onClick}>
      <svg
        className="NewTask-btn__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 38 38"
      >
        <g
          id="_plus_circle"
          data-name=" plus circle"
          transform="translate(-164 -749)"
        >
          <g
            id="Ellipse_3"
            data-name="Ellipse 3"
            transform="translate(164 749)"
            fill="none"
            stroke="#fff"
            stroke-width="2"
          >
            <circle cx="19" cy="19" r="19" stroke="none" />
            <circle cx="19" cy="19" r="18" fill="none" />
          </g>
          <path
            id="Icon_awesome-plus"
            data-name="Icon awesome-plus"
            d="M13.248,7.855H8.662V3.269A1.019,1.019,0,0,0,7.643,2.25H6.624A1.019,1.019,0,0,0,5.6,3.269V7.855H1.019A1.019,1.019,0,0,0,0,8.874V9.893a1.019,1.019,0,0,0,1.019,1.019H5.6V15.5a1.019,1.019,0,0,0,1.019,1.019H7.643A1.019,1.019,0,0,0,8.662,15.5V10.912h4.586a1.019,1.019,0,0,0,1.019-1.019V8.874A1.019,1.019,0,0,0,13.248,7.855Z"
            transform="translate(175.819 758.569)"
          />
        </g>
      </svg>

      <p className="NewTask-btn__text">New Task</p>
    </div>
  );
};

export default NewTaskBtn;
