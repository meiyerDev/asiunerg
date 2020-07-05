@extends('layouts.app',[
	'elementActive' => 'classes',
	'subElementActive' => '',
])
@section('content')
@include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <classes-list />
        @include('layouts.footers.auth')
    </div>

@endsection