import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbButtonModule, NbTooltipModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';

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
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbIconModule,
    NbButtonModule,
    SharedModule,
    NbTooltipModule,
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
