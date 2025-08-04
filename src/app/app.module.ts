import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { baseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';
import { ImageUrlService } from './services/image-url.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
	AppRoutingModule,
	HttpClientModule,
	MatToolbarModule,
	MatListModule,
	MatGridListModule,
	MatCardModule,
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	MatCheckboxModule,
	MatSelectModule,
	MatSlideToggleModule,
	MatProgressSpinnerModule,
	MatSliderModule,
	MatIconModule,
	MatTooltipModule,
	MatSnackBarModule
  ],
  providers: [
	  DishService,
	  PromotionService,
	  LeaderService,
	  ProcessHTTPMsgService,
	  FeedbackService,
	  ImageUrlService,
	  { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
