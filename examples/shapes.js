
// things
window.addEventListener( "load", makeThings );
function makeThings() {
    var g = d3.select( "#generator" ).attr( "transform", "translate( 20, 55 )")
	.attr( "font-family", "monospace" ).attr( "font-size", 20 )
    
    g.append( "text" ).attr( "x", 0 ).attr( "y", 20 )
	.text( "<path" );
    
    var t = g.append( "text" ).attr( "x", 0 ).attr( "y", 45 )
    t.append( "tspan" ).attr( "visibility", "hidden" ).text( "<" );
    t.append( "tspan" ).attr( "visibility", "visible" ).text( "d=" );
    t.append( "tspan" ).attr( "fill", "red" ).text( '"M0,0 ..."' );
    t.append( "tspan" ).attr( "visibility", "visible" ).text( "/>" );

    // -----

    var ds = [ [null,1], [1,2], [1,3], [3,4], [3,5], [5,6], [5,7] ];
    ds = ds.map( function(d) { return {src:d[0], dst:d[1]} } );
    ds = d3.stratify().id(d=>d.dst).parentId(d=>d.src)( ds );
    ds = d3.tree().size([220,90])( ds );
    
    g = d3.select( "#component" ).attr( "transform", "translate( 225, 35 )" );
    g.selectAll( "line" ).data( ds.links() ).enter().append( "line" )
	.attr( "x1", d=>d.source.x ).attr( "y1", d=>d.source.y )
    	.attr( "x2", d=>d.target.x ).attr( "y2", d=>d.target.y )
	.attr( "stroke", d=>d.source.depth > 1 ? "red":"black" )
    	.attr( "stroke-width", 1.5 )

    g.selectAll( "ellipse" ).data( ds.descendants() ).enter().append("ellipse")
	.attr( "rx", 20 ).attr( "ry", 10 )    
	.attr( "cx", d=>d.x ).attr( "cy", d=>d.y )    
	.attr( "fill", "white" )
	.attr( "stroke", d=>d.data.dst >= 5 ? "red" : "black" )
	.attr( "stroke-width", 1.5 )

    // -----

    var file = function(x,y) {
	return "M" + (x+40) + "," + y + " h-40 v80 h60 v-60 h-20 v-20 l20,20";
    }

    g = d3.select( "#layout" ).attr( "transform", "translate(420,5)" );
    g.append( "path" ).attr( "d", file(80,20) )
	.attr( "fill", "white" ).attr( "stroke", "black" );
    g.append( "path" ).attr( "d", file(70,30) )
	.attr( "fill", "white" ).attr( "stroke", "black" );
    g.append( "path" ).attr( "d", file(60,40) )
	.attr( "fill", "white" ).attr( "stroke", "black" );

    g.append( "text" )
	.attr( "font-family", "sans-serif" ).attr( "font-size", 16 )
	.attr( "x", 70 ).attr( "y", 90 ).attr( "fill", "red" )
	.text( "x=..." )
    g.append( "text" )
	.attr( "font-family", "sans-serif" ).attr( "font-size", 16 )
	.attr( "x", 70 ).attr( "y", 105 ).attr( "fill", "red" )
	.text( "y=..." )

    // -----

    g = d3.select( "#data" ).attr( "transform", "translate(-60,160)" );
  
    g.append( "path" ).attr( "d", file(270,20) )
	.attr( "fill", "white" ).attr( "stroke", "black" );
    g.append( "path" ).attr( "d", file(260,30) )
	.attr( "fill", "white" ).attr( "stroke", "black" );
    g.append( "path" ).attr( "d", file(250,40) )
	.attr( "fill", "white" ).attr( "stroke", "black" );

    g.append( "text" )
	.attr( "font-family", "sans-serif" ).attr( "font-size", 18 )
	.attr( "text-anchor", "middle" )
	.attr( "x", 279 ).attr( "y", 95 ).attr( "fill", "red" )
	.text( "Data" )

    g.append( "path" )
	.attr( "d", "M240,80 Q155,80 155,-35 l5,10 M155,-35 l-5,10" )
	.attr( "fill", "none" ).attr( "stroke", "blue" )
	.attr( "stroke-width", 1.25 );

    g.append( "path" )
	.attr( "d", "M340,75 Q423,75 423,-5 l5,10 M423,-5 l-5,10" )
	.attr( "fill", "none" ).attr( "stroke", "blue" )
    	.attr( "stroke-width", 1.25 );

    g.append( "path" )
	.attr( "d", "M340,85 Q570,85 570,-10 l5,10 M570,-10 l-5,10" )
	.attr( "fill", "none" ).attr( "stroke", "blue" )
    	.attr( "stroke-width", 1.25 );

    // -----
    
    g = d3.select( "#things" ).append( "g" )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 18 )
	.attr( "text-anchor", "middle" );

    g.append( "rect" ).attr( "rx", 5 ).attr( "ry", 5 )
	.attr( "x", 50 ).attr( "y", 175 )
	.attr( "width", 120 ).attr( "height", 30 )
	.attr( "fill", "white" ); //.attr( "stroke", none )
    g.append( "text" )
	.attr( "x", 110 ).attr( "y", 196-1 )
	.attr( "fill", "blue" ).attr( "font-style", "normal" )
	.text( "Generator" )

    g.append( "rect" ).attr( "rx", 5 ).attr( "ry", 5 )
	.attr( "x", 295 ).attr( "y", 184 )
	.attr( "width", 120 ).attr( "height", 30 )
	.attr( "fill", "white" ); // .attr( "stroke", "blue" )
    g.append( "text" )
	.attr( "x", 355 ).attr( "y", 204-1 )
	.attr( "fill", "blue" ).attr( "font-style", "normal" )
	.text( "Component" )
    
    g.append( "rect" ).attr( "rx", 5 ).attr( "ry", 5 )
	.attr( "x", 460 ).attr( "y", 184 )
	.attr( "width", 85 ).attr( "height", 30 )
	.attr( "fill", "white" ); // .attr( "stroke", "blue" )
    g.append( "text" )
	.attr( "x", 500 ).attr( "y", 204-1 )
	.attr( "fill", "blue" ).attr( "font-style", "normal" )
	.text( "Layout" )
}

