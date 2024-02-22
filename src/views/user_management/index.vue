<template>
    <div class="app-container">

        <div style="margin-bottom: 20px">
            <!-- 添加与批量添加按钮 -->
            <el-button type="success" @click="vcase">审核个人病例</el-button>
        </div>

        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="userId" label="用户ID" width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="140" align="center">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="200" align="center">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="80" align="center">
                <template slot-scope="scope">
                    {{ renderGender(scope.row.gender) }}
                </template>
            </el-table-column>
            <el-table-column prop="disable" label="禁用" width="60" align="center">
                <template slot-scope="scope">
                    {{ scope.row.disable === 0 ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="120" align="center">
                <template slot-scope="scope">
                    {{ scope.row.age }} 岁
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="体重" width="120" align="center">
                <template slot-scope="scope">
                    {{ scope.row.weight }} kg
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                    <el-popconfirm :title="`确定改变禁用状态吗?`" @onConfirm="isDisable(row.userId, row.disable)">
                        <HintButton style="margin-left:10px" slot="reference" type="primary" size="mini"
                            icon="el-icon-warning-outline" title="禁用和启用用户" />
                    </el-popconfirm>
                    <el-popconfirm :title="`确定导出 用户ID为${row.userId}的用户吗?`" @onConfirm="excel(row.name,row.phone,row.idCard)">
                        <HintButton style="margin-left:10px" slot="reference" type="info" size="mini" icon="el-icon-document"
                            title="导出excel" />
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="用户最近三次登录记录" :visible.sync="dialogTableVisible">
            <el-table :data="tabletime">
                <el-table-column property="userId" label="用户ID" width="200" align="center"></el-table-column>
                <el-table-column property="logTime" label="日期" align="center"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="用户个人病例" :visible.sync="dialogcaseVisible">
            <el-table :data="pcase" border stripe style="width: 100%">
                <el-table-column property="userId" label="用户ID" width="70" align="center"></el-table-column>
                <el-table-column property="name" label="姓名" width="60" align="center"></el-table-column>
                <el-table-column property="dateOfVisit" width="130" label="访问日期" align="center"></el-table-column>
                <el-table-column property="purposeOfVisit" width="80" label="访问目的" align="center"></el-table-column>
                <el-table-column property="hospitalName" width="100" label="医院名称" align="center"></el-table-column>
                <el-table-column property="type" width="100" label="审核状态" align="center">
                    <template slot-scope="scope">
                        <el-tag type="info" v-if="scope.row.type === 0">待审核</el-tag>
                        <el-tag type="success" v-if="scope.row.type === 1">审核通过</el-tag>
                        <el-tag type="danger" v-if="scope.row.type === 2">审核未通过</el-tag>
                        <!-- <span v-if="scope.row.type === 0">提交</span>
                        <span v-else-if="scope.row.type === 1">通过</span>
                        <span v-else-if="scope.row.type === 2">未通过</span> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-popconfirm :title="`确定通过姓名为${row.name}的用户吗?`" @onConfirm="admincase1(row.id, 1)">
                            <HintButton style="margin-left:10px" slot="reference" type="success" size="mini"
                                icon="el-icon-check" title="通过" :disabled="row.type == 1" />
                        </el-popconfirm>
                        <el-popconfirm :title="`确定不通过姓名为${row.name}的用户吗?`" @onConfirm="admincase1(row.id, 2)">
                            <HintButton style="margin-left:10px" slot="reference" type="danger" size="mini"
                                icon="el-icon-close" title="不通过" :disabled="row.type == 2" />
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="page1" :total="total1" :page-size="limit1" :page-sizes="[3, 10, 20, 30, 40, 50, 100]"
            style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="currentChange1"
            @size-change="sizeChange1" />
        </el-dialog>
        <!-- 分页器 -->
        <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[3, 10, 20, 30, 40, 50, 100]"
            style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="currentChange"
            @size-change="sizeChange" />

    </div>
</template>
  
<script>
import cloneDeep from 'lodash/cloneDeep'
import { adminsearch, adminloginlogs, adminisdisable, adminivcase, adminicase,adminexcel} from '@/api/admin';
export default {
    name: 'AclUserList',

    data() {
        return {
            dialogTableVisible: false,
            dialogcaseVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
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
            page1:1,
            limit: 3, // 每页数量
            limit1:1,
            total: 0, // 总数量
            total1:0,
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
            tableData: [{}],
            tabletime: [],
            pcase: [],
            tableData1:[],
        }
    },
    methods: {
        Adminsearch() {
            this.$store.dispatch('user/Adminsearch').then(() => {
                this.totalData = this.$store.state.user.userinformation.records
                this.total = this.$store.state.user.userinformation.total
                this.getTabelData()
            })
        },
        async excel(name1,phone,idCard){
            let result = await adminexcel(name1,phone,idCard)
            if(result.code==0){
                this.$message.success(result.message)
            }
        },
        async admincase1(id, type) {
            let result = await adminicase(id, type)
            if (result.code == 0) {
                window.location.reload();
                this.$message.success(result.message)
                /* this.dialogcaseVisible = false
                setTimeout(() => {
                    this.dialogcaseVisible = true
                },1500); */
            }
        },
        //查看个人病例
        async vcase() {
            let result = await adminivcase()
            if (result.code == 0) {
                this.dialogcaseVisible = true
                this.pcase = result.data.records
                this.total1=result.data.total
            }
        },
        getTabelData() {
            this.tableData = this.totalData.slice((this.page - 1) * this.limit, this.page * this.limit)
        },
        getTabelData1() {
            this.tableData1 = this.pcase.slice((this.page1 - 1) * this.limit1, this.page1 * this.limit1)
        },
        currentChange1(val) {
            console.log("翻页，当前为第几页", val)
            this.page1 = val
            this.getTabelData1()
        },
        currentChange(val) {
            console.log("翻页，当前为第几页", val)
            this.page = val
            this.getTabelData()
        },
        sizeChange1(val) {
            console.log("改变每页多少条", val)
            this.limit1 = val
            this.page1 = 1
            this.getTabelData1()
        },
        sizeChange(val) {
            console.log("改变每页多少条", val)
            this.limit = val
            this.page = 1
            this.getTabelData()
        },
        renderGender(gender) {
            return gender === 0 ? '男' : '女';
        },

        async isDisable(a, b) {
            if (b == 0) {
                b = 1
            } else {
                b = 0
            }
            let result = await adminisdisable(a, b)
            if (result.code == 0) {
                window.location.reload();
                this.$message.success('禁用状态改变成功')

            }
        },
        async showlogin(a, b) {
            let result = await adminloginlogs(a, b);
            if (result.code == 0) {
                this.tabletime = result.data.records
                this.dialogTableVisible = true
                return 'ok'
            }
            else {
                return Promise.reject(new Error('faile'));
            }
        },
    },
    mounted() {
        this.Adminsearch()
    }

}
</script>
  