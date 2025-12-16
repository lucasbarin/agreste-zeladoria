@php
    $html_tag_data = [];
    $title = 'Articles';
    $description = 'Medical Assistant';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data,'title'=>$title,'description'=>$description])

@section('css')
    <link rel="stylesheet" href="/css/vendor/glide.core.min.css" />
@endsection

@section('js_vendor')
    <script src="/js/vendor/glide.min.js"></script>
    <script src="/js/vendor/jquery.barrating.min.js"></script>
@endsection

@section('js_page')
    <script src="/js/cs/glide.custom.js"></script>
    <script src="/js/pages/articles.js"></script>
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
            <div class="col-xl-8 mb-5">
                <h2 class="small-title">Popular</h2>
                <div class="card">
                    <a href="/Articles/Detail">
                        <img
                                src="/img/blog/large/blog-1.webp"
                                class="card-img-top sh-40 theme-filter"
                                alt="card image"
                        />
                    </a>
                    <div class="card-body">
                        <h4 class="mb-2 pb-1">
                            <a href="/Articles/Detail">Obesity Made Even Mild Covid Worse</a>
                        </h4>
                        <p class="text-alternate sh-8 clamp-line mb-0" data-line="3">
                            Jelly carrot cake lollipop carrot cake pudding cake gingerbread biscuit. Caramels lemon drops candy canes lollipop marzipan icing wafer.
                            Lollipop jujubes donut lollipop candy canes bear claw chocolate cake shortbread jelly. Halvah tiramisu sweet donut tart tart. Lemon drops
                            brownie gummies chocolate cake jelly shortbread. Carrot cake toffee sugar plum candy canes liquorice sweet roll oat cake soufflé bonbon.
                        </p>
                    </div>
                    <div class="card-footer border-0 pt-0">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="d-flex align-items-center">
                                    <div class="sw-5 d-inline-block position-relative me-3">
                                        <a href="/Doctors/Detail">
                                            <img src="/img/profile/profile-15.webp" class="img-fluid rounded-xl" alt="thumb" />
                                        </a>
                                    </div>
                                    <div class="d-inline-block">
                                        <a href="/Doctors/Detail">Trent Dawson, M.D.</a>
                                        <div class="text-muted text-small">Neurologist</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 text-muted">
                                <div class="row g-0 justify-content-end">
                                    <div class="col-auto pe-3">
                                        <i data-acorn-icon="eye" class="text-primary me-1" data-acorn-size="15"></i>
                                        <span class="align-middle">145</span>
                                    </div>
                                    <div class="col-auto">
                                        <i data-acorn-icon="message" class="text-primary me-1" data-acorn-size="15"></i>
                                        <span class="align-middle">12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 mb-5">
                <h2 class="small-title">Newest</h2>
                <div class="card mb-2 sh-11 sh-sm-13">
                    <div class="row g-0 h-100">
                        <div class="col-auto">
                            <img
                                    src="/img/blog/small/blog-3.webp"
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
                <div class="card mb-2 sh-11 sh-sm-13">
                    <div class="row g-0 h-100">
                        <div class="col-auto">
                            <img
                                    src="/img/blog/small/blog-4.webp"
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
                <div class="card mb-2 sh-11 sh-sm-13">
                    <div class="row g-0 h-100">
                        <div class="col-auto">
                            <img
                                    src="/img/blog/small/blog-5.webp"
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
                <div class="card mb-2 sh-11 sh-sm-13">
                    <div class="row g-0 h-100">
                        <div class="col-auto">
                            <img
                                    src="/img/blog/small/blog-6.webp"
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
                <div class="card sh-11 sh-sm-13">
                    <div class="row g-0 h-100">
                        <div class="col-auto">
                            <img
                                    src="/img/blog/small/blog-7.webp"
                                    alt="alternate text"
                                    class="card-img card-img-horizontal sw-10 sw-sm-14"
                            />
                        </div>
                        <div class="col position-static">
                            <div class="card-body d-flex flex-column pt-0 pb-0 h-100 justify-content-center">
                                <div class="d-flex flex-column">
                                    <a href="/Articles/Detail" class="stretched-link body-link">
                                        <div class="clamp-line" data-line="2">More Physicians Are Now Employees Rather Than Owners</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Categories Start -->
        <h2 class="small-title">Categories</h2>
        <div class="row gx-2">
            <div class="col-12">
                <div class="glide" id="glideCenter">
                    <div class="glide__track" data-glide-el="track">
                        <div class="glide__slides">
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="brain" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Cardiology</p>
                                        <div class="text-extra-small fw-medium text-muted">3 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="stomach" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Gastroenterology</p>
                                        <div class="text-extra-small fw-medium text-muted">5 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="gynecology" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Gynecology</p>
                                        <div class="text-extra-small fw-medium text-muted">2 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="laboratory" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Haematology</p>
                                        <div class="text-extra-small fw-medium text-muted">4 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="dna" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Microbiology</p>
                                        <div class="text-extra-small fw-medium text-muted">2 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                            <div class="glide__slide">
                                <div class="card h-100 hover-scale-up mb-5">
                                    <a class="card-body text-center d-flex flex-column align-items-center" href="#">
                                        <div class="sw-8 sh-8 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                            <i data-acorn-icon="urinary" class="text-primary"></i>
                                        </div>
                                        <p class="heading mt-3 text-body">Nephrology</p>
                                        <div class="text-extra-small fw-medium text-muted">6 DOCTORS</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Categories End -->

        <!-- Quick Reads Start -->
        <h2 class="small-title">Quick Reads</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-xxl-4 g-2">
            <div class="col">
                <div class="card h-100">
                    <img
                            src="/img/blog/small/blog-2.webp"
                            class="card-img-top sh-17"
                            alt="card image"
                    />
                    <div class="card-body">
                        <h5 class="heading mb-3">
                            <a href="/Articles/Detail" class="body-link stretched-link">
                                <span class="clamp-line sh-5" data-line="2">Thousands of devices measure BP. Know which ones to trust</span>
                            </a>
                        </h5>
                        <div>
                            <i data-acorn-icon="clock" class="text-primary me-1" data-acorn-size="15"></i>
                            <span class="align-middle">10 Min</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <img
                            src="/img/blog/small/blog-3.webp"
                            class="card-img-top sh-17"
                            alt="card image"
                    />
                    <div class="card-body">
                        <h5 class="heading mb-3">
                            <a href="/Articles/Detail" class="body-link stretched-link">
                                <span class="clamp-line sh-5" data-line="2">COVID-19 CPT coding and guidance</span>
                            </a>
                        </h5>
                        <div>
                            <i data-acorn-icon="clock" class="text-primary me-1" data-acorn-size="15"></i>
                            <span class="align-middle">15 Min</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <img
                            src="/img/blog/small/blog-6.webp"
                            class="card-img-top sh-17"
                            alt="card image"
                    />
                    <div class="card-body">
                        <h5 class="heading mb-3">
                            <a href="/Articles/Detail" class="body-link stretched-link">
                                <span class="clamp-line sh-5" data-line="2">US football coach fired for refusing vaccine</span>
                            </a>
                        </h5>
                        <div>
                            <i data-acorn-icon="clock" class="text-primary me-1" data-acorn-size="15"></i>
                            <span class="align-middle">15 Min</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <img
                            src="/img/blog/small/blog-5.webp"
                            class="card-img-top sh-17"
                            alt="card image"
                    />
                    <div class="card-body">
                        <h5 class="heading mb-3">
                            <a href="/Articles/Detail" class="body-link stretched-link">
                                <span class="clamp-line sh-5" data-line="2">Ex-pupil begins legal action over infected blood</span>
                            </a>
                        </h5>
                        <div>
                            <i data-acorn-icon="clock" class="text-primary me-1" data-acorn-size="15"></i>
                            <span class="align-middle">25 Min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Quick Reads End -->
    </div>
@endsection
