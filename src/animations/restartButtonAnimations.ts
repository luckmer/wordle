import { timer } from "../utils";

class restartButtonAnimation {
  readonly SHORT_ANIMATION_BLOCK = 350;
  readonly LONG_ANIMATION_BLOCK = 500;
  readonly TIME_DIVIDER = 2;

  removeWhiteBoard = (tile: Element) => tile.classList.remove("whiteBoard");
  addFlipTileAnimation = (tile: Element) => {
    return tile.classList.add("flipTileClearGrid");
  };
  addundoFlipTileAnimation = (tile: Element) => {
    return tile.classList.add("undoflipTileClearGrid");
  };
  removeFlipTileAnimation = (tile: Element) => {
    return tile.classList.remove("flipTileClearGrid");
  };
  removeundoFlipTileAnimation = (tile: Element) => {
    return tile.classList.remove("undoflipTileClearGrid");
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
    target.classList.add("whiteBoard");
    target.classList.remove("correct");
    target.classList.remove("present");
    target.classList.remove("primary");
  };

  clearTileContent = (target: Element) => {
    const rowChild = target.childNodes[0] as unknown as Element;
    rowChild.classList.value = "tile";
    rowChild.textContent = "";
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

  rotateRestartGameIcon = (e: Event) => {
    const element = e.target as Element;
    this.rotateRestartIcon(element);
  };

  setFlipClearAnimation = (
    rowCollection: Element,
    rowCollectionIndex: number,
    rowIndex: number
  ) => {
    setTimeout(() => {
      setTimeout(() => {
        if (rowCollection.classList.value === "row") return;
        this.addFlipTileAnimation(rowCollection);
        rowCollection.addEventListener("transitionend", (target) =>
          this.unFlipClearAnimation(target.target as Element)
        );
      }, timer(rowCollectionIndex, this.TIME_DIVIDER));
    }, timer(rowIndex, this.TIME_DIVIDER));
  };
}

export const tileAnimation = new restartButtonAnimation();
export default restartButtonAnimation;
