$(function () {
  var VehicleInfo = (function () {
    function VehicleInfo() {
      if (!(this instanceof VehicleInfo)) {
        return new VehicleInfo();
      }
      this.loaded = false;
      this.loading = false;
      this.checkLoaded();
    }

    VehicleInfo.prototype.getOrAssign = function (obj, prop, val) {
      if (obj.hasOwnProperty(prop)) return obj[prop];
      obj[prop] = val;
      return obj[prop];
    }

    VehicleInfo.prototype.addVehicle = function (year, make, model) {
      var makes = this.getOrAssign(this.years, year, {});
      var models = this.getOrAssign(makes, make, {});
      var years = this.getOrAssign(models, model, []);
      if (years.indexOf(year) < 0) {
        years.push(year);
      }
    };

    VehicleInfo.prototype.checkLoaded = function () {
      var self = this;
      if (!this.loaded && !this.loading) {
        self.loading = true;
        $.ajax({
          url: "/js/vehicles.json?v=16",
          dataType: "json",
          success: function (data) {
            self.init(data);
            self.loaded = true;
          },
          complete: function () {
            self.loading = false;
          }
        });
      }
    };

    VehicleInfo.prototype.getMakes = function (year, callback) {
      var makes = Object.keys(this.years[year] || {}).sort();
      callback(makes);
    };
    
    VehicleInfo.prototype.getModels = function (year, make, callback) {
      var makes = this.years[year];
      if (typeof makes === "undefined") return [];
      var models = Object.keys(makes[make] || {}).sort();
      callback(models);
    };

    VehicleInfo.prototype.minYear = function (years) {
      return 1900 + years.charCodeAt(0);
    };

    VehicleInfo.prototype.maxYear = function (years) {
      var i = years.length > 1 ? 1: 0;
      return 1900 + years.charCodeAt(i);
    };

    VehicleInfo.prototype.codeToYear = function (s, i) {
      return 1900 + s.charCodeAt(i);
    };

    VehicleInfo.prototype.init = function (vehicles) {
      this.years = {};
      for (var make in vehicles) {
        for (var model in vehicles[make]) {
          var years = vehicles[make][model];
          for (var i = 0; i < years.length; i++) {
            var year = this.codeToYear(years, i);
            this.addVehicle(year, make, model);
          }
        }
      }
    };

    return VehicleInfo;
  }());

  var vehicles = VehicleInfo();
  window.vehicles = vehicles;

  window.qty = 1;

  var enableAddVehicle = false;

  var setText = function (text) {
    return function (el) {
      el.text(text);
    };
  };

  var setAttr = function (attr, value) {
    return function (el) {
      el.attr(attr, value);
    };
  };

  var getDefaultSelectOption = function (text, value) {
    return $("<option/>")
      .attr("disabled", true)
      .attr("selected", true)
      .attr("hidden", true)
      .val("value",  value || "")
      .html(text);
  };

  var getSiblingsByKey = function (element, keys, selector) {
    var row = {};
    keys.forEach(function (key) {
      row[key] = element.find(selector(key));
    });
    return row;
  };

  var getVehicleSelectRow = function (element) {
    var parent = element.closest(".vehicle-row")
      , keys = ["year", "make", "model"];
    return getSiblingsByKey(parent, keys, function (key) { 
       return "select[data-key='"+key+"']";
    });
  };

  var findInvalidSelector = function (row) {
    var el, keys = ["year", "make", "model"];
    for (var i = 0; i < keys.length; i++) {
      el = row[keys[i]];
      if (!el.val()) return el;
    }
    return false;
  };

  var loaders = {
    make: function (row) {
      var el = $(this);
      if (typeof row === "undefined") { row = getVehicleSelectRow(el); }
      if (!row.year.val()) return;
      row.model.empty().append(getDefaultSelectOption("Model")).attr("disabled", true);
      row.make.empty().append(getDefaultSelectOption("Make &rarr;")).attr("disabled", true);
      row.make.next("i").attr("class", "loading fa fa-circle-o-notch fa-spin fa-fw");
      vehicles.getMakes(row.year.val(), function (makes) {
        makes.forEach(function (make) {
          row.make.append($("<option></option>").attr("value", make).text(make));
        });
      });
      row.make.attr("disabled", false);
      row.make.next("i").attr("class", "arrow");
    },
    model: function (row) {
      var el = $(this);
      if (typeof row === "undefined") { row = getVehicleSelectRow(el); }
      if (!row.year.val() || !row.make.val()) return;
      row.model.empty().append(getDefaultSelectOption("Model &rarr;")).attr("disabled", true);
      row.model.next("i").attr("class", "loading fa fa-circle-o-notch fa-spin fa-fw");
      vehicles.getModels(row.year.val(), row.make.val(), function (models) {
        models.forEach(function (model) {
          row.model.append($("<option></option>").attr("value", model).text(model));
        });
      });
      row.model.attr("disabled", false);
      row.model.next("i").attr("class", "arrow");
      enableAddVehicle = true;
    }
  };

  $('select[data-load=make], select[data-load=model]').change(function (e) {
    var loader = loaders[$(this).attr("data-load")];
    if (!loader) return;
    loader.call(this);
  });

  var getDisplayText = function (row) {
    return [row.year.val(), row.make.val(), row.model.val()].join(" ");
  };

  var removeVehicle = function (event) {
    var el = $(this);
    var row = el.closest(".vehicle-row");
    if (!row.length) return;
    row.remove();
    window.qty--;
  };

  var switchEnableAddVehicle = function (el) {
    var year = el.find("select[data-key='year']");
    var make = el.find("select[data-key='year']");
    var model = el.find("select[data-key='year']");
    if (year.val() && make.val() && model.val()) {
      enableAddVehicle = true;
    }
  };

  var toggleEditVehicle = function (event) {
    var el = $(this);
    var container = el.closest(".vehicle-row");

    /* if relatedTarget was inside the vehicle-row container, we're still editing */
    if (event.type == "blur" && $.contains(container[0], event.relatedTarget)) {
      return;
    }

    var edit = container.find(".vehicle-edit-row");
    var display = container.find(".vehicle-display-row");

    if (display.hasClass("hidden")) {
      var row = getVehicleSelectRow(el);
      var invalidElement = findInvalidSelector(row);
      if (invalidElement) return;
      var is_moto = (row.year.attr("data-type") == "moto");
      edit.addClass("hidden");
      var text = getDisplayText(row);
      display.removeClass("hidden").find("span.vehicle-display-text").text(text);
      var icon = display.find("div.prepend-icon span.field-icon i");
      icon.attr("class", "fa "+(is_moto && "fa-motorcycle" || "fa-car"));
      if (el.attr("id") == "vehicle-model") {
        enableAddVehicle = true;
        var msg = $("#vehicle-message");
        msg.closest(".frm-row").addClass("hidden");
      }
    } else {
      display.addClass("hidden");
      edit.removeClass("hidden").find("select[data-key=year]");
      var model = edit.find("div.colm5");
      if (!model.length) return;
      var button = edit.find("button");
      if (!button) return;
      model.removeClass("colm5").addClass("colm4");
      model.find("select").off("blur", toggleEditVehicle);
      var buttonContainer = button.closest("div.colm1");
      if (buttonContainer.hasClass("hidden")) {
        buttonContainer.removeClass("hidden");
      }
    }
  };

  var makeSelect = function (params) {
    if (params.copy !== null) {
      var el = params.copy.clone();
      el.attr("name", params.name).attr("id", params.id);
      el.val(params.copy.val());
      return el;
    }
    var el = $("<select/>").attr("name", params.name).attr("id", params.name);
    if (typeof params.attrs == "object") {
      $.each(params.attrs, function (attr, value) {
        el.attr(attr, value);
      });
    }
    if (typeof params.options == "string") {
      el.append(getDefaultSelectOption(params.options));
    } else {
      params.options.appendTo(el);
    }
    el.val(params.value);
    return el;
  };

  var makeNewRow = function (element) {
    var select = getVehicleSelectRow(element);
    return {
      year: makeSelect({ name: "vehicle[year][]", copy: select.year }),
      make: makeSelect({ name: "vehicle[make][]", copy: select.make }),
      model: makeSelect({ name: "vehicle[model][]", copy: select.model })
    };
  };

  var makeSection = function (size, element) {
    return $("<div/>").addClass("section colm "+size)
      .append($("<label/>").addClass("field select")
        .append(element)
        .append($("<i/>").addClass("arrow")));
  };

  var appendSections = function (el, sections) {
    sections.forEach(function (section) {
      el.append(makeSection(section.size, section.element));
    });
  };

  var toggleAddVehicle = function (e) {
    var msg = $("#vehicle-message");
    msg.closest(".frm-row").addClass("hidden");
    
    var separator = $("#add-vehicle-separator")
      , row = $("#add-vehicle-row");
    if (row.hasClass("hidden")) {
      if (!enableAddVehicle) {
    		var shipmenttype = $("#shipment-type").val();
    		if (shipmenttype == 'Motorcycle') {
          msg.text("Please complete the first motorcycle.");
        } else {
          msg.text("Please complete the first vehicle.");
        }
        msg.closest(".frm-row").removeClass("hidden");
        return;
      }
      if (window.qty > 4) { 
        msg.text("For more than 5 vehicles please call (888) 777-2123.")
        msg.closest(".frm-row").removeClass("hidden");
        return; 
      }
      row.removeClass("hidden").find("select").first().focus();
      separator.find("i.fa").removeClass("fa-plus").addClass("fa-minus");
    } else {
      row.addClass("hidden");
      separator.find("i.fa").removeClass("fa-minus").addClass("fa-plus");
    }
  };

  var makeOkButton = function () {
    var okButton = $("<button/>").attr("type", "button").addClass("button btn-field btn-green").css({"padding": "0px 10px", "font-size": "14px"}).html('<i class="fa fa-check"></i>');
    okButton.on("click", toggleEditVehicle);
    return $("<div/>").addClass("section colm colm1 hidden").append(okButton);
  };
  
  var makeRemoveButton = function () {
    var removeButton = $("<button/>").attr("type", "button").addClass("button btn-field btn-red").css({"padding": "0px 11px", "font-size": "14px"}).html('<i class="fa fa-trash"></i>');
    removeButton.on("click", removeVehicle);
    return $("<div/>").addClass("section colm colm1 hidden").append(removeButton);
  };
  
  var makeMobileOkRemoveButtons = function () {
    var style = {"padding": "0px 25px", "margin": "0px 5px", "font-size": "14px"};
    var buttons = {
      ok: $("<button/>").attr("type", "button").addClass("button btn-field btn-green").css(style).html('<i class="fa fa-check"></i> Ok'),
      remove: $("<button/>").attr("type", "button").addClass("button btn-field btn-red").css(style).html('<i class="fa fa-trash"></i> Remove')
    };
    buttons.ok.on("click", toggleEditVehicle);
    buttons.remove.on("click", removeVehicle);
    return $("<div/>")
      .addClass("section colm colm12")
      .css("text-align", "center")
      .append(buttons.remove)
      .append(buttons.ok);
  };

  var resetInputs = function (el) {
    var parent = el.closest(".vehicle-row");
    if (!parent.length) return;
    var year = parent.find("select[data-key=year]");
    var make = parent.find("select[data-key=make]");
    var model = parent.find("select[data-key=model]");
    var years = [];
    for (var y = (new Date()).getFullYear(); y >= 1904; y--) {
      years.push($("<option/>").text(y.toString()).val(y.toString()));
    }
    year.empty().append(getDefaultSelectOption("Year &rarr;")).append(years);
    make.empty().append(getDefaultSelectOption("Make")).attr('disabled', true);
    model.empty().append(getDefaultSelectOption("Model")).attr('disabled', true);
  };
  
  var addVehicle = function (e) {
    var element = $(this);
    var select = getVehicleSelectRow(element);
    var invalidElement = findInvalidSelector(select);
    if (invalidElement) return;

    var is_moto = (select.year.attr("data-type") == "moto");
    
    var inputs = {
      year: makeSelect({ name: "vehicle[year][]", copy: select.year }),
      make: makeSelect({ name: "vehicle[make][]", copy: select.make }),
      model: makeSelect({ name: "vehicle[model][]", copy: select.model })
    };

    var handler = function (event) {
      var loader = loaders[$(this).attr("data-load")];
      if (!loader) return;
      loader.call(this, event.data.row);
    };

    var bindings = {
      year: { change: handler },
      make: { change: handler },
      model: {}
    };

    $.each(bindings, function (key, events) {
      var el = inputs[key];
      $.each(events, function (name, handler) {
        el.on(name, { row: inputs }, handler);
      });
    });

    var sections = [
      {size: "colm12", element: inputs.year},
      {size: "colm12", element: inputs.make},
      {size: "colm12", element: inputs.model},
    ];

    var row = $("<div/>").addClass("frm-row vehicle-edit-row hidden");
    row.append(makeRemoveButton());
    sections.forEach(function (section) {
      row.append(makeSection(section.size, section.element));
    });
    row.append(makeOkButton());
    row.append(makeMobileOkRemoveButtons());

    var display = $("<div/>").addClass("frm-row vehicle-display-row");
    display.append($("<div/>").addClass("section colm colm12")
      .append($("<label/>").addClass("field input-field append-icon")
        .append($("<div/>").addClass("gui-input-display")
                  .append($("<span/>").addClass("vehicle-display-text")
                            .attr("id", "vehicle-display-text")
                            .css({"line-height":"22px"})))
        .append($("<span/>").addClass("field-icon")
                  .css("cursor", "pointer")
                  .append($("<i/>")
                  .addClass("fa fa-pencil")))));

    display.find("span.vehicle-display-text").text(getDisplayText(inputs));
    display.on("click", toggleEditVehicle);
    
    var container = $("<div/>").addClass("vehicle-row");
    container.append([row, display]);

    var separator = $("#add-vehicle-separator");
    container.insertBefore(separator);

    window.qty += 1;
    toggleAddVehicle();
    resetInputs(element);
  };

  $(".toggle-add-vehicle").on('mousedown', function (e) {
    e.preventDefault();
  }).on("click", function (e) {
    $(":focus").blur();
    toggleAddVehicle(e);
  });
  $(".add-vehicle-button").on("click", addVehicle);
  $(".toggle-edit-vehicle").on("click", toggleEditVehicle);
  $("select[data-blur='toggle-edit-vehicle']").on("blur", toggleEditVehicle);
  $("#vehicle-display-row").on("click", toggleEditVehicle);

	var swapButton = function () {
		var txtswap = $(".form-footer button[type='submit']");
		if (txtswap.text() == txtswap.data("btntext-sending")) {
			txtswap.text(txtswap.data("btntext-original"));
		} else {
			txtswap.data("btntext-original", txtswap.text());
			txtswap.text(txtswap.data("btntext-sending"));
		}
	};

  var resetVehicleBox = function (el) {
    var row = el.find("#add-vehicle-row");
    resetInputs(row);
    row.addClass("hidden");
    $("#add-vehicle-separator").find("i.fa").removeClass("fa-minus").addClass("fa-plus");
  
    el.find(".vehicle-row").not(":first").not(":last").remove();
    window.qty = 1;

    row = el.find("#vehicle-edit-row");
    resetInputs(row);
    row.removeClass("hidden");

    $("#vehicle-display-row").addClass("hidden");
    $("#vehicle-display-text").text("");
  };

  var toggleVehicleBox = function (boxId, type) {
    var box = $(boxId);
    if (!box.length) return;

    resetVehicleBox(box);

    var vehicleBoxConfig = {
      "Automobile": {
        title: setText("Vehicle Details"),
        separator: setText("Add Vehicle"),
        button: setText("Add Vehicle"),
        icon: setAttr("class", "fa fa-car"),
        selectAttrs: setAttr("data-type", "vehicle")
      },
      "Motorcycle": {
        title: setText("Motorcycle Details"),
        separator: setText("Add Motorcycle"),
        button: setText("Add Motorcycle"),
        icon: setAttr("class", "fa fa-motorcycle"),
        selectAttrs: setAttr("data-type", "moto")
      }
    };

    var transforms = vehicleBoxConfig[type];
    if (typeof transforms === "undefined") return;

    var selectors = {
      title: "#vehicle-details-title",
      separator: "#add-vehicle-separator-label",
      button: "#add-vehicle-button-label",
      icon: "#vehicle-display-icon",
      selectAttrs: function (e) { return e.find("select"); }
    };

    $.each(selectors, function (key, selector) {
      var transform = transforms[key];
      if (typeof transform === "undefined") return;

      var el;
      if (typeof selector === "function") {
        el = selector(box);
      } else if (typeof selector === "string") {
        el = $(selector);
      } else {
        return;
      }

      if (!el.length) return;
      transform(el);
    });
    
    box.removeClass("hidden");
  };
  
  $("#shipment-type").change(function () {
    var shipmenttype = $("#shipment-type").val();
    if (shipmenttype == 'Automobile') {
      toggleVehicleBox("#vehicle-detail-box", shipmenttype);
      $("#oversized-detail-box").addClass("hidden");
      $("#container-detail-box").addClass("hidden");
      $("#shipment-type-icon").attr("class", "fa fa-car");
    } else if (shipmenttype == 'Motorcycle') {
      toggleVehicleBox("#vehicle-detail-box", shipmenttype);
      $("#oversized-detail-box").addClass("hidden");
      $("#container-detail-box").addClass("hidden");
      $("#shipment-type-icon").attr("class", "fa fa-motorcycle");
    } else if (shipmenttype == 'Oversized') {
      $("#oversized-detail-box").removeClass("hidden");
      $("#vehicle-detail-box").addClass("hidden");
      $("#container-detail-box").addClass("hidden");
      $("#shipment-type-icon").attr("class", "fa fa-truck");
    } else if (shipmenttype == 'Container') {
      $("#container-detail-box").removeClass("hidden");
      $("#vehicle-detail-box").addClass("hidden");
      $("#oversized-detail-box").addClass("hidden");
      $("#shipment-type-icon").attr("class", "fa fa-cube");
    }
  });
  
  $("#shipdate").change(function () {
    $("#contact-fields").removeClass("hidden");
	});

	$("#shipdate").datepicker({
    minDate: 0,
		changeMonth: false,
		numberOfMonths: 1,
		prevText: '<i class="fa fa-chevron-left"></i>',
		nextText: '<i class="fa fa-chevron-right"></i>',
		onClose: function(selectedDate) {}
	});
  
  jQuery.validator.addMethod("notEqualTo", function (value, element, param) {
    if (this.optional(element)) return true;
    return value !== $(param).val();
  });


  jQuery.validator.addMethod("emailaddr", function (value, element, param) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Please enter a valid email address");

  var errorHandler = {
    errorClass: "state-error",
    validClass: "state-success",
		errorElement: "em",
    highlight: function(element, errorClass, validClass) {
      $(element).closest('.field').addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).closest('.field').removeClass(errorClass).addClass(validClass);
    },
		errorPlacement: function(error, element) {
			if (element.is(":radio")) {
				element.closest('.option-group').after(error);
			} else {
				error.insertAfter(element.parent());
			}
		}
  };

  var quoteFormConfig = {
    onkeyup: false,
    onclick: false,
    rules: {
      "shipment-type": { required: true },
      direction: { required: true },
      origin: { required: true },
      destination: {
        required: true,
        notEqualTo: "#origin"
      },
      "origin-zip": { required: true,	minlength: 5 },
      "destination-zip": { required: true,	minlength: 5 },

      "vehicle[year][]": { required: true },
      "vehicle[make][]": { required: true },
      "vehicle[model][]": { required: true },

      "oversize[type]": { required: true },
      "oversize[year]": { required: true },
      "oversize[make]": { required: true },
      "oversize[model]": { required: true },
      "oversize-length-ft": { required: true },
      "oversize-length-in": { required: true },
      "oversize-width-ft": { required: true },
      "oversize-width-in": { required: true },
      "oversize-height-ft": { required: true },
      "oversize-height-in": { required: true },
      "oversize-weight": { required: true },

      "container-type": { required: true },
      "container-size": { required: true },

      /* Transport Timeline */
      shipdate: {	required: true },
      /* Shipper Details */
      "shipper[fullname]": {	required: true, minlength: 2 },	
      "shipper[email]": { required: true, emailaddr: true },
      "shipper[phone]": {	required: true,	minlength: 10	}
    },
    messages: {
      /* Transport Timeline */
      "shipment-type": { required: 'Please select shipment type' },
      direction: { required: 'Please select shipment direction' },
      origin: { required: 'Please select origin' },
      destination: { 
        required: 'Please select destination',
        notEqualTo: 'Origin and destination must not match'
      },
      "origin-zip": { required: 'Please enter pickup location', minlength: 'Please enter a valid zip code' },
      "destination-zip": { required: 'Please enter delivery location', minlength: 'Please enter a valid zip code' },
      "vehicle[year][]": { required: 'Please select year' },
      "vehicle[make][]": { required: 'Please select make' },
      "vehicle[model][]": { required: 'Please select model' },
      "oversize[type]": { required:'Please select cargo type' },
      "oversize[year]": { required:'Please select year' },
      "oversize[make]": { required:'Please enter make' },
      "oversize[model]": { required:'Please enter model' },
      "oversize-length-ft": { required: '' },
      "oversize-length-in": { required: '' },
      "oversize-width-ft": { required: '' },
      "oversize-width-in": { required: '' },
      "oversize-height-ft": { required: '' },
      "oversize-height-in": { required: '' },
      "oversize-weight": { required: '' },
      "container-type": { required: 'Please select container type' },
      "container-size": { required: 'Please select container size' },
      shipdate: { required: 'Please select ready date' },
      "shipper[fullname]": {
        required: "Please enter shipper name",
        minlength: 'Name must be at least 2 characters'
      },	
      "shipper[email]": {
        required: "Please enter email address",
        email: 'Enter a valid email address'
      },
      "shipper[phone]": {
        required: 'Please enter phone number',
        minlength: 'Please enter a valid phone number'
      }
    },
    submitHandler: function (form) {
      var btn = $(".form-footer button[type='submit']");
      if (btn.text() == btn.data("btntext-sending")) {
        return;
      }
      btn.data("btntext-original", btn.text());
      btn.text(btn.data("btntext-sending"));
      $(".form-footer").addClass('progress');
      form.submit();
    }
  };

  var el = $("#quote-form");
  if (el.length) {
    el.validate($.extend({}, errorHandler, quoteFormConfig));
  }
  
  (function () {
    var selectBoxes = {
      "#shipment-type": "Automobile", 
      "#direction": 0,
      "#origin": 0,
      "#destination": 0,
      "#vehicle-year": 0,
      "#vehicle-make": 0,
      "#vehicle-model": 0,
      "#oversize-type": 0,
      "#oversize-year": 0,
      "#container-type": 0,
      "#container-size": 0
    };
    $.each(selectBoxes, function (s, val) {
      var e = $(s);
      if (typeof val === "number") {
        if (typeof e[0] !== "undefined")
          e[0].selectedIndex = val;
        return;
      }
      e.val(val);
    });    
    vehicles.checkLoaded();
  })();
});
