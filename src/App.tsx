import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor";
import { Tab, Tabs } from "react-bootstrap";

function App() {
  const [convertHTMLToString, setConvertHTMLToString] = useState("");

  const handleHTMLConversionToString = (value: string) => {
    setConvertHTMLToString(value);
  };

  return (
    <div className="container container-center bg-white p-5 rounded">
      <div className="row">
        <div className="col-lg-12"></div>
        <div className="col-lg-12"></div>
        <div>
          <Tabs
            className="mb-3"
            defaultActiveKey="rich-text-editor"
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <Tab eventKey="rich-text-editor" title="Rich-text Editor">
              <RichTextEditor onInput={handleHTMLConversionToString} />
            </Tab>
            <Tab
              eventKey="convert-html-to-string"
              title="Editor convertion to string"
            >
              <pre id="convertedHtml" className="form-control textarea-size">
                {convertHTMLToString}
              </pre>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
