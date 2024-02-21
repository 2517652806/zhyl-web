<template>
    <div class="app-container">
        <el-form inline>
            <!-- 表单元素 -->
            <el-form-item>
                <el-input v-model="tempSearchObj.username" placeholder="用户名" />
            </el-form-item>
            <!-- 查询与情况的按钮 -->
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button type="default" @click="resetSearch">清空</el-button>
        </el-form>

        <div style="margin-bottom: 20px">
            <!-- 添加与批量添加按钮 -->
            <el-button type="success" @click="showAddUser">添 加</el-button>
            <el-button type="danger" @click="revomveUsers" :disabled="selectedIds.length === 0">批量删除</el-button>
        </div>

        <!-- table表格：展示用户信息的地方 -->
        <!-- <el-table
        border
        stripe
        v-loading="listLoading"
        :data="users"
        @selection-change="handleSelectionChange">
  
        <el-table-column
          type="selection"
          width="55" />
  
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        />
  
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="nickName" label="用户昵称" />
        <el-table-column prop="roleName" label="权限列表" />
        
        <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
        <el-table-column prop="gmtModified" label="更新时间" width="180"/>
  
        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="{row}">
            <HintButton type="info" size="mini" icon="el-icon-user-solid" title="分配角色"
              @click="showAssignRole(row)"/>
            <HintButton type="primary" size="mini" icon="el-icon-edit" title="修改用户"
              @click="showUpdateUser(row)"/>
            <el-popconfirm :title="`确定删除 ${row.username} 吗?`" @onConfirm="removeUser(row.id)">
              <HintButton style="margin-left:10px" slot="reference" type="danger" size="mini" icon="el-icon-delete" 
                title="删除用户"/>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table> -->
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[3, 10, 20, 30, 40, 50, 100]"
            style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUsers"
            @size-change="handleSizeChange" />

    </div>
</template>
  
<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
    name: 'AclUserList',

    data() {
        return {
            listLoading: false, // 是否显示列表加载的提示
            searchObj: { // 包含请求搜索条件数据的对象
                username: ''
            },
            tempSearchObj: { // 收集搜索条件输入的对象
                username: ''
            },
            selectedIds: [], // 所有选择的user的id的数组
            users: [], // 当前页的用户列表
            page: 1, // 当前页码
            limit: 3, // 每页数量
            total: 0, // 总数量
            user: {}, // 当前要操作的user
            dialogUserVisible: false, // 是否显示用户添加/修改的dialog
            userRules: { // 用户添加/修改表单的校验规则
                username: [
                    { required: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' }
                ],
                password: [
                    { required: true, validator: this.validatePassword }
                ]
            },
            loading: false, // 是否正在提交请求中
            dialogRoleVisible: false, // 是否显示角色Dialog
            allRoles: [], // 所有角色列表
            userRoleIds: [], // 用户的角色ID的列表
            isIndeterminate: false, // 是否是不确定的
            checkAll: false, // 是否全选
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },

}
</script>
  