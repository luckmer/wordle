import keyGenerator from "./generators/virtualKeyboard/VirutalKeyboard";
import guessRows from "./generators/guessRows/guessRowsGenerator";
import keyboardGenerator from "./generators/userKeyboard/keyboard";
import randomWord from "./generators/randomWord/randomWordGenerator";
import localStorage from "./localStorage/localStorage";
import restart from "./actions/Restart";

randomWord.generateRandomWord();
localStorage.loadSavedArray();
keyboardGenerator.keyboardGenerator();
keyGenerator.keyGenerator();
guessRows.generateRows();
restart.initiateNewGame();

//TODO add dark theme
//TODO add translate
//TODO  add statistics
