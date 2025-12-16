@php
    $html_tag_data = [];
    $title = 'New Appointment';
    $description = 'Medical Assistant';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data,'title'=>$title,'description'=>$description])

@section('css')
    <link rel="stylesheet" href="/css/vendor/bootstrap-datepicker3.standalone.min.css" />
    <link rel="stylesheet" href="/css/vendor/select2.min.css" />,
    <link rel="stylesheet" href="/css/vendor/select2-bootstrap4.min.css" />
@endsection

@section('js_vendor')
    <script src="/js/cs/wizard.js"></script>
    <script src="/js/vendor/jquery.barrating.min.js"></script>
    <script src="/js/vendor/datepicker/bootstrap-datepicker.min.js"></script>
    <script src="/js/vendor/select2.full.min.js"></script>
    <script src="/js/vendor/timepicker.js"></script>
@endsection

@section('js_page')
    <script src="/js/pages/appointments.new.js"></script>
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

        <!-- New Appointment Start -->
        <h2 class="small-title">Online Appointment</h2>
        <div class="card mb-5 wizard short-border" id="appointmentsWizard">
            <div class="card-header border-0 pb-0">
                <ul class="nav nav-tabs justify-content-center" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link text-center" href="#departmentTab" role="tab">
                            <div class="mb-1 title d-none d-sm-block">Department</div>
                            <div class="text-small description d-none d-md-block">Choose a department</div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link text-center" href="#doctorTab" role="tab">
                            <div class="mb-1 title d-none d-sm-block">Doctor</div>
                            <div class="text-small description d-none d-md-block">Choose a doctor</div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link text-center" href="#dateTab" role="tab">
                            <div class="mb-1 title d-none d-sm-block">Date</div>
                            <div class="text-small description d-none d-md-block">Choose date and time</div>
                        </a>
                    </li>
                    <li class="nav-item d-none" role="presentation">
                        <a class="nav-link text-center" href="#completeTab" role="tab"></a>
                    </li>
                </ul>
            </div>
            <div class="card-body pt-7">
                <div class="tab-content">
                    <div class="tab-pane fade sh-xl-60 text-center" id="departmentTab" role="tabpanel">
                        <h5 class="card-title">Choose a Department</h5>
                        <p class="card-text text-alternate mb-4">Dessert oat cake pudding jujubes jujubes tiramisu candy lollipop.</p>
                        <div class="row g-2">
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="bone" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Cardiology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">14 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="lungs" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Chaplaincy</span>
                    <span class="text-extra-small fw-medium text-muted d-block">8 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="brain" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Gastroenterology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">16 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="stomach" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Gynecology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">10 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="virus" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Haematology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">14 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="urinary" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Maternity</span>
                    <span class="text-extra-small fw-medium text-muted d-block">8 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="surgery" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Microbiology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">16 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="gynecology" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Neonatal</span>
                    <span class="text-extra-small fw-medium text-muted d-block">10 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="dermatology" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Obstetrics</span>
                    <span class="text-extra-small fw-medium text-muted d-block">14 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="sperm" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Oncology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">8 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="dna" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Ophthalmology</span>
                    <span class="text-extra-small fw-medium text-muted d-block">16 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                            <div class="col-6 col-xl-3">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="departmentChoice" />
                                    <span class="card form-check-label w-100 custom-border">
                  <span class="card-body text-center">
                    <i data-acorn-icon="tooth" class="text-primary"></i>
                    <span class="mt-3 mb-1 text-body text-primary d-block">Orthopaedics</span>
                    <span class="text-extra-small fw-medium text-muted d-block">10 DOCTORS</span>
                  </span>
                </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade sh-xl-60 text-center" id="doctorTab" role="tabpanel">
                        <h5 class="card-title">Choose a Doctor</h5>
                        <p class="card-text text-alternate mb-4">Chocolate cake apple pie bear claw wafer cupcake topping topping oat cake.</p>
                        <div class="row g-2">
                            <div class="col-6 col-xl-4">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="doctorChoice" />
                                    <div class="card form-check-label w-100 custom-border">
                                        <div class="card-body text-center">
                                            <div class="sw-13 position-relative mb-3 mx-auto">
                                                <img src="/img/profile/profile-12.webp" class="img-fluid rounded-xl" alt="thumb" />
                                            </div>
                                            <a href="#" class="body-link">Kathryn Mengel, M.D.</a>
                                            <div class="text-muted text-medium mb-2">Cardiology</div>
                                            <div class="mb-2">
                                                <div class="br-wrapper br-theme-cs-icon d-inline-block">
                                                    <select class="rating" name="rating" autocomplete="off" data-readonly="true" data-initial-rating="5">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="text-muted sh-7 mb-3">
                                                Pie fruitcake jelly beans. Candy tootsie chocolate croissant jujubes icing macaroon croissant.
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="book" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">University of Sydney</div>
                                                </div>
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="health" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">University of Western Australia</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-6 col-xl-4">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="doctorChoice" />
                                    <div class="card form-check-label w-100 custom-border">
                                        <div class="card-body text-center">
                                            <div class="sw-13 position-relative mb-3 mx-auto">
                                                <img src="/img/profile/profile-15.webp" class="img-fluid rounded-xl" alt="thumb" />
                                            </div>
                                            <a href="#" class="body-link">Carmelo Avril, M.B.B.S.</a>
                                            <div class="text-muted text-medium mb-2">Cardiology</div>
                                            <div class="mb-2">
                                                <div class="br-wrapper br-theme-cs-icon d-inline-block">
                                                    <select class="rating" name="rating" autocomplete="off" data-readonly="true" data-initial-rating="5">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="text-muted sh-7 mb-3">
                                                Pie fruitcake jelly beans. Candy tootsie chocolate croissant jujubes icing macaroon croissant.
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="book" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">University of Melbourne</div>
                                                </div>
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="health" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">University of Sydney</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-6 col-xl-4">
                                <label class="form-check custom-card w-100 position-relative p-0 m-0">
                                    <input type="radio" class="form-check-input position-absolute e-2 t-2 z-index-1" name="doctorChoice" />
                                    <div class="card form-check-label w-100 custom-border">
                                        <div class="card-body text-center">
                                            <div class="sw-13 position-relative mb-3 mx-auto">
                                                <img src="/img/profile/profile-14.webp" class="img-fluid rounded-xl" alt="thumb" />
                                            </div>
                                            <a href="#" class="body-link">Wiebe Rodolfo, M.D.</a>
                                            <div class="text-muted text-medium mb-2">Cardiology</div>
                                            <div class="mb-2">
                                                <div class="br-wrapper br-theme-cs-icon d-inline-block">
                                                    <select class="rating" name="rating" autocomplete="off" data-readonly="true" data-initial-rating="5">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="text-muted sh-7 mb-3">
                                                Pie fruitcake jelly beans. Candy tootsie chocolate croissant jujubes icing macaroon croissant.
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="book" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">University of Adelaide</div>
                                                </div>
                                            </div>
                                            <div class="row g-0 align-items-center mb-1">
                                                <div class="col-auto">
                                                    <div class="sw-3 sh-4 d-flex justify-content-center align-items-center">
                                                        <i data-acorn-icon="health" class="text-primary"></i>
                                                    </div>
                                                </div>
                                                <div class="col ps-3">
                                                    <div class="sh-4 d-flex align-items-center lh-1-25">Monash University</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade sh-xl-60 text-center" id="dateTab" role="tabpanel">
                        <h5 class="card-title">Choose a Date</h5>
                        <p class="card-text text-alternate mb-4">Jelly carrot cake lollipop carrot cake pudding cake gingerbread biscuit.</p>
                        <div class="row mb-2 justify-content-center">
                            <div class="col-12 col-sm-6 col-xl-4">
                                <div id="datePickerEmbed" class="border border-1 rounded-md p-3"></div>
                            </div>
                        </div>
                        <div class="row justify-content-center text-start">
                            <div class="col-12 col-sm-6 col-xl-4">
                                <label class="top-label mb-0 w-100">
                                    <select id="selectTopLabel">
                                        <option label="&nbsp;"></option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                    </select>
                                    <span>TIME</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade sh-xl-60" id="completeTab" role="tabpanel">
                        <div class="text-center d-flex flex-column justify-content-center align-items-center h-100">
                            <h5 class="card-title">Thank You!</h5>
                            <p class="card-text text-alternate mb-4">Your appointment is set successfully!</p>
                            <button class="btn btn-icon btn-icon-start btn-primary btn-reset" type="button">
                                <i data-acorn-icon="calendar"></i>
                                <span>New Appointment</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-center border-0 pt-1">
                <button class="btn btn-icon btn-icon-start btn-outline-primary btn-prev" type="button">
                    <i data-acorn-icon="chevron-left"></i>
                    <span>Back</span>
                </button>
                <button class="btn btn-icon btn-icon-end btn-outline-primary btn-next" type="button">
                    <span>Next</span>
                    <i data-acorn-icon="chevron-right"></i>
                </button>
            </div>
        </div>
        <!-- New Appointment End -->
    </div>
@endsection
