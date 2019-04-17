function makeDemo1() {                                         //<1>
    d3.tsv( "examples-simple.tsv" )                            //<2>
        .then( function( data ) {                              //<3> <4>
            d3.select( "svg" )                                 //<5>
                .selectAll( "circle" )                         //<6>
                .data( data )                                  //<7>
                .enter()                                       //<8>
                .append( "circle" )                            //<9>
                .attr( "r", 5 ).attr( "fill", "red" )          //<10>
                .attr( "cx", function(d) { return d["x"] } )   //<11>
                .attr( "cy", function(d) { return d["y"] } );    
        } );
}
