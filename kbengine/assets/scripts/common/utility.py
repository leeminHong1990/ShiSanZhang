# -*- coding: utf-8 -*-
import KBEngine
import random
import time
import re
import const
import copy
from datetime import datetime, timedelta
from KBEDebug import *
import hashlib
import AsyncRequest
import json
import switch
import x42

def is_same_day(ts1, ts2):
	d1 = datetime.fromtimestamp(ts1)
	d2 = datetime.fromtimestamp(ts2)

	if (d1.year, d1.month, d1.day) == (d2.year, d2.month, d2.day):
		return True
	return False

def gen_uid(count):
	id_s = str(count)
	size = len(id_s)
	ran_num = pow(10, max(6 - size, 0))
	ran_fix = str(random.randint(ran_num, 10 * ran_num - 1))
	return int(ran_fix + id_s)

def gen_club_id(count):
	id_s = str(count)
	size = len(id_s)
	if size < 5:
		for i in range(1000):
			ran_num = pow(10, max(4 - size, 0))
			ran_fix = str(random.randint(ran_num, 10 * ran_num - 1))
			cid = int(ran_fix + id_s)
			if cid not in x42.ClubStub.clubs:
				return cid
	else:
		return count

def gen_room_id():
	if switch.DEBUG_BASE == 1:
		return 99999
	randomId = random.randint(10000, 99999)
	for i in range(89999):
		val = randomId + i
		if val > 99999:
			val = val%100000 + 10000
		if val not in KBEngine.globalData["GameWorld"].rooms:
			return val
	return 99999

def filter_emoji(nickname):
	try:
		# UCS-4
		highpoints = re.compile(u'[\U00010000-\U0010ffff]')
	except re.error:
		# UCS-2
		highpoints = re.compile(u'[\uD800-\uDBFF][\uDC00-\uDFFF]')
	nickname = highpoints.sub(u'', nickname)
	return nickname

def get_md5(data):
	m = hashlib.md5()
	m.update(data.encode())
	return m.hexdigest()

# 发送网络请求
def get_user_info(accountName, callback):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + switch.PHP_SERVER_SECRET
	sign = get_md5(to_sign)
	url = switch.PHP_SERVER_URL + 'user_info_server'
	suffix = '?timestamp=' + str(ts) + '&unionid=' + accountName + '&sign=' + sign
	AsyncRequest.Request(url + suffix, lambda x: callback(x))

def get_is_proxy(accountName, callback):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + switch.PHP_SERVER_SECRET
	sign = get_md5(to_sign)
	url = switch.PHP_SERVER_URL + 'is_proxy'
	suffix = '?timestamp=' + str(ts) + '&unionid=' + accountName + '&sign=' + sign
	AsyncRequest.Request(url + suffix, lambda x: callback(x))

def update_card_diamond(accountName, deltaCard, deltaDiamond, callback, reason = ""):
	ts = get_cur_timestamp()
	to_sign = accountName + "_" + str(ts) + "_" + str(deltaCard) + "_" + str(deltaDiamond) + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_card_diamond'
	data = {
		"timestamp" : ts,
		"delta_card" : deltaCard,
		"delta_diamond" : deltaDiamond,
		"unionid" : accountName,
		"sign" : sign,
		"reason" : reason
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))

def update_card_diamond_aa(accountList, deltaCard, deltaDiamond, callback, reason=""):
	ts = get_cur_timestamp()
	account_json = json.dumps(accountList)
	to_sign = account_json + "_" + str(ts) + "_" + str(deltaCard) + "_" + str(deltaDiamond) + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("aa MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_card_diamond_aa'
	data = {
		"timestamp": ts,
		"delta_card": deltaCard,
		"delta_diamond": deltaDiamond,
		"unionids": account_json,
		"sign": sign,
		"reason": reason
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))

