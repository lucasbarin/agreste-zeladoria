@php
    $html_tag_data = [];
    $title = 'Docs Detail';
    $description= 'Service Provider Docs Detail';
@endphp
@extends('layout',['html_tag_data'=>$html_tag_data, 'title'=>$title, 'description'=>$description])

@section('css')
@endsection

@section('js_vendor')
    <script src="/js/vendor/lolight-1.3.0.min.js"></script>
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
                    <h1 class="mb-2 pb-0 display-4" id="title">Database Api</h1>
                    <div class="text-muted font-heading text-small">Let us manage the database engines for your applications so you can focus on building.</div>
                </div>
                <!-- Title End -->
            </div>
        </div>
        <!-- Title and Top Buttons End -->

        <!-- Getting Started Start -->
        <div class="row mb-5">
            <div class="col-12">
                <h2 class="small-title">Getting Started</h2>
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3 heading">Basics</div>
                        <div class="mb-7">
                            <p>
                                Fruitcake chupa chups gingerbread sweet roll pie. Tootsie roll sweet roll pudding. Pastry liquorice wafer sweet. Chocolate bar jelly
                                sugar plum cake sesame snaps gummies lollipop. Oat cake gummies cheesecake cake biscuit jelly beans. Muffin cheesecake sesame snaps.
                                Donut lollipop chocolate cake. Muffin cheesecake sesame snaps. Donut lollipop chocolate cake.
                            </p>
                            <pre class="lolight px-4 py-3 bg-light rounded-md mb-4">
// Javascript Hello World!
function hello(x) {
console.log('hello, ' + x + '!');
};
const hi = x => {
console.log(`hi, ${x}`);
};
hello('world'); </pre>
                            <p>Powder cake gummies jelly beans toffee carrot cake bonbon powder muffin. Jujubes candy jelly-o topping lemon drops.</p>
                            <pre class="lolight px-4 py-3 bg-light rounded-md mb-4">
var mycar = {make: 'Honda', model: 'Accord', year: 1998};
var x = mycar.make; // x gets the value "Honda"</pre>
                        </div>

                        <div class="mb-3 heading">Extending</div>
                        <div>
                            <p>
                                Candy canes jelly beans donut gummies gummi bears halvah oat cake marzipan. Bear claw apple pie dragée gummi bears soufflé toffee.
                                Tiramisu bear claw jelly-o marshmallow topping jelly beans ice cream candy canes cake.
                            </p>
                            <pre class="lolight px-4 py-3 bg-light rounded-md">
