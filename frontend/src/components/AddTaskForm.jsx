import useTask from "../hooks/useTask";
import { useForm } from "react-hook-form";

const AddTaskForm = ({ setOpenForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addTask, addingTask } = useTask();

  const onSubmit = (data) => {
    addTask(data);
    setOpenForm(false);
  };

  return (
    <div className="absolute top-0 backdrop-blur-sm right-0 w-full h-screen flex items-center justify-center bg-black/10 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-5 rounded-lg flex flex-col gap-5 lg:w-[30%] w-[95%] max-h-[90%] sm:w-[60%] overflow-auto"
      >
        <h1 className="lg:text-xl text-lg text-gray-200 font-bold">
          Add a new task
        </h1>

        <input
          type="text"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
          className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
        />

        <textarea
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
          })}
          className="p-2 px-3 text-gray-200 border border-gray-600 focus:outline-none focus:border-gray-400 rounded-lg w-full"
        />

        <div className="relative w-full">
          <select
            {...register("category", {
              required: "Category is required",
            })}
            className="p-2 px-3 w-full text-gray-200 border border-gray-600 rounded-lg transition-all focus:outline-none focus:border-gray-400 appearance-none cursor-pointer"
            name="category"
            id="category"
          >
            <option className="bg-gray-800 text-gray-200" value="">
              Select Category
            </option>
            <option className="bg-gray-800 text-gray-200" value="work">
              Work
            </option>
            <option className="bg-gray-800 text-gray-200" value="personal">
              Personal
            </option>
            <option className="bg-gray-800 text-gray-200" value="study">
              Study
            </option>
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            className="bg-gray-700 text-sm active:scale-95 hover:bg-gray-600 transition-all text-white px-4 py-2 rounded-lg"
            onClick={() => setOpenForm(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={addingTask}
            className={` text-sm transition-all text-white px-4 py-2 rounded-lg ${
              addingTask
                ? "bg-blue-900 cursor-not-allowed"
                : "hover:bg-blue-700 bg-blue-600 active:scale-95"
            }`}
          >
            {addingTask ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
