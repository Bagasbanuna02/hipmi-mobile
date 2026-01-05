export type TypeNotificationCategoryApp =
  | "EVENT"
  | "JOB"
  | "VOTING"
  | "DONASI"
  | "INVESTASI"
  | "COLLABORATION"
  | "FORUM"
  | "ACCESS";

export type TypeOfTilteCategoryApp = "Pendaftaran User Baru" | "Other" | string;

export const listOfcategoriesAppNotification = [
  { value: "event", label: "Event" },
  { value: "job", label: "Job" },
  { value: "voting", label: "Voting" },
  { value: "donasi", label: "Donasi" },
  { value: "investasi", label: "Investasi" },
  { value: "forum", label: "Forum" },
  { value: "collaboration", label: "Collaboration" },
];
