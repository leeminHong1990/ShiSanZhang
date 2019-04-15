var GameRoomInfoUI = UIBase.extend({
	ctor: function() {
		this._super();
		this.resourceFilename = "res/ui/GameRoomInfoUI.json";
	},

	initUI: function() {

		this.updateLayout();
	},


	updateLayout: function() {
        this.roominfo_panel = this.rootUINode.getChildByName("roominfo_panel");
        this.round_label = this.roominfo_panel.getChildByName("round_label");
        this.function_panel = this.rootUINode.getChildByName("function_panel");
        this.time_label = this.function_panel.getChildByName("time_label");

        this.chat_panel = this.rootUINode.getChildByName("chat_panel");
        this.communicate_btn = this.chat_panel.getChildByName("communicate_btn");
        this.record_btn = this.chat_panel.getChildByName("record_btn");


        this.config_btn = this.function_panel.getChildByName("config_btn");

        this.help_btn = this.function_panel.getChildByName("help_btn");

        this.battery_panel = this.function_panel.getChildByName("battery_panel")

		var self = this;
		var player = h1global.player();

		var roomid_label = this.roominfo_panel.getChildByName("roomid_label");
		roomid_label.setString(player.curGameRoom.roomId.toString());

		this.communicate_btn.addTouchEventListener(function(sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				// 聊天面板
				if (sender === self.communicate_btn) {
					if(h1global.curUIMgr.communicate_ui && !h1global.curUIMgr.communicate_ui.is_show){
                        h1global.curUIMgr.communicate_ui.show();
					}
                    // if(h1global.curUIMgr.communicate_ui.hasBeenLoad) {
                    //     h1global.curUIMgr.communicate_ui.update_chatrecord();
                    // }
				} else {
					cc.log("TOUCH_ENDED: layout change");
				}
			}
		});
		this.config_btn.addTouchEventListener(function(sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				if (sender === self.config_btn) {
					h1global.curUIMgr.config_ui.show();
				} else {
					cc.log("TOUCH_ENDED: layout change");
				}
			}
		});

		this.help_btn.addTouchEventListener(function(sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				if (sender === self.help_btn) {
					h1global.curUIMgr.help_ui.show_by_info(h1global.player().curGameRoom.getRoomCreateDict());
				} else {
					cc.log("TOUCH_ENDED: layout change");
				}
			}
		});

		this.update_round();
		var curDateTime = new Date();
		this.update_curtime(curDateTime);
		this.update_roommode();
		this.update_lucky_poker();
		onhookMgr.setCurTime(curDateTime.getTime() / 1000);

		var start_record_time = 0;
		var stop_record_time = 0;
		this.record_btn.addTouchEventListener(function(sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_BEGAN) {
                var intervalTime = ((new Date().getTime()) - stop_record_time) / 1000;
                if (intervalTime < 5){
                    var tips_label = self.rootUINode.getChildByName("tips_label");
                    tips_label.setString("再次录音需间隔" + Math.ceil(5 - intervalTime) + "秒！");
                    tips_label.setVisible(true);
                    tips_label.runAction(cc.Sequence.create(
                        cc.MoveTo.create(0.5, cc.p(tips_label.getPositionX(), tips_label.getPositionY() + 50)),
                        cc.CallFunc.create(function () {
                            tips_label.setVisible(false);
                            tips_label.setPositionY(tips_label.getPositionY() - 50);
                        })
                    ));
                    return;
                }
				h1global.curUIMgr.audiorecord_ui.show();
				start_record_time = new Date().getTime();
				var fileName = start_record_time.toString() + ".dat";
				var fid = cutil.addFunc(function(fileID) {
					cc.log("finish upload, fileID = " + fileID);
					player.sendAppVoice(fileID, (stop_record_time - start_record_time) > 0 ? (stop_record_time - start_record_time) : 0);
				});
				cutil.start_record(fileName, fid);
			} else if (eventType == ccui.Widget.TOUCH_ENDED || eventType == ccui.Widget.TOUCH_CANCELED) {
                if (((new Date().getTime()) - stop_record_time) / 1000 < 5){
                    return;
                }
                stop_record_time = new Date().getTime();
                h1global.curUIMgr.audiorecord_ui.hide();
				cutil.stop_record();
			}
		});

		this.update_device_info_panel();
		this.startDeviceInfoUpdateExecutor();
	},

	update_round: function() {
		if (!this.is_show) {
			return;
		}
		this.round_label.setString(h1global.player().curGameRoom.current_round.toString() + "/" + h1global.player().curGameRoom.game_round.toString());
	},

	update_curtime: function(curDateTime) {
		if (!this.is_show) {
			return;
		}
		var hour = curDateTime.getHours();
		var min = curDateTime.getMinutes();
		this.time_label.setString((hour < 10 ? "0" : "") + hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString());
	},

	update_roommode: function() {
		// if (!this.is_show) {
		// 	return;
		// }
		// var self = this;
		// this.roommode_bg_img.addTouchEventListener(function(sender, eventType) {
		// 	if (eventType == ccui.Widget.TOUCH_ENDED) {
		// 		if (sender === self.roommode_bg_img) {
		// 			self.roommode_panel.setVisible(!self.roommode_panel.isVisible());
		// 		} else {
		// 			cc.log("TOUCH_ENDED: layout change");
		// 		}
		// 	}
		// });
	},

	update_lucky_poker:function () {
		var lucky_panel = this.rootUINode.getChildByName("roominfo_panel").getChildByName("lucky_panel");
		var lucky_img = lucky_panel.getChildByName("lucky_poker_img");
		switch (h1global.player().curGameRoom.lucky_poker){
            case 19:
                lucky_img.loadTexture("Poker/19.png", ccui.Widget.PLIST_TEXTURE);
                lucky_panel.setVisible(true);
                break;
            case 39:
                lucky_img.loadTexture("Poker/39.png", ccui.Widget.PLIST_TEXTURE);
                lucky_panel.setVisible(true);
                break;
            case 55:
                lucky_img.loadTexture("Poker/55.png", ccui.Widget.PLIST_TEXTURE);
                lucky_panel.setVisible(true);
                break;
            default:
                lucky_panel.setVisible(false);
                break
		}
    },

	// 更新网络信号
	update_network_state: function(net_type, strength) {},

	// 更新电量
	update_battery: function () {
		var battery = cutil.getBattery();
		var level = parseInt(battery / 25.0);
		for (var i = 0; i < 3; i++) {
			var img = this.battery_panel.getChildByName("battery_grid_img_" + i);
			img.setVisible(i < level);
		}
	},

	update_device_info_panel: function() {
		this.update_battery();
		this.update_network_state();
	},

	startDeviceInfoUpdateExecutor: function () {
		if (!this.is_show) {
			return;
		}
		var executor = this.rootUINode.getChildByName("battery_executor");
		if (!executor) {
			executor = cc.Node.create();
			executor.setName("battery_executor");
			this.rootUINode.addChild(executor);
		}
		var self = this;
		executor.runAction(cc.sequence(cc.callFunc(function () {
			self.update_device_info_panel();
		}), cc.delayTime(60 * 5)).repeatForever());
	},

    setPlaybackLayout: function () {
        this.communicate_btn.setVisible(false);
        this.record_btn.setVisible(false);
        this.config_btn.setVisible(false);
    }
});


