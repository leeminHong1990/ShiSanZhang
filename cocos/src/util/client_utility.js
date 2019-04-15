"use strict";
var cutil = function(){}

cutil.get_five_poker_type = function (five_pokers) {
    var five_pokers_type = five_pokers.map(function (item) {
        return item & 3;
    });
    var five_pokers_number = five_pokers.map(function (item) {
        return (item >> 2) + 1;
    });
    if (five_pokers_type[0] === five_pokers_type[1]
        && five_pokers_type[0] === five_pokers_type[2]
        && five_pokers_type[0] === five_pokers_type[3]
        && five_pokers_type[0] === five_pokers_type[4]) {
        if (five_pokers_number[0] - five_pokers_number[4] === 4
            || (five_pokers_number[0] === 14 && five_pokers_number[1] === 5)) {
            return const_val.tonghuashun;
        }
        else {
            return const_val.tonghua;
        }
    }
    else if (five_pokers_number[0] === five_pokers_number[3]
        || five_pokers_number[1] === five_pokers_number[4]) {
        return const_val.zhadan;
    }
    else if ((five_pokers_number[0] === five_pokers_number[2]
            && five_pokers_number[3] === five_pokers_number[4])
        || (five_pokers_number[0] === five_pokers_number[1]
            && five_pokers_number[2] === five_pokers_number[4])) {
        return const_val.hulu;
    }
    else if (five_pokers_number[0] === five_pokers_number[2]
        || five_pokers_number[1] === five_pokers_number[3]
        || five_pokers_number[2] === five_pokers_number[4]
    ) {
        return const_val.santiao;
    }
    else if ((five_pokers_number[0] === five_pokers_number[1]
            && five_pokers_number[2] === five_pokers_number[3])
        || (five_pokers_number[0] === five_pokers_number[1]
            && five_pokers_number[3] === five_pokers_number[4])
        || (five_pokers_number[1] === five_pokers_number[2]
            && five_pokers_number[3] === five_pokers_number[4])) {
        return const_val.liangdui;
    }
    else if (five_pokers_number[0] === five_pokers_number[1]
        || five_pokers_number[1] === five_pokers_number[2]
        || five_pokers_number[2] === five_pokers_number[3]
        || five_pokers_number[3] === five_pokers_number[4]) {
        return const_val.duizi;
    }
    else if (five_pokers_number[0] - five_pokers_number[4] === 4
        || (five_pokers_number[0] === 14 && five_pokers_number[1] === 5)) {
        return const_val.shunzi;
    }
    else {
        return const_val.danzhang;
    }
};

cutil.get_three_poker_type = function (three_pokers) {
    var three_pokers_number = three_pokers.map(function (item) {
        return (item >> 2) + 1;
    });
    if (three_pokers_number[0] === three_pokers_number[1]
        && three_pokers_number[0] === three_pokers_number[2]) {
        return const_val.santiao;
    }
    else if (three_pokers_number[0] === three_pokers_number[1]
        || three_pokers_number[1] === three_pokers_number[2]) {
        return const_val.duizi;
    }
    else {
        return const_val.danzhang;
    }
};

cutil.compare_danzhang = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    for (var i = 0; i < pokers1.length; i++) {
        if (numbers1[i] > numbers2[i]) {
            return 1;
        }
        else if (numbers1[i] < numbers2[i]) {
            return -1;
        }
    }
    var types1 = pokers1.map(function (item) {
        return item & 3;
    });
    var types2 = pokers2.map(function (item) {
        return item & 3;
    });
    for (var i = 0; i < pokers1.length; i++) {
        if (types1[i] > types2[i]) {
            return 1;
        }
        else if (types1[i] < types2[i]) {
            return -1;
        }
    }
    return 0;
};

