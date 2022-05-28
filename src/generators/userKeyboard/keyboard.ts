import keyActionsClass from "../../actions/keyActions";

class keyboardGeneratorGenerator extends keyActionsClass {
  handleKeyDown = (e: KeyboardEvent) => {
    const letter = e.key;
    const matchLetter: string | null = letter.match(
      /^[a-z]$/
    ) as unknown as string;

    switch (letter) {
      case "Backspace": {
        this.handleClear();
        break;
      }
      case "Enter": {
        this.handleSubmit();
        break;
      }
      default: {
        if (matchLetter === null) break;
        this.handleClick(matchLetter);
        break;
      }
    }
  };

  keyboardGenerator = () =>
    document.addEventListener("keydown", this.handleKeyDown);
}

const keyboardGenerator = new keyboardGeneratorGenerator();

export default keyboardGenerator;
