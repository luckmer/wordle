import { SettingsGenerator } from "../generators/Settings/Settings";
import { globalData } from "../globalData/globalData";
import { SettingsModal } from "../imports";
import localStoragePanel from "../localStorage/localStorage";

export class SettingsActions extends SettingsGenerator {
  public static darkModeFlag = false;
  public static HighContrastModeFlag = false;

  handleOpenSettings = () => {
    SettingsModal?.classList.add("settings_open");
  };

  handleCloseSettings = (callback: (Element: Element) => void) => {
    SettingsModal?.classList.add("settings_close");
    callback(SettingsModal as Element);
  };

  handleSetDarkModeSettings = (callback: () => void) => {
    SettingsActions.darkModeFlag = !SettingsActions.darkModeFlag;
    globalData.darkMode = !globalData.darkMode;
    localStoragePanel.saveArrayOfWords();

    console.log("click");
    callback();
  };

  handleSetHighContrastMode = (callback: () => void) => {
    SettingsActions.HighContrastModeFlag =
      !SettingsActions.HighContrastModeFlag;
    globalData.HighContrastModeFlag = !globalData.HighContrastModeFlag;
    localStoragePanel.saveArrayOfWords();
    callback();
  };
}

const settingsActions = new SettingsActions();
export default settingsActions;
