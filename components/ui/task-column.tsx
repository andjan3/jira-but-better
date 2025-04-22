import { GoPlus } from "react-icons/go";
export const TaskColumn = () => {
  return (
    <div className="flex justify-center gap-10 relative top-40">
      <div className="text-xl font-semibold bg-[#F7F8F9] w-[20%] h-[100vh] "></div>
      <div className="flex items-center h-[20%] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer">
        <GoPlus />
        <div>Add a list</div>
      </div>
    </div>
  );
};
