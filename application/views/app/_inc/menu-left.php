<div class="side-content-wrap">
    <div class="sidebar-left open rtl-ps-none" data-perfect-scrollbar="" data-suppress-scroll-x="true">
        <ul class="navigation-left">
            <li class="nav-item" data-item="dashboard"><a class="nav-item-hold" href="#"><i class="nav-icon i-Bar-Chart"></i><span class="nav-text">Dashboard</span></a>
                <div class="triangle"></div>
            </li>
            <li class="nav-item" data-item="my_streamy"><a class="nav-item-hold" href="#"><i class="nav-icon i-File-Clipboard-File--Text"></i><span class="nav-text">My Stream</span></a>
                <div class="triangle"></div>
            </li>
            <li class="nav-item" data-item="my_content"><a class="nav-item-hold" href="#"><i class="nav-icon i-File-Clipboard-File--Text"></i><span class="nav-text">My Media</span></a>
                <div class="triangle"></div>
            </li>
            <li class="nav-item" data-item="my_link"><a class="nav-item-hold" href="#"><i class="nav-icon i-File-Clipboard-File--Text"></i><span class="nav-text">My LinkStream</span></a>
                <div class="triangle"></div>
            </li>
            <li class="nav-item" data-item="my_report"><a class="nav-item-hold" href="#"><i class="nav-icon i-File-Clipboard-File--Text"></i><span class="nav-text">My Reports</span></a>
                <div class="triangle"></div>
            </li>
        </ul>
    </div>
    <div class="sidebar-left-secondary rtl-ps-none" data-perfect-scrollbar="" data-suppress-scroll-x="true">
        <!-- Submenu Dashboards-->
        <ul class="childNav" data-parent="dashboard">
            <li class="nav-item"><a href="dashboard1.html"><i class="nav-icon i-Clock-3"></i><span class="item-name">Version 1</span></a></li>
            <li class="nav-item"><a href="dashboard2.html"><i class="nav-icon i-Clock-4"></i><span class="item-name">Version 2</span></a></li>
            <li class="nav-item"><a href="dashboard3.html"><i class="nav-icon i-Over-Time"></i><span class="item-name">Version 3</span></a></li>
            <li class="nav-item"><a href="dashboard4.html"><i class="nav-icon i-Clock"></i><span class="item-name">Version 4</span></a></li>
        </ul>
        <!-- streamy -->
        <ul class="childNav" data-parent="my_streamy">
            <!--<li class="nav-item"><a href="<?= base_url() ?>app/my_content"><i class="nav-icon i-Data-Cloud"></i><span class="item-name">Manage</span></a></li>-->
            <li class="nav-item"><a href="<?= base_url() ?><?= !empty($user['user_name']) ? $user['user_name'] : '' ?>"><i class="nav-icon i-URL-Window"></i><span class="item-name">Live View</span></a></li>
            <li class="nav-item"><a href="#"><i class="nav-icon i-Monitor-2"></i><span class="item-name">Customize</span></a></li>
        </ul>
        <!-- my_content -->
        <ul class="childNav" data-parent="my_content">
            <li class="nav-item"><a href="<?= base_url() ?>app/audio"><i class="nav-icon i-Music-Note-2"></i><span class="item-name">Add Audio</span></a></li>
            <li class="nav-item"><a href="<?= base_url() ?>app/video"><i class="nav-icon i-Film"></i><span class="item-name">Add Video</span></a></li>