cutil.compare_three_duizi = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    var type1 = 0;
    var number11 = 0;
    var number12 = 0;
    if (numbers1[0] === numbers1[1]) {
        number11 = numbers1[0];
        number12 = numbers1[2];
        type1 = pokers1[2] & 3;
    }
    else {  // numbers1[1] === numbers1[2]
        number11 = numbers1[1];
        number12 = numbers1[0];
        type1 = pokers1[0] & 3;
    }
    var type2 = 0;
    var number21 = 0;
    var number22 = 0;
    if (numbers2[0] === numbers2[1]) {
        number21 = numbers2[0];
        number22 = numbers2[2];
        type2 = pokers2[2] & 3;
    }
    else {  // numbers2[1] === numbers2[2]
        number21 = numbers2[1];
        number22 = numbers2[0];
        type2 = pokers2[0] & 3;
    }
    if (number11 > number21) {
        return 1;
    }
    else if (number11 < number21) {
        return -1;
    }
    if (number12 > number22) {
        return 1;
    }
    else if (number12 < number22) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_five_duizi = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    var type1 = 0;
    var number11 = 0;
    var number12 = 0;
    var number13 = 0;
    var number14 = 0;
    if (numbers1[0] === numbers1[1]) {
        number11 = numbers1[0];
        number12 = numbers1[2];
        number13 = numbers1[3];
        number14 = numbers1[4];
        type1 = pokers1[2] & 3;
    }
    else if (numbers1[1] === numbers1[2]) {
        number11 = numbers1[1];
        number12 = numbers1[0];
        number13 = numbers1[3];
        number14 = numbers1[4];
        type1 = pokers1[0] & 3;
    }
    else if (numbers1[2] === numbers1[3]) {
        number11 = numbers1[2];
        number12 = numbers1[0];
        number13 = numbers1[1];
        number14 = numbers1[4];
        type1 = pokers1[0] & 3;
    }
    else {  // numbers1[3] == numbers1[4]
        number11 = numbers1[3];
        number12 = numbers1[0];
        number13 = numbers1[1];
        number14 = numbers1[2];
        type1 = pokers1[0] & 3;
    }
    var type2 = 0;
    var number21 = 0;
    var number22 = 0;
    var number23 = 0;
    var number24 = 0;
    if (numbers2[0] === numbers2[1]) {
        number21 = numbers2[0];
        number22 = numbers2[2];
        number23 = numbers2[3];
        number24 = numbers2[4];
        type2 = pokers2[2] & 3;
    }
    else if (numbers2[1] === numbers2[2]) {
        number21 = numbers2[1];
        number22 = numbers2[0];
        number23 = numbers2[3];
        number24 = numbers2[4];
        type2 = pokers2[0] & 3;
    }
    else if (numbers2[2] === numbers2[3]) {
        number21 = numbers2[2];
        number22 = numbers2[0];
        number23 = numbers2[1];
        number24 = numbers2[4];
        type2 = pokers2[0] & 3;
    }
    else {  // numbers2[3] == numbers2[4]
        number21 = numbers2[3];
        number22 = numbers2[0];
        number23 = numbers2[1];
        number24 = numbers2[2];
        type2 = pokers2[0] & 3;
    }
    if (number11 > number21) {
        return 1;
    }
    else if (number11 < number21) {
        return -1;
    }
    if (number12 > number22) {
        return 1;
    }
    else if (number12 < number22) {
        return -1;
    }
    if (number13 > number23) {
        return 1;
    }
    else if (number13 < number23) {
        return -1;
    }
    if (number14 > number24) {
        return 1;
    }
    else if (number14 < number24) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_35_duizi = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var type1 = 0;
    var number11 = 0;
    var number12 = 0;
    if (numbers1[0] === numbers1[1]) {
        number11 = numbers1[0];
        number12 = numbers1[2];
        type1 = pokers1[2] & 3;
    }
    else {  // numbers1[1] === numbers1[2]
        number11 = numbers1[1];
        number12 = numbers1[0];
        type1 = pokers1[0] & 3;
    }
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    var type2 = 0;
    var number21 = 0;
    var number22 = 0;
    if (numbers2[0] === numbers2[1]) {
        number21 = numbers2[0];
        number22 = numbers2[2];
        type2 = pokers2[2] & 3;
    }
    else if (numbers2[1] === numbers2[2]) {
        number21 = numbers2[1];
        number22 = numbers2[0];
        type2 = pokers2[0] & 3;
    }
    else if (numbers2[2] === numbers2[3]) {
        number21 = numbers2[2];
        number22 = numbers2[0];
        type2 = pokers2[0] & 3;
    }
    else {  // numbers2[3] == numbers2[4]
        number21 = numbers2[3];
        number22 = numbers2[0];
        type2 = pokers2[0] & 3;
    }
    if (number11 > number21) {
        return 1;
    }
    else if (number11 < number21) {
        return -1;
    }
    if (number12 > number22) {
        return 1;
    }
    else if (number12 < number22) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_liangdui = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    var type1 = 0;
    var number11 = 0;
    var number12 = 0;
    var number13 = 0;
    if (numbers1[0] === numbers1[1] && numbers1[2] === numbers1[3]) {
        number11 = numbers1[0];
        number12 = numbers1[2];
        number13 = numbers1[4];
        type1 = pokers1[4] & 3;
    }
    else if (numbers1[0] === numbers1[1] && numbers1[3] === numbers1[4]) {
        number11 = numbers1[0];
        number12 = numbers1[3];
        number13 = numbers1[2];
        type1 = pokers1[2] & 3;
    }
    else {  // case (numbers1[1] == numbers1[2] && numbers1[3] == numbers1[4])
        number11 = numbers1[1];
        number12 = numbers1[3];
        number13 = numbers1[0];
        type1 = pokers1[0] & 3;
    }
    var type2 = 0;
    var number21 = 0;
    var number22 = 0;
    var number23 = 0;
    if (numbers2[0] === numbers2[1] && numbers2[2] === numbers2[3]) {
        number21 = numbers2[0];
        number22 = numbers2[2];
        number23 = numbers2[4];
        type2 = pokers2[4] & 3;
    }
    else if (numbers2[0] === numbers2[1] && numbers2[3] === numbers2[4]) {
        number21 = numbers2[0];
        number22 = numbers2[3];
        number23 = numbers2[2];
        type2 = pokers2[2] & 3;
    }
    else {  // case (numbers2[1] == numbers2[2] && numbers2[3] == numbers2[4])
        number21 = numbers2[1];
        number22 = numbers2[3];
        number23 = numbers2[0];
        type2 = pokers2[0] & 3;
    }
    if (number11 > number21) {
        return 1;
    }
    else if (number11 < number21) {
        return -1;
    }
    if (number12 > number22) {
        return 1;
    }
    else if (number12 < number22) {
        return -1;
    }
    if (number13 > number23) {
        return 1;
    }
    else if (number13 < number23) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_three_santiao = function (pokers1, pokers2) {
    var number1 = (pokers1[0] >> 2) + 1;
    var number2 = (pokers2[0] >> 2) + 1;
    if (number1 > number2) {
        return 1;
    }
    else if (number1 < number2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_five_santiao = function (pokers1, pokers2) {
    var number1 = (pokers1[0] >> 2) + 1;
    if (pokers1[1] >> 2 === pokers1[3] >> 2) {
        number1 = (pokers1[1] >> 2) + 1;
    }
    else if (pokers1[2] >> 2 === pokers1[4] >> 2) {
        number1 = (pokers1[2] >> 2) + 1;
    }
    var number2 = (pokers2[0] >> 2) + 1;
    if (pokers2[1] >> 2 === pokers2[3] >> 2) {
        number2 = (pokers2[1] >> 2) + 1;
    }
    else if (pokers2[2] >> 2 === pokers2[4] >> 2) {
        number2 = (pokers2[2] >> 2) + 1;
    }
    if (number1 > number2) {
        return 1;
    }
    else if (number1 < number2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_35_santiao = function (pokers1, pokers2) {
    var number1 = (pokers1[0] >> 2) + 1;
    var number2 = (pokers2[0] >> 2) + 1;
    if (pokers2[1] >> 2 === pokers2[3] >> 2) {
        number2 = (pokers2[1] >> 2) + 1;
    }
    else if (pokers2[2] >> 2 === pokers2[4] >> 2) {
        number2 = (pokers2[2] >> 2) + 1;
    }
    if (number1 > number2) {
        return 1;
    }
    else if (number1 < number2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_shunzi = function (pokers1, pokers2) {
    var type1 = pokers1[0] & 3;
    var type2 = pokers2[0] & 3;
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    if (numbers1[0] === 14 && numbers1[1] === 5) {
        numbers1 = [5,4,3,2,1];
        type1 = pokers1[1] & 3;
    }
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    if (numbers2[0] === 14 && numbers2[1] === 5) {
        numbers2 = [5,4,3,2,1];
        type2 = pokers2[1] & 3;
    }
    if (numbers1[0] > numbers2[0]) {
        return 1;
    }
    else if (numbers1[0] < numbers2[0]) {
        return -1;
    }
    if (numbers1[1] > numbers2[1]) {
        return 1;
    }
    else if (numbers1[1] < numbers2[1]) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_tonghua = function (pokers1, pokers2) {
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    for (var i = 0; i < 5; i++) {
        if (numbers1[i] > numbers2[i]) {
            return 1;
        }
        else if (numbers1[i] < numbers2[i]) {
            return -1;
        }
    }
    var type1 = pokers1[0] & 3;
    var type2 = pokers2[0] & 3;
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_hulu = function (pokers1, pokers2) {
    var number1 = (pokers1[0] >> 2) + 1;
    if (pokers1[1] >> 2 === pokers1[3] >> 2) {
        number1 = (pokers1[1] >> 2) + 1;
    }
    else if (pokers1[2] >> 2 === pokers1[4] >> 2) {
        number1 = (pokers1[2] >> 2) + 1;
    }
    var number2 = (pokers2[0] >> 2) + 1;
    if (pokers2[1] >> 2 === pokers2[3] >> 2) {
        number2 = (pokers2[1] >> 2) + 1;
    }
    else if (pokers2[2] >> 2 === pokers2[4] >> 2) {
        number2 = (pokers2[2] >> 2) + 1;
    }
    if (number1 > number2) {
        return 1;
    }
    else if (number1 < number2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_zhadan = function (pokers1, pokers2) {
    var number1 = (pokers1[0] >> 2) + 1;
    if (pokers1[1] >> 2 === pokers1[4] >> 2) {
        number1 = (pokers1[1] >> 2) + 1;
    }
    var number2 = (pokers2[0] >> 2) + 1;
    if (pokers2[1] >> 2 === pokers2[4] >> 2) {
        number2 = (pokers2[1] >> 2) + 1;
    }
    if (number1 > number2) {
        return 1;
    }
    else if (number1 < number2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.compare_tonghuashun = function (pokers1, pokers2) {
    var type1 = pokers1[0] & 3;
    var type2 = pokers2[0] & 3;
    var numbers1 = pokers1.map(function (item) {
        return (item >> 2) + 1;
    });
    if (numbers1[0] === 14 && numbers1[1] === 5) {
        numbers1 = [5,4,3,2,1];
        type1 = pokers1[1] & 3;
    }
    var numbers2 = pokers2.map(function (item) {
        return (item >> 2) + 1;
    });
    if (numbers2[0] === 14 && numbers2[1] === 5) {
        numbers2 = [5,4,3,2,1];
        type2 = pokers2[1] & 3;
    }
    if (numbers1[0] > numbers2[0]) {
        return 1;
    }
    else if (numbers1[0] < numbers2[0]) {
        return -1;
    }
    if (numbers1[1] > numbers2[1]) {
        return 1;
    }
    else if (numbers1[1] < numbers2[1]) {
        return -1;
    }
    if (type1 > type2) {
        return 1;
    }
    else if (type1 < type2) {
        return -1;
    }
    else {
        return 0;
    }
};

cutil.lock_ui = function (){
	if(h1global.globalUIMgr){
		h1global.globalUIMgr.lock_ui.show();
	}
};

cutil.unlock_ui = function (){
	if(h1global.globalUIMgr){
		h1global.globalUIMgr.lock_ui.hide();
	}
};

cutil.deepCopy = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cutil.deepCopy(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

cutil.angle = function (a, b) { // 平面坐标系 b点到a点的角度 0-360
    let angel = Math.atan((b.y - a.y) / (b.x - a.x))*180/Math.PI
	if (b.x - a.x >= 0 && b.y - a.y >= 0) { // 第一象限
		return angel
	} else if (b.x - a.x < 0 && b.y - a.y >= 0) { // 第二象限
		return 180 + angel
	} else if (b.x - a.x <= 0 && b.y - a.y <= 0) { // 第三象限
		return 180 + angel
	} else {
		return 360 + angel
	}
};

cutil.distance = function (a_point, b_point){
	var y_distance = b_point.y - a_point.y;
	var x_distance = b_point.x - a_point.x;
	return Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2))
};

cutil.isPositiveNumber = function (text) {
    if (text == undefined) return false;
    if (cc.isNumber(text)) {
        return text % 1 === 0;
    }
    return /^[1-9]\d*$/.test(text);
};

cutil.arrayShuffle = function(arr){
	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	return arr;
};

cutil.convert_time_to_date = function (rtime)
{
	var temp = os.date("*t", rtime)
	return temp.year.toString() + "年" + temp.month.toString() + "月" + temp.day.toString() + "日"
};

cutil.convert_time_to_hour2second = function (rtime)
{
	var temp = os.date("*t", rtime)
	return temp.hour.toString() + ":" + temp.min.toString()
};

cutil.convert_time_to_stime = function (ttime)
{
	var temp = os.date("*t", ttime)
	return temp.year.toString() + "/" + temp.month.toString() + "/" + temp.day.toString() + "  "+ temp.hour.toString() + ":"+ temp.min.toString() + ":" + temp.sec.toString()
};

cutil.convert_timestamp_to_datetime = function (ts) {
    var date	= new Date(ts * 1000);
    var year	= date.getFullYear();
    var month	= ('0' + (date.getMonth() + 1)).substr(-2);
    var day		= ('0' + date.getDate()).substr(-2);
    var hour	= ('0' +date.getHours()).substr(-2);
    var min		= ('0' + date.getMinutes()).substr(-2);
    var sec		= ('0' + date.getSeconds()).substr(-2);

    var time_str = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    return time_str;
};

cutil.convert_timestamp_to_datetime_exsec = function (ts) {
	var date = new Date(ts * 1000);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).substr(-2);
	var day = ('0' + date.getDate()).substr(-2);
	var hour = ('0' + date.getHours()).substr(-2);
	var min = ('0' + date.getMinutes()).substr(-2);
	var sec = ('0' + date.getSeconds()).substr(-2);

	var time_str = year + '-' + month + '-' + day + '   ' + hour + ':' + min;
	return time_str;
};

cutil.convert_timestamp_to_ymd = function (ts) {
    var date	= new Date(ts * 1000);
    var year	= date.getFullYear();
    var month	= ('0' + (date.getMonth() + 1)).substr(-2);
    var day		= ('0' + date.getDate()).substr(-2);

    var time_str = year + '-' + month + '-' + day;
    return time_str;
};

cutil.convert_timestamp_to_mdhms = function (ts) {
    var date	= new Date(ts * 1000);
    var year	= date.getFullYear();
    var month	= ('0' + (date.getMonth() + 1)).substr(-2);
    var day		= ('0' + date.getDate()).substr(-2);
    var hour	= ('0' +date.getHours()).substr(-2);
    var min		= ('0' + date.getMinutes()).substr(-2);
    var sec		= ('0' + date.getSeconds()).substr(-2);

    return month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
};

cutil.convert_seconds_to_decimal = function(seconds, decimalNum){
	seconds = String(seconds)
	var lis = [[], []]
	var index = 0
	for (var i = 0; i < seconds.length; i++) {
		if (seconds[i] === '.') {
			index += 1
		}
		if (index <= 1 && seconds[i] !== '.') {
			lis[index].push(seconds[i])
		}
	}
	if (lis[0].length <= 0) {
		return null;
	}
	var integerPart = ""
	for (var i = 0; i < lis[0].length; i++) {
		integerPart += lis[0][i];
	}
	var decimalPart = ""
	if (lis[1].length < decimalNum) {
		for (var i = 0; i < lis[1].length; i++) {
			decimalPart += lis[1][i];
		}
		for (var i = 0; i < decimalNum-lis[1].length; i++) {
			decimalPart += '0';
		}
	} else {
		for (var i = 0; i < decimalNum; i++) {
			decimalPart += lis[1][i];
		}
	}
	return integerPart + "." + decimalPart
}

cutil.convert_second_to_hms = function (sec)
{
	if (!sec || sec <= 0) {return "00:00:00";}
	sec = Math.floor(sec);
	var hour = Math.floor(sec / 3600);
	var minute = Math.floor((sec % 3600) / 60);
	var second = (sec % 3600) % 60;
	// cc.log(second)
	
	var timeStr = "";
	if (hour < 10) {
		timeStr = timeStr + "0" + hour + ":";
	}else {
        timeStr = hour + ":";
    }
	if (minute < 10) {
		timeStr = timeStr + "0" + minute + ":";
	} else {
		timeStr = timeStr + minute + ":";
	}
	if (second < 10) {
		timeStr = timeStr + "0" + second;
	} else {
		timeStr = timeStr + second;
	}
	return timeStr;
}

cutil.convert_second_to_ms = function (sec)
{
	if (!sec || sec <= 0) {return "00:00";}
	sec = Math.floor(sec);

	var minute = Math.floor(sec / 60);
	var second = sec % 60;
	// cc.log(second)
	
	var timeStr = "";
	if (minute < 10) {
		timeStr = timeStr + "0" + minute + ":";
	} else {
		timeStr = timeStr + minute + ":";
	}
	if (second < 10) {
		timeStr = timeStr + "0" + second;
	} else {
		timeStr = timeStr + second;
	}
	return timeStr;
};


cutil.resize_img = function( item_img, size )
{
	var rect = item_img.getContentSize()
	var scale = size / rect.height
	var width = rect.width * scale
	if (width > size)
		scale = size / rect.width
	item_img.setScale(scale)
};

cutil.show_portrait_by_num = function (portrait_img,  characterNum)
{
	if (characterNum <= 100){
        portrait_img.loadTexture("res/portrait/zhujue" + characterNum + ".png")
	}
    else
    {
		// var table_mercenary = require("data/table_mercenary")
		var mercenary_info = table_mercenary[characterNum]
		KBEngine.DEBUG_MSG("mercenary_info", mercenary_info["PORTRAIT"])
		portrait_img.loadTexture("res/portrait/" + mercenary_info["PORTRAIT"] + ".png")
    }
};


cutil.print_table = function (lst)
{
	if (lst === undefined)
	{
		KBEngine.DEBUG_MSG("ERROR------>Table is undefined")
		return;
	} 
	for (var key in lst)
	{
		var info = lst[key];
    	KBEngine.DEBUG_MSG(key + " : " + info)
    	if (info instanceof Array)
    	{
        	cutil.print_table(info);
    	}
	}
};

cutil.is_in_list = function (x, t){
	for(var index in t){
		if (t[index] === x) {
			return  index;
		}
	}
	return null;
}


cutil.str_sub = function (strinput, len)
{
	if (strinput.length < len)
		return strinput
	if (strinput.length >= 128 && strinput.length < 192) 
		return cutil.str_sub(strinput, len - 1)
	return strinput.substring(0, len)
};

cutil.info_sub = function (strinput, len, ellipsis)
{
    ellipsis = ellipsis || "...";
	var output = cutil.str_sub(strinput, len)
	if (output.length < strinput.length)
	{
		return output + ellipsis
	}
	return output
};

cutil.share_func = function (title, desc) {
	wx.onMenuShareAppMessage({
		title: title, // 分享标题
		desc: desc, // 分享描述
		link: switches.h5entrylink, // 分享链接
		imgUrl: '', // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			// 用户确认分享后执行的回调函数
			cc.log("ShareAppMessage Success!");
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
			cc.log("ShareAppMessage Cancel!");
		},
		fail: function() {
			cc.log("ShareAppMessage Fail")
		},
	});
	wx.onMenuShareTimeline({
		title: title, // 分享标题
		desc: desc, // 分享描述
		link: switches.h5entrylink, // 分享链接
		imgUrl: '', // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			// 用户确认分享后执行的回调函数
			cc.log("onMenuShareTimeline Success!");
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
			cc.log("onMenuShareTimeline Cancel!");
		},
		fail: function() {
			cc.log("onMenuShareTimeline Fail")
		},
	});
};

/*
cutil.deep_copy_table = 
	function (tb)
		if type(tb) ~= "table" then return tb end
		var result = {}
		for i, j in pairs(tb) do
			result[i] = cutil.deep_copy_table(j)
		end
		return result
	end
*/
cutil.convert_num_to_chstr = function(num)
{
	if (typeof num !== "number") {
		// 处理UINT64
		num = num.toDouble();
	}
	function convert(num, limit, word)
	{
		var integer = Math.floor(num / limit);
		var res_str = integer.toString();
		var floatNum = 0;
		if (integer < 10)
		{
			// floatNum = (Math.floor((num % limit) / (limit / 100))) * 0.01;
			floatNum = (Math.floor((num % limit) / (limit / 100)));
			if(floatNum < 1){
			} else if(floatNum < 10) {
				res_str = res_str + ".0" + floatNum.toString();
			} else {
				res_str = res_str + "." + floatNum.toString();
			}
		}
		else if (integer < 100)
		{
			floatNum = (Math.floor((num % limit) / (limit / 10)));
			if(floatNum < 1){
			} else {
				res_str = res_str + "." + floatNum.toString();
			}
		}
		// floatNum = Math.floor(floatNum * limit)/limit
		// integer += floatNum;

		// return integer.toString() + word;
		// cc.log(num)
		// cc.log(res_str + word)
		return res_str + word;
	}

	if (num >= 1000000000)
	{
		return convert(num, 1000000000, "B");
	}
	else if (num >= 1000000)
	{
		return convert(num, 1000000, "M");
	}
	else if (num >= 1000)
	{
		return convert(num, 1000, "K");
	}
	else
	{
		return Math.floor(num).toString();
	}
		
};

cutil.splite_list = function (list, interval, fix_length)
{
	var result_list = [];
	for (var i = 0; i < list.length; ++i)
	{
		var idx = Math.floor(i / interval);
		if (idx >= result_list.length)
		{
			result_list[idx] = [];
		}
		result_list[idx][i - idx * interval] = list[i];
	} 

	if (fix_length && result_list.length < fix_length)
	{
		for (var i = result_list.length; i < fix_length; ++i)
		{
			result_list.push([]);
		}
	}
	return result_list;
};


cutil.get_rotation_angle = function(vec2)
{
	var vec2_tan = Math.abs(vec2.y) / Math.abs(vec2.x);
	var angle = 0
	if (vec2.y == 0)
	{
		if (vec2.x > 0){
			angle = 90
		}
		else if (vec2.x < 0){
			angle = 270
		}
	}
	else if (vec2.x == 0){
		if (vec2.y > 0){
			angle = 0
		}
		else if (vec2.y < 0){
			angle = 180
		}
	}
	else if (vec2.y > 0 && vec2.x < 0){
		angle = Math.atan(vec2_tan)*180 / Math.pi - 90;
	}
	else if (vec2.y > 0 && vec2.x > 0){
		angle = 90 - Math.atan(vec2_tan)*180/Math.pi
	}
	else if (vec2.y < 0 && vec2.x < 0){
		angle = -Math.atan(vec2_tan)*180/Math.pi - 90;
	}
	else if (vec2.y < 0 && vec2.x > 0){
		angle = Math.atan(vec2_tan)*180/Math.pi + 90;
	}
	return angle
};

cutil.post_php_info = function (info, msg)
{
	var xhr = new cc.XMLHttpRequest()
	xhr.responseType = 0 // cc.XMLHTTPREQUEST_RESPONSE_STRING
	xhr.open("GET", "http://" + serverconfig.httpServerIP + "/log_client.php?key=" + info +   "&value=" +  msg)
	function onReadyStateChange()
	{

	}
	xhr.registerScriptHandler(onReadyStateChange)
	xhr.send()
};


cutil.post_php_feedback = function (info, msg)
{
	var xhr = new cc.XMLHttpRequest()
	xhr.responseType = 0 // cc.XMLHTTPREQUEST_RESPONSE_STRING
	xhr.open("GET", "http://" + serverconfig.httpServerIP + "/log_feedback.php?key=" + info +  "&value=" + msg)
	function onReadyStateChange(){}
	xhr.registerScriptHandler(onReadyStateChange)
	xhr.send()
};


cutil.printMessageToLogcat = function (message)
{
	if (targetPlatform === cc.PLATFORM_OS_ANDROID)
	{
        //var ok,ret  = luaj.callStaticMethod("org/cocos2dx/lua/AppActivity", "sPrintMsg", { message }, "(Ljava/lang/String;)V")
	}
};

cutil.openWebURL = function (url)
{
	if (targetPlatform == cc.PLATFORM_OS_ANDROID){
        //var ok,ret  = luaj.callStaticMethod("org/cocos2dx/lua/AppActivity", "sOpenWebURL", { url }, "(Ljava/lang/String;)V")
	}

};

cutil.get_uint32 = function (inputNum)
{
	return Math.ceil(inputNum) % 4294967294
};

cutil.schedule = function(node, callback, delay)
{
	// var delayAction = cc.DelayTime.create(delay);
	// var sequence = cc.Sequence.create(delay, cc.CallFunc.create(callback));
	// var action = cc.RepeatForever.create(sequence);
	// node.runAction(action);
	var action = cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(delay), cc.CallFunc.create(callback)));
	node.runAction(action);
	return action;
};

cutil.performWithDelay = function(node, callback, delay)
{
	var delayAction = cc.DelayTime.create(delay);
	var sequence = cc.Sequence.create(delay, cc.CallFunc.create(callback));
	node.runAction(sequence);
	return sequence;
};

cutil.binarySearch = function(targetList, val, func){
	func = func || function(x, val){return val - x;};
	var curIndex = 0;
	var fromIndex = 0;
	var toIndex = targetList.length - 1;
	while(toIndex > fromIndex){
		curIndex = Math.floor((fromIndex + toIndex) / 2);
		if (func(targetList[curIndex], val) < 0){
			toIndex = curIndex;
		}else if (func(targetList[curIndex], val) > 0){
			fromIndex = curIndex + 1;
		}else if (func(targetList[curIndex], val) === 0){
			return curIndex + 1;
		}
	}
	return toIndex;
};

cutil.get_count = function(tiles, t){
	var sum = 0;
	for(var i = 0; i < tiles.length; i++){
		if(tiles[i] === t){
			sum++;
		}
	}
	return sum;
};

// 用于调用本地时，保存回调方法的闭包
cutil.callFuncs = {};
cutil.callFuncMax = 10000;
cutil.callFuncIdx = -1;
cutil.addFunc = function(callback){
    cutil.callFuncIdx = (cutil.callFuncIdx + 1) % cutil.callFuncMax;
    cutil.callFuncs[cutil.callFuncIdx] = callback;
    return cutil.callFuncIdx;
};
cutil.runFunc = function(idx, param){
    if(cutil.callFuncs[idx]){
        (cutil.callFuncs[idx])(param);
        cutil.callFuncs[idx] = undefined;
    }
};

cutil.portraitCache = {};

cutil.loadURLTexture = function (url, callback) {
    if(cutil.portraitCache[url]){
        callback(cutil.portraitCache[url]);
        return;
    }
    var filename = encodeURIComponent(url) + ".png";
    var fid = cutil.addFunc(function(img){cutil.portraitCache[url] = img;callback(img);});
    if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
        jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "downloadAndStoreFile", "(Ljava/lang/String;Ljava/lang/String;I)V", url, filename, fid);
    } else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
        jsb.reflection.callStaticMethod("DownloaderOCBridge", "downloadAndStorePortrait:WithLocalFileName:AndFuncId:", url, filename, fid);
    } else {
        cc.loader.loadImg([url], {"isCrossOrigin":false}, function(err, img){cutil.runFunc(fid, img);});
    }
};

cutil.loadPortraitTexture = function(url, sex, callback){
	cc.log("loadPortraitTexture:", url);
    cutil.loadURLTexture(url, function (img) {
        if(img){
            callback(img);
        }else{
            if(sex === 1){
                callback("res/ui/Default/male.png");
            }else {
                callback("res/ui/Default/famale.png");
            }
        }
    })
};

cutil.captureScreenCallback = function(success, filepath){
    // 安卓截屏回调
    if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) && success){
        if (filepath.substring(filepath.length-7, filepath.length) == "_MJ.png") {
            jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "saveScreenShot", "(Ljava/lang/String;)V", filepath);
        }
        else {
            jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "callWechatShareImg", "(ZLjava/lang/String;)V", true, filepath);
        }
    }
};


