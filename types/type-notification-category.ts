export type NotificationProp = {
  title: TypeOfTilteCategoryApp | string
  body: string;
  userLoginId?: string;
  appId?: string;
  status?: string;
  type?: "announcement" | "trigger";
  deepLink?: string;
  kategoriApp?: TypeNotificationCategoryApp
};



export type TypeNotificationCategoryApp =
  | "EVENT"
  | "JOB"
  | "VOTING"
  | "DONASI"
  | "INVESTASI"
  | "COLLABORATION"
  | "FORUM"
  | "OTHER";

export type TypeOfTilteCategoryApp = "Pendaftaran User Baru" | "Other"

export const listOfcategoriesAppNotification = [
  { value: "event", label: "Event" },
  { value: "job", label: "Job" },
  { value: "voting", label: "Voting" },
  { value: "donasi", label: "Donasi" },
  { value: "investasi", label: "Investasi" },
  { value: "forum", label: "Forum" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Lainnya" },
];
