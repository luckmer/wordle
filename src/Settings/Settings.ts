import {
  BLACK_MODE,
  BLIND_CORRECT,
  BLIND_PRESENT,
  CORRECT,
  globalData,
  LIGHT_PRIMARY,
  PRESENT,
  PRIMARY,
  UNIQUE_WORDS,
  UNIQUE_WORDS_ENUM,
} from "../globalData/globalData";
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
import { splitWordAndGetLastElement } from "../utils";

class SettingsClass extends SettingsActions {
  settingsAnimationPanel = (SettingsModal: Element) => {
    if (!SettingsModal.className.split(" ").includes("settings_close")) return;
    SettingsModal.classList.remove("settings_open");
    SettingsModal.classList.remove("settings_close");
  };

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
    elements: NodeListOf<Element>,
    flag: boolean,
    callback: (element: Element) => void
  ) => {
    elements.forEach((element) => {
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

  deleteHighContrastVirtualKeyboard(nodeElement: Element) {
    if (nodeElement.classList.contains(BLIND_CORRECT)) {
      nodeElement.classList.remove(BLIND_CORRECT);
      nodeElement.classList.add(CORRECT);
    }
    if (nodeElement.classList.contains(BLIND_PRESENT)) {
      nodeElement.classList.remove(BLIND_PRESENT);
      nodeElement.classList.add(PRESENT);
    }
  }

  setHighContrastVirtualKeyboard(nodeElement: Element) {
    if (nodeElement.classList.contains(CORRECT)) {
      nodeElement.classList.remove(CORRECT);
      nodeElement.classList.add(BLIND_CORRECT);
    }
    if (nodeElement.classList.contains(PRESENT)) {
      nodeElement.classList.remove(PRESENT);
      nodeElement.classList.add(BLIND_PRESENT);
    }
    nodeElement.classList.add("darkKeyCaps");
  }

  addHighContrastMode(
    lastElement: Element,
    HighContrastSwitches: NodeListOf<Element>
  ) {
    this.controlHighContrastMode(
      lastElement.childNodes as NodeListOf<Element>,
      true,
      (nodeChild) => nodeChild.classList.add(BLIND_CORRECT)
    );

    this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) => {
      const checkbox = (HighContrastSwitches[0] as Element)
        .childNodes[1] as HTMLInputElement;

      if (!checkbox.checked) {
        HighContrastSwitches[0].classList.remove(BLIND_CORRECT);
      } else {
        nodeChild.classList.add(BLIND_CORRECT);
      }
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
        (nodeChild) => nodeChild.classList.remove(BLIND_CORRECT)
      );
    }
    if (HighContrastSwitches) {
      this.controlHighContrastMode(HighContrastSwitches, false, (nodeChild) => {
        nodeChild.classList.remove(BLIND_CORRECT);
      });
    }
  }

  setDarkModeContrast = (darkMode: boolean) => {
    this.setSpecificColorForVirtualKeyboard();
    if (darkMode) {
      this.setDarkModeForBoard();
      body?.classList.add(BLACK_MODE);
      SettingsModal?.classList.add(BLACK_MODE);
      return;
    }
    this.deleteDarkModeForBoard();
    body?.classList.remove(BLACK_MODE);
    SettingsModal?.classList.remove(BLACK_MODE);
  };

  DarkModeSettings = () => {
    this.initiateCloseSettingsButton();
    this.initiateOpenSettingsButton();
    this.initiateRestartSettingsButton();
    localStoragePanel.saveArrayOfWords();
    this.initiateDarkThemeBackground(0);
    this.setDarkModeContrast(globalData.darkMode);
  };

  setSpecificColorForVirtualKeyboard = () => {
    const darkMode = globalData.darkMode;
    const HighContrastMode = globalData.HighContrastModeFlag;
    const virtualKeyCaps = buttonsContainer.childNodes;

    virtualKeyCaps.forEach((keyCap) => {
      keyCap.childNodes.forEach((node) => {
        const nodeElement = node as Element;

        if (HighContrastMode) {
          this.setHighContrastVirtualKeyboard(nodeElement);
        } else this.deleteHighContrastVirtualKeyboard(nodeElement);
        if (darkMode) {
          const nodeType = splitWordAndGetLastElement(
            nodeElement.classList.value
          ) as UNIQUE_WORDS_ENUM;
          if (UNIQUE_WORDS[nodeType]) return;
          if (nodeElement.classList.contains(LIGHT_PRIMARY)) {
            nodeElement.classList.remove(LIGHT_PRIMARY);
            nodeElement.classList.add(PRIMARY);
          }
          nodeElement.classList.add("darkKeyCaps");
          return;
        }
        if (nodeElement.classList.contains(PRIMARY)) {
          nodeElement.classList.remove(PRIMARY);
          nodeElement.classList.add(LIGHT_PRIMARY);
        }
        nodeElement.classList.remove("darkKeyCaps");
      });
    });
  };

  setDarkModeForBoard = () => {
    this.setBoardMainPanel((firstChild, textContent, childRow) => {
      if (textContent !== "") {
        childRow.classList.remove(LIGHT_PRIMARY);
        if (childRow.classList.length === 1) childRow.classList.add(PRIMARY);
        firstChild.classList.add("dark_mode_text_border");
      }
      firstChild.classList.add("dark_mode_border");
    });
  };

  setHighContrastModeForBoard = () => {
    this.setBoardMainPanel(({}, _, childRow) => {
      if (childRow.classList.contains(CORRECT)) {
        childRow.classList.add(BLIND_CORRECT);
      }
      if (childRow.classList.contains(PRESENT)) {
        childRow.classList.add(BLIND_PRESENT);
      }
    });
  };

  deleteHighContrastModeForBoard = () => {
    this.setBoardMainPanel(({}, _, childRow) => {
      if (childRow.classList.contains(BLIND_CORRECT)) {
        childRow.classList.add(CORRECT);
        childRow.classList.remove(BLIND_CORRECT);
      }

      if (childRow.classList.contains(BLIND_PRESENT)) {
        childRow.classList.add(PRESENT);
        childRow.classList.remove(BLIND_PRESENT);
      }
    });
  };

  deleteDarkModeForBoard = () => {
    this.setBoardMainPanel((firstChild, textContent, childRow) => {
      if (textContent !== "" && childRow.classList.contains(PRIMARY)) {
        childRow.classList.add(LIGHT_PRIMARY);
      }
      firstChild.classList.remove("dark_mode_border");
    });
  };

  initiateDarkThemeBackground = (index: number) => {
    const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
    const lastElement = HighContrastSwitches[index];
    const elements = lastElement.childNodes as NodeListOf<Element>;
    this.controlHighContrastMode(elements, true, (nodeChild) => {
      if ((elements[1] as any).checked === false) {
        nodeChild.classList.remove(BLIND_CORRECT);
      } else {
        globalData.darkMode && globalData.HighContrastModeFlag
          ? nodeChild.classList.add(BLIND_CORRECT)
          : nodeChild.classList.remove(BLIND_CORRECT);
      }
    });
  };

  initiateHighContrastModeColor = () => {
    this.setSpecificColorForVirtualKeyboard();
    const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
    const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
    if (globalData.HighContrastModeFlag) {
      const HighContrastSwitches = document.querySelectorAll(".mdl-switch");
      const lastElement = HighContrastSwitches[HighContrastSwitches.length - 1];
      this.addHighContrastMode(lastElement, HighContrastSwitches);
      this.setHighContrastModeForBoard();
    } else {
      const darkModeElement = HighContrastSwitches[0];
      this.removeHighContrastMode(lastElement);
      this.removeHighContrastMode(darkModeElement);
      this.deleteHighContrastModeForBoard();
    }
  };

  initiateSettings = () => {
    this.setDarkModeContrast(globalData.darkMode);
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
          () => this.settingsAnimationPanel(modal),
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
        this.initiateHighContrastModeColor();
      })
    );
  };
}

const settings = new SettingsClass();
export default settings;