// symbols
window.addEventListener( "load", makePredefined );
function makePredefined() {
    var h = 30;

    var names = [ "d3.symbolCircle", "d3.symbolCross", "d3.symbolDiamond",
		  "d3.symbolSquare", "d3.symbolStar", "d3.symbolTriangle",
		  "d3.symbolWye" ];
    
    d3.select( "#predefined" )
	.selectAll( "path" ).data( d3.symbols ).enter().append( "path" )
	.attr( "d", d3.symbol().type( d=>d ).size( 128 ) )
	.attr( "transform", (d,i)=>"translate(50,"+(40+h*i)+")" )
	.attr( "stroke", "black" ).attr( "stroke-width", 2 )
	.attr( "fill", "lightgrey" );

    d3.select( "#predefined" )
	.selectAll( "text" ).data( names ).enter().append( "text" )
	.attr( "font-family", "sans-serif" ).attr( "font-size", "0.9em" )
    	.attr( "x", 90 ).attr( "y", (d,i)=>40+5+h*i )
	.text( d=>d );
}

window.addEventListener( "load", makeSymbols );
function makeSymbols() {
    var data = [ { "x":  40, "y":   0, "val": "A" },              //<1>
                 { "x":  80, "y":  30, "val": "A" },
                 { "x": 120, "y": -10, "val": "B" },
                 { "x": 160, "y":  15, "val": "A" },
                 { "x": 200, "y":   0, "val": "C" },
                 { "x": 240, "y":  10, "val": "B" } ];

    var symMkr = d3.symbol().size(81).type( d3.symbolStar );      //<2>
    var scY = d3.scaleLinear().domain([-10,30]).range([80,40]);   //<3>
    
    d3.select( "#symbols" ).append( "g" )                         //<4>
        .selectAll( "path" ).data(data).enter().append( "path" )  //<5>
        .attr( "d", symMkr )                                      //<6>
        .attr( "fill", "red" )
        .attr( "transform",                                       //<7>
               d=>"translate(" + d["x"] + "," + scY(d["y"]) + ")" );      

    var scT = d3.scaleOrdinal(d3.symbols).domain(["A","B","C"]);  //<8>

    d3.select( "#symbols" )
        .append( "g" ).attr( "transform", "translate(300,0)" )    // <9>
        .selectAll( "path" ).data( data ).enter().append( "path" )
        .attr( "d", d => symMkr.type( scT(d["val"]) )() )         //<10>
        .attr( "fill", "none" )                                   //<11>
        .attr( "stroke", "blue" ).attr( "stroke-width", 2 )
        .attr( "transform",                                       //<12>
               d=>"translate(" + d["x"] + "," + scY(d["y"]) + ")" );
}

