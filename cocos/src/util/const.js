"use strict";

var const_val = function(){}

// 为了便于UI管理，globalUIMgr的ZOrder一定要大于curUIMgrZOrder
const_val.globalUIMgrZOrder = 90000;
const_val.curUIMgrZOrder = 10000;

const_val.GameRoomBgZOrder = -100;
const_val.GameRoomZOrder = -80;
const_val.GameConfigZOrder = 100;
const_val.SettlementZOrder = 120;
const_val.PlayerInfoZOrder = 100;
const_val.CommunicateZOrder = 100;

const_val.GameHallZOrder = -10;
const_val.GameHallBroadcastZOrder = -5;

const_val.MAX_LAYER_NUM = 99999999;

// const_val strings
const_val.sClientDatas = "kbengine_js_demo"

const_val.OP_PASS             = 8 		//0b0001000 过
const_val.OP_DRAW             = 16 		//0b0010000 摸
const_val.OP_DISCARD          = 24 		//0b0011000 打
const_val.OP_CHOW             = 32 		//0b0100000 吃
const_val.OP_PONG             = 40 		//0b0101000 碰
const_val.OP_KONG_WREATH      = 48 		//0b0110000 杠花
const_val.OP_EXPOSED_KONG     = 56 		//0b0111000 明杠
const_val.OP_CONTINUE_KONG    = 57 		//0b0111001 碰后接杠
const_val.OP_CONCEALED_KONG   = 58 		//0b0111010 暗杠
// const_val.OP_POST_KONG        = 64 		//0b1000000 放杠
// const_val.OP_GET_KONG         = 72		//0b1001000 接杠
const_val.OP_CUT              = 80		//0b1010000 杠后切牌
const_val.OP_READY            = 88 		//0b1011000 听牌
const_val.OP_DRAW_END         = 96		//0b1100000 流局
const_val.OP_DRAW_WIN         = 104		//0b1101000 自摸胡
const_val.OP_KONG_WIN         = 105		//0b1101001 抢杠胡
const_val.OP_WREATH_WIN       = 106		//0b1101010 杠花胡
const_val.OP_GIVE_WIN		  = 107		//0b1101011 放炮胡

const_val.SHOW_CHOW = 4
const_val.SHOW_PONG = 5
const_val.SHOW_KONG = 7
const_val.SHOW_WIN 	= 13
const_val.SHOW_PASS = 1
const_val.SHOW_OP_LIST = [const_val.SHOW_CHOW, const_val.SHOW_PONG, const_val.SHOW_KONG, const_val.SHOW_WIN, const_val.SHOW_PASS] // 吃 碰 杠 胡 过

const_val.SHOW_DO_OP 			= 0 	//	doOperation
const_val.SHOW_CONFIRM_OP 		= 1 	// 	confirmOperation

const_val.OP_LIST = [
	const_val.OP_PASS,
	const_val.OP_DRAW,
	const_val.OP_DISCARD,
	const_val.OP_CHOW,
	const_val.OP_PONG,
	const_val.OP_KONG_WREATH,
	const_val.OP_EXPOSED_KONG,
	const_val.OP_CONTINUE_KONG,
	const_val.OP_CONCEALED_KONG,
	// const_val.OP_POST_KONG,
	// const_val.OP_GET_KONG,
	const_val.OP_CUT,
	const_val.OP_READY,
	const_val.OP_DRAW_END,
	const_val.OP_DRAW_WIN,
	const_val.OP_KONG_WIN,
	const_val.OP_WREATH_WIN,
	const_val.OP_GIVE_WIN,
]

// const_val.OP2STR = {
// 	const_val.OP_PASS             	: 'pass', 				// 过
// 	const_val.OP_DRAW             	: 'draw', 				// 摸
// 	const_val.OP_DISCARD          	: 'discard', 			// 打
// 	const_val.OP_CHOW             	: 'chow', 				// 吃
// 	const_val.OP_PONG             	: 'pong', 				// 碰
// 	const_val.OP_KONG_WREATH     	: 'kong_wreath', 		// 杠花
// 	const_val.OP_EXPOSED_KONG     	: 'exposed_kong', 		// 明杠(直杠)
// 	const_val.OP_CONTINUE_KONG    	: 'continue_kong',		// 碰后接杠
// 	const_val.OP_CONCEALED_KONG   	: 'concealed_kong', 	// 暗杠
//	// const_val.OP_POST_KONG       : 'post_kong', 			// 放杠
//	// const_val.OP_GET_KONG        : 'get_kong',			// 接杠
// 	const_val.OP_CUT  	        	: 'cut',				// 杠后切牌
// 	const_val.OP_READY            	: 'ready', 				// 听牌
// 	const_val.OP_DRAW_END         	: 'draw_end',			// 流局
// 	const_val.OP_DRAW_WIN         	: 'draw_win',			// 自摸胡
// 	const_val.OP_KONG_WIN         	: 'kong_win',			// 抢杠胡
// 	const_val.OP_WREATH_WIN  		: 'wreath_win',			// 杠花胡
// 	const_val.OP_GIVE_WIN  			: 'give_win',			// 放炮胡
// }

