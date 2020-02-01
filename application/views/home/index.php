<?php
$data = array();
$this->load->view('home/_inc/header', $data);
?>
<body data-spy="scroll" data-target=".scrollspy" class="bg-dark" style="overflow:  auto !important">

    <!-- Preloader  -->
    <!--    <div class="loader bg-dark">
            <div class="loader-inner ball-scale-ripple-multiple ball-scale-ripple-multiple-color">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>-->
    <!-- /End Preloader  -->


    <div id="page">

        <!-- ============================
             BG & Overlays
        ================================= -->

        <!-- Solid BG -->
        <div class="section-overlay bg-solid-color overlay-opacity"></div>
        <!-- /End Solid BG -->

        <!-- Modal -->
        <div id="modal-notify" class="modal fade modal-scale" tabindex="-1" role="dialog"
             aria-labelledby="meinModalLabel">

            <!-- .modal-dialog -->
            <div class="modal-dialog" role="document">
                <div>

                    <!-- .modal-content -->
                    <div class="modal-content text-center bg-dark text-light">
                        <button class="button-close" data-dismiss="modal" aria-label="Close"><i
                                class="icon icon-lg icon-arrows-remove"></i></button>


                        <!-- Headline -->
                        <div class="wrap-line border-dark">
                            <h3>Free <span class="font-weight-200">Early Access</span></h3>
                        </div>
                        <!-- /End Headline -->

                        <!-- Description -->
                        <div class="p-t-b-15">
                            <p>Sign-up for free early access to the Streamy platform with your phone or email, and we'll let you know when you can Start <u>Your</u> Stream.</p>
                        </div>
                        <!-- /End Description -->

                        <div class="p-t-b-30">

                            <!-- Newsletter Form:
                             alternative newsletter form via email;
                             write your email in newsletter-process.php and use:
                             <form action="php/newsletter-process.php" id="newsletter-form" method="post"> insted of
                             <form id="mc-form"> -->
                            <form id="mc-form" action="">

                                <input type="text" class="form-control form-control-custom" tabindex="-1"
                                       id="text-field-nl" name="text-field-nl">

                                <!-- Input Group -->
                                <div class="input-group">
                                    <input type="email" id="email" class="form-control form-control-light"
                                           name="email"
                                           placeholder="Enter your Email here...">
                    <!--                  <span class="input-group-btn">
                                          <button type="button" class="btn btn-color js-email"><i
                                            class="icon icon-sm icon-arrows-slim-right-dashed"></i>
                                        </button>
                                      </span>-->
                                </div>
                                <div class="input-group">
                                    <input type="text" id="phone" class="form-control form-control-light"
                                           name="phone"
                                           placeholder="Enter your Phone here...">
                    <!--                  <span class="input-group-btn">
                                          <button type="button" class="btn btn-color js-email"><i
                                            class="icon icon-sm icon-arrows-slim-right-dashed"></i>
                                        </button>
                                      </span>-->
                                </div>
                                <div class="p-t-b-10">
                                    <p class="text-center" style="font-size: 0.75em;">I agree to receive email, SMS (text), and alert notifications from Streamy. Carrier fees may apply.</p>
                                </div>
                                <br>
                                <button type="button" class="btn btn-color js-email">Get Early Access
                                </button>
                                <!-- /End Input Group -->

                                <!-- Message Alert -->
                                <div id="message-newsletter" class="message-wrapper text-white message">

                                    <span><i class="icon icon-sm icon-arrows-slim-right-dashed"></i><label
                                            class="message-text" for="email"></label></span>
                                </div>
                                <!-- /End Message Alert -->
                                <div class="p-t-30">
                                    <p>
                                        <a href="<?= base_url() . 'legal' ?>" target="_blank" class="link-white">Privacy Policy</a>
                                    </p>
                                </div>
                            </form>
                            <!-- /End Newsletter Form -->

                        </div>
                    </div>

                </div>
                <!-- /End .modal-content -->
            </div>
            <!-- /End .modal-dialog -->
        </div>
        <!-- /End Modal -->

        <div class="container-fluid">
            <div class="row">


                <!-- ============================
                     Info
                ================================= -->

                <div id="info" class="col-md-12 text-white text-center  col-transform">
                    <div class="vert-middle">
                        <div class="reveal scale-out">

                            <!-- Logo -->
                            <div class="p-t-b-15">
                                <img src="<?= HTTP_ASSETS ?>solid-bg/images/streamy_logo_vertical_negative_RGB.png" width="180px" alt="streamy logo">
                            </div>
                            <!-- /End Logo -->

                            <div class="p-t-b-15">
                                <!-- Headline & Description -->
                                <h2><span class="font-weight-200">Your streams come true </span><br>Spring 2020</h2>

