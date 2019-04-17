function makeDemo3() {
    d3.tsv( "examples-multiple.tsv" )
        .then( function( data ) {
            var svg = d3.select( "svg" );                         //<1>
            
            var pxX = svg.attr( "width" );                        //<2>
            var pxY = svg.attr( "height" );
            
            var makeScale = function( accessor, range ) {         //<3>
                return d3.scaleLinear()
                    .domain( d3.extent( data, accessor ) )
                    .range( range ).nice();                           
            }
            var scX  = makeScale( d => d["x"],  [0, pxX] );
            var scY1 = makeScale( d => d["y1"], [pxY, 0] );
            var scY2 = makeScale( d => d["y2"], [pxY, 0] );

            var drawData = function( g, accessor, curve ) {       //<4>
                // draw circles
                g.selectAll( "circle" ).data(data).enter()
                    .append("circle")
                    .attr( "r", 5 )
                    .attr( "cx", d => scX(d["x"]) )
                    .attr( "cy", accessor );
                
                // draw lines
                var lnMkr = d3.line().curve( curve )              //<5>
                    .x( d=>scX(d["x"]) ).y( accessor );
                
                g.append( "path" ).attr( "fill", "none" )
                    .attr( "d", lnMkr( data ) );
            }

            var g1 = svg.append( "g" );                           //<6>
            var g2 = svg.append( "g" );

            drawData( g1, d => scY1(d["y1"]), d3.curveStep );     //<7>
            drawData( g2, d => scY2(d["y2"]), d3.curveNatural );

            g1.selectAll( "circle" ).attr( "fill", "green" );     //<8>
            g1.selectAll( "path" ).attr( "stroke", "cyan" );

            g2.selectAll( "circle" ).attr( "fill", "blue" );
            g2.selectAll( "path" ).attr( "stroke", "red" );

            var axMkr = d3.axisRight( scY1 );                     //<9>
            axMkr( svg.append("g") );                             //<10>

            axMkr = d3.axisLeft( scY2 );
            svg.append( "g" )
                .attr( "transform", "translate(" + pxX + ",0)" )  //<11>
                .call( axMkr );                                   //<12>

            svg.append( "g" ).call( d3.axisTop( scX ) )
                .attr( "transform", "translate(0,"+pxY+")" );     //<13>
        } );
}
