import { UserIcon } from "./user-icon";

export const Nav = () => {
  return (
    <nav className=" h-[100px] w-full flex items-center p-4 px-10 justify-between relative top-0 left-0 right-0 z-10 shadow-md">
      <a href="/">Jira but better</a>

      <UserIcon />
    </nav>
  );
};
