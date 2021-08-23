import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { Postlistcomp } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { ApplicationCreateComponent } from './candidates/application-create/application-create.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list.component';

const routes: Routes = [
  { path : '', component: Postlistcomp },
  { path : 'create', component: PostCreateComponent ,canActivate: [AuthGuard]},
  { path : 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path : 'login', component: LoginComponent},
  { path : 'signup', component: SignupComponent},
  { path : 'apply', component: ApplicationCreateComponent},
  { path : 'apply/:postId', component: ApplicationCreateComponent},
  { path : 'candidates/:postId/:title', component: CandidateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
