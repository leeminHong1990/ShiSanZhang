"use strict";

var GameRoomEntity = KBEngine.Entity.extend({
	ctor : function(player_num)
	{
		this._super();
		this.roomId = undefined;
		this.current_round = 0;
		this.game_round = 8;
		this.ownerId = undefined;
		this.isAgent = false;
  		this.player_num = player_num || 4;
  		this.pay_mode = 0;
  		this.hand_prepare = 1;
  		this.roomType = undefined;
    	this.club_id = 0;

		this.playerInfoList = [null, null, null, null];
		this.playerDistanceList = [[-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1]];
		this.playerStateList = [0, 0, 0, 0];
		this.uploadedStateList = [0, 0, 0, 0];

		this.room_state = const_val.ROOM_WAITING;

		this.applyCloseLeftTime = 0;
		this.applyCloseFrom = 0;
		this.applyCloseStateList = [0, 0, 0, 0];

        this.playerPokersList  = [[], [], [], []];
		// 每局不清除的信息
		this.playerScoreList = [0, 0, 0, 0];
		this.msgList = [];		//所有的聊天记录

	    KBEngine.DEBUG_MSG("Create GameRoomEntity")
  	},

  	reconnectRoomData : function(recRoomInfo){
  		cc.log("reconnectRoomData",recRoomInfo)
        this.uploadedStateList = recRoomInfo["uploaded_state_list"];
  		this.playerStateList = recRoomInfo["player_state_list"];

  		this.applyCloseLeftTime = recRoomInfo["applyCloseLeftTime"];
  		this.applyCloseFrom = recRoomInfo["applyCloseFrom"];
		this.applyCloseStateList = recRoomInfo["applyCloseStateList"];

		if(this.applyCloseLeftTime > 0){
			onhookMgr.setApplyCloseLeftTime(this.applyCloseLeftTime);
		}

		this.updateRoomData(recRoomInfo["init_info"]);
		for(var i = 0; i < recRoomInfo["player_advance_info_list"].length; i++){
			var curPlayerInfo = recRoomInfo["player_advance_info_list"][i];
			this.playerInfoList[i]["score"] = curPlayerInfo["score"];
			this.playerInfoList[i]["total_score"] = curPlayerInfo["total_score"];
            this.playerPokersList[i] = curPlayerInfo["pokers"];
		}
		if (this.discard_seconds > 0) {
			onhookMgr.setWaitLeftTime(recRoomInfo["waitTimeLeft"])
		}

        if (const_val.FAKE_COUNTDOWN > 0) {
            onhookMgr.setWaitLeftTime(const_val.FAKE_COUNTDOWN);
        }
  	},

  	updateRoomData : function(roomInfo){
  		cc.log('updateRoomData:',roomInfo)
  		this.roomId = roomInfo["roomId"];
  		this.ownerId = roomInfo["ownerId"];
  		this.current_round = roomInfo["current_round"]
  		this.game_round = roomInfo["game_round"];
  		this.player_num = roomInfo["player_num"];
  		this.pay_mode = roomInfo["pay_mode"];
  		this.isAgent = roomInfo["isAgent"];
		this.hand_prepare = roomInfo["hand_prepare"];
      	this.club_id = roomInfo["club_id"];
        this.roomType = roomInfo["roomType"];
        this.room_state = roomInfo["room_state"];
        this.lucky_poker = roomInfo["lucky_poker"];
  		for(var i = 0; i < roomInfo["player_base_info_list"].length; i++){
  			this.updatePlayerInfo(roomInfo["player_base_info_list"][i]["idx"], roomInfo["player_base_info_list"][i]);
		}
        this.updateDistanceList();
		this.addMenuShareAppMsg()
  	},

  	updatePlayerInfo : function(serverSitNum, playerInfo){
  		this.playerInfoList[serverSitNum] = playerInfo;
  	},

  	updatePlayerState : function(serverSitNum, state){
  		this.playerStateList[serverSitNum] = state;
  	},

  	updatePlayerOnlineState : function(serverSitNum, state){
  		this.playerInfoList[serverSitNum]["online"] = state;
  	},

    updatePlayerCharacter:function (serverSitNum, character) {
        this.playerInfoList[serverSitNum]["character"] = character;
    },

	updatePlayerWaitFlag:function (serverSitNum, wait_flag) {
        this.playerInfoList[serverSitNum]["wait_flag"] = wait_flag;
    },

	updateDistanceList : function () {
        for(var i = 0 ; i < this.playerInfoList.length ; i++) {
            for(var j = 0 ; j < this.playerInfoList.length ; j++) {
                if(i === j){this.playerDistanceList[i][j] = -1;continue;}
                if(this.playerInfoList[i] && this.playerInfoList[j]) {
                    var distance = cutil.calc_distance(parseFloat(this.playerInfoList[i]["lat"]), parseFloat(this.playerInfoList[i]["lng"]), parseFloat(this.playerInfoList[j]["lat"]), parseFloat(this.playerInfoList[j]["lng"]));
                    this.playerDistanceList[i][j] = (distance || distance == 0 ? distance : -1);
                }else {
                    this.playerDistanceList[i][j] = -1;
				}
            }
        }
    },

	getRoomCreateDict:function () {
  		return {
			"game_round"  	: this.game_round,
			"pay_mode"  	: this.pay_mode,
			"hand_prepare" 	: this.hand_prepare,
            "lucky_poker" 	: this.lucky_poker,
		};
    },

  	startGame : function(){
  		this.current_round = this.current_round + 1;
  		this.room_state = const_val.ROOM_PLAYING;

		this.playerPokersList = [[], [], [], []];
        this.uploadedStateList = [0, 0, 0, 0];

        // 准备好的游客 加入游戏中
		for(var i=0; i<this.playerInfoList.length; i++){
			if(this.playerInfoList[i] && this.playerInfoList[i]["wait_flag"] === 1){
				this.playerInfoList[i]["wait_flag"] = 0;
				this.playerInfoList[i]["character"] = const_val.CHARACTER_PLAYER;
			}
		}
  	},

  	endGame : function(){
  		// 重新开始准备
  		this.room_state = const_val.ROOM_WAITING;
        this.playerStateList = [0, 0, 0, 0];
        this.uploadedStateList = [0, 0, 0, 0];
        this.playerPokersList = [[], [], [], []];
  	},

  	addMenuShareAppMsg : function(){
  		var self = this;
        if(!((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) || switches.TEST_OPTION){
            // var roominfo_list = [["普通麻将,","东带庄,"],["无摸宝,","摸一宝,","摸二宝,"]];
            // var share_title = self.club_id > 0 ? ' 茶楼号【' + self.club_id.toString() + '】,招募群主,1000红包奖励群主!' : ' 房间号【' + self.roomId.toString() + '】,招募群主,1000红包奖励群主!';
            // var share_desc = (roominfo_list[0][self.game_mode]) + (self.game_round + '局,') + (roominfo_list[1][self.luckyTileNum]) + (self.max_lose === 9999 ? '无封顶' : self.max_lose + '分封顶');
            // cutil.share_func(share_title, share_desc);
		}
  	},

    getBaseData:function () {
        return {
        	'roomId'		: this.roomId,
            'player_num'	: this.player_num,
            'game_round'	: this.game_round,
            'pay_mode'		: this.pay_mode,
			'lucky_poker'	: this.lucky_poker,
            'hand_prepare'	: this.hand_prepare,
            'roomType'		: this.roomType,
            'club_id'		: this.club_id
        }
    },

	// 房间人数是否已满
	is_full:function () {
  		var sum_player_num = 0;
		for(var i=0; i<this.playerInfoList.length; i++){
			if(this.playerInfoList[i]){
				sum_player_num += 1;
			}
		}
		return sum_player_num === this.player_num;
    },

	is_AA:function(){
        var is_AA = 1;
        return is_AA === this.pay_mode;
	},

	is_controller:function (serverSitNum) {
        return this.playerInfoList[serverSitNum] && this.playerInfoList[serverSitNum]['character'] === const_val.CHARACTER_ADMIN
    },

	getController:function () {
        for(var i=0; i<this.playerInfoList.length; i++){
            if(this.playerInfoList[i] && this.playerInfoList[i]['character'] === const_val.CHARACTER_ADMIN){
                return i
            }
        }
        return -1
    },
	//获取角色为const_val.CHARACTER_PLAYER的数量
	getPlayerNum:function(){
		var plyaerNum=0;
		for(var i=0;i<this.playerInfoList.length;i++){
            if(this.playerInfoList[i] && this.playerInfoList[i]['character'] === const_val.CHARACTER_PLAYER){
                plyaerNum++;
            }
		}
		return plyaerNum;
	},
	//检查玩家是否已经准备
	checkPlayerReady:function(){
		var plyaerNum = this.getPlayerNum();
		if(plyaerNum==0){return false;};
		// [0,1,0,1];
		var playerStateNum=0;
		for(var i=0;i<this.playerStateList.length;i++){
			if(this.playerStateList[i]==1){
				playerStateNum++;
			}
		}
		return plyaerNum===playerStateNum;
	}
});