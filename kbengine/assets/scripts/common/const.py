# -*- coding: utf-8 -*-

HTTP_SERVER_IP = 'qxjoy.cn'
HTTP_DEBUG_SERVER_IP = '112.124.111.15'

GAME_NAME = "GXMJ"

DEBUG_JSON_NAME = "0001gxmj"

TABLE_GAME_RECORD_NAME = "cus_record"

SERVER_REFRESH_TIME = [3,0,0]


PLAYER_DISCARD_WAIT_TIME 							= 12 	# 玩家摸一张牌后, 打牌的等待时间45
ROOM_EXIST_TIME 									= 3600  # 每一局房间的时间，时间结束房间不销毁
DISMISS_ROOM_WAIT_TIME 								= 90	# 申请解散房间后等待的时间, 单位为秒

Latitude_Division = 1 # 维度在半球上的划分
Longitude_Division = 2 # 经度在半球上的划分

LOGIN_OPERATION = 3
GM_OPERATION = 4
CLIENT_OPERATION = 19

ONEDAY_TIME = 24 * 60 * 60

# 关服时GameWorld的状态
DESTROY_PROCESS_BEGIN = 1	# 开始关服处理
DESTROY_PROCESS_END = 2		# 关服处理完成
DESTROY_PROCESS_TIME = 30	# GameWorld关服处理超时时间, 超过此时间, 强制关服

TONGHUASHUN = 0
ZHADAN = 1
HULU = 2
TONGHUA = 3
SHUNZI = 4
SANTIAO = 5
LIANGDUI = 6
DUIZI = 7
DANZHANG = 8

##########################################

# 初始手牌数目
INIT_POKER_NUMBER = 13

#服务端 投票 状态机
OP_STATE_PASS 		= 0		#放弃操作
OP_STATE_WAIT 		= 1		#等待确认
OP_STATE_SURE 		= 2		#确认操作

#牌局状态
ROOM_WAITING 		= 0 	# 游戏未开始
ROOM_PLAYING 		= 1		# 游戏中
ROOM_TRANSITION 	= 2  	# 游戏过渡状态 从等待切换到开始的中间值

#房间玩家类型
CHARACTER_ADMIN 		= 1		# 管理员
CHARACTER_PLAYER 		= 2		# 普通玩家
CHARACTER_VISITOR 		= 3		# 游客

# 黑红梅方
HEI  = [ 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55]
HONG = [ 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54]
MEI  = [ 5,  9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53]
FANG = [ 4,  8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]

# 定义一些错误码
OP_ERROR_NOT_CURRENT    = 1 # 非当前控牌玩家
OP_ERROR_ILLEGAL        = 2 # 操作非法
OP_ERROR_TIMEOUT        = 3 # 操作超时
OP_ERROR_STATE			= 4 # 房间状态不正确
OP_ERROR_VOTE			= 5 # 房间正在投票中
##########################################

# 牌局战绩保存上限
MAX_HISTORY_RESULT = 10
# 代理开房上限
AGENT_ROOM_LIMIT = 10
# 代理开房完成记录保存上限
COMPLETE_ROOM_LIMIT = 10

# 创建房间失败错误码
CREATE_FAILED_NO_ENOUGH_CARDS = -1 # 房卡不足
CREATE_FAILED_ALREADY_IN_ROOM = -2 # 已经在房间中
CREATE_FAILED_AGENT_ROOM_LIMIT = -3 # 代开房达到上限
CREATE_FAILED_NET_SERVER_ERROR = -4  # 访问外部网络结果失败
CREATE_FAILED_PERMISSION_DENIED	= -5 # 不是代理, 不能代开房

CREATE_FAILED_OTHER = -9

# 进入房间失败错误码
ENTER_FAILED_ROOM_NO_EXIST				= -1  # 房间不存在
ENTER_FAILED_ROOM_FULL					= -2  # 房间已经满员
ENTER_FAILED_ROOM_DIAMOND_NOT_ENOUGH	= -3  # 进入AA制付费房间时，钻石不足
ENTER_FAILED_NOT_CLUB_MEMBER			= -4  # 不是茶楼成员
ENTER_FAILED_ALREADY_IN_ROOM 			= -5  # 已经在房间中
ENTER_FAILED_ROOM_DESTROYED 			= -9  # 房间已经销毁
QUIT_FAILED_ROOM_STARTED				= -10 # 房间已经开始游戏

