import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAnalyticsModule } from '@angular/fire/analytics'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { FocusMeDirective } from './focus-me.directive'

@NgModule({
  declarations: [AppComponent, FocusMeDirective],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule.enablePersistence({
      synchronizeTabs: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
