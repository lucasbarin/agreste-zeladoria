@php
    $html_tag_data = [];
    $title = 'Ticket Detail';
    $description= 'Service Provider Ticket Detail';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
    <link rel="stylesheet" href="/css/vendor/quill.bubble.css"/>
@endsection

@section('js_vendor')
    <script src="/js/vendor/quill.min.js"></script>
    <script src="/js/vendor/quill.active.js"></script>
    <script src="/js/vendor/jquery.barrating.min.js"></script>
@endsection

@section('js_page')
    <script src="/js/pages/support.ticketsdetail.js"></script>
@endsection

@section('content')
    <div class="col">
        <!-- Title and Top Buttons Start -->
        <div class="page-title-container mb-3">
            <div class="row">
                <!-- Title Start -->
                <div class="col mb-2">
                    <h1 class="mb-2 pb-0 display-4" id="title">Ticket Detail</h1>
                    <div class="text-muted font-heading text-small">Let us manage the database engines for your applications so you can focus on building.</div>
                </div>
                <!-- Title End -->

                <!-- Top Buttons Start -->
                <div class="col-12 col-md-5 d-flex align-items-center justify-content-end">
                    <!-- Status Button Start -->
                    <div class="dropdown-as-select w-100 w-md-auto">
                        <button
                                class="btn btn btn-outline-primary w-100 w-md-auto dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                        ></button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">Status: Solved</a>
                            <a class="dropdown-item active" href="#">Status: Active</a>
                        </div>
                    </div>
                    <!-- Status Button End -->

                    <!-- Dropdown Button Start -->
                    <div class="ms-1">
                        <button
                                type="button"
                                class="btn btn-outline-primary btn-icon btn-icon-only"
                                data-bs-offset="0,3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-submenu
                        >
                            <i data-acorn-icon="more-horizontal"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <button class="dropdown-item" type="button">User</button>
                            <button class="dropdown-item" type="button">History</button>
                            <button class="dropdown-item" type="button">Last Message</button>
                        </div>
                    </div>
                    <!-- Dropdown Button End -->
                </div>
                <!-- Top Buttons End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <div class="row">
            <div class="col-12 col-xxl-8 mb-5 mb-xxl-0">
                <!-- Ticket Details Start -->
                <h2 class="small-title">Can’t find error logs</h2>
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="mb-4 pb-4 border-bottom border-separator-light">
                            <div class="row g-0 sh-sm-5 h-auto">
                                <div class="col-auto">
                                    <img src="/img/profile/profile-9.webp" class="card-img rounded-xl sh-5 sw-5" alt="thumb" />
                                </div>
                                <div class="col ps-3">
                                    <div class="row h-100 g-2">
                                        <div class="col h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                                            <div>Lisa Jackson</div>
                                            <div class="text-small text-muted">lisajackson@gmail.com</div>
                                        </div>
                                        <div
                                                class="col-12 order-3 order-sm-0 col-sm-auto sw-sm-11 sw-sm-11 lh-1-5 text-small text-muted text-sm-end d-flex flex-column justify-content-sm-center"
                                        >
                                            12 Feb 2021 19:25
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="mt-4">
                                    <p>Hello,</p>
                                    <p>
                                        Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake
                                        marshmallow muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                        <u>pudding lollipop caramels</u>
                                        marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly
                                        chupa chups lollipop jelly wafer soufflé.
                                    </p>
                                    <p>
                                        Jelly-o jelly oat cake cheesecake halvah. Cupcake sweet roll donut. Sesame snaps lollipop macaroon.
                                        <a href="#">Icing tiramisu</a>
                                        oat cake chocolate cake marzipan pudding danish gummies. Dragée liquorice jelly beans jelly jelly sesame snaps brownie. Cheesecake
                                        chocolate cake sweet roll cupcake dragée croissant muffin. Lemon drops cupcake croissant liquorice donut cookie cake. Gingerbread
                                        biscuit bear claw marzipan tiramisu topping. Jelly-o croissant chocolate bar gummi bears dessert lemon drops gingerbread
                                        croissant. Donut candy jelly.
                                    </p>
                                    <p class="mb-0">
                                        Help would be appreciated!
                                        <br />
                                        Lisa Jackson
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4 pb-4 border-bottom border-separator-light">
                            <div class="row g-0 sh-sm-5 h-auto">
                                <div class="col-auto">
                                    <img src="/img/profile/profile-8.webp" class="card-img rounded-xl sh-5 sw-5" alt="thumb" />
                                </div>
                                <div class="col ps-3">
                                    <div class="row h-100 g-2">
                                        <div class="col h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                                            <div>Blaine Cottrell</div>
                                            <div class="text-small text-muted">blainecottrell@msn.com</div>
                                        </div>
                                        <div
                                                class="col-12 order-3 order-sm-0 col-sm-auto sw-sm-11 lh-1-5 text-small text-muted text-sm-end d-flex flex-column justify-content-sm-center"
                                        >
                                            12 Feb 2021 21:40
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="mt-4">
                                    <p>Hi Lisa,</p>
                                    <p>
                                        Jelly-o jelly oat cake cheesecake halvah. Cupcake sweet roll donut. Sesame snaps lollipop macaroon.
                                        <a href="#">Icing tiramisu</a>
                                        oat cake chocolate cake marzipan pudding danish gummies. Dragée liquorice jelly beans jelly jelly sesame snaps brownie. Pastry
                                        cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                        <u>pudding lollipop caramels</u>
                                        marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly
                                        chupa chups lollipop jelly wafer soufflé.
                                    </p>
                                    <p class="mb-0">Blaine Cottrell</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row g-0 sh-sm-5 h-auto mb-4">
                                <div class="col-auto">
                                    <img src="/img/profile/profile-9.webp" class="card-img rounded-xl sh-5 sw-5" alt="thumb" />
                                </div>
                                <div class="col ps-3">
                                    <div class="row h-100 g-2">
                                        <div class="col h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                                            <div>Lisa Jackson</div>
                                            <div class="text-small text-muted">lisajackson@gmail.com</div>
                                        </div>
                                        <div
                                                class="col-12 order-3 order-sm-0 col-sm-auto sw-sm-11 sw-sm-11 lh-1-5 text-small text-muted text-sm-end d-flex flex-column justify-content-sm-center"
                                        >
                                            13 Feb 2021 09:20
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Hi,</p>
                                <p>
                                    Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake
                                    marshmallow muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                    <u>pudding lollipop caramels</u>
                                    marshmallow.
                                </p>

                                <p>
                                    Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly chupa chups
                                    lollipop jelly wafer soufflé. Chocolate cake marshmallow muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie
                                    macaroon sesame snaps cotton candy jelly.
                                </p>
                                <p class="mb-0">Lisa</p>

                                <div class="mt-4 d-flex flex-row flex-wrap">
                                    <div class="sw-30 me-2 mb-2">
                                        <div class="row g-0 rounded-md sh-8 border">
                                            <div class="col-auto">
                                                <div class="sw-10 d-flex justify-content-center align-items-center h-100">
                                                    <i data-acorn-icon="file-text" class="preview-icon text-primary"></i>
                                                </div>
                                            </div>
                                            <div class="col rounded-md-end d-flex flex-column justify-content-center pe-3">
                                                <div class="d-flex justify-content-between">
                                                    <p class="mb-0 clamp-line" data-line="1">logs.txt</p>
                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Download" data-delay='{"show":"1000", "hide":"0"}'>
                                                        <i data-acorn-icon="download" data-acorn-size="17" class="text-alternate"></i>
                                                    </a>
                                                </div>
                                                <div class="text-small text-primary">26 KB</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Ticket Details End -->

                <!-- Ticket Answer Start -->
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3 filled custom-control-container editor-container">
                            <div class="html-editor sh-16" id="quillEditorFilledEmail"></div>
                            <i data-acorn-icon="notebook-1"></i>
                        </div>
                        <button class="btn btn-icon btn-icon-end btn-outline-primary" type="button">
                            <span>Send</span>
                            <i data-acorn-icon="send"></i>
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-icon btn-icon-only me-1">
                            <i data-acorn-icon="attachment"></i>
                        </button>
                    </div>
                </div>
                <!-- Ticket Answer End -->
            </div>

            <div class="col-12 col-xxl-4 mb-n5">
                <!-- Activity Start -->
                <h2 class="small-title">Activity</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                <div class="w-100 d-flex sh-1"></div>
                                <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                    <div class="bg-gradient-light sw-1 sh-1 rounded-xl position-relative"></div>
                                </div>
                                <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                    <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                </div>
                            </div>
                            <div class="col mb-4">
                                <div class="h-100">
                                    <div class="d-flex flex-column justify-content-start">
                                        <div class="d-flex flex-column">
                                            <a href="#" class="heading stretched-link">Ticket Created</a>
                                            <div class="text-alternate">16.02.2021</div>
                                            <div class="text-muted mt-1">Biscuit donut powder sugar plum pastry. Chupa chups topping pastry halvah.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-0">
                            <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                <div class="w-100 d-flex sh-1 position-relative justify-content-center">
                                    <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                </div>
                                <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                    <div class="bg-gradient-light sw-1 sh-1 rounded-xl position-relative"></div>
                                </div>
                                <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                    <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                </div>
                            </div>
                            <div class="col mb-4">
                                <div class="h-100">
                                    <div class="d-flex flex-column justify-content-start">
                                        <div class="d-flex flex-column">
                                            <a href="#" class="heading stretched-link">Answered</a>
                                            <div class="text-alternate">16.02.2021</div>
                                            <div class="text-muted mt-1">Apple pie cotton candy tiramisu biscuit cake muffin tootsie roll bear claw cake.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row g-0">
                            <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                <div class="w-100 d-flex sh-1 position-relative justify-content-center">
                                    <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                </div>
                                <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                    <div class="bg-gradient-light sw-1 sh-1 rounded-xl position-relative"></div>
                                </div>
                                <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                            </div>
                            <div class="col">
                                <div class="h-100">
                                    <div class="d-flex flex-column justify-content-start">
                                        <div class="d-flex flex-column">
                                            <a href="#" class="heading stretched-link pt-0">Solved</a>
                                            <div class="text-alternate">17.02.2021</div>
                                            <div class="text-muted mt-1">
                                                Marzipan muffin cheesecake. Caramels wafer jelly beans. Icing pudding dessert caramels cake topping marzipan.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Activity End -->

                <!-- Rate the Conversation Start -->
                <h2 class="small-title">Rate the Conversation</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="d-block form-label">Skills</label>
                            <div class="br-wrapper br-theme-cs-icon">
                                <select class="rating" name="rating" autocomplete="off">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="d-block form-label">Communucation</label>
                            <div class="br-wrapper br-theme-cs-icon">
                                <select class="rating" name="rating" autocomplete="off">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-0">
                            <label class="d-block form-label">Time</label>
                            <div class="br-wrapper br-theme-cs-icon">
                                <select class="rating" name="rating" autocomplete="off">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Rate the Conversation End -->
            </div>
        </div>
    </div>
@endsection
