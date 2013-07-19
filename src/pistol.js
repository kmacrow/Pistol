
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
        return '' + obj;;
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
    get: function( i ) 
    {
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

    },
    children: function()
    {

    },
    find: function()
    {

    },
    css: function()
    {

    },
    position: function()
    {

    },
    offset: function()
    {

    },
    addClass: function()
    {

    },
    removeClass: function()
    {

    },
    toggleClass: function()
    {

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

