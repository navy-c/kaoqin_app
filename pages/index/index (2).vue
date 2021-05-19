<template>
	<view class="content">
		<reserve-date 
			@changeDay='changeDay' 
			@changeMonth='changeMonth' 
			:startDate='startDate' 
			:price='price' 
			:isNowDate='isNowDate'
			:disableBefore='disableBefore' 
			:endDate='endDate' 
			:singleElection='singleElection' 
			:date='date'
		/>
	</view>
</template>

<script>
	import reserveDate from '@/components/reserve-date/reserve-date.vue'
	export default {
		data() {
			return {
				date: '2019-5-30',
				price: {
					type: true,
					data: []
				},
				isNowDate: true,
				disableBefore: false ,
				endDate: '',
				startDate: '',
				singleElection: false
			}
		},
		mounted() {
			this.changeMonth(['', '', 31])
		},
		methods: {
			// 日期改变
			changeDay(date) {
				console.log(date)
			},
			// 月改变
			changeMonth(data) {
				if (!this.price.type) return false
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let price = []
				setTimeout(() => {
					this.price.data = []
					for (let i = 0; i < data[2]; i++) {
						price.push(parseInt(Math.random() * 1000))
					}
					this.price.data = price
					uni.hideLoading()
				}, 1500)
			}
		},
		components: {
			reserveDate
		}
	}
</script>