cutil.get_user_info = function(accountName, callback){
	var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
	var user_info_xhr = cc.loader.getXMLHttpRequest();
    user_info_xhr.open("GET", switches.PHP_SERVER_URL + "/api/user_info", true);
    user_info_xhr.onreadystatechange = function(){
         if(user_info_xhr.readyState === 4 && user_info_xhr.status === 200){
            // cc.log(user_info_xhr.responseText);
            if(callback){
            	callback(user_info_xhr.responseText);
            }
        }
    };
    user_info_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
    user_info_xhr.send();
};

cutil.count = function(list, key){
	var dict = {}
	for (var i = 0; i < list.length; i++) {
		if (dict[list[i]]) {
			dict[list[i]] += 1;
		}else{
			dict[list[i]] = 1;
		}
	}
	if (dict[key]) {
		return dict[key]
	}
	return 0
};

cutil.postDataFormat = function(obj){
    if(typeof obj != "object" ) {
        alert("输入的参数必须是对象");
        return;
    }

    // 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的Webkit）
    if(typeof FormData == "function") {
        var data = new FormData();
        for(var attr in obj) {
            data.append(attr,obj[attr]);
        }
        return data;
    }else {
        // 不支持FormData的浏览器的处理
        var arr = new Array();
        var i = 0;
        for(var attr in obj) {
            arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
            i++;
        }
        return arr.join("&");
    }
};

