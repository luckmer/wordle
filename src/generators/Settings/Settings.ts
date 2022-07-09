import { settingsSection } from "../../imports";

export class SettingsGenerator {
  private settingsStructure = [
    {
      header: "Hard Mode",
      description: "Any revealed hints must be used in subsequent guesses",
    },
    { header: "Dark Theme" },
    { header: "High Contrast Mode", description: "For improved color vision" },
  ];

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
}
const settingsGenerator = new SettingsGenerator();
export default settingsGenerator;
