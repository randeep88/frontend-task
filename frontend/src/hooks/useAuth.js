import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPaths";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending: registeringUser } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + API_PATHS.REGISTER, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Registered successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
      navigate("/login");
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

  const { mutate: loginUser, isPending: loggingInUser } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + API_PATHS.LOGIN, data);
      return res.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully", {
        style: {
          color: "white",
          background: "#030712",
        },
      });
      navigate("/");
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

  return { registerUser, loginUser, registeringUser, loggingInUser };
};

export default useAuth;
