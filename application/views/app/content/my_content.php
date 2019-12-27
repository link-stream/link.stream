<?php
$data = array();
$data['title'] = 'Streamy';
$data['page'] = 'My Content';
$this->load->view('app/_inc/header', $data);
?>
<style>
    .btn{
        width: 100%;
    }
    .button {
        cursor: pointer;
        font-weight: 500;
        left: 3px;
        line-height: inherit;
        position: relative;
        text-decoration: none;
        text-align: center;
        border-style: solid;
        border-width: 1px;
        border-radius: 3px;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: inline-block;
    }

    .button--small {
        padding: 10px 20px;
        font-size: 0.875rem;
    }

    .button--green {
        outline: none;
        background-color: #64d18a;
        border-color: #64d18a;
        color: white;
        transition: all 200ms ease;
    }

    .button--green:hover {
        background-color: #8bdda8;
        color: white;
    }
    .checkbox, .radio{
        display:  inline;
    }
    .list-group-item {
        border: 0px solid rgba(0, 0, 0, 0.125);
        text-align: left;

    }
    ._embed_video_card-button{
        display:none !important;
    }
    
    ._embed_video_card-wrapper{
         display:none !important;
    }
</style>
<link rel="stylesheet" href="<?= HTTP_ASSETS ?>dist-assets/css/plugins/datatables.min.css" />
<script src="<?= HTTP_ASSETS ?>mini-music-player-master/css/styles.css"></script>
<body class="text-left">
    <div class="app-admin-wrap layout-sidebar-large">
        <?php $this->load->view('app/_inc/main-header', $data); ?>
        <?php $this->load->view('app/_inc/menu-left', $data); ?>
        <!-- =============== Left side End ================-->
        <div class="main-content-wrap sidenav-open d-flex flex-column">
            <!-- ============ Body content start ============= -->
            <div class="main-content">
                <div class="breadcrumb">
                    <h1><?= $data['page'] ?></h1>
                    <!--                    <ul>
                                            <li><a href="">Pages</a></li>
                                            <li>Blank</li>
                                        </ul>-->
                </div>
                <div class="separator-breadcrumb border-top"></div>
                <!-- end of main-content -->
                <!-- NEW CONTENT -->
                <div class="row js-streamy_list">
                    <?= (!empty($streamys_view)) ? $streamys_view : '' ?>
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end js-streamys_nav">
                        <?= (!empty($streamys_nav)) ? $streamys_nav : '' ?>
                    </ul>
                </nav>
                <!-- END NEW CONTENT -->
            </div>
            <?php $this->load->view('app/_inc/main-footer', $data); ?>
        </div>
    </div>
    <!-- Detail Modal -->
    <div class="modal fade" id="orderDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false"></div>
    <?php $this->load->view('app/_inc/footer', $data); ?>
    <script src="<?= HTTP_ASSETS ?>dist-assets/js/plugins/datatables.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>dist-assets/js/scripts/datatables.script.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>dist-assets/js/scripts/customizer.script.min.js"></script>
    <!--bootbox--> 
    <script src="<?= HTTP_ASSETS ?>vendor/bootbox-4.4.0/bootbox.min.js" type="text/javascript"></script> 

    <script src="<?= HTTP_ASSETS ?>mini-music-player-master/js/musicplayer-min.js"></script>
    <script> var urlBase = "<?= base_url(); ?>";</script>
    <script>
        $(document).ready(function () {
            $('body').on('click', '.js-edit', function (e) {
                var id = this.id;
                console.log(id);
                $.ajax({
                    type: 'post',
                    url: urlBase + "app/streamy_view",
                    data: {id: id},
                    success: function (r)
                    {
                        $('#orderDetail').html(r);
                        $('#orderDetail').modal('show');
                    }
                });
            });

            $('body').on('click', '.js-delete', function (e) {
                var id = this.id;
                bootbox.confirm('Are you sure you want to delete this content', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            dataType: 'json',
                            url: urlBase + "app/streamy_remove",
                            data: {id: id},
                            beforeSend: function () {
                                //$(".js-send").attr("disabled", "disabled");
                                //$(".js-process").attr("disabled", "disabled");
                            },
                            success: function (r)
                            {
                                if (r.status === 'Success') {
                                    //var url = urlBase + "pay?refid=" + r.id + "&cpid=" + r.payment_id;
                                    //window.open(url, '_blank');
                                    //$('#paymentModal').modal('hide');
                                    $('.js-streamy_list').html(r.streamys_view);
                                    $('.js-streamys_nav').html(r.streamys_nav);
                                }
                            },
                            error: function (textStatus, errorThrown) {
                                window.location.href = 'app/';
                            }
                        });
                    }
                });
                console.log(id);
            });

            $('body').on('click', '.js-nav_button', function (e) {
                e.preventDefault();
                var id = this.id;
                console.log(id);
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: urlBase + "app/streamy_nav_action",
                    data: {id: id},
                    beforeSend: function () {
                        //$(".js-send").attr("disabled", "disabled");
                        //$(".js-process").attr("disabled", "disabled");
                    },
                    success: function (r)
                    {
                        if (r.status === 'Success') {
                            //var url = urlBase + "pay?refid=" + r.id + "&cpid=" + r.payment_id;
                            //window.open(url, '_blank');
                            //$('#paymentModal').modal('hide');
                            $('.js-streamy_list').html(r.streamys_view);
                            $('.js-streamys_nav').html(r.streamys_nav);
                        }
                    },
                    error: function (textStatus, errorThrown) {
                        window.location.href = 'app/';
                    }
                });
            });

