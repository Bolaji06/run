export default function IFrameOutput({ output }: { output: string }) {
  return (
    <>
      <div className="w-full h-full bg-slate-200 border-[4px] border-slate-700">
        <iframe
          className="h-full"
          id="output"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={output}
        />
      </div>
    </>
  );
}
