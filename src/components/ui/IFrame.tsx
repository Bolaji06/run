export default function IFrameOutput({ output }: { output: string }) {
  return (
    <>
      <div className="w-full h-20 overflow-y-auto bg-slate-200 border-[4px] border-slate-700">
        <iframe
          className="w-full"
          id="output"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={output}
        ></iframe>
      </div>
    </>
  );
}
