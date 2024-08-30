import React, { useState, useEffect, useRef } from "react";

type ConsoleMessage = {
  type: "log" | "error" | "warn" | "info";
  message: string[];
};

export default function ConsoleLog({
  javascript,
  output,
}: {
  javascript: string;
  output: string;
}) {
  const [consoleLogs, setConsoleLogs] = useState<ConsoleMessage[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setConsoleLogs([]); // Clear previous logs when javascript changes

    const captureConsoleLogs = `
        ${output}
      <script>
        const originalConsole = window.console;
        window.console = {
          log: (...args) => {
            window.parent.postMessage({ type: 'log', message: args.map(String) }, '*');
            originalConsole.log(...args);
          },
          error: (...args) => {
            window.parent.postMessage({ type: 'error', message: args.map(String) }, '*');
            originalConsole.error(...args);
          },
          warn: (...args) => {
            window.parent.postMessage({ type: 'warn', message: args.map(String) }, '*');
            originalConsole.warn(...args);
          },
          info: (...args) => {
            window.parent.postMessage({ type: 'info', message: args.map(String) }, '*');
            originalConsole.info(...args);
          },
        };

        // Execute the provided JavaScript
        try {
          ${javascript}
        } catch (error) {
          console.error('Execution error:', error.message);
        }
      </script>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = captureConsoleLogs;
    }
  }, [javascript]);

  useEffect(() => {
    const handleConsoleMessage = (event: MessageEvent) => {
      const data = event.data as ConsoleMessage;

      if (data && data.type && data.message) {
        setConsoleLogs((prevLogs) => [...prevLogs, data]);
      }
    };

    window.addEventListener("message", handleConsoleMessage);

    return () => {
      window.removeEventListener("message", handleConsoleMessage);
    };
  }, []);

  const getMessageColor = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "text-red-500";
      case "warn":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-white";
    }
  };

  return (
    <section className="w-full">
      <iframe ref={iframeRef} style={{ display: "none" }} />
      <div className="h-20 overflow-y-auto bg-slate-800 border-4 border-slate-700 p-2">
        {consoleLogs.map((log, index) => (
          <div
            key={index}
            className={`${getMessageColor(log.type)} font-mono text-sm`}
          >
            {log.type !== "log" && (
              <span className="font-bold">[{log.type.toUpperCase()}] </span>
            )}
            <span>{log.message.join(" ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