###########################################
# 签到相关 #
SIGN_IN_ACHIEVEMENT_DAY = 10 # 签到几天得奖励
SIGN_IN_ACHIEVEMENT_NUM = 1  # 奖励几张房卡
###########################################

BEGIN_ANIMATION_TIME = 5


MAX_RECORD_CACHE = 5000  # 最大缓存记录条数
MAX_RECORD_NONE_CACHE = 10000  # 最大缓存空记录条数
CLEAN_RECORD_CACHE_INTERVAL = 60 * 60 * 3  # 定时清理回放缓存时间间隔 单位秒
CLEAN_RECORD_CACHE_IDLE_INTERVAL = 60 * 60 * 3  # 清理回放超过一定时间间隔的数据 单位秒
ROOM_TTL = 60 * 60 * 3  # 房间的生存时间, 如果超过时间还没有人在打牌, 则销毁房间

QUERY_RECORD_NO_EXIST = 1100

####################################  房间开房的一些模式 ####################################
# 局数
ROUND = (8, 16, 24)
# 人数
PLAYER_NUM = (2, 3, 4)
# 马牌
LUCKY_POKER = (0, 19, 39, 55)
# 是否手动准备开局
HAND_PREPARE = 0	# 手动准备
AUTO_PREPARE = 1	# 自动准备
PREPARE_MODE = (AUTO_PREPARE, HAND_PREPARE)
# 谁开的房
NORMAL_ROOM = 0	# 普通开房
AGENT_ROOM = 1	# 代理开房
CLUB_ROOM = 2	# 茶楼开房
OPEN_ROOM_MODE = (NORMAL_ROOM, AGENT_ROOM, CLUB_ROOM)
# 支付模式
NORMAL_PAY_MODE = 0 # 房主支付
AA_PAY_MODE = 1		# AA支付
AGENT_PAY_MODE = 2	# 代理开房, 代理支付
CLUB_PAY_MODE = 3	# 茶楼开房, 茶楼老板支付
PAY_MODE = (NORMAL_PAY_MODE, AA_PAY_MODE, AGENT_PAY_MODE, CLUB_PAY_MODE)

###########################################################################################
# 加入茶楼的限制
CLUB_NUM_LIMIT = 10
# 茶楼中的桌子数
CLUB_TABLE_NUM = 8
# 茶楼名字长度限制
CLUB_NAME_LENGTH = 8
# 成员备注长度限制
MEMBER_NOTES_LENGTH = 11
# 茶楼公告长度限制
CLUB_NOTICE_LENGTH = 18
# 茶楼战绩保存期限
CLUB_TABLE_RESULT_TTL = 3 * 24 * 3600
# 茶楼成员上限
CLUB_MEMBER_LIMIT = 500

# 茶楼相关错误码
CLUB_OP_ERR_PERMISSION_DENY = -1 # 权限不足
CLUB_OP_ERR_INVALID_OP		= -2 # 非法操作
CLUB_OP_ERR_NUM_LIMIT		= -3 # 茶楼数量限制
CLUB_OP_ERR_WRONG_ARGS		= -4 # 参数错误
CLUB_OP_ERR_CLUB_NOT_EXIST	= -5 # 茶楼不存在

# 茶楼相关操作码
CLUB_OP_AGREE_IN		= 1 # 同意玩家加入茶楼
CLUB_OP_REFUSE_IN		= 2 # 拒绝玩家加入茶楼
CLUB_OP_INVITE_IN		= 3 # 邀请玩家茶楼
CLUB_OP_KICK_OUT		= 4 # 将玩家踢出茶楼
CLUB_OP_APPLY_IN		= 5 # 申请加入茶楼
CLUB_OP_APPLY_OUT		= 6 # 离开茶楼
CLUB_OP_SET_NAME		= 7 # 茶楼改名
CLUB_OP_GET_MEMBERS		= 8 # 获取成员列表
CLUB_OP_GET_APPLICANTS	= 9 # 获取申请者列表
CLUB_OP_SET_NOTICE		= 10# 设置茶楼公告
CLUB_OP_SET_MEMBER_NOTES= 11# 设置成员备注
CLUB_OP_SIT_DOWN		= 12# 选择一张桌子坐下
CLUB_OP_GET_TABLE_DETAIL= 13# 获取桌子详情
CLUB_OP_GET_RECORDS		= 14# 获取俱乐部战绩

###########################################################################################
RED_ENVELOP_THRESHOLD = 6	# 符合生成红包, 成为有效玩家需要完成的整圈数

# 用户信息最大缓存条目数量
USER_INFO_CACHE_SIZE = 1024