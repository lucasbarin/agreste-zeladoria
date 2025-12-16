@php
    $html_tag_data = [];
    $title = 'Security';
    $description= 'Service Provider Security';
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

        <!-- Secure Your Account Start -->
        <h2 class="small-title">Secure Your Account</h2>
        <div class="mb-5">
            <div class="row row-cols-1 row-cols-xl-2 g-2">
                <div class="col">
                    <div class="card">
          <span class="badge rounded-pill bg-outline-primary me-1 position-absolute s-3 t-3 z-index-1">
            <i data-acorn-icon="check" data-acorn-size="15"></i>
          </span>
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-email.webp" class="theme-filter" alt="email icon" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading mb-2 d-inline-block">Secondary Email Address</a>
                                    <p>
                                        <span class="text-small text-muted">ACTIVE ADDRESS</span>
                                        <br />
                                        joissekaycee@gmail.com
                                    </p>
                                    <a href="#" class="btn btn-icon btn-icon-start btn-outline-primary mt-1">
                                        <i data-acorn-icon="edit-square"></i>
                                        <span>Edit</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
          <span class="badge rounded-pill bg-outline-primary me-1 position-absolute s-3 t-3 z-index-1">
            <i data-acorn-icon="check" data-acorn-size="15"></i>
          </span>
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/access-token.webp" class="theme-filter" alt="access token" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading mb-2 d-inline-block">Two-factor Authentication</a>
                                    <p>
                                        <span class="text-small text-muted">ACTIVE NUMBER</span>
                                        <br />
                                        +644 388 44 55
                                    </p>
                                    <a href="#" class="btn btn-icon btn-icon-start btn-outline-primary mt-1">
                                        <i data-acorn-icon="edit-square"></i>
                                        <span>Edit</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
          <span class="badge rounded-pill bg-outline-separator me-1 position-absolute s-3 t-3 z-index-1">
            <i data-acorn-icon="check" data-acorn-size="15"></i>
          </span>
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-accounts.webp" class="theme-filter" alt="accounts" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading mb-2 d-inline-block">Security Questions</a>
                                    <p>Caramels sesame snaps apple pie fruitcake cheesecake topping lemon drops gummi bears icing.</p>
                                    <a href="#" class="btn btn-icon btn-icon-start btn-outline-primary mt-1">
                                        <i data-acorn-icon="chevron-right"></i>
                                        <span>Enable</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
          <span class="badge rounded-pill bg-outline-separator me-1 position-absolute s-3 t-3 z-index-1">
            <i data-acorn-icon="check" data-acorn-size="15"></i>
          </span>
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-12 col-sm-auto pe-4 d-flex justify-content-center">
                                    <img src="/img/illustration/icon-phone.webp" class="theme-filter" alt="phone" />
                                </div>
                                <div class="col-12 col-sm">
                                    <a href="#" class="heading mb-2 d-inline-block">Sign in via Phone</a>
                                    <p>Soufflé oat cake tiramisu cake lollipop jelly. Chocolate chupa chups liquorice.</p>
                                    <a href="#" class="btn btn-icon btn-icon-start btn-outline-primary mt-1">
                                        <i data-acorn-icon="chevron-right"></i>
                                        <span>Enable</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Secure Your Account End -->

        <!-- Security Logs Start -->
        <h2 class="small-title">Security Logs</h2>
        <div class="card">
            <div class="card-body">
                <div class="mb-2 bg-transparent no-shadow d-none d-md-block g-0 sh-3">
                    <div class="row g-0 h-100 align-content-center">
                        <div class="col-12 col-md-5 d-flex align-items-center mb-2 mb-md-0 text-muted text-small">TITLE</div>
                        <div class="col-6 col-md-3 d-flex align-items-center text-alternate text-medium text-muted text-small">IP</div>
                        <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">TIME</div>
                        <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium justify-content-end text-muted text-small">ACTION</div>
                    </div>
                </div>
                <div class="mb-5 border-last-none">
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Password Change</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">241.157.15.24</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">21.03.2021 - 16:10</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">View Invoice</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">211.562.0.184</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">21.03.2021 - 15:42</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Logouıt</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">195.234.11.94</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">20.03.2021 - 10:22</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Verification Code Sent</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">195.234.11.94</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">18.03.2021 - 12:50</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Password Change</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">195.234.11.94</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">07.02.2021 - 11:10</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">New Database</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">153.205.03.11</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">06.02.2021 - 09:25</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Secondary Email Enable</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">241.157.15.24</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">05.02.2021 - 17:53</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Login</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">241.157.15.02</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">28.01.2021 - 19:11</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Logout</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">241.157.15.24</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">27.01.2021 - 08:27</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="h-100 sh-md-4 border-bottom border-separator-light pb-3 mb-3">
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-11 col-md-5 d-flex flex-column justify-content-center mb-2 mb-md-0 order-0">
                                <div class="text-muted text-small d-md-none">Title</div>
                                <div class="text-alternate">Api Key Generated</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-2">
                                <div class="text-muted text-small d-md-none">Ip</div>
                                <div class="text-alternate">241.157.15.24</div>
                            </div>
                            <div class="col-12 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3">
                                <div class="text-muted text-small d-md-none">Time</div>
                                <div class="text-alternate">26.01.2021 - 12:40</div>
                            </div>
                            <div class="col-1 d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-1 order-md-4">
                                <a class="link" href="#">
                                    <i data-acorn-icon="more-horizontal"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul class="pagination justify-content-center mb-0 semibordered">
                        <li class="page-item">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                <i data-acorn-icon="chevron-left"></i>
                            </a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                <i data-acorn-icon="chevron-right"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- Security Logs End -->
    </div>
@endsection
