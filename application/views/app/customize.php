<?php
$data = array();
$data['title'] = 'Streamy';
$data['page'] = 'Page Cutomize';
$this->load->view('app/_inc/header', $data);
?>
<style>
    .float {
        float: right;
        position: relative;
        z-index: 1000;
        top: 10px;
        right: 10px;
    }

    /*    .float_2 {
            float: right;
            position: relative;
            z-index: 1000;
            top: 10px;
            right: 10px;
        }*/


    .header-cover{
        z-index: 1;
    }

    /*.float:after {
      content: 'Float';
      color: red;
    }*/

    .cursor-pointer{
        cursor: pointer;
    }

    /*    .tooltip {
            position: relative;
            display: inline-block;
        }
    
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 140px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 150%;
            left: 50%;
            margin-left: -75px;
            opacity: 0;
            transition: opacity 0.3s;
        }
    
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }
    
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }*/


    /*    #sortable{
            cursor: -webkit-grab; cursor: grab;
        }*/

    /*    li:hover {
            cursor: -webkit-grab; cursor: grab; 
        }*/

    /*    li:focus {
            cursor: -webkit-grabbing; cursor: grabbing;
        }
    
        li:active {
            cursor: -webkit-grabbing; cursor: grabbing;
        }*/
    /*cursor: -webkit-grabbing; cursor: grabbing;*/

    .list-sorteable{
        cursor: -webkit-grab; cursor: grab;
        background-color: #F0F0F0;-webkit-box-shadow:  0px 0px 10px 1px rgba(0, 0, 0, .1);
        box-shadow:  0px 0px 10px 1px rgba(0, 0, 0, .1);
    }

    .list-sorteable li {

        /*width: 80px;*/
        height: 80px;
        /*    overflow: hidden;
            margin: auto;
                margin-bottom: auto;
            border-radius: 50%;*/

    }

    /*    .list-sorteable li{
           
            box-shadow: 0 0 5px black;
        }*/
</style>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!--<link rel="stylesheet" href="/resources/demos/style.css">-->
<style>
    /*  #sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
      #sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; }
      #sortable li span { position: absolute; margin-left: -1.3em; }*/
</style>

<link rel="stylesheet" href="<?= HTTP_ASSETS ?>bootstrap-fileinput-master/css/fileinput.min.css" />
<link rel="stylesheet" href="<?= HTTP_ASSETS ?>Croppie-master/croppie.css" />

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
                <div class="card user-profile o-hidden mb-4">
