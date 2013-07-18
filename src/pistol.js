
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

					return new Pistol( frag );

				} else {

					return new Pistol( this.querySelectorAll(obj) );
				
				}
			}

			if ( obj instanceof Element ) {

				return new Pistol( obj );

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

	$.extend = function(src, dst) 
	{
		for( var k in src )
			dst[ k ] = src[ k ];
		return dst;
	}

	function Pistol() 
	{
		
	}

	$.extend(Pistol.prototype, {

	});

	pistol.$ = $;

	return $; 

}(pistol);

