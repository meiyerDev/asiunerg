@extends('layouts.app',[
	'elementActive' => 'reports',
	'subElementActive' => '',
])
@section('content')
@include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <report-form />
        @include('layouts.footers.auth')
    </div>

@endsection