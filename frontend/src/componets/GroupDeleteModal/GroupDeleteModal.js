import { LargeButton } from "..";
import { useHistory } from "react-router";
import { GroupContext, types } from "../../contexts/GroupContext";
import { useContext } from "react";

const GroupDeleteModal = ({ ToggleDeleteModal, id }) => {
  const History = useHistory();
  const [GroupState, GroupDispatcher] = useContext(GroupContext);

  const DeleteGroup = () => {
    GroupDispatcher({
      type: types.DELETE_GROUP,
      payload: GroupState.current_group.id,
    });
    History.push("/");
  };

  return (
    <aside className="GroupDeleteModal">
      <div className="overlay" onClick={ToggleDeleteModal}></div>
      <div className="content">
        <h3 className="content__text">
          Are you sure you would like to delete this group and all its
          associated tasks?
        </h3>
        <div className="content__buttons">
          <LargeButton onClick={DeleteGroup} text="Confirm" />
          <LargeButton onClick={ToggleDeleteModal} text="Cancel" />
        </div>
      </div>
    </aside>
  );
};

export default GroupDeleteModal;
