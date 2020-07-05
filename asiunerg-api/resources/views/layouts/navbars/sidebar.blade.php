<nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
        <!-- Toggler -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Brand -->
        <a class="navbar-brand pt-0" href="{{ route('home') }}">
            <img src="{{ asset('argon') }}/img/brand/blue.png" class="navbar-brand-img" alt="...">
        </a>
        <!-- User -->
        <ul class="nav align-items-center d-md-none">
            <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="media align-items-center">
                        <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="{{ asset('argon') }}/img/theme/team-1-800x800.jpg">
                        </span>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div class=" dropdown-header noti-title">
                        <h6 class="text-overflow m-0">{{ __('Bienvenido!') }}</h6>
                    </div>
                    <a href="{{ route('profile.edit') }}" class="dropdown-item">
                        <i class="ni ni-single-02"></i>
                        <span>{{ __('Mi perfil') }}</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="{{ route('logout') }}" class="dropdown-item" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                        <i class="ni ni-user-run"></i>
                        <span>{{ __('Logout') }}</span>
                    </a>
                </div>
            </li>
        </ul>
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
            <!-- Collapse header -->
            <div class="navbar-collapse-header d-md-none">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="{{ route('home') }}">
                            <img src="{{ asset('argon') }}/img/brand/blue.png">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Form -->
            {{-- <form class="mt-4 mb-3 d-md-none">
                <div class="input-group input-group-rounded input-group-merge">
                    <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="{{ __('Search') }}" aria-label="Search">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="fa fa-search"></span>
                        </div>
                    </div>
                </div>
            </form> --}}
            <!-- Navigation -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link {{ $elementActive == 'home' ? 'active' : null }}" href="{{ route('home') }}">
                        <i class="ni ni-tv-2 text-primary"></i> {{ __('Panel de Control') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ $elementActive == 'users' ? 'active' : null }}" href="#navbar-examples" data-toggle="collapse" role="button" aria-expanded="{{ $elementActive == 'users' ? true : false }}" aria-controls="navbar-examples">
                        <i class="fab fa-laravel" style="{{ $elementActive == 'users' ? 'color: #f4645f;' : '' }}"></i>
                        <span class="nav-link-text" style="{{ $elementActive == 'users' ? 'color: #f4645f;' : '' }}">{{ __('Usuarios') }}</span>
                    </a>

                    <div class="collapse {{ $elementActive == 'users' ? 'show' : null }}" id="navbar-examples">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item {{ $subElementActive == 'profile' ? 'active' : null }}">
                                <a class="nav-link" href="{{ route('profile.edit') }}">
                                    {{ __('Perfil de Usuario') }}
                                </a>
                            </li>
                            <li class="nav-item {{ $subElementActive == 'admins' ? 'active' : null }}">
                                <a class="nav-link" href="{{ route('users.index') }}">
                                    {{ __('Administradores') }}
                                </a>
                            </li>
                            <li class="nav-item {{ $subElementActive == 'teachers' ? 'active' : null }}">
                                <a class="nav-link" href="{{ route('profesores.index') }}">
                                    {{ __('Profesores') }}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link {{ $subElementActive == 'students' ? 'active' : null }}" href="{{ route('estudiantes.index') }}">
                                    {{ __('Estudiantes') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ $elementActive == 'classes' ? 'active' : null }}" href="{{ route('classes.index') }}">
                        <i class="ni ni-tv-2 text-primary"></i> {{ __('Clases') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ $elementActive == 'reports' ? 'active' : null }}" href="{{ route('reports.index') }}">
                        <i class="ni ni-tv-2 text-primary"></i>
                        <span class="nav-link-text">{{ __('Reportes') }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>