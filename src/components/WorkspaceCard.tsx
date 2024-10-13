import DropDownMenu from "./ui/menu-dropdown";
import { IWorkspace } from "@/lib/definitions";
import { Link } from "react-router-dom";

interface WorkSpaceCardProps {
  props: IWorkspace;
}
export default function WorkSpaceCard({ props }: WorkSpaceCardProps) {
  return (
    <>
      <section className="cursor-pointer">
        <div className="bg-gray-600 p-3 rounded-md w-full">
          <div className="relative bg-black/70 px-3 py-2 rounded-t-md flex justify-between items-center">
            <p className="text-gray-300 font-semibold">{props.name}</p>

            <DropDownMenu id={props.id} title={props.name} />
          </div>
          <div className="bg-slate-400 w-full relative h-36">
            <Link
              to={`/playground/${props.id}`}
              className="py-16 w-full h-full flex justify-center items-center"
            >
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
