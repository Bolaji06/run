import { HardDriveDownload, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import logoIcon from "/play-svgrepo-com.svg";
import { useState } from "react";
import LoginSignupComponent from "./LoginSignUpComponent";

export default function Header() {
  const [toggleAuth, setToggleAuth] = useState<boolean>(false);

  function handleOpenAuth() {
    setToggleAuth(true);
  }
  function handleCloseAuth() {
    setToggleAuth(false);
  }

  return (
    <>
      <header className="p-2 border-b-2 border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div>
              <img
                src={logoIcon}
                alt="run logo"
                className="w-4 aspect-square"
              />
            </div>
            <div className="">
              <h2 className="text-sm font-bold text-white pb-1">run</h2>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Button
              className="flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50"
              title="save"
            >
              Save
              <HardDriveDownload size={19} className="text-gray-300" />
            </Button>

            <Button
              onClick={handleOpenAuth}
              className="flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50"
            >
              Login / Sign up
              <LogIn size={19} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </header>

      {toggleAuth && <LoginSignupComponent closeAuth={handleCloseAuth}/>}
    </>
  );
}
