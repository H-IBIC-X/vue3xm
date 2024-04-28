<template>
  <el-table
    :data="PermisstionArr"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <!-- row为菜单对象或按钮对象-->
      <template #="{ row, $index }">
        <el-button
          @click="addPermisstion(row)"
          type="primary"
          size="small"
          :disabled="row.level == 4 ? true : false"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          @click="updatePermisstion(row)"
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除${row.name}`"
          width="260px"
          @confirm="removeMenu(row.id)"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--  对话框组件：添加或者更新已有菜单的数据结构-->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
  >
    <!--   表单组件，收集新增和已有菜单数据-->
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
// 引入获取菜单请求API
import {
  reqAddOrUpdateMenu,
  reqAllPermisstion,
  reqRemoveMenu,
} from '@/api/acl/menu'
// 引入ts类型
import type {
  MenuParams,
  PermisstionResponseData,
  PermisstionList,
  Permisstion,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 存储菜单数据
let PermisstionArr = ref<PermisstionList>([])
// 控制对话框显示于隐藏
let dialogVisible = ref<boolean>(false)
// 携带参数
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

onMounted(() => {
  // 组件挂载完毕
  getHasPermisstion()
})
// 获取菜单数据的方法
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }
}

//  添加菜单按钮
const addPermisstion = (row: Permisstion) => {
  //   清空数据
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 显示对话框
  dialogVisible.value = true
  //   收集新增菜单level数值
  menuData.level = row.level + 1
  //   给谁新增子菜单
  menuData.pid = row.id as number
}
// 编辑已有菜单
const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  //   修改按钮
  Object.assign(menuData, row)
}
// 确定按钮回调
const save = async () => {
  // 发请求：新增子菜单|更新某一个已有菜单的数据
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    //   对话框隐藏
    dialogVisible.value = false
    //   提示信息
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    //   再次获取全部最新的菜单数据
    getHasPermisstion()
  }
}
// 删除按钮回调
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasPermisstion()
  }
}
</script>
<style scoped></style>
