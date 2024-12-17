import React from "react";
import { SettingsItem } from "./settings-item";
import Displayname from "./displayname";
import AboutDescription from "./about-description";

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
    label: "Avatar",
    description: "Edit your avatar or upload an image",
    component: Displayname,
  },
  {
    label: "banner",
    description: "Upload a profile background image or set a color",
    component: Displayname,
  },
];

export default function ProfileSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold border-b">Profile</h2>
      <div className="space-y-6 py-4">
        {settings.map((setting, i) => (
          <SettingsItem
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
