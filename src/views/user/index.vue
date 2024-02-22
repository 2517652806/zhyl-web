<template>
    <div class="main">
        <el-menu default-active="user" class="el-menu-demo" mode="horizontal" @select="handleSelect" router
            background-color="#ffffff" text-color="#04111c" active-text-color="#ff8c00">
            <el-menu-item index="user" class="user1">个人信息</el-menu-item>
            <el-menu-item index="health" class="user2">个人病例</el-menu-item>
            <el-menu-item index="feedback" class="user4">意见反馈</el-menu-item>
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
                
                <el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-card shadow="always" class="card">
            <el-form ref="form" :model="userinfo" label-width="110px" label="right" :inline="true" style="margin-top: 80px;">
                <el-form-item label="用户id">
                    <el-input v-model="userinfo.userId"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="userinfo.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input placeholder="输入手机号" v-model="userinfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input placeholder="输入身份号" v-model="userinfo.idCard"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="gendertext" placeholder="请选择性别">
                        <el-option label="女" value="1"></el-option>
                        <el-option label="男" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-input placeholder="输入性别" v-model="userinfo.gendertext"></el-input> -->
                <el-form-item label="年龄" label-width="95px">
                    <el-input placeholder="输入年龄" v-model="userinfo.age">
                        <template slot="append">岁</template></el-input>
                </el-form-item>
                <el-form-item label="身高">
                    <el-input placeholder="输入身高" v-model="userinfo.height">
                        <template slot="append">cm</template></el-input>
                </el-form-item>
                <el-form-item label="体重" label-width="50px">
                    <el-input placeholder="输入体重" v-model="userinfo.weight">
                        <template slot="append">kg</template></el-input>
                </el-form-item>
                <el-form-item label="bmi">
                    <el-input :disabled="true" v-model="userinfo.bmi"></el-input>
                </el-form-item>
                <el-form-item label="风险等级">
                    <el-input :disabled="true" v-model="userinfo.level"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click.native="putinfo(userinfo.name, userinfo.phone, userinfo.idCard, userinfo.age, userinfo.height, userinfo.weight, gendertext,userinfo.userId)"
                        style="width: 400px;margin-left: 150px;margin-top: 30px;">保存</el-button>
                    
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
  
<script>
import { usergetinfo,userputinfo,usergetbmi} from '@/api/user'
export default {
    data() {
        return {
            userinfo: {},
            gendertext:'',
        }
    },
    methods: {
        getinfo() {
            this.getbmi()
            this.$store.dispatch('user/getinfo').then(() => {
                console.log(this.$store)
                this.userinfo = this.$store.state.user.uinfo
                if (this.userinfo.gender==0){
                    this.gendertext='0'
                }
                else{
                    this.gendertext="1"
                }
            })
        },
        async getbmi(){
            let result = await usergetbmi()
            if(result.code==0){
                
            }

        },
       async putinfo(name, phone, idCard, age, height, weight, gender, userId) {
          /*   if (gender == "男"){
                gender="0"
            }
            else{
                gender="1"
            } */
            console.log({name, phone, idCard, age, height, weight, gender, userId})
            let result =await userputinfo(name, phone, idCard, age, height, weight, gender, userId)
            if(result.code==0){
                window.location.reload();
                this.$message.success('保存成功')
                this.getinfo()
            }
            /* this.$store.dispatch('user/putinfo'name, phone, idCard, age, height, weight, gender, userId).then(() => {
                  
            }) */
        },
        onSubmit() {
            console.log('submit!');
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    },
    mounted() {
        this.getinfo()
    },
};
</script>
<style>
.card {
    width: 50%;
    position: absolute;
    left: 25%;
    top: 12%;
    height: 580px;
}

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

  