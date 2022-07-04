const SettingsButton = document.querySelector(".settings_menu");
const SettingsModal = document.querySelector(".settings_container_modal");
const closeSettingsButton = document.querySelector(".close_settings");

class SettingsClass {
  public static flag = false;

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