<!--            <li class="nav-item"><a href="<?= base_url() ?>app/my_content_add/1"><i class="nav-icon i-Soundcloud"></i><span class="item-name">Add SoundCloud</span></a></li>
            <li class="nav-item"><a href="<?= base_url() ?>app/my_content_add/2"><i class="nav-icon i-Youtube"></i><span class="item-name">Add Youtube</span></a></li>
            <li class="nav-item"><a href="<?= base_url() ?>app/my_streamy_add"><i class="nav-icon i-Share-on-Cloud"></i><span class="item-name">Upload Files</span></a></li>-->
            <li class="nav-item"><a href="<?= base_url() ?>app/my_content"><i class="nav-icon i-Data-Cloud"></i><span class="item-name">Manage</span></a></li>

            
        </ul>
        <!-- my_content -->
        <ul class="childNav" data-parent="my_link">
            <li class="nav-item"><a href="<?= base_url() ?>app/linkstream"><i class="nav-icon i-Cloud-"></i><span class="item-name">Add Link</span></a></li>
            <!--<li class="nav-item"><a href="<?= base_url() ?>app/my_linkstream_add"><i class="nav-icon i-Cloud-"></i><span class="item-name">Add Link</span></a></li>-->
            <li class="nav-item"><a href="<?= base_url() ?>app/my_content/link"><i class="nav-icon i-Data-Cloud"></i><span class="item-name">Manage</span></a></li>

            
        </ul>





        <ul class="childNav" data-parent="forms">
            <li class="nav-item"><a href="form.basic.html"><i class="nav-icon i-File-Clipboard-Text--Image"></i><span class="item-name">Basic Elements</span></a></li>
            <li class="nav-item"><a href="form.layouts.html"><i class="nav-icon i-Split-Vertical"></i><span class="item-name">Form Layouts</span></a></li>
            <li class="nav-item"><a href="form.input.group.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">Input Groups</span></a></li>
            <li class="nav-item"><a href="form.validation.html"><i class="nav-icon i-Close-Window"></i><span class="item-name">Form Validation</span></a></li>
            <li class="nav-item"><a href="smart.wizard.html"><i class="nav-icon i-Width-Window"></i><span class="item-name">Smart Wizard</span></a></li>
            <li class="nav-item"><a href="tag.input.html"><i class="nav-icon i-Tag-2"></i><span class="item-name">Tag Input</span></a></li>
            <li class="nav-item"><a href="editor.html"><i class="nav-icon i-Pen-2"></i><span class="item-name">Rich Editor</span></a></li>
        </ul>
        <ul class="childNav" data-parent="apps">
            <li class="nav-item"><a href="invoice.html"><i class="nav-icon i-Add-File"></i><span class="item-name">Invoice</span></a></li>
            <li class="nav-item"><a href="inbox.html"><i class="nav-icon i-Email"></i><span class="item-name">Inbox</span></a></li>
            <li class="nav-item"><a href="chat.html"><i class="nav-icon i-Speach-Bubble-3"></i><span class="item-name">Chat</span></a></li>
        </ul>
        <ul class="childNav" data-parent="widgets">
            <li class="nav-item"><a href="widget-card.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">widget card</span></a></li>
            <li class="nav-item"><a href="widget-statistics.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">widget statistics</span></a></li>
            <li class="nav-item"><a href="widget-list.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">Widget List <span class="ml-2 badge badge-pill badge-danger">New</span></span></a></li>
            <li class="nav-item"><a href="widget-app.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">Widget App <span class="ml-2 badge badge-pill badge-danger"> New</span></span></a></li>
            <li class="nav-item"><a href="weather-card.html"><i class="nav-icon i-Receipt-4"></i><span class="item-name">Weather App <span class="ml-2 badge badge-pill badge-danger"> New</span></span></a></li>
        </ul>
        <!-- chartjs-->
        <ul class="childNav" data-parent="charts">
            <li class="nav-item"><a href="charts.echarts.html"><i class="nav-icon i-File-Clipboard-Text--Image"></i><span class="item-name">echarts</span></a></li>
            <li class="nav-item"><a href="charts.chartsjs.html"><i class="nav-icon i-File-Clipboard-Text--Image"></i><span class="item-name">ChartJs</span></a></li>
            <li class="nav-item dropdown-sidemenu"><a href=""><i class="nav-icon i-File-Clipboard-Text--Image"></i><span class="item-name">Apex Charts</span><i class="dd-arrow i-Arrow-Down"></i></a>
                <ul class="submenu">
                    <li><a href="charts.apexAreaCharts.html">Area Charts</a></li>
                    <li><a href="charts.apexBarCharts.html">Bar Charts</a></li>
                    <li><a href="charts.apexBubbleCharts.html">Bubble Charts</a></li>
                    <li><a href="charts.apexColumnCharts.html">Column Charts</a></li>
                    <li><a href="charts.apexCandleStickCharts.html">CandleStick Charts</a></li>
                    <li><a href="charts.apexLineCharts.html">Line Charts</a></li>
                    <li><a href="charts.apexMixCharts.html">Mix Charts</a></li>
                    <li><a href="charts.apexPieDonutCharts.html">PieDonut Charts</a></li>
                    <li><a href="charts.apexRadarCharts.html">Radar Charts</a></li>
                    <li><a href="charts.apexRadialBarCharts.html">RadialBar Charts</a></li>
                    <li><a href="charts.apexScatterCharts.html">Scatter Charts</a></li>
                    <li><a href="charts.apexSparklineCharts.html">Sparkline Charts</a></li>
                </ul>
            </li>
        </ul>
        <ul class="childNav" data-parent="extrakits">
            <li class="nav-item"><a href="image.cropper.html"><i class="nav-icon i-Crop-2"></i><span class="item-name">Image Cropper</span></a></li>
            <li class="nav-item"><a href="loaders.html"><i class="nav-icon i-Loading-3"></i><span class="item-name">Loaders</span></a></li>
            <li class="nav-item"><a href="ladda.button.html"><i class="nav-icon i-Loading-2"></i><span class="item-name">Ladda Buttons</span></a></li>
            <li class="nav-item"><a href="toastr.html"><i class="nav-icon i-Bell"></i><span class="item-name">Toastr</span></a></li>
            <li class="nav-item"><a href="sweet.alerts.html"><i class="nav-icon i-Approved-Window"></i><span class="item-name">Sweet Alerts</span></a></li>
            <li class="nav-item"><a href="tour.html"><i class="nav-icon i-Plane"></i><span class="item-name">User Tour</span></a></li>
            <li class="nav-item"><a href="upload.html"><i class="nav-icon i-Data-Upload"></i><span class="item-name">Upload</span></a></li>
        </ul>
        <ul class="childNav" data-parent="uikits">
            <li class="nav-item"><a href="alerts.html"><i class="nav-icon i-Bell1"></i><span class="item-name">Alerts</span></a></li>
            <li class="nav-item"><a href="accordion.html"><i class="nav-icon i-Split-Horizontal-2-Window"></i><span class="item-name">Accordion</span></a></li>
            <li class="nav-item"><a href="badges.html"><i class="nav-icon i-Medal-2"></i><span class="item-name">Badges</span></a></li>
            <li class="nav-item"><a href="buttons.html"><i class="nav-icon i-Cursor-Click"></i><span class="item-name">Buttons</span></a></li>
            <li class="nav-item"><a href="cards.html"><i class="nav-icon i-Line-Chart-2"></i><span class="item-name">Cards</span></a></li>
            <li class="nav-item"><a href="card.metrics.html"><i class="nav-icon i-ID-Card"></i><span class="item-name">Card Metrics</span></a></li>
            <li class="nav-item"><a href="carousel.html"><i class="nav-icon i-Video-Photographer"></i><span class="item-name">Carousels</span></a></li>
            <li class="nav-item"><a href="lists.html"><i class="nav-icon i-Belt-3"></i><span class="item-name">Lists</span></a></li>
            <li class="nav-item"><a href="pagination.html"><i class="nav-icon i-Arrow-Next"></i><span class="item-name">Paginations</span></a></li>
            <li class="nav-item"><a href="popover.html"><i class="nav-icon i-Speach-Bubble-2"></i><span class="item-name">Popover</span></a></li>
            <li class="nav-item"><a href="progressbar.html"><i class="nav-icon i-Loading"></i><span class="item-name">Progressbar</span></a></li>
            <li class="nav-item"><a href="tables.html"><i class="nav-icon i-File-Horizontal-Text"></i><span class="item-name">Tables</span></a></li>
            <li class="nav-item"><a href="tabs.html"><i class="nav-icon i-New-Tab"></i><span class="item-name">Tabs</span></a></li>
            <li class="nav-item"><a href="tooltip.html"><i class="nav-icon i-Speach-Bubble-8"></i><span class="item-name">Tooltip</span></a></li>
            <li class="nav-item"><a href="modals.html"><i class="nav-icon i-Duplicate-Window"></i><span class="item-name">Modals</span></a></li>
            <li class="nav-item"><a href="nouislider.html"><i class="nav-icon i-Width-Window"></i><span class="item-name">Sliders</span></a></li>
        </ul>
        <ul class="childNav" data-parent="sessions">
            <li class="nav-item"><a href="../sessions/signin.html"><i class="nav-icon i-Checked-User"></i><span class="item-name">Sign in</span></a></li>
            <li class="nav-item"><a href="../sessions/signup.html"><i class="nav-icon i-Add-User"></i><span class="item-name">Sign up</span></a></li>
            <li class="nav-item"><a href="../sessions/forgot.html"><i class="nav-icon i-Find-User"></i><span class="item-name">Forgot</span></a></li>
        </ul>
        <ul class="childNav" data-parent="others">
            <li class="nav-item"><a href="../sessions/not-found.html"><i class="nav-icon i-Error-404-Window"></i><span class="item-name">Not Found</span></a></li>
            <li class="nav-item"><a href="user.profile.html"><i class="nav-icon i-Male"></i><span class="item-name">User Profile</span></a></li>
            <li class="nav-item"><a class="open" href="blank.html"><i class="nav-icon i-File-Horizontal"></i><span class="item-name">Blank Page</span></a></li>
        </ul>






    </div>
    <div class="sidebar-overlay"></div>
</div>