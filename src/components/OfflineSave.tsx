import { getWorkspace } from "@/store/storeTransaction";
import { useEffect } from "react"

export default function SaveOffline(){

    useEffect(() => {
      function getOfflineWorkspace(){
        async function getLocalWorkspace(){
           const workspace = await getWorkspace()

           console.log(workspace);
        }
        getLocalWorkspace();
      }  
      getOfflineWorkspace();
    }, [])

    return (
        <>
            <section>
                
            </section>
        </>
    )
}