<template>
    <div class="main">
        <el-menu default-active="health" class="el-menu-demo" mode="horizontal" @select="handleSelect" router
            background-color="#ffffff" text-color="#04111c" active-text-color="#ff8c00">
            <el-menu-item index="user" class="user1">个人信息</el-menu-item>
            <el-menu-item index="health" class="user2">个人病例</el-menu-item>
            <el-menu-item index="questionnaires_user" class="user3">调查问卷</el-menu-item>
            <el-menu-item index="feedback" class="user4">意见反馈</el-menu-item>
            <el-button @click="addcase()" type="primary" style="position: absolute;left:880px;top:8px;">上传个人病例</el-button>
        </el-menu>
        <svg t="1708171785105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4981" width="64" height="64">
            <path
                d="M728.18688 620.9536c-12.04224 0-22.9376 2.29376-33.83296 6.88128-0.57344-0.57344-1.14688001-1.72032-1.72032-2.29376L478.74048 411.07456c-13.76256-13.76256-34.4064-19.49695999-53.90336-13.76256001l-0.57344-0.57343999c-0.57344 0.57344-1.14688001 0.57344-1.72032 0.57343999-7.45472 2.29376-13.76256 5.7344-19.49696 10.89536001-131.31776 79.13472-220.77439999 270.66368-220.7744 429.50656 0 22.36416-3.44064 32.68608 0 53.90336h411.15647999v-208.73216l20.64384 20.64384c3.44064 3.44064 7.45472 6.30784001 10.89536001 8.60159999 2.29376 21.79072001 21.21728 37.84704 43.00800001 35.55328001 17.2032-1.72032 31.5392-14.33599999 34.97983999-31.5392h0.57344v-8.02816c0-13.18912 10.89536-23.51104 23.51104-23.51104 13.18912 0 23.51104 10.89536 23.51104001 23.51104v183.5008h63.07839999v-183.5008c1.14688001-48.16896-37.84704-87.16288-85.44256-87.16288z m114.11456-386.49855999c-3.44064-12.61568-42.43456001-28.672-54.4768-25.8048l-7.45472 1.72031999-37.27360001-42.43456c-4.01407999-4.58752-23.51104-24.65791999-38.99391998-33.83296001-21.21728-12.61568-187.51488 23.51104-208.73216002 56.77056-9.17503999 14.33599999-13.18912 31.5392-14.90943999 38.99392001l-13.18912 65.37216-7.45472 1.72032c-12.04224 3.44064-37.84704 37.27360001-34.97984 49.88928 3.44064 12.61568 15.48288 20.0704 28.09856 16.62976001h0.57344l49.88928-13.18912001c12.61568 65.37216 68.8128 112.39423999 134.7584 112.39424 75.69408 0 137.05216-61.93152 137.05216-137.62560001 0-15.48288-2.8672-31.5392-8.02816-45.87519999l58.49087999-16.05632001c12.61568-3.44064 20.0704-16.05632 16.62976001-28.67199998z m-106.0864-72.82688001l8.6016 8.02816c2.29376 3.44064 1.14688001 1.14688001-8.6016-8.02816z"
                p-id="4982" fill="#cb933e"></path>
        </svg>
        <div class="p">智慧养老系统</div>
        <el-dropdown class="down" trigger="click">
            <div>
                <img src="@/assets/男头像 (2).png" class="user-avatar">
                {{ this.$store.state.user.uinfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-table :data="pcase" border stripe style="width: 100%">
            <el-table-column property="id" label="病例ID" width="80" align="center"></el-table-column>
            <el-table-column property="name" label="姓名" width="80" align="center"></el-table-column>
            <el-table-column property="dateOfVisit" width="220" label="访问日期" align="center"></el-table-column>
            <el-table-column property="purposeOfVisit" width="160" label="访问目的" align="center"></el-table-column>
            <el-table-column property="hospitalName" width="160" label="医院名称" align="center"></el-table-column>
            <el-table-column property="attending" width="100" label="主诊" align="center"></el-table-column>
            <el-table-column property="nameOfDisease" width="150" label="疾病名称" align="center"></el-table-column>
            <el-table-column property="symptom" width="60" label="症状" align="center"></el-table-column>
            <el-table-column property="timeOfOnset" width="220" label="发病时间" align="center"></el-table-column>
            <el-table-column property="type" label="审核状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.type === 0">待审核</el-tag>
                    <el-tag type="success" v-if="scope.row.type === 1">审核通过</el-tag>
                    <el-tag type="danger" v-if="scope.row.type === 2">审核未通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                    <el-popconfirm :title="`确定要删除病例吗?`" @onConfirm="deletecase_button(row.id)">
                        <HintButton style="margin-left:10px" slot="reference" type="danger" size="mini"
                            icon="el-icon-delete" title="删除病例" />
                    </el-popconfirm>
                    <el-popconfirm :title="`确定修改个人病例吗?`"
                        @onConfirm="putpcase(row.id, row.name, row.phone, row.dateOfVisit, row.hospitalName, row.attending, row.purposeOfVisit, row.nameOfDisease, row.timeOfOnset, row.symptom)">
                        <HintButton style="margin-left:10px" slot="reference" type="primary" size="mini"
                            icon="el-icon-edit" title="修改病例" />
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :current-page="page" :total="total" :page-size="limit"
            :page-sizes="[3, 10, 20, 30, 40, 50, 100]" style="padding: 20px 0;" layout="prev, pager, next, ->, sizes, total"
            @current-change="currentChange" @size-change="sizeChange" />
        <el-dialog title="修改个人病例" :visible.sync="dialogFormVisible">
            <el-form :model="putcase" label-width="110px" label="right" :inline="true">
                <el-form-item label="id">
                    <el-input :disabled="true" v-model="putcase.id"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input :disabled="true" v-model="putcase.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input :disabled="true" placeholder="输入年龄" v-model="putcase.age"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <!-- <el-input :disabled="true" v-model="putcase.gender"></el-input> -->
                    <el-select :disabled="true" v-model="gendertext" placeholder="请选择性别">
                        <el-option label="女" value="1"></el-option>
                        <el-option label="男" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input :disabled="true" placeholder="输入手机号" v-model="putcase.phone"></el-input>
                </el-form-item>
                <!-- <el-input placeholder="输入性别" v-model="putcase.gendertext"></el-input> -->
                <el-form-item label="访问日期">
                    <el-input v-model="putcase.dateOfVisit"></el-input>
                </el-form-item>
                <el-form-item label="医院名称">
                    <el-input v-model="putcase.hospitalName"></el-input>
                </el-form-item>
                <el-form-item label="主诊">
                    <el-input v-model="putcase.attending"></el-input>
                </el-form-item>
                <el-form-item label="访问目的">
                    <el-input v-model="putcase.purposeOfVisit"></el-input>
                </el-form-item>
                <el-form-item label="疾病名称">
                    <el-input v-model="putcase.nameOfDisease"></el-input>
                </el-form-item>
                <el-form-item label="发病时间">
                    <el-input v-model="putcase.timeOfOnset"></el-input>
                </el-form-item>
                <el-form-item label="症状">
                    <el-input v-model="putcase.symptom"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"
                    @click="put(putcase.id, putcase.name, putcase.age, gendertext, putcase.phone, putcase.dateOfVisit, putcase.hospitalName, putcase.attending, putcase.purposeOfVisit, putcase.nameOfDisease, putcase.timeOfOnset, putcase.symptom)">确
                    定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传个人病例" :visible.sync="dialogaddVisible">
            <el-form :model="putcase" label-width="110px" label="right" :inline="true">
                <el-form-item label="姓名">
                    <el-input :disabled="true" v-model="putcase.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input :disabled="true" placeholder="输入年龄" v-model="putcase.age"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select :disabled="true" v-model="gendertext" placeholder="请选择性别">
                        <el-option label="女" value="1"></el-option>
                        <el-option label="男" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input placeholder="输入手机号" v-model="phone"></el-input>
                </el-form-item>
                <!-- <el-form-item label="访问日期" >
                    <el-input  placeholder="xx年xx月xx日xx时xx分" v-model="dateOfVisit"></el-input>
                </el-form-item> -->
                <el-form-item label="访问日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="dateOfVisit1"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="dateOfVisit2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="医院名称">
                    <el-input v-model="hospitalName"></el-input>
                </el-form-item>
                <el-form-item label="主诊">
                    <el-input v-model="attending"></el-input>
                </el-form-item>
                <el-form-item label="访问目的">
                    <el-input v-model="purposeOfVisit"></el-input>
                </el-form-item>
                <el-form-item label="疾病名称">
                    <el-input v-model="nameOfDisease"></el-input>
                </el-form-item>
                <el-form-item label="发病时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="timeOfOnset1"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="timeOfOnset2" style="width: 100%;"></el-time-picker>
                    </el-col>
                   <!--  <el-input v-model="timeOfOnset"></el-input> -->
                </el-form-item>
                <el-form-item label="症状">
                    <el-input v-model="symptom"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddVisible = false">取 消</el-button>
                <el-button type="primary"
                    @click="addcase2(putcase.name, putcase.age, gendertext, phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom)">确
                    定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import { usergetcase, userputcase, useraddcase ,userdelete} from '@/api/user';
import user from '@/store/modules/user';
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            pcase: [],
            pagenum: 1,
            dialogFormVisible: false,
            dialogaddVisible: false,
            putcase: {
            },
            total: 0,
            phone: '',
            gendertext: '',
            dateOfVisit1: '',
            dateOfVisit2: '',
            hospitalName: '',
            attending: '',
            purposeOfVisit: '',
            nameOfDisease: '',
            timeOfOnset1: '',
            timeOfOnset2:'',
            symptom: ''
        }
    },
    methods: {
        addcase() {
            this.dialogaddVisible = true
        },
        async addcase2(name,age,gender,phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom) {
            
            let result = await useraddcase(name,age,gender,phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom)
            if (result.code==0){
                this.dialogaddVisible=false
                window.location.reload();
                this.$message.success('上传成功')
            }
        },
       /*  addcase2() {
            console.log(this.dateOfVisit1)
            console.log(this.dateOfVisit2)
            console.log(this.dateOfVisit)
            console.log(this.timeOfOnset)
        }, */
        currentChange(val) {
            console.log("翻页，当前为第几页", val)
            this.page = val
            this.getcase()
        },
        sizeChange(val) {
            console.log("改变每页多少条", val)
            this.limit = val
            this.getcase()
        },
        getinfo() {
            this.$store.dispatch('user/getinfo').then(() => {

                /* this.userinfo = this.$store.state.user.uinfo
                if (this.userinfo.gender==0){
                    this.userinfo.gender="男"
                }
                else{
                    this.userinfo.gender="女"
                } */
            })
        },
        putpcase(id, name, phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom) {
            this.putcase = {
                id,
                name,
                age: this.$store.state.user.uinfo.age,
                gender: this.$store.state.user.uinfo.gender,
                phone,
                dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom
            }
            if (this.putcase.gender == 0) {
                this.gendertext = '0'
            }
            else {
                this.gendertext = "1"
            }
            this.dialogFormVisible = true;
        },
        async put(id, name, age, gender, phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom) {
            let result = await userputcase(id, name, age, gender, phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease, timeOfOnset, symptom)
            if (result.code == 0) {
                this.dialogFormVisible = false;

                window.location.reload();

            }
        },
        async getcase() {
            let result = await usergetcase(this.page, this.limit)
            if (result.code == 0) {
                this.pcase = result.data.records
                this.total = result.data.total
            }
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    },
    mounted() {
        this.getinfo()
        this.getcase()
    },
    computed: {
        dateOfVisit: function () {
            // `this` 指向当前 Vue 实例
            const date1 = new Date(this.dateOfVisit1);
            const date2 = new Date(this.dateOfVisit2);

            // 将日期转换为时间戳并相加
            const combinedTimestamp = date1.getTime() + date2.getTime();

            // 使用新的时间戳创建 Date 对象
            const combinedDate = new Date(combinedTimestamp);

            // 格式化日期
            const formattedDateTime = `${combinedDate.getFullYear()}年${combinedDate.getMonth() + 1}月${combinedDate.getDate()}日${combinedDate.getHours()}时${combinedDate.getMinutes()}分${combinedDate.getSeconds()}秒`;

            console.log(formattedDateTime); // 输出格式化后的日期时间字符串
            return formattedDateTime;
        },
        timeOfOnset: function () {
            // `this` 指向当前 Vue 实例
            const date1 = new Date(this.timeOfOnset1);
            const date2 = new Date(this.timeOfOnset2);

            // 将日期转换为时间戳并相加
            const combinedTimestamp = date1.getTime() + date2.getTime();

            // 使用新的时间戳创建 Date 对象
            const combinedDate = new Date(combinedTimestamp);

            // 格式化日期
            const formattedDateTime = `${combinedDate.getFullYear()}年${combinedDate.getMonth() + 1}月${combinedDate.getDate()}日${combinedDate.getHours()}时${combinedDate.getMinutes()}分${combinedDate.getSeconds()}秒`;

            return formattedDateTime;
        }
    }
};
</script>
<style>
.main {
    background-color: #edececba;
    height: 100%;
    position: relative;
}

.user-avatar {
    position: relative;
    top: 8px;
    left: -10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
}

.down {
    position: absolute;
    right: 30px;
    top: 8px;
}

.user1 {
    position: relative;
    left: 400px;
}

.user2 {
    position: relative;
    left: 420px;
}

.user3 {
    position: relative;
    left: 440px;
}

.user4 {
    position: relative;
    left: 460px;
}

.icon {
    position: absolute;
    left: 60px;
    top: -3px;
}

.p {
    position: absolute;
    left: 130px;
    top: 18px;
    color: #c9a76f;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 2px;
}
</style>

  