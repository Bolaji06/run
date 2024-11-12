/* eslint-disable */
import { Button } from "./ui/button";
import { Loader, Trash } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { decodeToken, getCookie } from "@/utils/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { deleteWorkspace } from "@/utils/data";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface IDataResult {
  success: boolean;
  newWorkSpace: any;
}
interface RenameDialogProps {
  id: string;
  title: string;
}
export default function DeleteWorkSpaceDialog({
  id,
  title,
}: RenameDialogProps) {
  const token = getCookie("login");
  const userProfile = decodeToken(token);

  //@ts-ignore
  const { parseHeader, parsePayload } = userProfile;

  const [result, setResult] = useState<IDataResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const deletingWorkspace = async () => {
      setLoading(false);
      try {
        setLoading(true);
        const data = await deleteWorkspace(id);
        setResult(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    deletingWorkspace();
  }

  useEffect(() => {
    if (result && result?.success) {
      toast({
        title: "Success!",
        description: "Workspace deleted",
      });
      navigate(0);
    }
  }, [result?.success]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="inline-flex gap-2 justify-start bg-transparent hover:bg-transparent rounded-none py-1 text-slate-100 px-3 w-full">
            <Trash size={18} className="text-gray-200 " />
            <p>Delete</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-800 border-none">
          <DialogHeader>
            <DialogTitle className="text-slate-300">
              Delete <span className="font-semibold">"{title}"</span>
            </DialogTitle>
            <p className="text-slate-400">
              You're about to delete this workspace action can't be undone
            </p>
          </DialogHeader>
          <div className="inline-flex justify-between py-2">
            <form onSubmit={handleOnSubmit} className="space-y-3">
              <Button
                disabled={loading}
                type="submit"
                className="inline-flex bg-red-600 hover:bg-red-800 items-center gap-3 text-slate-100"
              >
                {loading ? "Deleting" : "Delete"}
                {loading && (
                  <Loader className="animate-spin text-slate-200" size={18} />
                )}
              </Button>
            </form>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