<!--                                <p>Musicians, Podcasters, YouTubers, Creators and Streamers: <br>Lead the wave with free early access to Streamy in Spring 2020.<br>
                                </p>-->
                                <!-- /End Headline & Description -->
                            </div>
                            <!-- Arrow 
                            -->                            
                            <div class="p-t-b-20">
                                <div class="row">
                                    <div class="col-md-3">

                                    </div>
                                    <div class="video col-md-6">
                                        <!--<button class="active button_video">play</button>-->
                                        <video id="video" width="100%" height="100%" controls poster="<?= HTTP_ASSETS ?>solid-bg/images/poster-image-for-video.jpg">
                                            <source src="<?= HTTP_ASSETS ?>solid-bg/images/streamy_early_reg_video_2.mp4" type="video/mp4">
                                            <source src="<?= HTTP_ASSETS ?>solid-bg/images/streamy_early_reg_video_2.ogg" type="video/ogg">
                                            Your browser does not support the video tag.
                                        </video>
                                        <!--<div class="playpause"></div>-->
                                    </div>
                                    <!--<button type="button" id="play_button">Play</button>-->
                                    <div class="col-md-3">

                                    </div>
                                </div>

            <!--                              <i class="icon icon-sm icon-arrows-slim-down-dashed"></i>-->

                            </div><!--
                             /End Arrow -->
                            <div class="p-t-b-15">
                                <!-- Headline & Description -->
                                <h2><span class="font-weight-200">Get a <strong>Free PRO Account</strong> For Life! - TEST 001</span></h2>
                                <div class="row text-justify">
                                    <div class="col-md-3">

                                    </div>

                                    <div class="col-md-6">
                                        <p>Early registration for Artists is now open! Click the button below to enter your information and you will receive a notification when early access is live. Also, when you sign-up early you're guaranteed a free Pro account for life, including INSTANT access to our proprietary <strong>LinkStream</strong> tool. </p>
                                        <br>
                                        <p><strong>LinkStream</strong> will enable you to actually stream your music and beats from multiple platforms (e.g. SoundCloud, YouTube) to multiple platforms (e.g. Instagram) with one easy-to-use link.</p>
                                        <br>
                                        <p>We need you early birds to spread the word to other Artists, because once enough artists get their <strong>LinkStream's</strong> setup we can launch the <strong>Streamy</strong> mobile app to your audiences.</p>

                                    </div>
                                    <div class="col-md-3">

                                    </div>
                                </div>
                                <!-- /End Headline & Description -->
                            </div>
                            <!-- Buttons -->
                            <div class="p-t-b-15 btn-row">
                                <button class="btn btn-color" data-toggle="modal"
                                        data-target="#modal-notify"
                                        role="button">&#128588; Get Early Access &#128588;
                                </button>
                                <!-- <a class="btn btn-border-white show-info"
                                   role="button" data-href="#content">
                                  More info
                                </a> -->
                            </div>
                            <!-- /End Buttons -->

                            <!-- Social Media Links -->
                            <div class="p-t-b-30">
                                <p>
                                    <a href="https://www.instagram.com/streamy.link" target="_blank" class="link-white"><i
                                            class="fa fa-instagram"></i>Join the fam on Instgram!</a>&nbsp&nbsp&nbsp    
                                    <!--               <a href="#" class="link-white">Legal Content</a>-->
                                                     <!--<a href="https://plus.google.com" class="link-white"><i
                                                        class="fa fa-google-plus"></i></a>
                                                    <a href="https://www.behance.net/egotype" class="link-white"><i
                                                        class="fa fa-behance"></i></a> -->
                                </p>
                            </div>
                            <!-- Social Media Links -->
                            <!-- Social Media Links -->
                            <div class="p-t-b-1">
                                <p>
                                    ©2020 Streamy LLC. All Rights Reserved.
                                </p><br><br>
                            </div>
                            <!-- Social Media Links -->

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
    <!-- /#page -->
    <div id="photoswipe"></div>

    <!-- Scripts -->
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/jquery-1.12.4.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/bootstrap.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/scrollreveal.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/contact-form.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/newsletter-form.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/jquery.ajaxchimp.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/photoswipe/photoswipe.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/photoswipe/photoswipe-ui-default.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/jquery.countdown.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/plugins/prefixfree.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>jquery-validation-1.19.1/dist/jquery.validate.min.js"></script>
    <script src="<?= HTTP_ASSETS ?>jquery-validation-1.19.1/dist/additional-methods.min.js"></script>

    <script> var urlBase = "<?= base_url(); ?>";</script>

    <!-- Custom Script -->
    <script src="<?= HTTP_ASSETS ?>solid-bg/js/custom.js"></script>


</body>
</html>
