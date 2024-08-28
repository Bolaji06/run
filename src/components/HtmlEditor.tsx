//import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
export default function HTMLEditor() {
  //const [value, setValue] = useState<string>("");

//   function onChange(e) {
//     setValue(e.target.value);
//   }

  return (
    <>
      <div>
        <AceEditor
         
          mode="html"
          theme="monokai"
          name="html"
          //   onLoad={onLoad}
          //onChange={onChange}
          fontSize={14}
          lineHeight={19}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={""}
          width="100%"
          height="450px"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </>
  );
}
