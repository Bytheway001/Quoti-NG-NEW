export type IContext = {
  files: IFile[];
  filters: { year: number; company: number };
  fileActions: any;
};
export type IFile = {
  id: number;
  category: string;
  created_at: string;
  company_id: number;
  url: string;
  file_name: string | null;
  file_desc: string;
  lang: string;
  year: number;
  company: {
    id: number;
    name: string;
    short_name: string;
    slug: string;
  };
};
