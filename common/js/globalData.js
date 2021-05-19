// import Vue from "vue"
// import {Client, Message} from './paho-mqtt-min.js'
// let client = null
// //let countNum = 0
// //let listenMqttTimer = null
// // 开启订阅（登录成功后调用）
// export const startMqtt = function() {
// 	
// 	if(client && client.isConnected()) {
// 		console.log('不要重复连接')	
// 
// 		//devices.forEach(function(v, i) {
// 			//console.log(v.device_id)
// 			//client.subscribe("syniot/pump/" + v.device_id + "/pArg", {
// 			//	qos: 0
// 			//})
// 			//client.subscribe("syniot/pump/" + v.device_id + "/cArg", {
// 				//qos: 0
// 			//})
// 		//})
// 			
// 		return
// 	}
// 	client = new Client('wss://mqtt.syniot.cn/mqtt', 'wx_' + Math.random().toString(16).substr(2, 8))
// 	client.connect({
// 	  timeout: 4000,
// 	  useSSL: true,
// 	  userName: "syniot",
// 	  password: "syniot",
// 	  cleanSession: true,
// 	  keepAliveInterval: 5,
// 	  //reconnect: true,
// 	  mqttVersion: 4,
// 	  onSuccess: function() {
// 		console.log('connected')		
// 		//监听关闭
// 		client.onConnectionLost = function(responseObject) {
// 		  if (responseObject.errorCode !== 0) {
// 			console.log("onConnectionLost:" + responseObject.errorMessage);
// 		  }
// 		}	
// 	  },
// 	 onFailure: function() {
// 		//countNum = 0
// 		console.log('连接失败')
// 	 }
// 	})
//   Vue.prototype.$mqtt = client    // 方便在vue组件中可以直接使用this.$mqtt -> client
//  
// }
// 