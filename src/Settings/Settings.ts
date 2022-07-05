const SettingsButton = document.querySelector(".settings_menu");
const SettingsModal = document.querySelector(".settings_container_modal");
const closeSettingsButton = document.querySelector(".close_settings");
const settingsSection = document.querySelector(".settings_sections");

class SettingsClass {
  public static flag = false;
  private settingsStructure = [
    {
      header: "Hard Mode",
      description: "Any revealed hints must be used in subsequent guesses",
    },
    { header: "Hard Mode" },
    { header: "High Contrast Mode", description: "For improved color vision" },
  ];

  initiateSettingsModal = () => {
    this.settingsStructure.forEach((setting, index) => {
      const div = document.createElement("div");
      const htmStructure = `<div class="settings_content_container">
        <div style="padding-right: 8px">
          <div style="font-size: 18px"> ${setting.header}</div>
          ${
            setting.description
              ? '<div style="font-size: 12px; color: #787c7e; margin-top: -2px">' +
                setting.description +
                "</div>"
              : ""
          }
        </div>
        <div style="padding-right: 7px">
          <label
            class="mdl-switch mdl-js-switch mdl-js-ripple-effect"
            for=switch-${index}>
            <input type="checkbox" id="switch-${index}" class="mdl-switch__input" />
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
  };
}

const settings = new SettingsClass();
export default settings;
