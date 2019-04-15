"use strict"
var SettlementUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/SettlementUI.json";
		this.setLocalZOrder(const_val.SettlementZOrder)
	},
	initUI:function(){
		var self = this;
		var confirm_btn = this.rootUINode.getChildByName("confirm_btn");
		var result_btn = this.rootUINode.getChildByName("result_btn");

        var tip_label = this.rootUINode.getChildByName("settlement_panel").getChildByName("tip_label");
        var player = h1global.player();
		if(player.curGameRoom.current_round === player.curGameRoom.game_round) {
            confirm_btn.setVisible(false);
            result_btn.setVisible(true);
            tip_label.setVisible(false);
		}else {
            confirm_btn.setVisible(true);
            result_btn.setVisible(false);
            tip_label.setVisible(true);
		}
		function confirm_btn_event(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){

				self.hide();
				//重新开局
                var player = h1global.player();
                if (player) {
                	// 游客不允许从这开始 准备
                	if(player.curGameRoom.playerInfoList[player.serverSitNum]["character"] == const_val.CHARACTER_VISITOR){
                		return
					}
                    player.curGameRoom.updatePlayerState(player.serverSitNum, 1);
                    if(h1global.curUIMgr.gameroom_ui && h1global.curUIMgr.gameroom_ui.is_show){
                        h1global.curUIMgr.gameroom_ui.update_player_game_state(player.serverSitNum);
					}
                    player.prepare();
                } else {
                    cc.warn('player undefined');
                }
			}
		}
		confirm_btn.addTouchEventListener(confirm_btn_event);

        //单局结算分享
        this.rootUINode.getChildByName("share_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
                    jsb.fileUtils.captureScreen("", "screenShot.png");
                } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
                    jsb.reflection.callStaticMethod("WechatOcBridge","takeScreenShot");
                } else {
                    h1global.curUIMgr.share_ui.show();
                }
            }
        });

        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            this.rootUINode.getChildByName("share_btn").setVisible(false);
        }

        this.player_panel_list = [];
        for(var i=0; i<4; i++){
			this.player_panel_list.push(this.rootUINode.getChildByName("settlement_panel").getChildByName("player_panel" + i.toString()))
		}
        this.update_settlement()
	},



    show_by_info: function (roundRoomInfo, curGameRoom, confirm_btn_func, replay_btn_func) {
		this.roundRoomInfo = roundRoomInfo;
		this.curGameRoom = curGameRoom;
		var self = this;
		this.show(function (){
            var confirm_btn = self.rootUINode.getChildByName("confirm_btn");
            var result_btn = self.rootUINode.getChildByName("result_btn");
            if (confirm_btn_func) {
                self.rootUINode.getChildByName("result_btn").addTouchEventListener(function (sender, eventType) {
                    if (eventType == ccui.Widget.TOUCH_ENDED) {
                        self.hide();
                        confirm_btn_func();
                    }
                });
                confirm_btn.setVisible(false);
                result_btn.setVisible(true);
            } else if(replay_btn_func){
            	cc.log("重新回放")
            } else {
                confirm_btn.setVisible(true);
                result_btn.setVisible(false);
			}
		})
	},

    update_settlement:function () {
		var settlement_panel = this.rootUINode.getChildByName("settlement_panel");

		switch (this.roundRoomInfo["round_player_info_list"].length){
			case 2:
                this.player_panel_list[0].setPositionX(settlement_panel.getContentSize().width * 0.425);
                this.player_panel_list[1].setPositionX(settlement_panel.getContentSize().width * 0.575);
                this.player_panel_list[2].setVisible(false);
                this.player_panel_list[3].setVisible(false);
				break;
			case 3:
                this.player_panel_list[0].setPositionX(settlement_panel.getContentSize().width * 0.35);
                this.player_panel_list[1].setPositionX(settlement_panel.getContentSize().width * 0.5);
                this.player_panel_list[2].setPositionX(settlement_panel.getContentSize().width * 0.65);
                this.player_panel_list[3].setVisible(false);
				break;
			default:
                this.player_panel_list[0].setVisible(true);
                this.player_panel_list[1].setVisible(true);
                this.player_panel_list[2].setVisible(true);
                this.player_panel_list[3].setVisible(true);
				break;
		}
		for(var i=0; i<this.roundRoomInfo["round_player_info_list"].length; i++){
			var info = this.roundRoomInfo["round_player_info_list"][i];
            this.update_player_info(i, info["idx"], this.curGameRoom);
            this.update_score(i, info["idx"], info["score"]);
			if(info["idx"] === h1global.player().serverSitNum){
            	this.update_win_fail(info["score"] > 0)
			}
		}
    },

    update_player_info: function (i, serverSitNum, curGameRoom) {
		if(!this.is_show) {return;}
		var player_panel = this.player_panel_list[serverSitNum];
		if(!player_panel){
			return;
		}
		var playerInfo = curGameRoom.playerInfoList[serverSitNum];
        player_panel.getChildByName("name_panel").getChildByName("name_label").setString(cutil.str_sub(playerInfo["nickname"], 7));
        // player_panel.getChildByName("name_panel").setString("ID:" + playerInfo["userId"].toString());
		cc.log(playerInfo)
		cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function(img){
			if (player_panel.getChildByName("portrait_sprite")) {
                player_panel.getChildByName("portrait_sprite").removeFromParent();
			}
			var portrait_sprite  = new cc.Sprite(img);
			portrait_sprite.setName("portrait_sprite");
			portrait_sprite.setScale(78 / portrait_sprite.getContentSize().width);
            portrait_sprite.x = 81;
            portrait_sprite.y = 112.8;
            portrait_sprite.setLocalZOrder(0);
            player_panel.addChild(portrait_sprite);
            player_panel.reorderChild(player_panel.getChildByName("name_panel"), 1)
			// portrait_sprite.setLocalZOrder(99999);
		});
	},



	update_score:function(i, serverSitNum, score){
		var score_label = this.player_panel_list[i].getChildByName("score_label");
		if(score >= 0){
			score_label.setTextColor(cc.color(255, 197, 68));
			score_label.setString("+" + score.toString());
		} else {
			score_label.setTextColor(cc.color(255, 18, 18));
			score_label.setString(score.toString());
		}
	},

	update_win_fail:function (isWin) {
		if(isWin){
			this.rootUINode.getChildByName("bg_img").loadTexture("res/ui/SettlementUI/settlement_win.png");
			this.rootUINode.getChildByName("settlement_panel").getChildByName("result_img").loadTexture("res/ui/SettlementUI/title_win.png");
			for(var i=0; i<4; i++){
                this.player_panel_list[i].getChildByName("bg_img").loadTexture("res/ui/SettlementUI/cell_win_bg_img.png");
			}
            this.rootUINode.getChildByName("settlement_panel").getChildByName("round_img").loadTexture("res/ui/SettlementUI/round_title_win_img.png");
		} else {
            this.rootUINode.getChildByName("bg_img").loadTexture("res/ui/SettlementUI/settlement_fail.png");
            this.rootUINode.getChildByName("settlement_panel").getChildByName("result_img").loadTexture("res/ui/SettlementUI/title_fail.png");
            for(var i=0; i<4; i++){
                this.player_panel_list[i].getChildByName("bg_img").loadTexture("res/ui/SettlementUI/cell_fail_bg_img.png");
            }
            this.rootUINode.getChildByName("settlement_panel").getChildByName("round_img").loadTexture("res/ui/SettlementUI/round_title_fail_img.png");
		}

		var round_fnt = new ccui.TextBMFont(h1global.player().curGameRoom.current_round, "res/ui/font/" + (isWin ? "shenglizi.fnt" : "jiesuanshuzi.fnt"));
		this.rootUINode.getChildByName("settlement_panel").addChild(round_fnt);
		round_fnt.setPosition(this.rootUINode.getChildByName("settlement_panel").getChildByName("round_node").getPosition())
    },
});