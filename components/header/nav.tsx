/* import { UserIcon } from "./user-icon";

export const Nav = () => {
  return (
    <nav className="w-[100%] h-[100px] flex items-center p-4 px-10 justify-between relative top-0 left-0 right-0 z-10 shadow-md">
      <a href="/">Jira but better</a>

      <UserIcon />
    </nav>
  );
};
 */

import { UserIcon } from "./user-icon";

export const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[100px] bg-slate-50 flex items-center px-10 justify-between  shadow-md w-full z-30">
      <a href="/" className="font-semibold text-lg">
        Jira but better
      </a>
      <UserIcon />
    </nav>
  );
};
