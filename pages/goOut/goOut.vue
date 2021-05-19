<template>
	<view class="basement">
		 <uni-forms ref="form" :value="formData" :rules="rules" label-position="top" >
					<uni-forms-item label="申请人 :" name="name" label-position="left">
						<input class="uni-input" type="text" disabled v-model="formData.name" />
					</uni-forms-item>
		            <uni-forms-item label="外出地点:" name="adderss">
		                <input class="uni-input" type="text" v-model="formData.adderss" placeholder="请填写外出地点" />
						<!-- <uni-icons type="cart"></uni-icons> -->
		            </uni-forms-item>
		            <uni-forms-item label="外出事由:" name="email" >
		                <!-- <input class="input" v-model="formData.email" type="text" placeholder="请输入用户名" @input="binddata('email',$event.detail.value)" /> -->
						<input class="uni-input" v-model="formData.reason" type="text" placeholder="请填写外出事由" />
		            </uni-forms-item>
					<uni-forms-item label="开始时间:" name="name">
					     <uni-datetime-picker :border='false' v-model="formData.starTime" return-type="timestamp" start="1276129830000" end="1723285030000" @change="timestampChange" placeholder="请选择开始时间" />
					</uni-forms-item>
					<uni-forms-item label="结束时间:" name="name" >
						<uni-datetime-picker :border='false'  :value="formData.endTime" return-type="timestamp" start="1276129830000" end="1723285030000" @change="timestampChange" placeholder="请选择结束时间" />
					</uni-forms-item>
					<uni-forms-item label="时长(天):" name="name" >
						<input class="uni-input" :value="formData.length" disabled type="text" placeholder="请填写外出事由" />
					</uni-forms-item>
					<uni-forms-item label="审批人:" name="approval">
					    
					</uni-forms-item>
		            <button @click="submit" type="primary" class="submitBtn">提交	</button>
		        </uni-forms>
	</view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: 'LiMing',
				reason:'',
				starTime: '',
				endTime:'',
				adderss:'',
				length: '',
                approval: ''
            },
            rules: {
                // 对name字段进行必填验证
                name: {
                    rules: [{
                            required: true,
                            errorMessage: '请输入姓名',
                        },
                        {
                            minLength: 3,
                            maxLength: 5,
                            errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
                        }
                    ]
                },
                // 对email字段进行必填验证
                email: {
                    rules: [{
                        format: 'email',
                        errorMessage: '请输入正确的邮箱地址',
                    }]
                }
            }
        }
    },
    methods: {
        /**
         * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
         * @param {String} name 字段名称
         * @param {String} value 表单域的值
         */
        // binddata(name,value){
        // 通过 input 事件设置表单指定 name 的值
        //   this.$refs.form.setValue(name, value)
        // },
        // 触发提交表单
        submit() {
            this.$refs.form.submit().then(res=>{
                console.log('表单数据信息：', res);
            }).catch(err =>{
                console.log('表单错误信息：', err);
            })
        },
		timestampChange(e) {
			 console.log('picker发送选择改变，携带值为', e)
			 //this.index = e.target.value
		}
    }
}
</script>

<style scoped>
	.basement {
		width: 100%;
		height: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	/* input {
		border: 0;
		border-color: #fff;
	} */
	/deep/ .uni-forms-item__inner {
		padding: 0;
		margin: 0;
		border-bottom: 1px solid #eee;
	}
	/deep/.uni-forms-item__content {
		display: flex;
		align-items: center;
		
	}
	.submitBtn {
		margin-top: 18px;
	}
</style>
