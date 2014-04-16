window.onload = function() {
 
  
    // Tile class
  var Tile={
      createNew: function(){
      var tile = {};
          tile.hover=false;
      tile.elm=jQuery();
    tile.onHover=function(){
      this.hover=true;
      this.elm.addClass("hover");
      //hover effect
    };
    tile.onOut=function(){
      this.hover=false;
      //cancel hover effect
        this.elm.removeClass("hover");
    };
        tile.bind=function(elm){
        this.elm=elm;
          
        };
    return tile;
      }
  };
  
  var cursor={
    currentTile:"",
      elm:"",
    getTile:function(direction){
      //getTile at left/right/up/down/current
      
    },
    moveToTile: function(direction){
      //get tile
      var tile=this.getTile(direction);
      //move to tile
      setToTile(tile);
    },
    setToTile: function(tile){
      //resume old tile
      if(this.currentTile){
          var message=new Event("message");
       message.act="out";
          
        document.dispatchEvent(message); 
      }
      //set currentTile
      this.currentTile=tile;
        var message=new Event("message");
    message.act="hover";
      console.log(this.elm);
      document.dispatchEvent(message);
    },
    bind:function(elm){
    this.elm=elm;
     
    }
  };
  
  
  //bind elements  
  cursor.bind(document.getElementById("cursor"));
  $("#cursor").data(cursor);
    
  $(".grid-item, .list-item").each(function(index,e){
   
  var tile = Tile.createNew();
    tile.bind(e);
    $(e).data(tile);
    $(e).bind("message",function(evt){
    if("hover"==evt.act){
      this.onHover();
    }else if("out"==evt.act){
      this.onOut();
    }
    
    message.act="";
  },false);
  });
    
 
  
  //listen to arrow key
  $("#cursor").keydown(function(evt){
    //if arrow key
    switch(evt.which){
      case 37:
        this.moveToTile("left");
        break;
      case 38:
        this.moveToTile("up");
        break;
      case 39:
        this.moveToTile("right");
        break;
      case 40:
        this.moveToTile("down");
        break;
      default:
      break;
    }
  });
  
  //listen to enter key
  $("#cursor").click(function(evt){
    //if enter key
    if(evt.which==13){
      this.currentTile.dispatchEvent("click");
    }
  });
  
  
   
    
    
      $("#cursor").data().setToTile($(".grid-item")[0]);
      
  
  
};

