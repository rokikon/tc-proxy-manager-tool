import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdInputModule,
  MdRippleModule,
  MdSelectModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';

const materialImports = [
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdInputModule,
  MdRippleModule,
  MdSelectModule,
  MdTabsModule,
  MdToolbarModule
];

@NgModule({
  imports: [materialImports],
  exports: [materialImports]
})
export class MaterialImportsModule {
}
