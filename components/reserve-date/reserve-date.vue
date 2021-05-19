<template>
	<view class="content">
		<view class="body">
			<view class="head-body">
				<!-- <text class="date-head">{{swiperData.year}}年{{swiperData.month}}月</text>
				<view>
					<view class='pr40' style="display: inline-block;">
						<uni-icon type="arrowup" size='26' color='#fff' @click='prevDeta'/>
						2
						</view>
					<view style="display: inline-block;">
						<uni-icon type="arrowdown" size='26' color='#fff' @click='nextDate' />
						1
					</view>
				</view> -->
			</view>
			<view class="mian-body">
				<!-- 星期 -->
				<view class="week_day">
				<view  class="mian-bolck"> <text>日</text> </view>
				<view  class="mian-bolck"> <text>一</text> </view>
				<view  class="mian-bolck"> <text>二</text> </view>
				<view  class="mian-bolck"> <text>三</text> </view>
				<view  class="mian-bolck"> <text>四</text> </view>
				<view  class="mian-bolck"> <text>五</text> </view>
				<view  class="mian-bolck"> <text>六</text> </view>
				</view>
				<!-- 日 -->
				<view v-for="(val, index) in swiperData.dateDay"  class="mian-bolck" :class="val.disable == true ? 'disable' : val.Choice == true ? 'Choice' : ''"
				 @click="ChoiceDate(index, val.disable)" :key='index'>
					<view class="border">
						<text class="day">{{val.day}}</text>
						<text class="price" v-show="val.priceType">
						<text style="visibility: hidden;" v-if='!val.price'>￥</text>
						{{val.price == undefined ? '' : "￥" + val.price}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperData: {},
				year: '',
				month: '',
				day: '',
				storageDate: []
			}
		},
		props: {
			// 当前日期
			date: {
				type: String,
				default: () => {
					let _dateData = new Date(),
						_date = `${_dateData.getFullYear()}-${_dateData.getMonth() + 1}-${_dateData.getDate()}`
					return _date
				}
			},
			// 禁用开始之前日期
			startDate: {
				type: String,
				default: ''
			},
			// 禁用开始之后日期
			endDate: {
				type: String,
				default: ''
			},
			// 是否禁用今天之前的日期
			disableBefore: {
				type: Boolean,
				default: false
			},
			// 价格
			price: {
				type: Object,
				default: () => {
					return {type: false, data: []}
				}
			},
			// 是否选择默认日期
			isNowDate: {
				type: Boolean,
				default: true
			},
			// 单选或多选
			singleElection: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			PriceData: {
				get() {
					return this.price.data
				}
			}
		},
		created() {
			let dateArr = this.date.split('-')
			if (this.date != '' && dateArr.length == 3) {
				// 初始化年月日
				this.year = Number(dateArr[0])
				this.month = Number(dateArr[1])
				this.day = Number(dateArr[2])
				this.InitializationHomeDate(true).then((val) => {
					this.Preprocessing(dateArr)
				})
			} else {
				console.error('error 请检查传入日期是否正确,如: 2021-5-12')
			}
		},
		methods: {
			// 是否添加初始化日期
			InitializationHomeDate(type) {
				// 指定日期
				let ThisDate = this.compareDate(this.date)
				// 禁用开始时间
				let startDate = this.compareDate(this.startDate)
				// 禁用结束时间
				let endDate = this.compareDate(this.endDate)
				// 当前日期
				let _date = new Date()
				let currDate = this.compareDate(`${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`)
				return new Promise((resolve, reject) => {
					let judge = (this.disableBefore == false && this.startDate == '' && this.endDate == '') || // 没有任何禁止
											(this.disableBefore == true && ThisDate >= currDate) || // 是否禁用今天之前的日期
											(ThisDate >= startDate && this.disableBefore == false && this.startDate != '') || // 禁用只有开始时间，没有结束时间
											(ThisDate <= endDate && this.disableBefore == false && this.endDate != '') || // 禁用只有结束时间，没有开始时间
											(ThisDate <= endDate && this.disableBefore == false && ThisDate >= startDate && this.startDate != '' &&this.endDate != '') // 禁用结束时间，开始时间
					if (this.isNowDate == false) {
						resolve(true)
						return false
					} else if (judge && type) {
						this.storageDate.push({date: this.date})
					}
					resolve(true)
				})
			},
			// 时间转换为时间戳
			compareDate(s1) {
				let curTime = new Date();
				//把字符串格式转化为日期类
				return s1 ? new Date(s1).valueOf() : false
			},
			// 上一个月
			prevDeta() {
				let dateLen = new Date(this.year, this.month - 1, 0).getDate()
				this.month = Number(this.month) - 1
				if (this.month == 0) {
					this.month = 12
					this.year = Number(this.year) - 1
				}
				this.Preprocessing([this.year, this.month, this.day])
				if (this.price.type) {
					this.$emit('changeMonth', [this.year, this.month, dateLen])
				}
			},
			// 下一个月
			nextDate() {
				let dateLen = new Date(this.year, this.month - 1, 0).getDate()
				this.month = 1 + Number(this.month)
				if (this.month == 13) {
					this.month = 1
					this.year = 1 + Number(this.year)
				}
				this.Preprocessing([this.year, this.month, this.day])
				if (this.price.type) {
					this.$emit('changeMonth', [this.year, this.month, dateLen])
				}
			},
			// 数据发布
			ChoiceDate(index, disable) {
				
				let day = this.swiperData.dateDay[index].day
				let _Choice = this.swiperData.dateDay[index].Choice
				
				let _date = {}
				if (this.price.type == true) {
					_date = {date: `${this.swiperData.year}-${this.swiperData.month}-${day}`, price:  this.swiperData.dateDay[index].price}
				} else {
					_date = {date: `${this.swiperData.year}-${this.swiperData.month}-${day}`}
				}
				
				if (disable != true) {
					// 添加数据
					if (JSON.stringify(this.storageDate).indexOf(_date.date) == -1) {
						// 单选还是多选
						if (this.singleElection == true) {
							this.storageDate = []
							this.swiperData.dateDay.forEach((val, inde) => {
								val.Choice = false
							})
						// 多选
						}
						
						this.storageDate.push(_date)
						
					// 删除数据
					} else {
						this.storageDate = this.storageDate.filter((val, index) => {
							if (val.date != _date.date) {
								return val
							}
						})
					}
					this.swiperData.dateDay[index].Choice = !_Choice
					this.$emit('changeDay', this.storageDate)
				}
			console.log(typeof(_date.price) == 'undefined');
			if(_date.price == 'undefined' || _date.price ==''  || _date.price == null  || typeof(_date.price) == 'undefined'){
			}else{
				uni.navigateTo({
							 url:'./dailyEffect?data='+JSON.stringify(_date)
				 });
			}
			
			},
			// 日期初始化
			Preprocessing(arr) {
				let swiperData = {}
				this.getDay(`${arr[0]}-${arr[1]}-${arr[2]}`).then((val) => {
					swiperData = val
					this.$emit('changeDay', this.storageDate)
					this.$set(this, 'swiperData', swiperData)
				})
			},
			// 判断当前是 安卓还是ios ，传入不容的日期格式
			judgeDate(dateData) {
				if (typeof dateData !== 'object') {
					dateData = dateData.replace(/-/g, '/')
				}
				return dateData
			},
			// 循环上个月末尾几天添加到数组
			getDay(dateData) {
				dateData = this.judgeDate(dateData)
				// 获取年，月，日，星期
				let _date = new Date(dateData),
					year = _date.getFullYear(),
					month = _date.getMonth() + 1,
					date = _date.getDate(),
					day = _date.getDay()

				return new Promise((resolve, reject) => {
					//获取上个月末尾几天
					let prevDayArr = [],
						prevDayLength = new Date(year, month - 1, 1).getDay()
					for (let i = prevDayLength; i > 0; i--) {
						let prevDay = new Date(year, month - 1, -i + 1).getDate()
						prevDayArr.push({
							day: prevDay,
							disable: true,
							Choice: false
						})
					}

					// 获取本月
					let thisDayArr = [],
						thisDaylength = new Date(year, month - 1, 0).getDate()
					for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
						thisDayArr.push({
							day: i,
							disable: false,
							Choice: false,
							price: this.price.data[i-1],
							priceType: this.price.type
						})
						// 重绘已选择日期
						this.storageDate.forEach((val, index) => {
							let valArr = val.date.split('-');
							if (year == valArr[0] && month == valArr[1] && i == valArr[2]) {
								thisDayArr[i - 1].Choice = true
								val.price = this.price.data[i-1]
							}
						})
					}
					

					// 获取下个月开始几天
					let nextDayArr = [],
						nextDaylength = 42 - (prevDayArr.length + thisDayArr.length)
					for (let i = 1; i < nextDaylength + 1; i++) {
						nextDayArr.push({
							day: i,
							disable: true,
							Choice: false
						})
					}

					// 数据合并
					let dateShow = []
					dateShow = dateShow.concat(prevDayArr, thisDayArr, nextDayArr)

					// 禁用今天之前的日期
					if (this.disableBefore) {
						let __beForeDeta = new Date(),
							dDate = `${__beForeDeta.getFullYear()}-${__beForeDeta.getMonth() + 1}-${__beForeDeta.getDate()}`
						this.disableDatePrevFn(dateShow, dDate.split('-'), year, month).then((val) => {
							resolve({
								dateDay: val,
								year: year,
								month: month
							})
						})
						// 禁用双向指定范围可用
					} else if (this.startDate != '' && this.endDate != '') {
						let startDateArr = this.startDate.split('-')
						let endDateArr = this.endDate.split('-')
						if (startDateArr.length == 3 && endDateArr.length == 3) {
							this.disableDatePrevFn(dateShow, startDateArr, year, month).then((val) => {
								return this.disableDateNextFn(val, endDateArr, year, month)
							}).then((val) => {
								resolve({
									dateDay: val,
									year: year,
									month: month
								})
							})
						} else if (endDateArr.length != 3) {
							console.error('error 日期选择范围-结束日期错误,如: 2019-5-12')
							if (startDateArr.length != 3) {
								console.error('error 日期选择范围-开始日期错误,如: 2019-5-12')
							}
						}
						// 禁用开始日期之前
					} else if (this.startDate != '') {
						let startDateArr = this.startDate.split('-')
						if (startDateArr.length == 3) {
							this.disableDatePrevFn(dateShow, startDateArr, year, month).then((val) => {
								resolve({
									dateDay: val,
									year: year,
									month: month
								})
							})
						} else {
							console.error('error 日期选择范围-开始日期错误,如: 2019-5-12')
						}
						// 禁用结束日期之前
					} else if (this.endDate != '') {
						let endDateArr = this.endDate.split('-')
						if (endDateArr.length == 3) {
							this.disableDateNextFn(dateShow, endDateArr, year, month).then((val) => {
								resolve({
									dateDay: val,
									year: year,
									month: month
								})
							})
						} else {
							console.error('error 日期选择范围-结束日期错误,如: 2019-5-12')
						}
						// 不禁用
					} else {
						this.disableDatePrevFn(dateShow, new Array(3), year, month).then((val) => {
							resolve({
								dateDay: val,
								year: year,
								month: month
							})
						})
					}
				})
			},
			// 禁用指定日期之前的日期
			disableDatePrevFn() {
				let DateObj = arguments,
					dateShow = DateObj[0],
					dDate = DateObj[1],
					year = DateObj[2],
					month = DateObj[3]
				return new Promise((resolve, reject) => {
					dateShow = dateShow.map((val, index) => {
						if (dDate[0] > year) {
							val.disable = true
						} else if (dDate[1] > month && dDate[0] >= year) {
							val.disable = true
						} else if (dDate[0] >= year && dDate[2] > val.day && dDate[1] >= month) {
							val.disable = true
						}
						return val
					})
					resolve(dateShow)
				})
			},
			// 禁用指定日期之后的日期
			disableDateNextFn() {
				let DateObj = arguments,
					dateShow = DateObj[0],
					dDate = DateObj[1],
					year = DateObj[2],
					month = DateObj[3]
				return new Promise((resolve, reject) => {
					dateShow = dateShow.map((val, index) => {
						if (dDate[0] < year) {
							val.disable = true
						} else if (dDate[0] <= year && dDate[1] < month) {
							val.disable = true
						} else if (dDate[0] <= year && dDate[1] <= month && dDate[2] < val.day) {
							val.disable = true
						}
						return val
					})
					resolve(dateShow)
				})
			},

		},
		components: {
		
		},
		watch: {
			'PriceData': {
				handler(newData, oldData) {
					this.InitializationHomeDate(false).then((val) => {
						this.Preprocessing([this.year, this.month, this.day])
					})
				},
				immediate: false,
				deep: true
			}
		}
	}
