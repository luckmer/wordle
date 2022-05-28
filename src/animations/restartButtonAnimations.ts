class restartButtonAnimation {
  setRotate = (tile: Element) => {
    tile.classList.add("rotateSettingsIcon");
    tile.addEventListener(
      "transitionend",
      () => tile.classList.remove("rotateSettingsIcon"),
      true
    );
  };

  rotateRestartGameIcon = (e: Event) => {
    const element = e.target as Element;
    this.setRotate(element);
  };
}

export const tileAnimation = new restartButtonAnimation();
export default restartButtonAnimation;
