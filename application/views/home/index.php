<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

        <!-- Title of Website -->
        <title>Streamy – Your Streams Come True (Spring 2020)</title>

        <meta name="description"
              content="Coming Soon Landing Page"/>
        <meta name="keywords"
              content="Kounter, html theme, Coming Soon Landing Page, Coming Soon Landing Page template, html landing page, one page, responsive landing page"/>
        <meta name="author" content="Egotype">

        <!-- Favicon -->
        <link rel="icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color.png" type="image/png">
        <link rel="apple-touch-icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color.png">
        <link rel="shortcut icon" href="<?= HTTP_ASSETS ?>images/favicon/streamy_favicon_color_BkH_icon.ico" type="image/x-icon">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/plugins/bootstrap.min.css">

        <!-- Font Icons -->
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/icons/font-awesome.css">
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/icons/linea.css">

        <!-- Google Fonts -->
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700">

        <!-- Plugins CSS -->
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/plugins/loaders.min.css">
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/plugins/photoswipe.css">
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/icons/photoswipe/icons.css">


        <!-- Custom CSS -->
        <link rel="stylesheet" href="<?= HTTP_ASSETS ?>solid-bg/css/style.css">

        <!-- Responsive CSS -->
        <link href="<?= HTTP_ASSETS ?>solid-bg/css/responsive.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>
    <body data-spy="scroll" data-target=".scrollspy" class="bg-dark">

        <!-- Preloader  -->
        <div class="loader bg-dark">
            <div class="loader-inner ball-scale-ripple-multiple ball-scale-ripple-multiple-color">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
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

            <!-- ============================
                 Header Navigation
            ================================= -->

            <!--  <header>
                <nav class="navbar navbar-fixed-top">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-12 text-white col-transform">
                        <div class="navbar-wrapper">
            
                           Navbar Button 
                          <button class="navbar-button show-info" data-href="#content">
                            <span></span>
                            <span></span>
                            <span></span>
                          </button>
                           /End Navbar Button 
            
                           Navbar Links 
                          <div class="navbar-links scrollspy">
                            <ul class="nav">
                              <li><a class="smooth-scroll link-white" href="#about">About</a></li>
                              <li><a class="smooth-scroll link-white" href="#contact">Contact</a></li>
                            </ul>
                          </div>
                           /End Navbar Links 
            
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>-->

            <div class="container-fluid">
                <div class="row">


                    <!-- ============================
                         Info
                    ================================= -->

                    <div id="info" class="col-md-12 text-white text-center page-info col-transform">
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

                                    <p>Musicians, Podcasters, YouTubers, Creators and Streamers: <br>Lead the wave with free early access to Streamy in Spring 2020.<br>
                                    </p>
                                    <!-- /End Headline & Description -->
                                </div>
                                <!-- Arrow 
                                <div class="p-t-b-20">
                                  <i class="icon icon-sm icon-arrows-slim-down-dashed"></i>
                                </div>
                                 /End Arrow -->

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
                                    </p>
                                </div>
                                <!-- Social Media Links -->

                            </div>
                        </div>
                    </div>


                    <!-- ============================
                         Content
                    ================================= -->

                    <!--      <div id="content" class="page-content col-md-6 text-center bg-white-09">
                    
                             ----------------------------
                                 About Section
                            --------------------------------- 
                    
                            <section id="about" class="p-t-b-30">
                              <div class="row">
                                <div class="col-sm-8 col-sm-offset-2">
                    
                                   Headline 
                                  <div class="wrap-line border-dark">
                                    <h3><span class="font-weight-200">About</span> Us</h3>
                                  </div>
                                   /End Headline 
                    
                                   Description 
                                  <div class="p-t-b-15  text-grey">
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing.<br>
                                      Elitr sed diam nonumy eirmod, tempor invidunt.</p>
                                  </div>
                                   /End Description 
                    
                                   Social Media Links 
                                  <div class="p-t-b-15">
                                    <p>
                                      <a href="https://www.facebook.com/egotypes" target="_blank">
                                        <i class="fa fa-facebook"></i></a>
                                      <a href="https://twitter.com/egotype" target="_blank">
                                        <i class="fa fa-twitter"></i></a>
                                      <a href="https://www.instagram.com/egotype___design" target="_blank">
                                        <i class="fa fa-instagram"></i></a>
                                    </p>
                                  </div>
                                   /End Social Media Links 
                    
                                </div>
                              </div>
                    
                               Gallery 
                              <div class="gallery row no-gutters p-t-b-30">
                    
                                 Image 1 
                                <figure class="col-xs-6 img-hover-effect">
                                  <a href="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-1800-1200.jpg"
                                     data-size="900x600">
                                    <img class="img-responsive" src="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-600-400.jpg"
                                         alt="Image description"/>
                                  </a>
                    
                                  <span class="img-title">Silent Hill</span>
                                  <span class="img-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                    sed diam nonumy eirmod tempor invidunt ut labore et dolore.</span>
                                  <span class="img-overlay"></span>
                                </figure>
                                 /End Image 1 
                    
                                 Image 2 
                                <figure class="col-xs-6 img-hover-effect">
                                  <a href="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-1800-1200.jpg"
                                     data-size="900x600">
                                    <img class="img-responsive" src="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-600-400.jpg"
                                         alt="Image description"/>
                                  </a>
                    
                                  <span class="img-title">Timeout</span>
                                  <span class="img-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                    sed diam nonumy eirmod tempor invidunt ut labore et dolore.</span>
                                  <span class="img-overlay"></span>
                                </figure>
                                 /End Image 2 
                    
                                 Image 3 
                                <figure class="col-xs-6 img-hover-effect">
                                  <a href="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-1800-1200.jpg"
                                     data-size="900x600">
                                    <img class="img-responsive" src="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-600-400.jpg"
                                         alt="Image description"/>
                                  </a>
                    
                                  <span class="img-title">Adventure</span>
                                  <span class="img-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                    sed diam nonumy eirmod tempor invidunt ut labore et dolore.</span>
                                  <span class="img-overlay"></span>
                                </figure>
                                 /End Image 3 
                    
                                 Image 4 
                                <figure class="col-xs-6 img-hover-effect">
                                  <a href="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-1800-1200.jpg"
                                     data-size="900x600">
                                    <img class="img-responsive" src="<?= HTTP_ASSETS ?>solid-bg/images/placeholder-600-400.jpg"
                                         alt="Image description"/>
                                  </a>
                                  <span class="img-title">Revival</span>
                                  <span class="img-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                    sed diam nonumy eirmod tempor invidunt ut labore et dolore.</span>
                                  <span class="img-overlay"></span>
                                </figure>
                                 /End Image 4 
                    
                              </div>
                               /End Gallery 
                    
                            </section>
                    
                    
                             ----------------------------
                                 Contact Section
                            --------------------------------- 
                    
                            <section id="contact" class="p-t-b-30">
                              <div class="row">
                                <div class="col-sm-8 col-sm-offset-2">
                    
                                   Headline 
                                  <div class="wrap-line border-dark">
                                    <h3>Contact</h3>
                                  </div>
                                   /End Headline 
                    
                                   Description 
                                  <div class="p-t-b-15  text-grey">
                                    <p>We launch our new website soon.<br>
                                      Please stay updated and follow.</p>
                                  </div>
                                   /End Description 
                    
                                   Contact Form 
                                  <form action="php/contact-process.php" id="contact-form" method="post">
                    
                                    <input type="text" class="form-control form-control-custom" tabindex="-1"
                                           id="text-field" name="text-field">
                    
                                     Input Name 
                                    <div class="form-group" id="name-field">
                                      <label for="form-name" class="sr-only">Name</label>
                                      <input type="text" class="form-control form-control-dark"
                                             id="form-name" name="form-name" placeholder="Name">
                                    </div>
                                     /End Input Name 
                    
                                     Input Email 
                                    <div class="form-group" id="email-field">
                                      <label for="form-email" class="sr-only">Email</label>
                                      <input type="email" class="form-control form-control-dark"
                                             id="form-email" name="form-email" placeholder="Email">
                                    </div>
                                     /End Input Email 
                    
                                     Input Message 
                                    <div class="form-group" id="message-field">
                                      <label for="form-message" class="sr-only">Message</label>
                                                    <textarea class="form-control form-control-dark" rows="1"
                                                              id="form-message" name="form-message"
                                                              placeholder="Message"></textarea>
                                    </div>
                                     /End Input Message 
                    
                                     Submit Button 
                                    <div class="btn-row">
                                      <div class="form-group">
                                        <button type="submit" class="btn btn-dark" role="button">
                                          Send Message
                                        </button>
                                      </div>
                                    </div>
                                     /End Submit Button 
                    
                                  </form>
                                   /End Contact Form 
                    
                                   Arrow 
                                  <div class="p-t-b-40">
                                    <i class="icon icon-sm icon-arrows-slim-down-dashed"></i>
                                  </div>
                                   /End Arrow 
                    
                                </div>
                              </div>
                    
                              <div class="row">
                                <div class="col-lg-10 col-lg-offset-1 col-sm-12">
                                  <div class="row">
                                    <div class="col-sm-4 col-xs-6 p-t-b-5">
                    
                                       Icon 
                                      <div class="p-t-b-15">
                                        <i class="icon icon-lg icon-basic-geolocalize-01"></i>
                                      </div>
                                       /End Icon 
                    
                                       Address 
                                      <div class="p-t-b-15">
                                        <h4>Address</h4>
                    
                                        <p>45 Park Avenue,<br>
                                          New York, NY 10016</p>
                                      </div>
                                       /End Address 
                    
                                    </div>
                    
                                    <div class="col-sm-4 col-xs-6 p-t-b-5">
                    
                                       Icon 
                                      <div class="p-t-b-15">
                                        <i class="icon icon-lg icon-basic-smartphone"></i>
                                      </div>
                                       /End Icon 
                    
                                       Address 
                                      <div class="p-t-b-15">
                                        <h4>Direct</h4>
                    
                                        <p>T. <a href="tel:012345678991"> 01 23 456 78 99 1</a><br>
                                          M. <a href="tel:012345678991">01 23 456 78 99 2</a></p>
                                      </div>
                                       /End Address 
                    
                                    </div>
                    
                                    <div class="col-sm-4  col-sm-offset-0 col-xs-6 col-xs-offset-3 p-t-b-5">
                    
                                       Icon 
                                      <div class="p-t-b-15">
                                        <i class="icon icon-lg icon-basic-globe"></i>
                                      </div>
                                       /End Icon 
                    
                                       Address 
                                      <div class="p-t-b-15">
                                        <h4>Web</h4>
                    
                                        <p><a href="mailto:">info@kounter.com</a><br>
                                          <a href="">www.kounter.com</a></p>
                                      </div>
                                       /End Address 
                    
                                    </div>
                                  </div>
                                </div>
                              </div>
                    
                               Contact Alert 
                              <div id="message-contact" class="message-wrapper text-white message">
                                <i class="icon icon-sm icon-arrows-slim-right-dashed"></i>
                                <span class="message-text"></span>
                              </div>
                               /End Contact Alert 
                    
                            </section>
                    
                          </div>-->
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
