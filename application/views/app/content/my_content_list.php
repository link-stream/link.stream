<?php
if (!empty($streamys)) {
    foreach ($streamys as $streamy) {
        ?>
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card text-center" id="card_3">
                <div class="card-body">
                    <h2 class="ul-widget-card__title"><?= $streamy['name'] ?></h2>
                    <p class="card-text text-mute"><?= $streamy['url'] ?></p>
                    <div class="col-md-12 text-left p-0">
                        <div class="card mb-2">
                            <div class="card-body p-0">
                                <div class="<?= ($streamy['type'] == '1' || $streamy['type'] == '2' ) ? 'embed-responsive embed-responsive-16by9 z-depth-1-half js-streamy_content' : '' ?>">
                                    <?= $streamy['embeed'] ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 text-left p-1">
                        <div class="row">
                            <div class="col-md-6 text-mute "><?= $streamy['type_desc'] ?></div>
                            <div class="col-md-6 text-mute ">View: <?= $streamy['public_desc'] ?></div>
                            <div class="col-md-6 text-mute ">Priority: <?= $streamy['priority_desc'] ?></div>
                            <div class="col-md-6 text-mute ">Publish: <?= $streamy['publish_at'] ?></div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-3">

                        </div>
                        <div class="col-6">
                            <button class="btn btn-success m-1 js-edit" id="<?= $streamy['id'] ?>" type="button"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-danger m-1 js-delete" id="<?= $streamy['id'] ?>" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
?>
 