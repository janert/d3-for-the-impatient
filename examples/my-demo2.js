function makeDemo2() {
    d3.csv( "dense.csv" )
        .then( function( data ) {
            console.log(data)
            var pxX = 600, pxY = 600;                             //<1>
            
            var makeScale = function( accessor, range ) {         //<3>
                return d3.scaleLinear()
                    .domain( d3.extent( data, accessor ) )
                    .range( range ).nice();                           
            }
            var scX  = makeScale( d => d["A"],  [0, pxX] );
            var scY1 = makeScale( d => d["B"], [pxY, 0] );
            var scY2 = makeScale( d => d["C"], [pxY, 0] );
            
            console.log(scX)
            console.log(scY2)
            console.log(scY1)


            d3.select( "svg" )                                    //<6>
                .append( "g" ).attr( "id", "ds1" )                //<7>
                .selectAll( "circle" )                            //<8>
                .data(data).enter().append("circle")
                .attr( "r", 5 ).attr( "fill", "green" )           //<9>
                .attr( "cx", d => d["A"])                   //<10>
                .attr( "cy", d => d["B"]);                //<11>
/*            
            d3.select( "svg" )                                    //<12>
                .append( "g" ).attr( "id", "ds2" )
                .attr( "fill", "blue" )                           //<13>
                .selectAll( "circle" )                            //<14>
                .data(data).enter().append("circle")
                .attr( "r", 5 )
                .attr( "cx", d => d["A"])
                .attr( "cy", d => d["C"]);                //<15>
*/            
            var lineMaker = d3.line()                             //<16>
                .x( d => d["A"])                          //<17>
                .y( d => d["B"]);
            
            d3.select( "#ds1" )                                   //<18>
                .append( "path" )                                 //<19>
                .attr( "fill", "none" ).attr( "stroke", "red" )     
                .attr( "d", lineMaker(data) );                    //<20>
           
//            lineMaker.y( d => d["C"]);                  //<21>

/*            d3.select( "#ds2" )                                   //<22>
                .append( "path" )
                .attr( "fill", "none" ).attr( "stroke", "cyan" )
                .attr( "d", lineMaker(data) );

//          d3.select( "#ds2" ).attr( "fill", "red" );            //<23>
*/
    } );
}
