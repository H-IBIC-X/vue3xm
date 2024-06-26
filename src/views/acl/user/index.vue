<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>
    <!-- table展示用户信息-->
    <el-table
      @selection-change="selectChange"
      style="margin: 10px 0px"
      border
      :data="userArr"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}?`"
            width="260px"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页器-->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-page="getHasUser"
      @size-change="handler"
    />
  </el-card>
  <!--  抽屉结构：添加用户账号-->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <!--    身体部分-->
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请你输入用户姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请你输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请你输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉结构：用于账号职位分配 -->
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <!--    身体部分-->
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <!--  显示职位的复选框-->
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqSelectUser,
  reqUserInfo,
  reqRemoveUser,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
} from '@/api/acl/user'
import type {
  SetRoleData,
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
// 默认页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
// 用户总个数
let total = ref<number>(0)
// 存储用户的数组
let userArr = ref<Records>([])
// 定义响应式数据控制抽屉的显示和隐藏
let drawer = ref<boolean>(false)
// 控制分配角色抽屉显示和隐藏
let drawer1 = ref<boolean>(false)
// 存储全部职位的数据
let allRole = ref<AllRole>([])
// 当前用户已有的职位
let userRole = ref<AllRole>([])
// 收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 是否全选
const checkAll = ref<boolean>(false)

// 设置不确定状态，负责样式控制
const isIndeterminate = ref<boolean>(true)

// 准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([])
// 获取form组件实例
let formRef = ref<any>()
// 定义响应式数据，收集用户输入进来的关键字
let keyword = ref<string>('')
// 获取模板setting仓库
let settingStore = useLayOutSettingStore()
// 组件挂载完毕
onMounted(() => {
  getHasUser()
})

// 获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  // 收集当前页码
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
// 添加用户按钮
const addUser = () => {
  // 抽屉展示出来
  drawer.value = true
  //   情况数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
// 更新已有的用户按钮
const updateUser = (row: User) => {
  // 抽屉显示出来
  drawer.value = true
  //   存储收集已有的账号信息
  Object.assign(userParams, row)
  // 清除上一次错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

// 分页器下拉菜单的自定义事件的回调
const handler = () => {
  getHasUser()
}
// 批量删除按钮
const deleteSelectUser = async () => {
  let idsList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  // 批量删除请求
  let result: any = await reqSelectUser(idsList)
  if (result == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
// 保存按钮
const save = async () => {
  await formRef.value.validate()
  // 保存按钮
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    // 关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'success',
      message: 'userParams.id' ? '更新成功' : '添加成功',
    })
    // 获取最新的全部账号的信息
    //   getHasUser(userParams.id?pageNo.value:1)
    //  浏览器自动刷新一次
    window.location.reload()
  } else {
    drawer.value = false
    //   提示消息
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}

const cancel = () => {
  //   关闭抽屉
  drawer.value = false
}
// 校验用户名字函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名至少五位'))
  }
}
//校验用户昵称函数
const validatorname = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('昵称至少五位'))
  }
}
//校验用户密码函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
// 表单校验的规则对象
const rules = {
  // 用户名字
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorUsername,
    },
  ],
  // 用户昵称
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorname,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorPassword,
    },
  ],
}

//分配角色按钮
const setRole = async (row: User) => {
  //  存储用户信息
  Object.assign(userParams, row)
  // 获取全部职位数据和已有职位数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    // 存储全部职位
    allRole.value = result.data.allRolesList
    //   存储当前已有职位
    userRole.value = result.data.assignRoles
    //   抽屉显示出来
    drawer1.value = true
  }
}

//删除某一个用户
const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
// 全选复选框change事件
const handleCheckedCitiesChange = (value: string[]) => {
  // 顶部复选框的勾选数据
  checkAll.value = value.length === allRole.value.length
  // 不确定的样式
  isIndeterminate.value = value.length !== allRole.value.length
}

// 搜索按钮
const search = () => {
  //   获取相应用户数据
  getHasUser()
  //   清空关键字
  keyword.value = ''
}

// 重置按钮
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}

// 确定按钮的回调
const confirmClick = async () => {
  //   收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
      //  断言为number类型
    }),
  }
  //   分配用户的职位
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //   提示信息
    ElMessage({
      type: 'success',
      message: '分配职务成功',
    })
    //   关闭抽屉
    drawer1.value = false
    //   获取用户信息，更新完毕留在当前页
    getHasUser(pageNo.value)
  }
}

// 复选框勾选触发事件
const selectChange = (value: any) => {
  selectIdArr.value = value
}
</script>
<style scoped>
.form {
  display: flex;
  justify-content: space-between;
}
</style>
