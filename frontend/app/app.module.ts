import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// https://getbootstrap.com/docs/4.0/getting-started/webpack/
// подключаем бутстрап без cli
import 'bootstrap/dist/css/bootstrap.min.css';
// компоненты
import { AppComponent } from './components/app/app.component';
import { MenuComponent } from './components/menu/menu.component';
import { StartPageComponent } from './components/startpage/startpage.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';
// директивы
import { CompareDirective } from './directives/compare.directive';
import { CheckLoginDirective } from './directives/checklogin.directive';
// гварды
import { AppGuard } from './guards/app.guard';
// хранилища
import { AppStore } from './store/app.store';

const appRoutes: Routes = [
    { path: '', component: StartPageComponent},
    { path: 'forgot', component: ForgotComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'search', component: SearchComponent, canActivate: [AppGuard]},
    { path: '**', redirectTo: '/' }
];

@NgModule({
    declarations: [
        AppComponent,
        ForgotComponent,
        LoginComponent,
        SignupComponent,
        MenuComponent,
        StartPageComponent,
        SearchComponent,
        CompareDirective,
        CheckLoginDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule
    ],
    providers: [
        AppStore
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
