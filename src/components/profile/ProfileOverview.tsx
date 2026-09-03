import type { Profile } from "../../types";
import ProfileCard from "../ProfileCard";
import ExperiencePreview from "./ExperiencePreview";
import ProjectsPreview from "./ProjectsPreview";
import EducationPreview from "./EducationPreview";
import SkillsPreview from "./SkillsPreview";
import CustomSectionsPreview from "./CustomSectionsPreview";

interface ProfileOverviewProps {
  profile: Profile;
  onEdit: () => void;
}

// Read-only summary of the full profile: contact card up top, then a
// condensed preview of every resume-relevant section. Full editing happens
// in ProfileEditView, opened via the "Edit Profile" button on ProfileCard.
export default function ProfileOverview({ profile, onEdit }: ProfileOverviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <ProfileCard profile={profile} onEdit={onEdit} />
      <ExperiencePreview entries={profile.experience} />
      <ProjectsPreview entries={profile.projects} />
      <EducationPreview entries={profile.education} />
      <SkillsPreview skills={profile.skills} />
      <CustomSectionsPreview sections={profile.customSections} />
    </div>
  );
}