cutil.spread_bind = function(invite_id, callback){
    var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
    var bind_xhr = cc.loader.getXMLHttpRequest();
    bind_xhr.open("POST", switches.PHP_SERVER_URL + "/api/spread/bind", true);
    bind_xhr.onreadystatechange = function(){
        if(bind_xhr.readyState === 4 && bind_xhr.status === 200){
            // cc.log(bind_xhr.responseText);
            if(callback){
                callback(bind_xhr.responseText);
            }
        }
    };
    bind_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
    bind_xhr.send(cutil.postDataFormat({"invite_id" : invite_id}));
};

cutil.get_pay_url = function(goods_id){
    var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
    var bind_xhr = cc.loader.getXMLHttpRequest();
    bind_xhr.open("GET", switches.PHP_SERVER_URL + "/api/z51pay/get_params?goods_id=" + goods_id.toString(), true);
    bind_xhr.onreadystatechange = function(){
        if(bind_xhr.readyState === 4 && bind_xhr.status === 200){
            // cc.log(bind_xhr.responseText);
			if(bind_xhr.responseText[0] == "{") {
				var pay_url_dict = JSON.parse(bind_xhr.responseText);
                if (pay_url_dict["errcode"] == 0) {
                    cutil.open_url(pay_url_dict["data"]);
                } else {
					cc.log("Get Pay Url Error! The Error Code is " + pay_url_dict["errcode"].toString() + "!");
				}
            } else {
				cc.log("The Pay Url is Illegall!");
			}
        }
        cutil.unlock_ui();
    };
    bind_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
    bind_xhr.send();
};

