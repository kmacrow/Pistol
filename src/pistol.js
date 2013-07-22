
var pistol = {};

window.$ = !function(mo)
{

  function $() 
  {
    var context = document;

    function wrap( obj ) {
      
      if ( obj instanceof String ) {
        
        if ( obj.trim().charAt(0) == '<' ) {
        
          var frag = document.createDocumentFragment()
          , div = document.createElement('DIV');

          div.innerHTML = obj;
        
          while( child = div.firstChild )
            frag.appendChild( child );

          return new Pistol( [frag] );

        } else {

          return new Pistol( this.querySelectorAll(obj) );
        
        }
      }

      if ( obj instanceof Element ) {
        return new Pistol( [obj] );
      }

      if ( obj instanceof Pistol ) {
        return obj;
      }

      return null;
    }

    if( !arguments.length
      || !arguments[0] ) {
      return;
    }

    if( arguments.length == 2
      && arguments[1] instanceof Element ) {
      context = arguments[1];
    }

    if( arguments[0].hasOwnProperty('length') ) {
      return arguments[0].map( wrap, context );
    } else {
      return wrap( arguments[0], context );
    }

  }

  $.noop = function() {}

  $.extend = function(src, dst) 
  {
    for( var k in src )
      dst[ k ] = src[ k ];
    return dst;
  }

  $.serialize = function(obj)
  {
    switch(typeof obj) {
      case 'string': 
        return obj;
      case 'number':
      case 'boolean': 
        return '' + obj;
      case 'object': 
        return JSON.stringify(obj);
      default:
        return 'undefined';
    }

  }

  $.unserialize = function(str)
  {
    if( typeof str != 'string' )
      return str;

    str = str.trim();

    if( /^\-?[0-9]+$/.test(str))
      return parseInt(str);

    if( /^\-?[0-9]*\.[0-9]+$/.test(str))
      return parseFloat(str)

    if(str == 'null')
      return null;

    if(str == 'undefined')
      return undefined;

    if(str == 'NaN')
      return NaN;

    if( str.charAt(0) == '{' ) {
      try {
        obj = JSON.parse(str);
        return obj;
      }catch(){}
    }

    return str;
  }

  $.makeArray = function(a)
  {
    return Array.prototype.slice.call(a);
  }

  $.now = function()
  {
    return Date.now();
  }

  $.ajax = function()
  {

  }

  $.get = function()
  {

  }

  $.post = function()
  {

  }

  function Pistol(elements) 
  {
    this.elements = elements;
  }

  $.extend(Pistol.prototype, {
    get: function() 
    {
      var i;

      if( !arguments.length )
        return this.elements;

      i = arguments[0];

      if(typeof i != 'number')
        return undefined;
      if( i >= 0 && i < this.elements.length )
        return this.elements[ i ];
      else
        return undefined;
    },
    each: function(fn) 
    {
      this.elements.forEach(function(e, i, a) {
        fn.apply(e, [i, e, a]);
      }, this);
      return this;
    },
    data: function(/*key [, value ]*/) 
    {
      var elm;

      if( !arguments.length ) {
        
        if( !this.elements.length )
          return undefined;

        elm = this.elements[0];
        
        if(!elm.data)
          elm.data = {}
        
        return elm.data;
      }

      if(arguments.length == 1) {
        if( !this.elements.length 
          || typeof arguments[0] != 'string' )
          return undefined;

        elm = this.elements[0];

        if(elm.data && arguments[0] in elm.data)
          return elm.data[arguments[0]];

        if(arguments[0] in elm.dataset)
          return $.unserialize(elm.dataset());

        return undefined;
      }

      if(arguments.length == 2) {
        for( var i = 0 ; i < this.elements.length ; i++ ) {
          elm = this.elements[i];
          if( arguments[0] in elm.dataset ) {
            elm.dataset[arguments[0]] = $.serialize(arguments[1]);
          } else {
            
            if(!elm.data) {
              elm.data = {}
            }

            elm.data[key] = arguments[1];
          }
        }
        return this;
      }
    },
    attr: function()
    {
      if( !arguments.length )
        return this;

      if( !this.elements.length )
        return undefined;

      if( typeof arguments[0] != 'string' )
        return undefined;

      if( arguments.length == 1 ) {
        return this.elements[0].hasAttribute(arguments[0])  ?
                this.elements[0].getAttribute(arguments[0]) :
                undefined;
      }

      if( arguments.length == 2 ) {
        for( var i = 0; i < this.elements.length; i++ ) {
          this.elements[i].setAttribute( arguments[0], arguments[1] );
        }
      }

      return this;

    },
    children: function()
    {
      var elements = []
      , matched;

      if( !this.elements.length )
        return new Pistol();

      if( arguments.length == 1 ) {

        if(typeof arguments[0] != 'string')
          return undefined;
        
        // with selector
        for( var i = 0; i < this.elements.length; i++ ) {
          matched = this.elements[i].querySelectorAll(arguments[0]);
          for( var j = 0; j < matched.length; j++ ) {
            if( matched[j].parentNode == this.elements[i] ) {
              elements.push(matched[j]);
            }
          }
        }

      } else {
        
        // without selector
        for( var i = 0; i < this.elements.length; i++ ) {
          elements = elements.concat( 
            $.makeArray(this.elements[i].children) 
          );
        }
      }

      return new Pistol(elements);

    },
    find: function(selector)
    {
      var elements = [];

      if( !this.elements.length )
        return new Pistol();

      if(typeof arguments[0] != 'string')
        return undefined;

      for( var i = 0; i < this.elements.length; i++ ) {
        elements = elements.concat(
          $.makeArray(this.elements[i].querySelectorAll(selector))
        );
      }

      return new Pistol(elements);
    },
    css: function()
    {
      // get: (all)
      // get: key
      // set: key, value
      // set: dict
    },
    position: function()
    {
      // position relative to parent
    },
    offset: function()
    {
      // position relative to document
    },
    addClass: function(cls)
    {
      var clss;

      if(!this.elements.length)
        return this;

      if(cls.indexOf(' ') != -1) {
        clss = cls.split(' ');
        for(var i = 0; i < this.elements.length; i++) {
          for(var j = 0; i < clss.length; j++) {
            this.elements[i].classList.add(clss[j]);
          }
        }
      } else {
        for(var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.add(cls);
        }
      }

      return this;
    },
    removeClass: function(cls)
    {
      if(!this.elements.length
        || typeof cls != 'string' )
        return this;

      if(cls.indexOf(' ') != -1) {
        clss = cls.split(' ');
        for(var i = 0; i < this.elements.length; i++) {
          for(var j = 0; i < clss.length; j++) {
            this.elements[i].classList.remove(clss[j]);
          }
        }
      } else {
        for(var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.remove(cls);
        }
      }      
    },
    toggleClass: function(cls)
    {
      var clss;

      if(!this.elements.length
        || typeof cls != 'string')
        return this;

      if(cls.indexOf(' ')) {
        clss = cls.split(' ');
        for(var i = 0; i < this.elements.length; i++) {
          for(var j = 0; j < clss.length; j++) {
            this.elements[i].classList.toggle(clss[j]);
          }
        }
      } else {
        for(var i = 0; i < this.elements.length; i++) {
          this.elements[i].classList.toggle(cls);
        }
      }

      return this;
    },
    hasClass: function()
    {

    },
    html: function()
    {

    },
    val: function()
    {

    },
    show: function()
    {

    },
    hide: function()
    {

    },
    width: function()
    {

    },
    height: function()
    {

    },
    outerWidth: function()
    {

    },
    outerHeight: function()
    {

    },
    animate: function()
    {

    },
    fadeIn: function()
    {

    },
    fadeOut: function()
    {

    },
    fadeToggle: function()
    {

    },
    slideUp: function()
    {

    },
    slideDown: function()
    {

    },
    slideToggle: function()
    {

    },
    append: function()
    {

    },
    remove: function()
    {

    },
    on: function()
    {

    },
    off: function()
    {

    },
    blur: function()
    {

    },
    click: function()
    {

    },
    dbclick: function()
    {

    },
    focusin: function()
    {

    },
    focusout: function()
    {

    },
    keydown: function()
    {

    },
    keypress: function()
    {

    },
    keyup: function()
    {

    },
    mouseenter: function()
    {

    },
    mouseleave: function()
    {

    },
    mousemove: function()
    {

    },
    mouseover: function()
    {

    },
    mousedown: function()
    {

    },
    mouseup: function()
    {

    },
    ready: function()
    {

    },
    resize: function()
    {

    },
    scroll: function()
    {

    },
    submit: function()
    {

    },
    change: function()
    {

    },
    trigger: function()
    {

    }
  });

  pistol.$ = $;

  return $; 

}(pistol);

