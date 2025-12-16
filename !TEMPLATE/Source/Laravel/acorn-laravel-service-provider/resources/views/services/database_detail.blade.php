@php
    $html_tag_data = [];
    $title = 'Database Detail';
    $description= 'Service Provider Database Detail';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
    <script src="/js/vendor/moment-with-locales.min.js"></script>
    <script src="/js/vendor/Chart.bundle.min.js"></script>
    <script src="/js/vendor/chartjs-plugin-crosshair.js"></script>
    <script src="/js/vendor/chartjs-plugin-datalabels.js"></script>
    <script src="/js/vendor/chartjs-plugin-streaming.min.js"></script>
    <script src="/js/cs/responsivetab.js"></script>
@endsection

@section('js_page')
    <script src="/js/cs/charts.extend.js"></script>
    <script src="/js/pages/services.databasedetail.js"></script>
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

                <!-- Top Buttons Start -->
                <div class="col-12 col-sm-auto d-flex align-items-center justify-content-end">
                    <!-- Add New Button Start -->
                    <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start w-100 w-md-auto">
                        <i data-acorn-icon="code"></i>
                        <span>Connect</span>
                    </button>
                    <!-- Add New Button End -->
                </div>
                <!-- Top Buttons End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <div class="row">
            <div class="col-xl-4">
                <!-- Info Start -->
                <h2 class="small-title">Info</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="row g-0 align-items-center mb-4">
                            <div class="col-auto">
                                <div class="bg-gradient-light sw-5 sh-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="antenna" class="text-white"></i>
                                </div>
                            </div>
                            <div class="col ps-3">
                                <div class="text-small text-muted">IP</div>
                                <div>324.522.34.02</div>
                            </div>
                        </div>
                        <div class="row g-0 align-items-center mb-4">
                            <div class="col-auto">
                                <div class="bg-gradient-light sw-5 sh-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="pin" class="text-white"></i>
                                </div>
                            </div>
                            <div class="col ps-3">
                                <div class="text-small text-muted">LOCATION</div>
                                <div>West US</div>
                            </div>
                        </div>
                        <div class="row g-0 align-items-center mb-4">
                            <div class="col-auto">
                                <div class="bg-gradient-light sw-5 sh-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="database" class="text-white"></i>
                                </div>
                            </div>
                            <div class="col ps-3">
                                <div class="text-small text-muted">ENGINE</div>
                                <div>Mongodb</div>
                            </div>
                        </div>
                        <div class="row g-0 align-items-center">
                            <div class="col-auto">
                                <div class="bg-gradient-light sw-5 sh-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <i data-acorn-icon="user" class="text-white"></i>
                                </div>
                            </div>
                            <div class="col ps-3">
                                <div class="text-small text-muted">USERS</div>
                                <div>5</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Info End -->

                <!-- Credentials Start -->
                <h2 class="small-title">Credentials</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <p>Tootsie roll sweet roll pudding. Pastry liquorice wafer sweet. Chocolate bar jelly sugar plum cake sesame snaps gummies lollipop.</p>
                        <button class="btn btn-outline-primary btn-icon btn-icon-end">
                            <span>Show</span>
                            <i data-acorn-icon="lock-off"></i>
                        </button>
                    </div>
                </div>
                <!-- Credentials End -->
            </div>

            <div class="col-xl-8">
                <!-- Tab Nav Start -->
                <ul class="nav nav-tabs nav-tabs-title nav-tabs-line-title responsive-tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#tabContent" aria-selected="true" role="tab">Performance</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tabContent" aria-selected="false" role="tab">Logs</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tabContent" aria-selected="false" role="tab">Security</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" data-bs-toggle="tab" href="#tabContent" aria-selected="false" role="tab">Scale</a>
                    </li>
                    <li class="nav-item dropdown ms-auto d-none responsive-tab-dropdown">
                        <a class="btn btn-icon btn-icon-only btn-background pt-0" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i data-acorn-icon="more-horizontal"></i>
                        </a>
                        <ul class="dropdown-menu mt-2 dropdown-menu-end"></ul>
                    </li>
                </ul>
                <!-- Tab Nav End -->

                <!-- Performance Start -->
                <div class="tab-pane fade active show" id="tabContent" role="tabpanel">
                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="mb-5">
                                <div class="heading mb-4">Bandwidth</div>
                                <div class="sh-35">
                                    <canvas id="streamingDbChartFirst"></canvas>
                                </div>
                            </div>
                            <div class="mb-5">
                                <div class="heading mb-4">Cpu</div>
                                <div class="sh-35">
                                    <canvas id="streamingDbChartSecond"></canvas>
                                </div>
                            </div>
                            <div>
                                <div class="heading mb-4">Disk</div>
                                <div class="sh-35">
                                    <canvas id="streamingDbChartThird"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Performance End -->
            </div>
        </div>
    </div>
@endsection
