window.onload = function() {
  
  var message = document.createEvent("Event");
  message.initEvent("message",true,true);
  message.act = "";
  
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
          elm.data(this);
        };
    return tile;
      }
  };
  
  var cursor={
    currentTile:"",
      elm:jQuery(),
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
        message.act="out";
        this.elm.dispathEvent("message"); 
      }
      //set currentTile
      this.currentTile=tile;
      message.act="hover";
      this.elm.dispathEvent("message");
    },
    bind:function(elm){
    this.elm=elm;
      elm.data(this);
    }
  };
  
  
  //bind elements  
  cursor.bind($("#cursor"));
    
  $(".grid-item, .list-item").each(function(e){
  var tile = Tile.createNew();
    tile.bind(e);
  });
    
  $(".grid-item, .list-item").bind("message",function(evt){
    if("hover"==evt.act){
      this.onHover();
    }else if("out"==evt.act){
      this.onOut();
    }
    
    message.act="";
  },false);
  
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
      this.currentTile.dispathEvent("click");
    }
  });
  
  
   
    
    
      $("#cursor").data().setToFile($(".grid-item")[0]);
      
  
  
};

