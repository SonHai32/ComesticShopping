import { AppEffects } from './store/auth/effects/app.effect';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { AuthEffect } from './store/auth/effects/auth.effect';
import { initializer, initialAppListening } from './helpers/app.initializer';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { environment } from './../environments/environment.prod';
import { authReducer } from './store/auth/reducers/auth.reducer';
import { DefaultRoutingModule } from './modules/default-routing/default-routing.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './components/share/share.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthenticateService } from './services/authenticate.service';
import { EffectsModule } from '@ngrx/effects';
import { AppReducers } from './store/auth/reducers/app.reducer';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DefaultRoutingModule,
    CommonModule,
    AppRoutingModule,
    ShareModule,
    FormsModule,
    StoreModule.forRoot({ auth: authReducer, app: AppReducers }),
    EffectsModule.forRoot([AuthEffect, AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzMessageModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [Store],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialAppListening,
      multi: true,
      deps: [Store, NzMessageService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
