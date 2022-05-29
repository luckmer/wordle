import { timer } from "../utils";

class restartButtonAnimation {
  readonly DEATH_LONG_ANIMATION_DURATION = 700;
  readonly SHORT_ANIMATION_BLOCK = 300;
  readonly LONG_ANIMATION_BLOCK = 300;
  readonly TIME_DIVIDER = 2;
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

  rotateRestartGameIcon = (e: Event) => {
    const element = e.target as Element;
    this.rotateRestartIcon(element);
  };

  addFlipTileAnimation = (tile: Element) => {
    tile.classList.add("flipTileClearGrid");
    tile.addEventListener("transitionend", (target) => {
      const rowTarget = target.target as Element;
      if (!rowTarget.classList.contains("flipTileClearGrid")) return;
      const a = setInterval(() => {
        this.clearPrimaryColors(rowTarget);
        if (this.validateTileColor(rowTarget)) clearInterval(a);
      });
      setTimeout(() => {
        this.unFlipClearAnimation(target.target as Element);
      }, this.DEATH_LONG_ANIMATION_DURATION);
    });
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

  setFlipClearAnimation = (
    rowCollection: Element,
    rowCollectionIndex: number,
    rowIndex: number
  ) => {
    setTimeout(() => {
      setTimeout(() => {
        const rowCollectionChild = rowCollection
          .childNodes[0] as unknown as Element;
        if (
          rowCollectionChild.classList.value !== "tile" &&
          rowCollection.classList.value === "row"
        ) {
          this.addFlipTileAnimation(rowCollection);
        }
        if (rowCollection.classList.value === "row") return;
        this.addFlipTileAnimation(rowCollection);
      }, timer(rowCollectionIndex, this.TIME_DIVIDER));
    }, timer(rowIndex, this.TIME_DIVIDER));
  };
}

export const tileAnimation = new restartButtonAnimation();
export default restartButtonAnimation;
