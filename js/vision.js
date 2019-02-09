(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click', function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict


const ticker1 = document.querySelector(".resultTicker1");
const price1 = document.querySelector(".resultPrice1");
const category1 = document.querySelector(".category1")


function processImage() {
  // **********************************************
  // *** Update or verify the following values. ***
  // **********************************************

  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "561fc26c58324cc3a7a7715340c91fb8";

  // You must use the same Azure region in your REST API method as you used to
  // get your subscription keys. For example, if you got your subscription keys
  // from the West US region, replace "westcentralus" in the URL
  // below with "westus".
  //
  // Free trial subscription keys are generated in the "westus" region.
  // If you use a free trial subscription key, you shouldn't need to change
  // this region.
  var uriBase =
    "https://canadacentral.api.cognitive.microsoft.com/vision/v2.0/analyze";

  // Request parameters.
  var params = {
    "visualFeatures":"Description",
    "details": "",
    "language": "en",
  };

  // Display the image.
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  // Make the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader(
        "Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

    .done(function (data) {
      // Show formatted JSON on webpage.
      //console.log(JSON.stringify(data, ['description', 'tags'], 2))
      console.log(data['description']['tags'][0]);
      category1.innerHTML = data['description']['tags'][0];
      $("#responseTextArea").val(data['description']['tags'][0])

      //category1.innerHTML = JSON.stringify(data, ['description', 'tags'], 2);
      //$("#responseTextArea").val(JSON.stringify(data, ['description',  'tags'], 2));
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ? "Error. " :
        errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" :
        jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
};
