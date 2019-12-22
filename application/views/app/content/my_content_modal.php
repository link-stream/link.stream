<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Streamy Edit</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        </div>
        <div class="modal-body">
            <p>URL: <?= $url ?></p>
            <p>Type: <?= $type_desc ?></p>
            <div class="col-md-12 text-left">
                <div class="row">

                    <div class="col-md-4 form-group mb-3">
                        <label for="priority">Priority</label>
                        <select class="form-control" id="priority" name="priority">
                            <option value="1" <?= ($priority == '1') ? 'selected=""' : '' ?>>Top</option>
                            <option value="2" <?= ($priority == '2') ? 'selected=""' : '' ?>>Normal</option>
                            <option value="3"<?= ($priority == '3') ? 'selected=""' : '' ?>>Low</option>
                        </select>
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="visibility">Visibility</label>
                        <select class="form-control" id="visibility" name="visibility">
                            <option value="1" <?= ($public == '1') ? 'selected=""' : '' ?>>Public</option>
                            <option value="2" <?= ($public == '2') ? 'selected=""' : '' ?>>Private</option>
                        </select>
                    </div>
                    <div class="col-md-4 form-group mb-3">
                        <label for="date">Schedule</label>
                        <input class="form-control" id="date"  name="date" type="text" placeholder="Date" value="<?= $publish_at ?>"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <!--<button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>-->
            <button class="btn btn-primary ml-2" type="button">Save changes</button>
        </div>
    </div>
</div>