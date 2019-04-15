"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var impGameOperation = impCommunicate.extend({
	__init__ : function()
	{
		this._super();
		this.runMode = const_val.GAME_ROOM_GAME_MODE;
		this.startActions = {};
	    KBEngine.DEBUG_MSG("Create impRoomOperation");
  	},

	startGame : function(pokerList){
		cc.log("startGame", pokerList)
		if(!this.curGameRoom){
			return;
		}
		var self = this;
		this.runMode = const_val.GAME_ROOM_GAME_MODE;
		this.curGameRoom.startGame();

        this.curGameRoom.playerPokersList[this.serverSitNum] = pokerList;

        this.startActions["GameRoomUI"] = function () {
            if (h1global.curUIMgr && h1global.curUIMgr.gameroom_ui) {
                h1global.curUIMgr.gameroom_ui.startBeginAnim();
            }
        };


        if (h1global.curUIMgr.gameroomprepare_ui) {
            h1global.curUIMgr.gameroomprepare_ui.hide();
        }
        if (h1global.curUIMgr.gameroom_ui) {
            if(h1global.curUIMgr.gameroom_ui.is_show){
                h1global.curUIMgr.gameroom_ui.hide();
			}
            h1global.curUIMgr.gameroom_ui.show(
            	function () {
					if(self.startActions["GameRoomUI"]){
                        self.startActions["GameRoomUI"]();
                        self.startActions["GameRoomUI"] = undefined;
					}
                }
			);
        }

		if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
			h1global.curUIMgr.gameroominfo_ui.update_round();
		}
		if(h1global.curUIMgr.gameconfig_ui && h1global.curUIMgr.gameconfig_ui.is_show){
			h1global.curUIMgr.gameconfig_ui.update_state();
		}
		// 关闭结算界面
		if(h1global.curUIMgr.settlement_ui){
			h1global.curUIMgr.settlement_ui.hide();
		}
		if(h1global.curUIMgr.result_ui){
			h1global.curUIMgr.result_ui.hide();
		}

	},

	roundResult : function(roundRoomInfo){
		cc.log("roundResult", roundRoomInfo)
        var self = this;
		if(!this.curGameRoom){
			return;
		}
        this.curGameRoom.endGame();
        if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.show_result(roundRoomInfo, function () {
                if(self.curGameRoom.playerInfoList[self.serverSitNum] && self.curGameRoom.playerInfoList[self.serverSitNum]["character"] == const_val.CHARACTER_VISITOR){
                    return
                }
                if (h1global.curUIMgr.settlement_ui) {
                    h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, h1global.player().curGameRoom);
                }
            });
        }
		// cc.log("roundResult")
		// cc.log(roundRoomInfo)
		// this.curGameRoom.endGame();
		// var playerInfoList = roundRoomInfo["player_info_list"];
		// for(var i = 0; i < playerInfoList.length; i++){
		// 	this.curGameRoom.playerInfoList[i]["score"] = playerInfoList[i]["score"];
		// 	this.curGameRoom.playerInfoList[i]["total_score"] = playerInfoList[i]["total_score"];
		// }
		// var anim_end_num = 0;
        // var self = this;
        //
        // // Note: 此处只在回放上
        // var replay_func = undefined;
        // if(self.runMode === const_val.GAME_ROOM_PLAYBACK_MODE){
         //    replay_func = arguments[1];
		// }
        //
        // var player = h1global.player();
        // var curGameRoom = player.curGameRoom;
        // var serverSitNum = player.serverSitNum;
        //
	},

	finalResult : function(finalPlayerInfoList, roundRoomInfo){
		cc.log("finalResult", finalPlayerInfoList, roundRoomInfo)
        var self = this;
		if(!this.curGameRoom){
			return;
		}
        this.curGameRoom.endGame();
        if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.show_result(roundRoomInfo, function () {
                if(self.curGameRoom.playerInfoList[self.serverSitNum] && self.curGameRoom.playerInfoList[self.serverSitNum]["character"] == const_val.CHARACTER_VISITOR){
                    if (h1global.curUIMgr.result_ui) {
                        h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, h1global.player().curGameRoom);
                    }
                } else {
                    if (h1global.curUIMgr.settlement_ui) {
                        h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, h1global.player().curGameRoom, function () {
                            if (h1global.curUIMgr.result_ui) {
                                h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, h1global.player().curGameRoom);
                            }
                        });
                    }
                }

            });
        }

        //
        // // Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
        // if(h1global.curUIMgr.result_ui) {
         //    h1global.curUIMgr.result_ui.finalResultFlag = true;
        // }
        //
        // var anim_end_num = 0;
        // var player = h1global.player();
        // var curGameRoom = player.curGameRoom;
        // var serverSitNum = player.serverSitNum;
		// function callbackfunc(){
		// 	if (anim_end_num >= 2 && h1global.curUIMgr.settlement_ui) {
         //        h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom, function () {
		// 			if(h1global.curUIMgr.result_ui){
         //                h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom);
		// 			}
		// 		});
		// 	}
		// }
		// function showResult() {
		// 	if (h1global.curUIMgr.gameRoomUIIsShow &&h1global.curUIMgr.gameRoomUIIsShow()) {
		// 		h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_result_anim", roundRoomInfo["player_info_list"]);
		// 		h1global.curUIMgr.roomLayoutMgr.notifyObserver(const_val.GAME_ROOM_UI_NAME, "play_luckytiles_anim", roundRoomInfo["lucky_tiles"], function(){
		// 			anim_end_num += 1;
		// 			callbackfunc()
		// 		});
		// 	}
		// }
		// if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
		// 	if (h1global.curUIMgr.roomLayoutMgr.gameRoomUIIsShow()) {
		// 		showResult();
		// 	} else {
		// 		h1global.curUIMgr.roomLayoutMgr.registerShowObserver(function () {
		// 			showResult();
		// 		})
		// 	}
		// } else {
		// 	callbackfunc();
		// }
	},

    subtotalResult:function (finalPlayerInfoList) {
        if(!this.curGameRoom){
            return;
        }
        if (onhookMgr) {
            onhookMgr.setApplyCloseLeftTime(null);
        }

		if(h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show){
            h1global.curUIMgr.applyclose_ui.hide()
		}
        if (h1global.curUIMgr.settlement_ui && h1global.curUIMgr.settlement_ui.is_show) {
            h1global.curUIMgr.settlement_ui.hide()
        }
        // Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
        if(h1global.curUIMgr.result_ui) {
            h1global.curUIMgr.result_ui.finalResultFlag = true;
        }
        var player = h1global.player();
        var curGameRoom = player.curGameRoom;
        if (h1global.curUIMgr.result_ui) {
            h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom);
        }
    },

	prepare:function(){
		if(!this.curGameRoom){
			return;
		}
		this.baseCall("prepare");
	},

    readyForNextRound : function(serverSitNum){
        if(!this.curGameRoom){
            return;
        }
        cc.log("readyForNextRound", serverSitNum);
        this.curGameRoom.updatePlayerState(serverSitNum, 1);
        if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.update_player_game_state(serverSitNum);
        }
    },

    joinGame:function(){
		if(!this.curGameRoom){
			return;
		}
		this.baseCall("joinGame");
	},

    readyForGame : function(serverSitNum){
        if(!this.curGameRoom){
            return;
        }
        cc.log("readyForGame", serverSitNum);
        this.curGameRoom.updatePlayerWaitFlag(serverSitNum, 1);
        if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.update_player_game_state(serverSitNum);
        }
    },
	
	notifyPlayerOnlineStatus:function(serverSitNum, status){
		if(!this.curGameRoom){
			return;
		}
		this.curGameRoom.updatePlayerOnlineState(serverSitNum, status);
		if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.update_player_online_state(serverSitNum, status);
		}
	},

    uploadPokerResultSucceed:function (serverSitNum) {
		this.curGameRoom.uploadedStateList[serverSitNum] = 1;
        if (h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show) {
            h1global.curUIMgr.gameroom_ui.update_player_game_state(serverSitNum);
        }
    }
});
