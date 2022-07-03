const SettingsButton = document.querySelector(".settings_menu");
const SettingsModal = document.querySelector(".settings_container_modal");

class SettingsClass {
  handleControlSettings = () => SettingsModal?.classList.add("settings_open");

  initiateSettings = () => {
    (SettingsButton as Element).addEventListener(
      "click",
      this.handleControlSettings
    );
  };
}

const settings = new SettingsClass();
export default settings;