// 3X+2 卡张
cutil.isReadyMeldPairForOne = function(handTilesButKing, finalTile, kingTiles, kingTilesNum){
	if (handTilesButKing.indexOf(finalTile) < 0 || kingTiles.indexOf(finalTile) >= 0) {return false}
	var copyHandTilesButKing = handTilesButKing.concat([])
	copyHandTilesButKing.splice(handTilesButKing.indexOf(finalTile), 1)
	var tryTiles = [const_val.CHARACTER, const_val.BAMBOO, const_val.DOT, const_val.WINDS, const_val.DRAGONS]
	var readyList = []
	for (var i = 0; i < tryTiles.length; i++) {
        for (var j = 0; j < tryTiles[i].length; j++) {
        	// if (kingTiles.indexOf(tryTiles[i][j]) >= 0) {continue;} //不计算财神(财神归位)
            var tryList = copyHandTilesButKing.concat([tryTiles[i][j]])
            if (cutil.meld_with_pair_need_num(tryList, {}) <= kingTilesNum) {
                readyList.push(tryTiles[i][j])
            }
        }
    }
    return readyList.length == 1 ? true : false;
};


// 语音相关 -- start
cutil.start_record = function(filename, fid) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(switches.package_name + "/gvoice/GVoiceJavaBridge", "startRecording", "(Ljava/lang/String;I)V", filename, fid);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("GVoiceOcBridge", "startRecording:withFuncID:", filename, fid);
    }
    else {
        cc.log("not native, start_record pass");
    }
};

