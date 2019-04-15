var GameRoomSceneUIManager = UIManagerBase.extend({
    onCreate: function () {

        var initUIClassNameList = ["GameRoomUI", "GameRoomPrepareUI", "GameRoomPokerChooseUI", "AudioRecordUI", "SettlementUI",
            "ResultUI", "HelpUI", "GameConfigUI", "GamePlayerInfoUI", "CommunicateUI", "ShareUI", "ApplyCloseUI", "ConfigUI",
            "GameRoomInfoUI"];

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }
    },
});