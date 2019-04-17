
window.addEventListener( "load", makeHisto );
function makeHisto() {
    d3.csv( "dense.csv" ).then( function( data ) {                        
        var histo = d3.histogram().value( d=>+d.A )( data );

        var scX = d3.scaleBand().padding( 0.2 ).round( true )
            .range( [15, 515] ).domain( histo );
        
        var scY = d3.scaleLinear().range( [200, 0] )
            .domain( [0, d3.max( histo, d=>d.length ) ] ).nice();
        
        var g = d3.select( "#histo" )
            .append( "g" ).attr( "transform", "translate( 40,50 )" )

        g.selectAll( "rect" ).data( histo ).enter()
            .append( "rect" ).attr( "width", scX.bandwidth() )
            .attr( "x", scX ).attr( "y", d=>scY(d.length) )
            .attr( "height", d => 200-scY(d.length) )
            .attr( "fill", "red" ).attr( "fill-opacity", 0.2 )
            .attr( "stroke", "red" ).attr( "stroke-width", 2 )

        g.selectAll( "text" ).data( histo ).enter().append( "text" )
            .attr( "text-anchor", "middle" )
            .attr( "font-family", "sans-serif" )
            .attr( "font-size", 14 )        
            .attr( "x", d => scX(d)+0.5*scX.bandwidth() )
            .attr( "y", 225 )
            .text( d=>(d.x0+d.x1)/2 );

        g.append( "g" ).call( d3.axisLeft(scY) );
    } );
}
