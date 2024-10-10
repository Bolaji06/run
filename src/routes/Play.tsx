import { useEffect, useState } from "react";
import AceCodeEditor from "@/components/ui/aceEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import IFrameOutput from "@/components/ui/IFrame";
import ConsoleLog from "@/components/ui/console";
import Header from "@/components/Header";
import { updateWorkspace } from "@/utils/data";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const defaultSize = [100, 100, 100];
const panelSize = window.localStorage.getItem("run_resizable_panels");
const size: number[] = panelSize ? JSON.parse(panelSize) : defaultSize;

interface PlayProps {
  html: string;
  css: string;
  javascript: string;
}
export default function Play({ html, css, javascript }: PlayProps) {
  const [toggleScript, setToggleScript] = useState<boolean>(false);

  function handleToggleScript() {
    setToggleScript(!toggleScript);
  }

  function onLayout(sizes: number[]) {
    window.localStorage.setItem("run_resizable_panels", JSON.stringify(sizes));
  }

  const [htmlValue, setHtmlValue] = useState<string>(html);
  const [cssValue, setCssValue] = useState<string>(css);
  const [javascriptValue, setJavscriptValue] = useState<string>(javascript);
  const [output, setOutput] = useState<string>("");
  const [toggleConsole, setToggleConsole] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { id } = useParams();
  const { toast } = useToast();

  function onChangeHtml(newValue: string) {
    setHtmlValue(newValue);
  }
  function onChangeCss(newValue: string) {
    setCssValue(newValue);
  }
  function onChangeJavascript(newValue: string) {
    setJavscriptValue(newValue);
  }

  function handleToggleConsole() {
    setToggleConsole(!toggleConsole);
  }

  function saveWorkSpace() {
    const saveSheetContents = async () => {
      setIsSaving(false);
      try {
        setIsSaving(true);
        if (id) {
          const updatedSheets = await updateWorkspace(id, [
            htmlValue,
            cssValue,
            javascriptValue,
          ]);
          if (updatedSheets.success) {
            toast({
              title: "Save!",
              description: "Workspace saved successfully",
            });
          }
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }finally{
        setIsSaving(false);
      }
    };
    saveSheetContents();
  }

  const code = `<html>
  <head>
    <style>${cssValue}</style>
  </head>
  <body>
    ${htmlValue}
    <script>${javascriptValue}</script>
  </body>
  </html>`;

  useEffect(() => {
    setOutput(code);
  }, [htmlValue, cssValue, javascriptValue]);

  return (
    <>
      <section className="">
        <nav>
          <Header saveWorkspace={saveWorkSpace} isSaving={isSaving}/>
        </nav>
        <div className="w-full">
          <PanelGroup direction="horizontal" onLayout={onLayout}>
            <div className="flex items-center w-full">
              <Panel className="w-full" defaultSize={size[0]} minSize={10}>
                <div className="w-full">
                  <button className="py-2 px-6 bg-gray-900 text-pink-700 text-sm">
                    HTML
                  </button>
                  <AceCodeEditor
                    width="100%"
                    height="400px"
                    name="html"
                    mode="html"
                    value={htmlValue}
                    onChange={onChangeHtml}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="w-2 h-full bg-slate-300" />

              <Panel defaultSize={size[1]} className="w-full" minSize={10}>
                <div className="w-full">
                  <button className="py-2 px-6 bg-gray-900 text-blue-500 text-sm">
                    CSS
                  </button>
                  <AceCodeEditor
                    width="100%"
                    height="400px"
                    name="css"
                    mode="css"
                    value={cssValue}
                    onChange={onChangeCss}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="w-2 h-full bg-slate-300" />

              <Panel defaultSize={size[2]} minSize={10}>
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
                      value={javascriptValue}
                      onChange={onChangeJavascript}
                    />
                  ) : (
                    <AceCodeEditor
                      width="100%"
                      height="400px"
                      name="typescript"
                      mode="typescript"
                      value={javascriptValue}
                      onChange={onChangeJavascript}
                    />
                  )}
                </div>
              </Panel>
            </div>
          </PanelGroup>

          <section className="relative">
            {!toggleConsole ? (
              <IFrameOutput output={output} />
            ) : (
              <ConsoleLog output={output} javascript={javascriptValue} />
            )}

            <button
              onClick={handleToggleConsole}
              className="fixed bg-gray-600 capitalize text-slate-100 px-2 py-1 bottom-1 text-xs right-8 cursor-pointer"
            >
              console
            </button>
          </section>
        </div>
      </section>
    </>
  );
}
