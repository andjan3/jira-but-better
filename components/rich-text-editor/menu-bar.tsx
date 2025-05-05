import { ChevronLeft, X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/tiptap-ui-primitive/tooltip";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [color, setColor] = useState("#000000");
  const [showAll, setShowAll] = useState(false);
  const visibleOptionsCount = 10;

  if (!editor) return null;

  const clearFormatting = () => {
    editor
      .chain()
      .focus()
      .unsetAllMarks()
      .clearNodes()
      .setTextAlign("left")
      .unsetColor()
      .run();
  };

  const allOptions = [
    {
      type: "color-picker",
      element: (
        <Tooltip key="color-picker">
          <TooltipTrigger asChild>
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                editor.chain().focus().setColor(e.target.value).run();
              }}
              className="w-10 h-8 border-transparent rounded p-0 cursor-pointer shrink-0"
              aria-label="Text color"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Text color</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      icon: <Heading1 className="size-4" />,
      tooltip: "H1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      tooltip: "H2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      tooltip: "H3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      tooltip: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      tooltip: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      tooltip: "Line trough",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      tooltip: "Align left",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      tooltip: "Align center",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      tooltip: "Align right",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      tooltip: "Unordered list",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      tooltip: "Ordered list",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      tooltip: "Highlighter",
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <X className="size-4" />,
      tooltip: "Clear formatting",
      onClick: clearFormatting,
      pressed: false,
    },
  ];

  const toggleShowAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const visibleOptions = showAll
    ? allOptions.slice(-4)
    : allOptions.slice(0, visibleOptionsCount);
  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 flex items-center gap-2 pl-4">
      <div className="flex gap-2 overflow-x-hidden">
        {visibleOptions.map((option, index) =>
          option.type === "color-picker" ? (
            option.element
          ) : (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={option.pressed}
                  onPressedChange={option.onClick}
                  aria-label={option.tooltip}
                  className="shrink-0"
                >
                  {option.icon}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{option.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>

      {allOptions.length > visibleOptionsCount && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleShowAll}
              className="p-1 rounded hover:bg-gray-200 shrink-0"
              aria-label={showAll ? "Show less" : "Show more"}
            >
              {showAll ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          </TooltipTrigger>
        </Tooltip>
      )}
    </div>
  );
}
