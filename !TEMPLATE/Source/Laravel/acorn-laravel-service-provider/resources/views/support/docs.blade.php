@php
    $html_tag_data = [];
    $title = 'Docs';
    $description= 'Service Provider Docs';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
    <link rel="stylesheet" href="/css/vendor/plyr.css"/>
@endsection

@section('js_vendor')
    <script src="/js/vendor/plyr.min.js"></script>
    <script src="/js/vendor/masonry.pkgd.min.js"></script>
@endsection

@section('js_page')
    <script src="/js/pages/support.docs.js"></script>
@endsection

@section('content')
    <div class="col">
        <!-- Title and Top Buttons Start -->
        <div class="page-title-container mb-3">
            <div class="row">
                <!-- Title Start -->
                <div class="col mb-2">
                    <h1 class="mb-2 pb-0 display-4" id="title">{{ $title }}</h1>
                    <div class="text-muted font-heading text-small">Let us manage the database engines for your applications so you can focus on building.</div>
                </div>
                <!-- Title End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <div class="row">
            <!-- Access Token Start -->
            <div class="col-12 col-lg-4 mb-5">
                <h2 class="small-title">Access Token</h2>
                <div class="card">
                    <div class="card-body sh-45 d-flex align-items-center justify-content-center">
                        <div class="text-center">
                            <img src="/img/illustration/access-token.webp" class="theme-filter" alt="access" />
                            <div class="cta-3">No access token!</div>
                            <div class="cta-5 text-primary mb-4">Would you like to create one?</div>
                            <a href="/Support/DocsDetail" class="btn btn-primary">CREATE TOKEN</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Access Token End -->

            <!-- Quick Introduction Start -->
            <div class="col-12 col-lg-8 mb-5">
                <h2 class="small-title">Quick Introduction</h2>
                <div class="card sh-45 bg-transparent theme-filter-player">
                    <video class="player cover" poster="/img/video/video-large.webp">
                        <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <!-- Quick Introduction End -->
        </div>

        <!-- Api Reference Start -->
        <div class="row mb-5">
            <div class="col-12">
                <h2 class="small-title">Api Reference</h2>
                <div class="card">
                    <div class="card-body">
                        <div class="row row-cols-2 row-cols-xl-3 gy-5" id="apiReferenceMasonry">
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="layout-1" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">App</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Chocolate cake marshmallow</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Sesame candy halvah marshmallow</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Muffin cheesecake sesame snaps</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Chupa chups pastry</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Lemon drops</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4 d-flex flex-shrink-0"></div>
                                        <div>Jelly sesame snaps marshmallow lollipop chupa chups</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Lemon candy chocolate bar</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="lock-off" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Auth</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Macaroon cookie croissant</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Apple pie</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Wafer carrot cake</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Tootsie roll sweet</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Donut powder gummi bears</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Tootsie roll sweet</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="chart-3" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Analytics</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gingerbread chocolate</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Apple pie</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Wafer carrot cake</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Liquorice lemon dragée</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="play" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Build</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Dragée bear claw halvah</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Chocolate cotton candy</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="cpu" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Compute</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gingerbread chocolate</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Jelly beans</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Toffee jelly-o carrot</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Oat cake gummies</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Cake gummies</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="server" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Database</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Chocolate apple pie</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Brownie topping</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Jelly powder caramels</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gingerbread</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Liquorice macaroon toffee jelly</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Dragée bear claw</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gummies dessert oat cake</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Macaroon toffee jelly tiramisu</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="code" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Functions</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Bonbon sweet roll</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Cookie candy croissant</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Bonbon dragée</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Plum chupa chups</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Donut powder gummi bears</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="login" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Integration</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Caramels sweet roll</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Sesame snaps</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gummi bears wafer brownie</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="category" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Migration</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Caramels tiramisu cotton candy</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Brownie jelly-o carrot</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Tiramisu marshmallow</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="activity" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Performance</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Pudding tootsie roll carrot</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Brownie cupcake</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="shield" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Security</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Marshmallow gummi bears</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Topping bonbon</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Oat cake fruitcake dessert</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Dessert lemon drops topping</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Pudding tootsie roll</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="archive" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Storage</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Pastry liquorice wafer sweet</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Gummi bears</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Candy canes jelly beans</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Cheesecake bear claw liquorice</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Brownie jelly-o carrot cake</div>
                                    </a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card no-shadow">
                                    <a href="#" class="d-flex flex-row mb-2">
                                        <div class="sw-4">
                                            <i data-acorn-icon="tool" class="text-primary align-middle" data-acorn-size="17"></i>
                                        </div>
                                        <div class="h5 text-primary lh-1-5">Tools</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Biscuit chocolate bar</div>
                                    </a>
                                    <a href="/Support/DocsDetail" class="d-flex flex-row mb-2 alternate-link">
                                        <div class="sw-4"></div>
                                        <div>Sugar plum cookie cake</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Api Reference End -->

        <!-- Get Help Start -->
        <h2 class="small-title">Get Help</h2>
        <div class="row row-cols-1 row-cols-xl-2 row-cols-xxl-4 g-2">
            <div class="col">
                <div class="card mb-2 h-100">
                    <div class="card-body row g-0">
                        <div class="col-12">
                            <div class="cta-3">Stuck somewhere?</div>
                            <div class="mb-3 cta-3 text-primary">Examples are available!</div>
                            <div class="text-muted mb-4">Cheesecake chocolate carrot cake pie lollipop lemon toffee lollipop. Oat cake pie cake cotton.</div>
                            <a href="/Support/DocsDetail" class="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                                <i data-acorn-icon="handbag"></i>
                                <span>Examples</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card mb-2 h-100">
                    <div class="card-body row g-0">
                        <div class="col-12">
                            <div class="cta-3">Have a specific issue?</div>
                            <div class="mb-3 cta-3 text-primary">Check the forums!</div>
                            <div class="text-muted mb-4">Cheesecake chocolate carrot cake pie lollipop lemon toffee lollipop. Oat cake pie cake cotton.</div>
                            <a href="/Community" class="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                                <i data-acorn-icon="user"></i>
                                <span>Forums</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card mb-2 h-100">
                    <div class="card-body row g-0">
                        <div class="col-12">
                            <div class="cta-3">Want to extend?</div>
                            <div class="mb-3 cta-3 text-primary">Explore knowledge base!</div>
                            <div class="text-muted mb-4">
                                Cheesecake chocolate carrot cake pie lollipop lemon toffee lollipop lemon toffee lollipop. Oat cake pie cake cotton.
                            </div>
                            <a href="/Support/KnowledgeBase" class="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                                <i data-acorn-icon="help"></i>
                                <span>Knowledge Base</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card mb-2 h-100">
                    <div class="card-body row g-0">
                        <div class="col-12">
                            <div class="cta-3">Still no luck?</div>
                            <div class="mb-3 cta-3 text-primary">Submit a Ticket!</div>
                            <div class="text-muted mb-4">Cheesecake chocolate carrot cake pie lollipop lemon toffee lollipop. Oat cake pie cake cotton.</div>
                            <a href="/Support/Tickets" class="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                                <i data-acorn-icon="send"></i>
                                <span>Tickets</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Get Help End -->
    </div>
@endsection
