<template>
  <div class="address-wrap">
    <div class="title">
      <h5 class="receive">收件人信息</h5>
      <span class="add" @click="handleAdd">新增收货地址</span>
    </div>
    <div
      v-for="user in userAddressList"
      :key="user.id"
      class="address clearFix"
    >
      <span @click="handleChangeAdd(user.id)" :class="{ username: true, selected: user.selected }">
        {{ user.consignee }}
      </span>
      <div class="add-item">
        <div>
          <span class="s1">{{ user.deliveryAddress }}</span>
          <span class="s2">{{ user.consigneeTel }}</span>
          <span v-if="user.isDefault" class="s3">默认地址</span>
        </div>

        <div class="options">
          <span @click="handleSetDefault(user)" v-if="!user.isDefault">设为默认地址</span>
          <span>编辑</span>
          <span>删除</span>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="showModal"
      style="width: 700px"
      preset="card"
      title="收货地址"
      positive-text="确认"
      negative-text="取消"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >
      <n-form 
        label-placement="left"
        label-width="auto"
        :rules="rules"
      >
        <n-form-item label="收货人" path="consignee">
          <n-input placeholder="请输入用户名" v-model:value="modal.consignee"></n-input>
        </n-form-item>
        <n-form-item label="联系电话" path="phoneNum">
          <n-input placeholder="请输入联系电话" v-model:value="modal.phoneNum"></n-input>
        </n-form-item>
        <n-form-item label="所在地区" path="region">
          <n-input placeholder="" v-model:value="modal.region"></n-input>
        </n-form-item>
        <n-form-item label="详细地址" path="userAddress">
          <n-input placeholder="请输入详细地址" v-model:value="modal.userAddress"></n-input>
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>
<script lang="ts">
export default {
	name: "Address",
};
</script>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { findUserAddressList, findBaseRegion } from "@/api/address";
import { NModal, NForm, NFormItem,NInput, FormItemRule } from 'naive-ui'
// const message = useMessage()
const userAddressList = ref([
  {
    id: 1,
    selected: true,
    consignee: "静哥", // 收件人姓名
    consigneeTel: "13814389438", // 收件人电话
    deliveryAddress: "深圳宝安后瑞洗脚城", // 收件人地址
    isDefault: 1,
  },
  {
    id: 2,
    selected: false,
    consignee: "陶哥", // 收件人姓名
    consigneeTel: "13022222222", // 收件人电话
    deliveryAddress: "深圳宝安后瑞王者峡谷", // 收件人地址
    isDefault: 0,
  },
  {
    id: 3,
    selected: false,
    consignee: "罗哥", // 收件人姓名
    consigneeTel: "13033333333", // 收件人电话
    deliveryAddress: "深圳宝安龙华区大保健", // 收件人地址
    isDefault: 0,
  },
])

const showModal = ref(false)

const modal = ref({
  consignee: null,
  phoneNum: null,
  userAddress: null,
  region: null
})

const rules = {
  consignee: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入收货人'
  },
  phoneNum: {
    required: true,
    trigger: ['blur', 'input'],
    validator (rule: FormItemRule, value: number) {
      const phoneReg = /^1[3-9][0-9]{9}$/;
      if (!value) {
        return false;
      }
      // 表单校验失败，返回值就是失败原因
      if (!phoneReg.test(value + '')) {
        return false;
      }
      return true;
    },
    message: '请输入电话号码'
  },
  region: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入所在地区'
  },
  userAddress: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入详细地址'
  },
}

// 切换收货地址
const handleChangeAdd = (id: number) => {
  userAddressList.value.map(n => {
    n.selected = false
    if (n.id === id) {
      n.selected = true
    }
  })
}

// 关闭modal
const cancelCallback = () => {
  // message.success("Cancel");
}

const submitCallback = () => {

}

// 添加收货地址
const handleAdd = () => {
  showModal.value = true
}

// 设为默认地址
const handleSetDefault = (item: any) => {
  console.log(item.id);
  
  userAddressList.value.map(n => {
    n.isDefault = 0;
    if(n.id === item.id) {
      n.isDefault = 1;
    }
  }) 
}

const getAddList = async () => {
  const res = await findUserAddressList()
  console.log(res);
}

const getReginList = async () => {
  const res = await findBaseRegion()
}

onMounted(() => {
  getAddList()
  getReginList()
})
</script>

<style lang="less" scoped>

.address-wrap {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
      line-height: 50px;
    };
    .add {
      color: #005ea7;
      cursor: pointer;
    }
    .add:hover {
      color: red;
    }
  }
  .address {
			padding-left: 20px;
			margin-bottom: 15px;

			.username {
				float: left;
				width: 100px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border: 2px solid #ddd;
				position: relative;
			}

			.username.selected {
				border-color: #e1251b;
			}

			.username.selected::after {
        content: '';
        position: absolute;
        right: -2px;
        bottom: -2px;
        width: 14px;
        height: 14px;
        overflow: hidden;
        background: url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
			}

			.add-item {
				width: 610px;
				float: left;
				line-height: 30px;
				margin-left: 10px;
				padding-left: 5px;
				cursor: pointer;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
				.s1 {
					float: left;
				}

				.s2 {
					float: left;
					margin: 0 5px;
				}

				.s3 {
					float: left;
					width: 56px;
					height: 24px;
					line-height: 24px;
					margin-left: 10px;
					background-color: #878787;
					color: #fff;
					margin-top: 3px;
					text-align: center;
				}

        .options {
          color: #005ea7;
          display: none;
          span {
            margin-right: 8px;
          }
          span:hover {
            color: red;
          }
        }
			}

			.add-item:hover {
				background-color: #fff3f3;
			}

      .add-item:hover .options {
        display: block;
      }
		}
}

	
</style>