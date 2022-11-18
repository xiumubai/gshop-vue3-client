<template>
  <div class="pay-wrap">
    <div class="title">
      <h5>支付方式</h5>
    </div>
    <div class="pay clearFix">
      <div 
        @click="handleChange(item)"
        v-for="item in payTypesList" 
        :class="[{ selected : item.selected }, 'pay-item' ]" 
        :key="item.id"
      >
        <span>{{item.title}}</span>
        <b v-if="item.selected"></b>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
	name: "Pay",
};
</script>

<script setup lang='ts'>
import { ref } from 'vue'

const payTypesList = ref([
  {
    id: 1,
    key: 'online',
    title: '在线支付',
    selected: true
  },
  {
    id: 2,
    key: 'offline',
    title: '货到付款',
    selected: false
  }
])

const handleChange = (item: any) => {
  console.log(item.id);
  payTypesList.value.map(n => {
    n.selected = false
    if (n.id === item.id) {
      n.selected = true
    }
  })
}

</script>

<style lang="less" scoped>

.pay-wrap {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h5 {
				line-height: 50px;
			}
  }
  .pay {
			padding-left: 20px;
			margin-bottom: 15px;
      display: flex;
      align-items: center;

      .pay-item {
        margin-right: 5px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 2px solid #ddd;
        position: relative;
        cursor: pointer;
        b {
          display: block;
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 14px;
          height: 14px;
          overflow: hidden;
          background: url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
        }
      }
      .pay-item.selected {
        border-color: #e1251b;
      }
      .pay-item:hover {
        border-color: #e1251b;
      }
      .pay-item.selected::after {
        display: block;
      }
		}
}

	
</style>