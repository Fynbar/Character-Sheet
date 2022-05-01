import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// #region Service Imports
import { NumberToWordsPipe } from './common/number-to-words.pipe';
import { JSONService } from './services/json.service';
import { PythonService } from './services/python.service';
// #endregion
// #region Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DicePipe } from './common/dice.pipe';
import { DiceResultDialogComponent } from './components/dice/dice-result-dialog/dice-result-dialog.component';
import { DiceComponent } from './components/dice/dice.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { WeaponComponent } from './components/equipment/weapon/weapon.component';
import { HomeComponent } from './components/home/home.component';
import { ModifierBuilderComponent } from './components/modifiers/modifier-builder/modifier-builder.component';
// import { ModifierComponent } from './components/modifiers/modifier/modifier.component';
import { MonsterBuilderComponent } from './components/monster/monster-builder/monster-builder.component';
import { MonsterPageComponent } from './components/monster/monster-page/monster-page.component';
import { MonsterComponent } from './components/monster/monster.component';
import { ActionBuilderComponent } from './components/monster/stat-block/action-builder/action-builder.component';
import { StatBlockComponent } from './components/monster/stat-block/stat-block.component';
import { NotesComponent } from './components/notes/notes.component';
import { SpellListComponent } from './components/Spells/spell-list/spell-list.component';
import { ModifierDialogComponent } from './components/modifiers/modifier-dialog/modifier-dialog.component';
import { TableViewerComponent } from './components/table-viewer/table-viewer.component';
import { CombatComponent } from './components/combat/combat.component';
import { InitTrackerComponent } from './components/combat/init-tracker/init-tracker.component';
import { EncounterBuilderComponent } from './components/combat/encounter-builder/encounter-builder.component';
import { EncounterViewerComponent } from './components/combat/encounter-viewer/encounter-viewer.component';
import { EquipmentViewerComponent } from './components/equipment/equipment-viewer/equipment-viewer.component';
import { MonsterConverterComponent } from './components/monster/monster-converter/monster-converter.component';
// #endregion

// #region PrimeNG modules
import { AccordionModule } from 'primeng/accordion/accordion';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { TableModule } from 'primeng/table/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox/checkbox';
import { DialogModule } from 'primeng/dialog/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectButton';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import {FileUploadModule} from 'primeng/fileupload';
// #endregion


@NgModule({
  declarations: [
    AppComponent,
    SpellListComponent,
    MonsterPageComponent,
    MonsterBuilderComponent,
    MonsterComponent,
    HomeComponent,
    DiceComponent,
    DicePipe,
    // ModifierComponent,
    ModifierBuilderComponent,
    StatBlockComponent,
    DiceResultDialogComponent,
    NotesComponent,
    EquipmentComponent,
    WeaponComponent,
    NumberToWordsPipe,
    ActionBuilderComponent,
    ModifierDialogComponent,
    TableViewerComponent,
    CombatComponent,
    InitTrackerComponent,
    EncounterBuilderComponent,
    EncounterViewerComponent,
    EquipmentViewerComponent,
    MonsterConverterComponent
  ],
  imports: [
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    // AccordionModule,
    // AutoCompleteModu,
    // BlockUIModule,
    // BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    // CaptchaModule,
    // CardModul,
    // CarouselModule,
    // ChartModule,
    // CheckboxModule,
    // ChipsModule,
    // CodeHighlighterModule,
    // ColorPickerModule,
    // ConfirmDialogModule,
    // ContextMenuModule,
    // DataViewModule,
    // DeferModule,
    // DialogModule,
    // DragDropModule,
    DropdownModule,
    // DynamicDialogModule,
    // EditorModule,
    // FieldsetModule,
    // FullCalendarModule,
    // GalleriaModule,
    // GMapModule,
    // InplaceModule,
    // InputSwitchModule,
    InputNumberModule,
    InputTextModule,
    // InputTextareaModule,
    // KeyFilterModule,
    // LightboxModule,
    // ListboxModule,
    // InputMaskModule,
    // MegaMenuModule,
    // MenuModule,
    MenubarModule,
    // MessagesModule,
    // MultiSelectModule,
    // OrderListModule,
    // OrganizationChartModule,
    // OverlayPanelModule,
    PaginatorModule,
    // PanelModule,
    // PanelMenuModule,
    // PasswordModule,
    // PickListModule,
    // ProgressBarModule,
    // ProgressSpinnerModule,
    // RadioButtonModule,
    // RatingModule,
    // ScrollPanelModule,
    // SelectButtonModule,
    // SidebarModule,
    // SlideMenuModule,
    // SliderModule,
    // SpinnerModule,
    // SplitButtonModule,
    // StepsModue,
    // TableModule,
    // TabMenuModule,
    // TabViewModule,
    // TerminalModule,
    // TieredMenuModule,
    // ToastModule,
    // ToggleButtonModule,
    // ToolbarModule,
    TooltipModule,
    // TreeModule,
    // TreeTableModule,
    TriStateCheckboxModule,
    // FileUploadModule,
    // VirtualScrollerModule,
    FormsModule, ReactiveFormsModule,
    // Validators, FormControl, FormGroup, FormBuilder,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [
    ModifierDialogComponent
  ],
  providers: [
    PythonService,
    JSONService,
    // DialogService,
    // DynamicDialogRef,
    // DynamicDialogConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
