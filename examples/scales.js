
window.addEventListener( "load", makeBins );
window.addEventListener( "load", makeText );
   
function makeBins() {
    var gauss = d3.randomNormal( 75, 40 );
    var uni = d3.randomUniform( 2, 10 );
    var data = [];
    for( ; data.length < 50 ; ) {
	var g = gauss();
	if( g > 0 && g < 150 ) {
	    data.push( g )
	}
    }
    var sc = d3.scaleQuantile().domain(data).range( [1,2,3] );
//    console.log( sc.invertExtent(1), sc.invertExtent(2), sc.invertExtent(3) );
    
    d3.select( "#quantile" ).selectAll( "circle" ).data(data).enter()
	.append( "circle" ).attr( "r", 2 ).attr( "fill", "red" )
	.attr( "cy", ()=>115+uni() ).attr( "cx", d=>d );
    d3.select( "#bd1" )
	.attr( "x1", sc.invertExtent(1)[1] )
	.attr( "x2", sc.invertExtent(1)[1] );
    d3.select( "#bd2" )
	.attr( "x1", sc.invertExtent(2)[1] )
	.attr( "x2", sc.invertExtent(2)[1] );
    d3.select( "#bin1" ).attr( "x", d3.mean(sc.invertExtent(1))-6 );
    d3.select( "#bin2" ).attr( "x", d3.mean(sc.invertExtent(2))-6 );
    d3.select( "#bin3" ).attr( "x", d3.mean(sc.invertExtent(3))-6 );
}

function makeText() {
    var sc = d3.scaleLinear().domain( [0,1] ).range( [0,100] );
    var axMkr = d3.axisLeft(sc).tickValues([0.5]);
    d3.select( "#text" ).selectAll("g").call( axMkr );
    
    var txt = [];
    txt[0]='<path class="domain" stroke="#000" d="M-6,0.5H0.5V100.5H-6"></path>'
    txt[1]='<g class="tick" opacity="1" transform="translate(0,50.5)">';
    txt[2]='<line stroke="#000" x2="-6"></line>';
    txt[3]='<text fill="#000" x="-9" dy="0.32em">0.5</text>';
    txt[4]='</g>';

    var x=95, y=75;
    
    d3.select( "#text" ).append( "text" ).attr( "x", x ).attr( "y", y )
	.attr( "font-family", "monospace" ).attr( "font-size", 12 )
	.selectAll( "tspan" ).data( txt ).enter().append( "tspan" )
	.attr( "x", (d,i) => x + ((i==2||i==3)?20:0) )
	.attr( "y", (d,i) => y+15*i ).text( d=>d );
}


window.addEventListener( "load", makeTicks );
function makeTicks() {
    var sc = d3.scaleLinear().domain( [0,10] ).range( [0,200] );  //<1>

    // top left: default settings
    d3.select( "#ticks" ).append( "g" )                           //<2>
        .attr( "transform", "translate( 50,50)" )
        .call( d3.axisBottom(sc) );
    
    // bottom left: additional decimal in labels
    d3.select( "#ticks" ).append( "g" )                           //<3>
        .attr( "transform", "translate( 50,125)" )
        .call( d3.axisBottom(sc).tickFormat( d3.format(".1f") ) )
        .selectAll( "text" )
        .filter( (d,i)=>i%2!=0 ).attr( "visibility", "hidden" );

    // top right: minor and major tick marks, addtl label for axis
    d3.select( "#ticks" ).append( "g" )                           //<4>
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom(sc).tickSize(3).tickFormat( ()=>"" ) );
    d3.select( "#ticks" ).append( "g" )
        .attr( "transform", "translate(350,50)" )
        .call( d3.axisBottom( sc ).ticks(2) )
        .append( "text" ).text( "Metric" )
        .attr( "x", sc(5) ).attr("y", 35 )
        .attr( "font-size", 12 ).attr( "fill", "black" );
    
    // bottom right: custom appearance
    var g = d3.select( "#ticks" ).append( "g" )                   //<5>
        .attr( "transform", "translate(350,125)" )
        .call( d3.axisBottom(sc).tickPadding( 5 ) );
    g.select( ".domain" ).attr( "visibility", "hidden" );
    g.selectAll( ".tick" ).select( "line" )
        .attr( "stroke", "red" ).attr( "stroke-width", 2 );
    g.selectAll( "text" ).attr( "font-size", 14 );
}

