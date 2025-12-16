@php
    $html_tag_data = [];
    $title = 'Upgrade';
    $description= 'Service Provider Upgrade';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
@endsection

@section('js_page')
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

        <!-- Prices Start -->
        <div class="mb-5">
            <div class="row row-cols-1 row-cols-xl-3 g-2">
                <div class="col">
                    <div class="card h-100 hover-scale-up">
                        <div class="card-body pb-0">
                            <div class="d-flex flex-column align-items-center mb-4">
                                <div class="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                                    <i data-acorn-icon="building-small" class="text-white"></i>
                                </div>
                                <div class="cta-4 text-primary mb-1">Developer</div>
                                <div class="text-muted sh-3"></div>
                                <div class="display-4">$ 3.50</div>
                                <div class="text-small text-muted mb-1">User/Month</div>
                            </div>
                            <p class="text-alternate mb-4">
                                Jelly-o jelly oat cake cheesecake halvah. Cupcake sweet roll donut. Sesame snaps lollipop macaroon. Icing tiramisu oat cake pudding
                                danish gummies.
                            </p>
                        </div>
                        <div class="card-footer pt-0 border-0">
                            <div class="mb-4">
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="user" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Single user</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="help" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Forum support</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="clipboard" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Access to library</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="database" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">1 GB disk space</div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-icon btn-icon-start btn-foreground hover-outline stretched-link">
                                    <i data-acorn-icon="chevron-right"></i>
                                    <span>Upgrade</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 hover-scale-up">
                        <div class="card-body pb-0">
                            <span class="badge rounded-pill bg-primary me-1 position-absolute e-n2 t-2 z-index-1">SALE</span>
                            <div class="d-flex flex-column align-items-center mb-4">
                                <div class="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                                    <i data-acorn-icon="building" class="text-white"></i>
                                </div>
                                <div class="cta-4 text-primary mb-1">Team</div>
                                <div class="text-muted sh-3 line-through">$ 10.50</div>
                                <div class="display-4">
                                    <span>$ 7.25</span>
                                </div>
                                <div class="text-small text-muted mb-1">User/Month</div>
                            </div>
                            <p class="text-alternate mb-4">Wafer halvah chocolate soufflé icing. Cotton candy danish lollipop jelly-o candy caramels.</p>
                        </div>
                        <div class="card-footer pt-0 border-0">
                            <div class="mb-4">
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="user" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Up to 5 users</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="help" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Forum support</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="clipboard" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Access to library</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="database" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">5 GB disk space</div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-icon btn-icon-start btn-foreground hover-outline stretched-link">
                                    <i data-acorn-icon="chevron-right"></i>
                                    <span>Upgrade</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 hover-scale-up">
                        <div class="card-body pb-0">
                            <div class="d-flex flex-column align-items-center mb-4">
                                <div class="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                                    <i data-acorn-icon="building-large" class="text-white"></i>
                                </div>
                                <div class="cta-4 text-primary mb-3">Company</div>
                                <div class="text-muted sh-3"></div>
                                <div class="display-4">$ 12.75</div>
                                <div class="text-small text-muted mb-1">User/Month</div>
                            </div>
                            <p class="text-alternate mb-4">
                                Danish brownie chocolate bar lollipop cookie tootsie roll candy canes. Jujubes lollipop cheesecake gummi bears cheesecake.
                            </p>
                        </div>
                        <div class="card-footer pt-0 border-0">
                            <div class="mb-4">
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="user" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Up to 50 users</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="support" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Direct support</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="clipboard" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">Access to library</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i class="d-inline-block text-primary align-top" data-acorn-icon="database" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col lh-1-25 text-alternate">50 GB disk space</div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-icon btn-icon-start btn-foreground hover-outline stretched-link">
                                    <i data-acorn-icon="chevron-right"></i>
                                    <span>Upgrade</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Prices End -->

        <!-- Features Start -->
        <div class="mb-5">
            <h2 class="small-title">Features</h2>
            <div class="row row-cols-1 row-cols-xl-2 g-2">
                <div class="col mb-2">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-performance.webp" class="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="performance" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading stretched-link mb-2 d-inline-block">High Availability</a>
                                    <p>Caramels sesame snaps apple pie fruitcake cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-configure.webp" class="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="configure" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading stretched-link mb-2 d-inline-block">Resource Efficiency</a>
                                    <p>Sesame lemon drops snaps apple bonbon tootsie pie fruitcake cheesecake topping lemon drops gummi bears icing topping.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-database.webp" class="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="database" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading stretched-link mb-2 d-inline-block">Easy Scalability</a>
                                    <p>Cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie. Pie gummies pie fruitcake dessert powder.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-experiment.webp" class="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="experiment" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading stretched-link mb-2 d-inline-block">Streamline Operations</a>
                                    <p>Apple pie fruitcake cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Features End -->

        <!-- Compare Start -->
        <div>
            <h2 class="small-title">Compare</h2>
            <div class="row g-2">
                <div class="col-3 d-none d-xl-block">
                    <div class="card no-shadow bg-transparent">
                        <div class="card-body px-0">
                            <div class="h-auto sh-xl-8 mb-3 mb-xl-0"></div>
                            <ul class="list-unstyled">
                                <li class="mb-5">Cookie bonbon</li>
                                <li class="mb-5">Lemon drops</li>
                                <li class="mb-5">Tootsie roll</li>
                                <li class="mb-5">Marshmallow lollipop</li>
                                <li class="mb-5">Carrot cake</li>
                                <li class="mb-5">Soufflé cheesecake</li>
                                <li class="mb-5">Muffin cheesecake sesame</li>
                                <li class="mb-5">Sweet sugar plum wafer</li>
                                <li class="mb-5">Jelly beans</li>
                                <li class="mb-5">Marshmallow tootsie</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-3">
                    <div class="card">
                        <div class="card-body text-xl-center">
                            <div class="h-auto sh-xl-8 mb-3 mb-xl-0">
                                <div class="heading text-primary mb-0">Developer</div>
                            </div>
                            <ul class="list-unstyled mb-n4 mb-xl-n5">
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>
                                    5 Users
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                                    Up to 5 GB
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>
                                    2 Cores
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-3">
                    <div class="card">
                        <div class="card-body text-xl-center">
                            <div class="h-auto sh-xl-8 mb-3 mb-xl-0">
                                <div class="heading text-primary">Team</div>
                            </div>
                            <ul class="list-unstyled mb-n4 mb-xl-n5">
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>
                                    50 Users
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                                    Up to 50 GB
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>
                                    8 Cores
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-separator"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-3">
                    <div class="card">
                        <div class="card-body text-xl-center">
                            <div class="h-auto sh-xl-8 mb-3 mb-xl-0">
                                <div class="heading text-primary">Company</div>
                            </div>
                            <ul class="list-unstyled mb-n4 mb-xl-n5">
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>
                                    50+ Users
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                                    Unlimited
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>
                                    16 Cores
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                                <li class="mb-4 mb-xl-5">
                                    <div class="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                                    <i data-acorn-icon="check-square" data-acorn-size="15" class="text-alternate"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Compare End -->
    </div>
@endsection