<!--<div class="header-cover" style="background-image: url('<?= HTTP_ASSETS ?>dist-assets/images/photo-wide-4.jpg')"></div>-->
                    <div class="header-cover" style="background-image: url('<?= base_url() . 'app/get_banner' ?>')">
                        <div class="float"><button class="btn btn-icon-text btn-secondary js_banner-edit"><i class="fa fa-camera" aria-hidden="true"></i> Update Header</button> </div>

                    </div>
                    <!--<div class="user-info"><img class="profile-picture avatar-lg mb-2" src="<?= HTTP_ASSETS ?>dist-assets/images/faces/1.jpg" alt="" />-->
                    <div class="user-info"><img class="profile-picture avatar-lg mb-2" src="<?= base_url() . 'app/get_avatar' ?>" alt="" />
                        <p class="m-0 text-24"><?= $user['company'] ?></p>
                        <p class="text-muted m-0"><?= $user['slogan'] ?></p>
                        <div class=""><button class="btn btn-icon-text btn-secondary btn-sm js_avatar-edit"><i class="fa fa-camera" aria-hidden="true"></i> Update Avatar</button> </div>
                    </div>
                    <div class="card-body">
                        <ul class="nav nav-tabs profile-nav mb-4" id="profileTab" role="tablist">
                            <li class="nav-item"><a class="nav-link active" id="timeline-tab" data-toggle="tab" href="#url" role="tab" aria-controls="timeline" aria-selected="false">My URL</a></li>
                            <li class="nav-item"><a class="nav-link" id="friends-tab" data-toggle="tab" href="#friends" role="tab" aria-controls="friends" aria-selected="false">Content Order</a></li>
                            <!--<li class="nav-item"><a class="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="false">Avatar & Banner</a></li>-->
                            <li class="nav-item"><a class="nav-link" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">Profile</a></li>

                            <!--<li class="nav-item"><a class="nav-link" id="photos-tab" data-toggle="tab" href="#photos" role="tab" aria-controls="photos" aria-selected="false">Photos</a></li>-->
                        </ul>




                        <div class="tab-content" id="profileTabContent">
                            <div class="tab-pane fade active show" id="url" role="tabpanel" aria-labelledby="timeline-tab">
                                <div class="row">
                                    <label for="basic-url">Your streamy URL</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon3"><?= base_url() ?></span></div>
                                        <input class="form-control" id="basic-url" type="text" aria-describedby="basic-addon3" value="<?= $user['url'] ?>" />
                                        <div class="input-group-append">
                                            <!--<button class="btn btn-icon-text btn-success" type="button">Copy</button>--> 
                                            <button class="btn btn-icon-text btn-success"  id="copyButton">Copy</button>
                                        </div>
                                    </div>

                                    <div class="col-md-12 text-center p-3">
                                        <button class="btn btn-icon-text btn-warning">Update
                                        </button> 
                                    </div>




                                </div>


                            </div>
                            <div class="tab-pane fade  show" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                                <div class="row">
                                    <div class="col-md-6 text-left p-3">
                                        <div class="form-group text-center">
                                            <label for="input_b1">Avatar</label>
                                            <input id="input_b1" name="input_b1" type="file" class="file" data-browse-on-zone-click="true">
                                        </div>
                                        <div class="demo" id="upload-demo">
