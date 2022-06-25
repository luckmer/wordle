import { timer } from "../utils";

class restartButtonAnimation {
  readonly SHORT_ANIMATION_BLOCK = 300;
  readonly LONG_ANIMATION_BLOCK = 300;
  removeWhiteBoard = (tile: Element) => tile.classList.remove("whiteBoard");
  addundoFlipTileAnimation = (tile: Element) => {
    tile.classList.add("undoflipTileClearGrid");
  };
  removeFlipTileAnimation = (tile: Element) => {
    tile.classList.remove("flipTileClearGrid");
  };
  removeundoFlipTileAnimation = (tile: Element) => {
    tile.classList.remove("undoflipTileClearGrid");
  };

  validateTileColor = (rowTarget: Element) => {
    return (
      !rowTarget.classList.contains("correct") &&
      !rowTarget.classList.contains("present") &&
      !rowTarget.classList.contains("primary")
    );
  };

  rotateRestartIcon = (tile: Element) => {
    tile.classList.add("rotateSettingsIcon");
    tile.addEventListener(
      "transitionend",
      () => tile.classList.remove("rotateSettingsIcon"),
      true
    );
  };

  clearPrimaryColors = (target: Element) => {
    target.classList.remove("correct");
    target.classList.remove("present");
    target.classList.remove("primary");
  };

  clearTileContent = (target: Element) => {
    const rowChild = target.childNodes[0] as unknown as Element;
    rowChild.classList.value = "tile";
    rowChild.textContent = "";
  };

  rotateRestartGameIcon = (e: Event) => {
    const element = e.target as Element;
    this.rotateRestartIcon(element);
  };

  unFlipClearAnimation = (target: Element) => {
    if (!target.classList.contains("flipTileClearGrid")) return;
    setTimeout(() => {
      this.clearPrimaryColors(target);
      this.clearTileContent(target);
      this.removeFlipTileAnimation(target);
      this.addundoFlipTileAnimation(target);
      setTimeout(() => {
        this.removeundoFlipTileAnimation(target);
        this.removeWhiteBoard(target);
      }, this.SHORT_ANIMATION_BLOCK);
    }, this.LONG_ANIMATION_BLOCK);
  };

  clearTilesState = (rowCollection: Element, rowCollectionIndex: number) => {
    const clearArray = setInterval(() => {
      if (rowCollection.className !== "row") {
        rowCollection.className = "row";
      }
      const childNodes = rowCollection.childNodes;
      childNodes.forEach((node) => {
        const child = node as unknown as Element;
        child.textContent = "";
        child.className = "tile";
      });

      setTimeout(() => clearInterval(clearArray), timer(rowCollectionIndex, 2));
      this.clearPrimaryColors(rowCollection);
    });
  };
}

export const tileAnimation = new restartButtonAnimation();
export default restartButtonAnimation;
