import keyGenerator from "./generators/keys/keyGenerator";
import guessRows from "./generators/guessRows/guessRowsGenerator";
import keyboardGenerator from "./generators/keyboardGenerator/keyboardGenerator";
import randomWord from "./generators/randomWord/randomWordGenerator";
import localStorage from "./localStorage/localStorage";

localStorage.loadSavedArray();
randomWord.generateRandomWord();
keyboardGenerator.keyboardGenerator();
keyGenerator.keyGenerator();
guessRows.generateRows();
