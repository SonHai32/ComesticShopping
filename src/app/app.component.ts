import { AppActions } from './store/auth/actions/app.action';
import { timeout } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  constructor(private store: Store){}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => this.store.dispatch(AppActions.messageAction({message: {title: 'dsadasda', type: 'error'}})), 5000)
  }
}
