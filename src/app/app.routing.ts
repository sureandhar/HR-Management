import { ModuleWithProviders } from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {LoginComponent} from './components/login/login.component'
import {HomeComponent} from './components/home/home.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component'
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'
import { ScheduleInterviewComponent } from './components/schedule-interview/schedule-interview.component'
import { AuthGuard } from './Dhrms-Services/AuthService/auth.guard'
import { InterviewerFeedbackComponent } from './components/interviewer-feedback/interviewer-feedback.component'
declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}
const routes:Routes=[

    {path:'login',component:LoginComponent},
    {path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'Dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    {path:'Candidateinfo/:id',component:CandidateInfoComponent,canActivate:[AuthGuard]},
    {path:'Scheudle/:id',component:ScheduleInterviewComponent,canActivate:[AuthGuard]},
    {path:'interviewfeedback/:id/:interviewid/:interviewerid',component:InterviewerFeedbackComponent,canActivate:[AuthGuard]},
    {path:'update-password',component:UpdatePasswordComponent},
    {path:'404',component:PageNotfoundComponent},
    {path:'**',component:LoginComponent}
]
export const routing:ModuleWithProviders=RouterModule.forRoot(routes);