import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorInterceptor } from './common/http-error.interceptor';

// #region PrimeNG modules
import { AccordionModule } from 'primeng/Accordion';
// import { DialogService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/AutoComplete';
import { BlockUIModule } from 'primeng/BlockUI';
import { BreadcrumbModule } from 'primeng/Breadcrumb';
import { ButtonModule } from 'primeng/Button';
import { CalendarModule } from 'primeng/Calendar';
import { CaptchaModule } from 'primeng/Captcha';
import { CardModule } from 'primeng/Card';
import { CarouselModule } from 'primeng/Carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/Checkbox';
import { ChipsModule } from 'primeng/Chips';
import { CodeHighlighterModule } from 'primeng/CodeHighlighter';
import { ColorPickerModule } from 'primeng/ColorPicker';
import { ConfirmDialogModule } from 'primeng/ConfirmDialog';
import { ContextMenuModule } from 'primeng/ContextMenu';
import { DataViewModule } from 'primeng/DataView';
import { DeferModule } from 'primeng/Defer';
import { DialogModule } from 'primeng/Dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/Dropdown';
import { DynamicDialogModule } from 'primeng/DynamicDialog';
import { EditorModule } from 'primeng/Editor';
import { FieldsetModule } from 'primeng/Fieldset';
import { FileUploadModule } from 'primeng/fileupload';
// import { FullCalendarModule } from 'primeng/FullCalendar';
import { GalleriaModule } from 'primeng/Galleria';
import { GMapModule } from 'primeng/GMap';
import { InplaceModule } from 'primeng/Inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/InputSwitch';
import { InputTextModule } from 'primeng/InputText';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/KeyFilter';
import { LightboxModule } from 'primeng/Lightbox';
import { ListboxModule } from 'primeng/Listbox';
import { MegaMenuModule } from 'primeng/MegaMenu';
import { MenuModule } from 'primeng/Menu';
import { MenubarModule } from 'primeng/Menubar';
import { MessagesModule } from 'primeng/Messages';
import { MultiSelectModule } from 'primeng/MultiSelect';
import { OrderListModule } from 'primeng/OrderList';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/OverlayPanel';
import { PaginatorModule } from 'primeng/Paginator';
import { PanelModule } from 'primeng/Panel';
import { PanelMenuModule } from 'primeng/PanelMenu';
import { PasswordModule } from 'primeng/Password';
import { PickListModule } from 'primeng/PickList';
import { ProgressBarModule } from 'primeng/ProgressBar';
import { ProgressSpinnerModule } from 'primeng/ProgressSpinner';
import { RadioButtonModule } from 'primeng/RadioButton';
import { RatingModule } from 'primeng/Rating';
import { ScrollPanelModule } from 'primeng/ScrollPanel';
import { SelectButtonModule } from 'primeng/SelectButton';
import { SidebarModule } from 'primeng/Sidebar';
import { SlideMenuModule } from 'primeng/SlideMenu';
import { SliderModule } from 'primeng/Slider';
import { SpinnerModule } from 'primeng/Spinner';
import { SplitButtonModule } from 'primeng/SplitButton';
import { StepsModule } from 'primeng/Steps';
import { TableModule } from 'primeng/Table';
import { TabMenuModule } from 'primeng/TabMenu';
import { TabViewModule } from 'primeng/TabView';
import { TerminalModule } from 'primeng/Terminal';
import { TieredMenuModule } from 'primeng/TieredMenu';
import { ToastModule } from 'primeng/Toast';
import { ToggleButtonModule } from 'primeng/ToggleButton';
import { ToolbarModule } from 'primeng/Toolbar';
import { TooltipModule } from 'primeng/Tooltip';
import { TreeModule } from 'primeng/Tree';
import { TreeTableModule } from 'primeng/TreeTable';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { VirtualScrollerModule } from 'primeng/VirtualScroller';
// #endregion

// #region Component Imports
import { MonsterBuilderComponent } from './components/monster/monster-builder/monster-builder.component';
import { MonsterComponent } from './components/monster/monster.component';
import { HomeComponent } from './components/home/home.component';
import { SpellListComponent } from './components/Spells/spell-list/spell-list.component';
import { MonsterPageComponent } from './components/monster/monster-page/monster-page.component';
// #endregion

// #region Service Imports
import { PythonService } from './services/python.service';
import { JSONService } from './services/json.service';
import { DiceComponent } from './components/dice/dice.component';
import { DicePipe } from './common/dice.pipe';
import { ModifierComponent } from './components/modifiers/modifier/modifier.component';
import { ModifierBuilderComponent } from './components/modifiers/modifier-builder/modifier-builder.component';
import { StatBlockComponent } from './components/monster/stat-block/stat-block.component';
import { DiceResultDialogComponent } from './components/dice/dice-result-dialog/dice-result-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { WeaponComponent } from './components/equipment/weapon/weapon.component';
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
    ModifierComponent,
    ModifierBuilderComponent,
    StatBlockComponent,
    DiceResultDialogComponent,
    NotesComponent,
    EquipmentComponent,
    WeaponComponent
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
  providers: [
    PythonService,
    JSONService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
