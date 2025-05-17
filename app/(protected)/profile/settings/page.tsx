/**
 * ProfileSettingsPage
 * -------------------
 * Main page component for profile settings.
 *
 * Renders the ProfileSettings component which provides:
 * - Password update functionality
 * - Account deletion functionality
 */

import { ProfileSettings } from "@/components/profile/profile-settings";

export default function ProfileSettingsPage() {
  return (
    <div>
      <ProfileSettings />
    </div>
  );
}
