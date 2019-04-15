// cc.loader.loadJs("src/views/uimanager/LoginSceneUIManager.js")

var GameRoomScene = cc.Scene.extend({
    className:"GameRoomScene",
    onEnter:function () {
        this._super();
        this.loadUIManager();
        cutil.unlock_ui();

        if(cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.stopMusic();
        }
        if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.playMusic("res/sound/music/game_bgm.mp3", true);
        }
    },

    loadUIManager:function() {
    	var curUIManager = new GameRoomSceneUIManager();
    	curUIManager.setAnchorPoint(0, 0);
    	curUIManager.setPosition(0, 0);
    	this.addChild(curUIManager, const_val.curUIMgrZOrder);
        h1global.curUIMgr = curUIManager;

        if(h1global.curUIMgr.gameroom_ui){
            h1global.curUIMgr.gameroom_ui.show(function(){
                let player = h1global.player();
                if (player && player.startActions["GameRoomUI"]){ // 发牌动画
                    player.startActions["GameRoomUI"]();
                    player.startActions["GameRoomUI"] = undefined;
                } else if (player && player.curGameRoom && player.curGameRoom.room_state === const_val.ROOM_PLAYING){ // 游戏已经开始 并且不是 游客
                    var character = player.curGameRoom.playerInfoList[player.serverSitNum]["character"]
                    if(character === const_val.CHARACTER_ADMIN || character === const_val.CHARACTER_PLAYER){
                        h1global.curUIMgr.gameroom_ui.start();
                    } else {
                        // 游客也需要增加 准备界面
                        h1global.curUIMgr.gameroomprepare_ui.show();
                    }
                } else { // 游戏尚未开始 或者 游戏结束，下一局开始准备
                    h1global.curUIMgr.gameroomprepare_ui.show();
                }
            });
        }

        if (!onhookMgr) { 
            onhookMgr = new OnHookManager();
        }

        onhookMgr.init(this);
        this.scheduleUpdateWithPriority(0);

        if(onhookMgr.applyCloseLeftTime > 0){
            var player = h1global.player();
            // 游客无法 申请 或者投票 解散房间
            var character = player.curGameRoom.playerInfoList[player.serverSitNum]["character"];
            if(player && player.curGameRoom &&  (character === const_val.CHARACTER_ADMIN || character === const_val.CHARACTER_PLAYER)){
                curUIManager.applyclose_ui.show_by_sitnum(h1global.player().curGameRoom.applyCloseFrom);
            }
        }
    },

    update:function( delta ){
        onhookMgr.update(delta);
    }
});