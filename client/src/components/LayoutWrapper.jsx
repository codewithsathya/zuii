import SectionContainer from "./SectionContainer";
import { ReactComponent as Logo } from "../logo.svg";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import Avatar from "@mui/material/Avatar";

const LayoutWrapper = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex h-screen w-full flex-col justify-between font-sans">
      <header className="flex w-full items-center justify-between">
        <div className="mx-[5px] md:mx-3">
          <a href="/" aria-label="">
            <Logo className="max-w-[200px] overflow-y-hidden" />
          </a>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:flex">
            {user && (
              <Avatar
                sx={{ bgcolor: "lightblue", mr: "20px" }}
                alt="Remy Sharp"
                src={user?.profilePic}
              >
                {user?.name.charAt(0)}
              </Avatar>
            )}
            <div className="p-1 mr-2 font-medium text-gray-900 hover:text-[#008cff]">
              <AuthModal />
            </div>
          </div>
          <div className="sm:hidden">
            <div className="px-0 sm:px-2 mr-0 sm:mr-2 font-medium text-gray-900 hover:text-[#008cff]">
              <AuthModal />
            </div>
          </div>
        </div>
      </header>
      <hr className="my-0"></hr>
      <main className="mb-auto">{children}</main>
    </div>
  );
};

export default LayoutWrapper;
