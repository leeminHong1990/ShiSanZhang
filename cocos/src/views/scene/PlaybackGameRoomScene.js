var PlaybackGameRoomScene = cc.Scene.extend({
    className: "PlaybackGameRoomScene",

    onEnter: function () {
        this._super();

        this.loadUIManager();
        cutil.unlock_ui();

        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }
    },

    loadUIManager: function () {
        var curUIManager = new PlaybackGameRoomSceneUIManager();
        curUIManager.setAnchorPoint(0, 0);
        curUIManager.setPosition(0, 0);
        this.addChild(curUIManager, const_val.curUIMgrZOrder);
        h1global.curUIMgr = curUIManager;
    },
});