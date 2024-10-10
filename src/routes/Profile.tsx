import { decodeToken, formatDate, getCookie } from "@/lib/utils";
import dAvatar from "../../public/avatar.svg";
import { Input } from "@/components/ui/input";
import WorkSpaceCard from "@/components/WorkspaceCard";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllWorkspace } from "@/utils/data";
import { IUserWorkspace } from "@/lib/definitions";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import CreateWorkSpaceDialog from "@/components/CreateWorkSpaceDialog";

export default function ProfilePage() {
  const token = getCookie("login");
  const userProfile = decodeToken(token);
  const [loadingWorkspace, setLoadingWorkspace] = useState<boolean>(false);
  const [workspace, setWorkspace] = useState<IUserWorkspace | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const { parseHeader, parsePayload } = userProfile;
  const navigate = useNavigate();

  const { username, createdAt, avatar } = parsePayload;

  function handleSearchOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    if (!token) {
      navigate(0);
    }
  }, [token]);

  useEffect(() => {
    const getWorkspace = async () => {
      setLoadingWorkspace(false);
      try {
        setLoadingWorkspace(true);
        const result = await getAllWorkspace(token, searchInput);
        setWorkspace(result);
      } catch (error) {
        if (error instanceof Error) {
          return error;
        }
      } finally {
        setLoadingWorkspace(false);
      }
    };
    getWorkspace();
  }, [searchInput]);

  return (
    <>
      <main className="h-screen">
        <div className="flex h-full">
          <aside className="basis-[25%] border-r border-slate-700 h-full py-3">
            <div className="flex justify-center flex-col text-center mt-10 items-center align-middle">
              <div>
                <img
                  src={avatar ? avatar : dAvatar}
                  className="w-32 aspect-square rounded-full border"
                />
              </div>

              <div className="mt-10 text-slate-300">
                <p>{username}</p>

                <p className="text-sm">Joined {formatDate(createdAt)}</p>
              </div>
            </div>
          </aside>

          <section className="basis-[75%] py-3 px-4 w-full">
            <div className="flex justify-between">
              <header>
                <h2 className="text-slate-300 text-2xl font-bold">Workspace</h2>
              </header>

              <div className="w-1/2 flex gap-3">
                <div className="w-full">
                  <Input
                    onChange={handleSearchOnChange}
                    value={searchInput}
                    name="searchInput"
                    className="bg-gray-500 border-none text-slate-50 font-semibold placeholder:text-slate-400"
                    placeholder="Search all workspace"
                  />
                </div>
                <div>
                  <CreateWorkSpaceDialog />
                </div>
              </div>
            </div>

            {loadingWorkspace ? (
              <div className="flex justify-center items-center align-middle h-screen">
                <Loader size={40} className="text-gray-400 animate-spin" />
              </div>
            ) : (
              <div className="h-full overflow-y-auto mt-6 pb-10">
                <div className="grid-container gap-4 px-2 pb-10">
                  {workspace?.userWorkSpace.length ? (
                    workspace?.userWorkSpace.map((workspace) => {
                      return (
                        <div>
                          <WorkSpaceCard props={workspace} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="absolute top-1/2 left-1/2 translate-x-1/2 text-center text-gray-400">
                      <h2 className="text-2xl py-2">No workspace yet!</h2>
                      <p>Create a new workspace</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
