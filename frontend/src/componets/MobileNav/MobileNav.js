import "../../sass/main.css";
import { useState } from "react";

const MobileNav = () => {
  const [PopUpActive, setPopUpActive] = useState(false);

  const TogglePopup = () => {
    setPopUpActive((prev) => !prev);
  };

  return (
    <nav className="Mobile-Nav">
      <div className="Mobile-Nav__icons">
        <div className="Mobile-Nav__icon-container">
          <svg
            className="Mobile-Nav__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="43.921"
            height="35"
            viewBox="0 0 43.921 35"
          >
            <g id="Home_tab" data-name="Home tab" transform="translate(0 0)">
              <path
                id="home"
                data-name="home"
                d="M21.378,9.08,7.321,20.945V33.75A1.235,1.235,0,0,0,8.541,35l8.544-.023a1.236,1.236,0,0,0,1.214-1.25V26.249A1.235,1.235,0,0,1,19.519,25H24.4a1.235,1.235,0,0,1,1.22,1.25v7.473a1.266,1.266,0,0,0,.356.887,1.205,1.205,0,0,0,.864.368L35.38,35a1.235,1.235,0,0,0,1.22-1.25V20.936L22.545,9.08A.912.912,0,0,0,21.378,9.08Zm22.205,8.064L37.21,11.76V.938A.926.926,0,0,0,36.295,0h-4.27a.926.926,0,0,0-.915.938V6.611L24.283.856a3.592,3.592,0,0,0-4.651,0L.332,17.144a.954.954,0,0,0-.122,1.32l1.944,2.422a.9.9,0,0,0,1.289.127L21.378,5.876a.912.912,0,0,1,1.167,0L40.48,21.014a.9.9,0,0,0,1.289-.125l1.944-2.422a.954.954,0,0,0-.13-1.323Z"
                transform="translate(0 0)"
              />
            </g>
          </svg>
        </div>
        <div
          onClick={TogglePopup}
          className="Mobile-Nav__icon-container Mobile-Nav__icon-container"
        >
          <svg
            className="Mobile-Nav__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="33.312"
            height="35"
            viewBox="0 0 33.312 35"
          >
            <g
              id="Favourites_tab"
              data-name="Favourites tab"
              transform="translate(11 132)"
            >
              <path
                id="Icon_awesome-star"
                data-name="Icon awesome-star"
                d="M16.31,1.217l-4.066,9.05-9.1,1.456a2.25,2.25,0,0,0-1.1,3.732l6.581,7.04L7.07,32.439a2.036,2.036,0,0,0,2.889,2.3l8.138-4.7,8.138,4.7a2.038,2.038,0,0,0,2.889-2.3l-1.557-9.945,6.581-7.04a2.25,2.25,0,0,0-1.1-3.732l-9.1-1.456-4.066-9.05A1.92,1.92,0,0,0,16.31,1.217Z"
                transform="translate(-12.441 -131.999)"
              />
            </g>
          </svg>
        </div>
        <div className="Mobile-Nav__icon-container">
          <svg
            className="Mobile-Nav__icon"
            id="Tasklist_Tab"
            data-name="Tasklist Tab"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 35 35"
          >
            <path
              id="Icon_ionic-ios-list-box"
              data-name="Icon ionic-ios-list-box"
              d="M3.375,6.294V35.456a2.92,2.92,0,0,0,2.919,2.919H35.456a2.92,2.92,0,0,0,2.919-2.919V6.294a2.92,2.92,0,0,0-2.919-2.919H6.294A2.915,2.915,0,0,0,3.375,6.294Zm7.511,24.99a1.68,1.68,0,1,1,1.447-1.447A1.674,1.674,0,0,1,10.886,31.284Zm0-8.748a1.68,1.68,0,1,1,1.447-1.447A1.674,1.674,0,0,1,10.886,22.536Zm0-8.748a1.68,1.68,0,1,1,1.447-1.447A1.674,1.674,0,0,1,10.886,13.788ZM31.7,30.8H16.556a1.181,1.181,0,0,1-1.178-1.178h0a1.181,1.181,0,0,1,1.178-1.178H31.7a1.181,1.181,0,0,1,1.178,1.178h0A1.181,1.181,0,0,1,31.7,30.8Zm0-8.748H16.556a1.181,1.181,0,0,1-1.178-1.178h0a1.181,1.181,0,0,1,1.178-1.178H31.7a1.181,1.181,0,0,1,1.178,1.178h0A1.181,1.181,0,0,1,31.7,22.048Zm0-8.748H16.556a1.181,1.181,0,0,1-1.178-1.178h0a1.181,1.181,0,0,1,1.178-1.178H31.7a1.181,1.181,0,0,1,1.178,1.178h0A1.181,1.181,0,0,1,31.7,13.3Z"
              transform="translate(-3.375 -3.375)"
            />
          </svg>
        </div>
        <div className="Mobile-Nav__icon-container">
          <svg
            className="Mobile-Nav__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 45 45"
          >
            <path
              id="Icon_material-account-circle"
              data-name="Icon material-account-circle"
              d="M25.5,3A22.5,22.5,0,1,0,48,25.5,22.508,22.508,0,0,0,25.5,3Zm0,6.75a6.75,6.75,0,1,1-6.75,6.75A6.741,6.741,0,0,1,25.5,9.75Zm0,31.95A16.2,16.2,0,0,1,12,34.455c.068-4.478,9-6.93,13.5-6.93,4.478,0,13.432,2.452,13.5,6.93A16.2,16.2,0,0,1,25.5,41.7Z"
              transform="translate(-3 -3)"
            />
          </svg>
        </div>
      </div>
      {PopUpActive && (
        <div className="popout">
          <button onClick={TogglePopup}>close</button>
          <h1 className="popout__title">Groups</h1>
          <ul></ul>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