//            $("#my_content_update").validate({
//                onkeyup: false,
//                errorClass: "state-error",
//                validClass: "state-success",
//                errorElement: "em",
//                errorPlacement: function (label, element) {
//                    label.addClass('invalid-tooltip');
//                    label.insertAfter(element);
//                },
//                rules: {
////                    radio: {
////                        required: true
////                    },
////                    streamy_url: {
////                        required: true,
////                        url: true,
////                        url_type: "#streamy_url"
////                    },
//                    priority: {
//                        required: true
//                    },
//                    visibility: {
//                        required: true
//                    },
//                    date: {
//                        required: true,
//                        date: true
//                    },
//                    song_name: {
//                        required: true
//                    },
//                    genre: {
//                        required: true
//                    }
//                },
//                messages: {
////                username: {
////                    remote: 'User Name Already Register'
////                }
//                },
//                submitHandler: function (form) {
//                    form.submit();
//                }
//            });

            $('body').on('click', '.js-update', function (e) {
                var form_name = '#my_content_update';
                if ($(form_name).valid()) {
                    $.ajax({
                        type: 'post',
                        url: urlBase + "app/streamy_update",
                        data: $(form_name).serialize(),
                        dataType: 'json',
                        success: function (r)
                        {
                            if (r.status === 'Success') {
                                var streamy = r.streamy;
                                var card = '#card_' + streamy.id;
                                $(card + ' .ul-widget-card_title').html(streamy.type_icon + ' ' + streamy.name);
                                //$(card + ' .card-text').text(streamy.url);
                                $(card + ' .public_desc').text('Visibility: ' + streamy.public_desc);
                                $(card + ' .priority_desc').text('Priority: ' + streamy.priority_desc);
                                $(card + ' .publish_at').text('Scheduled: ' + streamy.publish_at);
                                $(card + ' .genre_desc').text(streamy.genre_desc);
                                $('#orderDetail').modal('hide');
                            }
                        },
                        error: function (textStatus, errorThrown) {
                            window.location.href = 'app/';
                        }
                    });
                }
            });

$(".example").musicPlayer();

        });
        var x = document.getElementById("myAudio");

        function playAudio() {
            console.log(x);
            x.play();
        }

        function pauseAudio() {
            x.pause();
        }
        
        


//        $(".example").musicPlayer({
//
//            autoPlay: false,
//
//            volume: 80,
//
//            loop: false,
//
//            timeSeparator: ' / ',
//
//            playerAbovePlaylist: true,
//
//            infoElements: ['title', 'artist'],
//
//            elements: ['artwork', 'information', 'controls', 'progress', 'time', 'volume'],
//
//            timeElements: ['current', 'duration'],
//
//            controlElements: ['backward', 'play', 'forward', 'stop'],
//
//        });


//$('._embed_video_card-wrapper').
//    contents().find("head").append(
//     $("<style type='text/css'>"+
//       "#tawkchat-status-text-container {"+
//         "background: url(https://example.net/img/my_mobile_bg.png) no-repeat center center blue;"+
//         "background-size: 100%;"+
//       "} "+
//       "#tawkchat-status-icon {display:none} </style>")
//   );
   
   
   //$('._embed_video_card-wrapper').addClass("tiktok");
   
//   var iframe = document.getElementsByClassName('tiktok-embed');
//   console.log(iframe);
//var style = document.createElement('style');
//style.textContent =
//  'body {' +
//  '  background-color: some-color;' +
//  '  background-image: some-image;' +
//  '}' 
//;
//iframe.contentDocument.head.appendChild(style);

    </script>
</body>
</html>