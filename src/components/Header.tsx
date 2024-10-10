import { HardDriveDownload, Loader2, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import logoIcon from "/play-svgrepo-com.svg";
import { useEffect, useState } from "react";
import LoginSignupComponent from "./LoginSignUpComponent";
import { getCookie } from "@/lib/utils";
import { jwtDecode, JwtPayload } from "jwt-decode";

import avatar from "../../public/avatar.svg";
import ProfileDropdown from "./ProfileDropdown";
import clsx from "clsx";

interface IHeaderProps {
  saveWorkspace?: () => void;
  isSaving?: boolean;
}
export default function Header({ saveWorkspace, isSaving }: IHeaderProps) {
  const [toggleAuth, setToggleAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>("");
  const [session, setSession] = useState<JwtPayload | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  function handleOpenAuth() {
    setToggleAuth(true);
  }
  function handleCloseAuth() {
    setToggleAuth(false);
  }

  function handleToggleDropDown() {
    setToggleDropDown((curState) => !curState);
  }

  useEffect(() => {
    const cookie = getCookie("login");
    setToken(cookie);

    if (token) {
      const decoded = jwtDecode(token);
      setSession(decoded);
    }
  }, [token]);

  console.log(session);

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

          <div className="flex gap-3 items-center px-2">
            {session && (
              <Button
                className={`${clsx({'bg-gray-800/70 cursor-not-allowed': isSaving})} flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50`}
                title="save"
                onClick={saveWorkspace}
                disabled={isSaving}
                aria-disabled={isSaving}
              >
                { isSaving ? "Saving" : "Save"}
               { isSaving ? <Loader2  className="animate-spin" size={19}/> : <HardDriveDownload size={19} className="text-gray-300" />}
              </Button>
            )}

            {!session ? (
              <Button
                onClick={handleOpenAuth}
                className="flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50"
              >
                Login / Sign up
                <LogIn size={19} className="text-gray-300" />
              </Button>
            ) : (
              <div
                onClick={handleToggleDropDown}
                className="w-8 aspect-square rounded-full border cursor-pointer"
              >
                <img
                  src={avatar}
                  alt="user profile avatar"
                  className="w-full aspect-square rounded-full"
                  title="User avatar"
                />
              </div>
            )}
          </div>
        </div>
        {toggleDropDown && (
          <div className="relative z-50 top-3">
            <ProfileDropdown />
          </div>
        )}
      </header>

      {toggleAuth && <LoginSignupComponent closeAuth={handleCloseAuth} />}
    </>
  );
}
