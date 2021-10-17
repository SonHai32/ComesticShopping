export interface Category {
  _id?: string;
  slug: string;
  name: string;
  sub_category?: Category;
  last_modified?: {
    updated_at: Date;
    update_by: string;
  };
  created_at?: Date;
  created_by?: string;
}
