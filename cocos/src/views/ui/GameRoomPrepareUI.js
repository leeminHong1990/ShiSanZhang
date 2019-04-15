// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var GameRoomPrepareUI = UIBase.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/GameRoomPrepareUI.json";
		this.talk_img_num = 0;
	},

	initUI:function(){
        var player = h1global.player();
		this.gameprepare_panel = this.rootUINode.getChildByName("gameprepare_panel");
        var self = this;

        //分享
		var share_dict = cutil.getShareTitleDesc(player.curGameRoom.getBaseData());
		var wxinvite_btn = this.gameprepare_panel.getChildByName("wxinvite_btn");
		wxinvite_btn.addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
			    var share_url = switches.PHP_SERVER_URL + '/gxmj_home?action=joinroom&roomId=' + player.curGameRoom.roomId.toString();
                if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
					jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity","callWechatShareUrl", "(ZLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", true, share_url, share_dict.title, share_dict.desc);
				} else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
					jsb.reflection.callStaticMethod("WechatOcBridge","callWechatShareUrlToSession:fromUrl:withTitle:andDescription:", true, share_url, share_dict.title, share_dict.desc);
				} else {
					cutil.share_func(share_dict.title, share_dict.desc);
					h1global.curUIMgr.share_ui.show();
				}
			}
		});

        // 开始游戏
        var start_btn = this.gameprepare_panel.getChildByName("start_btn");
        start_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED){
                var playerNum = player.curGameRoom.getPlayerNum();
                if(playerNum == 0){
                    self.show_warning("只有你一个人呀~");
                    return;
                }else if(!player.curGameRoom.checkPlayerReady()){
                    self.show_warning("还有其他玩家没有准备！");
                    return;
                }
                player.curGameRoom.updatePlayerState(player.serverSitNum, 1);
                player.prepare();
                this.setVisible(false);
            }
        });

		// 参与游戏
        var join_game_btn = this.gameprepare_panel.getChildByName("join_game_btn");
        join_game_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED){
                player.curGameRoom.updatePlayerWaitFlag(player.serverSitNum, 1);
                player.joinGame();
                this.setVisible(false);
            }
        });

        // 加入游戏
        var prepare_btn = this.gameprepare_panel.getChildByName("prepare_btn");
        prepare_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED){
                player.curGameRoom.updatePlayerState(player.serverSitNum, 1);
                player.prepare();
                this.setVisible(false);
            }
        });


        // 按钮显示
        this.check_invition();
        this.check_prepare_start();
        this.check_join_game();

		if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.resumeMusic();
        }

        if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
            h1global.curUIMgr.gameplayerinfo_ui.hide();
        }
	},

	check_invition:function(){
		var player = h1global.player();
        var wxinvite_btn = this.gameprepare_panel.getChildByName("wxinvite_btn");

		if(player.curGameRoom.current_round > 0){
            wxinvite_btn.setVisible(false);
		    return
        }
		var is_full = player.curGameRoom.is_full();

		if(is_full){
			wxinvite_btn.setVisible(false);
		} else {
			wxinvite_btn.setVisible(true);
		}

        if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true){
            wxinvite_btn.setVisible(false);
        }
	},

    check_prepare_start: function () {
        var player = h1global.player();
        // 两个按钮只能显示一个
        var prepare_btn = this.gameprepare_panel.getChildByName("prepare_btn");
        var start_btn = this.gameprepare_panel.getChildByName("start_btn");
        // 游戏已经开始 所有人自动准备
        if(player.curGameRoom.current_round > 0){
            prepare_btn.setVisible(false);
            start_btn.setVisible(false);
        } else {
            //显示该ui 必然在准备阶段
            if(player.curGameRoom.is_controller(player.serverSitNum)){
                // 准备阶段 controller 必然有开始游戏按钮
                prepare_btn.setVisible(false);
                start_btn.setVisible(true);
            } else {
                start_btn.setVisible(false);
                if (player.curGameRoom.playerStateList[player.serverSitNum]){
                    prepare_btn.setVisible(false);
                } else {
                    prepare_btn.setVisible(true);
                }
            }
        }
    },
    
    check_join_game:function () {
        var join_game_btn = this.gameprepare_panel.getChildByName("join_game_btn");
        var player = h1global.player();
        var playerInfo = player.curGameRoom.playerInfoList;
        var is_AA = player.curGameRoom.is_AA();
        if(playerInfo[player.serverSitNum]["character"] == const_val.CHARACTER_VISITOR && playerInfo[player.serverSitNum]["wait_flag"] == 0 && !is_AA){
            join_game_btn.setVisible(true);
        } else {
            join_game_btn.setVisible(false);
        }
    },

    show_start_btn:function(){
        var prepare_btn = this.gameprepare_panel.getChildByName("prepare_btn");
        var start_btn = this.gameprepare_panel.getChildByName("start_btn");
        var join_game_btn = this.gameprepare_panel.getChildByName("join_game_btn");
        prepare_btn.setVisible(false);
        start_btn.setVisible(false);
        join_game_btn.setVisible(false);

        start_btn.setVisible(true);
    },

    show_warning: function (info) {
        var alert_label = this.gameprepare_panel.getChildByName("alert_label");
        alert_label.setString(info);
        alert_label.runAction(cc.sequence(
            cc.fadeIn(0.1),
            cc.delayTime(1.0),
            cc.fadeOut(0.5)
        ));
        var alert_img = this.gameprepare_panel.getChildByName("alert_img");
        alert_img.runAction(cc.sequence(
            cc.fadeIn(0.1),
            cc.delayTime(1.0),
            cc.fadeOut(0.5)
        ));
    },

});