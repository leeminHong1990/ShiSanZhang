"use strict";
var ConfigUI = BasicDialogUI.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/ConfigUI.json";
        // this.setLocalZOrder(const_val.MAX_LAYER_NUM);
    },

    initUI: function () {
        this.gameconfig_panel = this.rootUINode.getChildByName("gameconfig_panel");
        var self = this;
        this.gameconfig_panel.getChildByName("return_btn").addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                self.hide();
            }
        });

        this.gameconfig_panel.getChildByName("music_slider").addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                cc.audioEngine.setMusicVolume(sender.getPercent() * 0.01);
                cc.sys.localStorage.setItem("MUSIC_VOLUME", sender.getPercent());
            }
        });
        this.gameconfig_panel.getChildByName("music_slider").setPercent(cc.sys.localStorage.getItem("MUSIC_VOLUME"));

        this.gameconfig_panel.getChildByName("effect_slider").addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                cc.audioEngine.setEffectsVolume(sender.getPercent() * 0.01);
                cc.sys.localStorage.setItem("EFFECT_VOLUME", sender.getPercent());
            }
        });
        this.gameconfig_panel.getChildByName("effect_slider").setPercent(cc.sys.localStorage.getItem("EFFECT_VOLUME"));

        this.out_btn = this.gameconfig_panel.getChildByName("out_btn");
        this.out_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                let player = h1global.player();
                if (player) {
                    player.quitRoom();
                    self.hide();
                }
            }
        });

        this.close_btn = this.gameconfig_panel.getChildByName("close_btn");
        this.close_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                let player = h1global.player();
                if (player) {
                    player.quitRoom();
                    self.hide();
                }
            }
        });

        this.applyclose_btn = this.gameconfig_panel.getChildByName("applyclose_btn");
        this.applyclose_btn.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                let player = h1global.player();
                if (player) {
                    player.applyDismissRoom();
                    self.hide();
                }
            }
        });

        this.update_out_btn();
        this.update_state();
    },

    update_out_btn:function() {
        this.gameconfig_panel.getChildByName("logout_btn").addTouchEventListener(function(sender, eventType) {
            if (eventType == ccui.Widget.TOUCH_ENDED) {
                cutil.lock_ui();
                h1global.player().logout();
            }
        })
    },

    update_state: function () {
        if (!this.is_show) {
            return;
        }
        var player = h1global.player();
        if (player && player.curGameRoom) {
            let serverSitNum = player.serverSitNum;
            let character = player.curGameRoom.playerInfoList[serverSitNum]['character'];

            cc.log(character, player.curGameRoom.roomType)
            if (const_val.CLUB_ROOM === player.curGameRoom.roomType) {
                this.applyclose_btn.setVisible(player.curGameRoom.current_round > 0 && (character === const_val.CHARACTER_ADMIN || character === const_val.CHARACTER_PLAYER));
                this.out_btn.setVisible(player.curGameRoom.current_round <= 0 || character === const_val.CHARACTER_VISITOR);
            } else {
                this.applyclose_btn.setVisible(player.curGameRoom.current_round > 0 && (character === const_val.CHARACTER_ADMIN || character === const_val.CHARACTER_PLAYER));
                this.close_btn.setVisible(player.curGameRoom.getController() === serverSitNum && player.curGameRoom.current_round <= 0);
                this.out_btn.setVisible((player.curGameRoom.getController() !== serverSitNum && player.curGameRoom.current_round <= 0) || character === const_val.CHARACTER_VISITOR);
            }
            this.gameconfig_panel.getChildByName("logout_btn").setVisible(false)
        } else {
            this.gameconfig_panel.getChildByName("logout_btn").setVisible(true)
        }
    },

});