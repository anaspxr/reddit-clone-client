import React from "react";
import { SettingsItemContainer } from "./settings-item-container";
import Displayname from "./displayname";
import AboutDescription from "./about-description";
import ChangeAvatar from "./change-avatar";
import ChangeBanner from "./change-banner";

const settings = [
  {
    label: "Display name",
    description: "Changing your display name won’t change your username",
    component: Displayname,
  },
  {
    label: "About description",
    description: "A short bio or description about yourself",
    component: AboutDescription,
  },
  {
    label: "Avatar Image",
    description: "Change your avatar or upload an image",
    component: ChangeAvatar,
  },
  {
    label: "banner",
    description: "Upload a profile background image or set a color",
    component: ChangeBanner,
  },
];

export default function ProfileSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold border-b">Profile</h2>
      <div className="space-y-6 py-4">
        {settings.map((setting, i) => (
          <SettingsItemContainer
            key={i}
            label={setting.label}
            description={setting.description}
            Component={setting.component}
          />
        ))}
      </div>
    </div>
  );
}
