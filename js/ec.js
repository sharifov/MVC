$(function () {
  jQuery.validator.addMethod("emailaddr", function (value, element, param) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }, "Please enter a valid email address");
  
  jQuery.validator.addMethod("bookingnumber", function (value, element, param) {
    return this.optional(element) || /^[rR]\d{5,8}$/.test(value);
  }, "Please enter a valid Booking ID");

  var ecErrorHandler = {
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

  var ecFormConfig = {
    onkeyup: false,
    onclick: false,
    rules: {
      "BookingID": { required: true, bookingnumber: true },
      "Email": { required: true, emailaddr: true }
    },
    messages: {
      "BookingID": {
        required: 'Please enter a Booking ID',
        bookingnumber: 'Please enter a valid Booking ID'
      },
      "Email": {
        required: "Please enter an email address",
        email: 'Enter a valid email address'
      }
    },
    submitHandler: function (form) {
      /* element must be unique! */
      var btn = $(".ec-form-footer button[type='submit']");
      if (btn.text() == btn.data("btntext-sending")) {
        return;
      }
      btn.data("btntext-original", btn.text());
      btn.text(btn.data("btntext-sending"));
      $(".ec-form-footer").addClass('progress');
      form.submit();
    }
  };

  var el = $("#ec-form");
  if (el.length) {
    el.validate($.extend({}, ecErrorHandler, ecFormConfig));
  }

  /* ec-form open/close */
  var ecForm = $("#ec-form-container");
  ecForm.on("open.ecForm", function () {
    $(this).css("display", "block");
  });
  ecForm.on("close.ecForm", function () {
    $(this).css("display", "none");
  });
  $(".toggle-ecForm").click(function (e) {
    if (ecForm.css("display") == "block") {
      ecForm.trigger("close.ecForm");
      return;
    }
    ecForm.trigger("open.ecForm");
  });
});