cutil.stop_record = function() {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(switches.package_name + "/gvoice/GVoiceJavaBridge", "stopRecording", "()V");
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("GVoiceOcBridge", "stopRecording");
    }
    else {
        cc.log("not native, stop_record pass");
    }
};

cutil.download_voice = function(fileID) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(switches.package_name + "/gvoice/GVoiceJavaBridge", "downloadVoice", "(Ljava/lang/String;)V", fileID);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("GVoiceOcBridge", "downloadVoiceWithID:", fileID);
    }
    else {
        cc.log("not native, download_voice pass");
    }
};
// 语音相关 -- end

// 定位相关 -- start
cutil.start_location = function() {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "startLocation", "()V");
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("AMapOCBridge", "startLocation");
    }
    else {
        cc.log("not native, start_location pass");
    }
};
cutil.get_location_geo = function() {
    // G_LOCATION_GEO
	return cc.sys.localStorage.getItem("G_LOCATION_GEO");
};

cutil.get_location_lat = function() {
    // G_LOCATION_LAT
    return cc.sys.localStorage.getItem("G_LOCATION_LAT");
};

cutil.get_location_lng = function() {
    // G_LOCATION_LNG
    return cc.sys.localStorage.getItem("G_LOCATION_LNG");
};
cutil.calc_distance = function(lat1, lng1, lat2, lng2) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod(switches.package_name + "/util/UtilJavaBridge", "calcDistance", "(FFFF)F", lat1, lng1, lat2, lng2);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod("UtilOcBridge", "calcDistanceFromLat:Lng:ToLat:Lng:", lat1, lng1, lat2, lng2);
    }
    else {
        cc.log("not native, calc_distance pass");
    }
};

