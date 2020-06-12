import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// #region PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
// import { DialogService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autoComplete';
import { BlockUIModule } from 'primeng/blockUI';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CaptchaModule } from 'primeng/captcha';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codeHighlighter';
import { ColorPickerModule } from 'primeng/colorPicker';
import { ConfirmDialogModule } from 'primeng/confirmDialog';
import { ContextMenuModule } from 'primeng/contextMenu';
import { DataViewModule } from 'primeng/dataView';
import { DeferModule } from 'primeng/defer';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
// import { FullCalendarModule } from 'primeng/fullCalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GMapModule } from 'primeng/gMap';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputSwitch';
import { InputTextModule } from 'primeng/inputText';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyFilter';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megaMenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiSelect';
import { OrderListModule } from 'primeng/orderList';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlayPanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelMenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/pickList';
import { ProgressBarModule } from 'primeng/progressBar';
import { ProgressSpinnerModule } from 'primeng/progressSpinner';
import { RadioButtonModule } from 'primeng/radioButton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollPanel';
import { SelectButtonModule } from 'primeng/selectButton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slideMenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitButton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabMenu';
import { TabViewModule } from 'primeng/tabView';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredMenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/toggleButton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treeTable';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { VirtualScrollerModule } from 'primeng/virtualScroller';

// #endregion
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
    ModifierDialogComponent
  ],
  imports: [
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AccordionModule,
    AutoCompleteModule,
    BlockUIModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CaptchaModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DataViewModule,
    DeferModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    // FullCalendarModule,
    GalleriaModule,
    GMapModule,
    InplaceModule,
    InputSwitchModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    LightboxModule,
    ListboxModule,
    InputMaskModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    TriStateCheckboxModule,
    FileUploadModule,
    VirtualScrollerModule,
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
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
