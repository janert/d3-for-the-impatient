
window.addEventListener( "load", makeTree );
function makeTree() {
    d3.json( "filesys.json" ).then( function(json) {    
        var nodes = d3.hierarchy(json, d=>d.kids);                //<1>
        d3.tree().size( [250,225] )( nodes );                     //<2>
        
        var g = d3.select( "#tree" ).append( "g" )                //<3>
            .attr( "transform", "translate(25, 25)" );
    
        var lnkMkr = d3.linkVertical().x( d=>d.x ).y( d=>d.y );   //<4>
        g.selectAll( "path" ).data( nodes.links() ).enter()       //<5>
            .append( "path" ).attr( "d", d=>lnkMkr(d) )
            .attr( "stroke", "red" ).attr( "fill", "none" );
        
        g.selectAll("circle").data( nodes.descendants() ).enter() //<6>
            .append("circle").attr( "r", 5 )
            .attr( "cx", d=>d.x ).attr( "cy", d=>d.y );
    } );
}

window.addEventListener( "load", makeTree2 )
function makeTree2() {
    d3.json( "filesys.json" ).then( function(json) {	
	var nodes = d3.hierarchy(json, d=>d.kids)
	    .sort( (a,b)=>b.height-a.height );	
	d3.cluster().size( [250,225] )( nodes );

	var g = d3.select( "#tree2" ).append( "g" )
	    .attr( "transform", "translate(25, 25)" );   

	var lnkMkr = d3.linkVertical().x( d=>d.x ).y( d=>d.y );
	g.selectAll( "path" ).data( nodes.links() ).enter()
	    .append( "path" ).attr( "d", d=>lnkMkr(d) )
	    .attr( "stroke", "red" ).attr( "fill", "none" );

	g.selectAll( "circle" ).data( nodes.descendants() ).enter()
	    .append( "circle" ).attr( "r", 5 )
	    .attr( "cx", d=>d.x ).attr( "cy", d=>d.y );

	/*
        g.selectAll( "text" ).data( nodes.descendants() ).enter()
            .append( "text" )
	    .attr( "transform", d=>"rotate(90,"+d.x+","+d.y+")")
	    .attr( "font-size", 9 )
            .attr( "x", d=>d.x+8 ).attr( "y", d=>d.y )
	    .text( d=>d.data.name )
	*/
    } )
}


window.addEventListener( "load", makeRadial );
function makeRadial() {
    d3.json( "filesys.json" ).then( function(json) {    
        var nodes = d3.cluster().size( [2*Math.PI, 125] )(        //<1>
            d3.hierarchy( json, d=>d.kids )
                .sort( (a,b)=>b.height-a.height )
        );

        var g = d3.select( "#radial" ).append( "g" )
            .attr( "transform", "translate(150, 150)" );          //<2>

        var h = function( r, phi ) { return  r*Math.sin(phi) }    //<3>
        var v = function( r, phi ) { return -r*Math.cos(phi) }  
        
        g.selectAll( "line" ).data( nodes.links() ).enter()
            .append( "line" ).attr( "stroke", "red" )
            .attr( "x1", d=>h(d.source.y, d.source.x) )           //<4>
            .attr( "y1", d=>v(d.source.y, d.source.x) )
            .attr( "x2", d=>h(d.target.y, d.target.x) )
            .attr( "y2", d=>v(d.target.y, d.target.x) );

        g.selectAll( "circle" ).data( nodes.descendants() ).enter()
            .append( "circle" ).attr( "r", 5 )
            .attr( "cx", d=>h(d.y, d.x) )
            .attr( "cy", d=>v(d.y, d.x) );
    } )
}

window.addEventListener( "load", makeTreemap );
function makeTreemap() {
    d3.json( "filesys.json" ).then( function(json) {
        var sc = d3.scaleOrdinal( d3.schemeReds[8] );
        
        var nodes = d3.hierarchy(json, d=>d.kids).sum(d=>d.size)  //<1>
            .sort((a,b) => b.height-a.height || b.value-a.value); //<2>
        
        d3.treemap().size( [300,300] ).padding(5)(nodes);         //<3>
        
        var g = d3.select( "#treemap" ).append( "g" );
        
        g.selectAll( "rect" ).data( nodes.descendants() ).enter()
            .append( "rect" )
            .attr( "x", d=>d.x0 ).attr( "y", d=>d.y0 )
            .attr( "width", d=>d.x1-d.x0 )                        //<4> 
            .attr( "height", d=>d.y1-d.y0 )
            .attr( "fill", d=>sc(d.depth) ).attr( "stroke", "red" );

        g.selectAll( "text" ).data( nodes.leaves() ).enter()      //<5>
            .append( "text" )
            .attr( "text-anchor", "middle" ).attr( "font-size", 10 )
            .attr( "x", d=>(d.x0+d.x1)/2 )
            .attr( "y", d=>(d.y0+d.y1)/2+2 )
            .text( d=>d.data.name );    
    } );
}

window.addEventListener( "load", makeNetwork );
function makeNetwork() {
    d3.json( "network.json" ).then( res => {
        var svg = d3.select( "#net" )
        var scC = d3.scaleOrdinal( d3.schemePastel1 )
        
        d3.shuffle( res.ps ); d3.shuffle( res.ln );
        
        d3.forceSimulation( res.ps )
            .force("ct", d3.forceCenter( 300, 300 ) )
            .force("ln",
                   d3.forceLink( res.ln ).distance(40).id(d=>d.id) )
            .force("hc", d3.forceCollide(10) )
            .force("many", d3.forceManyBody() )
            .on( "end", function() {
                svg.selectAll( "line" ).data( res.ln ).enter()
                    .append( "line" ).attr( "stroke", "black" )
                    .attr( "x1", d=>d.source.x )
                    .attr( "y1", d=>d.source.y )
                    .attr( "x2", d=>d.target.x )
                    .attr( "y2", d=>d.target.y );
            
                svg.selectAll("circle").data(res.ps).enter()
                    .append("circle")
                    .attr( "r", 10 ).attr( "fill", (d,i) => scC(i) )
                    .attr( "cx", d=>d.x ).attr( "cy", d=>d.y )

                svg.selectAll("text").data(res.ps).enter()
                    .append("text")
                    .attr( "x", d=>d.x ).attr( "y", d=>d.y+4 )
                    .attr( "text-anchor", "middle" )
                    .attr( "font-size", 10 )
                    .text( d=>d.id );
            } )
    } );
}

window.addEventListener( "load", makeSimul );
function makeSimul() {   
    var ps = [ { x: 350, y: 300, vx: 0, vy: 1 },
               { x: 250, y: 300, vx: 0, vy: -1 } ];
    var ln = [ { index: 0, source: ps[0], target: ps[1] } ];
    
    var cs1 = d3.select( "#simul" ).select( "#c1" );
    var cs2 = d3.select( "#simul" ).select( "#c2" );
    
    var sim = d3.forceSimulation( ps )
        .alphaDecay( 0 ).alphaMin( -1 ).velocityDecay( 0 )
        .force("ln", d3.forceLink(ln).distance(50).strength(0.01))
        .on( "tick", function() {
            cs1.attr( "cx", ps[0].x ).attr( "cy", ps[0].y );
            cs2.attr( "cx", ps[1].x ).attr( "cy", ps[1].y );
        } );
}