window.addEventListener( "load", makeSemilog );
function makeSemilog() {
    d3.text( "cost.csv" ).then( res => {
        var data = d3.csvParseRows( res, d => [ +d[0], +d[1] ] ); //<1>

        function draw( sel, scX, scY, width, height ) {           //<2>
            scX = scX.domain( d3.extent( data, d=>d[0] ) ).nice() //<3>
                .range( [ 0, width ] );
            scY = scY.domain( d3.extent( data, d=>d[1] ) ).nice()
                .range( [ height, 0 ]);

            var ds = data.map( d=>[ scX(d[0]), scY(d[1]) ] );     //<4>
            sel.append( "path" ).classed( "curve", true )
                .attr( "d", d3.line()(ds) ).attr( "fill", "none" )

            sel.append( "g" )                                     //<5>
                .call( d3.axisBottom( scX ).ticks(10, "d") ) 
                .attr( "transform", "translate( 0,"+height+")" );
            
            sel.append( "g" ).call( d3.axisLeft( scY ) );         //<6>
        }
        
        d3.select( "#semilog" ).append( "g" )                     //<7>
            .attr( "transform", "translate( 50, 50 )" )
            .call( draw,d3.scaleLinear(),d3.scaleLinear(),500,500 )
            .select( ".curve" ).attr( "stroke", "red" );
           
        d3.select( "#semilog" ).append( "g" )                     //<8>
            .attr( "transform", "translate( 200, 50 )" )
            .call( draw,d3.scaleLinear(),d3.scaleLog(),350,250 )
            .select( ".curve" ).attr( "stroke", "blue" );
    } );
}

window.addEventListener( "load", makeTimeseries );
function makeTimeseries() {
    d3.text( "load.csv" ).then( res => {
        // prepare data
        var parse = d3.utcParse( "%H:%M:%S" );                    //<1>
        var format = d3.utcFormat( "%H:%M" );
        
        var data = d3.csvParse( res, function( d ) {              //<2>
            return { ts: parse(d.timestamp), val: +d.load }
        } );

        // create scale objects
        var scT = d3.scaleUtc()                                   //<3>
            .domain( d3.extent( data, d=>d.ts ) ).nice()
            .range( [ 50, 550 ] );
        var scY = d3.scaleLinear()
            .domain( [0, 100] ).range( [ 250, 50 ] );
        var scC = d3.scaleThreshold()                             //<4>
            .domain( [35, 75] ).range( ["green","orange","red"] );
        
        data = d3.pairs( data,                                    //<5>
                         (a,b) => { return { src: a, dst: b } } ); 

        // draw data and axes
        var svg =
	    d3.select( "#timeseries" ).attr( "cursor","crosshair" );
        
        svg.selectAll("line").data(data).enter().append("line")   //<6>
            .attr( "x1", d => scT(d.src.ts) ) 
            .attr( "x2", d => scT(d.dst.ts) )
            .attr( "y1", d => scY(d.src.val) )
            .attr( "y2", d => scY(d.dst.val) )
            .attr( "stroke", d=>scC( (d.src.val + d.dst.val)/2 ) );     

        svg.append( "g" ).attr( "transform", "translate(50,0)" )  //<7>
            .call( d3.axisLeft(scY) );
        svg.append( "g" ).attr( "transform", "translate(0,250)" )        
            .call( d3.axisBottom(scT).tickFormat( format )
                   .ticks( d3.utcMinute.every(10) ) );

        // display mouse position
        var txt = svg.append("text").attr("x",100).attr("y",50)   //<8>
            .attr("font-family","sans-serif").attr("font-size",14);
        svg.on( "mousemove", function() {                                
            var pt = d3.mouse( svg.node() )
            txt.text( format( scT.invert( pt[0] ) ) + " | " +     //<9>
                      d3.format( ">2d" )( scY.invert(pt[1]) ) );  //<10>
        } );    
    } );
}