<!--                                            <input type="file" id="upload">
                                            <br/>
                                            <button class="btn btn-success upload-result">Upload Image</button>-->
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-left p-3">
                                        <div class="form-group text-center">
                                            <label for="input_b2">Banner</label>
                                            <input id="input_b2" name="input_b2" type="file" class="file" data-browse-on-zone-click="true">  
                                        </div>

                                    </div>
                                    <div class="col-md-12 text-center p-3">
                                        <button class="btn btn-icon-text btn-warning">Update
                                        </button> 
                                    </div>





                                </div>


                                <!--                                <ul class="timeline clearfix">
                                                                    <li class="timeline-line"></li>
                                                                    <li class="timeline-item">
                                                                        <div class="timeline-badge"><i class="badge-icon bg-primary text-white i-Cloud-Picture"></i></div>
                                                                        <div class="timeline-card card">
                                                                            <div class="card-body">
                                                                                <div class="mb-1"><strong class="mr-1">Timothy Carlson</strong> added a new photo
                                                                                    <p class="text-muted">3 hours ago</p>
                                                                                </div><img class="rounded mb-2" src="../../dist-assets/images/photo-wide-1.jpg" alt="" />
                                                                                <div class="mb-3"><a class="mr-1" href="#">Like</a><a href="#">Comment</a></div>
                                                                                <div class="input-group">
                                                                                    <input class="form-control" type="text" placeholder="Write comment" aria-label="comment" />
                                                                                    <div class="input-group-append">
                                                                                        <button class="btn btn-primary" id="button-comment1" type="button">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li class="timeline-item">
                                                                        <div class="timeline-badge"><img class="badge-img" src="../../dist-assets/images/faces/1.jpg" alt="" /></div>
                                                                        <div class="timeline-card card">
                                                                            <div class="card-body">
                                                                                <div class="mb-1"><strong class="mr-1">Timothy Carlson</strong> updated his sattus
                                                                                    <p class="text-muted">16 hours ago</p>
                                                                                </div>
                                                                                <p>
                                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dicta beatae illo illum iusto iste mollitia explicabo quam officia. Quas ullam, quisquam architecto aspernatur enim iure debitis dignissimos suscipit
                                                                                    ipsa.
                                                                                </p>
                                                                                <div class="mb-3"><a class="mr-1" href="#">Like</a><a href="#">Comment</a></div>
                                                                                <div class="input-group">
                                                                                    <input class="form-control" type="text" placeholder="Write comment" aria-label="comment" />
                                                                                    <div class="input-group-append">
                                                                                        <button class="btn btn-primary" id="button-comment2" type="button">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                                <ul class="timeline clearfix">
                                                                    <li class="timeline-line"></li>
                                                                    <li class="timeline-group text-center">
                                                                        <button class="btn btn-icon-text btn-primary"><i class="i-Calendar-4"></i> 2018</button>
                                                                    </li>
                                                                </ul>
                                                                <ul class="timeline clearfix">
                                                                    <li class="timeline-line"></li>
                                                                    <li class="timeline-item">
                                                                        <div class="timeline-badge"><i class="badge-icon bg-danger text-white i-Love-User"></i></div>
                                                                        <div class="timeline-card card">
                                                                            <div class="card-body">
                                                                                <div class="mb-1"><strong class="mr-1">New followers</strong>
                                                                                    <p class="text-muted">2 days ago</p>
                                                                                </div>
                                                                                <p><a href="#">Henry krick</a> and 16 others followed you</p>
                                                                                <div class="mb-3"><a class="mr-1" href="#">Like</a><a href="#">Comment</a></div>
                                                                                <div class="input-group">
                                                                                    <input class="form-control" type="text" placeholder="Write comment" aria-label="comment" />
                                                                                    <div class="input-group-append">
                                                                                        <button class="btn btn-primary" id="button-comment3" type="button">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li class="timeline-item">
                                                                        <div class="timeline-badge"><i class="badge-icon bg-primary text-white i-Cloud-Picture"></i></div>
                                                                        <div class="timeline-card card">
                                                                            <div class="card-body">
                                                                                <div class="mb-1"><strong class="mr-1">Timothy Carlson</strong> added a new photo
                                                                                    <p class="text-muted">2 days ago</p>
                                                                                </div><img class="rounded mb-2" src="../../dist-assets/images/photo-wide-2.jpg" alt="" />
                                                                                <div class="mb-3"><a class="mr-1" href="#">Like</a><a href="#">Comment</a></div>
                                                                                <div class="input-group">
                                                                                    <input class="form-control" type="text" placeholder="Write comment" aria-label="comment" />
                                                                                    <div class="input-group-append">
                                                                                        <button class="btn btn-primary" id="button-comment4" type="button">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>-->
                                <!--                                <ul class="timeline clearfix">
                                                                    <li class="timeline-line"></li>
                                                                    <li class="timeline-group text-center">
                                                                        <button class="btn btn-icon-text btn-warning"><i class="i-Calendar-4"></i> Update
                                                                        </button>
                                                                    </li>
                                                                </ul>-->
                            </div>
                            <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
                                <label for="basic-url">Slogan</label>
                                <div class="input-group mb-3">
                                    <!--<div class="input-group-prepend"><span class="input-group-text" id="basic-addon3">https://streamy.link/</span></div>-->
                                    <input class="form-control" id="slogan" type="text" aria-describedby="basic-addon3" value="<?= $user['slogan'] ?>" />
                                    <!--<div class="input-group-append"><span class="input-group-text">Copy</span></div>-->
                                </div>
                                <label for="basic-url">Display Name</label>
                                <div class="input-group mb-3">
                                    <!--<div class="input-group-prepend"><span class="input-group-text" id="basic-addon3">https://streamy.link/</span></div>-->
                                    <input class="form-control" id="company" type="text" aria-describedby="basic-addon3" value="<?= $user['company'] ?>" />
                                    <!--<div class="input-group-append"><span class="input-group-text">Copy</span></div>-->
                                </div>
                                <h4>Bio:</h4>
                                <div class="form-group">
                                    <!--<label for="exampleFormControlTextarea1">Example textarea</label>-->
                                    <textarea class="form-control" id="bio" rows="3">May I have your attention, please?
