;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
  var CoverageMap = window.CoverageMap || {};

  CoverageMap = (function () {
    var states = {
      'map_1': {
        'namesId':'AL',
        'name': 'ALABAMA',
        'url':'/state/alabama-auto-transport.php'
      },
      'map_2': {
        'namesId':'AK',
        'name': 'ALASKA',
        'url':'/state/alaska-auto-transport.php'
      },
      'map_3': {
        'namesId':'AZ',
        'name': 'ARIZONA',
        'url':'/state/arizona-auto-transport.php'
      },
      'map_4': {
        'namesId':'AR',
        'name': 'ARKANSAS',
        'url':'/state/arkansas-auto-transport.php'
      },
      'map_5': {
        'namesId':'CA',
        'name': 'CALIFORNIA',
        'url':'/state/california-auto-transport.php'
      },	
      'map_6': {
        'namesId':'CO',
        'name': 'COLORADO',
        'url':'/state/colorado-auto-transport.php'
      },
      'map_7': {
        'namesId':'CT',
        'name': 'CONNECTICUT',
        'url':'/state/connecticut-auto-transport.php'
      },
      'map_8': {
        'namesId':'DE',
        'name': 'DELAWARE',
        'url':'/state/delaware-auto-transport.php'
      },	
      'map_9': {
        'namesId':'FL',
        'name': 'FLORIDA',
        'url':'/state/florida-auto-transport.php'
      },
      'map_10': {
        'namesId':'GA',
        'name': 'GEORGIA',
        'url':'/state/georgia-auto-transport.php'
      },
      'map_11': {
        'namesId':'HI',
        'name': 'HAWAII',
        'url':'/state/hawaii-auto-transport.php'
      },	
      'map_12': {
        'namesId':'ID',
        'name': 'IDAHO',
        'url':'/state/idaho-auto-transport.php'
      },
      'map_13': {
        'namesId':'IL',
        'name': 'ILLINOIS',
        'url':'/state/illinois-auto-transport.php'
      },
      'map_14': {
        'namesId':'IN',
        'name': 'INDIANA',
        'url':'/state/indiana-auto-transport.php'
      },
      'map_15': {
        'namesId':'IA',
        'name': 'IOWA',
        'url':'/state/iowa-auto-transport.php'
      },	
      'map_16': {
        'namesId':'KS',
        'name': 'KANSAS',
        'url':'/state/kansas-auto-transport.php'
      },
      'map_17': {
        'namesId':'KY',
        'name': 'KENTUCKY',
        'url':'/state/kentucky-auto-transport.php'
      },
      'map_18': {
        'namesId':'LA',
        'name': 'LOUISIANA',
        'url':'/state/louisiana-auto-transport.php'
      },	
      'map_19': {
        'namesId':'ME',
        'name': 'MAINE',
        'url':'/state/maine-auto-transport.php'
      },
      'map_20': {
        'namesId':'MD',
        'name': 'MARYLAND',
        'url':'/state/maryland-auto-transport.php'
      },
      'map_21': {
        'namesId':'MA',
        'name': 'MASSACHUSETTS',
        'url':'/state/massachusetts-auto-transport.php'
      },	
      'map_22': {
        'namesId':'MI',
        'name': 'MICHIGAN',
        'url':'/state/michigan-auto-transport.php'
      },
      'map_23': {
        'namesId':'MN',
        'name': 'MINNESOTA',
        'url':'/state/minnesota-auto-transport.php'
      },
      'map_24': {
        'namesId':'MS',
        'name': 'MISSISSIPPI',
        'url':'/state/mississippi-auto-transport.php'
      },
      'map_25': {
        'namesId':'MO',
        'name': 'MISSOURI',
        'url':'/state/missouri-auto-transport.php'
      },	
      'map_26': {
        'namesId':'MT',
        'name': 'MONTANA',
        'url':'/state/montana-auto-transport.php'
      },
      'map_27': {
        'namesId':'NE',
        'name': 'NEBRASKA',
        'url':'/state/nebraska-auto-transport.php'
      },
      'map_28': {
        'namesId':'NV',
        'name': 'NEVADA',
        'url':'/state/nevada-auto-transport.php'
      },	
      'map_29': {
        'namesId':'NH',
        'name': 'NEW HAMPSHIRE',
        'url':'/state/new-hampshire-auto-transport.php'
      },
      'map_30': {
        'namesId':'NJ',
        'name': 'NEW JERSEY',
        'url':'/state/new-jersey-auto-transport.php'
      },
      'map_31': {
        'namesId':'NM',
        'name': 'NEW MEXICO',
        'url':'/state/new-mexico-auto-transport.php'
      },	
      'map_32': {
        'namesId':'NY',
        'name': 'NEW YORK',
        'url':'/state/new-york-auto-transport.php'
      },
      'map_33': {
        'namesId':'NC',
        'name': 'NORTH CAROLINA',
        'url':'/state/north-carolina-auto-transport.php'
      },
      'map_34': {
        'namesId':'ND',
        'name': 'NORTH DAKOTA',
        'url':'/state/north-dakota-auto-transport.php'
      },
      'map_35': {
        'namesId':'OH',
        'name': 'OHIO',
        'url':'/state/ohio-auto-transport.php'
      },	
      'map_36': {
        'namesId':'OK',
        'name': 'OKLAHOMA',
        'url':'/state/oklahoma-auto-transport.php'
      },
      'map_37': {
        'namesId':'OR',
        'name': 'OREGON',
        'url':'/state/oregon-auto-transport.php'
      },
      'map_38': {
        'namesId':'PA',
        'name': 'PENNSYLVANIA',
        'url':'/state/pennsylvania-auto-transport.php'
      },	
      'map_39': {
        'namesId':'RI',
        'name': 'RHODE ISLAND',
        'url':'/state/rhode-island-auto-transport.php'
      },
      'map_40': {
        'namesId':'SC',
        'name': 'SOUTH CAROLINA',
        'url':'/state/south-carolina-auto-transport.php'
      },
      'map_41': {
        'namesId':'SD',
        'name': 'SOUTH DAKOTA',
        'url':'/state/south-dakota-auto-transport.php'
      },	
      'map_42': {
        'namesId':'TN',
        'name': 'TENNESSEE',
        'url':'/state/tennessee-auto-transport.php'
      },
      'map_43': {
        'namesId':'TX',
        'name': 'TEXAS',
        'url':'/state/texas-auto-transport.php'
      },
      'map_44': {
        'namesId':'UT',
        'name': 'UTAH',
        'url':'/state/utah-auto-transport.php'
      },
      'map_45': {
        'namesId':'VT',
        'name': 'VERMONT',
        'url':'/state/vermont-auto-transport.php'
      },	
      'map_46': {
        'namesId':'VA',
        'name': 'VIRGINIA',
        'url':'/state/virginia-auto-transport.php'
      },
      'map_47': {
        'namesId':'WA',
        'name': 'WASHINGTON',
        'url':'/state/washington-auto-transport.php'
      },
      'map_48': {
        'namesId':'WV',
        'name': 'WEST VIRGINIA',
        'url':'/state/west-virginia-auto-transport.php'
      },	
      'map_49': {
        'namesId':'WI',
        'name': 'WISCONSIN',
        'url':'/state/wisconsin-auto-transport.php'
      },
      'map_50': {
        'namesId':'WY',
        'name': 'WYOMING',
        'url':'/state/wyoming-auto-transport.php'
      },
      'map_51': {
        'namesId':'DC',
        'name': 'WASHINGTON DC',
        'url': '/state/virginia-auto-transport.php',
        'upcolor': '#FF6600',
        'overcolor': '#0000FF',
        'downcolor': '#993366'
      }
    };

    function CoverageMap(element, settings, tiles) {
      var self = this;
      self.defaults = {
        bordercolor: '#9CA8B6', //inter-state borders
        lakescolor: '#66CCFF', //lakes color
        shadowcolor: '#000000', //shadow color below the map
        shadowOpacity: '50', //shadow opacity, value, 0-100
        namescolor: '#666666', //color of the abbreviations 
        namesShadowColor: '#666666', //tooltip shadow color
        target: '_self', //open link in new window:_blank, open in current window:_self
        upcolor: '#EBECED', //state's color when page loads
        overcolor: '#99CC00', //state's color when mouse hover
        downcolor: '#993366', //state's color when mouse clicking
        tooltipId: 'tip',
        tooltipClass: 'tip',
        lakesId: 'lakes',
        mapId: 'map',
        shadowId: 'shadow',
        enable: true
      };
      self.settings = $.extend({}, self.defaults, settings);
      self.tiles = $.extend({}, states, tiles);
      var el = $(element);
      if (el.prop('nodeName') == "svg") {
        self.map = el;
        self.lakes = $('#'+self.settings.lakesId);
        self.shadow = $('#'+self.settings.shadowId);
        self.tooltip = $('#'+self.settings.tooltipId);
        self.init();
      } else {
        $.ajax({
          url: "/map.php",
          type: "GET",
          dataType: "html",
          success: function (data) {
            el.html(data).css({'background': '#fff'});
            self.map = el.find('svg');
            self.lakes = $('#'+self.settings.lakesId);
            self.shadow = $('#'+self.settings.shadowId);
            self.tooltip = $('#'+self.settings.tooltipId);
            self.init();
          }
        });
      }
    }
    return CoverageMap;
  }());

  CoverageMap.prototype.add_event = function (id, cfg) {
    var self = this;
    var config = $.extend({}, self.settings, cfg);
    var tile = $('#'+id);
    var label = $('#'+config.namesId);
    var obj = $('#'+id+', '+'#'+config.namesId);

    label.find('tspan').attr({
      fill: config.namescolor
    });

    tile.attr({
      fill: config.upcolor,
      stroke: config.bordercolor
    });

    obj.attr({ cursor: 'default' });

    if (!config.enable)
      return;

    obj.attr({ cursor: 'pointer' });

    obj.hover(function () {
      self.tooltip.show().html(config.name);
      tile.css({ fill: config.overcolor });
    }, function() {
      self.tooltip.hide();
      tile.css({ fill: config.upcolor });
    }).mousedown(function () {
      tile.css({ fill: config.downcolor });
    }).mouseup(function () {
      tile.css({ fill: config.overcolor });
      if (config.target == '_blank') {
        window.open(config.url);
      } else {
        window.location.href = config.url;
      }
    }).mousemove(function (event) {
      self.move_tooltip(event.pageX, event.pageY);
    });
  };

  CoverageMap.prototype.move_tooltip = function (pageX, pageY) {
    var self = this;
    var x = pageX - 20;
    var y = pageY + (-38);
    var tipw = self.tooltip.outerWidth();
    var tiph = self.tooltip.outerHeight();
    if ((x + tipw) > ($(document).scrollLeft() + $(window).width())) {
      x = (x - tipw - (20*2));
    }
    if ((y + tiph) > ($(document).scrollTop() + $(window).height())) {
      y = ($(document).scrollTop()+$(window).height() - tiph - 10);
    }
    self.tooltip.css({left: x, top: y});
  };

  CoverageMap.prototype.init = function () {
    var self = this;
    var config = self.settings;

    if (self.lakes.find('path').eq(0).attr('fill') != 'undefined') {
      self.lakes.find('path').attr({ fill: config.lakescolor }).css({ stroke: config.bordercolor });
    }

    $('.'+config.tooltipClass).css({
      'box-shadow':'1px 2px 4px ' + config.namesShadowColor,
      '-moz-box-shadow':'2px 3px 6px ' + config.namesShadowColor,
      '-webkit-box-shadow':'2px 3px 6px ' + config.namesShadowColor
    });

    if (self.shadow.find('path').eq(0).attr('fill') != 'undefined') {
      var shadowOpacity = parseInt(config.shadowOpacity);
      if (shadowOpacity >= 100) {
        shadowOpacity = 1; 
      } else if (shadowOpacity <= 0) {
        shadowOpacity = 0; 
      } else { 
        shadowOpacity = shadowOpacity / 100;
      }
      self.shadow.find('path').attr({ fill: config.shadowcolor }).css({ 'fill-opacity': shadowOpacity });
    }

    Object.keys(self.tiles).forEach(function (id) {
      var cfg = self.tiles[id];
      self.add_event(id, cfg);
    });

    self.init = function () {};
  };

  $.fn.coverageMap = function () {
    var self = this
      , opt = arguments[0]
      , args = Array.prototype.slice.call(arguments, 1)
      , l = self.length
      , i
      , ret;
    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined') {
        self[i].coverageMap = new CoverageMap(self[i], opt);
      } else {
        ret = self[i].coverageMap[opt].apply(self[i].coverageMap, args);
      }
      if (typeof ret != 'undefined') return ret;
    }
    return self;
  };
}));
