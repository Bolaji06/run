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
import { createWorkSpace } from "@/utils/data";
import { useNavigate } from "react-router-dom";
import { loadEnvFile } from "process";
import { useToast } from "@/hooks/use-toast";

interface IDataResult {
  success: boolean;
  newWorkSpace: any;
}
export default function CreateWorkSpaceDialog() {
  const token = getCookie("login");
  const userProfile = decodeToken(token);

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
    const createNewWorkSpace = async () => {
      setLoading(false);
      try {
        setLoading(true);
        const data = await createWorkSpace(username, textInput);
        setResult(data);

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    createNewWorkSpace();
  }

  useEffect(() => {
    if (result && result?.success){
      toast({
        title: 'Success!',
        description: 'New workspace created'
      })
      navigate(0);
    }

  }, [result?.success])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-10 bg-gray-600 aspect-square hover:bg-gray-500">
            <FolderPlus size={18} className="text-gray-200 " />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-800 border-none">
          <DialogHeader>
            <DialogTitle className="text-slate-300">
              Create new workspace
            </DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleOnSubmit} className="space-y-3">
              <Input
                onChange={handleInput}
                value={textInput}
                name="textInput"
                className="w-full border-none text-slate-50 bg-gray-600 outline-none focus-within:outline-gray-400 placeholder:text-slate-300"
                placeholder="Workspace name "
              />
              <Button disabled={loading} type="submit"
               className="inline-flex items-center gap-3 text-slate-200">
                Create
               {loading && <Loader className="animate-spin text-slate-200" size={18}/>}
                </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
