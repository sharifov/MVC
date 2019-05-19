$(function () {
  var selectFirstOnEnter = function(input) {
    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
    function addEventListenerWrapper(type, listener) {
      if (type == "keydown") { 
        var orig_listener = listener;
        listener = function (event) {
          var suggestion_selected = $(".pac-item-selected").length > 0;
          if (!suggestion_selected && (event.which == 13 || event.which == 9)) {
            var simulated_downarrow = $.Event("keydown", { keyCode: 40, which: 40 });
            orig_listener.apply(input, [simulated_downarrow]);
          }
          orig_listener.apply(input, [event]);
        };
      }
      _addEventListener.apply(input, [type, listener]);
    }
    if (input.addEventListener) {
      input.addEventListener = addEventListenerWrapper;
    } else if (input.attachEvent) {
      input.attachEvent = addEventListenerWrapper;
    }
  }

  function ac_attach(id, options) {
    var input = document.getElementById(id);
    var data = document.createElement("input");
    data.setAttribute("name", input.name+"_data");
    data.setAttribute("id", input.id+"_data");
    data.setAttribute("type", "hidden");
    document.forms['quote-form'].appendChild(data);
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    var keys = ['id', 'place_id', 'address_components', 'geometry', 'name', 'types'];
    autocomplete.addListener('place_changed', function () {
      $("input[name='"+id+"-place-id']").val("");
      $("input[name='"+id+"-zip']").val("");
      data.setAttribute("value", "");
      var place = autocomplete.getPlace();
      var val = keys.reduce(function (obj, key) {
        obj[key] = place[key];
        return obj;
      }, {});
      data.setAttribute("value", JSON.stringify(val));
      $("input[name='"+id+"-place-id']").val(place.place_id);
      for (var i = 0; i < place.address_components.length; i++) {
        var c = place.address_components[i];
        var at = c.types[0];
        if (at == "postal_code") {
          $("input[name='"+id+"-zip']").val(c['short_name']);
        }
      }
    });
    selectFirstOnEnter(input);
  }
  
  window.google_ac_init = function () {
    var options = {
      fields: ['id', 'place_id', 'address_components', 'geometry', 'name', 'types'],
      types: ['(regions)'],
      componentRestrictions: { country: 'us' }
    };
    ac_attach('origin', options);
    ac_attach('destination', options);
  }
});
