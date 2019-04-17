
window.addEventListener( "load", makeKeys );
function makeKeys() {
    var ds1 = [["Mary", 1], ["Jane", 4], ["Anne", 2]];            //<1>
    var ds2 = [["Anne", 5], ["Jane", 3]];                         //<2>

    var scX = d3.scaleLinear().domain([0, 6]).range([50, 300]),
        scY = d3.scaleLinear().domain([0, 3]).range([50, 150]);

    var j = -1, k = -1;                                           //<3>

    var svg = d3.select( "#key" );                                //<4>
    
    svg.selectAll( "text" )                                       //<5>
        .data(ds1).enter().append( "text" )
        .attr( "x", 20 ).attr( "y", d=>scY(++j) ).text( d=>d[0] );
    
    svg.selectAll("circle").data(ds1).enter().append( "circle" )  //<6>
        .attr( "r", 5 ).attr( "fill", "red" )
        .attr( "cx", d=>scX(d[1]) ).attr( "cy", d=>scY(++k)-5 );

    svg.on( "click", function() {
        var cs = svg.selectAll( "circle" ).data( ds2, d=>d[0] );  //<7>

        cs.transition().duration(1000).attr("cx", d=>scX(d[1]) ); //<8>
        cs.exit().attr( "fill", "blue" );                         //<9>
    } );
}

window.addEventListener( "load", makeSort );
function makeSort() {
    var data = [ "Jane", "Anne", "Mary" ];

    var ul = d3.select( "#sort" );
    ul.selectAll( "li" ).data( data ).enter().append( "li" )      //<1>
        .text( d=>d ); 

    // insert on mouse enter
    var once;                                                     //<2>
    ul.on( "mouseenter", function() {                             //<3>
        if( once ) { return; }  
        once = 1;
        ul.insert( "li", ":nth-child(2)" )                        //<4>
            .datum( "Lucy" ).text( "Lucy" ); 
        ul.insert( "li", ":first-child" )                         //<5>
            .datum( "Lisa" ).text( "Lisa" );  
    } );
        
    // sort on click
    ul.on( "click", function() {                                  //<6>
        ul.selectAll( "li" ).sort( (a,b)=>( a<b?1:b<a?-1:0 ) );   //<7>
    } );
}

window.addEventListener( "load", makeUpdate );
function makeUpdate() {
    var ds1 = [ [2, 3, "green"], [1, 2, "red"], [2, 1, "blue"],   //<1>
                [3, 2, "yellow"] ];    
    var ds2 = [ [1, 1, "red"], [3, 3, "black"], [1, 3, "lime"],
                [3, 1, "blue"]];
    
    var scX = d3.scaleLinear().domain([1, 3]).range([100, 200]),  //<2>
        scY = d3.scaleLinear().domain([1, 3]).range([50, 100]);
    
    var svg = d3.select( "#update" );                             //<3>
    
    svg.on( "click", function() {                                 //<4>
        [ ds1, ds2 ] = [ ds2, ds1 ];                              //<5>
        
        var cs = svg.selectAll( "circle" ).data( ds1, d=>d[2] );  //<6>
        
        cs.exit().remove();                                       //<7>
        
        cs = cs.enter().append( "circle" )                        //<8>
            .attr( "r", 5 ).attr( "fill", d=>d[2] )
            .merge( cs );                                         //<9>

        cs.attr( "cx", d=>scX(d[0]) ).attr( "cy", d=>scY(d[1]) ); //<10>
    } );
    
    svg.dispatch( "click" );                                      //<11>
}
