import { profileDropdownLinks } from "@/utils/links";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookies } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  function handleLogout(){
    deleteCookies("login");
    navigate(0);
    toast({
      title: 'Logout successful',
      description: "You've successfully logout"
    });
  }

  return (
    <>
      <nav
        className="bg-gray-800 w-[200px] py-3 rounded-md text-slate-300
            absolute right-1"
      >
        <ul className="space-y-2">
          {profileDropdownLinks.map((item) => {
            return (
              <li className="" key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex gap-3 items-center w-full py-1 hover:bg-gray-600"
                >
                  <item.icon size={18} className="ml-2" />
                  {item.name}
                </Link>
              </li>
            );
          })}
          <Button 
          onClick={handleLogout}
          className="bg-transparent text-base px-3 hover:bg-gray-600 font-normal justify-start py-1 rounded-none w-full text-slate-300 flex gap-3">
            <LogOut size={15} />
            Logout
          </Button>
        </ul>
      </nav>
    </>
  );
}
