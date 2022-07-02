const SettingsButton = document.querySelector(".settings_menu");

class SettingsClass {
  public static flag = false;
  handleControlSettings = () => {
    SettingsClass.flag = !SettingsClass.flag;
    console.log(SettingsClass.flag);
  };

  initiateSettings = () => {
    console.log(SettingsButton);
    (SettingsButton as Element).addEventListener(
      "click",
      this.handleControlSettings
    );
  };
}

const settings = new SettingsClass();
export default settings;
