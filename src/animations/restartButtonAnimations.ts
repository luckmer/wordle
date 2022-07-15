import { globalData } from "../globalData/globalData";
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
    const darkMode = globalData.darkMode ? "tile dark_mode_border" : "tile";
    const rowChild = target.childNodes[0] as unknown as Element;
    rowChild.classList.value = darkMode;
    rowChild.textContent = "";
  };

  rotateRestartGameIcon = (e: Event) => {
    const element = e.target as Element;
    this.rotateRestartIcon(element);
  };

  addFlipTileAnimation = (
    tile: Element,
    lastElementIndexesPosition: { [key: string]: number }
  ) => {
    tile.classList.add("flipTileClearGrid");
    tile.addEventListener("transitionend", (target) => {
      const rowTarget = target.target as Element;
      if (!rowTarget.classList.contains("flipTileClearGrid")) return;

      setTimeout(() => {
        const firstState = setInterval(() => {
          this.clearPrimaryColors(rowTarget);
          if (this.validateTileColor(rowTarget)) clearInterval(firstState);
        });
        this.unFlipClearAnimation(rowTarget);
        const secondState = setInterval(() => {
          this.clearPrimaryColors(rowTarget);
          if (this.validateTileColor(rowTarget)) {
            clearInterval(secondState);
            this.removeWhiteBoard(rowTarget);
            const [rowPosition, tilePosition] = tile.children[0].id.split(".");
            const { rowIndex, childElementIndex } = lastElementIndexesPosition;
            if (
              +rowPosition === +rowIndex &&
              +tilePosition + 1 === childElementIndex
            ) {
              setTimeout(() => {
                globalData.isAbleToType = true;
              }, this.LONG_ANIMATION_BLOCK);
            }
          }
        });
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
      this.removeundoFlipTileAnimation(target);
      this.removeWhiteBoard(target);
    }, this.LONG_ANIMATION_BLOCK);
  };

  setFlipClearAnimation = (
    rowCollection: Element,
    rowCollectionIndex: number,
    rowIndex: number,
    lastElementIndexesPosition: { [key: string]: number }
  ) => {
    setTimeout(() => {
      setTimeout(() => {
        const darkMode = globalData.darkMode ? "tile dark_mode_border" : "tile";
        const rowCollectionChild = rowCollection
          .childNodes[0] as unknown as Element;
        if (
          rowCollectionChild.classList.value !== darkMode &&
          rowCollection.classList.value === "row"
        ) {
          this.addFlipTileAnimation(rowCollection, lastElementIndexesPosition);
        }
        if (rowCollection.classList.value === "row") {
          return;
        }
        this.addFlipTileAnimation(rowCollection, lastElementIndexesPosition);
      }, timer(rowCollectionIndex, this.TIME_DIVIDER));
    }, timer(rowIndex, this.TIME_DIVIDER));
  };

  clearTilesState = (rowCollection: Element, rowCollectionIndex: number) => {
    const clearArray = setInterval(() => {
      rowCollection.className = "row";
      const childNodes = rowCollection.childNodes;
      childNodes.forEach((node) => {
        const child = node as unknown as Element;
        if (child.className !== "tile") {
          child.textContent = "";
          child.className = "tile";
        }
      });
      if (rowCollection.className === "row") {
        setTimeout(
          () => clearInterval(clearArray),
          timer(rowCollectionIndex, 2)
        );
      }
    });
  };
}

export const tileAnimation = new restartButtonAnimation();
export default restartButtonAnimation;
