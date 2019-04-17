
window.addEventListener( "load", makeScales );
function makeScales() {
    var scX = d3.scaleLinear().domain( [0,10] ).range( [0,300] );
    
    var sc1 = d3.scaleLinear().domain( [0,3,10] ).range(["blue","white","red"]);
    var sc2 = d3.scaleLinear().domain( [0,5,5,10] )
        .range( ["white", "blue", "red", "white"] );

    var sc3 = d3.scaleSequential( t => "" + d3.hsl( 360*t, 1, 0.5 ) )
        .domain( [0, 10] );

//  var sc4 = d3.scaleSequential( t => d3.interpolateSinebow(2*(1-t)/3) )
    var sc4 = d3.scaleSequential( t => d3.interpolateSinebow(2/3-3*t/4) )
        .domain( [0, 10] );

    var sc5 = d3.scaleDiverging( t => d3.interpolateRdYlGn(1-t) )
	.domain( [0, 2, 10] );
    
    var sc6 = d3.scaleSequential( d3.interpolateRgbBasis(
        [ "#b2d899", "#ffffbf", "#bf9966", "#ffffff" ] ) ).domain( [0, 10] );
    
    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc1 )
        .attr( "transform", "translate(50,25)" );

    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc2 )
        .attr( "transform", "translate(50,75)" );

    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc3 )
        .attr( "transform", "translate(50,125)" );

    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc4 )
        .attr( "transform", "translate(50,175)" );

    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc5 )
        .attr( "transform", "translate(50,225)" );

    d3.select( "#scale" ).append( "g" )
        .call( colorbox, [ 300, 30 ], sc6, scX )
        .attr( "transform", "translate(50,275)" );   
}

function colorbox( sel, size, colors, ticks ) {                          //<1>
    var [x0, x1] = d3.extent( colors.domain() );                         //<2>
    var bars = d3.range( x0, x1, (x1-x0)/size[0] );
    
    var sc = d3.scaleLinear().domain( [x0, x1] ).range( [0, size[0] ] ); //<3>
    sel.selectAll( "line" ).data( bars ).enter().append( "line" )        //<4>
        .attr( "x1", sc ).attr( "x2", sc )
        .attr( "y1", 0 ).attr( "y2", size[1] )
        .attr( "stroke", colors );
    
    sel.append( "rect" ).attr( "width", size[0] ).attr( "height", size[1] )//<5>
        .attr( "fill", "none" ).attr( "stroke", "black" )
    
    if( ticks ) {                                                        //<6>
        sel.append( "g" ).call( d3.axisBottom( ticks ) )
            .attr( "transform", "translate( 0," + size[1] + ")" );
    }
}

window.addEventListener( "load", makeMandelbrot );
function makeMandelbrot() {
    var cnv = d3.select( "#canvas" );                             //<1>
    var ctx = cnv.node().getContext( "2d" ); 

    var pxX = 465, pxY = 250, maxIter = 2000;                     //<2>
    var x0 = -1.31, x1 = -0.845, y0 = 0.2, y1 = 0.45;
    
    var scX = d3.scaleLinear().domain([0, pxX]).range([x0, x1]);  //<3>
    var scY = d3.scaleLinear().domain([0, pxY]).range([y1, y0]);
    
    var scC = d3.scaleLinear().domain([0,10,23,35,55,1999,2000])  //<4>
        .range( ["white","red","orange","yellow","lightyellow",
		 "white","darkgrey"] );

    function mandelbrot( x, y ) {                                 //<5>
        var u=0.0, v=0.0, k=0;
        for( k=0; k<maxIter && (u*u + v*v)<4; k++ ) {
            var t = u*u - v*v + x;
            v = 2*u*v + y;
            u = t;
        }
        return k;
    }
    
    for( var j=0; j<pxY; j++ ) {                                  //<6>
        for( var i=0; i<pxX; i++ ) {
            var d = mandelbrot( scX(i), scY(j) );
            ctx.fillStyle = scC( d );
            ctx.fillRect( i, j, 1, 1 );
        }
    }
}

window.addEventListener( "load", makeContours );
function makeContours() {
    d3.json( "haxby.json" ).then( drawContours );                 //<1>
}

function drawContours( scheme ) {
    // Set up scales, including color
    var pxX = 525, pxY = 300;                                     //<2>
    var scX = d3.scaleLinear().domain([-3, 1]).range([0, pxX]);    
    var scY = d3.scaleLinear().domain([-1.5, 1.5]).range([pxY, 0]);
    var scC = d3.scaleSequential(
        d3.interpolateRgbBasis(scheme["colors"]) ).domain([-1,1]) //<3>
    var scZ = d3.scaleLinear().domain( [-1, -0.25, 0.25, 1] )         
        .range( [ "white", "grey", "grey", "black" ] );
    
    // Generate data
    var data = [];                                                //<4>
    var f = (x, y, b) => (y**4 + x*y**2 + b*y)*Math.exp(-(y**2))
    for( var j=0; j<pxY; j++ ) {
        for( var i=0; i<pxX; i++ ) {
            data.push( f( scX.invert(i), scY.invert(j), 0.3 ) );
        }
    }
    
    var svg = d3.select( "#contours" ), g = svg.append( "g" );    //<5>
    var pathMkr = d3.geoPath();                                   //<6>
    
    // Generate and draw filled contours (shading)
    var conMkr = d3.contours().size([pxX, pxY]).thresholds(100);  //<7>
    g.append("g").selectAll( "path" ).data( conMkr(data) ).enter()
        .append( "path" ).attr( "d", pathMkr )                    //<8>
        .attr( "fill", d=>scC(d.value) ).attr( "stroke", "none" )
    
    // Generate and draw contour lines
    conMkr = d3.contours().size( [pxX,pxY] ).thresholds( 10 );    //<9>
    g.append("g").selectAll( "path" ).data( conMkr(data) ).enter()
        .append( "path" ).attr( "d", pathMkr )
        .attr( "fill", "none" ).attr( "stroke", d=>scZ(d.value) );
    
    // Generate a single contour
    g.select( "g" ).append( "path" )                              //<10>
        .attr( "d", pathMkr( conMkr.contour( data, 0.025 ) ) )
        .attr( "fill", "none" ).attr( "stroke", "red" )
        .attr( "stroke-width", 2 );
    
    // Generate axis
    svg.append( "g" ).call( d3.axisTop(scX).ticks(10) )           //<11>
        .attr( "transform", "translate(0," + pxY + ")" );
    svg.append( "g" ).call( d3.axisRight(scY).ticks(5) );
    
    // Generate colorbox
    svg.append( "g" ).call( colorbox, [280,30], scC )             //<12>
        .attr( "transform", "translate( 540,290 ) rotate(-90)" )
        .selectAll( "text" ).attr( "transform", "rotate(90)" );
    svg.append( "g" ).attr( "transform", "translate( 570,10 )" )
        .call( d3.axisRight( d3.scaleLinear()
                             .domain( [-1,1] ).range( [280,0] ) ) );
}

