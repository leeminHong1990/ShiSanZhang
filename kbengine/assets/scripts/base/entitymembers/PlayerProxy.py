# -*- coding: utf-8 -*-

import KBEngine
from KBEDebug import *
import weakref
import const
import Functor

class PlayerProxy(object):

	def __init__(self, avt_mb, owner, idx):
		# 玩家的mailbox
		self.mb = avt_mb
		# 所属的游戏房间
		self.owner = owner if isinstance(owner, weakref.ProxyType) else weakref.proxy(owner)
		# 玩家类型(默认 游客)
		self.character = const.CHARACTER_VISITOR
		# 游客参与游戏 标记位
		self.wait_flag = 0
		# 玩家的座位号
		self.idx = idx
		# 玩家的牌
		self.pokers = []
		# 玩家提交的牌
		self.uploaded_pokers = []
		# 玩家在线状态
		self.online = 1
		# 玩家的所有操作记录 (头道, 中道, 尾道)
		self.op_r = []
		# 玩家当局的得分
		self.score = 0
		# 玩家该房间总得分
		self.total_score = 0

	# 用于UI显示的信息
	@property
	def head_icon(self):
		DEBUG_MSG("room:{},curround:{} PlayerProxy get head_icon = {}".format(self.owner.roomId, self.owner.current_round, self.mb.head_icon))
		return self.mb.head_icon

	@property
	def nickname(self):
		return self.mb.name

	@property
	def sex(self):
		return self.mb.sex

	@property
	def userId(self):
		return self.mb.userId

	@property
	def uuid(self):
		return self.mb.uuid

	@property
	def ip(self):
		return self.mb.ip

	@property
	def location(self):
		return self.mb.location

	@property
	def lat(self):
		return self.mb.lat

	@property
	def lng(self):
		return self.mb.lng

	@property
	def state(self):
		return self.discard_state

	@property
	def is_creator(self):
		# 新增一个房主标记位 代开房 和 玩家座位号会发生改变
		if self.owner.room_type == const.NORMAL_ROOM:
			if self.idx == 0:
				return 1
		if self.owner.room_type == const.AGENT_ROOM:
			agent = self.owner.agent
			if agent and self.userId == agent.userId:
				return 1
		return 0

	@property
	def is_play(self):
		return self.character == const.CHARACTER_ADMIN or self.character == const.CHARACTER_PLAYER

	def add_score(self, score):
		self.score = score
		self.total_score += score

	def settlement(self):
		self.score += 0
		self.total_score += self.score

	def reset(self):
		""" 每局开始前重置 """
		self.pokers = []
		self.uploaded_pokers = []
		self.op_r = []
		self.score = 0

	def get_init_client_dict(self):
		return {
			'nickname': self.nickname,
			'head_icon': self.head_icon,
			'sex': self.sex,
			'idx': self.idx,
			'userId': self.userId,
			'uuid': self.uuid,
			'online': self.online,
			'ip': self.ip,
			'location': self.location,
			'lat': self.lat,
			'lng': self.lng,
			'is_creator': self.is_creator,
			'character': self.character,
			'wait_flag': self.wait_flag,
			'score': self.score,
			'total_score': self.total_score
		}

	def get_simple_client_dict(self):
		return {
			'nickname': self.nickname,
			'head_icon': self.head_icon,
			'sex': self.sex,
			'idx': self.idx,
			'userId': self.userId,
			'uuid': self.uuid,
			'score': self.total_score,
			'is_creator': self.is_creator,
		}

	def get_club_client_dict(self):
		return {
			'nickname': self.nickname,
			'idx': self.idx,
			'userId': self.userId,
			'score': self.total_score,
		}

	def get_round_client_dict(self):
		return {
			'idx'				: self.idx,
			'score'				: self.score,
			'total_score'		: self.total_score,
			'pokers'			: self.pokers,
			'uploaded_pokers'	: self.uploaded_pokers
		}

	def get_final_client_dict(self):
		return {
			'idx': self.idx,
			'score': self.total_score,
		}

	def get_reconnect_client_dict(self, userId):
		# 掉线重连时需要知道所有玩家打过的牌以及自己的手牌
		return {
			'idx'				: self.idx,
			'score'				: self.score,
			'total_score'		: self.total_score,
			'pokers'			: self.pokers if userId == self.userId else [],
			'uploaded_pokers'	: self.uploaded_pokers if userId == self.userId else [],
		}

	def get_round_result_info(self):
		# 记录信息后累计得分
		return {
			'userId': self.userId,
			'score': self.score,
		}

	def get_basic_user_info(self):
		return {
			'userId': self.userId,
			'nickname': self.nickname
		}

	def save_game_result(self, json_result):
		self.mb.saveGameResult(json_result)