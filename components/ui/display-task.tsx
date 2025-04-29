export const DisplayTask = ({ task }: any) => {
  return (
    <div className="shadow-md p-4 rounded-md bg-white">
      <div className="text-base">{task.title}</div>
    </div>
  );
};