// 服务端 投票状态机，客户端暂时用不到
const_val.OP_STATE_PASS 		= 0 	//放弃操作
const_val.OP_STATE_WAIT 		= 1 	//等待确认
const_val.OP_STATE_SURE 		= 2 	//确认操作

// 玩家 出牌 状态机
const_val.DISCARD_FREE 			= 0 	//玩家自由出牌
const_val.DISCARD_FORCE 		= 1 	//强制出牌（摸到什么出什么，不碰不吃，直到胡为止）

// 牌局状态
const_val.ROOM_WAITING 			= 0		// 牌局未开始
const_val.ROOM_PLAYING 			= 1		// 牌局已开始

//房间玩家类型
const_val.CHARACTER_ADMIN 			= 1		// 管理员
const_val.CHARACTER_PLAYER 			= 2		// 游戏玩家
const_val.CHARACTER_VISITOR 		= 3		// 游客

const_val.MESSAGE_LIST = [
	"唉,一手烂牌臭到底",
	"不怕神一样的对手,就怕猪一样的队友",
	"和你合作真是太愉快啦",
	"投降输一半,速度投降吧",
	"快点吧,我等的花儿都谢了",
	"你的牌打得也太好了",
	"大清早的,鸡都还没叫，慌什么嘛",
	"吐了个槽的,整个一个杯具啊",
	"不要吵了,有什么好吵的,专心玩牌吧"
]

const_val.SIGNIN_MAX = 10

const_val.GAME_RECORD_MAX = 10
const_val.DISMISS_ROOM_WAIT_TIME = 90 // 申请解散房间后等待的时间, 单位为秒

const_val.BEGIN_ANIMATION_TIME = 0


const_val.NOT_DISPLAY_CANWIN_PANEL = 0;		//传入0时不显示canwin_panel
const_val.WINTIPS_BTN_DISPLAY = 10;		//传入10时代表此时wintips_btn显示


const_val.PLAYER_TOUCH_SELF_STATE = 0;
const_val.PLAYER_TOUCH_FORCE_STATE = 1;
const_val.PLAYER_TOUCH_OTHER_STATE = 2;

const_val.GAME_ROOM_GAME_MODE = 0
const_val.GAME_ROOM_PLAYBACK_MODE = 1

const_val.ANIM_LIST = [3, 6, 4, 6, 5, 4, 4, 2, 2];	//表情的帧数
const_val.EXPRESSION_ANIM_LIST = ["flower", "kiss", "pie", "bomb"];	//魔法表情
const_val.EXPRESSION_ANIMNUM_LIST = [32, 23, 21, 16];	//魔法表情的帧数


const_val.FAKE_COUNTDOWN = 15; //假的倒计时开关
const_val.FAKE_BEGIN_ANIMATION_TIME = 5;	//假的倒计时开局动画延迟


const_val.tonghuashun = 'tonghuashun';
const_val.zhadan = 'zhadan';
const_val.hulu = 'hulu';
const_val.tonghua = 'tonghua';
const_val.shunzi = 'shunzi';
const_val.santiao = 'santiao';
const_val.liangdui = 'liangdui';
const_val.duizi = 'duizi';
const_val.danzhang = 'danzhang';

const_val.paixing_imgs = {
    'tonghuashun': "res/ui/Poker/paixing_tonghuashun.png",
    'zhadan': "res/ui/Poker/paixing_zhadan.png",
    'hulu': "res/ui/Poker/paixing_hulu.png",
    'tonghua': "res/ui/Poker/paixing_tonghua.png",
    'shunzi': "res/ui/Poker/paixing_shunzi.png",
    'santiao': "res/ui/Poker/paixing_santiao.png",
    'liangdui': "res/ui/Poker/paixing_liangdui.png",
    'duizi': "res/ui/Poker/paixing_duizi.png",
    'danzhang': "res/ui/Poker/paixing_danzhang.png"
};
const_val.paixing_idx = {
    "tonghuashun": 0,
    "zhadan": 1,
    "hulu": 2,
    "tonghua": 3,
    "shunzi": 4,
    "santiao": 5,
    "liangdui": 6,
    "duizi": 7,
    "danzhang": 8
};


