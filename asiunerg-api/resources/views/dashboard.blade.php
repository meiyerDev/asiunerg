@extends('layouts.app',[
	'elementActive' => 'home',
	'subElementActive' => '',
])
@section('content')
    @include('layouts.headers.cards')
    
    <div class="container-fluid mt--7">
        <example-component/>

        @include('layouts.footers.auth')
    </div>
@endsection

@push('js')
    <script src="{{ asset('argon') }}/vendor/chart.js/dist/Chart.min.js"></script>
    <script src="{{ asset('argon') }}/vendor/chart.js/dist/Chart.extension.js"></script>
@endpush