export const guessRows = [
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
];

export enum UNIQUE_WORDS_ENUM {
  PRESENT = "present",
  CORRECT = "correct",
  PRIMARY = "primary",
}

export const UNIQUE_WORDS: {
  [key in UNIQUE_WORDS_ENUM]: true;
} = {
  [UNIQUE_WORDS_ENUM.PRESENT]: true,
  [UNIQUE_WORDS_ENUM.CORRECT]: true,
  [UNIQUE_WORDS_ENUM.PRIMARY]: true,
};

export const PRESENT = "present";
export const CORRECT = "correct";
export const PRIMARY = "primary";
export const BLIND_CORRECT = "Blindcorrect";
export const BLIND_PRESENT = "blindPresent";
export const BLACK_MODE = "blackMode";
export const LIGHT_PRIMARY = "lightPrimary";

export class globalData {
  public static rowIndex = 0;
  public static isAbleToType = true;
  public static gameRowIndex = 0;
  public static darkMode = false;
  public static HighContrastModeFlag = false;
  public static gameOver = false;
  public static secretWord = "";
  public static guessRowsPanel = guessRows;
  public static clearGame = false;
  public static buttonColors: Array<{ color: string; word: string }> = [];
  public static keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["spacer", "A", "S", "D", "F", "G", "H", "J", "K", "L", "spacer"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "«"],
  ];
}
