import { getWorkSpace } from "@/utils/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Play from "./Play";
import { IPlaygroundData } from "@/utils/definitions";
import { Loader, Loader2 } from "lucide-react";

export default function Playground() {
  const [workspaceData, setWorkspaceData] = useState<IPlaygroundData | null>(
    null
  );
  const [loadingSheet, setLoadingSheet] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const getWorkSpaceData = async () => {
      setLoadingSheet(false);
      try {
        setLoadingSheet(true);
        if (id) {
          const data = await getWorkSpace(id);
          console.log(data);
          setWorkspaceData(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      } finally {
        setLoadingSheet(false);
      }
    };
    getWorkSpaceData();
  }, [id]);

  console.log(workspaceData);

  return (
    <>
      <main>
        {loadingSheet ? (
          <div className="flex justify-center items-center w-screen h-screen align-middle">
            <div className="">
              <h1 className="text-3xl text-slate-300 text-center py-3">
                Preparing Workspace
              </h1>
              <Loader
                className="animate-spin text-slate-300 w-full"
                size={50}
              />
            </div>
          </div>
        ) : (
          <Play
            html={workspaceData?.workspace?.sheets[0].contents}
            css={workspaceData?.workspace.sheets[1].contents}
            javascript={workspaceData?.workspace.sheets[2].contents}
          />
        )}
      </main>
    </>
  );
}
