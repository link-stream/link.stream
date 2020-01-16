<?php
$data = array();
$data['title'] = 'Streamy';
$data['page'] = 'Dashboard';
$this->load->view('app/_inc/header', $data);
?>

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


                <!-- END NEW CONTENT -->
            </div>
            <?php $this->load->view('app/_inc/main-footer', $data); ?>
        </div>
    </div>
    <!-- Detail Modal -->
    <div class="modal fade" id="orderDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form action="" method="post" role="form" id="my_content_update" >
                    <input name="id" id="id" type="hidden" value="">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upgrade Your Plan</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <!--<button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>-->
                        <!--<button class="btn btn-primary ml-2 js-update" type="button">Save changes</button>-->
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php $this->load->view('app/_inc/footer', $data); ?>
    <script> var urlBase = "<?= base_url(); ?>";</script>
    <script>
        var $plan_modal = "<?= $plan_modal; ?>";
        $(document).ready(function () {
            if ($plan_modal) {
                console.log('OK');
                $('#orderDetail').modal('show');
            }
        });
    </script>    
</body>
</html>