function factorial(n) {
if ((n === 0) || (n === 1))
return 1;
else
return (n * factorial(n - 1));
}
var a, b, c, d, e;
a = factorial(1); // a gets the value 1
b = factorial(2); // b gets the value 2
c = factorial(3); // c gets the value 6
d = factorial(4); // d gets the value 24
e = factorial(5); // e gets the value 120</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Getting Started End -->

        <!-- Api Reference Start -->

        <h2 class="small-title">Reference</h2>
        <div class="card">
            <div class="card-body">
                <div class="mb-7">
                    <div class="mb-3 heading">Properties</div>
                    <p>
                        Pastry liquorice wafer sweet. Chocolate bar jelly sugar plum cake sesame snaps gummies lollipop. Oat cake gummies cheesecake cake biscuit
                        jelly beans. Muffin cheesecake sesame snaps. Donut lollipop chocolate cake. Muffin cheesecake sesame snaps. Donut lollipop chocolate cake.
                        Cheesecake oat cake croissant topping lemon drops macaroon sweet roll. Bonbon dragée marshmallow tootsie roll cupcake croissant chocolate
                        cake candy topping.
                    </p>

                    <div class="row g-2 py-2 px-3 rounded-md mb-2 d-none d-md-flex">
                        <div class="col-3 text-small text-muted">NAME</div>
                        <div class="col-2 text-small text-muted">TYPE</div>
                        <div class="col-2 text-small text-muted">DEFAULT</div>
                        <div class="col-5 text-small text-muted">DESCRIPTION</div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            placement
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            vertical
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Menu type, possible values are "vertical", "horizontal".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            behaviour
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            pinned
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Menu pin behaviour, possible values are "pinned", "unpinned".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            layout
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            fluid
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Layout mode, possible values are "boxed", "fluid".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            radius
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            rounded
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Border radius of the whole template, possible values are "rounded", "standard", "flat".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            color
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            light-blue
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Theme color, possible values are "light-blue", "light-green", "light-orange", "light-pink", "light-purple", "dark-blue", "dark-green",
                            "dark-orange", "dark-pink", "dark-purple".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            navcolor
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            default
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Navcolor override, possible values are default, "light", "dark".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            secondary
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            hide
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Secondary menu visibility, possible values are "hide", "show".
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            storagePrefix
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            string
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            acorn-standard-
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Local storage key
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            show
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            boolean
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            true
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Hides settings button and panel when set to false
                        </div>
                    </div>
                </div>

                <div class="mb-7">
                    <div class="mb-3 heading">Methods</div>
                    <p>
                        Dragée bear claw halvah. Ice cream chocolate cotton candy cotton candy biscuit chocolate bar powder. Sugar plum cookie cake. Tart apple
                        pie sesame snaps cake biscuit cookie candy croissant. Candy canes jelly beans donut gummies gummi bears halvah oat cake marzipan. Bear
                        claw apple pie dragée gummi bears soufflé toffee. Tiramisu bear claw jelly-o marshmallow topping jelly beans ice cream candy canes cake.
                        Soufflé cheesecake dessert halvah lemon drops liquorice topping soufflé. Dragée bear claw halvah.
                    </p>
                    <p>
                        Cheesecake pie dessert bear claw caramels tiramisu cotton candy. Pastry powder dragée croissant gingerbread sesame snaps. Lemon drops
                        sesame snaps lemon drops chocolate bar tiramisu. Ice cream chocolate cotton candy cotton candy biscuit chocolate bar powder. Sugar plum
                        cookie cake. Tart apple cookie candy croissant. Biscuit tiramisu bonbon lemon drops croissant.
                    </p>
                    <div class="row g-2 py-2 px-3 rounded-md mb-2 d-none d-md-flex">
                        <div class="col-3 text-small text-muted">NAME</div>
                        <div class="col-2 text-small text-muted">TYPE</div>
                        <div class="col-2 text-small text-muted">DEFAULT</div>
                        <div class="col-5 text-small text-muted">DESCRIPTION</div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            updateAttribute
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            (id: string, value: string)
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            void
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Receives an id, value and updates the attribute
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            getAttribute
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">TYPE</div>
                            (attribute: string)
                        </div>
                        <div class="col-12 col-md-2 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DEFAULT</div>
                            string
                        </div>
                        <div class="col-12 col-md-5 text-alternate">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Receives an id and returns attribute
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mb-3 heading">Events</div>
                    <p>
                        Topping cotton candy halvah marshmallow jujubes chupa chups macaroon cookie croissant. Marshmallow tiramisu marshmallow gummi bears dragée
                        oat cake fruitcake dessert. Topping bonbon gingerbread chocolate apple pie cheesecake liquorice muffin pudding. Jelly beans marshmallow
                        dessert biscuit biscuit gummies ice cream chupa chups cotton candy.
                    </p>
                    <div class="row g-2 py-2 px-3 rounded-md mb-2 d-none d-md-flex">
                        <div class="col-3 text-small text-muted">NAME</div>
                        <div class="col-4 text-small text-muted">DETAIL</div>
                        <div class="col-5 text-small text-muted">DESCRIPTION</div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            Globals.menuPlacementChange
                        </div>
                        <div class="col-12 col-md-4 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DETAIL</div>
                            (value: string)
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Fired when placement value changes. Carries value in detail variable
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            Globals.menuBehaviourChange
                        </div>
                        <div class="col-12 col-md-4 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DETAIL</div>
                            (value: string)
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Fired when behaviour value changes. Carries value in detail variable
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md bg-separator-light">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            Globals.colorAttributeChange
                        </div>
                        <div class="col-12 col-md-4 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DETAIL</div>
                            (value: string)
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Fired when color value changes. Carries value in detail variable
                        </div>
                    </div>
                    <div class="row gx-2 px-3 py-4 py-md-3 rounded-md">
                        <div class="col-12 col-md-3 text-primary mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">NAME</div>
                            Globals.borderRadiusChange
                        </div>
                        <div class="col-12 col-md-4 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DETAIL</div>
                            (value: string)
                        </div>
                        <div class="col-12 col-md-5 text-alternate mb-3 mb-md-0">
                            <div class="text-small text-muted d-block d-md-none">DESCRIPTION</div>
                            Fired when border radius changes. Carries value in detail variable
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Api Reference End -->
    </div>
@endsection
