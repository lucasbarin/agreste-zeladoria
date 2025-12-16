@php
    $html_tag_data = [];
    $title = 'Articles Detail';
    $description = 'Medical Assistant';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data,'title'=>$title,'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
@endsection

@section('js_page')
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

        <div class="row">
            <div class="col-12 col-xl-8 col-xxl-9 mb-5">
                <div class="card mb-5">
                    <!-- Content Start -->
                    <img
                            src="/img/blog/large/blog-1.webp"
                            class="card-img-top sh-60"
                            alt="card image"
                    />
                    <div class="card-body">
                        <h4 class="mb-3">Keep your brain sharp by finding your sleep 'sweet spot,' study says</h4>
                        <div>
                            <p>
                                Toffee croissant icing toffee. Sweet roll chupa chups marshmallow muffin liquorice chupa chups soufflé bonbon. Liquorice gummi bears cake
                                donut chocolate lollipop gummi bears. Cotton candy cupcake ice cream gummies dessert muffin chocolate jelly. Danish brownie chocolate bar
                                lollipop cookie tootsie roll candy canes. Jujubes lollipop cheesecake gummi bears cheesecake. Cake jujubes soufflé.
                            </p>
                            <p>
                                Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake
                                marshmallow muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                <u>pudding lollipop caramels</u>
                                marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly chupa
                                chups lollipop jelly wafer soufflé.
                            </p>
                            <h6 class="mb-3 mt-5">How to best burn calories while walking</h6>
                            <p>
                                Jelly-o jelly oat cake cheesecake halvah. Cupcake sweet roll donut. Sesame snaps lollipop macaroon.
                                <a href="#">Icing tiramisu</a>
                                oat cake chocolate cake marzipan pudding danish gummies. Dragée liquorice jelly beans jelly jelly sesame snaps brownie. Cheesecake
                                chocolate cake sweet roll cupcake dragée croissant muffin. Lemon drops cupcake croissant liquorice donut cookie cake. Gingerbread biscuit
                                bear claw marzipan tiramisu topping. Jelly-o croissant chocolate bar gummi bears dessert lemon drops gingerbread croissant. Donut candy
                                jelly.
                            </p>
                            <ul class="list-unstyled">
                                <li>Croissant</li>
                                <li>Sesame snaps</li>
                                <li>Ice cream</li>
                                <li>Candy canes</li>
                                <li>Lemon drops</li>
                            </ul>
                            <h6 class="mb-3 mt-5">6 mistakes people make with OAB</h6>
                            <p>
                                Cake chocolate bar biscuit sweet roll liquorice jelly jujubes. Gingerbread icing macaroon bear claw jelly toffee. Chocolate cake
                                marshmallow muffin wafer. Pastry cake tart apple pie bear claw sweet. Apple pie macaroon sesame snaps cotton candy jelly
                                <u>pudding lollipop caramels</u>
                                marshmallow. Powder halvah dessert ice cream. Carrot cake gingerbread chocolate cake tootsie roll. Oat cake jujubes jelly-o jelly chupa
                                chups lollipop jelly wafer soufflé.
                            </p>
                            <p>
                                Carrot cake gummi bears wafer sesame snaps soufflé cheesecake cheesecake cake. Sweet roll apple pie tiramisu bonbon sugar plum muffin
                                sesame snaps chocolate. Lollipop sweet roll gingerbread halvah sesame snaps powder. Wafer halvah chocolate soufflé icing. Cotton candy
                                danish lollipop jelly-o candy caramels.
                            </p>
                        </div>
                    </div>
                    <!-- Content End -->

                    <div class="card-footer border-0 pt-0">
                        <div class="row align-items-center">
                            <!-- Comments and Likes Start -->
                            <div class="col-6 text-muted">
                                <div class="row g-0">
                                    <div class="col-auto pe-3">
                                        <i data-acorn-icon="eye" class="text-primary me-1" data-acorn-size="15"></i>
                                        <span class="align-middle">421</span>
                                    </div>
                                    <div class="col">
                                        <i data-acorn-icon="message" class="text-primary me-1" data-acorn-size="15"></i>
                                        <span class="align-middle">4</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Comments and Likes End -->

                            <!-- Social Buttons Start -->
                            <div class="col-6">
                                <div class="d-flex align-items-center justify-content-end">
                                    <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                        <i data-acorn-icon="facebook"></i>
                                    </button>
                                    <button class="btn btn-sm btn-icon btn-icon-only btn-outline-primary ms-1" type="button">
                                        <i data-acorn-icon="twitter"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- Social Buttons End -->
                        </div>
                    </div>
                </div>

                <!-- About the Author Start -->
                <h2 class="small-title">About the Author</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-auto">
                                <div class="sw-5 me-3">
                                    <img src="/img/profile/profile-15.webp" class="img-fluid rounded-xl" alt="thumb" />
                                </div>
                            </div>
                            <div class="col">
                                <a href="/Doctors/Detail" class="stretched-link">Trent Dawson, M.D.</a>
                                <div class="text-muted mb-2">Neurologist</div>
                                <div class="text-alternate">
                                    Cupcake chocolate cake jelly beans lemon drops danish bear claw carrot cake soufflé. Marshmallow jujubes tiramisu apple pie carrot cake
                                    danish candy. Croissant croissant chocolate bar. Jelly macaroon apple pie croissant pastry cheesecake. Marshmallow oat cake lemon drops
                                    chocolate bonbon powder lemon drops chocolate. Danish tootsie roll dessert soufflé.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- About the Author End -->
            </div>

            <!-- Right Side Start -->
            <div class="col-12 col-xl-4 col-xxl-3">
                <div class="mb-5">
                    <div class="row mb-n2">
                        <div class="col-12 col-md-6 col-xl-12">
                            <div class="card mb-2 sh-11 sh-sm-13">
                                <div class="row g-0 h-100">
                                    <div class="col-auto">
                                        <img
                                                src="https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                                alt="alternate text"
                                                class="card-img card-img-horizontal sw-10 sw-sm-14"
                                        />
                                    </div>
                                    <div class="col position-static">
                                        <div class="card-body d-flex flex-column pt-0 pb-0 h-100 justify-content-center">
                                            <div class="d-flex flex-column">
                                                <a href="/Articles/Detail" class="stretched-link body-link">
                                                    <div class="clamp-line" data-line="2">How Did the Pandemic Affect Anxiety in Early Pregnancy?</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-12">
                            <div class="card mb-2 sh-11 sh-sm-13">
                                <div class="row g-0 h-100">
                                    <div class="col-auto">
                                        <img
                                                src="https://images.pexels.com/photos/3993241/pexels-photo-3993241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                                alt="alternate text"
                                                class="card-img card-img-horizontal sw-10 sw-sm-14"
                                        />
                                    </div>
                                    <div class="col position-static">
                                        <div class="card-body d-flex flex-column pt-0 pb-0 h-100 justify-content-center">
                                            <div class="d-flex flex-column">
                                                <a href="/Articles/Detail" class="stretched-link body-link">
                                                    <div class="clamp-line" data-line="2">Antibiotics Used in Dialysis Patients Linked With Sudden Cardiac Death</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-12">
                            <div class="card mb-2 sh-11 sh-sm-13">
                                <div class="row g-0 h-100">
                                    <div class="col-auto">
                                        <img
                                                src="https://images.unsplash.com/photo-1550792436-181701c71f63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                                                alt="alternate text"
                                                class="card-img card-img-horizontal sw-10 sw-sm-14"
                                        />
                                    </div>
                                    <div class="col position-static">
                                        <div class="card-body d-flex flex-column pt-0 pb-0 h-100 justify-content-center">
                                            <div class="d-flex flex-column">
                                                <a href="/Articles/Detail" class="stretched-link body-link">
                                                    <div class="clamp-line" data-line="2">'Modest' Link Between Infertility and Postmenopausal Breast Cancer</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-12">
                            <div class="card mb-2 sh-11 sh-sm-13">
                                <div class="row g-0 h-100">
                                    <div class="col-auto">
                                        <img
                                                src="https://images.pexels.com/photos/4506166/pexels-photo-4506166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                                alt="alternate text"
                                                class="card-img card-img-horizontal sw-10 sw-sm-14"
                                        />
                                    </div>
                                    <div class="col position-static">
                                        <div class="card-body d-flex flex-column pt-0 pb-0 h-100 justify-content-center">
                                            <div class="d-flex flex-column">
                                                <a href="/Articles/Detail" class="stretched-link body-link">
                                                    <div class="clamp-line" data-line="2">Seniors and Boosters; New Theory on TB Spread; Pig-to-Human Kidney Transplant</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right Side End -->
        </div>
    </div>
@endsection
