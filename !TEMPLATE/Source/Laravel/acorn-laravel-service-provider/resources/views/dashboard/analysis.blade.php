@php
    $html_tag_data = [];
    $title = 'Analysis';
    $description= 'Service Provider Settings'
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
    <script src="/js/vendor/moment-with-locales.min.js"></script>
    <script src="/js/vendor/Chart.bundle.min.js"></script>
    <script src="/js/vendor/chartjs-plugin-rounded-bar.min.js"></script>
    <script src="/js/vendor/chartjs-plugin-crosshair.js"></script>
    <script src="/js/vendor/chartjs-plugin-datalabels.js"></script>
    <script src="/js/vendor/chartjs-plugin-streaming.min.js"></script>
    <script src="/js/vendor/progressbar.min.js"></script>
@endsection

@section('js_page')
    <script src="/js/cs/charts.extend.js"></script>
    <script src="/js/pages/dashboard.analysis.js"></script>
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
                    <!-- Projects Button Start -->
                    <button
                            type="button"
                            class="btn btn-outline-primary w-100 w-md-auto dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                    >
                        All Projects
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#">
                            <span class="align-middle d-inline-block">Production Server</span>
                        </a>
                        <a class="dropdown-item" href="#">
                            <span class="align-middle d-inline-block">Mongo Sandbox</span>
                        </a>
                        <a class="dropdown-item" href="#">
                            <span class="align-middle d-inline-block">Public Storage</span>
                        </a>
                    </div>
                    <!-- ProjectsButton End -->
                </div>
                <!-- Top Buttons End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <!-- Stats Start -->
        <div class="mb-5">
            <h2 class="small-title">Stats</h2>
            <div class="row g-2">
                <div class="col-12 col-lg-6 col-xxl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                <span>Views</span>
                                <i data-acorn-icon="screen" class="text-primary"></i>
                            </div>
                            <div class="text-small text-success mb-1">
                                <i data-acorn-icon="arrow-top" class="me-1" data-acorn-size="13"></i>
                                <span class="text-medium">+18.4%</span>
                            </div>
                            <div class="cta-1 text-primary">1.325</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xxl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                <span>Conversations</span>
                                <i data-acorn-icon="cart" class="text-primary"></i>
                            </div>
                            <div class="text-small text-success mb-1">
                                <i data-acorn-icon="arrow-top" class="me-1" data-acorn-size="13"></i>
                                <span class="text-medium">+55.2%</span>
                            </div>
                            <div class="cta-1 text-primary">57</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xxl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                <span>Time(Seconds)</span>
                                <i data-acorn-icon="clock" class="text-primary"></i>
                            </div>
                            <div class="text-small text-danger mb-1">
                                <i data-acorn-icon="arrow-bottom" class="me-1" data-acorn-size="13"></i>
                                <span class="text-medium">-6.4%</span>
                            </div>
                            <div class="cta-1 text-primary">96</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xxl-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                                <span>Bounce</span>
                                <i data-acorn-icon="navigate-diagonal" class="text-primary"></i>
                            </div>
                            <div class="text-small text-success mb-1">
                                <i data-acorn-icon="arrow-top" class="me-1" data-acorn-size="13"></i>
                                <span class="text-medium">+3.9%</span>
                            </div>
                            <div class="cta-1 text-primary">48%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Stats End -->

        <!-- Charts Start -->
        <div class="row">
            <div class="col-12 col-xxl-6">
                <h2 class="small-title">CPU</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="sh-35">
                            <canvas id="streamingLineChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xxl-6">
                <h2 class="small-title">Memory</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="sh-35">
                            <canvas id="streamingBarChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Charts End -->

        <div class="row">
            <!-- Top Pages Start -->
            <div class="col-12 col-xxl-8 col-xl-6 mb-5">
                <h2 class="small-title">Top Pages</h2>
                <div class="scroll-out">
                    <div class="scroll-by-count" data-count="4">
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Interface.Components.Buttons.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">532</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Pages.Ecommerce.OrderList.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">522</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Interface.Plugins.Datatables.EditableRows.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">466</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Pages.Miscellaneous.KnowledgeBase.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">453</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Interface.Forms.Controls.DatePicker.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">443</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Interface.Plugins.Player.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">421</div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body py-0 sh-10 sh-md-8">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-9 d-flex align-items-center mb-2 mb-md-0">
                                        <a href="#" class="alternate-link text-truncate">/classic-dashboard/Pages.Portfolio.Detail.html</a>
                                    </div>
                                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-md-end text-medium">419</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Top Pages End -->

            <!-- Logs Start -->
            <div class="col-12 col-xxl-4 col-xl-6 mb-5">
                <div class="d-flex justify-content-between">
                    <h2 class="small-title">Logs</h2>
                    <button class="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small" type="button">
                        <span class="align-bottom">View More</span>
                        <i data-acorn-icon="chevron-right" class="align-middle" data-acorn-size="12"></i>
                    </button>
                </div>
                <div class="card sh-35 h-xl-100-card">
                    <div class="card-body mb-n2 scroll-out h-100">
                        <div class="scroll h-100">
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="play" class="text-success"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Power On</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="expand-diagonal-2" class="text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Resize</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="warning-hexagon" class="text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25"><a href="#" class="body-link underline-link">Disk Size Problem</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="power" class="text-danger"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Power Off</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="crosshair" class="text-tertiary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Snapshot</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="crosshair" class="text-tertiary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Snapshot</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="warning-hexagon" class="text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25"><a href="#" class="body-link underline-link">Disk Size Problem</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="play" class="text-success"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Power On</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="power" class="text-danger"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Power Off</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="category" class="text-secondary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Migrate</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-0 mb-2">
                                <div class="col-auto">
                                    <div class="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                        <div class="sh-3">
                                            <i data-acorn-icon="expand-diagonal-2" class="text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                                        <div class="d-flex flex-column">
                                            <div class="mt-n1 lh-1-25">Resize</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="sw-6 d-inline-block d-flex justify-content-end align-items-center h-100">
                                        <div class="text-muted mt-n1 lh-1-25">06:20</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Logs End -->
        </div>

        <!-- Diagnoses Start -->
        <div class="row mb-n5">
            <div class="col-12 col-xxl-auto mb-5">
                <h2 class="small-title">Diagnoses</h2>
                <div class="row g-2 h-100">
                    <div class="col-12 col-sm-4 col-xxl-auto">
                        <div class="card w-100 sw-xxl-19 h-100-card sh-xxl-22">
                            <div class="h-100 d-flex flex-column justify-content-between card-body align-items-center">
                                <div class="sw-8 sh-8 d-flex justify-content-center align-items-center">
                                    <div
                                            role="progressbar"
                                            class="progress-bar-circle position-relative text-muted text-small"
                                            data-trail-color=""
                                            aria-valuemax="100"
                                            aria-valuenow="99"
                                            data-show-percent="true"
                                            data-hide-all-text="false"
                                            data-stroke-width="3"
                                            data-trail-width="1"
                                            data-duration="0"
                                    ></div>
                                </div>
                                <div class="text-alternate text-center mb-0 sh-8 d-flex align-items-end lh-1-25">Database Uptime</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 col-xxl-auto">
                        <div class="card w-100 sw-xxl-19 h-100-card sh-xxl-22">
                            <div class="h-100 d-flex flex-column justify-content-between card-body align-items-center">
                                <div class="sw-8 sh-8 d-flex justify-content-center align-items-center">
                                    <div
                                            role="progressbar"
                                            class="progress-bar-circle position-relative text-muted text-small"
                                            data-trail-color=""
                                            aria-valuemax="100"
                                            aria-valuenow="87"
                                            data-show-percent="true"
                                            data-hide-all-text="false"
                                            data-stroke-width="3"
                                            data-trail-width="1"
                                            data-duration="0"
                                    ></div>
                                </div>
                                <div class="text-alternate text-center mb-0 sh-8 d-flex align-items-end lh-1-25">Crash-free Sessions</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 col-xxl-auto">
                        <div class="card w-100 sw-xxl-19 h-100-card sh-xxl-22">
                            <div class="h-100 d-flex flex-column justify-content-between card-body align-items-center">
                                <div class="sw-8 sh-8 d-flex justify-content-center align-items-center">
                                    <div
                                            role="progressbar"
                                            class="progress-bar-circle position-relative text-muted text-small"
                                            data-trail-color=""
                                            aria-valuemax="100"
                                            aria-valuenow="94"
                                            data-show-percent="true"
                                            data-hide-all-text="false"
                                            data-stroke-width="3"
                                            data-trail-width="1"
                                            data-duration="0"
                                    ></div>
                                </div>
                                <div class="text-alternate text-center mb-0 sh-8 d-flex align-items-end lh-1-25">Request Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Diagnoses End -->

            <!-- Extend Start -->
            <div class="col mb-5">
                <h2 class="small-title">Extend</h2>
                <div class="card h-100-card">
                    <div class="card-body row g-0">
                        <div class="col-12">
                            <div class="cta-2">Interested in more advanced tools?</div>
                            <div class="mb-3 text-primary">Extend your plan now!</div>
                            <div class="row g-2">
                                <div class="col">
                                    <div class="text-muted mb-3 mb-sm-0 pe-3 w-75">
                                        Cheesecake chocolate carrot cake pie lollipop lemon toffee lollipop. Chupa chups pastry dessert cake bear claw topping.
                                    </div>
                                </div>
                                <div class="col-12 col-sm-auto d-flex align-items-center position-relative">
                                    <a href="/Upgrade" class="btn btn-icon btn-icon-start btn-primary">
                                        <i data-acorn-icon="send"></i>
                                        <span>Upgrade</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Extend End -->
        </div>
    </div>
@endsection
