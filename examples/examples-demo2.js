function makeDemo2() {
    d3.tsv( "examples-multiple.tsv" )
        .then( function( data ) {
            var pxX = 600, pxY = 300;                             //<1>
            
            var scX = d3.scaleLinear()                            //<2>
                .domain( d3.extent(data, d => d["x"] ) )          //<3>
                .range( [0, pxX] );
            var scY1 = d3.scaleLinear()                           //<4>
                .domain(d3.extent(data, d => d["y1"] ) )
                .range( [pxY, 0] );                               //<5>
            var scY2 = d3.scaleLinear()
                .domain( d3.extent(data, d => d["y2"] ) )
                .range( [pxY, 0] );
            
            d3.select( "svg" )                                    //<6>
                .append( "g" ).attr( "id", "ds1" )                //<7>
                .selectAll( "circle" )                            //<8>
                .data(data).enter().append("circle")
                .attr( "r", 5 ).attr( "fill", "green" )           //<9>
                .attr( "cx", d => scX(d["x"]) )                   //<10>
                .attr( "cy", d => scY1(d["y1"]) );                //<11>
            
            d3.select( "svg" )                                    //<12>
                .append( "g" ).attr( "id", "ds2" )
                .attr( "fill", "blue" )                           //<13>
                .selectAll( "circle" )                            //<14>
                .data(data).enter().append("circle")
                .attr( "r", 5 )
                .attr( "cx", d => scX(d["x"]) )
                .attr( "cy", d => scY2(d["y2"]) );                //<15>
            
            var lineMaker = d3.line()                             //<16>
                .x( d => scX( d["x"] ) )                          //<17>
                .y( d => scY1( d["y1"] ) );
            
            d3.select( "#ds1" )                                   //<18>
                .append( "path" )                                 //<19>
                .attr( "fill", "none" ).attr( "stroke", "red" )     
                .attr( "d", lineMaker(data) );                    //<20>
           
            lineMaker.y( d => scY2( d["y2"] ) );                  //<21>

            d3.select( "#ds2" )                                   //<22>
                .append( "path" )
                .attr( "fill", "none" ).attr( "stroke", "cyan" )
                .attr( "d", lineMaker(data) );

//          d3.select( "#ds2" ).attr( "fill", "red" );            //<23>
        } );
}
