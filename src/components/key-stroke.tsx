type ModifierKey = "⌘" | "⇧" | "⌥" | "⌃" | "Shift" | "Alt" | "Ctrl" | "Meta";
type LetterKey =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
type NumberKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type SpecialKey =
  | "Enter"
  | "Tab"
  | "Space"
  | "Backspace"
  | "Delete"
  | "Escape"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Home"
  | "End"
  | "PageUp"
  | "PageDown";

type FunctionKey =
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12";

type Key = ModifierKey | LetterKey | NumberKey | SpecialKey | FunctionKey;

interface KeyStrokeProps {
  keys: Key[];
}

export const KeyStroke = ({ keys }: KeyStrokeProps) => {
  return (
    <div className="flex items-center gap-1.5">
      {keys.map((key, index) => (
        <div key={`key-${index}`}>
          <kbd className="p-0.5 flex items-center leading-none font-sans justify-center rounded-[4px] bg-white text-xs shadow-sm">
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span
              className="text-neutral-400 text-sm"
              key={`key-${index}-plus`}
            >
              +
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
