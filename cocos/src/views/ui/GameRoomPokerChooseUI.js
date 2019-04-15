'use strict';

var GameRoomPokerChooseUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/GameRoomPokerChooseUI.json";
        this.setLocalZOrder(const_val.MAX_LAYER_NUM - 1);
        this.reset();

        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    },

    reset: function () {
        this.pokers = [];
        this.toudun_pokers = [];    // 保存头道的牌
        this.zhongdun_pokers = [];  // 保存中道的牌
        this.weidun_pokers = [];    // 保存尾道的牌
        this.left_pokers = [];
        this.selected_pokers = [];
        this.idx_paixing = [-1, -1, -1, -1, -1, -1, -1, -1];
        this.reset_paixing_conditions();
    },

    initUI: function () {
        var self = this;
        this.top_panel = this.rootUINode.getChildByName("top_panel");
        this.bottom_panel = this.rootUINode.getChildByName("bottom_panel");

        this.toudun_pokers_panel = this.top_panel.getChildByName("toudun_pokers_panel");
        this.zhongdun_pokers_panel = this.top_panel.getChildByName("zhongdun_pokers_panel");
        this.weidun_pokers_panel = this.top_panel.getChildByName("weidun_pokers_panel");
        this.toudun_submit_img = this.top_panel.getChildByName("toudun_submit_img");
        this.zhongdun_submit_img = this.top_panel.getChildByName("zhongdun_submit_img");
        this.weidun_submit_img = this.top_panel.getChildByName("weidun_submit_img");
        this.toudun_result_img = this.top_panel.getChildByName("toudun_result_img");
        this.zhongdun_result_img = this.top_panel.getChildByName("zhongdun_result_img");
        this.weidun_result_img = this.top_panel.getChildByName("weidun_result_img");

        this.duizi_btn = this.bottom_panel.getChildByName("duizi_btn");
        this.liangdui_btn = this.bottom_panel.getChildByName("liangdui_btn");
        this.santiao_btn = this.bottom_panel.getChildByName("santiao_btn");
        this.shunzi_btn = this.bottom_panel.getChildByName("shunzi_btn");
        this.tonghua_btn = this.bottom_panel.getChildByName("tonghua_btn");
        this.hulu_btn = this.bottom_panel.getChildByName("hulu_btn");
        this.zhadan_btn = this.bottom_panel.getChildByName("zhadan_btn");
        this.tonghuashun_btn = this.bottom_panel.getChildByName("tonghuashun_btn");

        this.top_panel.getChildByName("finish_btn").addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (self.left_pokers.length === 0) {
                    h1global.entityManager.player().uploadPokerResult(self.toudun_pokers.concat(self.zhongdun_pokers).concat(self.weidun_pokers));
                    self.reset();
                    self.hide();
                }
                else {
                    self.show_warning("请排好十三张牌！");
                }
            }
        });
        this.rootUINode.getChildByName("bg_panel").addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                for (let i = 0; i < 13; i++) {
                    let node = self.bottom_panel.getChildByName("card_" + i.toString());
                    if (node) {
                        node.setPositionY(170);
                    }
                }
                self.idx_paixing = [-1, -1, -1, -1, -1, -1, -1, -1];
            }
        });
    },

    show_by_pokers: function (pokers) {
        cc.log("显示十三张牌");
        if (this.is_show) {
            return;
        }
        var self = this;
        this.reset();
        this.show(function () {
            self.pokers = self.sort_pokers(pokers);
            self.left_pokers = self.pokers.concat([]);
            self.init_pokers_display();
            self.init_top_panel();
        });
    },

    // 对pokers进行排序
    sort_pokers: function (pokers) {
        var desc = function (x, y) {
            return x > y ? -1 : 1;
        };
        pokers.sort(desc);
        return pokers;
    },

    init_pokers_display: function () {
        if (this.pokers.length !== 13) {
            cc.error("服务端发牌的张数必须为13张！");
            return;
        }
        cc.log("所有的牌 = " + this.pokers.toString() + "]");
        cc.log("余牌 = " + this.left_pokers.toString() + "]");
        this.reset_left_pokers(true);
    },

    // 把下面的牌以及available的按钮准备好
    reset_left_pokers: function (is_first) {
        if (!arguments[0]) {
            is_first = false;
        }
        var self = this;
        for (var i = 0; i < 13; i++) {
            var node = this.bottom_panel.getChildByName("card_" + i.toString());
            if (node) {
                this.bottom_panel.removeChild(node);
            }
        }
        var delta_time = 0;
        if (is_first) {
            delta_time = 0.10;
            cc.audioEngine.playEffect("res/sound/effect/fapai.mp3");
        }
        var j = 0;
        function add_new_poker(){
            if (j >= self.left_pokers.length) {
                return;
            }
            let val = self.left_pokers[j];
            var card_img = new ccui.ImageView("Poker/" + val.toString() + ".png", ccui.Widget.PLIST_TEXTURE);
            card_img.setName("card_" + j.toString());
            card_img.setScale(1.5, 1.5);
            card_img.x = 640 + (j - (self.left_pokers.length - 1) / 2) * 80;
            card_img.y = 170;
            card_img.setLocalZOrder(j - 14);
            self.bottom_panel.addChild(card_img);
            card_img.setTouchEnabled(true);
            let kk = j;
            card_img.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_BEGAN) {
                    self.selected_pokers.push(kk);
                    let dark_img = new ccui.ImageView("res/ui/GameRoomUI/dark_card.png");
                    dark_img.setAnchorPoint(cc.p(0, 0));
                    dark_img.setPosition(cc.p(0, 0));
                    sender.addChild(dark_img);
                    cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
                }
                else if (eventType === ccui.Widget.TOUCH_MOVED) {
                    let moved_pos = self.bottom_panel.convertToNodeSpace(sender.getTouchMovePosition());
                    if (moved_pos.y >= 90 && moved_pos.y <= 240) {
                        let tmp_j = Math.floor((moved_pos.x - 640) / 80 + ((self.left_pokers.length - 1) / 2) + 0.6);
                        if (tmp_j >= 0 && tmp_j < self.left_pokers.length) {
                            let node = self.bottom_panel.getChildByName("card_" + tmp_j.toString());
                            if (node.getChildrenCount() === 0) {
                                let dark_img = new ccui.ImageView("res/ui/GameRoomUI/dark_card.png");
                                dark_img.setAnchorPoint(cc.p(0, 0));
                                dark_img.setPosition(cc.p(0, 0));
                                node.addChild(dark_img);
                                self.selected_pokers.push(tmp_j);
                                cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
                            }
                        }
                    }
                }
                else if (eventType === ccui.Widget.TOUCH_ENDED || eventType === ccui.Widget.TOUCH_CANCELED) {
                    for (let k = 0; k < self.selected_pokers.length; k++) {
                        let idx = self.selected_pokers[k];
                        let node = self.bottom_panel.getChildByName("card_" + idx.toString());
                        if (node.getPositionY() < 195) {
                            node.setPositionY(220);
                        }
                        else {
                            node.setPositionY(170);
                        }
                        node.removeAllChildren();
                    }
                    self.selected_pokers = [];
                }
                self.add_ma_flag(card_img, val);
            });
            self.add_ma_flag(card_img, val);
            if (is_first) {
                cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
            }
            j++;
            if (j >= self.left_pokers.length) {
                if (is_first) {
                    self.rootUINode.getChildByName('front_panel').setVisible(false);
                }
            }
        }
        if(delta_time == 0) {
            this.rootUINode.runAction(cc.repeat(cc.sequence(cc.delayTime(delta_time), cc.callFunc(add_new_poker)), this.left_pokers.length));
        } else {
            for(var i = 0; i < this.left_pokers.length; i++){
                add_new_poker();
            }
        }

        cc.log("余牌 = 【" + this.left_pokers.toString() + "]");
        if (is_first) {
            this.rootUINode.runAction(cc.sequence(cc.delayTime(delta_time * 13), cc.callFunc(function () {
                self.reset_paixing_btns();
            })));
        }
        else {
            this.reset_paixing_btns();
        }
    },

    // 获取被选中的牌
    get_up_pokers: function () {
        let up_pokers = [];
        for (let j = 0; j < this.left_pokers.length; j++) {
            let node = this.bottom_panel.getChildByName("card_" + j.toString());
            if (node && node.getPositionY() > 195) {
                up_pokers.push(this.left_pokers[j]);
            }
        }
        return this.sort_pokers(up_pokers);
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
    },

    // 重置下面this.left_pokers牌型的位置
    reset_left_pokers_position: function () {
        for (var i = 0; i < 13; i++) {
            var node = this.bottom_panel.getChildByName("card_" + i.toString());
            if (node) {
                node.setPositionY(170);
            }
        }
    },

    disable_all_btns: function () {
        cc.log('禁用八个按钮');
        this.tonghuashun_btn.setBright(false);
        this.tonghuashun_btn.setEnabled(false);
        this.zhadan_btn.setBright(false);
        this.zhadan_btn.setEnabled(false);
        this.hulu_btn.setBright(false);
        this.hulu_btn.setEnabled(false);
        this.tonghua_btn.setBright(false);
        this.tonghua_btn.setEnabled(false);
        this.shunzi_btn.setBright(false);
        this.shunzi_btn.setEnabled(false);
        this.santiao_btn.setBright(false);
        this.santiao_btn.setEnabled(false);
        this.liangdui_btn.setBright(false);
        this.liangdui_btn.setEnabled(false);
        this.duizi_btn.setBright(false);
        this.duizi_btn.setEnabled(false);
    },

    // 遍历所有情况，生成八个conditions
    gen_conditions: function () {
        this.reset_paixing_conditions();

        // 遍历法：遍历所有的C_13^5的五张牌
        // var cmb = combinatorics.combination(this.left_pokers, 5);
        // var five_pokers = cmb.next();
        // while (five_pokers) {
        //     this.check_five_pokers(five_pokers);
        //     five_pokers = cmb.next();
        // }

        // 查找法：
        var pokers = this.left_pokers.concat([]);   // 余下的牌，如[54,52,28,18,4...]，存牌面值
        var poker_numbers = pokers.map(function (item) {
            return (item >> 2) + 1;
        }); // 每个牌的大小
        var samenumber_pokers_list = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];  // 第2个[]里存储13张牌里大小为2的牌
        for (var i1 = 0; i1 < pokers.length; i1++) {
            samenumber_pokers_list[poker_numbers[i1]].push(pokers[i1]);
        }
        samenumber_pokers_list[1] = samenumber_pokers_list[14].concat([]).map(function (item) {
            return item-52;
        });
        var poker_types = pokers.map(function (item) {
            return item & 3;
        }); // 每个牌的花色
        var sametype_pokers_list = [[], [], [], []];  // [[方], [梅], [红], [黑]]，存牌面值
        for (var i2 = 0; i2 < pokers.length; i2++) {
            sametype_pokers_list[poker_types[i2]].push(pokers[i2]);
        }
        cc.log('calc calc');
        this.find_all_tonghaushuns_tonghuas(sametype_pokers_list, samenumber_pokers_list);
        this.find_all_zhadans(samenumber_pokers_list);
        this.find_all_hulus(samenumber_pokers_list);
        this.find_all_santiaos(samenumber_pokers_list);
        this.find_all_liangduis(samenumber_pokers_list);
        this.find_all_duizis(samenumber_pokers_list);
        cc.log('同花顺：');
        cc.log(this.tonghuashun_conditions);
        cc.log('炸弹：');
        cc.log(this.zhadan_conditions);
        cc.log('葫芦：');
        cc.log(this.hulu_conditions);
        cc.log('同花：');
        cc.log(this.tonghua_conditions);
        cc.log('顺子：');
        cc.log(this.shunzi_conditions);
        cc.log('三条：');
        cc.log(this.santiao_conditions);
        cc.log('两对：');
        cc.log(this.liangdui_conditions);
        cc.log('对子：');
        cc.log(this.duizi_conditions);

    },

    find_all_duizis: function (samenumber_pokers_list) {
        for (var i = 14; i >= 2; i--) {
            if (samenumber_pokers_list[i].length >= 2) {
                var first_danzhang = 0;
                var first_danzhang_j = 0;
                for (var j1 = 2; j1 <= 14; j1++) {
                    if (j1 !== i && samenumber_pokers_list[j1].length === 1) {
                        first_danzhang = samenumber_pokers_list[j1][0];
                        first_danzhang_j = j1;
                        break;
                    }
                }
                if (first_danzhang === 0) {
                    for (var j2 = 2; j2 <= 14; j2++) {
                        if (j2 !== i && samenumber_pokers_list[j2].length === 2) {
                            first_danzhang = samenumber_pokers_list[j2][0];
                            first_danzhang_j = j2;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    for (var j3 = 2; j3 <= 14; j3++) {
                        if (j3 !== i && samenumber_pokers_list[j3].length === 3) {
                            first_danzhang = samenumber_pokers_list[j3][0];
                            first_danzhang_j = j3;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    for (var j4 = 2; j4 <= 14; j4++) {
                        if (j4 !== i && samenumber_pokers_list[j4].length === 4) {
                            first_danzhang = samenumber_pokers_list[j4][0];
                            first_danzhang_j = j4;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    break;
                }
                var second_danzhang = 0;
                var second_danzhang_k = 0;
                for (var k1 = first_danzhang_j + 1; k1 <= 14; k1++) {
                    if (k1 !== i && samenumber_pokers_list[k1].length === 1) {
                        second_danzhang = samenumber_pokers_list[k1][0];
                        second_danzhang_k = k1;
                        break;
                    }
                }
                if (second_danzhang === 0) {
                    for (var k2 = first_danzhang_j + 1; k2 <= 14; k2++) {
                        if (k2 !== i && samenumber_pokers_list[k2].length === 2) {
                            second_danzhang = samenumber_pokers_list[k2][0];
                            second_danzhang_k = k2;
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    for (var k3 = first_danzhang_j + 1; k3 <= 14; k3++) {
                        if (k3 !== i && samenumber_pokers_list[k3].length === 3) {
                            second_danzhang = samenumber_pokers_list[k3][0];
                            second_danzhang_k = k3;
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    for (var k4 = first_danzhang_j + 1; k4 <= 14; k4++) {
                        if (k4 !== i && samenumber_pokers_list[k4].length === 4) {
                            second_danzhang = samenumber_pokers_list[k4][0];
                            second_danzhang_k = k4;
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    break;
                }
                var third_danzhang = 0;
                for (var w1 = second_danzhang_k + 1; w1 <= 14; w1++) {
                    if (w1 !== i && samenumber_pokers_list[w1].length === 1) {
                        third_danzhang = samenumber_pokers_list[w1][0];
                        break;
                    }
                }
                if (third_danzhang === 0) {
                    for (var w2 = second_danzhang_k + 1; w2 <= 14; w2++) {
                        if (w2 !== i && samenumber_pokers_list[w2].length === 1) {
                            third_danzhang = samenumber_pokers_list[w2][0];
                            break;
                        }
                    }
                }
                if (third_danzhang === 0) {
                    for (var w3 = second_danzhang_k + 1; w3 <= 14; w3++) {
                        if (w3 !== i && samenumber_pokers_list[w3].length === 1) {
                            third_danzhang = samenumber_pokers_list[w3][0];
                            break;
                        }
                    }
                }
                if (third_danzhang === 0) {
                    for (var w4 = second_danzhang_k + 1; w4 <= 14; w4++) {
                        if (w4 !== i && samenumber_pokers_list[w4].length === 1) {
                            third_danzhang = samenumber_pokers_list[w4][0];
                            break;
                        }
                    }
                }
                if (third_danzhang === 0) {
                    break;
                }
                this.duizi_conditions.push([samenumber_pokers_list[i][0], samenumber_pokers_list[i][1], third_danzhang, second_danzhang, first_danzhang]);
            }
        }
    },

    find_all_liangduis: function (samenumber_pokers_list) {
        for (var i1 = 14; i1 >= 2; i1--) {
            if (samenumber_pokers_list[i1].length >= 2) {
                for (var i2 = i1 - 1; i2 >= 2; i2--) {
                    if (i1 !== i2 && samenumber_pokers_list[i2].length >= 2) {
                        var danzhang = 0;
                        for (var j1 = 2; j1 <= 14; j1++) {
                            if (j1 !== i1 && j1 !== i2 && samenumber_pokers_list[j1].length === 1) {
                                danzhang = samenumber_pokers_list[j1][0];
                                break;
                            }
                        }
                        if (danzhang === 0) {
                            for (var j2 = 2; j2 <= 14; j2++) {
                                if (j2 !== i1 && j2 !== i2 && samenumber_pokers_list[j2].length === 2) {
                                    danzhang = samenumber_pokers_list[j2][0];
                                    break;
                                }
                            }
                        }
                        if (danzhang === 0) {
                            for (var j3 = 2; j3 <= 14; j3++) {
                                if (j3 !== i1 && j3 !== i2 && samenumber_pokers_list[j3].length === 3) {
                                    danzhang = samenumber_pokers_list[j3][0];
                                    break;
                                }
                            }
                        }
                        if (danzhang === 0) {
                            for (var j4 = 2; j4 <= 14; j4++) {
                                if (j4 !== i1 && j4 !== i2 && samenumber_pokers_list[j4].length === 3) {
                                    danzhang = samenumber_pokers_list[j4][0];
                                    break;
                                }
                            }
                        }
                        if (danzhang === 0) {
                            break;
                        }
                        this.liangdui_conditions.push(samenumber_pokers_list[i1].slice(0, 2).concat(samenumber_pokers_list[i2].slice(0, 2)).concat([danzhang]));
                    }
                }
            }
        }
    },

    find_all_santiaos: function (samenumber_pokers_list) {
        for (var i = 14; i >= 2; i--) {
            if (samenumber_pokers_list[i].length >= 3) {
                // 查找剩下两张单牌，要尽可能小
                var first_danzhang = 0;
                var first_danzhang_j = 0;
                for (var j1 = 2; j1 <= 14; j1++) {
                    if (j1 !== i && samenumber_pokers_list[j1].length === 1) {
                        first_danzhang = samenumber_pokers_list[j1][0];
                        first_danzhang_j = j1;
                        break;
                    }
                }
                if (first_danzhang === 0) {
                    for (var j2 = 2; j2 <= 14; j2++) {
                        if (j2 !== i && samenumber_pokers_list[j2].length === 2) {
                            first_danzhang = samenumber_pokers_list[j2][0];
                            first_danzhang_j = j2;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    for (var j3 = 2; j3 <= 14; j3++) {
                        if (j3 !== i && samenumber_pokers_list[j3].length === 3) {
                            first_danzhang = samenumber_pokers_list[j3][0];
                            first_danzhang_j = j3;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    for (var j4 = 2; j4 <= 14; j4++) {
                        if (j4 !== i && samenumber_pokers_list[j4].length === 4) {
                            first_danzhang = samenumber_pokers_list[j4][0];
                            first_danzhang_j = j4;
                            break;
                        }
                    }
                }
                if (first_danzhang === 0) {
                    break;
                }
                var second_danzhang = 0;
                for (var k1 = first_danzhang_j + 1; k1 <= 14; k1++) {
                    if (k1 !== i && samenumber_pokers_list[k1].length === 1) {
                        second_danzhang = samenumber_pokers_list[k1][0];
                        break;
                    }
                }
                if (second_danzhang === 0) {
                    for (var k2 = first_danzhang_j + 1; k2 <= 14; k2++) {
                        if (k2 !== i && samenumber_pokers_list[k2].length === 2) {
                            second_danzhang = samenumber_pokers_list[k2][0];
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    for (var k3 = first_danzhang_j + 1; k3 <= 14; k3++) {
                        if (k3 !== i && samenumber_pokers_list[k3].length === 3) {
                            second_danzhang = samenumber_pokers_list[k3][0];
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    for (var k4 = first_danzhang_j + 1; k4 <= 14; k4++) {
                        if (k4 !== i && samenumber_pokers_list[k4].length === 4) {
                            second_danzhang = samenumber_pokers_list[k4][0];
                            break;
                        }
                    }
                }
                if (second_danzhang === 0) {
                    break;
                }
                this.santiao_conditions.push(samenumber_pokers_list[i].slice(0, 3).concat([second_danzhang, first_danzhang]));
            }
        }
    },

    find_all_hulus: function (samenumber_pokers_list) {
        for (var i = 14; i >= 2; i--) {
            if (samenumber_pokers_list[i].length >= 3) {
                // 找一个最小对子组成葫芦，如果没有对子拆最小的三条，没有对子和三条，就拆炸弹
                var duizi = [];
                for (var j1 = 2; j1 <= 14; j1++) {
                    if (j1 === i) {
                        continue;
                    }
                    if (samenumber_pokers_list[j1].length === 2) {
                        duizi = samenumber_pokers_list[j1];
                        this.hulu_conditions.push(samenumber_pokers_list[i].slice(0, 3).concat(duizi));
                    }
                }
                for (var j2 = 2; j2 <= 14; j2++) {
                    if (j2 === i) {
                        continue;
                    }
                    if (samenumber_pokers_list[j2].length === 3) {
                        duizi = [samenumber_pokers_list[j2][0], samenumber_pokers_list[j2][1]];
                        this.hulu_conditions.push(samenumber_pokers_list[i].slice(0, 3).concat(duizi));
                    }
                }
                for (var j3 = 2; j3 <= 14; j3++) {
                    if (j3 === i) {
                        continue;
                    }
                    if (samenumber_pokers_list[j3].length === 4) {
                        duizi = [samenumber_pokers_list[j3][0], samenumber_pokers_list[j3][1]];
                        this.hulu_conditions.push(samenumber_pokers_list[i].slice(0, 3).concat(duizi));
                    }
                }
            }
        }
    },

    find_all_zhadans: function (samenumber_pokers_list) {
        for (var i = 14; i >= 2; i--) {
            if (samenumber_pokers_list[i].length === 4) {
                // 找一个最小单张组成炸弹，如果没有单张拆最小的对子，没有单张和对子，就拆三张
                var danzhang = 0;
                for (var j1 = 2; j1 <= 14; j1++) {
                    if (j1 !== i && samenumber_pokers_list[j1].length === 1) {
                        danzhang = samenumber_pokers_list[j1][0];
                        break;
                    }
                }
                if (danzhang === 0) {
                    for (var j2 = 2; j2 <= 14; j2++) {
                        if (j2 !== i && samenumber_pokers_list[j2].length === 2) {
                            danzhang = samenumber_pokers_list[j2][0];
                            break;
                        }
                    }
                }
                if (danzhang === 0) {
                    for (var j3 = 2; j3 <= 14; j3++) {
                        if (j3 !== i && samenumber_pokers_list[j3].length === 3) {
                            danzhang = samenumber_pokers_list[j3][0];
                            break;
                        }
                    }
                }
                if (danzhang === 0) {
                    for (var j4 = 2; j4 <= 14; j4++) {
                        if (j4 !== i && samenumber_pokers_list[j4].length === 4) {
                            danzhang = samenumber_pokers_list[j4][0];
                            break;
                        }
                    }
                }
                if (danzhang === 0) {
                    break;
                }
                this.zhadan_conditions.push(samenumber_pokers_list[i].concat([danzhang]));
            }
        }
    },

    find_all_tonghaushuns_tonghuas: function (sametype_pokers_list, samenumber_pokers_list) {
        for (var i1 = 14; i1 >= 5; i1--) {
            if (samenumber_pokers_list[i1].length >= 1
                && samenumber_pokers_list[i1 - 1].length >= 1
                && samenumber_pokers_list[i1 - 2].length >= 1
                && samenumber_pokers_list[i1 - 3].length >= 1
                && samenumber_pokers_list[i1 - 4].length >= 1) {
                var findone = false;
                for (var j0 = 0; j0 < samenumber_pokers_list[i1].length; j0++) {
                    for (var j1 = 0; j1 < samenumber_pokers_list[i1 - 1].length; j1++) {
                        for (var j2 = 0; j2 < samenumber_pokers_list[i1 - 2].length; j2++) {
                            for (var j3 = 0; j3 < samenumber_pokers_list[i1 - 3].length; j3++) {
                                for (var j4 = 0; j4 < samenumber_pokers_list[i1 - 4].length; j4++) {
                                    if (samenumber_pokers_list[i1][j0] === samenumber_pokers_list[i1 - 1][j1] + 4
                                        && samenumber_pokers_list[i1][j0] === samenumber_pokers_list[i1 - 2][j2] + 8
                                        && samenumber_pokers_list[i1][j0] === samenumber_pokers_list[i1 - 3][j3] + 12
                                        && samenumber_pokers_list[i1][j0] === samenumber_pokers_list[i1 - 4][j4] + 16) {
                                        if (i1 !== 5) {
                                            this.tonghuashun_conditions.push([samenumber_pokers_list[i1][j0], samenumber_pokers_list[i1 - 1][j1], samenumber_pokers_list[i1 - 2][j2], samenumber_pokers_list[i1 - 3][j3], samenumber_pokers_list[i1 - 4][j4]]);
                                        }
                                        else {
                                            this.tonghuashun_conditions.push([samenumber_pokers_list[i1][j0], samenumber_pokers_list[i1 - 1][j1], samenumber_pokers_list[i1 - 2][j2], samenumber_pokers_list[i1 - 3][j3], samenumber_pokers_list[14][j4]]);
                                        }
                                    }
                                    else {
                                        if (findone === false) {
                                            if (i1 !== 5) {
                                                this.shunzi_conditions.push([samenumber_pokers_list[i1][j0], samenumber_pokers_list[i1 - 1][j1], samenumber_pokers_list[i1 - 2][j2], samenumber_pokers_list[i1 - 3][j3], samenumber_pokers_list[i1 - 4][j4]]);
                                            }
                                            else {
                                                this.shunzi_conditions.push([samenumber_pokers_list[i1][j0], samenumber_pokers_list[i1 - 1][j1], samenumber_pokers_list[i1 - 2][j2], samenumber_pokers_list[i1 - 3][j3], samenumber_pokers_list[14][j4]]);
                                            }
                                            findone = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // var desc = function (x, y) {
        //     return x > y ? -1 : 1;
        // };
        // pokers.sort(desc);
        var desc = function (color1_list, color2_list) {
            if (color1_list.length === 0) {
                return -1;
            }
            else {
                if (color2_list.length === 0) {
                    return 1;
                }
                return (color1_list[0] > color2_list[0]) ? 1 : -1;
            }
        };
        sametype_pokers_list.sort(desc);
        for (var i2 = 3; i2 >= 0; i2--) {
            if (sametype_pokers_list[i2].length >= 5) {
                var cmb = combinatorics.combination(sametype_pokers_list[i2], 5);
                var five_pokers = cmb.next();
                while (five_pokers) {
                    if (five_pokers[0] === 16 + five_pokers[4]) {
                        // pass
                    }
                    else if (five_pokers[0] === 36 + five_pokers[1]) {
                        // pass A5432
                    }
                    else {
                        this.tonghua_conditions.push(five_pokers);
                    }
                    five_pokers = cmb.next();
                }
            }
        }
    },

    // 重置牌型按钮的亮不亮和点击响应
    reset_paixing_btns: function () {
        var self = this;
        this.disable_all_btns();
        if (this.left_pokers.length < 5) {
            return;
        }
        this.gen_conditions();

        cc.log('设置八个按钮的亮暗和响应');
        // tonghuashun
        if (this.tonghuashun_conditions.length > 0) {
            this.tonghuashun_btn.setBright(true);
            this.tonghuashun_btn.setEnabled(true);
            this.tonghuashun_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.tonghuashun_conditions, const_val.paixing_idx["tonghuashun"]);
                }
            });
        }
        // zhadan
        if (this.zhadan_conditions.length > 0) {
            this.zhadan_btn.setBright(true);
            this.zhadan_btn.setEnabled(true);
            this.zhadan_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.zhadan_conditions, const_val.paixing_idx["zhadan"]);
                }
            });
        }
        // hulu
        if (this.hulu_conditions.length > 0) {
            this.hulu_btn.setBright(true);
            this.hulu_btn.setEnabled(true);
            this.hulu_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.hulu_conditions, const_val.paixing_idx["hulu"]);
                }
            });
        }
        // tonghua
        if (this.tonghua_conditions.length > 0) {
            this.tonghua_btn.setBright(true);
            this.tonghua_btn.setEnabled(true);
            this.tonghua_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.tonghua_conditions, const_val.paixing_idx["tonghua"]);
                }
            });
        }
        // shunzi
        if (this.shunzi_conditions.length > 0) {
            this.shunzi_btn.setBright(true);
            this.shunzi_btn.setEnabled(true);
            this.shunzi_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.shunzi_conditions, const_val.paixing_idx["shunzi"]);
                }
            });
        }
        // santiao
        if (this.santiao_conditions.length > 0) {
            this.santiao_btn.setBright(true);
            this.santiao_btn.setEnabled(true);
            this.santiao_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.santiao_conditions, const_val.paixing_idx["santiao"]);
                }
            });
        }
        // liangdui
        if (this.liangdui_conditions.length > 0) {
            this.liangdui_btn.setBright(true);
            this.liangdui_btn.setEnabled(true);
            this.liangdui_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.liangdui_conditions, const_val.paixing_idx["liangdui"]);
                }
            });
        }
        // duizi
        if (this.duizi_conditions.length > 0) {
            this.duizi_btn.setBright(true);
            this.duizi_btn.setEnabled(true);
            this.duizi_btn.addTouchEventListener(function (sender, eventType) {
                if (eventType === ccui.Widget.TOUCH_ENDED) {
                    self.reset_left_pokers_position();
                    self.up_paixing_pokers(self.duizi_conditions, const_val.paixing_idx["duizi"]);
                }
            });
        }
    },

    // check_five_pokers: function (five_pokers) {
    //     switch (cutil.get_five_poker_type(five_pokers)) {
    //         case const_val.tonghuashun:
    //             this.tonghuashun_conditions.push(five_pokers);
    //             break;
    //         case const_val.zhadan:
    //             this.zhadan_conditions.push(five_pokers);
    //             break;
    //         case const_val.hulu:
    //             this.hulu_conditions.push(five_pokers);
    //             break;
    //         case const_val.tonghua:
    //             this.tonghua_conditions.push(five_pokers);
    //             break;
    //         case const_val.shunzi:
    //             this.shunzi_conditions.push(five_pokers);
    //             break;
    //         case const_val.santiao:
    //             this.santiao_conditions.push(five_pokers);
    //             break;
    //         case const_val.liangdui:
    //             this.liangdui_conditions.push(five_pokers);
    //             break;
    //         case const_val.duizi:
    //             this.duizi_conditions.push(five_pokers);
    //             break;
    //     }
    // },

    // 清空所有的conditions
    reset_paixing_conditions: function () {
        cc.log('清空conditions');
        this.tonghuashun_conditions = [];
        this.zhadan_conditions = [];
        this.hulu_conditions = [];
        this.tonghua_conditions = [];
        this.shunzi_conditions = [];
        this.santiao_conditions = [];
        this.liangdui_conditions = [];
        this.duizi_conditions = [];
    },

    // 将相关牌型的牌向上移动一下
    up_paixing_pokers: function (conditions, idx) {
        cc.log("这种牌型的conditions数目：" + conditions.length.toString());
        if (this.idx_paixing[idx] === -1) {
            this.idx_paixing = [-1, -1, -1, -1, -1, -1, -1, -1];
            this.idx_paixing[idx] = 0;
        }
        else {
            this.idx_paixing[idx] = (this.idx_paixing[idx] + 1) % conditions.length;
        }
        cc.log("显示的这种牌型的牌面为[" + conditions[this.idx_paixing[idx]].toString() + "]");
        for (var i = 0; i < conditions[this.idx_paixing[idx]].length; i++) {
            var val = conditions[this.idx_paixing[idx]][i];
            if (this.left_pokers.indexOf(val) !== -1) {
                this.bottom_panel.getChildByName("card_" + this.left_pokers.indexOf(val).toString()).setPositionY(220);
            }
        }
        cc.audioEngine.playEffect("res/sound/effect/click_light.mp3");
    },

    init_top_panel: function () {
        var self = this;
        this.toudun_submit_img.setTag(1000);
        this.zhongdun_submit_img.setTag(1000);
        this.weidun_submit_img.setTag(1000);
        this.toudun_submit_img.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (self.toudun_submit_img.getTag() !== 999 || self.toudun_pokers.length !== 3) {
                    cc.log('头道当前是勾号');
                    return;
                }
                // model
                self.left_pokers = self.sort_pokers(self.left_pokers.concat(self.toudun_pokers));
                self.toudun_pokers = [];
                // view
                self.reset_left_pokers();
                self.delete_toudun_pokers();
                self.set_submit_img(self.toudun_submit_img, true);
                self.toudun_result_img.setVisible(false);
                cc.audioEngine.playEffect("res/sound/effect/click_light.mp3");
            }
        });
        this.zhongdun_submit_img.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (self.zhongdun_submit_img.getTag() !== 999 || self.zhongdun_pokers.length !== 5) {
                    cc.log('中道当前是勾号');
                    return;
                }
                // model
                self.left_pokers = self.sort_pokers(self.left_pokers.concat(self.zhongdun_pokers));
                self.zhongdun_pokers = [];
                // view
                self.reset_left_pokers();
                self.delete_zhongdun_pokers();
                self.set_submit_img(self.zhongdun_submit_img, true);
                self.zhongdun_result_img.setVisible(false);
                cc.audioEngine.playEffect("res/sound/effect/click_light.mp3");
            }
        });
        this.weidun_submit_img.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                if (self.weidun_submit_img.getTag() !== 999 || self.weidun_pokers.length !== 5) {
                    cc.log('尾道当前是勾号');
                    return;
                }
                // model
                self.left_pokers = self.sort_pokers(self.left_pokers.concat(self.weidun_pokers));
                self.weidun_pokers = [];
                // view
                self.reset_left_pokers();
                self.delete_weidun_pokers();
                self.set_submit_img(self.weidun_submit_img, true);
                self.weidun_result_img.setVisible(false);
                cc.audioEngine.playEffect("res/sound/effect/click_light.mp3");
            }
        });
        this.toudun_pokers_panel.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                cc.log("toudun_pokers_panel is clicked");
                let up_pokers = self.get_up_pokers();
                if (self.toudun_pokers.length === 3) {
                    cc.log("toudun already has pokers");
                }
                else if (self.toudun_pokers.length !== 0) {
                    cc.log("ERR: toudun pokers number must be 0 or 5");
                }
                else if (up_pokers.length !== 3) {
                    self.show_warning("头道必须有3张牌");
                }
                else {
                    // 小于等于10表明zd wd至少有一个已经被选上去了
                    if (self.left_pokers.length <= 10) {
                        var td = up_pokers.concat([]);
                        var zd = [];
                        var wd = [];
                        if (self.zhongdun_pokers.length === 5) {
                            zd = self.zhongdun_pokers.concat([]);
                            if (self.weidun_pokers.length === 5) {
                                wd = self.weidun_pokers.concat([])
                            }
                            else {
                                wd = self.left_pokers.concat([]);
                                for (let i = 0; i < up_pokers.length; i++) {
                                    wd.remove(up_pokers[i]);
                                }
                            }
                        }
                        else {
                            wd = self.weidun_pokers.concat([]);
                            zd = self.left_pokers.concat([]);
                            for (let i = 0; i < up_pokers.length; i++) {
                                zd.remove(up_pokers[i]);
                            }
                        }
                        cc.log(td);
                        cc.log(zd);
                        cc.log(wd);
                        if (!self.check_result_available(td, zd, wd)) {
                            self.show_warning('必须满足头道<中道<尾道');
                            return;
                        }
                    }
                    // 维护toudun_pokers, left_pokers
                    self.toudun_pokers = up_pokers.concat([]);
                    for (let i = 0; i < up_pokers.length; i++) {
                        self.left_pokers.remove(up_pokers[i]);
                    }
                    // view
                    self.reset_left_pokers();
                    self.add_toudun_pokers();
                    self.set_submit_img(self.toudun_submit_img, false);
                    self.show_dun_result(self.toudun_result_img, cutil.get_three_poker_type(self.toudun_pokers));
                    self.check_left_pokers();
                    cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
                }
            }
        });
        this.zhongdun_pokers_panel.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                cc.log("zhongdun_pokers_panel is clicked");
                let up_pokers = self.get_up_pokers();
                if (self.zhongdun_pokers.length === 5) {
                    cc.log("zhongdun already has pokers");
                }
                else if (self.zhongdun_pokers.length !== 0) {
                    cc.log("ERR: zhongdun pokers number must be 0 or 5");
                }
                else if (up_pokers.length !== 5) {
                    self.show_warning("中道必须有5张牌");
                }
                else {
                    // 小于等于8表明td wd至少有一个已经被选上去了
                    if (self.left_pokers.length <= 10) {
                        var td = [];
                        var zd = up_pokers.concat([]);
                        var wd = [];
                        if (self.toudun_pokers.length === 3) {
                            td = self.toudun_pokers.concat([]);
                            if (self.weidun_pokers.length === 5) {
                                wd = self.weidun_pokers.concat([]);
                            }
                            else {
                                wd = self.left_pokers.concat([]);
                                for (let i = 0; i < up_pokers.length; i++) {
                                    wd.remove(up_pokers[i]);
                                }
                            }
                        }
                        else {
                            wd = self.weidun_pokers.concat([]);
                            td = self.left_pokers.concat([]);
                            for (let i = 0; i < up_pokers.length; i++) {
                                td.remove(up_pokers[i]);
                            }
                        }
                        cc.log(td);
                        cc.log(zd);
                        cc.log(wd);
                        if (!self.check_result_available(td, zd, wd)) {
                            self.show_warning('必须满足头道<中道<尾道');
                            return;
                        }
                    }
                    // 维护zhongdun_pokers, left_pokers
                    self.zhongdun_pokers = up_pokers.concat([]);
                    for (let i = 0; i < up_pokers.length; i++) {
                        self.left_pokers.remove(up_pokers[i]);
                    }
                    // view
                    self.reset_left_pokers();
                    self.add_zhongdun_pokers();
                    self.set_submit_img(self.zhongdun_submit_img, false);
                    self.show_dun_result(self.zhongdun_result_img, cutil.get_five_poker_type(self.zhongdun_pokers));
                    self.check_left_pokers();
                    cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
                }
            }
        });
        this.weidun_pokers_panel.addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                cc.log("weidun_pokers_panel is clicked");
                let up_pokers = self.get_up_pokers();
                if (self.weidun_pokers.length === 5) {
                    cc.log("weidun already has pokers");
                }
                else if (self.weidun_pokers.length !== 0) {
                    cc.log("ERR: weidun pokers number must be 0 or 5");
                }
                else if (up_pokers.length !== 5) {
                    self.show_warning("尾道必须有5张牌");
                }
                else {
                    // 小于等于8表明td wd至少有一个已经被选上去了
                    if (self.left_pokers.length <= 10) {
                        var td = [];
                        var zd = [];
                        var wd = up_pokers.concat([]);
                        if (self.toudun_pokers.length === 3) {
                            td = self.toudun_pokers.concat([]);
                            if (self.zhongdun_pokers.length === 5) {
                                zd = self.zhongdun_pokers.concat([])
                            }
                            else {
                                zd = self.left_pokers.concat([]);
                                for (let i = 0; i < up_pokers.length; i++) {
                                    zd.remove(up_pokers[i]);
                                }
                            }
                        }
                        else {
                            zd = self.zhongdun_pokers.concat([]);
                            td = self.left_pokers.concat([]);
                            for (let i = 0; i < up_pokers.length; i++) {
                                td.remove(up_pokers[i]);
                            }
                        }
                        cc.log(td);
                        cc.log(zd);
                        cc.log(wd);
                        if (!self.check_result_available(td, zd, wd)) {
                            self.show_warning('必须满足头道<中道<尾道');
                            return;
                        }
                    }
                    // 维护weidun_pokers, left_pokers
                    self.weidun_pokers = up_pokers.concat([]);
                    for (let i = 0; i < up_pokers.length; i++) {
                        self.left_pokers.remove(up_pokers[i]);
                    }
                    // view
                    self.reset_left_pokers();
                    self.add_weidun_pokers();
                    self.set_submit_img(self.weidun_submit_img, false);
                    self.show_dun_result(self.weidun_result_img, cutil.get_five_poker_type(self.weidun_pokers));
                    self.check_left_pokers();
                    cc.audioEngine.playEffect("res/sound/effect/choose.mp3");
                }
            }
        });
    },

    // 在alert label上面显示诸如"尾道必须为五张牌"之类的提示
    show_warning: function (info) {
        var alert_label = this.top_panel.getChildByName("alert_label");
        alert_label.setString(info);
        alert_label.runAction(cc.sequence(
            cc.fadeIn(0.1),
            cc.delayTime(1.0),
            cc.fadeOut(0.5)
        ));
        var alert_img = this.top_panel.getChildByName("alert_img");
        alert_img.runAction(cc.sequence(
            cc.fadeIn(0.1),
            cc.delayTime(1.0),
            cc.fadeOut(0.5)
        ));
    },

    delete_toudun_pokers: function () {
        this.toudun_pokers_panel.removeAllChildren();
    },

    delete_zhongdun_pokers: function () {
        this.zhongdun_pokers_panel.removeAllChildren();
    },

    delete_weidun_pokers: function () {
        this.weidun_pokers_panel.removeAllChildren();
    },

    add_toudun_pokers: function () {
        this.delete_toudun_pokers();
        for (var i = 0; i < this.toudun_pokers.length; i++) {
            var val = this.toudun_pokers[i];
            cc.log('头道加图 ' + this.get_card_string(val));
            var card_img = new ccui.ImageView("Poker/" + val.toString() + ".png", ccui.Widget.PLIST_TEXTURE);
            card_img.setName("toudun_" + i.toString());
            card_img.x = 54 + i * 67;
            card_img.y = 0;
            card_img.setScale(1.30, 1.30);
            this.toudun_pokers_panel.addChild(card_img);
            this.add_ma_flag(card_img, val);
        }
    },

    add_zhongdun_pokers: function () {
        this.delete_zhongdun_pokers();
        for (var i = 0; i < this.zhongdun_pokers.length; i++) {
            var val = this.zhongdun_pokers[i];
            cc.log('中道加图 ' + this.get_card_string(val));
            var card_img = new ccui.ImageView("Poker/" + val.toString() + ".png", ccui.Widget.PLIST_TEXTURE);
            card_img.setName("zhongdun_" + i.toString());
            card_img.x = 62 + i * 61.5;
            card_img.y = -12;
            card_img.setScale(1.52, 1.52);
            this.zhongdun_pokers_panel.addChild(card_img);
            this.add_ma_flag(card_img, val);
        }
    },

    add_weidun_pokers: function () {
        this.delete_weidun_pokers();
        for (var i = 0; i < this.weidun_pokers.length; i++) {
            var val = this.weidun_pokers[i];
            cc.log('尾道加图 ' + this.get_card_string(val));
            var card_img = new ccui.ImageView("Poker/" + val.toString() + ".png", ccui.Widget.PLIST_TEXTURE);
            card_img.setName("weidun_" + i.toString());
            card_img.x = 60 + i * 90;
            card_img.y = 85;
            card_img.setScale(1.52, 1.52);
            this.weidun_pokers_panel.addChild(card_img);
            this.add_ma_flag(card_img, val);
        }
    },

    get_card_string: function (val) {
        var s1 = '';
        if ((val & 3) === 3) {
            s1 = '黑桃';
        }
        else if ((val & 3) === 2) {
            s1 = '红桃';
        }
        else if ((val & 3) === 1) {
            s1 = '梅花';
        }
        else {
            s1 = '方片';
        }
        return s1 + ((val >> 2) + 1).toString();
    },

    // 设置img的显示图片和tag
    set_submit_img: function (img, ok) {
        if (ok && img.getTag() !== 1000) {
            img.loadTexture("res/ui/GameRoomPokerChooseUI/choose_confirm.png");
            img.setTag(1000);
        }
        else if (!ok && img.getTag() !== 999) {
            img.loadTexture("res/ui/GameRoomPokerChooseUI/choose_cancel.png");
            img.setTag(999);
        }
    },

    //
    show_dun_result: function (img, result) {
        img.setVisible(true);
        img.loadTexture(const_val.paixing_imgs[result])
    },

    check_left_pokers: function () {
        if (this.left_pokers.length === 3) {
            // place to toudun
            this.toudun_pokers = this.left_pokers.concat([]);
            this.left_pokers = [];
            // view
            this.reset_left_pokers();
            this.add_toudun_pokers();
            this.set_submit_img(this.toudun_submit_img, false);
            this.show_dun_result(this.toudun_result_img, cutil.get_three_poker_type(this.toudun_pokers));
            this.disable_all_btns();
        }
        else if (this.left_pokers.length === 5) {
            if (this.zhongdun_pokers.length === 0) {
                // place to zhongdun
                this.zhongdun_pokers = this.left_pokers.concat([]);
                this.left_pokers = [];
                // view
                this.reset_left_pokers();
                this.add_zhongdun_pokers();
                this.set_submit_img(this.zhongdun_submit_img, false);
                this.show_dun_result(this.zhongdun_result_img, cutil.get_five_poker_type(this.zhongdun_pokers));
                this.disable_all_btns();
            }
            else {
                // place to weidun
                this.weidun_pokers = this.left_pokers.concat([]);
                this.left_pokers = [];
                // view
                this.reset_left_pokers();
                this.add_weidun_pokers();
                this.set_submit_img(this.weidun_submit_img, false);
                this.show_dun_result(this.weidun_result_img, cutil.get_five_poker_type(this.weidun_pokers));
                this.disable_all_btns();
            }
        }
    },

    check_result_available: function (toudun_pokers, zhongdun_pokers, weidun_pokers) {
        toudun_pokers = this.sort_pokers(toudun_pokers);
        zhongdun_pokers = this.sort_pokers(zhongdun_pokers);
        weidun_pokers = this.sort_pokers(weidun_pokers);
        cc.log("check_result_available:");
        cc.log(toudun_pokers);
        cc.log(zhongdun_pokers);
        cc.log(weidun_pokers);
        var toudun_idx = const_val.paixing_idx[cutil.get_three_poker_type(toudun_pokers)];
        var zhongdun_idx = const_val.paixing_idx[cutil.get_five_poker_type(zhongdun_pokers)];
        var weidun_idx = const_val.paixing_idx[cutil.get_five_poker_type(weidun_pokers)];
        cc.log("toudun_idx = " + toudun_idx.toString());
        cc.log("zhongdun_idx = " + zhongdun_idx.toString());
        cc.log("weidun_idx = " + weidun_idx.toString());
        if (toudun_idx < zhongdun_idx || zhongdun_idx < weidun_idx) {
            return false;
        }
        if (toudun_idx === zhongdun_idx) {
            if (toudun_idx === 8) {
                if (cutil.compare_danzhang(toudun_pokers, zhongdun_pokers) !== -1) {
                    return false;
                }
            }
            else if (toudun_idx === 7) {
                if (cutil.compare_35_duizi(toudun_pokers, zhongdun_pokers) !== -1) {
                    return false;
                }
            }
            else if (toudun_idx === 5) {
                if (cutil.compare_35_santiao(toudun_pokers, zhongdun_pokers) !== -1) {
                    return false;
                }
            }
            else {
                cc.log('ERR[check_result_available]: 不应该执行到这里, toudun_idx = ' + toudun_idx.toString());
                return false;
            }
        }
        if (zhongdun_idx === weidun_idx) {
            switch (zhongdun_idx) {
                case 8:
                    return cutil.compare_danzhang(zhongdun_pokers, weidun_pokers) === -1;
                case 7:
                    return cutil.compare_five_duizi(zhongdun_pokers, weidun_pokers) === -1;
                case 6:
                    return cutil.compare_liangdui(zhongdun_pokers, weidun_pokers) === -1;
                case 5:
                    return cutil.compare_five_santiao(zhongdun_pokers, weidun_pokers) === -1;
                case 4:
                    return cutil.compare_shunzi(zhongdun_pokers, weidun_pokers) === -1;
                case 3:
                    return cutil.compare_tonghua(zhongdun_pokers, weidun_pokers) === -1;
                case 2:
                    return cutil.compare_hulu(zhongdun_pokers, weidun_pokers) === -1;
                case 1:
                    return cutil.compare_zhadan(zhongdun_pokers, weidun_pokers) === -1;
                case 0:
                    return cutil.compare_tonghuashun(zhongdun_pokers, weidun_pokers) === -1;
                default:
                    cc.log('ERR[check_result_available]: 不应该执行到这里, zhongdun_idx = ' + zhongdun_idx.toString());
                    return false;
            }
        }
        return true;
    }
});
