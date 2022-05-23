import { tileAnimation } from "../../animations/tileAnimations";
import { globalData } from "../../constants";

const boardContainer = document.querySelector(".board") as unknown as Element;

class guessRowsGenerator {
  generatePTag = (
    div: HTMLDivElement,
    title: string,
    gameRowIndex: number,
    rowIndex: number
  ) => {
    const p: HTMLDivElement = document.createElement("p");
    p.classList.add("tile");
    title !== "" && p.classList.add("black_border");
    p.setAttribute("id", `${rowIndex}.${gameRowIndex}`);
    p.textContent = title;
    div.appendChild(p);
  };

  generateDiv = (
    gameRow: HTMLDivElement,
    title: string,
    gameRowIndex: number,
    rowIndex: number
  ) => {
    const div: HTMLDivElement = document.createElement("div");

    div.classList.add("row");
    this.generatePTag(div, title, gameRowIndex, rowIndex);
    gameRow.appendChild(div);
  };

  generateRows = () => {
    globalData.guessRowsPanel.forEach((row: string[], rowIndex: number) => {
      const gameRow: HTMLDivElement = document.createElement("div");

      gameRow.classList.add("game-row");
      gameRow.setAttribute("id", `${rowIndex}`);
      row.forEach((title: string, gameRowIndex: number) =>
        this.generateDiv(gameRow, title, gameRowIndex, rowIndex)
      );
      boardContainer.appendChild(gameRow);
      tileAnimation.setTileColor(rowIndex);
    });
  };

  clearGrid = () => {
    const rows = Array.from(boardContainer.querySelectorAll(".row"));
    rows.forEach((rowElement) => {
      rowElement.classList.value = "row";
      const rowChild = rowElement.childNodes[0] as unknown as Element;
      rowChild.classList.value = "tile";
      rowChild.textContent = "";
    });
  };
}

const guessRows = new guessRowsGenerator();

export default guessRows;
