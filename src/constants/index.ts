export const guessRows = [
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
  { words: ["", "", "", "", ""], acceptedWord: false },
];

export class globalData {
  public static rowIndex = 0;
  public static gameRowIndex = 0;
  public static gameOver = false;
  public static secretWord = "";
  public static guessRowsPanel = guessRows;
  public static clearGame = false;
  public static keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["spacer", "A", "S", "D", "F", "G", "H", "J", "K", "L", "spacer"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "«"],
  ];
}
