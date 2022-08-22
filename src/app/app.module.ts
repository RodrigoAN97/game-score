import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbDatepickerModule,
  NbButtonModule,
  NbSelectModule,
  NbCardModule,
  NbUserModule,
  NbIconModule,
  NbDialogModule,
  NbTabsetModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const firebaseConfig = {
  apiKey: 'AIzaSyCG2eoTY6L4muRcqzucCV4S0-VzdEgeXjc',
  authDomain: 'snooker-count.firebaseapp.com',
  projectId: 'snooker-count',
  storageBucket: 'snooker-count.appspot.com',
  messagingSenderId: '701534059859',
  appId: '1:701534059859:web:5175f2cf28ee45a18ef5a6',
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbButtonModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbCardModule,
    NbTabsetModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
