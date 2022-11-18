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
  </div>
</template>
<script lang="ts">
export default {
	name: "Address",
};
</script>

<script setup lang='ts'>
import { ref } from 'vue'

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

const handleChangeAdd = (id: number) => {
  userAddressList.value.map(n => {
    n.selected = false
    if (n.id === id) {
      n.selected = true
    }
  })
}

// 添加收货地址
const handleAdd = () => {

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