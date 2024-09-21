import { HardDriveDownload, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import logoIcon from "/play-svgrepo-com.svg";
import { useEffect, useState } from "react";
import LoginSignupComponent from "./LoginSignUpComponent";
import { getCookie } from "@/lib/utils";
import { jwtDecode, JwtPayload } from "jwt-decode";

import avatar from "../../public/avatar.svg";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const [toggleAuth, setToggleAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>("");
  const [session, setSession] = useState<JwtPayload | null>(null);

  function handleOpenAuth() {
    setToggleAuth(true);
  }
  function handleCloseAuth() {
    setToggleAuth(false);
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
           {session && <Button
              className="flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50"
              title="save"
            >
              Save
              <HardDriveDownload size={19} className="text-gray-300" />
            </Button>}

            {!session ? (
              <Button
                onClick={handleOpenAuth}
                className="flex gap-2 items-center rounded-2xl bg-gray-800 py-2 hover:bg-gray-800/50"
              >
                Login / Sign up
                <LogIn size={19} className="text-gray-300" />
              </Button>
            ) : (
              <div className="w-8 aspect-square rounded-full border cursor-pointer">
                <img
                  src={avatar}
                  alt="user profile avatar"
                  className="w-full aspect-square rounded-full"
                />
              </div>
            )}
            <div className="relative z-50 top-8">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {toggleAuth && <LoginSignupComponent closeAuth={handleCloseAuth} />}
    </>
  );
}
