# -*- coding: utf-8 -*-

import KBEngine
from KBEDebug import *
import utility
import const
import random

class iRoomRules(object):

	def __init__(self):
		# 房间的牌堆
		self.pokers = []


	def initPokers(self):
		self.pokers = list(const.HEI) + list(const.HONG) + list(const.MEI) + list(const.FANG)
		self._shufflePokers()

	def _shufflePokers(self):
		random.shuffle(self.pokers)

	def deal(self):
		""" 发牌 """
		# test_list = [
		# 	[7, 11, 15, 19,  35, 39, 43, 47, 51, 54, 55, 55, 53],
		# 	[6, 10, 14, 18,  34, 38, 42, 46, 50, 54, 55, 54, 53],
		# 	[5, 9, 13, 17, 21, 22, 25, 29, 33, 37, 41, 45, 49],
		# 	[4, 8, 12, 16, 20, 23, 24, 28, 32, 36, 40, 44, 48, ]
		# ]
		# for i, p in enumerate(self.players_list):
		# 	if p is not None and p.is_play:
		# 		p.pokers = test_list[i]
		for i, p in enumerate(self.players_list):
			if p is not None and p.is_play:
				p.pokers = self.pokers[(i * const.INIT_POKER_NUMBER):((i+1) * const.INIT_POKER_NUMBER)]
				DEBUG_MSG("player[{0}]'s init cards are {1}".format(i, str(p.pokers)))


	# def compare(self, pokerList):
	# 	pass
	#
	# def mark_pokers(self):
	# 	"同花顺 > 炸弹 > 葫芦 > 同花 > 顺子 > 三条 > 两对 > 对子 > 单张"
	# 	pass
