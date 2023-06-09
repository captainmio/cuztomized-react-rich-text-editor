import { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import TextField from "./TextField";
import NavigationToolbar from "./NavigationToolbar";

import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { listOl } from "react-icons-kit/fa/listOl";
import { listUl } from "react-icons-kit/fa/listUl";
import { quoteRight } from "react-icons-kit/fa/quoteRight";
import { link } from "react-icons-kit/feather/link";
import { alignLeft } from "react-icons-kit/feather/alignLeft";
import { alignCenter } from "react-icons-kit/feather/alignCenter";
import { alignRight } from "react-icons-kit/feather/alignRight";
import { alignJustify } from "react-icons-kit/feather/alignJustify";
import { underline } from "react-icons-kit/icomoon/underline";
import { rotateLeft } from "react-icons-kit/fa/rotateLeft";
import { rotateRight } from "react-icons-kit/fa/rotateRight";

interface RichTextEditorProps {
  onInput: (value: string) => void;
}

interface buttonSelectedProp {
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
  optionType: string;
  value?: string;
}

function RichTextEditor(props: RichTextEditorProps) {
  const { onInput } = props;

  // list of button that can be a basic option or advance option
  const [selectedButtons, setSelectedButtons] = useState<buttonSelectedProp[]>([
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
      name: "underline",
      icon: <Icon icon={underline} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "justifyLeft",
      icon: <Icon icon={alignLeft} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "justifyRight",
      icon: <Icon icon={alignRight} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "justifyCenter",
      icon: <Icon icon={alignCenter} />,
      isSelected: false,
      optionType: "basic",
    },
    {
      name: "justifyFull",
      icon: <Icon icon={alignJustify} />,
      isSelected: false,
      optionType: "advance",
      value: "true",
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
      value: "BLOCKQUOTE",
    },
    {
      name: "createLink",
      icon: <Icon icon={link} />,
      isSelected: false,
      optionType: "advance",
    },
  ]);

  // list of alignment buttons
  const alignBtn = [
    "justifyRight",
    "justifyLeft",
    "justifyCenter",
    "justifyFull",
  ];

  // list of button that can be active
  const canBeActiveBtn = ["bold", "italic", ...alignBtn];

  // font family lists
  const [fontList] = useState([
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
  ]);

  // font size lists from 1 to 7
  const [fontSizes] = useState(["1", "2", "3", "4", "5", "6", "7"]);

  // method to handle advance option buttons
  const handleAdvanceOption = (name: string, value: string) => {
    modifyText(name, false, value);
  };

  // method to handle basic option buttons
  const handleBasicOption = (name: string, id: number) => {
    if (canBeActiveBtn.indexOf(name) !== -1) {
      const newState = [...selectedButtons];
      newState[id].isSelected = !newState[id].isSelected;
      setSelectedButtons(newState);
    }

    modifyText(name, false, undefined);
  };

  // method to to force all align button to reset active
  const resetAlignBtnSelectedButton = () => {
    alignBtn.map((alignment) => {
      // resetting align buttons to isSelected to false
      const index = selectedButtons.findIndex(({ name }) => name === alignment);
      const newState = [...selectedButtons];
      newState[index].isSelected = false;
      setSelectedButtons(newState);
    });
  };

  // method to identify what type of button was clicked. it will call the method depending on what type of button was clicked(basic or advance)
  const handleButton = (
    button: buttonSelectedProp,
    name: string,
    id: number
  ) => {
    if (alignBtn.indexOf(name) !== -1) {
      // meaning the user clicked align buttons, we should reset the active(clicked) align button
      resetAlignBtnSelectedButton();
    }
    if (button.optionType === "basic") {
      handleBasicOption(name, id);
    } else {
      if (button.value) {
        // meaning value is provided in the code base

        handleAdvanceOption(name, button.value);

        if (canBeActiveBtn.indexOf(name) !== -1) {
          const newState = [...selectedButtons];
          newState[id].isSelected = !newState[id].isSelected;
          setSelectedButtons(newState);
        }
      } else {
        // value will be ask to the user
        identifyAdvanceOption(name);
      }
    }
  };

  // just a method for advance method that requires input(value) from the user
  const identifyAdvanceOption = (value: string): void => {
    let userValue;
    switch (value) {
      case "createLink":
        userValue = prompt("Provide input valid URL");
        if (userValue == null) {
          identifyAdvanceOption(value);
        } else {
          handleAdvanceOption(value, userValue);
        }
        break;

      default:
        break;
    }
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
      <NavigationToolbar className="d-flex gap-2 flex-wrap">
        <Select
          className="form-select w-auto d-grid"
          items={fontList}
          onSelect={(value) => handleAdvanceOption("fontName", value)}
        ></Select>

        <Select
          className="form-select w-auto d-grid"
          items={fontSizes}
          onSelect={(value) => handleAdvanceOption("fontSize", value)}
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
                handleButton(button, name, id);
              }}
              className={"d-grid " + (button.isSelected ? " btn-dark" : "")}
            >
              {button.icon}
            </Button>
          );
        })}
      </NavigationToolbar>
      <label className="mt-4 mb-2">
        <strong>Rich-text Editor here</strong>
      </label>
      <div
        className="form-control textarea-size"
        contentEditable="true"
        onInput={() => {
          const contenteditable = document.querySelector("[contenteditable]");

          onInput(contenteditable?.innerHTML as string);
        }}
      ></div>
    </>
  );
}

export default RichTextEditor;
