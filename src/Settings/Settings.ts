const SettingsButton = document.querySelector(".settings_menu");
const SettingsModal = document.querySelector(".settings_container_modal");
const closeSettingsButton = document.querySelector(".close_settings");
const settingsSection = document.querySelector(".settings_sections");
const body = document.querySelector("body");

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

  initiateSettingsModal = () => {
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
          <label
            class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
            for=switch-${index}>
            <input type="checkbox" id="switch-${index}" class="mdl-switch__input"  />
          </label>
        </div>
      </div>`;
      div.innerHTML = htmStructure;
      settingsSection?.appendChild(div);
    });
  };

  clearCloseAnimation = (SettingsModal: Element) => {
    if (!SettingsModal.className.split(" ").includes("settings_close")) return;
    console.log("remove");
    SettingsModal.classList.remove("settings_open");
    SettingsModal.classList.remove("settings_close");
  };

  handleOpenSettings = () => SettingsModal?.classList.add("settings_open");

  handleCloseSettings = () => {
    SettingsModal?.classList.add("settings_close");

    SettingsModal?.addEventListener(
      "animationend",
      () => this.clearCloseAnimation(SettingsModal),
      false
    );
  };

  DarkModesettings = () => {
    SettingsClass.darkModeFlag = !SettingsClass.darkModeFlag;

    console.log(SettingsClass.darkModeFlag);
    if (SettingsClass.darkModeFlag) {
      body?.classList.add("blackMode");
      SettingsModal?.classList.add("blackMode");
      return;
    }

    body?.classList.remove("blackMode");
    SettingsModal?.classList.remove("blackMode");
  };

  HighContrastModeSettings = () => {
    SettingsClass.HighContrastModeFlag = !SettingsClass.HighContrastModeFlag;

    console.log(SettingsClass.HighContrastModeFlag);
    if (SettingsClass.HighContrastModeFlag) {
      console.log("high contrast");
      return;
    }
    console.log("normal contrast");
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
  };
}

const settings = new SettingsClass();
export default settings;
