import { useState } from "react";
import useUser from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import Loader from "./Loader";

const UpdateProfile = ({ setOpenUpdateModel }) => {
  const { user, loadingUser, updateUser, updatingUser } = useUser();

  const [avatar, setAvatar] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    updateUser(formData, {
      onSuccess: () => setOpenUpdateModel(false),
    });
  };

  if (loadingUser) return <Loader />;

  return (
    <div className="absolute top-0 backdrop-blur-sm right-0 w-full h-screen flex items-center justify-center bg-black/10 z-50">
      <div className="bg-gray-800 p-5 rounded-lg space-y-5 lg:w-100 w-[95%] max-h-[95%] sm:w-[60%] overflow-auto">
        <h1 className="lg:text-xl text-lg text-gray-200 font-bold">
          Update Profile
        </h1>
        <div className="relative rounded-full group flex flex-col items-center justify-center">
          <img
            src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
            className="w-44 h-44 object-cover rounded-full border-2 border-gray-600"
            alt="Profile"
          />
          <div className="transition-all mt-2 group hover:bg-gray-800 border-2 border-gray-600 bg-gray-700 px-4 p-1 text-sm rounded-full">
            <label htmlFor="preview">Edit</label>
            <input
              hidden
              id="preview"
              name="avatar"
              type="file"
              accept="image/*"
              disabled={updatingUser}
              {...register("avatar")}
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatar(file);
                setValue("avatar", file, { shouldValidate: true });
              }}
            />
          </div>
        </div>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                className="bg-gray-700 text-sm active:scale-95 hover:bg-gray-600 transition-all text-white px-4 py-2 rounded-lg"
                onClick={() => setOpenUpdateModel(false)}
              >
                Cancel
              </button>
              <button
                disabled={updatingUser}
                className={` text-sm transition-all text-white px-4 py-2 rounded-lg ${
                  updatingUser
                    ? "bg-blue-900 cursor-not-allowed"
                    : "hover:bg-blue-700 bg-blue-600 active:scale-95"
                }`}
              >
                {updatingUser ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
