//bodyがonloadされたときの初期化
var initialize = {
	main : function(){
		this.stageEdit();
		WebsocketClass.websoketInit();
	},

	stageEdit : function(){
		var x = 10;
		var y = 10;

		for(var i=0;i<y;i++){
			for(var j=0;j<x;j++){
				var ele = document.createElement("div");
				ele.setAttribute("name", "mass");
				ele.setAttribute("mode", 0);
				ele.setAttribute("coordinate_x", j);
				ele.setAttribute("coordinate_y", i);
				ele.className = "m_void";
				ele.onclick = Mass.clicked;
				document.getElementById("area").appendChild(ele);
			}
		}
	}
}


//通信用

kakeru=52;
var WebsocketClass = {
	ws : null, 
	websoketInit : function(){
		this.ws = new WebSocket("ws://192.168.24.57:3001");
	     // メッセージ受信時の処理
	     this.ws.onmessage = function(event){
	        console.log(event.data);
    	    t = event.data;
    	    obj = JSON.parse(t);
    	    if(obj.type="position"){
    	    	Player.updateCoordinate((Number(obj.position.split(",")[0])*kakeru+28), (Number(obj.position.split(",")[1])*kakeru+28));
    	    }
    	    console.log(obj.position);
    	    
    	 }
    },

    //mode : "0", "1", or "2"
    //x : 0 ～ 10
    //y : 0 ～ 10
    sendGenerate : function(mode, x, y){
    	var message = {
    		"type" : "generate",
    		"mode" : mode,
    		"coordinate_x" : x,
    		"coordinate_z" : y
    	};
    	console.log(message);
    	this.ws.send(JSON.stringify(message));
    },

    sendDelete : function(x, y){
    	var message = {
    		"type" : "delete",
    		"coordinate_x" : x,
    		"coordinate_z" : y
    	};
    	console.log("d: "+x+", "+y);
    	this.ws.send(JSON.stringify(message));
    }
}


//各マスのクリックイベント
var Mass = {
	//関数
	reverse : function(e){
		if(e.className === "m_void" && Stage.blocks < Stage.maxBlocks && search.main(e)){
			Stage.addBlocks(e);
		}else if(e.className === "m_block"){
			Stage.deleteBlocks(e);
		}
	},

	clicked : function(e){
		if(Stage.gameStart === true){
			Mass.reverse(e.target);
		}
	}
}


//ステージを更新したり
var Stage = {
	stageData : null,
	blocks: 0,
	maxBlocks: 0,
	timer : 0.0,
	gameStart: false,

	loadStage : function(stageNum){
		if(stageNum === 1){
			this.stageData = Stage1.mapData;
			this.changeMax(Stage1.maxBlocks);
			this.setTimer(Stage1.timeLimit);
		}
		this.reflectionData();
	},

	reflectionData : function(){
		var eleList = document.querySelectorAll("*[name='mass']");
		for(var i=0;i<eleList.length;i++){
			if(this.stageData[i] === 0){
				this.deleteBlocks(eleList[i]);
			}else if(this.stageData[i] === 1){
				this.addBlocks(eleList[i]);
			}else if(this.stageData[i] === 2){
				this.addWall(eleList[i]);
			}
		}
		this.loadComplete();
	},

	loadComplete : function(){
		Start.ready = true;
	},

	changeMax : function(num){
		this.maxBlocks = num;
		document.getElementById("max").innerHTML = this.maxBlocks;
	},

	setTimer : function(num){
		this.timer = num;
		document.getElementById("timer").innerHTML = this.timer;
	},

	reduceTimer : function(num){
		if(this.timer > 0){
			var tmp = this.timer;
			tmp -= num;
			tmp *= 10;
			tmp = Math.round(tmp);
			tmp /= 10;
			this.timer = tmp;
			document.getElementById("timer").innerHTML = this.timer;
		}else{
			this.timer = 0;
		}
	},

	addBlocks : function(mass){
		if(mass.className === "m_void"){
			console.log("addBlocks");
			mass.setAttribute("mode", 1);
			mass.className = "m_block";
			this.blocks += 1;
			document.getElementById("blocks").innerHTML = this.blocks;

			var x = Number(mass.getAttribute("coordinate_x"));
			var y = Number(mass.getAttribute("coordinate_y"));
			Stage.stageData[Number(x+y*10)] = 1;
			//console.log(Stage.stageData);
			
			//console.log(this.stageData);
			WebsocketClass.sendGenerate(1, x, y);
		}
		
	},

	deleteBlocks : function(mass){
		if(mass.className === "m_block"){
			mass.setAttribute("mode", 0);
			mass.className = "m_void";
			this.blocks -= 1;
			document.getElementById("blocks").innerHTML = this.blocks;

			var x = Number(mass.getAttribute("coordinate_x"));
			var y = Number(mass.getAttribute("coordinate_y"));
			Stage.stageData[Number(x+y*10)] = 0;
			WebsocketClass.sendDelete(x, y);
		}
	},

	addWall : function(mass){
		mass.setAttribute("mode", 2);
		mass.className = "m_wall";

		var x = mass.getAttribute("coordinate_x");
		var y = mass.getAttribute("coordinate_y");
		Stage.stageData[x+y*10] = 2;
		WebsocketClass.sendGenerate(2, x, y);
	}
}


var Start = {
	arrayData : [],
	ready : false,

	//現在未使用
	getArrayData : function(){
		Start.arrayData = [];
		console.log(Start.arrayData);
		var eleList = document.querySelectorAll("*[name='mass']");
		for(var i=0;i<eleList.length;i++){
			if(eleList[i].className === "m_void"){
				Start.arrayData.push(0);
			}else if(eleList[i].className === "m_block"){
				Start.arrayData.push(1);
			}
			console.log(Start.arrayData);
		}
	},

	main : function(){
		if(this.ready){
			Stage.gameStart = true;
			this.countdownStart();
		}
		
	},

	countdownStart : function(){
		this.countdown();
	},

	countdown : function(){
		Stage.reduceTimer(0.1);
		setTimeout("Start.countdown()", 100);
	}
}

var Player = {
	coordinate_x : 0,
	coordinate_y : 0,

	updateCoordinate : function(x, y){
		document.querySelector("#player").style.top = x +"px";
    	document.querySelector("#player").style.left =  y +"px";
    	this.coordinate_x = Math.floor(Number(x / 52));
    	this.coordinate_y = Math.floor(Number(y / 52));
		document.querySelector("#pos_x").innerHTML = this.coordinate_x;
		document.querySelector("#pos_y").innerHTML = this.coordinate_y;
	}
}