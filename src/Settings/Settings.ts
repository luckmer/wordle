import { globalData } from "../constants/globalData";
import {
  boardContainer,
  body,
  closeSettingsButton,
  SettingsButton,
  SettingsModal,
  settingsSection,
} from "../imports";
import localStoragePanel from "../localStorage/localStorage";

class SettingsClass {
  public static flag = false;
  public static darkModeFlag = false;
  public static HighContrastModeFlag = false;
  private settingsStructure = [
    {
      header: "Hard Mode",
      description: "Any revealed hints must be used in subsequent guesses",
    },
    { header: "Dark Theme" },
    { header: "High Contrast Mode", description: "For improved color vision" },
  ];

  setDarkModeContrast = (darkMode: boolean) => {
    console.log(darkMode);
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

  initiateSettingsModal = () => {
    const localStorageData = localStorage.getItem("words");
    const darkMode = JSON.parse(localStorageData as string);

    this.settingsStructure.forEach((setting, index) => {
      const div = document.createElement("div");
      const htmStructure = `<div class="settings_content_container">
        <div>
          <div style="font-size: 18px"><span  class=${setting.header}> ${
        setting.header
      } </span></div>
          ${
            setting.description
              ? '<div class="small" style="font-size: 12px; color: #787c7e; margin-top: -2px">' +
                setting.description +
                "</div>"
              : ""
          }
        </div>
        <div>
          ${
            index === 1 && darkMode?.darkMode
              ? `<label
          class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
          for=switch-${index}>
          <input type="checkbox" id="switch-${index}" class="mdl-switch__input" checked=${darkMode.darkMode}  />
        </label>`
              : `<label
        class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
        for=switch-${index}>
        <input type="checkbox" id="switch-${index}" class="mdl-switch__input"  />
      </label>`
          }
        </div>
      </div>`;
      div.innerHTML = htmStructure;
      settingsSection?.appendChild(div);
    });
  };

  clearCloseAnimation = (SettingsModal: Element) => {
    if (!SettingsModal.className.split(" ").includes("settings_close")) return;
    SettingsModal.classList.remove("settings_open");
    SettingsModal.classList.remove("settings_close");
  };

  handleOpenSettings = () => SettingsModal?.classList.add("settings_open");

  handleCloseSettings = () => {
    SettingsModal?.classList.add("settings_close");
    SettingsModal?.addEventListener(
      "animationend",
      () => this.clearCloseAnimation(SettingsModal as Element),
      false
    );
  };

  setDarkModeForBoard = () => {
    Object.values(boardContainer.childNodes).forEach((child) => {
      const childNodes = Object.values(child.childNodes);
      childNodes.forEach((childNode) => {
        const firstChild = childNode.firstChild as Element;
        const textContent = childNode.textContent;
        if (textContent !== "") {
          firstChild.classList.add("dark_mode_text_border");
        }

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

  DarkModesettings = () => {
    SettingsClass.darkModeFlag = !SettingsClass.darkModeFlag;
    globalData.darkMode = !globalData.darkMode;
    localStoragePanel.saveArrayOfWords();
    this.setDarkModeContrast(globalData.darkMode);
  };

  HighContrastModeSettings = () => {
    SettingsClass.HighContrastModeFlag = !SettingsClass.HighContrastModeFlag;
    globalData.HighContrastModeFlag = SettingsClass.HighContrastModeFlag;
    if (SettingsClass.HighContrastModeFlag) {
      return;
    }
  };

  localStorageDarkModeLoader = () => {
    this.setDarkModeContrast(globalData.darkMode);
  };

  initiateSettings = () => {
    this.initiateSettingsModal();
    (SettingsButton as Element).addEventListener(
      "click",
      this.handleOpenSettings
    );
    (closeSettingsButton as Element).addEventListener(
      "click",
      this.handleCloseSettings
    );

    const DarkMode = settingsSection!.querySelector("#switch-1");
    const HighContrastMode = settingsSection!.querySelector("#switch-2");

    DarkMode!.addEventListener("change", () => this.DarkModesettings());
    HighContrastMode!.addEventListener("change", () =>
      this.HighContrastModeSettings()
    );
    this.localStorageDarkModeLoader();
  };
}

const settings = new SettingsClass();
export default settings;