window.addEventListener( "load", makeCrosshair );
function makeCrosshair() {
    var data = [ [180, 1], [260, 3], [340, 2], [420, 4] ];        //<1>

    d3.select( "#usedefs" )
        .selectAll( "use" ).data( data ).enter().append( "use" )  //<2>
        .attr( "href", "#crosshair" )                             //<3>
        .attr( "transform",                                       //<4>
               d=>"translate("+d[0]+",50) scale("+2*d[1]+")" )
        .attr( "stroke", "black" )                                //<5>
        .attr( "stroke-width", d=>0.5/Math.sqrt(d[1]) );          //<6>
}

// surprise: static

// lines
window.addEventListener( "load", makeLines );
function makeLines() {
    // Prepare a data set and scale it properly for plotting
    var ds = [ [1, 1], [2, 2], [3, 4], [4, 4], [5, 2],
               [6, 2], [7, 3], [8, 1], [9, 2] ];
    var xSc = d3.scaleLinear().domain([1,9]).range([50,250]);
    var ySc = d3.scaleLinear().domain([0,5]).range([175,25]);
    ds = ds.map( d => [xSc(d[0]), ySc(d[1])] );                   //<1>

    // Draw circles for the individual data points          
    d3.select( "#lines" ).append( "g" ).selectAll( "circle" )     //<2>
        .data( ds ).enter().append( "circle" ).attr( "r", 3 )
        .attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] );
    
    // Generate a line
    var lnMkr = d3.line();                                        //<3>
    d3.select( "#lines" ).append( "g" ).append( "path" )          //<4>
        .attr( "d", lnMkr(ds) )                                   //<5>
        .attr( "fill", "none" ).attr( "stroke", "red" );          //<6>
}

window.addEventListener( "load", makeLinesUndefined );
function makeLinesUndefined() {
    // Prepare a data set and scale it properly for plotting
    var ds = [[1,1], [2,2], [3,4], [4,4], [5,2], [6,2], [7,3], [8,1], [9,2]];
    var xSc = d3.scaleLinear().domain([1,9]).range([50,250]);    
    var ySc = d3.scaleLinear().domain([0,5]).range([175,25]);
    ds = ds.map( d => [xSc(d[0]), ySc(d[1])] );

    // Draw circles for the individual data points    
    d3.select( "#undef" ).append( "g" ).selectAll( "circle" )
        .data( ds ).enter().append( "circle" ).attr( "r", 3 )
        .attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] );
    
    // Generate a line
    var lnMkr = d3.line().defined( (d,i)=>i==3?false:true );
    d3.select( "#undef" ).append( "g" ).append( "path" )
        .attr( "d", lnMkr(ds) )
        .attr( "fill", "none" ).attr( "stroke", "red" );
}