def update_valid_account(accountName, callback):
	to_sign = accountName + "_" + switch.PHP_SERVER_SECRET
	# DEBUG_MSG("to sign::" + to_sign)
	sign = get_md5(to_sign)
	# DEBUG_MSG("valid MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_valid'
	data = {
		"unionid": accountName,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


def update_data_statistics(ts, avatar_num, online_num, room_num, callback):
	to_sign = const.GAME_NAME + "_" + str(ts) + "_" + str(avatar_num) + "_" + str(online_num) + "_" + str(room_num) + "_"  + switch.PHP_SERVER_SECRET
	# INFO_MSG("stats to sign::" + to_sign)
	sign = get_md5(to_sign)
	# INFO_MSG("stats MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_data_statistics'
	data = {
		"game_name": const.GAME_NAME,
		"timestamp": ts,
		"avatar_num": avatar_num,
		"online_num": online_num,
		"room_num": room_num,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


def update_dau(dau, callback):
	ts = get_cur_timestamp()
	to_sign = const.GAME_NAME + "_" + str(ts) + "_" + str(dau) + "_" + switch.PHP_SERVER_SECRET
	INFO_MSG("dau to sign::" + to_sign)
	sign = get_md5(to_sign)
	INFO_MSG("dau MD5::" + sign)
	url = switch.PHP_SERVER_URL + 'update_dau'
	data = {
		"game_name": const.GAME_NAME,
		"timestamp": ts,
		"num": dau,
		"sign": sign,
	}
	AsyncRequest.Post(url, data, lambda x: callback(x))


# 获取测试模式 初始信息
def getDebugPrefab(owner, callback):
	ts = int(time.mktime(datetime.now().timetuple()))
	url = '{}?timestamp={}&from=py&game={}&owner={}'.format(switch.PHP_DEBUG_URL, ts, const.DEBUG_JSON_NAME, owner)
	AsyncRequest.Request(url, lambda x: callback(x))

def get_cur_timestamp():
	return int(time.time())

def get_seconds_till_n_days_later(begin, day, hour=0, minute=0, second=0):
	""" 获取第几天后的几点几分几秒的delta_time """
	dt = timedelta(days=day, hours=hour - begin.hour, minutes=minute - begin.minute, seconds=second - begin.second)
	seconds = dt.total_seconds()
	seconds = 0 if seconds <= 0 else seconds
	return seconds

def getRoomParams(create_dict):
	# @formatter:off
	return {
		'lucky_poker'	: create_dict['lucky_poker'],
		'game_round'	: create_dict['game_round'],
		'hand_prepare'	: create_dict['hand_prepare'],
		'pay_mode'		: create_dict['pay_mode'],
		'room_type'		: create_dict['room_type'],
	}
	# @formatter:on


def isValidUid(uid):
	if not isinstance(uid, int):
		return False
	if len(str(uid)) != 7:
		return False
	return True

def get_three_poker_type(three_pokers):
	three_pokers_number = [((i >> 2) + 1) for i in three_pokers]
	if (three_pokers_number[0] == three_pokers_number[1]) \
			and (three_pokers_number[1] == three_pokers_number[2]):
		return const.SANTIAO
	elif three_pokers_number[0] == three_pokers_number[1] \
			or three_pokers_number[1] == three_pokers_number[2]:
		return const.DUIZI
	else:
		return const.DANZHANG


def get_five_poker_type(pokers):
	types = [(i & 3) for i in pokers]
	numbers = [((i >> 2) + 1) for i in pokers]
	if (types[0] == types[1]) \
			and (types[0] == types[2]) \
			and (types[0] == types[3]) \
			and (types[0] == types[4]):
		if (numbers[0] - numbers[4] == 4) or (numbers[0]==14 and numbers[1]==5):
			return const.TONGHUASHUN
		else:
			return const.TONGHUA
	elif (numbers[0] == numbers[3]) \
			or (numbers[1] == numbers[4]):
		return const.ZHADAN
	elif ((numbers[0] == numbers[2]) and (numbers[3] == numbers[4])) \
			or ((numbers[0] == numbers[1]) and (numbers[2] == numbers[4])):
		return const.HULU
	elif (numbers[0] == numbers[2]) \
			or (numbers[1] == numbers[3]) \
			or (numbers[2] == numbers[4]):
		return const.SANTIAO
	elif ((numbers[0] == numbers[1]) and (numbers[2] == numbers[3])) \
			or ((numbers[0] == numbers[1]) and (numbers[3] == numbers[4])) \
			or ((numbers[1] == numbers[2]) and (numbers[3] == numbers[4])):
		return const.LIANGDUI
	elif (numbers[0] == numbers[1]) \
			or (numbers[1] == numbers[2]) \
			or (numbers[2] == numbers[3]) \
			or (numbers[3] == numbers[4]):
		return const.DUIZI
	elif (numbers[0] - numbers[4] == 4) or (numbers[0]==14 and numbers[1]==5):
		return const.SHUNZI
	else:
		return const.DANZHANG


# 比较单张（可以用于比较两个三张，两个五张，一个三张和一个五张）
def compare_danzhang(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	for i in range(len(pokers1)):
		if numbers1[i] > numbers2[i]:
			return 1
		elif numbers1[i] < numbers2[i]:
			return -1
	types1 = [(i & 3) for i in pokers1]
	types2 = [(i & 3) for i in pokers2]
	for i in range(len(pokers1)):
		if types1[i] > types2[i]:
			return 1
		elif types1[i] < types2[i]:
			return -1
	return 0


# 比较三张中的两个对子
def compare_three_duizi(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	type1 = 0
	number11 = 0
	number12 = 0
	if numbers1[0] == numbers1[1]:
		number11 = numbers1[0]
		number12 = numbers1[2]
		type1 = pokers1[2] & 3
	else:  # numbers1[1] == numbers1[2]
		number11 = numbers1[1]
		number12 = numbers1[0]
		type1 = pokers1[0] & 3
	type2 = 0
	number21 = 0
	number22 = 0
	if numbers2[0] == numbers2[1]:
		number21 = numbers2[0]
		number22 = numbers2[2]
		type2 = pokers2[2] & 3
	else:  # numbers2[1] == numbers2[2]
		number21 = numbers2[1]
		number22 = numbers2[0]
		type2 = pokers2[0] & 3
	if number11 > number21:
		return 1
	elif number11 < number21:
		return -1
	if number12 > number22:
		return 1
	elif number12 < number22:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较五张中的两个对子
def compare_five_duizi(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	type1 = 0
	number11 = 0
	number12 = 0
	number13 = 0
	number14 = 0
	if numbers1[0] == numbers1[1]:
		number11 = numbers1[0]
		number12 = numbers1[2]
		number13 = numbers1[3]
		number14 = numbers1[4]
		type1 = pokers1[2] & 3
	elif numbers1[1] == numbers1[2]:
		number11 = numbers1[1]
		number12 = numbers1[0]
		number13 = numbers1[3]
		number14 = numbers1[4]
		type1 = pokers1[0] & 3
	elif numbers1[2] == numbers1[3]:
		number11 = numbers1[2]
		number12 = numbers1[0]
		number13 = numbers1[1]
		number14 = numbers1[4]
		type1 = pokers1[0] & 3
	else:  # numbers1[3] == numbers1[4]
		number11 = numbers1[3]
		number12 = numbers1[0]
		number13 = numbers1[1]
		number14 = numbers1[2]
		type1 = pokers1[0] & 3
	type2 = 0
	number21 = 0
	number22 = 0
	number23 = 0
	number24 = 0
	if numbers2[0] == numbers2[1]:
		number21 = numbers2[0]
		number22 = numbers2[2]
		number23 = numbers2[3]
		number24 = numbers2[4]
		type2 = pokers2[2] & 3
	elif numbers2[1] == numbers2[2]:
		number21 = numbers2[1]
		number22 = numbers2[0]
		number23 = numbers2[3]
		number24 = numbers2[4]
		type2 = pokers2[0] & 3
	elif numbers2[2] == numbers2[3]:
		number21 = numbers2[2]
		number22 = numbers2[0]
		number23 = numbers2[1]
		number24 = numbers2[4]
		type2 = pokers2[0] & 3
	else:  # numbers2[3] == numbers2[4]
		number21 = numbers2[3]
		number22 = numbers2[0]
		number23 = numbers2[1]
		number24 = numbers2[2]
		type2 = pokers2[0] & 3
	if number11 > number21:
		return 1
	elif number11 < number21:
		return -1
	if number12 > number22:
		return 1
	elif number12 < number22:
		return -1
	if number13 > number23:
		return 1
	elif number13 < number23:
		return -1
	if number14 > number24:
		return 1
	elif number14 < number24:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较三张的对子和五张的对子
def compare_35_duizi(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	type1 = 0
	number11 = 0
	number12 = 0
	if numbers1[0] == numbers1[1]:
		number11 = numbers1[0]
		number12 = numbers1[2]
		type1 = pokers1[2] & 3
	else:  # numbers1[1] == numbers1[2]
		number11 = numbers1[1]
		number12 = numbers1[0]
		type1 = pokers1[0] & 3
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	type2 = 0
	number21 = 0
	number22 = 0
	if numbers2[0] == numbers2[1]:
		number21 = numbers2[0]
		number22 = numbers2[2]
		type2 = pokers2[2] & 3
	elif numbers2[1] == numbers2[2]:
		number21 = numbers2[1]
		number22 = numbers2[0]
		type2 = pokers2[0] & 3
	elif numbers2[2] == numbers2[3]:
		number21 = numbers2[2]
		number22 = numbers2[0]
		type2 = pokers2[0] & 3
	else:  # numbers2[3] == numbers2[4]
		number21 = numbers2[3]
		number22 = numbers2[0]
		type2 = pokers2[0] & 3
	if number11 > number21:
		return 1
	elif number11 < number21:
		return -1
	if number12 > number22:
		return 1
	elif number12 < number22:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较两个两对
def compare_liangdui(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	type1 = 0
	number11 = 0
	number12 = 0
	number13 = 0
	if numbers1[0] == numbers1[1] and numbers1[2] == numbers1[3]:
		number11 = numbers1[0]
		number12 = numbers1[2]
		number13 = numbers1[4]
		type1 = pokers1[4] & 3
	elif numbers1[0] == numbers1[1] and numbers1[3] == numbers1[4]:
		number11 = numbers1[0]
		number12 = numbers1[3]
		number13 = numbers1[2]
		type1 = pokers1[2] & 3
	else:  # case (numbers1[1] == numbers1[2] and numbers1[3] == numbers1[4])
		number11 = numbers1[1]
		number12 = numbers1[3]
		number13 = numbers1[0]
		type1 = pokers1[0] & 3
	type2 = 0
	number21 = 0
	number22 = 0
	number23 = 0
	if numbers2[0] == numbers2[1] and numbers2[2] == numbers2[3]:
		number21 = numbers2[0]
		number22 = numbers2[2]
		number23 = numbers2[4]
		type2 = pokers2[4] & 3
	elif numbers2[0] == numbers2[1] and numbers2[3] == numbers2[4]:
		number21 = numbers2[0]
		number22 = numbers2[3]
		number23 = numbers2[2]
		type2 = pokers2[2] & 3
	else:  # case (numbers2[1] == numbers2[2] and numbers2[3] == numbers2[4])
		number21 = numbers2[1]
		number22 = numbers2[3]
		number23 = numbers2[0]
		type2 = pokers2[0] & 3
	if number11 > number21:
		return 1
	elif number11 < number21:
		return -1
	if number12 > number22:
		return 1
	elif number12 < number22:
		return -1
	if number13 > number23:
		return 1
	elif number13 < number23:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较三张情况下的两个三条
def compare_three_santiao(pokers1, pokers2):
	number1 = (pokers1[0] >> 2) + 1
	number2 = (pokers2[0] >> 2) + 1
	if number1 > number2:
		return 1
	elif number1 < number2:
		return -1
	else:
		return 0


# 比较五张情况下的两个三条
def compare_five_santiao(pokers1, pokers2):
	number1 = (pokers1[0] >> 2) + 1
	if pokers1[1] >> 2 == pokers1[3] >> 2:
		number1 = (pokers1[1] >> 2) + 1
	elif pokers1[2] >> 2 == pokers1[4] >> 2:
		number1 = (pokers1[2] >> 2) + 1
	number2 = (pokers2[0] >> 2) + 1
	if pokers2[1] >> 2 == pokers2[3] >> 2:
		number2 = (pokers2[1] >> 2) + 1
	elif pokers2[2] >> 2 == pokers2[4] >> 2:
		number2 = (pokers2[2] >> 2) + 1
	if number1 > number2:
		return 1
	elif number1 < number2:
		return -1
	else:
		return 0


# 比较三张的三条和五张的三条
def compare_35_santiao(pokers1, pokers2):
	number1 = (pokers1[0] >> 2) + 1
	number2 = (pokers2[0] >> 2) + 1
	if pokers2[1] >> 2 == pokers2[3] >> 2:
		number2 = (pokers2[1] >> 2) + 1
	elif pokers2[2] >> 2 == pokers2[4] >> 2:
		number2 = (pokers2[2] >> 2) + 1
	if number1 > number2:
		return 1
	elif number1 < number2:
		return -1
	else:
		return 0


# 比较两个顺子
def compare_shunzi(pokers1, pokers2):
	type1 = pokers1[0] & 3
	type2 = pokers2[0] & 3
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	if numbers1[0]==14 and numbers1[1]==5:
		numbers1 = [5,4,3,2,1]
		type1 = pokers1[1] & 3
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	if numbers2[0]==14 and numbers2[1]==5:
		numbers2 = [5,4,3,2,1]
		type2 = pokers2[1] & 3
	if numbers1[0] > numbers2[0]:
		return 1
	elif numbers1[0] < numbers2[0]:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较两个同花
def compare_tonghua(pokers1, pokers2):
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	for i in range(5):
		if numbers1[i] > numbers2[i]:
			return 1
		elif numbers1[i] < numbers2[i]:
			return -1
	type1 = pokers1[0] & 3
	type2 = pokers2[0] & 3
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 比较两个葫芦
def compare_hulu(pokers1, pokers2):
	number1 = (pokers1[0] >> 2) + 1
	if pokers1[1] >> 2 == pokers1[3] >> 2:
		number1 = (pokers1[1] >> 2) + 1
	elif pokers1[2] >> 2 == pokers1[4] >> 2:
		number1 = (pokers1[2] >> 2) + 1
	number2 = (pokers2[0] >> 2) + 1
	if pokers2[1] >> 2 == pokers2[3] >> 2:
		number2 = (pokers2[1] >> 2) + 1
	elif pokers2[2] >> 2 == pokers2[4] >> 2:
		number2 = (pokers2[2] >> 2) + 1
	if number1 > number2:
		return 1
	elif number1 < number2:
		return -1
	else:
		return 0


# 比较两个炸弹
def compare_zhadan(pokers1, pokers2):
	number1 = (pokers1[0] >> 2) + 1
	if pokers1[1] >> 2 == pokers1[4] >> 2:
		number1 = (pokers1[1] >> 2) + 1
	number2 = (pokers2[0] >> 2) + 1
	if pokers2[1] >> 2 == pokers2[4] >> 2:
		number2 = (pokers2[1] >> 2) + 1
	if number1 > number2:
		return 1
	elif number1 < number2:
		return -1
	else:
		return 0


# 比较两个同花顺
def compare_tonghuashun(pokers1, pokers2):
	type1 = pokers1[0] & 3
	type2 = pokers2[0] & 3
	numbers1 = [((i >> 2) + 1) for i in pokers1]
	if numbers1[0]==14 and numbers1[1]==5:
		numbers1 = [5,4,3,2,1]
		type1 = pokers1[1] & 3
	numbers2 = [((i >> 2) + 1) for i in pokers2]
	if numbers2[0]==14 and numbers2[1]==5:
		numbers2 = [5,4,3,2,1]
		type2 = pokers2[1] & 3
	if numbers1[0] > numbers2[0]:
		return 1
	elif numbers1[0] < numbers2[0]:
		return -1
	if type1 > type2:
		return 1
	elif type1 < type2:
		return -1
	else:
		return 0


# 检查玩家的十三张牌大小关系是否正确
def check_result_available(pokers):
	if len(pokers) != 13:
		return False
	toudun_pokers = pokers[:3]
	zhongdun_pokers = pokers[3:8]
	weidun_pokers = pokers[8:13]
	toudun_idx = get_three_poker_type(toudun_pokers)
	zhongdun_idx = get_five_poker_type(zhongdun_pokers)
	weidun_idx = get_five_poker_type(weidun_pokers)
	if toudun_idx < zhongdun_idx or zhongdun_idx < weidun_idx:
		return False
	if toudun_idx == zhongdun_idx:
		if toudun_idx == 8:
			if compare_danzhang(toudun_pokers, zhongdun_pokers) != -1:
				return False
		elif toudun_idx == 7:
			if compare_35_duizi(toudun_pokers, zhongdun_pokers) != -1:
				return False
		elif toudun_idx == 5:
			if compare_35_santiao(toudun_pokers, zhongdun_pokers) != -1:
				return False
		else:
			return False
	if zhongdun_idx == weidun_idx:
		if zhongdun_idx == 8:
			return compare_danzhang(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 7:
			return compare_five_duizi(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 6:
			return compare_liangdui(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 5:
			return compare_five_santiao(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 4:
			return compare_shunzi(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 3:
			return compare_tonghua(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 2:
			return compare_hulu(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 1:
			return compare_zhadan(zhongdun_pokers, weidun_pokers) == -1
		elif zhongdun_idx == 0:
			return compare_tonghuashun(zhongdun_pokers, weidun_pokers) == -1
		else:
			return False
	return True


# 比较两个玩家的头道
def compare_toudun(pokers1, pokers2, lucky_poker):
	idx1 = get_three_poker_type(pokers1)
	idx2 = get_three_poker_type(pokers2)
	win = 1
	if idx1 < idx2:
		win = 1
	elif idx1 > idx2:
		win = -1
	else:
		if idx1 == const.SANTIAO:
			win = compare_three_santiao(pokers1, pokers2)
		elif idx1 == const.DUIZI:
			win = compare_three_duizi(pokers1, pokers2)
		else:  # DANZHANG
			win = compare_danzhang(pokers1, pokers2)
	if (win == 1 and idx1 == const.SANTIAO) or (win == -1 and idx2 == const.SANTIAO):
		return win, 3
	else:
		return win, 1


# 比较两个玩家的中道
def compare_zhongdun(pokers1, pokers2, lucky_poker):
	idx1 = get_five_poker_type(pokers1)
	idx2 = get_five_poker_type(pokers2)
	win = 1
	if idx1 < idx2:
		win = 1
	elif idx1 > idx2:
		win = -1
	else:
		if idx1 == const.DANZHANG:
			win = compare_danzhang(pokers1, pokers2)
		elif idx1 == const.DUIZI:
			win = compare_five_duizi(pokers1, pokers2)
		elif idx1 == const.LIANGDUI:
			win = compare_liangdui(pokers1, pokers2)
		elif idx1 == const.SANTIAO:
			win = compare_five_santiao(pokers1, pokers2)
		elif idx1 == const.SHUNZI:
			win = compare_shunzi(pokers1, pokers2)
		elif idx1 == const.TONGHUA:
			win = compare_tonghua(pokers1, pokers2)
		elif idx1 == const.HULU:
			win = compare_hulu(pokers1, pokers2)
		elif idx1 == const.ZHADAN:
			win = compare_zhadan(pokers1, pokers2)
		else:  # idx1 == const.TONGHUASHUN
			win = compare_tonghuashun(pokers1, pokers2)
	if (win == 1 and idx1 == const.ZHADAN) or (win == -1 and idx2 == const.ZHADAN):
		return win, 10
	elif (win == 1 and idx1 == const.TONGHUASHUN) or (win == -1 and idx2 == const.TONGHUASHUN):
		return win, 8
	else:
		return win, 1


# 比较两个玩家的尾道
def compare_weidun(pokers1, pokers2, lucky_poker):
	idx1 = get_five_poker_type(pokers1)
	idx2 = get_five_poker_type(pokers2)
	win = 1
	if idx1 < idx2:
		win = 1
	elif idx1 > idx2:
		win = -1
	else:
		if idx1 == const.DANZHANG:
			win = compare_danzhang(pokers1, pokers2)
		elif idx1 == const.DUIZI:
			win = compare_five_duizi(pokers1, pokers2)
		elif idx1 == const.LIANGDUI:
			win = compare_liangdui(pokers1, pokers2)
		elif idx1 == const.SANTIAO:
			win = compare_five_santiao(pokers1, pokers2)
		elif idx1 == const.SHUNZI:
			win = compare_shunzi(pokers1, pokers2)
		elif idx1 == const.TONGHUA:
			win = compare_tonghua(pokers1, pokers2)
		elif idx1 == const.HULU:
			win = compare_hulu(pokers1, pokers2)
		elif idx1 == const.ZHADAN:
			win = compare_zhadan(pokers1, pokers2)
		else:  # idx1 == const.TONGHUASHUN
			win = compare_tonghuashun(pokers1, pokers2)
	if (win == 1 and idx1 == const.ZHADAN) or (win == -1 and idx2 == const.ZHADAN):
		return win, 4
	elif (win == 1 and idx1 == const.TONGHUASHUN) or (win == -1 and idx2 == const.TONGHUASHUN):
		return win, 5
	else:
		return win, 1


def get_qipai_score(pokers):
	score = 0
	if get_three_poker_type(pokers[0:3]) == const.SANTIAO:
		score += 3
	if get_five_poker_type(pokers[3:8]) == const.ZHADAN:
		score += 8
	elif get_five_poker_type(pokers[3:8]) == const.TONGHUASHUN:
		score += 10
	if get_five_poker_type(pokers[8:13]) == const.ZHADAN:
		score += 4
	elif get_five_poker_type(pokers[8:13]) == const.TONGHUASHUN:
		score += 5
	return score


# 比较两个玩家的全部
def compare_two_players(pokers1, pokers2, lucky_poker):
	win1, score1 = compare_toudun(pokers1[0:3], pokers2[0:3], lucky_poker)
	win2, score2 = compare_zhongdun(pokers1[3:8], pokers2[3:8], lucky_poker)
	win3, score3 = compare_weidun(pokers1[8:13], pokers2[8:13], lucky_poker)
	pingpai_score = win1 * score1 + win2 * score2 + win3 * score3
	return pingpai_score, (win1 + win2 + win3 == 3) or (win1 + win2 + win3 == -3)


# 比较所有玩家 (参与人数和位置不固定)
def compare_all_players(pokers_dict, lucky_poker, quanleida_dict, cur_round, player_num):
	# 马牌
	ma_dict = {}
	for k in pokers_dict:
		if lucky_poker in pokers_dict[k]:
			ma_dict[k] = 2
		else:
			ma_dict[k] = 1

	dansha_matrix = [False] * (player_num * player_num)
	pingpai_matrix = [0] * (player_num * player_num)

	for i in pokers_dict:
		for j in pokers_dict:
			if i == j: continue
			pokers1 = pokers_dict[i]
			pokers2 = pokers_dict[j]
			pingpai_score, dansha = compare_two_players(pokers1, pokers2, lucky_poker)
			if dansha:
				if pingpai_score > 0:
					dansha_matrix[i * player_num + j] = True	# i单杀了j
					# DEBUG_MSG("{} pingpai dansha {}".format(i,j))
				elif pingpai_score < 0:
					dansha_matrix[j * player_num + i] = True	# j单杀了i
					# DEBUG_MSG("{} pingpai dansha {}".format(j, i))
			else:
				pingpai_matrix[i * player_num + j] = pingpai_score  # i赢了j这么多分
				pingpai_matrix[j * player_num + i] = -pingpai_score # j赢了i这么多分
				# DEBUG_MSG("{} pingpai win {} score {}".format(i, j, pingpai_score))
				# DEBUG_MSG("{} pingpai win {} score {}".format(j, i, -pingpai_score))
	# print "dansha", dansha_matrix
	# print "pingpai", pingpai_matrix
	DEBUG_MSG(dansha_matrix)
	idx_quanleida = -1
	base_quanleida = 10
	if len(pokers_dict) > 2:
		for i in pokers_dict:
			quanleida = True
			# DEBUG_MSG("reset quanleida idx {}".format(i))
			for j in pokers_dict:
				if j == i: continue
				# DEBUG_MSG("cmp quanleida {} = {} dansha_matrix {}".format(i, j, dansha_matrix[i * player_num + j]))
				quanleida = quanleida and dansha_matrix[i * player_num + j]
				# DEBUG_MSG("quanleida {}".format(quanleida))
			if quanleida:
				# DEBUG_MSG("quanleida idx:{}".format(i))
				idx_quanleida = i
				if len(pokers_dict) == 4:
					base_quanleida = 13
				break

	score_matrix = [0] * (player_num * player_num)
	if idx_quanleida != -1:
		for j in pokers_dict:
			if j == idx_quanleida: continue
			score = (base_quanleida + get_qipai_score(pokers_dict[idx_quanleida])) * ma_dict[idx_quanleida] * ma_dict[j]
			# DEBUG_MSG("quanleida score {} = (base_quanleida {} + qipai_score {}) * ma_dict {} * ma_dict {}".format(score, base_quanleida, get_qipai_score(pokers_dict[idx_quanleida]), ma_dict[idx_quanleida], ma_dict[j]))
			score_matrix[idx_quanleida*player_num+j] = score
			score_matrix[j*player_num+idx_quanleida] = -score
			# DEBUG_MSG("quanleida {}=score_matrix={} score {}".format(idx_quanleida, j, score))
			# DEBUG_MSG("quanleida {}=score_matrix={} score {}".format(j, idx_quanleida, -score))

	for i in pokers_dict:
		if i == idx_quanleida:
			continue
		else:
			for j in pokers_dict:
				if j == idx_quanleida or j <= i: continue
				if dansha_matrix[i * player_num + j]: # i wins j
					score = (6 + get_qipai_score(pokers_dict[i])) * ma_dict[i] * ma_dict[j]
				elif dansha_matrix[j * player_num + i]: # j wins i
					score = -(6 + get_qipai_score(pokers_dict[j])) * ma_dict[i] * ma_dict[j]
				else:
					score = pingpai_matrix[i * player_num + j] * ma_dict[i] * ma_dict[j]
				score_matrix[i * player_num + j] = score
				score_matrix[j * player_num + i] = -score
				# DEBUG_MSG("{} =score_matrix= {} score {}".format(i,j,score))
				# DEBUG_MSG("{} =score_matrix= {} score {}".format(j, i, -score))

	DEBUG_MSG('before calc HONG, score_matrix = %s' % (str(score_matrix)))
	DEBUG_MSG('idx_quanleida = %d' % (idx_quanleida))
	if idx_quanleida != -1:
		if (cur_round-1) in quanleida_dict:
			if quanleida_dict[cur_round-1] != idx_quanleida:
				origin = quanleida_dict[cur_round-1]
				new = idx_quanleida
				DEBUG_MSG('fan HONG, origin = %d, new = %d' % (origin, new))
				score_matrix[origin * player_num + new] *= 2
				score_matrix[new * player_num + origin] *= 2
				DEBUG_MSG("{} fanhong {} *2".format(origin, new))
				DEBUG_MSG("{} fanhong {} *2".format(new, origin))
			else:
				DEBUG_MSG('HONG, idx = %d' % (idx_quanleida))
				times = 1
				round_idx = cur_round-1
				while round_idx in quanleida_dict and quanleida_dict[round_idx] == idx_quanleida:
					times *= 2
					round_idx -= 1
				# score_matrix = [score*times for score in score_matrix]
				for i in pokers_dict:
					for j in pokers_dict:
						if i == idx_quanleida or j == idx_quanleida:
							score_matrix[i * player_num + j] *= times
							DEBUG_MSG("{} quanleida fanhong {} *{}".format(i, j, times))
	DEBUG_MSG('after calc HONG, score_matrix = %s' % (str(score_matrix)))
	scores = [0] * player_num
	for i in pokers_dict:
		score = 0
		for j in pokers_dict:
			score += score_matrix[i*player_num+j]
		scores[i] = score
	DEBUG_MSG("final score {}".format(str(scores)))
	return [1 if item else 0 for item in dansha_matrix], scores, idx_quanleida

