import { NgModule } from "@angular/core";

import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "../../../node_modules/@angular/common";

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective
    ]
})
export class SharedModule {

}