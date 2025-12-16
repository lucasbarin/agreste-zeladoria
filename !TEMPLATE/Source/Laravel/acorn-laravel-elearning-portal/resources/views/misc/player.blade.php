@php
    $html_tag_data = [];
    $title = 'Player';
    $description= 'Acorn elearning platform player.';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description,])

@section('css')
    <link rel="stylesheet" href="/css/vendor/plyr.css"/>
@endsection

@section('js_vendor')
    <script src="/js/vendor/plyr.min.js"></script>
    <script src="/js/vendor/movecontent.js"></script>
@endsection

@section('js_page')
    <script src="/js/pages/misc.player.js"></script>
@endsection

@section('content')
    <div class="container d-flex flex-column">
        <!-- Title and Top Buttons Start -->
        <div class="page-title-container">
            <div class="row">
                <!-- Title Start -->
                <div class="col-12 col-sm-6">
                    <h1 class="mb-0 pb-0 display-4" id="title">{{ $title }}</h1>
                    <nav class="breadcrumb-container d-inline-block" aria-label="breadcrumb">
                        <ul class="breadcrumb pt-0">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                        </ul>
                    </nav>
                </div>
                <!-- Title End -->

                <!-- Top Buttons Start -->
                <div class="col-12 col-sm-6 d-flex align-items-start justify-content-end">
                    <!-- Contents Button Start -->
                    <button
                            type="button"
                            class="btn btn-outline-primary btn-icon btn-icon-start w-100 w-sm-auto d-inline-block d-xl-none"
                            data-bs-toggle="modal"
                            data-bs-target="#tableOfContentsModal"
                    >
                        <i data-acorn-icon="menu-right"></i>
                        <span>Contents</span>
                    </button>
                    <!-- Contents Button End -->
                </div>
                <!-- Top Buttons End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <!-- Content Start -->
        <div class="row d-flex flex-grow-1 overflow-hidden pb-2 h-100">
            <!-- Player Start -->
            <div class="col-xl-8 col-xxl-9">
                <div class="card mb-5 h-100 bg-transparent">
                    <video class="cover player" poster="/img/course/large/course-1.webp">
                        <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <!-- Player End -->

            <div class="d-none d-xl-flex col-xl-4 col-xxl-3 h-100 scroll-out table-of-contents-scroll" id="tableOfContentsColumn">
                <!-- Content of this will be moved from #tableOfContentsMoveContent div based on the responsive breakpoint.  -->
            </div>
        </div>

        <div class="modal modal-right fade" id="tableOfContentsModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Content</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-0">
                        <!-- Content of below will be moved to #tableOfContentsColumn or back in here based on the data-move-breakpoint attribute below -->
                        <!-- Content will be here if the screen size is smaller than xl -->
                        <div id="tableOfContentsMoveContent" data-move-target="#tableOfContentsColumn" data-move-breakpoint="xl">
                            <!-- Table of Contents Start -->
                            <div id="courseContent">
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    1
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">Introduction to Bread Making</div>
                                            </div>
                                        </div>
                                        <div id="collapseOne" class="accordion-collapse collapse show ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-primary sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading">1. Candy cake gummi bears</a>
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
                                                        <div class="bg-primary sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading">2. Brownie candy biscuit chupa chups</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">3. Cotton candy caramels icing</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">4. Brownie candy biscuit chupa chups</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">5. Marshmallow liquorice cake liquorice</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">6. Pudding pastry icing</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">7. Biscuit halvah muffin dragée</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">8. Halvah cheesecake tootsie</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    2
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">Molding Techniques</div>
                                            </div>
                                        </div>
                                        <div id="collapseTwo" class="accordion-collapse collapse ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">1. Gummi bears dessert muffin pie</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">2. Tiramisu lemon drops tootsie roll macaroon halvah bear claw</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">3. Pie gingerbread marzipan jujubes</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">4. Pudding pastry icing</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">5. Macaroon fruitcake sugar plum</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">6. Sugar plum pudding brownie</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">7. Tart gummies topping biscuit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    3
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">Baking the Right Way</div>
                                            </div>
                                        </div>
                                        <div id="collapseThree" class="accordion-collapse collapse ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">1. Gummi bears dessert muffin pie</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">2. Tiramisu lemon drops tootsie roll macaroon halvah bear claw</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">3. Pie gingerbread marzipan jujubes</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">4. Pudding pastry icing</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">5. Macaroon fruitcake sugar plum</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    4
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">Presentation</div>
                                            </div>
                                        </div>
                                        <div id="collapseFour" class="accordion-collapse collapse ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">1. Lemon drops wafer brownie pastry</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">2. Bonbon candy canes oat cake</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">3. Tart marshmallow macaroon soufflé</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    5
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">Conclusion</div>
                                            </div>
                                        </div>
                                        <div id="collapseFive" class="accordion-collapse collapse ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">1. Danish cake gummies jelly oat cake</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">2. Chocolate bar chocolate bar tart cotton candy</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">3. Lemon drops jelly lemon drops</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mb-2">
                                    <div class="card-body">
                                        <div
                                                class="d-flex flex-row align-content-center align-items-center cursor-pointer"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                        >
                                            <div class="sw-4 me-3">
                                                <div class="border border-1 border-primary rounded-xl sw-4 sh-4 text-primary d-flex justify-content-center align-items-center">
                                                    6
                                                </div>
                                            </div>
                                            <div>
                                                <div class="heading mb-0">What is Next?</div>
                                            </div>
                                        </div>
                                        <div id="collapseSix" class="accordion-collapse collapse ms-2 ps-1" data-bs-parent="#courseContent">
                                            <div class="row g-0 mt-4">
                                                <div class="col-auto sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                                                    <div class="w-100 d-flex sh-1"></div>
                                                    <div class="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative">
                                                        <div class="line-w-1 bg-separator h-100 position-absolute"></div>
                                                    </div>
                                                </div>
                                                <div class="col mb-2">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">1. Danish cake gummies jelly oat cake</a>
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
                                                        <div class="bg-muted sw-1 sh-1 rounded-xl position-relative"></div>
                                                    </div>
                                                    <div class="w-100 d-flex h-100 justify-content-center position-relative"></div>
                                                </div>
                                                <div class="col mb-0">
                                                    <div class="h-100">
                                                        <div class="d-flex flex-column justify-content-start">
                                                            <div class="d-flex flex-column">
                                                                <a href="#" class="heading muted-link">2. Sweet roll candy muffin chocolate</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Table of Contents End -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content End -->
    </div>
@endsection
