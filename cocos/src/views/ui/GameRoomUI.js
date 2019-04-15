'use strict';

var GameRoomUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/GameRoomUI.json";
        this.talk_img_num = 0;
        var player = h1global.entityManager.player();
        this.roomId = player.curGameRoom.roomId;
        this.game_round = player.curGameRoom.game_round;
        this.player_num = player.curGameRoom.player_num;
        this.current_round = player.curGameRoom.current_round;
        this.beginAnimPlaying = false;
    },

    initUI: function () {
        this.init_player_info_panels();

        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.resumeMusic();
        }

        if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
            h1global.curUIMgr.gameplayerinfo_ui.hide();
        }
        h1global.curUIMgr.gameroominfo_ui.show();
    },

    init_player_info_panels: function () {
        var player = h1global.entityManager.player();
        for (var i = 0; i < player.curGameRoom.playerInfoList.length; i++) {
            if(player.curGameRoom.playerInfoList[i]){
                this.update_player_info_panel(i, player.curGameRoom.playerInfoList[i]);
                this.update_player_online_state(i, player.curGameRoom.playerInfoList[i]["online"]);
                this.update_player_game_state(i);
            }
        }
    },

    // 开始选牌
    start:function () {
        var player = h1global.player();
        if(player.curGameRoom.room_state == const_val.ROOM_PLAYING){
            var character = player.curGameRoom.playerInfoList[player.serverSitNum]["character"];
            if((character===const_val.CHARACTER_ADMIN || character===const_val.CHARACTER_PLAYER) && player.curGameRoom.uploadedStateList[player.serverSitNum] == 0){
                h1global.curUIMgr.gameroompokerchoose_ui.show_by_pokers(player.curGameRoom.playerPokersList[player.serverSitNum]);
            }
        } else {
            cc.log("游戏状态不正确", player.curGameRoom.room_state)
        }
        if(h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show){
            h1global.curUIMgr.gameroominfo_ui.hide();
            h1global.curUIMgr.gameroominfo_ui.show();
        }
    },

    _removeStartAnimExecutor:function (self) {
        if(self.startAnimExecutor){
            self.startAnimExecutor.removeFromParent();
            self.startAnimExecutor = undefined;
        }
    },

    startBeginAnim:function () {
        this.beginAnimPlaying = true;
        var self = this;
        this._removeStartAnimExecutor(this);
        this.startAnimExecutor = cc.Node.create();
        this.rootUINode.addChild(this.startAnimExecutor);

        var player = h1global.player();
        if(!player){
            return;
        }

        if(h1global.curUIMgr.gameroompokerchoose_ui && h1global.curUIMgr.gameroompokerchoose_ui.is_show){
            h1global.curUIMgr.gameroompokerchoose_ui.setVisible(false)
        }

        var cur_poker_num = 0;
        var step1 = cc.sequence(cc.delayTime(0.07),
            cc.callFunc(function(){
                for(var i=0; i< 4; i++){
                    self.rootUINode.getChildByName("poker_node" + i.toString()).getChildByName("poker" + cur_poker_num.toString()).setVisible(true);
                }
                cur_poker_num += 1;
                cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
        })).repeat(13);

        var step2 = cc.callFunc(function(){
            cc.log("start animation step 2");
            for(var i=0; i< player.curGameRoom.playerInfoList.length; i++){
                // var info = player.curGameRoom.playerInfoList[i];
                // if(info && (info["character"] == const_val.CHARACTER_ADMIN || info["character"] == const_val.CHARACTER_PLAYER)){ // 参与游戏的 位置
                //     self.rootUINode.getChildByName("poker_node" + player.server2CurSitNum(i).toString()).setVisible(false);
                // }
                self.rootUINode.getChildByName("poker_node" + player.server2CurSitNum(i).toString()).setVisible(false);
            }
        });

        var step3 = cc.callFunc(function(){
            cc.log("start animation step 3");
            var player = h1global.player();
            if(h1global.curUIMgr.gameroompokerchoose_ui && h1global.curUIMgr.gameroompokerchoose_ui.is_show){
                h1global.curUIMgr.gameroompokerchoose_ui.setVisible(true)
            }
            if(player && player.curGameRoom && player.curGameRoom.playerInfoList[player.serverSitNum]["character"]===const_val.CHARACTER_VISITOR){
                h1global.curUIMgr.gameroomprepare_ui.show();
            }
            self._removeStartAnimExecutor(self);
            self.start();
        });
        this.startAnimExecutor.runAction(cc.Sequence.create(step1, step2, step3))
    },

    stopBeginAnim:function () {
        this.beginAnimPlaying = false;
        this._removeStartAnimExecutor(this);
        if(h1global.curUIMgr.gameroompokerchoose_ui && h1global.curUIMgr.gameroompokerchoose_ui.is_show){
            h1global.curUIMgr.gameroompokerchoose_ui.setVisible(true)
        }
        var player = h1global.player();
        if(!player){
            return;
        }
        for(var i=0; i< player.curGameRoom.playerInfoList.length; i++){
            this.rootUINode.getChildByName("poker_node" + player.server2CurSitNum(i).toString()).setVisible(false);
        }
    },


    show_result: function (roomRoundInfo, callback) {
        if(this.beginAnimPlaying){
            this.stopBeginAnim()
        }
        var self = this;
        var player = h1global.entityManager.player();
        var show_pokers_time = 9.5;

        var info_dict = {};
        for(var i = 0; i < roomRoundInfo["round_player_info_list"].length; i++){
            var info = roomRoundInfo["round_player_info_list"][i];
            info_dict[info['idx']] = info
        }

        // 展示 未参与位置的牌
        var left_pokers = roomRoundInfo["left_pokers"].concat([]);
        for(var i=0; i<4; i++){
            if(!info_dict[i.toString()]){
                var pokers = left_pokers.splice(0,13);
                var poker_panel = self.rootUINode.getChildByName("poker_node" + player.server2CurSitNum(i).toString());
                for(var j=0; j<pokers.length; j++){
                    poker_panel.getChildByName("poker" + j.toString()).loadTexture("Poker/" + pokers[j].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker_panel.getChildByName("poker" + j.toString()).setVisible(true);
                }
                poker_panel.setVisible(true)
            }
        }

        var join_num = Object.keys(info_dict).length;

        for(var i in info_dict){
            var idx = info_dict[i]['idx'];

            let sit = player.server2CurSitNum(idx);
            cc.log("idx = " + idx.toString() + ", sit = " + sit.toString());
            let panel = this.rootUINode.getChildByName("pokers_panel" + sit.toString());
            panel.setVisible(true);
            //
            let poker11_img = panel.getChildByName("poker11_img");
            poker11_img.setVisible(false);
            let poker12_img = panel.getChildByName("poker12_img");
            poker12_img.setVisible(false);
            let poker13_img = panel.getChildByName("poker13_img");
            poker13_img.setVisible(false);
            //
            let poker21_img = panel.getChildByName("poker21_img");
            poker21_img.setVisible(false);
            let poker22_img = panel.getChildByName("poker22_img");
            poker22_img.setVisible(false);
            let poker23_img = panel.getChildByName("poker23_img");
            poker23_img.setVisible(false);
            let poker24_img = panel.getChildByName("poker24_img");
            poker24_img.setVisible(false);
            let poker25_img = panel.getChildByName("poker25_img");
            poker25_img.setVisible(false);
            //
            let poker31_img = panel.getChildByName("poker31_img");
            poker31_img.setVisible(false);
            let poker32_img = panel.getChildByName("poker32_img");
            poker32_img.setVisible(false);
            let poker33_img = panel.getChildByName("poker33_img");
            poker33_img.setVisible(false);
            let poker34_img = panel.getChildByName("poker34_img");
            poker34_img.setVisible(false);
            let poker35_img = panel.getChildByName("poker35_img");
            poker35_img.setVisible(false);

            let toudun_result_img = panel.getChildByName("toudun_result_img");
            toudun_result_img.setVisible(false);
            let zhongdun_result_img = panel.getChildByName("zhongdun_result_img");
            zhongdun_result_img.setVisible(false);
            let weidun_result_img = panel.getChildByName("weidun_result_img");
            weidun_result_img.setVisible(false);
            //
            let pokers_i_list = info_dict[i]['uploaded_pokers'];
            panel.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.callFunc(function () {
                    poker11_img.loadTexture("Poker/" + pokers_i_list[0].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker12_img.loadTexture("Poker/" + pokers_i_list[1].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker13_img.loadTexture("Poker/" + pokers_i_list[2].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    self.add_ma_flag(poker11_img, pokers_i_list[0]);
                    self.add_ma_flag(poker12_img, pokers_i_list[1]);
                    self.add_ma_flag(poker13_img, pokers_i_list[2]);
                    poker11_img.setVisible(true);
                    poker12_img.setVisible(true);
                    poker13_img.setVisible(true);
                    toudun_result_img.loadTexture(const_val.paixing_imgs[cutil.get_three_poker_type(pokers_i_list.slice(0, 3))]);
                    toudun_result_img.setVisible(true);
                    cc.audioEngine.playEffect("res/sound/effect/exception.mp3");
                }),
                cc.delayTime(3.0),
                cc.callFunc(function () {
                    poker21_img.loadTexture("Poker/" + pokers_i_list[3].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker22_img.loadTexture("Poker/" + pokers_i_list[4].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker23_img.loadTexture("Poker/" + pokers_i_list[5].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker24_img.loadTexture("Poker/" + pokers_i_list[6].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker25_img.loadTexture("Poker/" + pokers_i_list[7].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    self.add_ma_flag(poker21_img, pokers_i_list[3]);
                    self.add_ma_flag(poker22_img, pokers_i_list[4]);
                    self.add_ma_flag(poker23_img, pokers_i_list[5]);
                    self.add_ma_flag(poker24_img, pokers_i_list[6]);
                    self.add_ma_flag(poker25_img, pokers_i_list[7]);
                    poker21_img.setVisible(true);
                    poker22_img.setVisible(true);
                    poker23_img.setVisible(true);
                    poker24_img.setVisible(true);
                    poker25_img.setVisible(true);
                    zhongdun_result_img.loadTexture(const_val.paixing_imgs[cutil.get_five_poker_type(pokers_i_list.slice(3, 8))]);
                    zhongdun_result_img.setVisible(true);
                    cc.audioEngine.playEffect("res/sound/effect/exception.mp3");
                }),
                cc.delayTime(3.0),
                cc.callFunc(function () {
                    poker31_img.loadTexture("Poker/" + pokers_i_list[8].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker32_img.loadTexture("Poker/" + pokers_i_list[9].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker33_img.loadTexture("Poker/" + pokers_i_list[10].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker34_img.loadTexture("Poker/" + pokers_i_list[11].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    poker35_img.loadTexture("Poker/" + pokers_i_list[12].toString() + ".png", ccui.Widget.PLIST_TEXTURE);
                    self.add_ma_flag(poker31_img, pokers_i_list[8]);
                    self.add_ma_flag(poker32_img, pokers_i_list[9]);
                    self.add_ma_flag(poker33_img, pokers_i_list[10]);
                    self.add_ma_flag(poker34_img, pokers_i_list[11]);
                    self.add_ma_flag(poker35_img, pokers_i_list[12]);
                    poker31_img.setVisible(true);
                    poker32_img.setVisible(true);
                    poker33_img.setVisible(true);
                    poker34_img.setVisible(true);
                    poker35_img.setVisible(true);
                    weidun_result_img.loadTexture(const_val.paixing_imgs[cutil.get_five_poker_type(pokers_i_list.slice(8, 13))]);
                    weidun_result_img.setVisible(true);
                    cc.audioEngine.playEffect("res/sound/effect/exception.mp3");
                }),
                cc.delayTime(3.0)
            ));
        }

        var dansha_matrix = roomRoundInfo['dansha_list'];   // list as matrix
        var dansha_list = [];
        for (let i = 0; i < this.player_num; i++) {
            for (let j = 0; j < this.player_num; j++) {
                if (i === j) { continue; }
                if (dansha_matrix[i*this.player_num + j] === 1) {
                    dansha_list.push([i, j]);
                }
            }
        }

        var dansha_effect_time = 2.2;

        //全垒打相关
        var is_homer = {flag:false, homer_player:0};
        var homer_effect_time = 0;
        if(join_num > 2){
            this.is_homer_judge(dansha_matrix, join_num, is_homer);
            if(is_homer.flag){
                homer_effect_time = 0;
            }
        }
        //

        var homerflag = false;
        for (var i = 0; i < dansha_list.length; i++){

            if(is_homer.flag && i > (join_num - 3) && dansha_list[i - (join_num - 2)][0] == is_homer.homer_player ){
                // this.play_homer_effect(show_pokers_time + (i + 1) * dansha_effect_time);
                homerflag = true;
                is_homer.flag = false;
                this.play_dansha_effect(dansha_list[i], i*dansha_effect_time + show_pokers_time);
            }else if(homerflag){
                this.play_dansha_effect(dansha_list[i], i*dansha_effect_time + show_pokers_time + homer_effect_time);
            }else {
                this.play_dansha_effect(dansha_list[i], i*dansha_effect_time + show_pokers_time);
            }
        }

        for (var i = 0; i < player.curGameRoom.playerInfoList.length; i++) {
            if(player.curGameRoom.playerInfoList[i] && info_dict[i.toString()]){
                player.curGameRoom.playerInfoList[i]["total_score"] = info_dict[i.toString()]["total_score"]
            }
        }

        var delta_time_before_callback = show_pokers_time + dansha_list.length * dansha_effect_time + homer_effect_time;
        if (callback) {
            var panel0 = this.rootUINode.getChildByName("pokers_panel0");
            panel0.runAction(cc.sequence(
                cc.delayTime(delta_time_before_callback),
                cc.callFunc(function () {
                    callback();
                })
            ))
        }
    },

    play_dansha_effect: function (dansha_pair, delay_time) {
        cc.log('player ' + dansha_pair[0].toString() + ' dansha ' + dansha_pair[1].toString());
        var self = this;

        var player = h1global.entityManager.player();
        var from_curSiteNum = player.server2CurSitNum(dansha_pair[0]);
        var to_curSitNum = player.server2CurSitNum(dansha_pair[1]);
        cc.log('dansha sit number ' + from_curSiteNum.toString() + ' , ' + to_curSitNum.toString());
        var from_node = this.rootUINode.getChildByName("pokers_panel" + from_curSiteNum.toString());
        var to_node = this.rootUINode.getChildByName("pokers_panel" + to_curSitNum.toString());

        var tank_pos = cc.p(from_node.width * 0.5, from_node.height * 0.5);
        this.play_dansha_gun_effect([from_curSiteNum, to_curSitNum], from_node, tank_pos, delay_time);

        var hole_base_pos = cc.p(to_node.width * 0.5, to_node.height * 0.5 - 20);
        to_node.runAction(cc.sequence(
            cc.delayTime(delay_time + 0.4),
            cc.callFunc(function () {
                var p = cc.p(hole_base_pos.x - 50, hole_base_pos.y + 10);
                self.play_dansha_hole_effect(to_node, p, "hole_1");
            }),
            cc.delayTime(0.4),
            cc.callFunc(function () {
                var p = cc.p(hole_base_pos.x, hole_base_pos.y - 50);
                self.play_dansha_hole_effect(to_node, p, "hole_2");
            }),
            cc.delayTime(0.4),
            cc.callFunc(function () {
                var p = cc.p(hole_base_pos.x + 60, hole_base_pos.y + 30);
                self.play_dansha_hole_effect(to_node, p, "hole_3");
            }),
            cc.delayTime(0.9),
            cc.callFunc(function () {
                if (to_node.getChildByName("hole_1")) {
                    to_node.getChildByName("hole_1").removeFromParent();
                }
                if (to_node.getChildByName("hole_2")) {
                    to_node.getChildByName("hole_2").removeFromParent();
                }
                if (to_node.getChildByName("hole_3")) {
                    to_node.getChildByName("hole_3").removeFromParent();
                }
            })
        ));

    },

    init_gun_angle_and_flip: function (gun, sit_pair) {
        cc.log('sit_pair: ' + sit_pair[0].toString() + ", " + sit_pair[1].toString());
        var idx = sit_pair[0]*4 + sit_pair[1];
        cc.log("idx:"+idx);
        switch (idx) {
            case 1:     // 0*4+1
                gun.setFlippedX(true);
                gun.setRotation(90);
                return;
            case 2:     // 0*4+2
                gun.setFlippedX(true);
                gun.setRotation(45);
                return;
            case 3:     // 0*4+3
                gun.setRotation(-45);
                return;
            case 4:     // 1*4+0
                gun.setFlippedX(true);
                gun.setRotation(-90);
                return;
            case 6:     // 1*4+2
                gun.setFlippedX(true);
                gun.setRotation(-45);
                return;
            case 7:     // 1*4+3
                gun.setRotation(45);
                return;
            case 8:     // 2*4+0
                gun.setRotation(45);
                return;
            case 9:     // 2*4+1
                gun.setRotation(-45);
                return;
            case 11:    // 2*4+3
                return;
            case 12:    // 3*4+0
                gun.setFlippedX(true);
                gun.setRotation(-45);
                return;
            case 13:    // 3*4+1
                gun.setFlippedX(true);
                gun.setRotation(45);
                return;
            case 14:    // 3*4+2
                gun.setFlippedX(true);
                return;
            default:
                return;
        }
    },

    play_dansha_gun_effect: function (sit_pair, node, pos, delay_time) {
        var gun = new ccui.ImageView("res/ui/GameRoomUI/gun.png");
        gun.setPosition(pos);
        gun.setVisible(false);
        this.init_gun_angle_and_flip(gun, sit_pair);
        node.addChild(gun);

        node.runAction(cc.sequence(
            cc.delayTime(delay_time),
            cc.callFunc(function () {
                gun.setVisible(true);
                gun.runAction(cc.sequence(
                    cc.rotateBy(0.08, -15),
                    cc.rotateBy(0.12, 15)
                ));
                cc.audioEngine.playEffect("res/sound/effect/gun.mp3");
            }),
            cc.delayTime(0.5),
            cc.callFunc(function () {
                gun.runAction(cc.sequence(
                    cc.rotateBy(0.08, -15),
                    cc.rotateBy(0.12, 15)
                ));
                cc.audioEngine.playEffect("res/sound/effect/gun.mp3");
            }),
            cc.delayTime(0.5),
            cc.callFunc(function () {
                gun.runAction(cc.sequence(
                    cc.rotateBy(0.08, -15),
                    cc.rotateBy(0.12, 15)
                ));
                cc.audioEngine.playEffect("res/sound/effect/gun.mp3");
            }),
            cc.delayTime(1.1),
            cc.callFunc(function () {
                gun.removeFromParent();
            })
        ));
    },

    play_dansha_hole_effect: function (node, pos, tag_name) {
        UICommonWidget.load_effect_plist("blast");
        var blast = cc.Sprite.create();
        blast.setAnchorPoint(0.5, 0.5);
        var blast_action = UICommonWidget.create_effect_action({
            "FRAMENUM": 12,
            "TIME": 0.5,
            "NAME": "blast/blast_"
        });
        blast.runAction(cc.sequence(blast_action, cc.callFunc(function () {
            blast.removeFromParent();
        })));
        var p = cc.p(pos.x, pos.y + 120);
        blast.setPosition(p);
        blast.setScale(3);
        blast.setScaleX(4);
        node.addChild(blast);
        var hole = new ccui.ImageView("res/ui/GameRoomUI/hole.png");
        hole.setName(tag_name);
        hole.setOpacity(0);
        hole.runAction(cc.sequence(
            cc.delayTime(0.2),
            cc.fadeIn(0.1)
        ));
        hole.setPosition(pos);
        hole.setScale(1.5);
        node.addChild(hole);
    },

    is_homer_judge:function (dansha_list, player_num, is_homer) {//全垒打相关
        var countdansha = 0;
        for (var i = 0; i < dansha_list.length; i++) {
            var danshaflag = dansha_list[i];
            var homer_player = parseInt((i) / player_num);
            if (danshaflag == 1) {
                countdansha++;
                if (countdansha == player_num - 1) {
                    //如果执行到这，就证明有全垒打的情况
                    cc.log("出现全垒打！！！！！！：" + homer_player);
                    is_homer.homer_player = homer_player;
                    is_homer.flag = true;
                    break;
                }
            }
            if((i + 1) % player_num == 0)countdansha = 0;//一个玩家的单杀与否判断结束，单杀计数置零
        }
    },

    play_homer_effect:function(delayTime){//全垒打相关
        var self = this;
        var homer_list = [];
        for(var i = 0;i < 6;i++) {
            homer_list[i] = new ccui.ImageView("res/ui/GameRoomUI/homer.png");
            homer_list[i].setAnchorPoint(0.5, 0.5);
            homer_list[i].setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 - 15));
            homer_list[i].setVisible(false);
            homer_list[i].setLocalZOrder(1);
            homer_list[i].setOpacity(1);
            self.addChild(homer_list[i]);
        }
        homer_list[5].setScale(2.5);

        var homer_bg = new ccui.ImageView("res/ui/GameRoomUI/homer_bg.png");
        homer_bg.setAnchorPoint(0.5, 0.5);
        homer_bg.setPosition(cc.p(0, cc.winSize.height / 2));
        homer_bg.setVisible(false);
        self.addChild(homer_bg);

        self.runAction(cc.sequence(
            cc.delayTime(delayTime),
            cc.callFunc(function () {
                for(var i = 0;i < 6;i++) {
                    homer_list[i].setVisible(true);
                }
                homer_list[0].runAction(cc.spawn(cc.scaleTo(0.04, 2.2), cc.fadeTo(0.05, 128)));
                homer_list[1].runAction(cc.sequence(cc.delayTime(0.04),cc.spawn(cc.scaleTo(0.04, 1.9), cc.fadeTo(0.05, 128))));
                homer_list[2].runAction(cc.sequence(cc.delayTime(0.08),cc.spawn(cc.scaleTo(0.04, 1.6), cc.fadeTo(0.05, 128))));
                homer_list[3].runAction(cc.sequence(cc.delayTime(0.12),cc.spawn(cc.scaleTo(0.04, 1.3), cc.fadeTo(0.05, 128))));
                homer_list[4].runAction(cc.sequence(cc.delayTime(0.16),cc.spawn(cc.scaleTo(0.04, 1), cc.fadeTo(0.05, 128))));
                homer_list[5].runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2, 1), cc.fadeTo(0.01, 255))));
                homer_bg.setVisible(true);
                homer_bg.runAction(cc.sequence(
                    cc.moveTo(0.2, cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
                ));
            }),
            cc.delayTime(0.2),
            cc.callFunc(function () {
                for(var i = 0;i < 5;i++) {
                    homer_list[i].removeFromParent();
                }
            }),
            cc.delayTime(0.6),
            cc.callFunc(function () {
                homer_list[5].runAction(cc.sequence(
                    cc.fadeOut(1.9)
                ));
                homer_bg.setVisible(true);
                homer_bg.runAction(cc.sequence(
                    cc.fadeOut(1.9)
                ));
            }),
            cc.delayTime(2.5),
            cc.callFunc(function () {
                homer_list[5].removeFromParent();
                homer_bg.removeFromParent();
            })
        ));
    },

    getEmotionPos: function (playerInfoPanel, idx) {
        var pos = playerInfoPanel.getPosition();
        // if (idx === 0) {
        //     pos = cc.p(pos.x + playerInfoPanel.width , pos.y + playerInfoPanel.height * 0.5);
        // } else if (idx === 1) {
        //     pos = cc.p(pos.x - playerInfoPanel.width * 0.9, pos.y + playerInfoPanel.height * 0.1);
        // } else if (idx === 2) {
        //     pos = cc.p(pos.x - playerInfoPanel.width * 1.55, pos.y);
        // } else if (idx === 3) {
        //     pos = cc.p(pos.x - playerInfoPanel.width * 0.5, pos.y - playerInfoPanel.height * 0.3);
        // }

        if (idx === 0) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0.5, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 1) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0.5, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 2) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0.9, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 3) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0.9, pos.y - playerInfoPanel.height * 0);
        }
        return pos;
    },

    playEmotionAnim: function (serverSitNum, eid) {
        var curSitNum = h1global.entityManager.player().server2CurSitNum(serverSitNum);
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + curSitNum);
        var talk_img = ccui.ImageView.create();
        // talk_img.setPosition(this.getMessagePos(player_info_panel).x - 70, this.getMessagePos(player_info_panel).y + 10);
        talk_img.setPosition(this.getEmotionPos(player_info_panel, curSitNum));
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(100, 120));
        this.rootUINode.addChild(talk_img);
        var talk_angle_img = ccui.ImageView.create();
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);
        // 加载表情图片
        cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA4444;
        var cache = cc.spriteFrameCache;
        var plist_path = "res/effect/biaoqing.plist";
        var png_path = "res/effect/biaoqing.png";
        cache.addSpriteFrames(plist_path, png_path);
        cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;

        var anim_frames = [];
        for (var i = 1; i <= const_val.ANIM_LIST[eid - 1]; i++) {
            var frame = cache.getSpriteFrame("Emot/biaoqing_" + eid.toString() + "_" + i.toString() + ".png");
            if (frame) {
                anim_frames.push(frame);
            }
        }
        var effect_animation = new cc.Animation(anim_frames, 1.2 / const_val.ANIM_LIST[eid - 1]);
        var effect_action = new cc.Animate(effect_animation);

        var emot_sprite = cc.Sprite.create();
        // emot_sprite.setScale(1.0);
        emot_sprite.setScale(0.4);
        emot_sprite.setPosition(cc.p(50, 60));
        // emot_sprite.setPosition(this.getMessagePos(player_info_panel));
        talk_img.addChild(emot_sprite);
        if (curSitNum === 1 || curSitNum === 3) {
            talk_img.setScaleX(-1);
            talk_img.setPositionX(talk_img.getPositionX() - 40);
            talk_img.setPositionY(talk_img.getPositionY() - 10);
        } else {
            talk_img.setPositionX(talk_img.getPositionX() + 40);
            talk_angle_img.setLocalZOrder(3);
        }
        talk_angle_img.setPosition(3, talk_angle_img.getPositionY() + 50);
        emot_sprite.runAction(cc.Sequence.create(cc.Repeat.create(effect_action, 2), cc.CallFunc.create(function () {
            talk_img.removeFromParent();
        })));
    },

    getMessagePos: function (playerInfoPanel, idx) {
        var pos = playerInfoPanel.getPosition();
        if (idx === 0) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0.5, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 1) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0.5, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 2) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0.9, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 3) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0.9, pos.y - playerInfoPanel.height * 0);
        }
        return pos;
    },

    playMessageAnim: function (serverSitNum, mid, msg) {
        var idx = h1global.entityManager.player().server2CurSitNum(serverSitNum);
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + idx);
        var talk_img = ccui.ImageView.create();
        var talk_angle_img = ccui.ImageView.create();
        talk_img.setAnchorPoint(0, 0.5);
        talk_img.setPosition(this.getMessagePos(player_info_panel, idx));
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);
        this.rootUINode.addChild(talk_img);

        var msg_label = cc.LabelTTF.create("", "Arial", 22);
        msg_label.setString(mid < 0 ? msg : const_val.MESSAGE_LIST[mid]);
        msg_label.setDimensions(msg_label.getString().length * 26, 0);
        msg_label.setColor(cc.color(20, 85, 80));
        msg_label.setAnchorPoint(cc.p(0.5, 0.5));
        talk_img.addChild(msg_label);
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(msg_label.getString().length * 23 + 20, talk_img.getContentSize().height));
        talk_angle_img.setPosition(3, talk_img.getContentSize().height * 0.5);
        if (idx === 1 || idx === 3) {
            msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.37 + 10, 23));
            talk_img.setScaleX(-1);
            msg_label.setScaleX(-1);
        } else {
            msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.50 + 13, 23));
            talk_angle_img.setLocalZOrder(3);
        }
        msg_label.runAction(cc.Sequence.create(cc.DelayTime.create(2.0), cc.CallFunc.create(function () {
            talk_img.removeFromParent();
        })));
    },

    getExpressionPos:function (playerInfoPanel, idx) {
        var pos = playerInfoPanel.getPosition();
        if (idx === 0) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 1) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 2) {
            pos = cc.p(pos.x + playerInfoPanel.width * 0.5, pos.y + playerInfoPanel.height * 0);
        } else if (idx === 3) {
            pos = cc.p(pos.x - playerInfoPanel.width * 0.5, pos.y - playerInfoPanel.height * 0);
        }
        return pos;
    },

    playExpressionAnim:function (fromIdx, toIdx, eid) {
        var self = this;
        // 暂时不适用扔钱动画
        // if (eid === 3) {	//因为扔钱动画不是plist，所以单独处理
        //     self.playMoneyAnim(fromIdx, toIdx);
        //     return;
        // }
        var rotate = 0;
        var moveTime = 0.7;
        var flag = (fromIdx % 3 == 0 && toIdx % 3 == 0) || (fromIdx % 3 != 0 && toIdx % 3 != 0);
        if(flag){
            moveTime = 0.3;
        }
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + fromIdx.toString());
        var expression_img = ccui.ImageView.create();
        expression_img.setPosition(this.getExpressionPos(player_info_panel, fromIdx));
        expression_img.loadTexture("res/ui/PlayerInfoUI/expression_"+ const_val.EXPRESSION_ANIM_LIST[eid] +".png");
        this.rootUINode.addChild(expression_img);
        // if(eid > 1){
        //    rotate = 1440;
        //    rotate = rotate + (moveTime - 0.7) * 1800;
        // }
        expression_img.runAction(cc.Spawn.create(cc.RotateTo.create(0.2 + moveTime, rotate), cc.Sequence.create(
            cc.ScaleTo.create(0.1, 1.5),
            cc.ScaleTo.create(0.1, 1),
            cc.MoveTo.create(moveTime, self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx)),
            cc.CallFunc.create(function(){
                expression_img.removeFromParent();
                cc.audioEngine.playEffect("res/sound/effect/" + const_val.EXPRESSION_ANIM_LIST[eid] + ".mp3");
                self.playExpressionAction(toIdx, self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx), eid);
            })
        )));
    },

    playMoneyAnim:function (fromIdx, toIdx) {
        var self = this;
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + fromIdx.toString());

        var money_img_list = [];
        var baodian_img_list = [];
        for (var j = 0 ; j < 10 ; j++) {
            //var money_img  = new cc.Sprite("res/ui/PlayerInfoUI/dzpk_dj_icon_ani.png");
            var money_img  = new cc.Sprite("res/ui/PlayerInfoUI/expression_money.png");
            var baodian_img  = new cc.Sprite("res/ui/PlayerInfoUI/baodian.png");
            money_img.setPosition(this.getExpressionPos(player_info_panel, fromIdx));

            baodian_img.setVisible(false);
            //baodian_img.setLocalZOrder(-1);
            money_img.setLocalZOrder(1);

            this.rootUINode.addChild(money_img);
            this.rootUINode.addChild(baodian_img);
            money_img_list.push(money_img);
            baodian_img_list.push(baodian_img);
        }
        var pos = self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx);
        for (var i = 0 ; i < 10 ; i++) {
            var random_pos = cc.p(Math.random() * 60 - 30, Math.random() * 60 - 30);
            (function (i) {
                money_img_list[i].runAction(cc.sequence(
                    cc.delayTime(i * 0.1),
                    // cc.spawn(cc.rotateBy(0.2,360),cc.moveBy(0.2, pos.x + random_pos.x-70, pos.y + random_pos.y-200)),
                    cc.spawn(cc.rotateBy(0.2,360),cc.moveTo(0.2, pos.x, pos.y + random_pos.y)),
                    cc.callFunc(function () {
                        //cc.spawn(cc.rotateBy(0.2,360),cc.moveBy(0.2, pos.x + random_pos.x-70, pos.y + random_pos.y-200));
                        cc.audioEngine.playEffect("res/sound/effect/com_facesound_3.mp3");
                        money_img_list[i].setScale(1.2);
                        baodian_img_list[i].setPosition(pos.x+i, pos.y+30+i);
                        baodian_img_list[i].runAction(cc.rotateTo(0.1,45));
                        baodian_img_list[i].setVisible(true);
                    }),
                    //cc.moveTo(0.1,pos.x+i, pos.y+30+i),
                    cc.moveBy(0.1,5,3),
                    //cc.moveBy(0.1,-2,0),
                    cc.callFunc(function () {
                        money_img_list[i].setScale(1);
                        baodian_img_list[i].setVisible(false);
                    }),
                    // cc.moveBy(0.2,(i%2>0 ? (9-i)*4 : -(9-i)*4)+Math.random()*5-10,		-26 + i*2	),
                    // cc.rotateTo(0.2,40-Math.random()*40),
                    cc.spawn(cc.rotateTo(0.2,Math.random()*40-Math.random()*40),cc.moveBy(0.2,(i%2>0 ? (9-i)*4 : -(9-i)*4)+Math.random()*5-10,		-26 + i*2	)),
                    //cc.moveBy(0.1,0,-4),
                    //cc.rotateTo(0.2,0),
                    //cc.delayTime(2),
                    cc.delayTime((9 - i) * 0.1),
                    cc.callFunc(function () {
                        money_img_list[i].removeFromParent(true);
                        baodian_img_list[i].removeFromParent(true);
                    })
                ));
            })(i)
        }
    },

    playExpressionAction : function(idx, pos, eid){
        if(idx < 0 || idx > 3){
            return;
        }
        var self = this;
        UICommonWidget.load_effect_plist("expression");
        var expression_sprite = cc.Sprite.create();
        // var ptime = 2;
        if(eid == 3){
           expression_sprite.setScale(2);
        }
        expression_sprite.setPosition(pos);
        self.rootUINode.addChild(expression_sprite);
        expression_sprite.runAction(cc.Sequence.create(
            UICommonWidget.create_effect_action({"FRAMENUM": const_val.EXPRESSION_ANIMNUM_LIST[eid], "TIME": const_val.EXPRESSION_ANIMNUM_LIST[eid] / 16, "NAME": "Expression/"+ const_val.EXPRESSION_ANIM_LIST[eid] +"_"}),
            cc.DelayTime.create(0.5),
            cc.CallFunc.create(function(){
                expression_sprite.removeFromParent();
            })
        ));
    },

    playVoiceAnim: function (serverSitNum, record_time) {
        var self = this;
        if(cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.pauseMusic();
        }
        var idx = h1global.player().server2CurSitNum(serverSitNum);
        var interval_time = 0.8;
        this.talk_img_num += 1;
        // var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + h1global.player().server2CurSitNum(serverSitNum));
        var player_info_panel = undefined;
        player_info_panel = this.rootUINode.getChildByName("player_info_panel" + h1global.player().server2CurSitNum(serverSitNum));
        var talk_img = ccui.ImageView.create();
        talk_img.setPosition(this.getMsgPos(player_info_panel, idx));
        talk_img.loadTexture("res/ui/Default/talk_frame.png");
        talk_img.setScale9Enabled(true);
        talk_img.setContentSize(cc.size(100, talk_img.getContentSize().height));
        this.rootUINode.addChild(talk_img);
        var talk_angle_img = ccui.ImageView.create();
        talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
        talk_img.addChild(talk_angle_img);

        var voice_img1 = ccui.ImageView.create();
        voice_img1.loadTexture("res/ui/Default/voice_img1.png");
        voice_img1.setPosition(cc.p(50, 23));
        talk_img.addChild(voice_img1);
        var voice_img2 = ccui.ImageView.create();
        voice_img2.loadTexture("res/ui/Default/voice_img2.png");
        voice_img2.setPosition(cc.p(50, 23));
        voice_img2.setVisible(false);
        talk_img.addChild(voice_img2);
        voice_img2.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time), cc.CallFunc.create(function(){voice_img1.setVisible(false);voice_img2.setVisible(true);voice_img3.setVisible(false);}), cc.DelayTime.create(interval_time*2), cc.CallFunc.create(function(){voice_img2.setVisible(false)}))));
        var voice_img3 = ccui.ImageView.create();
        voice_img3.loadTexture("res/ui/Default/voice_img3.png");
        voice_img3.setPosition(cc.p(50, 23));
        voice_img3.setVisible(false);
        talk_img.addChild(voice_img3);
        voice_img3.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time*2), cc.CallFunc.create(function(){voice_img1.setVisible(false);voice_img2.setVisible(false);voice_img3.setVisible(true);}), cc.DelayTime.create(interval_time), cc.CallFunc.create(function(){voice_img3.setVisible(false);voice_img1.setVisible(true);}))));
        talk_angle_img.setPosition(3,talk_img.getContentSize().height*0.5);
        if(idx > 0 && idx < 3){
            talk_img.setScale(-1);
            talk_img.setPositionX(talk_img.getPositionX() - 40);
        }else {
            talk_img.setPositionX(talk_img.getPositionX() + 40);
            talk_angle_img.setLocalZOrder(3);
        }
        talk_img.runAction(cc.Sequence.create(cc.DelayTime.create(record_time), cc.CallFunc.create(function(){
            talk_img.removeFromParent();
            self.talk_img_num -= 1;
            if(self.talk_img_num == 0){
                if(!cc.audioEngine.isMusicPlaying()){
                    cc.audioEngine.resumeMusic();
                }
            }
        })));
    },

    update_player_info_panel: function (serverSitNum, playerInfo) {
        if (serverSitNum < 0 || serverSitNum > 3) {
            return;
        }
        var player = h1global.entityManager.player();
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + player.server2CurSitNum(serverSitNum).toString());
        if (playerInfo) {
            player_info_panel.getChildByName("frame_img").addTouchEventListener(function(sender, eventType){
                if(eventType == ccui.Widget.TOUCH_ENDED){
                    h1global.curUIMgr.gameplayerinfo_ui.show_by_info(playerInfo, serverSitNum);
                }
            });

            cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function (img) {
                if (player_info_panel) {
                    player_info_panel.getChildByName("portrait_sprite").removeFromParent();
                    var portrait_sprite = new cc.Sprite(img);
                    portrait_sprite.setName("portrait_sprite");
                    portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
                    portrait_sprite.x = player_info_panel.getContentSize().width * 0.5;
                    portrait_sprite.y = player_info_panel.getContentSize().height * 0.5;
                    portrait_sprite.setLocalZOrder(0);
                    player_info_panel.addChild(portrait_sprite);
                }
            });

            var owner_img = ccui.helper.seekWidgetByName(player_info_panel, "owner_img");
            player_info_panel.reorderChild(owner_img, 3);

            var name_label = player_info_panel.getChildByName("name_label");
            name_label.setString(playerInfo["nickname"]);
            player_info_panel.reorderChild(name_label, 4);

            if (playerInfo["is_creator"]) {
                owner_img.setVisible(true);
            } else {
                owner_img.setVisible(false);
            }

            var score_label = player_info_panel.getChildByName("score_label");
            score_label.ignoreContentAdaptWithSize(true);
            score_label.setString((playerInfo["total_score"] || 0).toString());
            player_info_panel.setVisible(true);
        }else {
            cc.log('hide panel ' + player.server2CurSitNum(serverSitNum).toString());
            player_info_panel.setVisible(false);
        }
    },

    update_player_online_state:function(serverSitNum, state){
        if(serverSitNum < 0 || serverSitNum > 3){
            return;
        }
        var player = h1global.entityManager.player();
        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + player.server2CurSitNum(serverSitNum).toString());
        var state_img = ccui.helper.seekWidgetByName(player_info_panel, "state_img");
        state_img.setLocalZOrder(99);
        state_img.setScale(1);
        if(state == 1){
            state_img.loadTexture("res/ui/GameRoomUI/state_online.png");
            state_img.setVisible(true);
        } else if (state == 0) {
            state_img.loadTexture("res/ui/GameRoomUI/state_offline.png");
            state_img.ignoreContentAdaptWithSize(true);
            state_img.setVisible(true);
        } else {
            state_img.setVisible(false);
        }
    },

    update_player_game_state:function(serverSitNum){

        var player = h1global.entityManager.player();
        if(serverSitNum < 0 || serverSitNum >= player.curGameRoom.player_num){
            return;
        }
        var playerInfo = player.curGameRoom.playerInfoList[serverSitNum];

        var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + player.server2CurSitNum(serverSitNum).toString());
        var game_state_img = player_info_panel.getChildByName("game_state_img");

        cc.log("update_player_game_state", serverSitNum, playerInfo)
        if(playerInfo["character"] === const_val.CHARACTER_ADMIN || playerInfo["character"] === const_val.CHARACTER_PLAYER){             // 玩家
            if(player.curGameRoom.room_state === const_val.ROOM_WAITING){       // 等待状态
                var state = player.curGameRoom.playerStateList[serverSitNum];
                if(state === 1){
                    game_state_img.loadTexture("res/ui/GameRoomUI/state_zhunbei.png");
                    game_state_img.setLocalZOrder(1);
                    game_state_img.setVisible(true);
                } else {
                    game_state_img.setVisible(false);
                }
            } else if(player.curGameRoom.room_state === const_val.ROOM_PLAYING) {   // 游戏状态
                var state = player.curGameRoom.uploadedStateList[serverSitNum];
                if(state === 1){
                    game_state_img.loadTexture("res/ui/GameRoomUI/state_wancheng.png");
                    game_state_img.setLocalZOrder(1);
                    game_state_img.setVisible(true);
                } else if(state === 0){
                    game_state_img.loadTexture("res/ui/GameRoomUI/state_peipaizhong.png");
                    game_state_img.setLocalZOrder(1);
                    game_state_img.setVisible(true);
                } else {
                    game_state_img.setVisible(false);
                }
            }
        } else if(playerInfo["character"] === const_val.CHARACTER_VISITOR) {    // 游客
            if(playerInfo["wait_flag"] === 1){
                game_state_img.loadTexture("res/ui/GameRoomUI/state_zhunbei.png");
                game_state_img.setLocalZOrder(1);
                game_state_img.setVisible(true);
            } else {
                game_state_img.setVisible(false);
            }
        }
    },

    add_ma_flag: function (card_img, val) {
        var ma = h1global.entityManager.player().curGameRoom.ma;
        if (val === ma) {
            var ma_img = new ccui.ImageView("res/ui/Poker/ma.png");
            ma_img.setAnchorPoint(cc.p(0, 1));
            ma_img.setOpacity(128);
            ma_img.x = -3;
            ma_img.y = card_img.getContentSize().height;
            card_img.addChild(ma_img);
        }
    }
});