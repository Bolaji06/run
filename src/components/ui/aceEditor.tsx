import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/ext-language_tools";


interface IAceEditorProps {
  mode: string;
  width: string;
  height: string;
  name: string;
  onChange: (newValue: string) => void;
  value: string
  className?: string;
}
export default function AceCodeEditor({
  mode,
  width,
  height,
  name,
  className,
  onChange,
  value
}: IAceEditorProps) {



  
  return (
    <>
      <AceEditor
        mode={mode}
        theme="monokai"
        onChange={onChange}
        //onLoad={"onLoad"}
        width={width}
        height={height}
        className={className}
        name={name}
        editorProps={{ $blockScrolling: Infinity }}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          ableSnippets: true,
        }}
        
      />
    </>
  );
}
