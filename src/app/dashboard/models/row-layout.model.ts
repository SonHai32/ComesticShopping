import { ColLayout } from './col-layout.model';
import { NzColDirective } from 'ng-zorro-antd/grid';

export interface RowLayout {
  key: string;
  title?: string;
  cols: ColLayout[];
}