window.addEventListener( "load", makeCurveSamples );
function makeCurveSamples() {
    var ds0 = [[1,1], [2,2], [2.5,4], [3,4], [4,2], [4.5,2.5], [5,1.5]];
    var scX = d3.scaleLinear().domain([1,5]).range([0,180]);
    var scY = d3.scaleLinear().domain([0,4.5]).range([160,0]);
    var ds = ds0.map( d => [scX(d[0]), scY(d[1])] );
    var txtpos = [ scX(3), scY(0) ]
    
    var svg = d3.select( "#builtin" );
    
    svg.append( "g" ).attr( "transform", "translate( 40, 40 )" )
	.call( liner, ds, d3.curveLinear, "d3.curveLinear", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 40 )" )
	.call( liner, ds, d3.curveNatural, "d3.curveNatural", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 40 )" )
	.call( liner, ds, d3.curveMonotoneX, "d3.curveMonotoneX", txtpos );

    svg.append( "g" ).attr( "transform", "translate( 40, 250 )" )
	.call( liner, ds, d3.curveStep, "d3.curveStep", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 250 )" )
	.call( liner, ds, d3.curveStepAfter, "d3.curveStepAfter", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 250 )" )
	.call( liner, ds, d3.curveStepBefore, "d3.curveStepBefore", txtpos );

    // blue: val=0, ... red: val=1
    
    var vs = [ 1, 0.75, 0.5, 0.25, 0 ];
    svg.append( "g" ).attr( "transform", "translate( 40, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveCardinal.tension(v) ),
	       "d3.curveCardinal", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 260, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveCatmullRom.alpha(v) ),
	       "d3.curveCatmullRom", txtpos );
    svg.append( "g" ).attr( "transform", "translate( 480, 460 )" )
	.call( liner, ds, vs.map( v=>d3.curveBundle.beta(v) ),
	       "d3.curveBundle", txtpos )
//   	.call( liner, ds, d3.curveBasisClosed, "", txtpos )
	.append( "text" )
	.attr( "x", txtpos[0] ).attr( "y", scY(-0.5) )
	.attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif").attr( "font-size", "10.5pt" )
	.text( "d3.curveBasis" );
}

function liner( g, ds, curve, txt, pos ) {
    if( !(curve instanceof Array) ) {
	curve = [ curve ];
    }

    var sc = d3.scaleLinear()
	.domain( [0, 2, 4] ).range( ["red", "magenta", "blue"] );
    
    var lnMkr = d3.line();
    for( var i=0; i<curve.length; i++ ) {
	g.append( "path" ).attr( "d", lnMkr.curve(curve[i])(ds) )
   	    .attr( "fill", "none" ).attr( "stroke", sc(i) );
    }

    g.selectAll( "circle" ).data( ds ).enter().append( "circle" )
	.attr( "r", 3 )
	.attr( "cx", d=>d[0] ).attr( "cy", d=>d[1] )
	.attr( "fill", "black" );
    
    g.append( "text" )
	.attr( "x", pos[0] ).attr( "y", pos[1] )
	.attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif").attr( "font-size", "10.5pt" )
	.text( txt );
}

// pie
window.addEventListener( "load", makePie );
function makePie() {
    var data = [ { name: "Jim", votes: 12 },
                 { name: "Sue", votes:  5 },
                 { name: "Bob", votes: 21 },
                 { name: "Ann", votes: 17 },
                 { name: "Dan", votes:  3 } ];

    var pie = d3.pie().value(d=>d.votes).padAngle(0.025)( data ); //<1>
    
    var arcMkr = d3.arc().innerRadius( 50 ).outerRadius( 150 )    //<2>
        .cornerRadius(10);
    
    var scC = d3.scaleOrdinal( d3.schemePastel2 )                 //<3>
        .domain( pie.map(d=>d.index) )                            //<4>
    
    var g = d3.select( "#pie" )                                   //<5>
        .append( "g" ).attr( "transform", "translate(300, 175)" )

    g.selectAll( "path" ).data( pie ).enter().append( "path" )    //<6>
        .attr( "d", arcMkr )                                      //<7>
        .attr( "fill", d=>scC(d.index) ).attr( "stroke", "grey" );

    g.selectAll( "text" ).data( pie ).enter().append( "text" )    //<8>
        .text( d => d.data.name )                                 //<9>
        .attr( "x", d=>arcMkr.innerRadius(85).centroid(d)[0] )    //<10>
        .attr( "y", d=>arcMkr.innerRadius(85).centroid(d)[1] )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 14 )
        .attr( "text-anchor", "middle" );
}

