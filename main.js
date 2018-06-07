const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function node(x,y,active){
  return {
    x : x, y : y, r : 15, active: active,
    draw : function(){
      if (this.active){
        context.fillStyle = "blue";
      } else {
        context.fillStyle = "black";
      }
      context.beginPath();
      context.arc(x, y, this.r, 0, 2 * Math.PI, false);
      context.fill()
    }
  }
}

function edge(start,end){
  return {
    start : start, end : end,
    draw : function(){
      context.beginPath();
      context.moveTo(start.x,start.y);
      context.lineTo(end.x,end.y);
      context.stroke();
    }
  }
}

function clicked(event){
  canvasX = event.pageX - (this.offsetLeft - this.scrollLeft);
  canvasY = event.pageY - (this.offsetTop - this.scrollTop);
  onNode={on:false,i:0}
  for (i=0;i<nodes.length && !onNode.on;i++){
    on = (nodes[i].x - nodes[i].r <= canvasX && nodes[i].x + nodes[i].r >= canvasX && nodes[i].y + nodes[i].r >= canvasY && nodes[i].y - nodes[i].r <= canvasY)
    onNode={on:on,i:i}
  }
  if (event.button == 0){
    if (!onNode.on){
      nodes.push(node(canvasX,canvasY,false))
    }else {
      activeNode = false
      for(i=0;i<nodes.length && !activeNode;i++){
        if (nodes[i].active){
          edges.push(edge(nodes[i],nodes[onNode.i]))
          nodes[i].active = false
          activeNode = true
        }
      }
      if (!activeNode){
        nodes[onNode.i].active = true
      }
   }
  } else if (event.button == 2){
    if (onNode.on){
      for(i=0;i < edges.length;i++){
        if(edges[i].start == nodes[onNode.i] || edges[i].end == nodes[onNode.i]){
          edges.splice(i, 1)
          i--
        }
      }
      nodes.splice(onNode.i, 1)
    }
  } else if (event.button == 1){
    edges = []
    nodes = []
  }
}

function loop(){
  context.rect(0,0,canvas.width,canvas.height)
  context.fillStyle = "#72a1e5";
  context.fill()
  for (i=0;i<edges.length;i++){
    edges[i].draw()
  }
  for (i=0;i<nodes.length;i++){
    nodes[i].draw()
  }
}

edges = []
nodes = []
canvas.addEventListener("mousedown", clicked, false);
setInterval(loop, 15);
