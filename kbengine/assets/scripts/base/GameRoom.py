# -*- coding: utf-8 -*-

import KBEngine
from KBEDebug import *
import time
from datetime import datetime
from interfaces.GameObject import GameObject
from entitymembers.iRoomRules import iRoomRules
from entitymembers.PlayerProxy import PlayerProxy
from BaseEntity import BaseEntity
import json
import const
import switch
import utility
import copy
from Functor import Functor


class GameRoom(BaseEntity, GameObject, iRoomRules):
	"""
	这是一个游戏房间/桌子类
	该类处理维护一个房间中的实际游戏， 例如：斗地主、麻将等
	该房间中记录了房间里所有玩家的mailbox，通过mailbox我们可以将信息推送到他们的客户端。
	"""

	def __init__(self):
		BaseEntity.__init__(self)
		GameObject.__init__(self)
		iRoomRules.__init__(self)

		self.agent = None
		self.roomId = utility.gen_room_id()

		# 状态0：未开始游戏， 1：某一局游戏中
		self.state = const.ROOM_WAITING

		# 存放该房间内的玩家mailbox
		self.players_dict = {}
		self.players_list = [None] * self.player_num
		self.origin_players_list = [None] * self.player_num

		# 对当前打出的牌可以进行操作的玩家的index, 服务端会限时等待他的操作
		# 房间基础轮询timer
		self._poll_timer = None
		# 玩家操作限时timer
		self._op_timer = None
		# 玩家操作限时timer 启动时间
		self._op_timer_timestamp = 0
		# 一局游戏结束后, 玩家准备界面等待玩家确认timer
		self._next_game_timer = None

		self.current_round = 0

		# 房间开局所有操作的记录(aid, src, des, tile)
		self.op_record = []

		# 房间开局操作的记录对应的记录id
		self.record_id = -1
		# 确认继续的玩家
		self.confirm_next_idx = []
		# 解散房间操作的发起者
		self.dismiss_room_from = -1
		# 解散房间操作开始的时间戳
		self.dismiss_room_ts = 0
		# 解散房间操作投票状态
		self.dismiss_room_state_list = [0] * self.player_num
		self.dismiss_timer = None
		# 房间创建时间
		self.roomOpenTime = time.time()

		self.wait_op_info_list = []
		# 放炮胡等延时操作时的标志位，例如主要在延时中出现解散房间操作时需要拒绝操作
		self.wait_force_delay_win = False
		# 牌局记录
		self.game_result = {}
		# 房间所属的茶楼桌子, 仅茶楼中存在
		self.club_table = None
		# 增加房间销毁定时器
		self.timeout_timer = self.add_timer(const.ROOM_TTL, self.timeoutDestroy)

		#***********************游戏相关******************************#
		# 全磊打
		self.quanleida_dict = {}

	def _reset(self):
		self.state = const.ROOM_WAITING
		DEBUG_MSG("reset state:{}".format(self.state))
		self.agent = None
		self.players_list = [None] * self.player_num
		self._poll_timer = None
		self._op_timer = None
		self._op_timer_timestamp = 0
		self._next_game_timer = None
		self.current_round = 0
		self.confirm_next_idx = []
		self.dismiss_timer = None
		self.dismiss_room_ts = 0
		self.dismiss_room_state_list = [0] * self.player_num
		self.wait_op_info_list = []
		KBEngine.globalData["GameWorld"].delRoom(self)
		# 茶楼座位信息变更
		if self.room_type == const.CLUB_ROOM and self.club_table:
			self.club_table.seatInfoChanged()
			self.club_table.room = None
		self.destroySelf()

	@property
	def prefixLogStr(self):
		""" only on Log """
		return 'room:{},curround:{} '.format(self.roomId, self.current_round)

	@property
	def isFull(self):
		count = sum([1 for i in self.players_list if i is not None])
		return count == self.player_num

	@property
	def isEmpty(self):
		count = sum([1 for i in self.players_list if i is not None])
		return count == 0 and self.room_type != const.AGENT_ROOM

	@property
	def club(self):
		try:
			if self.club_table:
				return self.club_table.club
		except:
			# 引用代理的对象可能已经被destroy, 比如解散茶楼时
			pass
		return None

	def getSit(self):
		for i, j in enumerate(self.players_list):
			if j is None:
				return i
		return None

	def sendEmotion(self, avt_mb, eid):
		""" 发表情 """
		# DEBUG_MSG("Room.Player[%s] sendEmotion: %s" % (self.roomId, eid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvEmotion(idx, eid)

	def sendMsg(self, avt_mb, mid, msg):
		""" 发消息 """
		# DEBUG_MSG("Room.Player[%s] sendMsg: %s" % (self.roomId, mid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvMsg(idx, mid, msg)

	def sendExpression(self, avt_mb, fromIdx, toIdx, eid):
		""" 发魔法表情 """
		# DEBUG_MSG("Room.Player[%s] sendEmotion: %s" % (self.roomId, eid))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb == p.mb:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and i != idx:
				p.mb.recvExpression(fromIdx, toIdx, eid)

	def sendVoice(self, avt_mb, url):
		# DEBUG_MSG("Room.Player[%s] sendVoice" % (self.roomId))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb.userId == p.userId:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and p.mb:
				p.mb.recvVoice(idx, url)

	def sendAppVoice(self, avt_mb, url, time):
		# DEBUG_MSG("Room.Player[%s] sendVoice" % (self.roomId))
		idx = None
		for i, p in enumerate(self.players_list):
			if p and avt_mb.userId == p.userId:
				idx = i
				break
		if idx is None:
			return

		for i, p in enumerate(self.players_list):
			if p and p.mb and i != idx:
				p.mb.recvAppVoice(idx, url, time)

	def apply_dismiss_room(self, avt_mb):
		""" 游戏开始后玩家申请解散房间 """
		if avt_mb.userId not in self.players_dict:
			return
		if self.players_dict[avt_mb.userId].character == const.CHARACTER_VISITOR:
			avt_mb.showTip("游客不能发起解散投票")
			return
		if self.dismiss_timer is not None:
			self.vote_dismiss_room(avt_mb, 1)
			return
		self.dismiss_room_ts = time.time()
		src = None
		for i, p in enumerate(self.players_list):
			if p.userId == avt_mb.userId:
				src = p
				break

		# 申请解散房间的人默认同意
		self.dismiss_room_from = src.idx
		self.dismiss_room_state_list[src.idx] = 1

		def dismiss_callback():
			self.saveRoomResult()
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()

		self.dismiss_timer = self.add_timer(const.DISMISS_ROOM_WAIT_TIME, dismiss_callback)
		for p in self.players_list:
			if p and p.mb and p.userId != avt_mb.userId and p.is_play:
				p.mb.req_dismiss_room(src.idx)

	def vote_dismiss_room(self, avt_mb, vote):
		""" 某位玩家对申请解散房间的投票 """
		if self.wait_force_delay_win:
			return
		src = None
		for p in self.players_list:
			if p and p.userId == avt_mb.userId:
				src = p
				break
		# 有投票权的人数
		vote_num = sum([1 if p is not None and p.is_play else 0 for p in self.players_list])
		self.dismiss_room_state_list[src.idx] = vote
		for p in self.players_list:
			if p and p.mb:
				p.mb.vote_dismiss_result(src.idx, vote)

		yes = self.dismiss_room_state_list.count(1)
		no = self.dismiss_room_state_list.count(2)
		if yes >= 3 or vote_num == yes:
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None

			self.saveRoomResult()
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()

		if no >= 2 or (vote_num < self.player_num and no >= 1):
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None
			self.dismiss_room_from = -1
			self.dismiss_room_ts = 0
			self.dismiss_room_state_list = [0, 0, 0, 0]

	def notify_player_online_status(self, userId, status):
		src = -1
		for idx, p in enumerate(self.players_list):
			if p and p.userId == userId:
				p.online = status
				src = idx
				break

		if src == -1:
			return

		for idx, p in enumerate(self.players_list):
			if p and p.mb and p.userId != userId:
				p.mb.notifyPlayerOnlineStatus(src, status)

	def reqEnterRoom(self, avt_mb, first=False):
		"""
		defined.
		客户端调用该接口请求进入房间/桌子
		"""
		if self.isFull:
			avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
			return
		if self.room_type == const.CLUB_ROOM:
			if self.club and not self.club.isMember(avt_mb.userId):
				avt_mb.enterRoomFailed(const.ENTER_FAILED_NOT_CLUB_MEMBER)
				return

		def _check_user_info(content):
			if content is None:
				DEBUG_MSG("room:{0},curround:{1} userId:{2} enterRoomFailed callback error: content is None".format(self.roomId, self.current_round, avt_mb.userId))
				if not first:
					avt_mb.enterRoomFailed(const.CREATE_FAILED_NET_SERVER_ERROR)
				return False
			try:
				data = json.loads(content)
				card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)
				if card_cost > data["card"]:
					avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_DIAMOND_NOT_ENOUGH)
					return False
			except:
				err, msg, stack = sys.exc_info()
				DEBUG_MSG("room:{0},curround:{1} _check_user_info callback error:{2} , exc_info: {3} ,{4}".format(self.roomId, self.current_round, content, err, msg))
				avt_mb.enterRoomFailed(const.CREATE_FAILED_OTHER)
				return False
			return True

		def callback():
			if self.isDestroyed:
				avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_DESTROYED)
				return
			# AA支付的情况下, 可能多个玩家同时走到这里
			if self.isFull:
				avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
				return
			for i, p in enumerate(self.players_list):
				if p and p.mb and p.mb.userId == avt_mb.userId:
					p.mb = avt_mb
					avt_mb.enterRoomSucceed(self, i)
					return

			DEBUG_MSG("room:{0},curround:{1} userId:{2} reqEnterRoom".format(self.roomId, self.current_round, avt_mb.userId))
			idx = self.getSit()
			# if idx is None:
			# 	avt_mb.enterRoomFailed(const.ENTER_FAILED_ROOM_FULL)
			# 	return

			n_player = PlayerProxy(avt_mb, self, idx)
			self.players_dict[avt_mb.userId] = n_player
			self.players_list[idx] = n_player

			# 茶楼座位信息变更
			if self.club_table:
				self.club_table.seatInfoChanged()

			if self.state == const.ROOM_WAITING and self.current_round <= 0: # 游戏第一局开始前 进入

				if not first:
					n_player.character = const.CHARACTER_PLAYER
					self.broadcastEnterRoom(idx)
				else:
					n_player.character = const.CHARACTER_ADMIN
					avt_mb.createRoomSucceed(self)

				# 确认准备,不需要手动准备
				if self.hand_prepare == const.AUTO_PREPARE and not first:
					self.prepare(avt_mb)
				self.ready_after_prepare()
			else:
				# 游戏第一局开始后 进入
				# 确认准备, 必须手动准备加入 不然一直是游客模式
				if not first:
					self.broadcastEnterRoom(idx)
				else:
					avt_mb.createRoomSucceed(self)

		if switch.DEBUG_BASE:
			callback()
		else:
			if first or self.pay_mode != const.AA_PAY_MODE:
				callback()
			else:
				def _user_info_callback(content):
					if _check_user_info(content):
						callback()

				utility.get_user_info(avt_mb.accountName, _user_info_callback)

	def client_prepare(self, avt_mb):
		if avt_mb.userId not in self.players_dict:
			return
		# 游客不能准备游戏 只能 joinGame
		if self.players_dict[avt_mb.userId].character == const.CHARACTER_VISITOR:
			return
		# 第一局游戏 admin 必须 等其他玩家所有玩家 准备完成 才能准备
		if self.current_round <= 0 and self.players_dict[avt_mb.userId].character == const.CHARACTER_ADMIN:
			sum_player_num = sum([1 if p is not None and p.is_play else 0 for p in self.players_list])
			if len(self.confirm_next_idx) + 1 < sum_player_num or sum_player_num <= 1:
				avt_mb.showTip("请等待其他玩家准备")
				return
		self.prepare(avt_mb)
		self.ready_after_prepare()

	def prepare(self, avt_mb):
		""" 第一局/一局结束后 玩家准备 """
		if self.state == const.ROOM_PLAYING or self.state == const.ROOM_TRANSITION:
			return

		idx = -1
		for i, p in enumerate(self.players_list):
			if p and p.userId == avt_mb.userId:
				idx = i
				break

		if idx not in self.confirm_next_idx:
			self.confirm_next_idx.append(idx)
			for p in self.players_list:
				if p and (p.idx != idx or self.current_round <= 0): # 游戏未开始还是要通知自己的 万一是 自动准备
					p.mb.readyForNextRound(idx)

	def ready_after_prepare(self):
		sum_player_num = sum([1 if p is not None and p.is_play else 0 for p in self.players_list])
		if len(self.confirm_next_idx) >= sum_player_num >= 2 and self.state == const.ROOM_WAITING:
			self.origin_players_list = self.players_list[:]
			self.pay2StartGame()

	def joinGame(self, avt_mb):
		if self.pay_mode == const.AA_PAY_MODE:
			avt_mb.showTip("AA支付房间不允许中途加入游戏")
			return
		if avt_mb.userId in self.players_dict:
			player = self.players_dict[avt_mb.userId]
			idx = player.idx
			if player.wait_flag == 0 and player.character == const.CHARACTER_VISITOR:
				player.wait_flag = 1
				for p in self.players_list:
					if p and p.idx != idx:
						p.mb.readyForGame(idx)

	def reqReconnect(self, avt_mb):
		if avt_mb.userId not in self.players_dict.keys():
			return
		# 如果进来房间后牌局已经开始, 就要传所有信息
		# 如果还没开始, 跟加入房间没有区别
		player = self.players_dict[avt_mb.userId]
		player.mb = avt_mb
		player.online = 1
		if self.state == const.ROOM_PLAYING or 0 < self.current_round <= self.game_round:
			if self.state == const.ROOM_WAITING and player.is_play:
				# 重连回来直接准备
				self.client_prepare(avt_mb)
			rec_room_info = self.get_reconnect_room_dict(player.mb.userId)
			player.mb.handle_reconnect(rec_room_info)
		else:
			sit = 0
			for idx, p in enumerate(self.players_list):
				if p and p.mb:
					if p.mb.userId == avt_mb.userId:
						sit = idx
						break
			avt_mb.enterRoomSucceed(self, sit)

	def reqLeaveRoom(self, avt_mb):
		"""
		defined.
		客户端调用该接口请求离开房间/桌子
		"""
		if avt_mb.userId in self.players_dict.keys():
			n_player = self.players_dict[avt_mb.userId]
			idx = n_player.idx
			if n_player.is_play and 0 < self.current_round <= self.game_round and self.state != const.ROOM_WAITING:
				avt_mb.quitRoomFailed(const.QUIT_FAILED_ROOM_STARTED)
				return

			if idx == 0 and self.room_type == const.NORMAL_ROOM:
				# 房主离开房间, 则解散房间
				self.give_up_record_game()
				# self.dropRoom()
				self.do_drop_room()
			else:
				character = n_player.character
				n_player.mb.quitRoomSucceed()
				self.players_list[idx] = None
				del self.players_dict[avt_mb.userId]
				if idx in self.confirm_next_idx:
					self.confirm_next_idx.remove(idx)
				# 通知其它玩家该玩家退出房间
				for i, p in enumerate(self.players_list):
					if i != idx and p and p.mb:
						p.mb.othersQuitRoom(idx)
				# 管理员退房
				if character == const.CHARACTER_ADMIN and any(p is not None and p.is_play for p in self.players_list):
					next_idx = -1
					for i, p in enumerate(self.players_list):
						if p and p.mb and p.is_play:
							next_idx = i
							break
					if next_idx >= 0:
						if next_idx in self.confirm_next_idx:
							self.confirm_next_idx.remove(next_idx)
						self.players_list[next_idx].character = const.CHARACTER_ADMIN

						for i, p in enumerate(self.players_list):
							if p is not None and p.mb :
								p.mb.giveControl(next_idx)

			# 茶楼座位信息变更
			if self.room_type == const.CLUB_ROOM and self.club_table:
				self.club_table.seatInfoChanged()

			if self.isEmpty:
				self.give_up_record_game()
				# self.dropRoom()
				self.do_drop_room()

	def dropRoom(self):
		self.dismiss_timer = None
		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.quitRoomSucceed()
				except:
					pass

		if self.room_type == const.AGENT_ROOM and self.agent:
			# 将房间从代理房间中删除
			if not self.agent.isDestroyed:
				self.agent.agentRoomDropped(self.roomId)

			try:
				# 如果是代开房, 没打完一局返还房卡
				if switch.DEBUG_BASE == 0 and self.current_round < 1 and self.agent and self.pay_mode == const.AGENT_PAY_MODE:
					card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)

					def callback(room_id, user_id, content):
						try:
							content = content.decode()
							if content[0] != '{':
								DEBUG_MSG(content)
								return
						except:
							DEBUG_MSG("dropRoom{} AgentRoom return Failed, userId = {}. return {} back".format(room_id, user_id, (card_cost, diamond_cost)))

					utility.update_card_diamond(self.agent.accountName, card_cost, diamond_cost,
												Functor(callback, self.roomId, self.agent.userId), "GuiXi drop AgentRoomID:{}".format(self.roomId))  # reason 必须为英文
			except:
				pass

		self._reset()

	def do_drop_room(self):
		if self.game_result:
			if len(self.game_result['round_result']) == 0:
				self.dropRoom()
			else:
				self.subtotal_result()
		else:
			self.dropRoom()

	def broadcastMultiOperation(self, idx_list, aid_list, tile_list=None):
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.mb.postMultiOperation(idx_list, aid_list, tile_list)

	def pay2StartGame(self):
		""" 开始游戏 """
		if self.timeout_timer:
			self.cancel_timer(self.timeout_timer)
			self.timeout_timer = None

		self.state = const.ROOM_TRANSITION
		# 将所有 要参加游戏 的游客 加入游戏
		for i,p in enumerate(self.players_list):
			if p is not None and p.character == const.CHARACTER_VISITOR and p.wait_flag == 1:
				p.wait_flag = 0
				p.character = const.CHARACTER_PLAYER

		# 在第2局开始扣房卡
		if self.current_round == 1:
			if switch.DEBUG_BASE:
				self.paySuccessCbk()
				return
			card_cost, diamond_cost = switch.calc_cost(self.game_round, self.pay_mode)
			if self.pay_mode == const.NORMAL_PAY_MODE:
				pay_account = self.origin_players_list[0].mb.accountName
				reason = "GuiXi RoomID:{}".format(self.roomId)

				def pay_callback(content):
					if self._check_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond(pay_account, -card_cost, -diamond_cost, pay_callback, reason)
			elif self.pay_mode == const.AGENT_PAY_MODE:
				# 开房的时候已经扣了房卡
				self.paySuccessCbk()
			elif self.pay_mode == const.CLUB_PAY_MODE:
				pay_account = self.club.owner['accountName']
				reason = "GuiXi Club:{} RoomID:{}".format(self.club.clubId, self.roomId)

				def pay_callback(content):
					if self._check_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond(pay_account, -card_cost, -diamond_cost, pay_callback, reason)
			elif self.pay_mode == const.AA_PAY_MODE:
				pay_accounts = [p.mb.accountName for p in self.players_list if p is not None]
				if self.club:
					reason = "GuiXi Club:{} AA RoomID:{}".format(self.club.clubId, self.roomId)
				else:
					reason = "GuiXi AA RoomID:{}".format(self.roomId)

				def pay_callback(content):
					if self._check_aa_pay_callback(content):
						self.paySuccessCbk()

				utility.update_card_diamond_aa(pay_accounts, -card_cost, -diamond_cost, pay_callback, reason)
			else:
				ERROR_MSG("pay2StartGame Error: No this PayMode:{}".format(self.pay_mode))
				return
		else:
			self.paySuccessCbk()

	def _check_pay_callback(self, content):
		if content is None or content[0] != '{':
			DEBUG_MSG('room:{},curround:{} pay callback {}'.format(self.roomId, self.current_round, content))
			self.give_up_record_game()
			# self.dropRoom()
			self.do_drop_room()
			return False
		return True

	def _check_aa_pay_callback(self, content):
		res = True
		try:
			ret = json.loads(content)
			if ret['errcode'] != 0:
				res = False
				DEBUG_MSG('room:{},cur_round:{} aa pay callback error code={}, msg={}'.format(self.roomId, self.current_round, ret['errcode'], ret['errmsg']))
		except:
			res = False
			import traceback
			ERROR_MSG(traceback.format_exc())

		if not res:
			self.give_up_record_game()
			self.do_drop_room()
			return False
		return True

	# 扣房卡/钻石成功后开始游戏(不改动部分)
	def paySuccessCbk(self):
		try:
			# 第一局时房间默认房主庄家, 之后谁上盘赢了谁是, 如果臭庄, 上一把玩家继续坐庄
			if self.current_round == 0:
				self.origin_players_list = self.players_list[:]

			self.op_record = []
			self.state = const.ROOM_PLAYING
			self.current_round += 1

			self.initPokers()
			self.deal()
			for p in self.players_list:
				if p and p.mb:
					DEBUG_MSG("{} pay success ckb {}".format(self.prefixLogStr, p.idx))
					p.mb.startGame(p.pokers)
			self.begin_record_game()
		except:
			err, msg, stack = sys.exc_info()
			DEBUG_MSG("room:{},curround:{} paySuccessCbk error; exc_info: {} ,{}".format(self.roomId, self.current_round, err, msg))
			DEBUG_MSG("room:{},curround:{} consume failed! users: {}".format(self.roomId, self.current_round, [p.userId for p in self.origin_players_list if p]))

	def uploadPokerResult(self, avt_mb, poker_list):
		poker_list = list(poker_list)
		n_player = self.players_dict[avt_mb.userId]
		# 确认有这个玩家
		if n_player == None:
			avt_mb.uploadPokerResultFailed(1)
			return
		# 确认玩家上传的牌和下发的一致
		if set(poker_list) != set(self.players_list[n_player.idx].pokers):
			avt_mb.uploadPokerResultFailed(2)
			return
		# 确认玩家是第一次提交
		if len(n_player.uploaded_pokers) > 0:
			avt_mb.uploadPokerResultFailed(3)
			return
		# 确认玩家上传的牌三道顺序大小关系正确
		if utility.check_result_available(poker_list) == False:
			avt_mb.uploadPokerResultFailed(4)
			return
		n_player.uploaded_pokers = poker_list

		for p in self.players_list:
			if p is not None:
				p.mb.uploadPokerResultSucceed(n_player.idx)

		uploaded_poker_dict = {}
		for i, p in enumerate(self.players_list):
			if p is not None and p.is_play:
				uploaded_poker_dict[i] = p.uploaded_pokers

		if all(len(uploaded_poker_dict[k]) > 0 for k in uploaded_poker_dict):
			# 计算info内的结果
			dansha_list, score_list, idx_quanleida = utility.compare_all_players(uploaded_poker_dict,
																				 self.lucky_poker,
																				 self.quanleida_dict,
																				 self.current_round,
																				 self.player_num)
			# 记录 全垒打
			if idx_quanleida != -1:
				self.quanleida_dict[self.current_round] = idx_quanleida

			# 分数
			for p in self.players_list:
				if p is not None:
					p.add_score(score_list[p.idx])

			info = {
				"dansha_list"				: dansha_list,
				"round_player_info_list"	: [p.get_round_client_dict() for p in self.players_list if p is not None and p.is_play],
				"left_pokers"				: self.pokers
			}
			if self.current_round < self.game_round:
				self.broadcastRoundEnd(info)
			else:
				self.endAll(info)


	def begin_record_game(self, ):
		self.begin_record_room()
		KBEngine.globalData['GameWorld'].begin_record_room(self, self.roomId)

	def begin_record_callback(self, record_id):
		self.record_id = record_id

	def end_record_game(self, result_info):
		KBEngine.globalData['GameWorld'].end_record_room(self.roomId, self, result_info)
		self.record_id = -1

	def give_up_record_game(self):
		KBEngine.globalData['GameWorld'].give_up_record_room(self.roomId)

	# 清除每一局 配牌的信息
	def clear_uploaded_pokers(self):
		for p in self.players_list:
			if p is not None:
				p.uploaded_pokers = []

	def broadcastRoundEnd(self, info):
		# 广播胡牌或者流局导致的每轮结束信息, 包括算的扎码和当前轮的统计数据

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		self.state = const.ROOM_WAITING
		self.confirm_next_idx = []
		self.clear_uploaded_pokers()

		for p in self.players_list:
			if p is not None:
				p.mb.roundResult(info)

		self.end_record_game(info)

	def endAll(self, info):
		""" 游戏局数结束, 给所有玩家显示最终分数记录 """

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		final_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None and p.character != const.CHARACTER_VISITOR]

		self.clear_uploaded_pokers()

		for p in self.players_list:
			if p and p.mb:
				p.mb.finalResult(final_info_list, info)
				# 有效圈数加一
				p.mb.addGameCount()

		self.end_record_game(info)
		self.saveRoomResult()
		self._reset()

	def subtotal_result(self):
		self.dismiss_timer = None
		player_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None]

		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.subtotalResult(player_info_list)
				except:
					pass
		self._reset()



	def get_init_client_dict(self):
		# @formatter:off
		return {
			'roomId'			: self.roomId,
			'ownerId'			: self.owner_uid,
			'roomType'			: self.room_type,
			'current_round'		: self.current_round,
			'game_round'		: self.game_round,
			'player_num'		: self.player_num,
			'pay_mode'			: self.pay_mode,
			'lucky_poker'		: self.lucky_poker,
			'hand_prepare'		: self.hand_prepare,
			'club_id'			: self.club.clubId if self.club is not None else 0,
			'room_state'		: const.ROOM_PLAYING if self.state == const.ROOM_PLAYING else const.ROOM_WAITING,
			'player_base_info_list': [p.get_init_client_dict() for p in self.players_list if p is not None],
			'player_state_list'	: [1 if i in self.confirm_next_idx else 0 for i in range(self.player_num)],
		}
		# @formatter:on
	def get_agent_client_dict(self):
		# @formatter:off
		return {
			'roomId'					: self.roomId,
			'current_round'				: self.current_round,
			'game_round'				: self.game_round,
			'pay_mode'					: self.pay_mode,
			'player_num'				: self.player_num,
			'hand_prepare'				: self.hand_prepare,
			'player_simple_info_list'	: [p.get_simple_client_dict() for p in self.players_list if p is not None],
		}
		# @formatter:on

	def get_agent_complete_dict(self):
		# @formatter:off
		return {
			'roomId'					: self.roomId,
			'game_round'				: self.game_round,
			'pay_mode'					: self.pay_mode,
			'player_num'				: self.player_num,
			'time'						: utility.get_cur_timestamp(),
			'hand_prepare'				: self.hand_prepare,
			'player_simple_info_list'	: [p.get_simple_client_dict() for p in self.origin_players_list if p is not None],
		}
		# @formatter:on

	def get_club_complete_dict(self):
		return {
			'roomId'			: self.roomId,
			'time'				: utility.get_cur_timestamp(),
			'player_info_list'	: [p.get_club_client_dict() for p in self.origin_players_list if p is not None],
		}

	def get_reconnect_room_dict(self, userId):
		dismiss_left_time = const.DISMISS_ROOM_WAIT_TIME - (int(time.time() - self.dismiss_room_ts))
		if self.dismiss_room_ts == 0 or dismiss_left_time >= const.DISMISS_ROOM_WAIT_TIME:
			dismiss_left_time = 0

		idx = 0
		for p in self.players_list:
			if p and p.userId == userId:
				idx = p.idx

		waitAidList = []
		for i in range(len(self.wait_op_info_list)):
			if self.wait_op_info_list[i]["idx"] == idx and self.wait_op_info_list[i]["state"] == const.OP_STATE_WAIT:
				waitAidList.append(self.wait_op_info_list[i]["aid"])
		return {
			'init_info'					: self.get_init_client_dict(),
			'uploaded_state_list' 		: [1 if p is not None and len(p.uploaded_pokers) > 0 else 0 for p in self.players_list],
			'player_state_list'			: [1 if i in self.confirm_next_idx else 0 for i in range(self.player_num)],
			'applyCloseFrom'			: self.dismiss_room_from,
			'applyCloseLeftTime'		: dismiss_left_time,
			'applyCloseStateList'		: self.dismiss_room_state_list,
			'player_advance_info_list'	: [p.get_reconnect_client_dict(userId) for p in self.players_list if p is not None],
		}

	def broadcastEnterRoom(self, idx):
		new_p = self.players_list[idx]
		for i, p in enumerate(self.players_list):
			if p is None:
				continue
			if i == idx:
				p.mb.enterRoomSucceed(self, idx)
			else:
				p.mb.othersEnterRoom(new_p.get_init_client_dict())

	def record_round_result(self):
		# 玩家记录当局战绩
		d = datetime.fromtimestamp(time.time())
		round_result_d = {
			'date': '-'.join([str(d.year), str(d.month), str(d.day)]),
			'time': ':'.join([str(d.hour), str(d.minute)]),
			'round_record': [p.get_round_result_info() for p in self.players_list if p],
			'recordId': self.record_id
		}
		self.game_result['round_result'].append(round_result_d)

	def begin_record_room(self):
		# 在第一局的时候记录基本信息
		if self.current_round != 1:
			return
		self.game_result = {
			'game_round': self.game_round,
			'roomId': self.roomId,
			'user_info_list': [p.get_basic_user_info() for p in self.players_list if p]
		}
		self.game_result['round_result'] = []

	def save_game_result(self):
		if len(self.game_result['round_result']) > 0:
			result_str = json.dumps(self.game_result)
			for p in self.players_list:
				p and p.save_game_result(result_str)

	def save_agent_complete_result(self):
		d = self.get_agent_complete_dict()
		result_str = json.dumps(d)
		if self.agent:
			if self.agent.isDestroyed:
				import x42
				for k, v in x42.GW.avatars.items():
					if v.userId == self.agent.userId:
						v.saveAgentRoomResult(result_str)
						break
				else:
					ERROR_MSG("room:{},curround:{} Save AgentRoom result failed!!! agent.userId = {}".format(self.roomId, self.current_round, self.agent.userId))
			else:
				self.agent.saveAgentRoomResult(result_str)

	def save_club_result(self):
		d = self.get_club_complete_dict()
		if self.club:
			self.club.saveTableResult(d)

	def saveRoomResult(self):
		# 保存玩家的战绩记录
		self.save_game_result()
		# 保存代理开房的记录
		if self.room_type == const.AGENT_ROOM and self.agent:
			# 代理开房完成记录
			self.save_agent_complete_result()
			# 将房间从代理房间中删除
			self.agent.agentRoomDropped(self.roomId)
		# 保存茶楼的战绩
		if self.room_type == const.CLUB_ROOM:
			self.save_club_result()

	def timeoutDestroy(self):
		if self.current_round < 1:
			self.do_drop_room()

	def destroySelf(self):
		self.clear_timers()
		not self.isDestroyed and self.destroy()

	def destroyByServer(self, reason=None):
		# 此接口由GameWorld关服时调用
		self.dismiss_timer = None
		for p in self.players_list:
			if p and p.mb:
				try:
					p.mb.quitRoomSucceed()
					if reason:
						p.mb.showTip(reason)
				except:
					pass

		self.destroySelf()

	def getSeatAbstractInfo(self):
		seat = 0
		for i in range(self.player_num):
			p = self.players_list[i]
			if p:
				seat |= 2 ** i
		return seat

	def getSeatDetailInfo(self):
		detail = []
		for p in self.players_list:
			if p:
				detail.append(p.get_simple_client_dict())
		return detail
