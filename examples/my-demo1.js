function makeDemo1() {                                         //<1>
    d3.csv( "dense.csv" )                            //<2>
        .then( function( data ) {
            console.log(data)                                   //<3> <4>
            d3.select( "svg" )                                 //<5>
                .selectAll( "circle" )                         //<6>
                .data( data )                                  //<7>
                .enter()                                       //<8>
                .append( "circle" )                            //<9>
                .attr( "r", 5 ).attr( "fill", "red" )          //<10>
                .attr( "cx", function(d) { return d["A"] } )   //<11>
                .attr( "cy", function(d) { return d["B"] } );    
        } );
}
