export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type postStatusType = "publish" | "draft" | "block" | "all";