// component
window.addEventListener( "load", makeSticker );
function sticker( sel, label ) {                                  //<1>
    sel.append( "rect" ).attr( "rx", 5 ).attr( "ry", 5 )          //<2>
        .attr( "width", 70 ).attr( "height", 30 )
        .attr( "x", -35 ).attr( "y", -15 )
        .attr( "fill", "none" ).attr( "stroke", "blue" )
        .classed( "frame", true );                                //<3>
        
    sel.append( "text" ).attr( "x", 0 ).attr( "y", 5 )            //<4>
        .attr( "text-anchor", "middle" )
        .attr( "font-family", "sans-serif" ).attr( "font-size", 14 )
        .classed( "label", true )
        .text( label ? label : d => d );                          //<5>
}

function makeSticker() {
    var labels = [ "Hello", "World", "How", "Are", "You?" ];
    var scX = d3.scaleLinear()
        .domain( [0, labels.length-1] ).range( [100, 500] );
    var scY = d3.scaleLinear()
        .domain( [0, labels.length-1] ).range( [50, 150] );
    
    d3.select( "#sticker" )                                       //<6>
        .selectAll( "g" ).data( labels ).enter().append( "g" )
        .attr( "transform",
               (d,i) => "translate(" + scX(i) + "," + scY(i) + ")" )
        .call( sticker );

    d3.select( "#sticker" ).append( "g" )                         //<7>
        .attr( "transform", "translate(75,150)" )
        .call( sticker, "I'm fine!" )
        .selectAll( ".label" ).attr( "fill", "red" );             //<8>
}

// do not call this for fig in book:
window.addEventListener( "load", makeTransformation );
function makeTransformation() {
    var trsf1 = function( sel, dx, dy ) {
	return sel.attr( "transform", "translate(" + dx + "," + dy + ")" );
    }

    var trsf2 = function( sel, dx, dy ) {
	sel.each( function(d,i) {
	    this.bogus_dx = typeof dx === "function" ? dx(d,i) : dx||0 } );
	sel.each( function(d,i) {
	    this.bogus_dy = typeof dy === "function" ? dy(d,i) : dy||0 } );
	
	return sel.attr( "transform", function() {
	    return "translate(" + this.bogus_dx + "," + this.bogus_dy + ")"} );
    } 

    var i = 0;
    
    var trsf3 = function( sel, dx, dy ) {
	var dxs = d3.local(), dys = d3.local();
	sel.each( function(d,i) {
	    dxs.set(this, typeof dx === "function" ? dx(d,i) : dx||0 ) } );
	sel.each( function(d,i) {
	    dys.set(this, typeof dy === "function" ? dy(d,i) : dy||0 ) } );

	return sel.attr( "transform", function() {
	    return "translate(" + dxs.get(this) + "," + dys.get(this) + ")"} );
    } 

    d3.select( "#sticker" ).append( "g" )
	.call( trsf1, 200, 150 )
	.call( sticker, "Boo!" )
	.select( ".frame" ).attr( "stroke", "green" );

    var scX = d3.scaleLinear().domain( [0,5] ).range( [100,550] );
    var scY = d3.scaleLinear().domain( [0,5] ).range( [50,150] );
    
    var vs = [ "This", "That" ];    
    d3.select( "#sticker" ).append( "g" )
    	.selectAll( "g" ).data( vs ).enter().append( "g" )
	.call( trsf3, (d,i) => 300 + scX(i), (d,i) => scY(i) )
	.call( sticker ); 
}