cutil.open_url = function(url) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "openURL", "(Ljava/lang/String;)V", url);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        jsb.reflection.callStaticMethod("UtilOcBridge", "openURL:", url);
    }
    else {
        cc.log("not native, open_url pass");
    }
};

cutil.get_playing_room_detail = function (room_info) {
	var str_list = [];

    str_list.push(room_info["game_round"] + "局");

    if(room_info['pay_mode'] === const_val.AA_PAY_MODE){
        str_list.push("AA支付");
    } else if(room_info['pay_mode'] === const_val.AGENT_PAY_MODE){
        str_list.push("代理支付");
    } else if(room_info['pay_mode'] === const_val.CLUB_PAY_MODE){
        str_list.push("楼主支付");
    } else if(room_info['pay_mode'] === const_val.NORMAL_PAY_MODE){
        str_list.push("房主支付");
    }

    switch (room_info.lucky_poker){
        case 19:
            str_list.push("马牌黑桃5");
            break;
        case 39:
            str_list.push("马牌黑桃10");
            break;
        case 55:
            str_list.push("马牌黑桃A");
            break;
        default:
            str_list.push("无马牌");
            break
    }

	return str_list.join(',');
};

cutil.get_agent_room_desc = function (room_info) {
	var str_list = [];

    if(room_info['pay_mode'] === const_val.AA_PAY_MODE){
        str_list.push("AA支付");
    } else if(room_info['pay_mode'] === const_val.AGENT_PAY_MODE){
        str_list.push("代理支付");
    } else if(room_info['pay_mode'] === const_val.CLUB_PAY_MODE){
        str_list.push("楼主支付");
    } else if(room_info['pay_mode'] === const_val.NORMAL_PAY_MODE){
        str_list.push("房主支付");
    }

	str_list.push(room_info["game_round"] + "局");

    switch (room_info.lucky_poker){
        case 19:
            str_list.push("马牌黑桃5");
            break;
        case 39:
            str_list.push("马牌黑桃10");
            break;
        case 55:
            str_list.push("马牌黑桃A");
            break;
        default:
            str_list.push("无马牌");
            break
    }

	if (room_info['hand_prepare'] === const_val.AUTO_PREPARE) {
		str_list.push("自动准备");
	} else {
		str_list.push("手动准备");
	}

	return str_list.join(',');
};

