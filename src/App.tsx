import { useState } from "react";
import "./App.css";
import AceCodeEditor from "./components/ui/aceEditor";
import logoIcon from "../public/play-svgrepo-com.svg";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function App() {
  const [toggleScript, setToggleScript] = useState<boolean>(false);

  function handleToggleScript() {
    setToggleScript(!toggleScript);
  }

  return (
    <>
      <section className="">
        <header className="p-2 border-b-2 border-gray-900">
          <div className="flex items-center gap-1">
            <div>
              <img
                src={logoIcon}
                alt="run logo"
                className="w-4 aspect-square"
              />
            </div>
            <div className="">
              <h2 className="text-sm font-bold text-white pb-1">run</h2>
            </div>
          </div>
        </header>

        <div className="w-full">
          {/* <PanelGroup direction="vertical">
            <Panel defaultSize={90}> */}
              <PanelGroup direction="horizontal">
                <div className="flex items-center w-full">
                  <Panel className="w-full" defaultSize={100} minSize={10}>
                    <div className="w-full">
                      <button className="py-2 px-6 bg-gray-900 text-pink-700 text-sm">
                        HTML
                      </button>
                      <AceCodeEditor
                        width="100%"
                        height="400px"
                        name="html"
                        mode="html"
                      />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="w-2 h-full bg-slate-300" />

                  <Panel defaultSize={100} className="w-full" minSize={10}>
                    <div className="w-full">
                      <button className="py-2 px-6 bg-gray-900 text-blue-500 text-sm">
                        CSS
                      </button>
                      <AceCodeEditor
                        width="100%"
                        height="400px"
                        name="css"
                        mode="css"
                      />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="w-2 h-full bg-slate-300" />

                  <Panel defaultSize={100} minSize={10}>
                    <div className="w-full">
                      <button
                        onClick={handleToggleScript}
                        className={`py-2 px-6 bg-gray-900 ${
                          !toggleScript ? "text-yellow-400" : "text-blue-500"
                        } text-sm`}
                      >
                        {!toggleScript ? "JS" : "TS"}
                      </button>
                      {!toggleScript ? (
                        <AceCodeEditor
                          width="100%"
                          height="400px"
                          name="javascript"
                          mode="javascript"
                        />
                      ) : (
                        <AceCodeEditor
                          width="100%"
                          height="400px"
                          name="typescript"
                          mode="typescript"
                        />
                      )}
                    </div>
                  </Panel>
                </div>
              </PanelGroup>
            {/* </Panel> */}
            {/* <PanelResizeHandle className="w-full h-2 bg-slate-500" /> */}

            {/* <Panel defaultSize={10}> */}
              <div className="w-full h-20 overflow-y-auto bg-slate-200 border-[4px] border-slate-700"></div>
            {/* </Panel>
          </PanelGroup> */}
        </div>
      </section>
    </>
  );
}

export default App;
