export interface ProductDisplay {
  display_type: 'grid' | 'carousel';
  title: {
    content: string;
    color: string;
    background: string;
  };
  productDisplayWithTag: string | 'all';
}
