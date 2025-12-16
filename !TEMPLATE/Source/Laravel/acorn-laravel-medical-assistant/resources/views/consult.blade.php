@php
    $html_tag_data = [];
    $title = 'Consult';
    $description = 'Medical Assistant';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data,'title'=>$title,'description'=>$description])

@section('css')
    <link rel="stylesheet" href="/css/vendor/quill.bubble.css" />
@endsection

@section('js_vendor')
    <script src="/js/vendor/quill.min.js"></script>
    <script src="/js/vendor/quill.active.js"></script>
@endsection

@section('js_page')
    <script src="/js/pages/consult.js"></script>
@endsection

@section('content')
    <div class="container">
        <!-- Title and Top Buttons Start -->
        <div class="page-title-container">
            <div class="row">
                <!-- Title Start -->
                <div class="col-12 col-md-7">
                    <a href="/" class="muted-link pb-1 d-inline-block breadcrumb-back">
                        <i data-acorn-icon="chevron-left" data-acorn-size="13"></i>
                        <span class="text-small align-middle">Home</span>
                    </a>
                    <h1 class="mb-0 pb-0 display-4" id="title">{{ $title }}</h1>
                </div>
                <!-- Title End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <div class="row gx-5">
            <div class="col-xl-4 mb-5">
                <!-- Doctors List Start -->
                <h2 class="small-title">Your Doctors</h2>
                <div class="row g-2">
                    <div class="col-auto col-xl-12">
                        <div class="card active hover-border-primary">
                            <div class="card-body">
                                <div class="row g-0 sh-6">
                                    <div class="col-auto">
                                        <img
                                                src="/img/profile/profile-14.webp"
                                                class="card-img rounded-xl sh-6 sw-6 no-delay"
                                                data-bs-delay="0"
                                                alt="thumb"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Karter Kidd, M.D."
                                        />
                                    </div>
                                    <div class="col d-none d-xl-block">
                                        <div class="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                                            <div class="d-flex flex-column">
                                                <a href="#" class="body-link">Karter Kidd, M.D.</a>
                                                <div class="text-small text-muted">Neurologist</div>
                                            </div>
                                            <div class="d-flex">
                                                <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                                    <i data-acorn-icon="more-vertical"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto col-xl-12">
                        <div class="card hover-border-primary">
                            <div class="card-body">
                                <div class="row g-0 sh-6">
                                    <div class="col-auto">
                                        <img
                                                src="/img/profile/profile-12.webp"
                                                class="card-img rounded-xl sh-6 sw-6 no-delay"
                                                alt="thumb"
                                                data-bs-delay="0"
                                                alt="thumb"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Carmelo Avril, M.B.B.S."
                                        />
                                    </div>
                                    <div class="col d-none d-xl-block">
                                        <div class="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                                            <div class="d-flex flex-column">
                                                <a href="#" class="body-link">Carmelo Avril, M.B.B.S.</a>
                                                <div class="text-small text-muted">Rheumatologist</div>
                                            </div>
                                            <div class="d-flex">
                                                <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                                    <i data-acorn-icon="more-vertical"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto col-xl-12">
                        <div class="card hover-border-primary">
                            <div class="card-body">
                                <div class="row g-0 sh-6">
                                    <div class="col-auto">
                                        <img
                                                src="/img/profile/profile-13.webp"
                                                class="card-img rounded-xl sh-6 sw-6 no-delay"
                                                alt="thumb"
                                                data-bs-delay="0"
                                                alt="thumb"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Alma Holder, D.M.S."
                                        />
                                    </div>
                                    <div class="col d-none d-xl-block">
                                        <div class="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                                            <div class="d-flex flex-column">
                                                <a href="#" class="body-link">Alma Holder, D.M.S.</a>
                                                <div class="text-small text-muted">Ophthalmologist</div>
                                            </div>
                                            <div class="d-flex">
                                                <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                                    <i data-acorn-icon="more-vertical"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto col-xl-12">
                        <div class="card hover-border-primary">
                            <div class="card-body">
                                <div class="row g-0 sh-6">
                                    <div class="col-auto">
                                        <img
                                                src="/img/profile/profile-15.webp"
                                                class="card-img rounded-xl sh-6 sw-6 no-delay"
                                                alt="thumb"
                                                data-bs-delay="0"
                                                alt="thumb"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Isaac Mckee, D.O."
                                        />
                                    </div>
                                    <div class="col d-none d-xl-block">
                                        <div class="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                                            <div class="d-flex flex-column">
                                                <a href="#" class="body-link">Isaac Mckee, D.O.</a>
                                                <div class="text-small text-muted">Neurologist</div>
                                            </div>
                                            <div class="d-flex">
                                                <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                                    <i data-acorn-icon="more-vertical"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Doctors List End -->
            </div>
            <div class="col-xl-8">
                <!-- Consult Start -->
                <h2 class="small-title">About my surgery</h2>
                <div class="card mb-2">
                    <div class="card-body border-last-none">
                        <div class="mb-4 pb-4 border-bottom border-separator-light">
                            <div class="row g-0 sh-sm-5 h-auto">
                                <div class="col-auto">
                                    <img src="/img/profile/profile-1.webp" class="card-img rounded-xl sh-5 sw-5" alt="thumb" />
                                </div>
                                <div class="col ps-3">
                                    <div class="row h-100 g-2">
                                        <div class="col h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                                            <div>Alicia Owens</div>
                                            <div class="text-small text-muted">aliciaowens@gmail.com</div>
                                        </div>
                                        <div
                                                class="col-12 order-3 order-sm-0 col-sm-auto sw-sm-11 sw-sm-11 lh-1-5 text-small text-muted text-sm-end d-flex flex-column justify-content-sm-center"
                                        >
                                            12 Dec 2021 19:25
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
                                        biscuit bear claw marzipan tiramisu topping. Jelly-o croissant chocolate bar gummi bears dessert lemon drops gingerbread croissant.
                                        Donut candy jelly.
                                    </p>
                                    <p class="mb-0">
                                        Help would be appreciated!
                                        <br />
                                        Alicia Owens
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="border-bottom border-separator-light">
                            <div class="row g-0 sh-sm-5 h-auto">
                                <div class="col-auto">
                                    <img src="/img/profile/profile-14.webp" class="card-img rounded-xl sh-5 sw-5" alt="thumb" />
                                </div>
                                <div class="col ps-3">
                                    <div class="row h-100 g-2">
                                        <div class="col h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
                                            <div>Karter Kidd, M.D.</div>
                                            <div class="text-small text-muted">karterkidd@msn.com</div>
                                        </div>
                                        <div
                                                class="col-12 order-3 order-sm-0 col-sm-auto sw-sm-11 lh-1-5 text-small text-muted text-sm-end d-flex flex-column justify-content-sm-center"
                                        >
                                            12 Dec 2021 21:40
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="mt-4">
                                    <p>Hi Ms. Owens,</p>
                                    <p>
                                        Jelly-o jelly oat cake cheesecake halvah. Cupcake sweet roll donut. Sesame snaps lollipop macaroon.
                                        <a href="#">Icing tiramisu</a>
                                        oat cake chocolate cake marzipan pudding danish gummies. Dragée liquorice jelly beans jelly jelly sesame snaps brownie. Pastry cake
                                        tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                        <u>pudding lollipop caramels</u>
                                        marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly
                                        chupa chups lollipop jelly wafer soufflé.
                                    </p>
                                    <p>
                                        Chocolate bar powder apple pie cupcake sweet sugar plum. Croissant marzipan candy canes liquorice croissant. Lemon drops tart gummies
                                        cake fruitcake. Sugar plum dragée lemon drops tiramisu oat cake. Sesame snaps gummi bears pie topping candy canes pie marzipan candy
                                        shortbread.
                                    </p>
                                    <p class="mb-0">Karter Kidd, M.D.</p>
                                </div>
                                <div class="sw-30 me-2 mt-3">
                                    <div class="row g-0 rounded-sm sh-8 border">
                                        <div class="col-auto">
                                            <div class="sw-10 d-flex justify-content-center align-items-center h-100">
                                                <i data-acorn-icon="file-text" class="text-primary"></i>
                                            </div>
                                        </div>
                                        <div class="col rounded-sm-end d-flex flex-column justify-content-center pe-3">
                                            <div class="d-flex justify-content-between">
                                                <p class="mb-0 clamp-line" data-line="1">before-surgery.pdf</p>
                                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Download" data-delay='{"show":"1000", "hide":"0"}'>
                                                    <i data-acorn-icon="download" data-acorn-size="17" class="text-alternate"></i>
                                                </a>
                                            </div>
                                            <div class="text-small text-primary">521 KB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Consult End -->

                <!-- Consult Answer Start -->
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
                <!-- Consult Answer End -->
            </div>
        </div>
    </div>
@endsection
