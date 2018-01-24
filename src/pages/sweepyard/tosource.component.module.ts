import { NgModule } from '@angular/core';
import {IonicModule,IonicPageModule} from 'ionic-angular';

import {ToSourceComponent} from './tosource/tosource.component';
import {ToSourceService} from './tosource/tosource.service';
//溯源详情
import {TsDetailComponent} from './tosource-detail/tsdetail.component';

import { ElesltDirective , HighlightDirective } from '../../pipes/directive';
// const routes: Routes = [
//   { path: 'path', component: SweepYardComponent },
// ];

@NgModule({
    imports: [IonicPageModule.forChild(ToSourceComponent)],
    declarations: [
        ToSourceComponent,
        TsDetailComponent,


        ElesltDirective,
        HighlightDirective,
        ],
    entryComponents: [
        ToSourceComponent,
        TsDetailComponent
    ],
    providers: [ToSourceService],
    exports: [ToSourceComponent]
})
export class ToSourceModule { }
