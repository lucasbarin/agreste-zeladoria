@php
    $html_tag_data = [];
    $title = 'Results';
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

        <!-- Item List Start -->
        <div class="row">
            <div class="col-12 mb-5">
                <div class="card mb-2 bg-transparent no-shadow d-none d-md-block">
                    <div class="row g-0 sh-3">
                        <div class="col">
                            <div class="card-body pt-0 pb-0 h-100">
                                <div class="row g-0 h-100 align-content-center">
                                    <div class="col-6 col-md-7 d-flex align-items-center text-alternate text-medium text-muted text-small">NAME</div>
                                    <div class="col-6 col-md-3 d-flex align-items-center text-alternate text-medium text-muted text-small">DATE</div>
                                    <div class="col-6 col-md-2 d-flex align-items-center justify-content-md-end text-alternate text-medium text-muted text-small">
                                        ACTION
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-5">
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">blood-analysis.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">12.11.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="image" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">hearth-imaging.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">05.11.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="image" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">lung-imaging.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">05.11.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="image" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">kidney-ultrasound.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">05.11.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">blood-analysis.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">02.11.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">urine-analysis.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">19.10.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">stool-analysis.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">16.09.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">full-blood-analysis.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">11.09.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2 sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">allergy-test.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">02.04.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card sh-11 sh-md-8">
                        <div class="card-body pt-0 pb-0 h-100">
                            <div class="row g-0 h-100 align-content-center">
                                <div class="col-11 col-md-7 d-flex align-items-center mb-1 mb-md-0 order-1 order-md-1">
                                    <a href="/Results/Detail" class="body-link text-truncate">
                                        <i data-acorn-icon="file-text" class="sw-2 me-2 text-alternate" data-acorn-size="17"></i>
                                        <span class="align-middle">food-chalenge.pdf</span>
                                    </a>
                                </div>
                                <div class="col-12 col-md-3 d-flex align-items-center text-muted order-3 order-md-2">01.04.2021</div>
                                <div class="col-1 col-md-2 d-flex align-items-center text-muted text-medium justify-content-end order-2 order-md-3">
                                    <button class="btn btn-icon btn-icon-only btn-link btn-sm p-1" type="button">
                                        <i data-acorn-icon="arrow-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-100 d-flex justify-content-center">
                    <ul class="pagination">
                        <li class="page-item prev disabled">
                            <a class="page page-link shadow" href="#">
                                <i data-acorn-icon="chevron-left"></i>
                            </a>
                        </li>
                        <li class="page-item active">
                            <a class="page page-link shadow" href="#">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page page-link shadow" href="#">2</a>
                        </li>
                        <li class="page-item next">
                            <a class="page page-link shadow" href="#">
                                <i data-acorn-icon="chevron-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Item List End -->
    </div>
@endsection
