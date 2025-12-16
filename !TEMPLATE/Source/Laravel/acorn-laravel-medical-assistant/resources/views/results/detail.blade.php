@php
    $html_tag_data = [];
    $title = 'Results Detail';
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

        <div class="row gx-5 gy-5">
            <div class="col-12 col-xl-4">
                <!-- Patient Start -->
                <h2 class="small-title">Info</h2>
                <div class="card">
                    <div class="card-body mb-n5">
                        <div class="d-flex align-items-center flex-column">
                            <div class="mb-5 d-flex align-items-center flex-column">
                                <div class="sw-6 sh-6 mb-3 d-inline-block bg-primary d-flex justify-content-center align-items-center rounded-xl">
                                    <div class="text-white">AO</div>
                                </div>
                                <div class="h5 mb-1">Alicia Owens</div>
                                <div class="text-muted">
                                    <i data-acorn-icon="pin" class="text-muted"></i>
                                    <span class="align-middle">Montreal, Canada</span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div>
                                <p class="text-small text-muted mb-2">PATIENT</p>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="user" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate align-middle">Alicia Owens</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="gender" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">Female</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="birthday" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">27</div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div>
                                <p class="text-small text-muted mb-2">CONTACT</p>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="pin" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="phone" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">+6443884455</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="email" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">blaine@cottrell.com</div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5">
                            <div>
                                <p class="text-small text-muted mb-2">DOCTOR</p>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="health" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate align-middle">Carmelo Avril, M.B.B.S.</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="category" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">Microbiology</div>
                                </div>
                                <div class="row g-0 mb-2">
                                    <div class="col-auto">
                                        <div class="sw-3 me-1">
                                            <i data-acorn-icon="hospital" class="text-primary" data-acorn-size="17"></i>
                                        </div>
                                    </div>
                                    <div class="col text-alternate">Cabrini Hospital</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Patient End -->
            </div>

            <div class="col-12 col-lg-8">
                <!-- Hematology Start -->
                <h2 class="small-title">Hematology</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="row g-0 h-100 align-content-center mb-4 d-none d-md-flex">
                            <div class="col-12 col-md-4 d-flex align-items-center mb-2 mb-md-0 text-muted text-small">TEST</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">RESULT</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">PRE</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">REFERENCE</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small justify-content-end">STATUS</div>
                        </div>

                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">WBC</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">11.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">10.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">4 - 12</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="fw-bold text-body">RBC</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="fw-bold text-body">6.8</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="fw-bold text-body">7.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="fw-bold text-body">3.5 - 5.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="multiply" class="text-danger"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">HGB</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">13.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">14.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">12 - 16</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">HCT</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">36.3</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">41</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">35 - 49</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">MCV</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">92</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">99.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">80 - 100</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">MCH</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">28.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">41.8</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">27 - 34</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="fw-bold text-body">MCHC</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="fw-bold text-body">44.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="fw-bold text-body">48.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="fw-bold text-body">31 - 37</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="multiply" class="text-danger"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="fw-bold text-body">RDW-CV</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="fw-bold text-body">8.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="fw-bold text-body">14</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="fw-bold text-body">11 - 16</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="multiply" class="text-danger"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">RDW-SD</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">39.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">44.8</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">37 - 54</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">PLT</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">343</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">361</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">100 - 400</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">NE</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">55.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">52.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">40 - 80</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">LY</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">5.3</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">5.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.8 - 7</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">MO</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">0.89</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">0.93</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.12 - 1.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">EO</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">0.34</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">0.48</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.02 - 0.5</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="fw-bold text-body">BA</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="fw-bold text-body">0.26</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="fw-bold text-body">0.15</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="fw-bold text-body">0 - 0.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="multiply" class="text-danger"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">PDW</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">19.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">19.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">18 - 22</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">PCT</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">0.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">0.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.1 - 0.5</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">MPV</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">8.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">8.9</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">6.5 - 11.6</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">PLCR</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">10.1</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">10.3</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">6.5 - 11.6</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Hematology End -->

                <!-- Hormones Start -->
                <h2 class="small-title">Hormones</h2>
                <div class="card mb-5">
                    <div class="card-body">
                        <div class="row g-0 h-100 align-content-center mb-4 d-none d-md-flex">
                            <div class="col-12 col-md-4 d-flex align-items-center mb-2 mb-md-0 text-muted text-small">TEST</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">RESULT</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">PRE</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small">REFERENCE</div>
                            <div class="col-6 col-md-2 d-flex align-items-center text-alternate text-medium text-muted text-small justify-content-end">STATUS</div>
                        </div>

                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">T3-FT3</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">4.2</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">4.4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">1.8 - 4.63</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center mb-3">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">TSH</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">1.49</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">1.35</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.27 - 4.28</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="multiply" class="text-danger"></i>
                            </div>
                        </div>
                        <div class="row g-0 h-100 align-content-center">
                            <div class="col-12 col-md-4 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Test</div>
                                <div class="text-alternate">T4-FT4</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Result</div>
                                <div class="text-alternate">1.25</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Pre</div>
                                <div class="text-alternate">1.19</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Reference</div>
                                <div class="text-alternate">0.93 - 1.71</div>
                            </div>
                            <div class="col-6 col-md-2 d-flex flex-column justify-content-center align-items-md-end mb-1 mb-md-0">
                                <div class="text-muted text-small d-md-none">Status</div>
                                <i data-acorn-icon="check" class="text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Hormones End -->
            </div>
        </div>
    </div>
@endsection
