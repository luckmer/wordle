import { globalData } from "../../globalData/globalData";
import {
  settingsSection,
  settingsExitButton,
  settingsReloadButton,
  settingsOpenButton,
} from "../../imports";

export enum closeSettingsDarkModeStatus {
  DARK = "true",
  LIGHT = "false",
}

export interface SettingsConfig {
  type: string;
  img: string;
}

export class SettingsGenerator {
  private settingsStructure = [
    {
      header: "Settings",
      description: "Feel free to use",
    },
    { header: "Dark Theme" },
    { header: "High Contrast Mode", description: "For improved color vision" },
  ];

  private closeSettingIcons: {
    [key in closeSettingsDarkModeStatus]: SettingsConfig;
  } = {
    [closeSettingsDarkModeStatus.DARK]: {
      type: "darkMode",
      img: "./FontAwesomeIcons/x-solid-white.svg",
    },
    [closeSettingsDarkModeStatus.LIGHT]: {
      type: "lightMode",
      img: "./FontAwesomeIcons/x-solid.svg",
    },
  };

  private openSettingIcons: {
    [key in closeSettingsDarkModeStatus]: SettingsConfig;
  } = {
    [closeSettingsDarkModeStatus.DARK]: {
      type: "darkMode",
      img: "./FontAwesomeIcons/gear-solid-white.svg",
    },
    [closeSettingsDarkModeStatus.LIGHT]: {
      type: "lightMode",
      img: "./FontAwesomeIcons/gear-solid.svg",
    },
  };

  private reloadSettingIcons: {
    [key in closeSettingsDarkModeStatus]: SettingsConfig;
  } = {
    [closeSettingsDarkModeStatus.DARK]: {
      type: "darkMode",
      img: "./FontAwesomeIcons/reload-white.svg",
    },
    [closeSettingsDarkModeStatus.LIGHT]: {
      type: "lightMode",
      img: "./FontAwesomeIcons/reload.svg",
    },
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
              : index === 2 && darkMode.HighContrastModeFlag
              ? `<label
              class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
              for=switch-${index}>
              <input type="checkbox" id="switch-${index}" class="mdl-switch__input"  checked=${darkMode.HighContrastModeFlag} />
            </label>`
              : setting.header !== "Settings"
              ? `<label
            class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
            for=switch-${index}>
            <input type="checkbox" id="switch-${index}" class="mdl-switch__input"  />
          </label>`
              : ""
          }
        </div>
      </div>`;
      div.innerHTML = htmStructure;
      settingsSection?.appendChild(div);
    });
  };

  initiateCloseSettingsButton = () => {
    const darkMode = globalData.darkMode;
    const settingsIcon =
      this.closeSettingIcons[
        darkMode as unknown as closeSettingsDarkModeStatus
      ];
    settingsExitButton!.innerHTML = `<img type="svg" src=${settingsIcon.img} alt="" class="close" />`;
  };

  initiateRestartSettingsButton = () => {
    const darkMode = globalData.darkMode;
    const settingsIcon =
      this.reloadSettingIcons[
        darkMode as unknown as closeSettingsDarkModeStatus
      ];
    settingsReloadButton!.innerHTML = `<img type="svg" src=${settingsIcon.img} alt="" class="restart" />`;
  };

  initiateOpenSettingsButton = () => {
    const darkMode = globalData.darkMode;
    const settingsIcon =
      this.openSettingIcons[darkMode as unknown as closeSettingsDarkModeStatus];
    settingsOpenButton!.innerHTML = `<img type="svg" src=${settingsIcon.img} alt="" />`;
  };
}
const settingsGenerator = new SettingsGenerator();
export default settingsGenerator;
