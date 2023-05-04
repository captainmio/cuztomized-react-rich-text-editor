import { useState, useEffect } from "react";
import Button from "./components/Button";
import Select from "./components/Select";
import TextField from "./components/TextField";
import NavigationToolbar from "./components/NavigationToolbar";

import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { listOl } from "react-icons-kit/fa/listOl";
import { listUl } from "react-icons-kit/fa/listUl";
import { quoteRight } from "react-icons-kit/fa/quoteRight";
import { link } from "react-icons-kit/feather/link";

function App() {
  const [selectedButtons, setSelectedButtons] = useState([
    {
      name: "bold",
      icon: <Icon icon={bold} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "italic",
      icon: <Icon icon={italic} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "insertOrderedList",
      icon: <Icon icon={listOl} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "insertUnorderedList",
      icon: <Icon icon={listUl} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "formatBlock",
      icon: <Icon icon={quoteRight} />,
      isSelected: false,
      optionType: "advance",
      value: "CITE",
    },
    {
      name: "createLink",
      icon: <Icon icon={link} />,
      isSelected: false,
      optionType: "advance",
    },
  ]);

  const toggableBtn = ["bold", "italic"];
  const fontList = ["Arial", "Times New Roman", "Georgia", "Verdana"];

  useEffect(() => {
    // initiate fontFamily
    handleAdvanceOption("fontName", fontList[0]);
  }, []);

  const handleAdvanceOption = (name: string, value: string) => {
    modifyText(name, true, value);
  };

  const handleBasicOption = (name: string, id: number) => {
    if (toggableBtn.indexOf(name) !== -1) {
      const newState = [...selectedButtons];
      newState[id].isSelected = !newState[id].isSelected;
      setSelectedButtons(newState);
    }

    modifyText(name, false, undefined);
  };

  const modifyText = (
    command: string,
    isDiplayUI: boolean,
    value: string | undefined
  ) => {
    document.execCommand(command, isDiplayUI, value);
  };

  return (
    <>
      <div className="container container-center bg-white p-5 rounded">
        <div className="row">
          <div className="col-lg-12">
            <blockquote>Test</blockquote>
            <NavigationToolbar className="d-flex gap-2">
              <Select
                className="form-select w-auto d-grid"
                items={fontList}
                onSelect={(value) => handleAdvanceOption("fontName", value)}
              ></Select>

              <div className="d-flex column-flex gap-2">
                <label className="my-auto mx-auto form-label">font color</label>
                <TextField
                  className="my-auto mx-auto"
                  type="color"
                  onChange={(value) => {
                    handleAdvanceOption("foreColor", value);
                  }}
                />
              </div>

              <div className="d-flex column-flex gap-2">
                <label className="my-auto mx-auto form-label">bg color</label>
                <TextField
                  className="my-auto mx-auto"
                  type="color"
                  onChange={(value) => {
                    handleAdvanceOption("backColor", value);
                  }}
                />
              </div>

              {selectedButtons.map((button, index) => {
                return (
                  <Button
                    name={button.name}
                    isActive={button.isSelected}
                    key={index}
                    id={index}
                    onClick={(name, id) => {
                      if (button.optionType === "basic") {
                        handleBasicOption(name, id);
                      } else {
                        button.value && handleAdvanceOption(name, button.value);
                      }
                    }}
                    className={
                      "d-grid " + (button.isSelected ? " btn-dark" : "")
                    }
                  >
                    {button.icon}
                  </Button>
                );
              })}
            </NavigationToolbar>
            <pre
              className="form-control textarea-size"
              contentEditable="true"
            ></pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