</script>

<style scoped>
	.content {
		
	}
	.body {
		width: 100%;
		background: #fff;
		background-color: rgba(240,240,240,.3);
		border-radius: 20upx 20upx 0 0;
	}
	.head-body {
		display: none;
		/* // display: flex; */
		flex-direction: row;
		height: 41px;
		box-sizing: border-box;
		padding: 5px 30upx 10px 30upx;
		justify-content: space-between;
	
		/* // .date-head {
		// 	font-size: 36upx;
		// 	color: #fff;
		// 	// line-height: 26px;
		// 	letter-spacing: 1px;
		// 	text{
		// 		font-size: 36upx;
		// 	}
		// } */
	}
	.pr40 {
		padding-right: 40upx;
	}
	.mian-body {
		width: 100%;
		height: calc(100% - 46px);
		color: #000;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
	.mian-bolck {
		width: calc(100% / 7 - 10upx);
		padding: 4upx 0;
		min-height: calc(750upx / 7 - 28upx);
		box-sizing: border-box;
		font-size: 34upx;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		margin:2.5upx 5upx;
		cursor: pointer;
	}
	
	.week_day{
		width: 100%;
		padding: 8upx 0;
		min-height: calc(750upx / 7 - 26upx);
		box-sizing: border-box;
		font-size: 34upx;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		margin: 5upx;
		cursor: pointer;
		background-color: #73a9c5;
		color: #fff;
		border-radius: 10px 10px 0 0;
	}
	.mian-bolck .border {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: #f8f2e0;
	}
	.border .price{
		font-size: 24upx;
	}
	.day{
		width: 100%;
	}
	.day text{
		font-size: 36upx;
	}
	.disable {
		color: transparent;
		visibility: hidden;
	}
	.Choice {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		color: #0078d7;
		box-sizing: border-box;
		
	}
</style>
