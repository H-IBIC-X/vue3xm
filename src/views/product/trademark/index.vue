<template>
  <div>
    <el-card class="box-card">
      <!--      添加品牌-->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTradeMark"
        v-has="`btn.Trademark.add`"
        v-if="userStore.buttons.includes('btn.Trademark.add')"
      >
        添加品牌
      </el-button>
      <!--     表格组件-->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!--      默认展示数据-->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.tmName}?`"
              width="250px"
              icon="Delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件
              pagination
                 v-model:current-page:设置分页器当前页码
                 v-model:page-size:设置每一个展示数据条数
                 page-sizes:用于设置下拉菜单数据
                 background:设置分页器按钮的背景颜色
                 layout:可以设置分页器六个子组件布局调整
          -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="getHasTrademark"
        :page-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev,pager,next,jumper,->,sizes,total"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!--
        v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
         title:设置对话框左上角标题
    -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请你输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              :src="trademarkParams.logoUrl"
              v-if="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--具名插槽：footer-->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>

  <!-- 对话框组件：添加品牌于修改已有品牌的业务使用结构 -->
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps, formEmits } from 'element-plus'

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 当前页码
let pageNo = ref<number>(1)

let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
// 对话框显示于隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 展示数据
let formRef = ref()
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 组件挂载完毕钩子-发一次请求
onMounted(() => {
  getHasTrademark()
})

const changePageNo = () => {
  getHasTrademark()
}
// 分页器当前页面发生变化
// 对于当前页码发生自定义事件，组件pagination父组件回传了数据
//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
  //   再发一次请求
}
// 添加品牌按钮回调
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
} // 修改已有品牌的按钮回调
// 对话框取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}
// 对话框确定按钮
const confirm = async () => {
  // 发请求之前，对整个表单进行校验
  // 调用这个方法进行全部表单相校验
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    //   再次发请求获取全部品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    //
    dialogFormVisible.value = false
  }
}
// 添加品牌按钮的回调
const addTradeMark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空收集数据·
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''

  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

//上传图片成功钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件类型必须是PNG|JPG|GIF',
    })
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  // response为当前上传图片post请求服务器返回的数据
  // 清除图片校验信息
  formRef.value.clearValidate('logoUrl')
}

// 品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}
// 品牌LOGO图片自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  // 如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('Logo的图片必须上传'))
  }
}

const rules = {
  tmName: [
    {
      required: true, // 校验
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      // trigger:'change',
      validator: validatorLogoUrl,
    },
  ],
}

// 气泡确认框删除按钮的回调
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //   再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
