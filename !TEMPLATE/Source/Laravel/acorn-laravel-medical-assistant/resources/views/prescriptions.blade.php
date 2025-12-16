@php
    $html_tag_data = [];
    $title = 'Prescriptions';
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

        <!-- Prescription Items Start -->
        <div class="row g-4 mb-5">
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-primary mb-4">Prescription 161-97-2030</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div>Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div>22.12.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div>Active</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-primary">Bactrin DS</div>
                                    <div>1 time each morning</div>
                                    <div>7 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Hydrochlorothiazede 12 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Propranolo 40 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Furosemide 20 Mg</div>
                                    <div>1 time each morning</div>
                                    <div>3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary" type="button">
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-primary mb-4">Prescription 155-11-9431</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div>Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div>11.11.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div>Active</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-primary">Amlodipine 12 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Propranolo 40 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Losartan</div>
                                    <div>1 time each morning</div>
                                    <div>3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary" type="button">
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-primary mb-4">Prescription 155-11-9431</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div>Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div>11.11.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div>Active</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-primary">Amlodipine 12 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Propranolo 40 Mg</div>
                                    <div>2 times a day with food</div>
                                    <div>14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-primary">Losartan</div>
                                    <div>1 time each morning</div>
                                    <div>3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2">
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary" type="button">
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-muted mb-4">Prescription 122-33-4353</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div class="text-muted">Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div class="text-muted">13.09.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div class="text-muted">Expired</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-muted">Atorvastatin</div>
                                    <div class="text-muted">3 times a day with food</div>
                                    <div class="text-muted">7 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Simvastatin</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Lisinopril</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Furosemide 20 Mg</div>
                                    <div class="text-muted">1 time each morning</div>
                                    <div class="text-muted">3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary disabled" type="button" disabled>
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-muted mb-4">Prescription 122-33-4353</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div class="text-muted">Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div class="text-muted">30.06.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div class="text-muted">Expired</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-muted">Atorvastatin</div>
                                    <div class="text-muted">3 times a day with food</div>
                                    <div class="text-muted">7 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Simvastatin</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Lisinopril</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Furosemide 20 Mg</div>
                                    <div class="text-muted">1 time each morning</div>
                                    <div class="text-muted">3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary disabled" type="button" disabled>
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-muted mb-4">Prescription 122-33-4353</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div class="text-muted">Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div class="text-muted">08.05.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div class="text-muted">Expired</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-muted">Atorvastatin</div>
                                    <div class="text-muted">3 times a day with food</div>
                                    <div class="text-muted">7 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Simvastatin</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Lisinopril</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Furosemide 20 Mg</div>
                                    <div class="text-muted">1 time each morning</div>
                                    <div class="text-muted">3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary disabled" type="button" disabled>
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-muted mb-4">Prescription 122-33-4353</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div class="text-muted">Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div class="text-muted">11.04.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div class="text-muted">Expired</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-muted">Lisinopril</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Furosemide 20 Mg</div>
                                    <div class="text-muted">1 time each morning</div>
                                    <div class="text-muted">3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary disabled" type="button" disabled>
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h3 class="heading text-muted mb-4">Prescription 122-33-4353</h3>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">NAME</div>
                                <div class="text-muted">Joisse Kaycee</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">DATE</div>
                                <div class="text-muted">07.03.2021</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">STATUS</div>
                                <div class="text-muted">Expired</div>
                            </div>
                            <div class="mb-3">
                                <div class="text-muted text-small mb-1">MEDS</div>
                                <div class="mb-3">
                                    <div class="text-muted">Simvastatin</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Lisinopril</div>
                                    <div class="text-muted">2 times a day with food</div>
                                    <div class="text-muted">14 days</div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-muted">Furosemide 20 Mg</div>
                                    <div class="text-muted">1 time each morning</div>
                                    <div class="text-muted">3 days</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between w-100 mt-3">
                            <button type="button" class="btn btn-sm btn-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Refill</span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary btn-icon btn-icon-start w-100 me-2 disabled" disabled>
                                <i data-acorn-icon="health"></i>
                                <span>Consult</span>
                            </button>
                            <button class="btn btn-icon btn-icon-only btn-sm btn-outline-primary disabled" type="button" disabled>
                                <i data-acorn-icon="more-horizontal"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <button class="btn btn-outline-primary sw-25">Load More</button>
            </div>
        </div>
        <!-- Prescription Items End -->
    </div>
@endsection
