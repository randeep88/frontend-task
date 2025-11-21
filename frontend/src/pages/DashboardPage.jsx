import AddTaskForm from "../components/AddTaskForm";
import useTask from "../hooks/useTask";
import { useEffect, useState } from "react";
import { Play, SquareCheckBig, Trash2 } from "lucide-react";
import Loader from "../components/Loader";
import LargeLoader from "../components/LargeLoader";

const DashboardPage = () => {
  const {
    tasks,
    loadingTasks,
    markAsCompleted,
    deleteTask,
    startTask,
    startingTask,
    markingAsCompleted,
    deletingTask,
  } = useTask();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (!tasks) return;

    let temp = tasks;

    if (search.trim() !== "") {
      temp = temp.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "") {
      temp = temp.filter((task) => task.category === category);
    }
    if (status !== "") {
      temp = temp.filter((task) => task.status === status);
    }

    setFilteredTasks(temp);
  }, [search, category, status, tasks]);

  const handleStartTask = (taskId) => {
    startTask(taskId);
  };

  const handleMarkAsCompleted = (taskId) => {
    markAsCompleted(taskId);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  if (loadingTasks) return <LargeLoader />;

  return (
    <div>
      <h1 className="lg:text-2xl text-lg text-gray-200 font-bold lg:mb-5 mb-3">
        Dashboard
      </h1>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search tasks by title..."
          className="p-2 px-3 text-gray-200 border border-gray-600 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex items-center lg:gap-5 gap-2 justify-end w-full lg:mt-5 mt-3">
        <div className="relative lg:w-50 w-42">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 lg:text-base text-xs px-3 w-full text-gray-200 border border-gray-600 rounded-lg transition-all focus:outline-none focus:border-gray-400 appearance-none cursor-pointer"
            name="category"
            id="category"
          >
            <option className="bg-gray-800 text-gray-200" value="">
              All
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

        <div className="relative lg:w-50 w-42">
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 lg:text-base text-xs px-3 w-full text-gray-200 border border-gray-600 rounded-lg transition-all focus:outline-none focus:border-gray-400 appearance-none cursor-pointer"
            name="category"
            id="category"
          >
            <option className="bg-gray-800 text-gray-200" value="">
              All
            </option>
            <option className="bg-gray-800 text-gray-200" value="pending">
              Pending
            </option>
            <option className="bg-gray-800 text-gray-200" value="in-progress">
              In Progress
            </option>
            <option className="bg-gray-800 text-gray-200" value="completed">
              Completed
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

        <button
          onClick={() => setOpenForm(true)}
          className="bg-blue-600 lg:w-auto lg:text-base text-xs md:w-auto sm:w-auto w-34 active:scale-95 hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-lg"
        >
          Add task
        </button>
      </div>

      <hr className="lg:my-5 my-3 text-gray-800" />

      {openForm && <AddTaskForm setOpenForm={setOpenForm} />}

      {filteredTasks.length > 0 ? (
        <div>
          {filteredTasks?.map((task) => (
            <div
              key={task?._id}
              className="lg:p-4 p-2 text-gray-200 bg-gray-900 lg:mb-4 mb-3 transition-all focus:outline-none focus:border-gray-400 rounded-lg w-full"
            >
              <div className="flex flex-col items-start lg:space-y-4 space-y-1">
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold lg:text-xl text-base text-gray-300 line-clamp-2 w-full">
                    {task?.title}
                  </p>
                  <div className="lg:flex md:flex items-center gap-2 hidden w-60 justify-end">
                    <span className="lg:text-xs text-[10px] text-gray-400 uppercase font-semibold p-1 px-2 border border-gray-400 rounded-full">
                      {task?.category}
                    </span>
                    <span
                      className={`lg:text-xs text-[10px] uppercase font-semibold p-1 px-2 border border-gray-700 rounded-full ${
                        task?.status === "pending"
                          ? "border-yellow-600 text-yellow-600"
                          : task?.status === "completed"
                          ? "border-green-600 text-green-600"
                          : "border-indigo-600 text-indigo-600"
                      }`}
                    >
                      {task?.status}
                    </span>
                  </div>
                </div>
                <p className="lg:text-sm text-xs text-gray-300">
                  {task?.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 w-full">
                <div className="flex sm:flex items-center gap-2 lg:hidden md:hidden w-full">
                  <span className="lg:text-xs text-[9px] text-gray-400 uppercase font-semibold p-1 px-2 border border-gray-400 rounded-full">
                    {task?.category}
                  </span>
                  <span
                    className={`lg:text-xs text-[9px] uppercase font-semibold p-1 px-2 border border-gray-700 rounded-full ${
                      task?.status === "pending"
                        ? "border-yellow-600 text-yellow-600"
                        : task?.status === "completed"
                        ? "border-green-600 text-green-600"
                        : "border-indigo-600 text-indigo-600"
                    }`}
                  >
                    {task?.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end w-full">
                  {task?.status === "pending" && (
                    <>
                      {startingTask ? (
                        <Loader />
                      ) : (
                        <Play
                          onClick={() => handleStartTask(task?._id)}
                          size={32}
                          className="text-yellow-600 hover:bg-yellow-950 transition-all p-1.5 rounded-lg"
                        />
                      )}
                    </>
                  )}
                  {task?.status === "in-progress" && (
                    <>
                      {markingAsCompleted ? (
                        <Loader />
                      ) : (
                        <SquareCheckBig
                          onClick={() => handleMarkAsCompleted(task?._id)}
                          size={32}
                          className="text-green-600 hover:bg-green-950 transition-all p-1.5 rounded-lg"
                        />
                      )}
                    </>
                  )}
                  {deletingTask ? (
                    <Loader />
                  ) : (
                    <Trash2
                      onClick={() => handleDeleteTask(task?._id)}
                      size={32}
                      className="text-red-600 hover:bg-red-950 transition-all p-1.5 rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center lg:h-100 h-70 text-gray-400">
          <div className="flex flex-col items-center gap-1">
            <p className="lg:text-xl text-gray-300 font-semibold">
              No tasks found
            </p>
            <p className="text-xs">
              Add a task by clicking on the "Add task" button
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
