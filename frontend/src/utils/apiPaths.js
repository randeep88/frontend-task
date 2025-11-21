const BASE_URL = "http://192.168.1.132:5000";

const API_PATHS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  USER: {
    GET_CURRENT_USER: "/api/user/get-current-user",
    UPDATE_USER: "/api/user/update-user",
  },

  TASK: {
    GET_ALL_TASKS: "/api/task/get-all-tasks",
    ADD_TASK: "/api/task/add-task",
    START_TASK: (id) => `/api/task/start-task/${id}`,
    MARK_AS_COMPLETED: (id) => `/api/task/mark-as-completed/${id}`,
    DELETE_TASK: (id) => `/api/task/delete-task/${id}`,
  },
};

export { BASE_URL, API_PATHS };
