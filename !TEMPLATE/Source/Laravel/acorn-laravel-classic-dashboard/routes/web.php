<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// index routing via Route feature
Route::redirect('/', '/Dashboards/Default');


/*
|--------------------------------------------------------------------------
| Dashboards
|--------------------------------------------------------------------------
|
*/
Route::prefix('Dashboards')->group(function () {
    Route::view('/', 'dashboards/index');
    Route::view('Default', 'dashboards/default');
    Route::view('Visual', 'dashboards/visual');
    Route::view('Analytic', 'dashboards/analytic');
});


/*
|--------------------------------------------------------------------------
| Apps
|--------------------------------------------------------------------------
|
*/
Route::prefix('Apps')->group(function () {
    Route::view('/', 'apps/index');
    Route::view('Calendar', 'apps/calendar');
    Route::view('Chat', 'apps/chat');
    Route::view('Contacts', 'apps/contacts');
    Route::view('Mailbox', 'apps/mailbox');
    Route::view('Tasks', 'apps/tasks');
});
/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
|
*/
Route::prefix('Pages')->group(function () {
    Route::view('/', 'pages/index');

    Route::prefix('Authentication')->group(function () {
        Route::view('/', 'pages/authentication/index');
        Route::view('Login', 'pages/authentication/login');
        Route::view('Register', 'pages/authentication/register');
        Route::view('ForgotPassword', 'pages/authentication/forgot_password');
        Route::view('ResetPassword', 'pages/authentication/reset_password');
    });

    Route::prefix('Blog')->group(function () {
        Route::view('/', 'pages/blog/index');
        Route::view('Home', 'pages/blog/home');
        Route::view('Grid', 'pages/blog/grid');
        Route::view('List', 'pages/blog/list');
        Route::view('Detail', 'pages/blog/detail');
    });

    Route::prefix('Miscellaneous')->group(function () {
        Route::view('/', 'pages/miscellaneous/index');
        Route::view('Faq', 'pages/miscellaneous/faq');
        Route::view('KnowledgeBase', 'pages/miscellaneous/knowledge_base');
        Route::view('Error', 'pages/miscellaneous/error');
        Route::view('ComingSoon', 'pages/miscellaneous/coming_soon');
        Route::view('Pricing', 'pages/miscellaneous/pricing');
        Route::view('Search', 'pages/miscellaneous/search');
        Route::view('Mailing', 'pages/miscellaneous/mailing');
        Route::view('MailingStandalone', 'pages/miscellaneous/mailing_standalone');
        Route::view('Empty', 'pages/miscellaneous/empty');
    });

    Route::prefix('Portfolio')->group(function () {
        Route::view('/', 'pages/portfolio/index');
        Route::view('Home', 'pages/portfolio/home');
        Route::view('Detail', 'pages/portfolio/detail');
    });

    Route::prefix('Profile')->group(function () {
        Route::view('/', 'pages/profile/index');
        Route::view('Standard', 'pages/profile/standard');
        Route::view('Settings', 'pages/profile/settings');
    });
});
/*
|--------------------------------------------------------------------------
| Blocks
|--------------------------------------------------------------------------
|
*/
Route::prefix('Blocks')->group(function () {
    Route::view('/', 'blocks/index');
    Route::view('Cta', 'blocks/cta');
    Route::view('Details', 'blocks/details');
    Route::view('Gallery', 'blocks/gallery');
    Route::view('Images', 'blocks/images');
    Route::view('List', 'blocks/list');
    Route::view('Stats', 'blocks/stats');
    Route::view('Steps', 'blocks/steps');
    Route::view('TabularData', 'blocks/tabular_data');
    Route::view('Thumbnails', 'blocks/thumbnails');
    Route::view('Users', 'blocks/users');
});
/*
|--------------------------------------------------------------------------
| Interface
|--------------------------------------------------------------------------
|
*/
Route::prefix('Interface')->group(function () {
    Route::view('/', 'interface/index');

    Route::prefix('Components')->group(function () {
        Route::view('/', 'interface/components/index');
        Route::view('Accordion', 'interface/components/accordion');
        Route::view('Alerts', 'interface/components/alerts');
        Route::view('Badge', 'interface/components/badge');
        Route::view('Breadcrumb', 'interface/components/breadcrumb');
        Route::view('Buttons', 'interface/components/buttons');
        Route::view('ButtonGroup', 'interface/components/button_group');
        Route::view('Card', 'interface/components/card');
        Route::view('CloseButton', 'interface/components/close_button');
        Route::view('Collapse', 'interface/components/collapse');
        Route::view('Dropdowns', 'interface/components/dropdowns');
        Route::view('ListGroup', 'interface/components/list_group');
        Route::view('Modal', 'interface/components/modal');
        Route::view('Navs', 'interface/components/navs');
        Route::view('Offcanvas', 'interface/components/offcanvas');
        Route::view('Pagination', 'interface/components/pagination');
        Route::view('Popovers', 'interface/components/popovers');
        Route::view('Progress', 'interface/components/progress');
        Route::view('Spinners', 'interface/components/spinners');
        Route::view('Toasts', 'interface/components/toasts');
        Route::view('Tooltips', 'interface/components/tooltips');
    });

    Route::prefix('Forms')->group(function () {
        Route::view('/', 'interface/forms/index');
        Route::view('Layouts', 'interface/forms/layouts');
        Route::view('Validation', 'interface/forms/validation');
        Route::view('Wizard', 'interface/forms/wizard');
        Route::view('InputGroup', 'interface/forms/input_group');
        Route::view('InputMask', 'interface/forms/input_mask');
        Route::view('GenericForms', 'interface/forms/generic_forms');
        Route::prefix('Controls')->group(function () {
            Route::view('/', 'interface/forms/controls/index');
            Route::view('Autocomplete', 'interface/forms/controls/autocomplete');
            Route::view('CheckboxRadio', 'interface/forms/controls/checkbox_radio');
            Route::view('DatePicker', 'interface/forms/controls/date_picker');
            Route::view('Dropzone', 'interface/forms/controls/dropzone');
            Route::view('Editor', 'interface/forms/controls/editor');
            Route::view('InputSpinner', 'interface/forms/controls/input_spinner');
            Route::view('Rating', 'interface/forms/controls/rating');
            Route::view('Select2', 'interface/forms/controls/select2');
            Route::view('Slider', 'interface/forms/controls/slider');
            Route::view('Tags', 'interface/forms/controls/tags');
            Route::view('TimePicker', 'interface/forms/controls/time_picker');
        });
    });

    Route::prefix('Plugins')->group(function () {
        Route::view('/', 'interface/plugins/index');
        Route::view('Carousel', 'interface/plugins/carousel');
        Route::view('Charts', 'interface/plugins/charts');
        Route::view('Clamp', 'interface/plugins/clamp');
        Route::view('ContextMenu', 'interface/plugins/context_menu');
        Route::prefix('Datatables')->group(function () {
            Route::view('/', 'interface/plugins/datatables/index');
            Route::view('EditableRows', 'interface/plugins/datatables/editable_rows');
            Route::view('EditableBoxed', 'interface/plugins/datatables/editable_boxed');
            Route::view('RowsAjax', 'interface/plugins/datatables/rows_ajax');
            Route::view('RowsServerSide', 'interface/plugins/datatables/rows_server_side');
            Route::view('BoxedVariations', 'interface/plugins/datatables/boxed_variations');
        });
        Route::view('Lightbox', 'interface/plugins/lightbox');
        Route::view('List', 'interface/plugins/list');
        Route::view('Maps', 'interface/plugins/maps');
        Route::view('Notify', 'interface/plugins/notify');
        Route::view('Player', 'interface/plugins/player');
        Route::view('Progress', 'interface/plugins/progress');
        Route::view('Scrollbar', 'interface/plugins/scrollbar');
        Route::view('Shortcuts', 'interface/plugins/shortcuts');
        Route::view('Sortable', 'interface/plugins/sortable');
    });

    Route::prefix('Content')->group(function () {
        Route::view('/', 'interface/content/index');
        Route::prefix('Icons')->group(function () {
            Route::view('/', 'interface/content/icons/index');
            Route::view('AcornCommerce', 'interface/content/icons/acorn_commerce');
            Route::view('AcornInterface', 'interface/content/icons/acorn_interface');
            Route::view('AcornLearning', 'interface/content/icons/acorn_learning');
            Route::view('AcornMedical', 'interface/content/icons/acorn_medical');
            Route::view('BootstrapIcons', 'interface/content/icons/bootstrap_icons');
        });
        Route::view('Images', 'interface/content/images');
        Route::view('Tables', 'interface/content/tables');
        Route::view('Typography', 'interface/content/typography');
        Route::prefix('Menu')->group(function () {
            Route::view('/', 'interface/content/menu/index');
            Route::view('HorizontalStandard', 'interface/content/menu/horizontal_standard');
            Route::view('VerticalStandard', 'interface/content/menu/vertical_standard');
            Route::view('VerticalSemiHidden', 'interface/content/menu/vertical_semi_hidden');
            Route::view('VerticalNoSemiHidden', 'interface/content/menu/vertical_no_semi_hidden');
            Route::view('MobileOnly', 'interface/content/menu/mobile_only');
            Route::view('Sidebar', 'interface/content/menu/sidebar');
        });
    });
});
