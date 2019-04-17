
window.addEventListener( "load", loadFiles );
function loadFiles() {
    // json
    d3.json( "simple.json" ).then( res => console.log( res.val, res.txt ) );

    // image
    d3.image( "image.jpg" ).then( function(res) {
	d3.select( "#figure" ).append( () => res ) } );

    // svg
    d3.svg( "heart.svg" ).then( function(res) {
	d3.select( "svg" ).insert( ()=>res.firstChild, ":first-child" );
	d3.select( "svg" ).append( "use" ).attr( "href", "#heart" )
            .attr( "transform", "translate(100,100) scale(2)" );
    } );

    // csv
    d3.text( "csv.csv" ).then( function(res) {             // <1>
	var data = d3.csvParse( res, (d,i,cs) => {
            return {
		date: new Date( d.Year, d.Month-1 ),       // <2>
		name: d.Name,                              // <3>
		weight: +d["Weight (kg)"]                  // <4>
            };
	} );
	console.log( data );                             
    } );   
   
    // more csv
    d3.csv( "csv.csv" ).then( function(res) {
	data = res;
	console.log( "1", data );
    } );

    d3.text( "csv.csv" ).then( function(res) {
	data = d3.csvParse( res );
	console.log( "2", data );
    } );
    
    d3.text( "csv.csv" ).then( function(res) {
	var parser = d3.dsvFormat( "," );
	data = parser.parse( res );
	console.log( "3", data );
    } );

    // general whitespace
    d3.text( "txt.txt" ).then( function(res) {
	var parser = d3.dsvFormat( "" ) // ( "\0" );               // <1>
	var rows = parser.parseRows( res, function(d, i, cs) {     // <2>
            return d[0].split( /\s+/g ).map( x => +x );            // <3> <4>
	} );
	console.log( rows );
    } );

    // number formatting
    d3.json( "https://unpkg.com/d3-format/locale/de-DE.json" ).then(
	function( res ) {           
            var loc = d3.formatLocale( res );
            console.log( loc.format( ".4f" )( Math.PI ) );
	},
	function( err ) {
            throw err;
	}
    );    
}

