var PlaybackGameRoomSceneUIManager = UIManagerBase.extend({
    onCreate: function () {
        var initUIClassNameList = ["PlaybackGameRoom", "GameRoomInfoUI", "SettlementUI", "ResultUI", "GamePlayerInfoUI", "HelpUI", "ShareUI", "PlaybackControlUI", "PlayBackUI"];

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }
    },

});