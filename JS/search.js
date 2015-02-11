var search = {
	map : null,
	map_x : 0,
	map_y : 0,

	start : null,

	now : null,

	mark : 9,

	count : 0,

	main : function(mass){
		this.format();
		this.loadMap();

		var click_pos = this.getClickPosition(mass);
		console.log("c " +click_pos);
		this.map[click_pos] = this.mark;
		console.log(this.map);
		this.start = this.getStartPosition(click_pos);
		console.log("s " +this.start);
		this.now = this.start;

		this.searchMap();
		var permit = this.judge();
		//permit = true;
		return permit;
	},

	getClickPosition : function(mass){
		var x = parseInt(mass.getAttribute("coordinate_x"));
		var y = parseInt(mass.getAttribute("coordinate_y"));
		console.log("x " +x);
		console.log("y " +y);
		return x + this.map_x * y;
	},

	getStartPosition : function(click_pos){
		var start_pos = 0;
		if(this.map[click_pos - this.map_x] === 0){
			start_pos = click_pos - this.map_x;
		}else if(this.map[click_pos + this.map_x] === 0){
			start_pos = click_pos + this.map_x;
		}else if(this.map[click_pos + 1] === 0){
			start_pos = click_pos + 1;
		}else if(this.map[click_pos - 1] === 0){
			start_pos = click_pos - 1;
		}
		return start_pos;
	},

	loadMap : function(){
		var map = Stage.stageData;
		this.map = [];
		for(var i=0;i<map.length;i++){
			this.map[i] = map[i];
		}
		this.map_x = Stage.stage_x;
		this.map_y = Stage.stage_y;
	},

	searchMap : function(){
		var now_pos = this.now;
		this.map[now_pos] = this.mark;
		this.count += 1;
		
		if(this.map[now_pos - this.map_x] === 0){
			this.goUp();
			this.now = now_pos;
		}
		if(this.map[now_pos + this.map_x] === 0){
			this.goDown();
			this.now = now_pos;
		}
		if(this.map[now_pos - 1] === 0){
			this.goLeft();
			this.now = now_pos;
		}
		if(this.map[now_pos + 1] === 0){
			this.goRight();
			this.now = now_pos;
		}
		//console.log(this.map);
		//console.log(this.count);

	},

	goUp : function(){
		this.now -= this.map_x;
		//
		this.searchMap();
	},

	goDown : function(){
		this.now += this.map_x;
		//
		this.searchMap();
	},

	goLeft : function(){
		this.now -= 1;
		//
		this.searchMap();
	},

	goRight : function(){
		this.now += 1;
		//
		this.searchMap();
	},

	judge : function(){
		var m_void = document.querySelectorAll(".m_void").length;
		console.log(this.count +" / "+ m_void);
		if(this.count === m_void){
			return true;
		}else{
			return false;
		}
		
	},

	format : function(){
		this.map = null;
		this.map_x = 0;
		this.map_y = 0;
		this.start = null;
		this.now = null;
		this.mark = 9;
		this.count = 1;
	}
}