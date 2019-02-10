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
const category1 = document.querySelector(".category1");
const lastUpdated = document.querySelector(".lastTime");

const apiKey = ["CYF716TBUK4G28A9", "YHMAG5743MI9JGNY", "CT8WTPTQMP09XOZ8", "IM1860IAWL0L3V77", "YHMAG5743MI9JGNY"]; //Alpha Vantage

var id = "no";

function processImage() {
  // **********************************************
  // *** Update or verify the following values. ***
  // **********************************************

  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "561fc26c58324cc3a7a7715340c91fb8"; //Azure

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
  const sourceImage = document.querySelector(".sourceImage");
  sourceImage.innerHTML = "Source Image:";
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
      console.log(data);
      console.log(data['description']['tags'][0]);
      category1.innerHTML = data['description']['tags'][0];
      var stockDescription = data['description']['tags'][0];

      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/find?ticker=null&category=electronics");
      //request.onload = () => { setVar(request.responseText) }
      request.onload = () => {setVar(request.responseText)}
      request.send();

      //findStockTickers(stockDescription);
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

function setVar(ret) {
  id = ret;
  getAlphaVantagedata(id);
}

function findStockTickers(description) {
  var ticker = "AAPL";
  getAlphaVantagedata(ticker);
}

function getAlphaVantagedata(ticker) {
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=1min&apikey=' + apiKey[0];
  requestFile(url, ticker);
}

function requestFile(url, stock) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send(null);

  function callback(xhr) {

    let response, json, lines;

    response = xhr.target.response;

    response = JSON.parse(response);

    console.log(response);

    latestTimeSeries = Object.keys(response['Time Series (1min)'])[0];

    latestClosePrice = response['Time Series (1min)'][latestTimeSeries]['4. close'];

    selectedStock = { ticker: stock, price: latestClosePrice };

    console.log(selectedStock);

    console.log(latestClosePrice);

    ticker1.innerHTML = stock;

    price1.innerHTML = "$" + parseFloat(selectedStock.price).toFixed(2);

    setLastUpdatedTime();

  }
}

function setLastUpdatedTime() {
  var time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  time = (hours + ":" + minutes + " " + suffix);

  console.log(time);
  lastUpdated.innerHTML = "Last updated at " + time;
}


// ************************************************************************************//


// Database Stuff
function httpGetAsync(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}