@extends('layouts.app',[
	'elementActive' => 'users',
	'subElementActive' => 'students',
])
@section('content')
@include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <students-list />
        @include('layouts.footers.auth')
    </div>

@endsection