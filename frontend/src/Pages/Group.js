import { useEffect, useContext, useState } from "react";
import { TaskContext, TaskReducerTypes } from "../contexts/TaskContext";
import {
  GroupContext,
  types as GroupReducerTypes,
} from "../contexts/GroupContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, Redirect } from "react-router";
import axios from "axios";

import { GroupContainer, LoadingScreen } from "../componets";

const Group = () => {
  const [Loading, setLoading] = useState(true);
  const [authenticated] = useContext(AuthContext);
  const [TaskState, TaskDispatcher] = useContext(TaskContext);
  const [GroupState, GroupDispatcher] = useContext(GroupContext);
  const { groupid } = useParams();

  useEffect(() => {
    const GetTasks = async () => {
      setTimeout(async () => {
        const response = await fetchTasks(groupid);
        if (response.length >= 1) {
          TaskDispatcher({
            type: TaskReducerTypes.ADD_TASKS,
            payload: [...response],
          });
        }
        setLoading(false);
      }, 2500);
    };

    setLoading(true);
    GroupDispatcher({
      type: GroupReducerTypes.SET_CURRENT,
      payload: groupid,
    });

    GetTasks();
  }, [groupid]);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (Loading) {
    return <LoadingScreen />;
  }

  return (
    <GroupContainer fave title={GroupState.current_group.name || "group"} />
  );
};

export default Group;

const fetchTasks = async (id) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/taskgroups/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      return [];
    }
    return response.data["task groups"].tasks;
  } catch (err) {
    return err;
  }
};
