<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript">
//            document.addEventListener("DOMContentLoaded", function (event) {
//                (function ($) {
//                    $.fn.scembed = function () {
//                        var datasource = 'http://soundcloud.com/oembed';
//                        return this.each(function () {
//                            var container = $(this);
//                            var mediasource = $(container).attr("sc_url");
//                            var params = 'url=' + mediasource + '&format=json&iframe=true&maxwidth=480&maxheight=120&auto_play=false&show_comments=false';
//                            $.ajaxopts = $.extend($.ajaxopts, {
//                                url: datasource,
//                                data: params,
//                                dataType: 'json',
//                                success: function (data, status, raw) {
//                                    $(container).html(data.html);
//                                },
//                                error: function (data, e1, e2) {
//                                    $(container).html("Can't retrieve player for " + mediasource);
//                                },
//                            });
//                            $.ajax($.ajaxopts);
//                        });
//                    };
//                })(jQuery);
//
//                $(function () {
//                    $("div.sc-embed").scembed();
//                });
//            });


            var formData = new FormData();

            formData.append("format", "json");
            formData.append("url", "https://soundcloud.com/iamstarinthesky");

            fetch('https://soundcloud.com/oembed', {
                method: 'POST',
                body: formData
            }).then(function (response) {
                console.log(response);
            });
        </script>
    </head>
    <body>
        <?php
        // put your code here
        ?>
<!--        <script src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js"></script>
        <script>
            SC.initialize({
                client_id: 'YOUR_CLIENT_ID',
                redirect_uri: 'https://streamy.link'
            });

            // initiate auth popup
            SC.connect().then(function () {
                return SC.get('/me');
            }).then(function (me) {
                alert('Hello, ' + me.username);
            });
        </script>-->


        <!--<div class="sc-embed" sc_url="https://soundcloud.com/iamstarinthesky/if-stars-could-wish-feat-whywewish-prod-young-flaco"></div>-->
    </body>
</html>
