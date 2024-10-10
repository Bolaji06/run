import { FolderPen, Save, Trash } from "lucide-react";

export default function DropDownMenu(){

    return (
        <>
            <section className="rounded-md bg-gray-800 py-1 w-[150px] shadow-lg">
                <div className="space-y-2">
                    <div className="inline-flex gap-2 hover:bg-gray-600 py-1 text-slate-100 px-3 w-full">
                        <FolderPen size={18} className=""/>
                        <p className="font-medium text-sm">Rename</p>
                    </div>

                    <div className="inline-flex gap-2 hover:bg-gray-600 py-1 text-slate-100 px-3 w-full">
                        <Save size={18} className=""/>
                        <p className="font-medium text-sm">Save offline</p>
                    </div>

                    <div className="inline-flex gap-2 hover:bg-red-600 py-1 text-slate-100 px-3 w-full">
                        <Trash size={18} className=""/>
                        <p className="font-medium text-sm">Delete</p>
                    </div>
                    
                    

                    
                </div>

            </section>
        </>
    )
}