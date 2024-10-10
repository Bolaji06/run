import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import DropDownMenu from "./ui/menu-dropdown";
import { useEffect, useRef, useState } from "react";
import { IWorkspace } from "@/lib/definitions";
import { Link } from "react-router-dom";

interface WorkSpaceCardProps {
  props: IWorkspace;
}
export default function WorkSpaceCard({ props }: WorkSpaceCardProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  function handleToggleMenu(id: string) {
    setOpenId((prevState) => prevState === id ? null : id);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  return (
    <>
      <section className="cursor-pointer" ref={cardRef}>
        <div className="bg-gray-600 p-3 rounded-md w-full">
          <div className="relative bg-black/70 px-3 py-2 rounded-t-md flex justify-between items-center">
            <p className="text-gray-300 font-semibold">{props.name}</p>

            <Button
              onClick={() => handleToggleMenu(props.id)}
              className="px-0 w-10 h-4 bg-transparent hover:bg-transparent"
            >
              <Ellipsis size={30} />
            </Button>
            {openId === props.id && (
              <div className="absolute top-8 right-3 z-20">
                <DropDownMenu />
              </div>
            )}
          </div>
          <div className="bg-slate-400 w-full relative h-36">
            <Link to={`/playground/${props.id}`} className="py-16 w-full h-full flex justify-center items-center">
              <h1 className="text-2xl text-center font-bold text-gray-600/45">
                Workspace
              </h1>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
