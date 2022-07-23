import { globalData } from "../globalData/globalData";
import {
  boardContainer,
  body,
  buttonsContainer,
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

    this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) => {
      nodeChild.classList.add("Blindcorrect");
    });
  }

  removeHighContrastMode(
    lastElement: Element,
    HighContrastSwitches?: NodeListOf<Element>,
    locklastElement?: boolean
  ) {
    if (!locklastElement) {
      this.controlHighContrastMode(
        lastElement.childNodes as NodeListOf<Element>,
        true,
        (nodeChild) => nodeChild.classList.remove("Blindcorrect")
      );
    }
    if (HighContrastSwitches) {
      this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) => {
        nodeChild.classList.remove("Blindcorrect");
      });
    }
  }

  setBoardMainPanel = (
    callback: (
      firstChild: Element,
      textContent: string | null,
      childRow: Element
    ) => void
  ) => {
    Object.values(boardContainer.childNodes).forEach((child) => {
      const childNodes = Object.values(child.childNodes);
      childNodes.forEach((childNode) => {
        const firstChild = childNode.firstChild as Element;
        const textContent = childNode.textContent;
        const childRow = childNode as Element;
        callback(firstChild, textContent, childRow);
      });
    });
  };

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
          nodeChild.classList.contains("mdl-switch__track")
        ) {
          callback(nodeChild);
        }
      });
    });
  };

  setDarkModeContrast = (darkMode: boolean) => {
    this.setDarkModeForVirtualKeyboard();
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

  DarkModeSettings = () => {
    this.initiateCloseSettingsButton();
    this.initiateOpenSettingsButton();
    this.initiateRestartSettingsButton();
    localStoragePanel.saveArrayOfWords();
    this.initiateDarkThemeBackground(0);
    this.setDarkModeContrast(globalData.darkMode);
  };

  setDarkModeForVirtualKeyboard = () => {
    const darkMode = globalData.darkMode;
    const virtualKeyCaps = buttonsContainer.childNodes;
    virtualKeyCaps.forEach((keyCap) => {
      keyCap.childNodes.forEach((node) => {
        if (darkMode) {
          const nodeElement = node as Element;
          nodeElement.classList.add("darkKeyCaps");
        } else {
          const nodeElement = node as Element;
          nodeElement.classList.remove("darkKeyCaps");
        }
      });
    });
  };

  setDarkModeForBoard = () => {
    this.setBoardMainPanel((firstChild, textContent, childRow) => {
      if (textContent !== "") {
        childRow.classList.remove("lightPrimary");
        firstChild.classList.add("dark_mode_text_border");
      }
      firstChild.classList.add("dark_mode_border");
    });
  };

  setHighContrastModeForBoard = () => {
    this.setBoardMainPanel(({}, _, childRow) => {
      if (childRow.classList.contains("correct")) {
        childRow.classList.add("Blindcorrect");
      }
      if (childRow.classList.contains("present")) {
        childRow.classList.add("blindPresent");
      }
    });
  };

  deleteHighContrastModeForBoard = () => {
    this.setBoardMainPanel(({}, _, childRow) => {
      if (childRow.classList.contains("Blindcorrect")) {
        childRow.classList.add("correct");
        childRow.classList.remove("Blindcorrect");
      }

      if (childRow.classList.contains("blindPresent")) {
        childRow.classList.add("present");
        childRow.classList.remove("blindPresent");
      }
    });
  };

  deleteDarkModeForBoard = () => {
    this.setBoardMainPanel((firstChild, textContent, childRow) => {
      if (textContent !== "" && childRow.classList.contains("primary")) {
        childRow.classList.add("lightPrimary");
      }
      firstChild.classList.remove("dark_mode_border");
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

  initiateHighContrastModeColor = () => {
    const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
    const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
    this.removeHighContrastMode(lastElement, HighContrastSwitches);

    if (globalData.HighContrastModeFlag) {
      const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
      const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
      this.addHighContrastMode(lastElement, HighContrastSwitches);
      this.setHighContrastModeForBoard();

      if (!globalData.darkMode) {
        const darkModeElement = HighContrastSwitches[0];
        this.removeHighContrastMode(darkModeElement);
        this.deleteHighContrastModeForBoard();
      }
    } else this.deleteHighContrastModeForBoard();
  };

  HighContrastModeSettings = () => this.initiateHighContrastModeColor();

  initiateSettings = () => {
    this.localStorageDarkModeLoader();
    this.initiateSettingsModal();
    this.initiateCloseSettingsButton();
    this.initiateOpenSettingsButton();
    this.initiateRestartSettingsButton();

    (settingsButton as Element).addEventListener("click", () => {
      this.initiateDarkThemeBackground(0);
      this.initiateHighContrastModeColor();

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
      this.initiateDarkThemeBackground(0);
    });

    const DarkMode = settingsSection!.querySelector("#switch-1");
    const HighContrastMode = settingsSection!.querySelector("#switch-2");

    DarkMode!.addEventListener("change", () =>
      this.handleSetDarkModeSettings(() => this.DarkModeSettings())
    );

    HighContrastMode!.addEventListener("change", () =>
      this.handleSetHighContrastMode(() => {
        this.HighContrastModeSettings();
      })
    );
  };
}

const settings = new SettingsClass();
export default settings;
