$(document).ready(function () {
  "use strict";
  var target = 1500;
  var indicator_val = 0;
  var step = 20;
  var percent = target / 100;
  var get_data = function () {
      var tmp = null;
      $.ajax({
          async: false,
          dataType: 'json',
          url: "http://alex.devel.softservice.org/testapi/",
          data: { 'request': "" },
          success: function (data) {
              tmp = data;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
          }       
      });
      return tmp;
  }();
  indicator_val = (get_data.balance_usd) * 100;
  console.log(indicator_val);

  var interval_id = null;
  var increase_val = function(){
     if(indicator_val < target) {
          indicator_val+=step;
          $(".js-progress-bar").width((indicator_val / percent) + '%');
          $(".js-need-more").html((target - indicator_val) / 100);
          $(".js-label-info").html(indicator_val / 100);
          $('.js-progress-label').css("left", (indicator_val / percent) + '%');
          console.log(indicator_val);
     } else {
          clearInterval(interval_id);
          $(".js-need-more").parent().hide();
          $(".js-result-progress").css("background-color", "#00A910");

     }
  };
  interval_id = setInterval(increase_val, 500);
  
})