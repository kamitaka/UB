var Stage0 = {
	mapData : [
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
],
	stage_x : 13,
	stage_y : 13,
	maxBlocks : 35,
	timeLimit : 0.0
};


var Stage1 = {
	mapData : [
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
],
	stage_x : 13,
	stage_y : 13,
	maxBlocks : 35,
	timeLimit : 0.0
};


var Stage2 = {
	mapData : [
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
2, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2,
2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2,
2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2,
2, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2,
2, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 2,
2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2,
2, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 2,
2, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 2,
2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2,
2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2,
2, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2,
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
],
	stage_x : 13,
	stage_y : 13,
	maxBlocks : 35,
	timeLimit : 0.0
};

var Stage3 = {
	mapData : [
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2,
2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2,
2, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 2,
2, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2,
2, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2,
2, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2,
2, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 2,
2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2,
2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
],
	stage_x : 13,
	stage_y : 13,
	maxBlocks : 45,
	timeLimit : 0.0
};

var Stage4 = {
	mapData : [
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2,
2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2,
2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2,
2, 0, 1, 0, 2, 0, 2, 0, 0, 2, 2, 0, 2,
2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 2,
2, 1, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 2,
2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2,
2, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 2,
2, 2, 1, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2,
2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2,
2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
],
	stage_x : 13,
	stage_y : 13,
	maxBlocks : 45,
	timeLimit : 0.0
};