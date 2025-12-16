@php
    $html_tag_data = [];
    $title = 'Database';
    $description= 'Service Provider Database';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
    <script src="/js/vendor/Chart.bundle.min.js"></script>
@endsection

@section('js_page')
    <script src="/js/cs/charts.extend.js"></script>
    <script src="/js/cs/checkall.js"></script>
    <script src="/js/pages/services.database.js"></script>
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
                    <a href="/Services/DatabaseAdd" class="btn btn-outline-primary btn-icon btn-icon-start w-100 w-md-auto">
                        <i data-acorn-icon="plus"></i>
                        <span>Add New</span>
                    </a>
                    <!-- Add New Button End -->

                    <!-- Check Button Start -->
                    <div class="btn-group ms-1 check-all-container ms-1">
                        <div class="btn btn-outline-primary btn-custom-control p-0 ps-3 pe-2" data-target="#checkboxTable">
            <span class="form-check float-end">
              <input type="checkbox" class="form-check-input" id="checkAll" />
            </span>
                        </div>
                        <button
                                type="button"
                                class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                                data-bs-offset="0,3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                        ></button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#">
                                <span class="align-middle d-inline-block">Status</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <span class="align-middle d-inline-block">Move</span>
                            </a>
                            <a class="dropdown-item" href="#">
                                <span class="align-middle d-inline-block">Delete</span>
                            </a>
                        </div>
                    </div>
                    <!-- Check Button End -->
                </div>
                <!-- Top Buttons End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <!-- Controls Start -->
        <div class="row mb-2">
            <!-- Search Start -->
            <div class="col-sm-12 col-md-5 col-lg-3 col-xxl-2 mb-1">
                <div class="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                    <input class="form-control" placeholder="Search" />
                    <span class="search-magnifier-icon">
          <i data-acorn-icon="search"></i>
        </span>
                    <span class="search-delete-icon d-none">
          <i data-acorn-icon="close"></i>
        </span>
                </div>
            </div>
            <!-- Search End -->

            <div class="col-sm-12 col-md-7 col-lg-9 col-xxl-10 text-end mb-1">
                <div class="d-inline-block">
                    <!-- Export Dropdown Start -->
                    <div class="d-inline-block">
                        <button class="btn p-0" data-bs-toggle="dropdown" type="button" data-bs-offset="0,3">
            <span
                    class="btn btn-icon btn-icon-only btn-foreground-alternate shadow dropdown"
                    data-bs-delay="0"
                    data-bs-placement="top"
                    data-bs-toggle="tooltip"
                    title="Export"
            >
              <i data-acorn-icon="download"></i>
            </span>
                        </button>
                        <div class="dropdown-menu shadow dropdown-menu-end">
                            <button class="dropdown-item export-copy" type="button">Copy</button>
                            <button class="dropdown-item export-excel" type="button">Excel</button>
                            <button class="dropdown-item export-cvs" type="button">Cvs</button>
                        </div>
                    </div>
                    <!-- Export Dropdown End -->

                    <!-- Length Start -->
                    <div class="dropdown-as-select d-inline-block ms-1" data-childSelector="span">
                        <button class="btn p-0 shadow" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,3">
            <span
                    class="btn btn-foreground-alternate dropdown-toggle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-delay="0"
                    title="Item Count"
            >
              10 Items
            </span>
                        </button>
                        <div class="dropdown-menu shadow dropdown-menu-end">
                            <a class="dropdown-item" href="#">5 Items</a>
                            <a class="dropdown-item active" href="#">10 Items</a>
                            <a class="dropdown-item" href="#">20 Items</a>
                        </div>
                    </div>
                    <!-- Length End -->
                </div>
            </div>
        </div>
        <!-- Controls End -->

        <!-- Database List Start -->
        <div class="row">
            <div class="col-12 mb-5">
                <div class="card mb-2 bg-transparent no-shadow d-none d-md-block">
                    <div class="row g-0 sh-3">
                        <div class="col">
                            <div class="card-body pt-0 pb-0 h-100">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-12 col-md-3 d-flex align-items-center mb-2 mb-md-0 text-muted text-small">IP</div>
                                    <div class="col-6 col-md-3 d-flex align-items-center text-alternate text-medium text-muted text-small">NAME</div>
                                    <div class="col-6 col-md-3 d-flex align-items-center text-alternate text-medium text-muted text-small">TYPE</div>
                                    <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">STATUS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="checkboxTable" class="mb-n2">
                    <div class="card mb-2">
                        <div class="row g-0 sh-21 sh-md-7">
                            <div class="col">
                                <div class="card-body pt-0 pb-0 h-100">
                                    <div class="row g-0 h-100 align-content-center">
                                        <div class="col-11 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div class="text-muted text-small d-md-none">Ip</div>
                                            <a href="/Services/DatabaseDetail" class="text-truncate stretched-link">116.41.118.8</a>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div class="text-muted text-small d-md-none">Name</div>
                                            <div class="text-alternate">Production 1</div>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                            <div class="text-muted text-small d-md-none">Type</div>
                                            <div class="text-alternate">Mongodb</div>
                                        </div>
                                        <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div class="text-muted text-small d-md-none">Status</div>
                                            <div class="text-alternate">
                                                <span class="badge rounded-pill bg-outline-primary">ACTIVE</span>
                                            </div>
                                        </div>
                                        <div class="col-1 col-md-1 d-flex flex-column justify-content-center order-2 order-md-last">
                                            <div class="form-check d-flex flex-column justify-content-center align-items-end mb-0 pe-none">
                                                <input type="checkbox" class="form-check-input ms-n2 mt-n3 ms-md-0 mt-md-0 me-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row g-0 sh-21 sh-md-7">
                            <div class="col">
                                <div class="card-body pt-0 pb-0 h-100">
                                    <div class="row g-0 h-100 align-content-center">
                                        <div class="col-11 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div class="text-muted text-small d-md-none">Ip</div>
                                            <a href="/Services/DatabaseDetail" class="text-truncate stretched-link">116.41.118.9</a>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div class="text-muted text-small d-md-none">Name</div>
                                            <div class="text-alternate">Production 2</div>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                            <div class="text-muted text-small d-md-none">Type</div>
                                            <div class="text-alternate">Mongodb</div>
                                        </div>
                                        <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div class="text-muted text-small d-md-none">Status</div>
                                            <div class="text-alternate">
                                                <span class="badge rounded-pill bg-outline-primary">ACTIVE</span>
                                            </div>
                                        </div>
                                        <div class="col-1 col-md-1 d-flex flex-column justify-content-center order-2 order-md-last">
                                            <div class="form-check d-flex flex-column justify-content-center align-items-end mb-0 pe-none">
                                                <input type="checkbox" class="form-check-input ms-n2 mt-n3 ms-md-0 mt-md-0 me-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row g-0 sh-21 sh-md-7">
                            <div class="col">
                                <div class="card-body pt-0 pb-0 h-100">
                                    <div class="row g-0 h-100 align-content-center">
                                        <div class="col-11 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div class="text-muted text-small d-md-none">Ip</div>
                                            <a href="/Services/DatabaseDetail" class="text-truncate stretched-link">74.21.49.144</a>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div class="text-muted text-small d-md-none">Name</div>
                                            <div class="text-alternate">Sandbox</div>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                            <div class="text-muted text-small d-md-none">Type</div>
                                            <div class="text-alternate">Mongodb</div>
                                        </div>
                                        <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div class="text-muted text-small d-md-none">Status</div>
                                            <div class="text-alternate">
                                                <span class="badge rounded-pill bg-outline-muted">INACTIVE</span>
                                            </div>
                                        </div>
                                        <div class="col-1 col-md-1 d-flex flex-column justify-content-center order-2 order-md-last">
                                            <div class="form-check d-flex flex-column justify-content-center align-items-end mb-0 pe-none">
                                                <input type="checkbox" class="form-check-input ms-n2 mt-n3 ms-md-0 mt-md-0 me-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row g-0 sh-21 sh-md-7">
                            <div class="col">
                                <div class="card-body pt-0 pb-0 h-100">
                                    <div class="row g-0 h-100 align-content-center">
                                        <div class="col-11 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div class="text-muted text-small d-md-none">Ip</div>
                                            <a href="/Services/DatabaseDetail" class="text-truncate stretched-link">227.191.45.88</a>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div class="text-muted text-small d-md-none">Name</div>
                                            <div class="text-alternate">Test</div>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                            <div class="text-muted text-small d-md-none">Type</div>
                                            <div class="text-alternate">Mongodb</div>
                                        </div>
                                        <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div class="text-muted text-small d-md-none">Status</div>
                                            <div class="text-alternate">
                                                <span class="badge rounded-pill bg-outline-muted">INACTIVE</span>
                                            </div>
                                        </div>
                                        <div class="col-1 col-md-1 d-flex flex-column justify-content-center order-2 order-md-last">
                                            <div class="form-check d-flex flex-column justify-content-center align-items-end mb-0 pe-none">
                                                <input type="checkbox" class="form-check-input ms-n2 mt-n3 ms-md-0 mt-md-0 me-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row g-0 sh-21 sh-md-7">
                            <div class="col">
                                <div class="card-body pt-0 pb-0 h-100">
                                    <div class="row g-0 h-100 align-content-center">
                                        <div class="col-11 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                                            <div class="text-muted text-small d-md-none">Ip</div>
                                            <a href="/Services/DatabaseDetail" class="text-truncate stretched-link">74.21.49.144</a>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                                            <div class="text-muted text-small d-md-none">Name</div>
                                            <div class="text-alternate">Public</div>
                                        </div>
                                        <div class="col-6 col-md-3 d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                                            <div class="text-muted text-small d-md-none">Type</div>
                                            <div class="text-alternate">Mongodb</div>
                                        </div>
                                        <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                                            <div class="text-muted text-small d-md-none">Status</div>
                                            <div class="text-alternate">
                                                <span class="badge rounded-pill bg-outline-muted">CLOSED</span>
                                            </div>
                                        </div>
                                        <div class="col-1 col-md-1 d-flex flex-column justify-content-center order-2 order-md-last">
                                            <div class="form-check d-flex flex-column justify-content-center align-items-end mb-0 pe-none">
                                                <input type="checkbox" class="form-check-input ms-n2 mt-n3 ms-md-0 mt-md-0 me-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Database List End -->

        <div class="row mb-n5">
            <!-- Progress Start -->
            <div class="col-xl-6 mb-5">
                <h2 class="small-title">Stats</h2>
                <div class="row g-2">
                    <div class="col-12 col-md-6">
                        <div class="card sh-14">
                            <div class="card-body py-0 d-flex align-items-center">
                                <div class="row g-0 d-flex w-100">
                                    <div class="col sh-8 d-flex flex-column justify-content-center custom-legend-container"></div>
                                    <template class="custom-legend-item">
                                        <div class="text-small text-muted text"></div>
                                        <div class="cta-3 text-primary value"></div>
                                    </template>
                                    <div class="col-auto">
                                        <canvas id="smallDoughnutChart1" class="sw-8 sh-8"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card sh-14">
                            <div class="card-body py-0 d-flex align-items-center">
                                <div class="row g-0 d-flex w-100">
                                    <div class="col sh-8 d-flex flex-column justify-content-center custom-legend-container"></div>
                                    <template class="custom-legend-item">
                                        <div class="text-small text-muted text"></div>
                                        <div class="cta-3 text-primary value"></div>
                                    </template>
                                    <div class="col-auto">
                                        <canvas id="smallDoughnutChart2" class="sw-8 sh-8"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card sh-14">
                            <div class="card-body py-0 d-flex align-items-center">
                                <div class="row g-0 d-flex w-100">
                                    <div class="col sh-8 d-flex flex-column justify-content-center custom-legend-container"></div>
                                    <template class="custom-legend-item">
                                        <div class="text-small text-muted text"></div>
                                        <div class="cta-3 text-primary value"></div>
                                    </template>
                                    <div class="col-auto">
                                        <canvas id="smallDoughnutChart3" class="sw-8 sh-8"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card sh-14">
                            <div class="card-body py-0 d-flex align-items-center">
                                <div class="row g-0 d-flex w-100">
                                    <div class="col sh-8 d-flex flex-column justify-content-center custom-legend-container"></div>
                                    <template class="custom-legend-item">
                                        <div class="text-small text-muted text"></div>
                                        <div class="cta-3 text-primary value"></div>
                                    </template>
                                    <div class="col-auto">
                                        <canvas id="smallDoughnutChart4" class="sw-8 sh-8"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Progress End -->

            <!-- Quick Add Start -->
            <div class="col-12 col-xl-6 mb-5">
                <h2 class="small-title">Quick Add</h2>
                <div class="card h-100-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <form>
                            <div class="mb-3 filled">
                                <i data-acorn-icon="tag"></i>
                                <input class="form-control" placeholder="Title" />
                            </div>
                            <div class="mb-3 filled">
                                <i data-acorn-icon="server"></i>
                                <input class="form-control" placeholder="Type" />
                            </div>
                            <a href="#" class="btn btn-icon btn-icon-start btn-outline-primary mt-1">
                                <i data-acorn-icon="plus"></i>
                                <span>Add</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Quick Add End -->
        </div>
    </div>
@endsection