May I have your attention, please?
Will the real Slim Shady please stand up?
I repeat, will the real Slim Shady please stand up?
We're gonna have a problem here
                                    </textarea>
                                </div>
                                <hr />
                                <h4>Social Network</h4>
                                <!--                                <div class="form-group text-center">
                                                                    <label id="streamy_url_label" for="streamy_url">Facebook</label>
                                                                    <input class="form-control" type="text" id="streamy_url" name="streamy_url" placeholder="www.facebook.com" required="" value=""/>
                                                                </div>-->
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" for="facebook">Facebook</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="facebook" type="text" placeholder="www.facebook.com"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" for="instagram">Instagram</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="instagram" type="text" placeholder="www.instagram.com"/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" for="youtube">Youtube</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="youtube" type="text" placeholder="www.youtube.com"/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" for="twitter">Twitter</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="twitter" type="text" placeholder="www.twitter.com"/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="col-lg-6">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" for="soundcloud">Soundcloud</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="soundcloud" type="text" placeholder="www.soundcloud.com"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-center p-3">
                                        <button class="btn btn-icon-text btn-warning">Update
                                        </button> 
                                    </div>
                                </div>
                                <!--                                <hr />
                                                                <div class="row">
                                                                    <div class="col-md-4 col-6">
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Calendar text-16 mr-1"></i> Birth Date</p><span>1 Jan, 1994</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Edit-Map text-16 mr-1"></i> Birth Place</p><span>Dhaka, DB</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Globe text-16 mr-1"></i> Lives In</p><span>Dhaka, DB</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4 col-6">
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-MaleFemale text-16 mr-1"></i> Gender</p><span>1 Jan, 1994</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-MaleFemale text-16 mr-1"></i> Email</p><span>example@ui-lib.com</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Cloud-Weather text-16 mr-1"></i> Website</p><span>www.ui-lib.com</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4 col-6">
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Face-Style-4 text-16 mr-1"></i> Profession</p><span>Digital Marketer</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Professor text-16 mr-1"></i> Experience</p><span>8 Years</span>
                                                                        </div>
                                                                        <div class="mb-4">
                                                                            <p class="text-primary mb-1"><i class="i-Home1 text-16 mr-1"></i> School</p><span>School of Digital Marketing</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <h4>Other Info</h4>
                                                                <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore labore reiciendis ab quo ducimus reprehenderit natus debitis, provident ad iure sed aut animi dolor incidunt voluptatem. Blanditiis, nobis aut.</p>
                                                                <div class="row">
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Plane text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Travelling</p>
                                                                    </div>
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Camera text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Photography</p>
                                                                    </div>
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Car-3 text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Driving</p>
                                                                    </div>
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Gamepad-2 text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Gaming</p>
                                                                    </div>
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Music-Note-2 text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Music</p>
                                                                    </div>
                                                                    <div class="col-md-2 col-sm-4 col-6 text-center"><i class="i-Shopping-Bag text-32 text-primary"></i>
                                                                        <p class="text-16 mt-1">Shopping</p>
                                                                    </div>
                                                                </div>-->
                            </div>
                            <div class="tab-pane fade" id="friends" role="tabpanel" aria-labelledby="friends-tab">
                                <div class="row">
                                    <div class="col-md-12 text-center mb-4">
                                        <h4>Drag to Order Your Content</h4>
                                    </div> 
                                </div>


                                <ul id="sortable" class="list-group list-sorteable">
                                    <li class="list-group-item"><i class="fa fa-bars"></i>&nbsp;&nbsp;<img src="<?= HTTP_ASSETS ?>images/logo/sc.png" alt="" height="40px"/> SoundCloud</li>
                                    <li class="list-group-item"><i class="fa fa-bars"></i>&nbsp;&nbsp;<img src="<?= HTTP_ASSETS ?>images/logo/yb.png" alt="" height="40px"/> Youtube</li>
                                    <li class="list-group-item"><i class="fa fa-bars"></i>&nbsp;&nbsp;<img src="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" alt="" height="40px"/> Streamy</li>
                                    <li class="list-group-item"><i class="fa fa-bars"></i>&nbsp;&nbsp;<img src="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" alt="" height="40px"/> LinkStreams</li>
                                </ul>



                                <!--                                <div class="row list"  id="list1">
                                
                                
                                                                    <div class="col-md-12 js-view cursor-pointer">
                                                                        <div class="card card-profile-1 mb-4">
                                                                            <div class="mt-3 ml-3">
                                                                               <i class="i-Drag text-16 mr-1"></i> 
                                                                                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                
                                                                            </div>
                                                                            <div class="card-body text-center">
                                
                                                                                <div class="avatar box-shadow-2 mb-3"><img src="<?= HTTP_ASSETS ?>images/logo/sc.png" alt="" /></div>
                                                                                <h5 class="m-0">SoundCloud</h5>
                                                                                <p class="mt-0">UI/UX Designer</p>
                                                                                <p>Embeed your SoundCloud Content</p>
                                                                                <button class="btn btn-primary btn-rounded js-up">UP</button> <button class="btn btn-primary btn-rounded js-down">Down</button>
                                                                                <div class="card-socials-simple mt-4"><a href=""><i class="i-Linkedin-2"></i></a><a href=""><i class="i-Facebook-2"></i></a><a href=""><i class="i-Twitter"></i></a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12 js-view cursor-pointer">
                                                                        <div class="card card-profile-1 mb-4">
                                                                            <div class="mt-3 ml-3">
                                                                               <i class="i-Drag text-16 mr-1"></i> 
                                                                                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                
                                                                            </div>
                                                                            <div class="card-body text-center">
                                                                                <div class="avatar box-shadow-2 mb-3"><img src="<?= HTTP_ASSETS ?>images/logo/yb.png" alt="" /></div>
                                                                                <h5 class="m-0">Youtube</h5>
                                                                                <p class="mt-0">UI/UX Designer</p>
                                                                                <p>Embeed your Youtube Content</p>
                                                                                <button class="btn btn-primary btn-rounded js-up">UP</button> <button class="btn btn-primary btn-rounded js-down">Down</button>
                                                                                <div class="card-socials-simple mt-4"><a href=""><i class="i-Linkedin-2"></i></a><a href=""><i class="i-Facebook-2"></i></a><a href=""><i class="i-Twitter"></i></a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                
                                                                    <div class="col-md-12 js-view cursor-pointer">
                                                                        <div class="card card-profile-1 mb-4">
                                                                            <div class="mt-3 ml-3">
                                                                               <i class="i-Drag text-16 mr-1"></i> 
                                                                                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                
                                                                            </div>
                                                                            <div class="card-body text-center">
                                                                                <div class="avatar box-shadow-2 mb-3"><img src="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" alt="" /></div>
                                                                                <h5 class="m-0">Streamy</h5>
                                                                                <p class="mt-0">UI/UX Designer</p>
                                                                                <p>Stream your Streamy Content</p>
                                                                                <button class="btn btn-primary btn-rounded js-up">UP</button> <button class="btn btn-primary btn-rounded js-down">Down</button>
                                                                                <div class="card-socials-simple mt-4"><a href=""><i class="i-Linkedin-2"></i></a><a href=""><i class="i-Facebook-2"></i></a><a href=""><i class="i-Twitter"></i></a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12 js-view cursor-pointer">
                                                                        <div class="card card-profile-1 mb-4">
                                                                            <div class="mt-3 ml-3">
                                                                               <i class="i-Drag text-16 mr-1"></i> 
                                                                                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                
                                                                            </div>
                                                                            <div class="card-body text-center">
                                                                                <div class="avatar box-shadow-2 mb-3"><img src="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" alt="" /></div>
                                                                                <h5 class="m-0">LinkStreams</h5>
                                                                                <p class="mt-0">UI/UX Designer</p>
                                                                                <p>Show your LinkStreams Content</p>
                                                                                <button class="btn btn-primary btn-rounded js-up">UP</button> <button class="btn btn-primary btn-rounded js-down">Down</button>
                                                                                <div class="card-socials-simple mt-4"><a href=""><i class="i-Linkedin-2"></i></a><a href=""><i class="i-Facebook-2"></i></a><a href=""><i class="i-Twitter"></i></a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>-->
                                <div class="row">
                                    <div class="col-md-12 text-center p-3">
                                        <button class="btn btn-icon-text btn-warning">Update
                                        </button> 
                                    </div>
                                </div>
                            </div>