//####################################  房间的一些错误码  #####################################
// 进入房间失败错误码
const_val.ENTER_FAILED_ROOM_NO_EXIST				= -1; // 房间不存在
const_val.ENTER_FAILED_ROOM_FULL					= -2; // 房间已经满员
const_val.ENTER_FAILED_ROOM_DIAMOND_NOT_ENOUGH		= -3; // 进入AA制付费房间时，代币不足
const_val.ENTER_FAILED_NOT_CLUB_MEMBER				= -4; // 不是茶楼成员
const_val.ENTER_FAILED_ROOM_DESTROYED				= -9; // 房间已经销毁
/* ####################################  房间开房的一些模式 ################################## */

// 规则
const_val.NORMAL_GAME_MODE = 0;	// 普通模式
const_val.DOUBLE_GAME_MODE = 1;	// 东带庄(庄家翻倍)
const_val.GAME_MODE = [const_val.NORMAL_GAME_MODE, const_val.DOUBLE_GAME_MODE];
// 局数
const_val.ROUND = [8, 16, 24];
// 封顶
const_val.MAX_LOSE = [9999, 10, 20, 30];
// 摸宝数量
const_val.TREASURE_NUM = [0, 1, 2];
// 出牌时限
const_val.DISCARD_SECONDS = [0, 10, 15, 20];
//# 是否手动准备开局
const_val.HAND_PREPARE = 0;	//# 手动准备
const_val.AUTO_PREPARE = 1;	//# 自动准备
const_val.PREPARE_MODE = [const_val.AUTO_PREPARE, const_val.HAND_PREPARE];
//# 谁开的房
const_val.NORMAL_ROOM = 0;	//# 普通开房
const_val.AGENT_ROOM = 1;	//# 代理开房
const_val.CLUB_ROOM = 2;    //# 茶楼开房
const_val.OPEN_ROOM_MODE = [const_val.NORMAL_ROOM, const_val.AGENT_ROOM, const_val.CLUB_ROOM];
//# 支付模式
const_val.NORMAL_PAY_MODE = 0; //# 正常房间, 房主支付
const_val.AA_PAY_MODE = 1;		//# 开房, AA支付
const_val.AGENT_PAY_MODE = 2;	//# 代理开房, 代理支付
const_val.CLUB_PAY_MODE = 3;	//# 茶楼开房, 老板支付
const_val.PAY_MODE = [const_val.NORMAL_PAY_MODE, const_val.AA_PAY_MODE, const_val.AGENT_PAY_MODE, const_val.CLUB_PAY_MODE];

// ################################### 茶楼相关 ########################################
//茶楼相关字符长度
const_val.CLUB_MAX_MEM_NUM 	= 500; 		// 茶楼人数限制
const_val.CLUB_MAX_MARK_LEN = 11; 		// 玩家备注最大长度
const_val.CLUB_NAME_LEN 	= 8;		// 茶楼名字最大长度
const_val.CLUB_NUM_LIMIT 	= 10;		// 加入茶楼最大数量
const_val.CLUB_NOTICE_LEN 	= 18;		// 公告最大长度
// 茶楼相关错误码
const_val.CLUB_OP_ERR_PERMISSION_DENY	= -1; // 权限不足
const_val.CLUB_OP_ERR_INVALID_OP		= -2; // 非法操作
const_val.CLUB_OP_ERR_NUM_LIMIT			= -3; // 茶楼数量限制
const_val.CLUB_OP_ERR_WRONG_ARGS		= -4; // 参数错误
const_val.CLUB_OP_ERR_CLUB_NOT_EXIST	= -5; // 茶楼不存在

// 茶楼相关操作码
const_val.CLUB_OP_AGREE_IN			= 1; // 同意玩家加入茶楼
const_val.CLUB_OP_REFUSE_IN			= 2; // 拒绝玩家加入茶楼
const_val.CLUB_OP_INVITE_IN			= 3; // 邀请玩家茶楼
const_val.CLUB_OP_KICK_OUT			= 4; // 将玩家踢出茶楼
const_val.CLUB_OP_APPLY_IN			= 5; // 申请加入茶楼
const_val.CLUB_OP_APPLY_OUT			= 6; // 离开茶楼
const_val.CLUB_OP_SET_NAME			= 7; // 茶楼改名
const_val.CLUB_OP_GET_MEMBERS		= 8; // 获取成员列表
const_val.CLUB_OP_GET_APPLICANTS	= 9; // 获取申请者列表
const_val.CLUB_OP_SET_NOTICE		= 10;// 设置茶楼公告
const_val.CLUB_OP_SET_MEMBER_NOTES	= 11;// 设置成员备注
const_val.CLUB_OP_SIT_DOWN			= 12;// 选择一张桌子坐下
const_val.CLUB_OP_GET_TABLE_DETAIL	= 13;// 获取桌子详情
const_val.CLUB_OP_GET_RECORDS		= 14;// 获取桌子详情

// activity
const_val.SHOW_ACTIVITY_INTERVAL = 3 * 60 * 60 * 1000;
