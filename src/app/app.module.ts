import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ConcertsComponent } from './pages/concerts/concerts.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    // MainComponent,
    // ConcertsComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    AngularFireModule.initializeApp({
      projectId: 'online-koncertjegy',
      appId: '1:599167310456:web:605183f5e9782316b4eb8d',
      storageBucket: 'online-koncertjegy.appspot.com',
      apiKey: 'AIzaSyB82oUAG1VFhZx684nM0ONXWD0biSPMcUQ',
      authDomain: 'online-koncertjegy.firebaseapp.com',
      messagingSenderId: '599167310456',
      measurementId: 'G-NWZQ16NVX2',
    }),
    // provideFirebaseApp(() => initializeApp({"projectId":"online-koncertjegy","appId":"1:599167310456:web:605183f5e9782316b4eb8d","storageBucket":"online-koncertjegy.appspot.com","apiKey":"AIzaSyB82oUAG1VFhZx684nM0ONXWD0biSPMcUQ","authDomain":"online-koncertjegy.firebaseapp.com","messagingSenderId":"599167310456","measurementId":"G-NWZQ16NVX2"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
