// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict"
var CreateRoomSnippet = UISnippet.extend({
	initUI:function(){
		this.game_round 		= 8; //局数 4局、8局、24局
		this.lucky_poker 		= 0; //马牌 0没有 19/39/55
        this.pay_mode 		= 0; //付费方式，0代表房主支付，1代表AA支付
		this.hand_prepare 	= 1; // 0代表需要手动准备，1代表不需要手动准备，因为在玩家的state中0代表没有准备,1代表已经准备

        var self = this;
		this.createroom_panel = this.rootUINode.getChildByName("createroom_panel");
		this.params_panel = this.createroom_panel.getChildByName("params_panel");
        

		//是否需要手动准备
		var prepare_chx = this.params_panel.getChildByName("prepare_panel").getChildByName("prepare_chx");
		var prepare_label = this.params_panel.getChildByName("prepare_panel").getChildByName("prepare_label");
        UICommonWidget.create_touch_region(
        	prepare_chx,
			cc.p(0, 0.5),
			cc.p(0, prepare_chx.getContentSize().height * 0.5),
			cc.size(prepare_chx.getContentSize().width + prepare_label.getString().length * prepare_label.getFontSize(), prepare_chx.getContentSize().height),
			prepare_chx_touchregion_event
		);
        function prepare_chx_touchregion_event(sender, eventType) {
            if(eventType == ccui.Widget.TOUCH_ENDED) {
                if(self.hand_prepare == 0) {
                    prepare_chx.setSelected(false);
                    self.hand_prepare = 1;
                }else {
                    prepare_chx.setSelected(true);
                    self.hand_prepare = 0;
                }
            }
        }

		this.updateCardDiamond(this.game_round);

        var parent_panel_list = [
            this.params_panel.getChildByName("game_round_panel"),
            this.params_panel.getChildByName("lucky_poker_panel"),
            this.params_panel.getChildByName("pay_panel")
        ];
		var chx_list = ["game_round_chx", "lucky_poker_chx", "pay_mode_chx"];
		var chx_label_list = ["game_round_label_", "lucky_poker_label_", "pay_mode_label_"];
		var chx_num_list = [3,4,2];
		var chx_func_list = [
            function (i) {
		        self.game_round = 8*(i+1);
		        self.updateCardDiamond(self.game_round);
            },
            function (i) {
                switch (i){
                    case 0:
                        self.lucky_poker = 0;
                        break;
                    case 1:
                        self.lucky_poker = 19;
                        break;
                    case 2:
                        self.lucky_poker = 39;
                        break;
                    case  3:
                        self.lucky_poker = 55;
                        break;
                    default:
                        self.lucky_poker = 0;
                }
            },
            function (i) {
				if (self.room_type === const_val.CLUB_ROOM) {
					self.pay_mode = i === 0 ? const_val.CLUB_PAY_MODE : const_val.AA_PAY_MODE;
				} else if (self.room_type === const_val.AGENT_ROOM) {
					self.pay_mode = i === 0 ? const_val.AGENT_PAY_MODE : const_val.AA_PAY_MODE;
				} else {
					self.pay_mode = i === 0 ? const_val.NORMAL_PAY_MODE : const_val.AA_PAY_MODE;
				}
                self.updateCardDiamond(self.game_round);
		    }
        ];
		this.update_game_panel(parent_panel_list, chx_list, chx_num_list, chx_label_list, chx_func_list);

	},

    //参数分别是一种游戏的面板、复选框名字的列表、对应复选框的个数列表、对应复选框的标签列表、对应要执行的函数的列表
	update_game_panel:function (parent_panel_list, chx_list, chx_num_list, chx_label_list, chx_func_list) {
		for(var i = 0 ; i < chx_list.length ; i++) {
            UICommonWidget.create_check_box_group(parent_panel_list[i], chx_list[i], chx_num_list[i], chx_label_list[i], chx_func_list[i]);
        }
    },

	updateCardDiamond:function(game_round){
        var val = undefined;
        if (this.pay_mode === const_val.AA_PAY_MODE) {
            val = "每人消耗 x " + (game_round/8).toString();
        } else {
            if (this.room_type === const_val.CLUB_ROOM) {
                val = "楼主消耗 x " + (game_round/8*4).toString();
            } else if (this.room_type === const_val.AGENT_ROOM) {
                val = "代理消耗 x " + (game_round/8*4).toString();
            } else {
                val = "房主消耗 x " + (game_round/8*4).toString();
            }
        }

		var cost_num_label = this.params_panel.getChildByName("cost_panel").getChildByName("cost_num_label");
        cost_num_label.setString(val);
	},

	getParameters: function () {
		return {
			"game_round"        : this.game_round,
			"lucky_poker"       : this.lucky_poker,
            "pay_mode"          : this.pay_mode,
			"hand_prepare"      : this.hand_prepare
		};
	},

    updateRoomType: function (r_type) {
        this.room_type = r_type;
		var label_1 = this.params_panel.getChildByName("pay_panel").getChildByName("pay_mode_label_1");
		if (r_type === const_val.CLUB_ROOM) {
			label_1.setString("楼主支付");
		} else if (r_type === const_val.AGENT_ROOM) {
			label_1.setString("代理支付");
		} else {
			label_1.setString("房主支付");
		}
		this.update_default_pay_mode();
		this.updateCardDiamond(this.game_round);
	},

    update_default_pay_mode: function () {
        switch (this.room_type) {
            case const_val.CLUB_ROOM:
                if (this.pay_mode !== const_val.AA_PAY_MODE) {
                    this.pay_mode = const_val.CLUB_PAY_MODE;
                }
                break;
            case const_val.AGENT_ROOM:
                if (this.pay_mode !== const_val.AA_PAY_MODE) {
                    this.pay_mode = const_val.AGENT_PAY_MODE;
                }
                break;
            default:
                if (this.pay_mode !== const_val.AA_PAY_MODE) {
                    this.pay_mode = const_val.NORMAL_PAY_MODE;
                }
        }
    }
});