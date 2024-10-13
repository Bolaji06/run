import { Ellipsis, Save } from "lucide-react";

import RenameWorkSpaceDialog from "../RenameWorkspaceDialog";
import DeleteWorkSpaceDialog from "../DeleteWorkspaceDialog";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

interface DropDownMenuProps {
  id: string;
  title: string;
}
export default function DropDownMenu({ id, title }: DropDownMenuProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Ellipsis size={30} className="text-slate-300"/>
        </PopoverTrigger>
        <PopoverContent>
          <section className="rounded-md bg-gray-800 w-[150px] shadow-lg">
            <div className="space-y-2">
              <div className="hover:bg-gray-600 rounded-t-md">
                <RenameWorkSpaceDialog id={id} />
              </div>

              <div className="inline-flex gap-2 hover:bg-gray-600 py-1 text-slate-100 px-3 w-full">
                <Save size={18} className="" />
                <p className="font-medium text-sm">Save offline</p>
              </div>

              <div className="hover:bg-red-600 rounded-b-md">
                <DeleteWorkSpaceDialog id={id} title={title} />
              </div>
            </div>
          </section>
        </PopoverContent>
      </Popover>
    </>
  );
}