<!--                            <div class="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i>12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="../../dist-assets/images/products/headphone-2.jpg" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i>12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="../../dist-assets/images/products/headphone-3.jpg" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i>12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="../../dist-assets/images/products/iphone-1.jpg" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i>12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="../../dist-assets/images/products/iphone-2.jpg" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i>12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card text-white o-hidden mb-3"><img class="card-img" src="../../dist-assets/images/products/watch-1.jpg" alt="" />
                                            <div class="card-img-overlay">
                                                <div class="p-1 text-left card-footer font-weight-light d-flex"><span class="mr-3 d-flex align-items-center"><i class="i-Speach-Bubble-6 mr-1"></i> 12</span><span class="d-flex align-items-center"><i class="i-Calendar-4 mr-2"></i>03.12.2018</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>

                <!-- END NEW CONTENT -->
            </div>
            <?php $this->load->view('app/_inc/main-footer', $data); ?>
        </div>
    </div>
    <?php $this->load->view('app/_inc/footer', $data); ?>
    <script src="<?= HTTP_ASSETS ?>bootstrap-fileinput-master/js/fileinput.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>js/Sortable.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="<?= HTTP_ASSETS ?>Croppie-master/croppie.js"></script>
    <script> var urlBase = "<?= base_url(); ?>";</script>
    <script>
        $("#input_b1").fileinput({
            rtl: true,
            dropZoneEnabled: false,
            allowedFileExtensions: ["jpg", "png", "gif", "jpeg"],
            showUpload: false,
            mainClass: "input-group-lg",
            showPreview: false
        });

        $("#input_b2").fileinput({
            rtl: true,
            //showCaption: false,
            dropZoneEnabled: false,
            allowedFileExtensions: ["jpg", "png", "gif", "jpeg"],
            showUpload: false,
            mainClass: "input-group-lg",
            showPreview: true

        });
        $(document).ready(function () {

            $(function () {
                $("#sortable").sortable();
                $("#sortable").disableSelection();
            });



            $('.list-sorteable').mousedown(function () {
                //console.log('D');
                $(this).css('cursor', 'grabbing');
            });
            $('.list-sorteable').mouseup(function () {
                //console.log('E');
                $(this).css('cursor', 'grab');
            });

            $('#copyButton').click(function () {
                var $txt = urlBase + $('#basic-url').val();
                copyToClipboard($txt);
            });

            function copyToClipboard(text) {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(text).select();
                document.execCommand("copy");
                $temp.remove();
            }

            $uploadCrop = $('#upload-demo').croppie({
                enableExif: true,
                viewport: {
                    width: 200,
                    height: 200,
                    type: 'circle'
                },
                boundary: {
                    width: 300,
                    height: 300
                }
            });

            //$('#upload-demo').croppie('bind');



            $('#input_b1').on('change', function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    }).then(function () {
                        console.log('jQuery bind complete');
                    });

                }
                reader.readAsDataURL(this.files[0]);
            });

            $('.upload-result').on('click', function (ev) {
                $uploadCrop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (resp) {

                    $.ajax({
                        url: "components/testcrop.php",
                        type: "POST",
                        data: {"image": resp},
                        success: function (data) {
                            if (data == 'Image Uploaded Successfully') {
                                html = '<img src="' + resp + '" />';
                                $("#upload-demo-i").html(html);
                            } else {
                                $("body").append("<div class='upload-error'>" + data + "</div>");

                            }
                        }
                    });
                });
            });

            $('.js_banner-edit').on('click', function () {
                console.log('EDIT');
            });


        });




    </script>
</body>
</html>