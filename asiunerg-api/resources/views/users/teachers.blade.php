@extends('layouts.app',[
	'elementActive' => 'users',
	'subElementActive' => 'teachers',
])
@section('content')
@include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <teachers-list />
        @include('layouts.footers.auth')
    </div>

@endsection