export interface ProductGroup {
  group_id: string;
  title: string;
  _id?: string;
  status: boolean;
  availableIn?: Date;
  expiresIn?: Date;
  created_at?: Date;
  created_by?: string;
  last_modified?: {
    updated_at: Date;
    updated_by: string;
  };
}
