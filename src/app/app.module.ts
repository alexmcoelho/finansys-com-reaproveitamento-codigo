import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    HttpModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
