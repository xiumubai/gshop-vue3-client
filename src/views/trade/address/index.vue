<template>
  <div class="address-wrap">
    <div class="title">
      <h5 class="receive">收件人信息</h5>
      <span class="add" @click="handleAdd">新增收货地址</span>
    </div>
    <div
      v-for="item in userAddressList"
      :key="item.id"
      class="address clearFix"
    >
      <span @click="handleChangeAdd(item)" :class="{ username: true, selected: item.selected }">
        {{ item.consignee }}
      </span>
      <div class="add-item">
        <div>
          <span class="s1">{{ item.fullAddress }}</span>
          <span class="s2">{{ item.phoneNum }}</span>
          <span v-if="item.isDefault == '1'" class="s3">默认地址</span>
        </div>

        <div class="options">
          <span @click="handleSetDefault(item)" v-if="item.isDefault == '0'">设为默认地址</span>
          <span @click="handleUpdateAdd(item)">编辑</span>
          <span @click="handleDeleteAdd(item)">删除</span>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="showModal"
      style="width: 600px"
      preset="card"
      title="收货地址"
      positive-text="确认"
      negative-text="取消"
      ref="formRef"
    >
      <n-form 
        label-placement="left"
        label-width="auto"
      >
        <n-form-item label="收货人" path="consignee">
          <n-input placeholder="请输入用户名" v-model:value="modal.consignee"></n-input>
        </n-form-item>
        <n-form-item label="联系电话" path="phoneNum">
          <n-input placeholder="请输入联系电话" v-model:value="modal.phoneNum"></n-input>
        </n-form-item>
        <n-form-item label="所在地区">
          <n-cascader
            :value="modal.provinceId"
            :options="regionOptions"
            :multiple="false"
            placeholder="所在地区"
            remote
            clearable
            check-strategy="child"
            @load="handleLoad"
            @update:value="handleUpdateValue"
          />
        </n-form-item>
        <n-form-item label="详细地址" path="userAddress">
          <n-input placeholder="请输入详细地址" v-model:value="modal.userAddress"></n-input>
        </n-form-item>
        <n-form-item style="display: flex; justify-content: flex-end;">
          <n-button @click="cancelCallback">
            取消
          </n-button>
          <div style="margin-right: 10px"></div>
          <n-button @click="submitCallback" type="primary">
            确认
          </n-button>
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
import { 
  findUserAddressList, 
  findBaseRegion, 
  findBaseProvinceByRegionId,
  saveAddress,
  delAddress,
  updateAddress
} from "@/api/address";
import { 
  NModal,
  NForm,
  NFormItem,
  NInput,
  FormItemRule,
  NCascader, 
  CascaderOption, 
  NButton,
} from 'naive-ui'

const emit = defineEmits(['change-address'])

type IAddItem = {
  id: number;
  consignee: string;
  fullAddress: string;
  phoneNum: number;
  isDefault: string;
  selected?: boolean;
}
const userAddressList = ref<IAddItem[]>([])
const regionOptions = ref([])
const showModal = ref(false)

// 表单数据
const modal = ref({
  consignee: null,
  phoneNum: null,
  userAddress: null,
  provinceId: null
})

const provinceId = ref(null)

const regionId = ref<number | null>(null)
const editType = ref('add')

const handleUpdateValue = (value: any, option: CascaderOption) => {
  console.log(value, option);
  modal.value.provinceId = value;
}
// 切换收货地址
const handleChangeAdd = (item: any) => {
  emit('change-address', item)
  userAddressList.value.map(n => {
    n.selected = false
    if (n.id === item.id) {
      n.selected = true
    }
  })
}

const handleDeleteAdd = async (item: any) => {
  await delAddress(item.id)
  showModal.value = false;
  getAddList();
}

// 更新地址
const handleUpdateAdd = (item: any) => {
  showModal.value = true;
  editType.value = 'update';

  regionOptions.value.map(async (n: CascaderOption) => {
    if (n?.value === item.regionId) {
      n.children = await getProvinceList(item.regionId)
    }
  })

  modal.value = {
    ...item
  }

}

// 添加收货地址
const handleAdd = () => {
  showModal.value = true
  editType.value = 'add';

  modal.value = {
    consignee: null,
    phoneNum: null,
    userAddress: null,
    provinceId: null
  }
}

// 关闭modal
const cancelCallback = () => {
  showModal.value = false;
}

// 提交表单
const submitCallback = async (e: MouseEvent) => {
  e.preventDefault()
  if (editType.value === 'add') {
    await saveAddress({...modal.value, regionId: regionId.value});
  } else {
    await updateAddress({...modal.value, regionId: regionId.value})
  }
  showModal.value = false;
  getAddList()
}


// 设为默认地址
const handleSetDefault = async (item: any) => {
  userAddressList.value.map(n => {
    n.isDefault = '0';
    if(n.id === item.id) {
      n.isDefault = '1';
    }
  })
}

// 获取地址列表
const getAddList = async () => {
  const res = await findUserAddressList()
  userAddressList.value = res;
}

// 获取区域列表
const getRegionList = async () => {
  const res = await findBaseRegion()
  regionOptions.value = res.map((item: CascaderOption) => {
    return {
      label: item.regionName,
      value: item.id,
      depth: 1,
      isLeaf: false
    }
  });
}

// 获取省份列表
const getProvinceList = async (id: number) => {
  const res = await findBaseProvinceByRegionId(id as number)
  const list:CascaderOption[]  = [];
  for(let i = 0; i < res.length; i ++) {
    list.push({
      label: res[i].name,
      value: res[i].id,
      depth: 2,
      isLeaf: true
    })
  }
  return list;
}

// 修改级联表单
const handleLoad = (option: CascaderOption) => {
  console.log(option);
  
  regionId.value = option.value as number;
  return new Promise<void>(async (resolve, reject) => {
    const list = await getProvinceList(option.value as number); 
    if (list.length > 0) {
      option.children = list;
      resolve()
    } else {
      reject()
    }
  })
}

onMounted(() => {
  getAddList()
  getRegionList()
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