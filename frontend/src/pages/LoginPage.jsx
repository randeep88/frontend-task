import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const LoginPage = () => {
  const { loginUser, loggingInUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="bg-gray-950 w-full h-screen flex items-center justify-center">
      <div className="lg:w-auto w-[85%] sm:w-[60%] md:w-[50%]">
        <h1 className="text-2xl mb-5 text-gray-100 text-center font-semibold">
          Login to continue
        </h1>
        <form
          className="flex flex-col space-y-3 justify-center text-gray-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: "Email is required" })}
              className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
            />
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.email?.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.password?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={` text-sm transition-all text-white px-4 py-2 mt-4 rounded-lg ${
              loggingInUser
                ? "bg-blue-900 cursor-not-allowed"
                : "hover:bg-blue-700 bg-blue-600 active:scale-95"
            }`}
          >
            {loggingInUser ? "logging in..." : "Login"}
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-100 hover:text-blue-500 underline transition-all"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
