import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./components/login/login.component";
import { from } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddCandidateComponent } from "./components/add-candidate/add-candidate.component";
import { AddInterviewerComponent } from "./components/add-interviewer/add-interviewer.component";
import { InterviewerdetailsComponent } from "./components/interviewerdetails/interviewerdetails.component";
import { CandidateDetailsComponent } from "./components/candidate-details/candidate-details.component";
import { HeaderComponent } from "./Dhrms-Layouts/header/header.component";
import { FooterComponent } from "./Dhrms-Layouts/footer/footer.component";
import { FilterPipe } from "./components/interviewerdetails/filter.pipe";
import { SearchControlComponent } from "./components/search-control/search-control.component";
import { CandidateInfoComponent } from "./components/candidate-info/candidate-info.component";
import { PageNotfoundComponent } from "./components/page-notfound/page-notfound.component";
import { NgxPaginationModule } from "ngx-pagination";
import { UpdatePasswordComponent } from "./components/update-password/update-password.component";
import { InterviewerDashboardComponent } from "./components/interviewer-dashboard/interviewer-dashboard.component";
import { ScheduleInterviewComponent } from "./components/schedule-interview/schedule-interview.component";

//jwt import
import { JwtModule } from "@auth0/angular-jwt";
import { InterviewerFeedbackComponent } from "./components/interviewer-feedback/interviewer-feedback.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { LoaderComponent } from './components/loader/loader.component';

//jwt getter
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AddCandidateComponent,
    AddInterviewerComponent,
    InterviewerdetailsComponent,
    CandidateDetailsComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    SearchControlComponent,
    CandidateInfoComponent,
    PageNotfoundComponent,
    UpdatePasswordComponent,
    InterviewerDashboardComponent,
    ScheduleInterviewComponent,
    InterviewerFeedbackComponent,
    UploadFileComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://hr-api-csharp-v1.herokuapp.com"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
