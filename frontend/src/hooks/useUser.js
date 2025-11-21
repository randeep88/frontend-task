import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPaths";
import { toast } from "react-hot-toast";

const useUser = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data: user, isPending: loadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + API_PATHS.USER.GET_CURRENT_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updateUser, isPending: updatingUser } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.patch(
        BASE_URL + API_PATHS.USER.UPDATE_USER,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error("User updated failed", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
    },
  });

  return { user, loadingUser, updateUser, updatingUser };
};

export default useUser;