cutil.getOpenUrlIntentData = function (action) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "getOpenUrlIntentData", "(Ljava/lang/String;)Ljava/lang/String;", action);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod("UtilOcBridge", "getOpenUrlIntentData:", action);
    }
    else {
        cc.log('pass getOpenUrlIntentData');
    }
};

cutil.clearOpenUrlIntentData = function () {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "clearOpenUrlIntentData", "()V");
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod("UtilOcBridge", "clearOpenUrlIntentData");
    }
    else {
        cc.log('pass clearOpenUrlIntentData');
    }
};

cutil.callEnterRoom = function (roomId) {
    if (roomId == undefined) {
        let player = h1global.player();
        if(player){
            roomId = cutil.getOpenUrlIntentData("joinroom");
            if (!roomId || roomId.length === 0) {
                cc.warn('cutil.callEnterRoom error');
                return;
            }
        }
    }
    if (cutil.isPositiveNumber(roomId)) {
        let rid = parseInt(roomId);
        let scene = cc.director.getRunningScene();
        if (scene.className !== 'GameRoomScene') {
            let player = h1global.player();
            if (player) {
                cutil.lock_ui();
                player.enterRoom(rid);
            }
        }
    }
};

cutil.clearEnterRoom = function () {
    cutil.clearOpenUrlIntentData();
};

cutil.registerGameShowEvent= function () {
    if(cc._event_show_func){
        return;
    }
    cc._event_show_func = function () {
        cutil.callEnterRoom();
    };
    cc.eventManager.addCustomListener(cc.game.EVENT_INTENT, cc._event_show_func);
};

//复制到剪贴板
cutil.copyToClipBoard = function(content) {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod(switchesnin1.package_name + "/AppActivity", "copyToClipBoard", "(Ljava/lang/String;)V", content);
    }
    else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
        return jsb.reflection.callStaticMethod("UtilOcBridge", "copyToClipBoard:", content);
    }
    else {
        cc.log("not native, copyToClipBoard pass");
    }
};

cutil.wechatTimelineCallback = function(){
    // 微信分享成功回调
    var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
    var bind_xhr = cc.loader.getXMLHttpRequest();
    bind_xhr.open("POST", switchesnin1.PHP_SERVER_URL + "/api/share_award", true);
    bind_xhr.onreadystatechange = function(){
        if(bind_xhr.readyState === 4 && bind_xhr.status === 200){
            if(h1global.curUIMgr.gamehall_ui && h1global.curUIMgr.gamehall_ui.is_show){
                h1global.curUIMgr.gamehall_ui.updateCharacterCard();
            }
        }
    };
    bind_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
    bind_xhr.send();
    cc.sys.localStorage.setItem("LAST_TIMELINE_DATE", new Date().toLocaleDateString());
};

cutil.get_award = function(accountName, callback){
    var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
    var user_info_xhr = cc.loader.getXMLHttpRequest();
    user_info_xhr.open("POST", switches.PHP_SERVER_URL + "/api/spread/get_award", true);
    user_info_xhr.onreadystatechange = function(){
        if(user_info_xhr.readyState === 4 && user_info_xhr.status === 200){
            // cc.log(user_info_xhr.responseText);
            if(callback){
                callback(user_info_xhr.responseText);
            }
        }
    };
    user_info_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
    user_info_xhr.send();
};

cutil.get_club_share_desc = function (room_info) {
    var str_list = [];

    str_list.push(room_info["game_round"] + "局");

    if(room_info['pay_mode'] === const_val.AA_PAY_MODE){
        str_list.push("AA支付");
    } else if(room_info['pay_mode'] === const_val.AGENT_PAY_MODE){
        str_list.push("代理支付");
    } else if(room_info['pay_mode'] === const_val.CLUB_PAY_MODE){
        str_list.push("楼主支付");
    } else if(room_info['pay_mode'] === const_val.NORMAL_PAY_MODE){
        str_list.push("房主支付");
    }

    switch (room_info.lucky_poker){
        case 19:
            str_list.push("马牌黑桃5");
            break;
        case 39:
            str_list.push("马牌黑桃10");
            break;
        case 55:
            str_list.push("马牌黑桃A");
            break;
        default:
            str_list.push("无马牌");
            break
    }

    if (room_info['hand_prepare'] === const_val.AUTO_PREPARE) {
        str_list.push("自动准备");
    } else {
        str_list.push("手动准备");
    }

    return str_list.join(',');
};

//battery
cutil.getBattery = function () {
	if ((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
		return jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "getBattery", "()I");
	} else if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
		return jsb.reflection.callStaticMethod("UtilOcBridge", "getBattery");
	} else {
		cc.warn("not support getBattery");
		return 50;
	}
};

cutil.getShareTitleDesc = function (data) {
	cc.log(data)
	var str_list = [];
	str_list.push(data.game_round.toString() + "局");

    if(data.pay_mode === const_val.AA_PAY_MODE){
        str_list.push("AA支付");
    } else if(data.pay_mode === const_val.AGENT_PAY_MODE){
        str_list.push("代理支付");
    } else if(data.pay_mode === const_val.CLUB_PAY_MODE){
        str_list.push("楼主支付");
    } else if(data.pay_mode === const_val.NORMAL_PAY_MODE){
        str_list.push("房主支付");
    }

    switch (data.lucky_poker){
        case 19:
            str_list.push("马牌黑桃5");
            break;
        case 39:
            str_list.push("马牌黑桃10");
            break;
        case 55:
            str_list.push("马牌黑桃A");
            break;
        default:
            str_list.push("无马牌");
            break
    }

    if (data.hand_prepare === const_val.AUTO_PREPARE) {
        str_list.push("自动准备");
    } else {
        str_list.push("手动准备");
    }

    return {
    	"title" : '十三张 ' + (data.club_id > 0 ? '茶楼号【' + data.club_id.toString() + '】' : '房间号【' + data.roomId.toString() + '】'),
		"desc"	: str_list.join(',')
	}
};