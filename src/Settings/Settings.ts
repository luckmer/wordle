import { globalData } from "../globalData/globalData";
import {
  boardContainer,
  body,
  closesettingsButton,
  settingsButton,
  SettingsModal,
  settingsSection,
} from "../imports";
import localStoragePanel from "../localStorage/localStorage";
import { SettingsActions } from "../actions/settings";

class SettingsClass extends SettingsActions {
  clearCloseAnimation = (SettingsModal: Element) => {
    if (!SettingsModal.className.split(" ").includes("settings_close")) return;
    SettingsModal.classList.remove("settings_open");
    SettingsModal.classList.remove("settings_close");
  };

  addHighContrastMode(
    lastElement: Element,
    HighContrastSwitches: NodeListOf<Element>
  ) {
    this.controlHighContrastMode(
      lastElement.childNodes as NodeListOf<Element>,
      true,
      (nodeChild) => nodeChild.classList.add("Blindcorrect")
    );
    this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) =>
      nodeChild.classList.add("Blindcorrect")
    );
  }

  removeHighContrastMode(
    lastElement: Element,
    HighContrastSwitches: NodeListOf<Element>
  ) {
    this.controlHighContrastMode(
      lastElement.childNodes as NodeListOf<Element>,
      true,
      (nodeChild) => nodeChild.classList.remove("Blindcorrect")
    );
    this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) => {
      nodeChild.classList.remove("Blindcorrect");
    });
  }

  controlHighContrastMode = (
    element: NodeListOf<Element>,
    flag: boolean,
    callback: (element: Element) => void
  ) => {
    element.forEach((element) => {
      const nodeElement = element as Element;
      if (flag) {
        if (
          nodeElement.classList &&
          nodeElement.classList.contains("mdl-switch__track")
        ) {
          callback(nodeElement);
        }
        return;
      }
      element.childNodes.forEach((node) => {
        const nodeChild = node as Element;
        if (
          nodeChild.classList &&
          nodeChild.classList.contains("mdl-switch__track") &&
          element.classList.contains("is-checked")
        ) {
          callback(nodeChild);
        }
      });
    });
  };

  setDarkModeContrast = (darkMode: boolean) => {
    if (darkMode) {
      this.setDarkModeForBoard();
      body?.classList.add("blackMode");
      SettingsModal?.classList.add("blackMode");
      return;
    }
    this.deleteDarkModeForBoard();
    body?.classList.remove("blackMode");
    SettingsModal?.classList.remove("blackMode");
  };

  localStorageDarkModeLoader = () =>
    this.setDarkModeContrast(globalData.darkMode);

  DarkModesettings = () => {
    this.initiateCloseSettingsButton();
    this.initiateOpenSettingsButton();
    this.initiateRestartSettingsButton();
    localStoragePanel.saveArrayOfWords();
    this.initiateDarkThemeBackground(1);
    this.setDarkModeContrast(globalData.darkMode);
  };

  setDarkModeForBoard = () => {
    Object.values(boardContainer.childNodes).forEach((child) => {
      const childNodes = Object.values(child.childNodes);
      childNodes.forEach((childNode) => {
        const firstChild = childNode.firstChild as Element;
        const textContent = childNode.textContent;
        if (textContent !== "")
          firstChild.classList.add("dark_mode_text_border");
        firstChild.classList.add("dark_mode_border");
      });
    });
  };

  deleteDarkModeForBoard = () => {
    Object.values(boardContainer.childNodes).forEach((child) => {
      const childNodes = Object.values(child.childNodes);
      childNodes.forEach((childNode) => {
        const firstChild = childNode.firstChild as Element;
        firstChild.classList.remove("dark_mode_border");
      });
    });
  };

  initiateDarkThemeBackground = (index: number) => {
    const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
    const lastElement = HighContrastSwitches[index];
    this.controlHighContrastMode(
      lastElement.childNodes as NodeListOf<Element>,
      true,
      (nodeChild) => {
        globalData.darkMode && globalData.HighContrastModeFlag
          ? nodeChild.classList.add("Blindcorrect")
          : nodeChild.classList.remove("Blindcorrect");
      }
    );
  };

  HighContrastModeSettings = () => {
    const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
    const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
    this.removeHighContrastMode(lastElement, HighContrastSwitches);
    if (SettingsActions.HighContrastModeFlag) {
      const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
      const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
      this.addHighContrastMode(lastElement, HighContrastSwitches);
      return;
    }
  };

  initiateSettings = () => {
    this.localStorageDarkModeLoader();
    this.initiateSettingsModal();
    this.initiateCloseSettingsButton();
    this.initiateOpenSettingsButton();
    this.initiateRestartSettingsButton();
    const DarkMode = settingsSection!.querySelector("#switch-1");
    const HighContrastMode = settingsSection!.querySelector("#switch-2");

    (settingsButton as Element).addEventListener("click", () => {
      this.initiateDarkThemeBackground(1);
      this.handleOpenSettings();
    });

    (closesettingsButton as Element).addEventListener("click", () => {
      this.handleCloseSettings((modal) => {
        modal?.addEventListener(
          "animationend",
          () => this.clearCloseAnimation(modal),
          false
        );
      });
      this.initiateDarkThemeBackground(1);
    });

    DarkMode!.addEventListener("change", () =>
      this.handleSetDarkModeSettings(() => this.DarkModesettings())
    );

    HighContrastMode!.addEventListener("change", () =>
      this.handleSetHighContrastMode(() => this.HighContrastModeSettings())
    );
  };
}

const settings = new SettingsClass();
export default settings;
