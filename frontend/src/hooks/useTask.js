import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPaths";
import { toast } from "react-hot-toast";

const useTask = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data: tasks, isPending: loadingTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + API_PATHS.TASK.GET_ALL_TASKS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },
  });

  const { mutate: addTask, isPending: addingTask } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + API_PATHS.TASK.ADD_TASK, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Task added successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },
  });

  const { mutate: markAsCompleted, isPending: markingAsCompleted } =
    useMutation({
      mutationFn: async (id) => {
        const res = await axios.patch(
          BASE_URL + API_PATHS.TASK.MARK_AS_COMPLETED(id),
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      },

      onSuccess: (data) => {
        toast.success("Task marked as completed", {
          style: {
            color: "white",
            background: "#030712",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },

      onError: (error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          style: {
            color: "white",
            background: "#030712",
          },
        });
      },
    });

  const { mutate: startTask, isPending: startingTask } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(
        BASE_URL + API_PATHS.TASK.START_TASK(id),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Task started successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },
  });

  const { mutate: deleteTask, isPending: deletingTask } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        BASE_URL + API_PATHS.TASK.DELETE_TASK(id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Task deleted successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },
  });

  return {
    tasks,
    loadingTasks,
    markAsCompleted,
    markingAsCompleted,
    startTask,
    startingTask,
    deleteTask,
    deletingTask,
    addTask,
    addingTask,
  };
};

export default useTask;
