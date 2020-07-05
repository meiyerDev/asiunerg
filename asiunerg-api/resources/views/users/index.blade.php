@extends('layouts.app',[
	'elementActive' => 'users',
	'subElementActive' => 'admins',
])
@section('content')
@include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <users-list />
        @include('layouts.footers.auth')
    </div>

@endsection