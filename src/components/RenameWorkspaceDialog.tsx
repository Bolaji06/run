/* eslint-disable */
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FileArchive, FolderPlus, Loader } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { decodeToken, getCookie } from "@/lib/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { renameWorkspace } from "@/utils/data";
import { useNavigate } from "react-router-dom";
import { loadEnvFile } from "process";
import { useToast } from "@/hooks/use-toast";
import { FolderPen } from "lucide-react";

interface IDataResult {
  success: boolean;
  newWorkSpace: any;
}
interface RenameDialogProps {
    id: string;
}
export default function RenameWorkSpaceDialog({ id }: RenameDialogProps) {
  const token = getCookie("login");
  const userProfile = decodeToken(token);

  //@ts-ignore
  const { parseHeader, parsePayload } = userProfile;
  const { username } = parsePayload;

  const [textInput, setTextInput] = useState<string>("");
  const [result, setResult] = useState<IDataResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const navigate = useNavigate()

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const renamingWorkspace = async () => {
      setLoading(false);
      try {
        setLoading(true);
        const data = await renameWorkspace(id, textInput);
        setResult(data);

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    renamingWorkspace();
  }

  useEffect(() => {
    if (result && result?.success){
      toast({
        title: 'Success!',
        description: 'Workspace renamed!'
      })
      navigate(0);
    }

  }, [result?.success])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="inline-flex gap-2 justify-start hover:bg-transparent py-1 bg-transparent rounded-none text-slate-100 px-3 w-full">
            <FolderPen size={18} className="text-gray-200 " />
            <p>Rename</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-800 border-none">
          <DialogHeader>
            <DialogTitle className="text-slate-300">
                Rename workspace
            </DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleOnSubmit} className="space-y-3">
              <Input
                onChange={handleInput}
                value={textInput}
                name="textInput"
                className="w-full border-none text-slate-50 bg-gray-600 outline-none focus-within:outline-gray-400 placeholder:text-slate-300"
                placeholder="Workspace name"
              />
              <Button disabled={loading} type="submit"
               className="inline-flex items-center gap-3 text-slate-200">
                Rename
               {loading && <Loader className="animate-spin text-slate-200" size={18}/>}
                </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
