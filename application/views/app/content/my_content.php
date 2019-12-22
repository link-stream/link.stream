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
</style>
<link rel="stylesheet" href="<?= HTTP_ASSETS ?>dist-assets/css/plugins/datatables.min.css" />
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
                        <?= (!empty($streamys_nav)) ? $streamys_nav : '<li class="page-item active"><a class="page-link" href="#">1</a></li>' ?>
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
                bootbox.confirm('Are you sure you want to process this content', function (result) {
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
        });
    </script>
</body>
</html>