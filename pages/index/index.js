export function handleSignClick(){
	console.log(1)
}
// 本地存储打卡信息
export function setSignInfo(info){
	var signInfo = {main:[info]}
	uni.setStorageSync("signInfo",JSON.stringify(signInfo));
}
// 本地添加打卡信息
export function addSignInfo(info,sign){
	sign.main.push(info);
	uni.setStorageSync("signInfo",JSON.stringify(sign));
}
// 本地获取打卡信息
export function getSignInfo(){
	let sign = uni.getStorageSync("signInfo");
	if(!sign){
		return;
	}
	return JSON.parse(sign)
}
// 本地打卡信息清理
export function delSignInfo(){
	uni.removeStorage({
		key: 'signInfo',
		success(){
			uni.showToast({title:"重置成功"})
		}
	});
}
// 打卡信息
export function getInfo(signInfo){
	var nowT = new Date();
	var info = {mode:signInfo.mode, nowT:nowT,address:signInfo.address,time:signInfo.time,latitude:signInfo.latitude,longitude:signInfo.longitude,remarks:signInfo.remarks};
	return info;
}

// 腾讯位置服务key 值
export const key = "SOEBZ-J2BHS-7YSOI-64K33-6RO65-G2FEJ";


