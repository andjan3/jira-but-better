import { UserIcon } from "./user-icon";

export const Nav = async () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[100px] bg-slate-50 flex items-center px-10 justify-between  shadow-md w-full z-30">
      <a href="/" className="font-semibold">
        Jira but better
      </a>

      <UserIcon />
    </nav>
  );
};
