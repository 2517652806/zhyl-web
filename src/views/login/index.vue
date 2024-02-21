<template>
  <div class="main">
    <div class="top">
      <svg t="1708171785105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4981" width="64" height="64">
        <path
          d="M728.18688 620.9536c-12.04224 0-22.9376 2.29376-33.83296 6.88128-0.57344-0.57344-1.14688001-1.72032-1.72032-2.29376L478.74048 411.07456c-13.76256-13.76256-34.4064-19.49695999-53.90336-13.76256001l-0.57344-0.57343999c-0.57344 0.57344-1.14688001 0.57344-1.72032 0.57343999-7.45472 2.29376-13.76256 5.7344-19.49696 10.89536001-131.31776 79.13472-220.77439999 270.66368-220.7744 429.50656 0 22.36416-3.44064 32.68608 0 53.90336h411.15647999v-208.73216l20.64384 20.64384c3.44064 3.44064 7.45472 6.30784001 10.89536001 8.60159999 2.29376 21.79072001 21.21728 37.84704 43.00800001 35.55328001 17.2032-1.72032 31.5392-14.33599999 34.97983999-31.5392h0.57344v-8.02816c0-13.18912 10.89536-23.51104 23.51104-23.51104 13.18912 0 23.51104 10.89536 23.51104001 23.51104v183.5008h63.07839999v-183.5008c1.14688001-48.16896-37.84704-87.16288-85.44256-87.16288z m114.11456-386.49855999c-3.44064-12.61568-42.43456001-28.672-54.4768-25.8048l-7.45472 1.72031999-37.27360001-42.43456c-4.01407999-4.58752-23.51104-24.65791999-38.99391998-33.83296001-21.21728-12.61568-187.51488 23.51104-208.73216002 56.77056-9.17503999 14.33599999-13.18912 31.5392-14.90943999 38.99392001l-13.18912 65.37216-7.45472 1.72032c-12.04224 3.44064-37.84704 37.27360001-34.97984 49.88928 3.44064 12.61568 15.48288 20.0704 28.09856 16.62976001h0.57344l49.88928-13.18912001c12.61568 65.37216 68.8128 112.39423999 134.7584 112.39424 75.69408 0 137.05216-61.93152 137.05216-137.62560001 0-15.48288-2.8672-31.5392-8.02816-45.87519999l58.49087999-16.05632001c12.61568-3.44064 20.0704-16.05632 16.62976001-28.67199998z m-106.0864-72.82688001l8.6016 8.02816c2.29376 3.44064 1.14688001 1.14688001-8.6016-8.02816z"
          p-id="4982" fill="#cb933e"></path>
      </svg>
      <div class="p">智慧养老系统</div>
    </div>
    <div class="background"></div>
    <!-- <div class="form"> -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form" auto-complete="on" label-position="left">
      <div class="p2">
        欢迎使用
      </div>
      <div class="login">
        <el-form-item prop="username" class="login_">
          <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user" ref="username"></el-input>
        </el-form-item>
      </div>
      <div class="login2">
        <el-form-item prop="password" class="login_2">
          <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-lock" ref="password"
            show-password></el-input>
        </el-form-item>

      </div>
      <div class="login3">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="login4">
        <el-button type="warning" @click.native.prevent="handleLogin">登录</el-button>
      </div>
      <div class="p3">
        还没有账号？请
        <el-button type="text" class="login5" @click="zhucei">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername, validadminname } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'zyy',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      options: [{
        value: '选项1',
        label: '普通用户'
      }, {
        value: '选项2',
        label: '管理员'
      },],
      value: '选项1',
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {

      immediate: true
    },

    value(newCount, oldCount) {
      console.log(`value变成了${newCount}，之前是${oldCount}`)
      const validateadminname = (rule, value, callback) => {
      if (!validadminname(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validateadminPassword = (rule, value, callback) => {
      if (value !== '123456') {
        callback(new Error('Please enter the correct admin password'))
      } else {
        callback()
      }
    }
      this.loginRules = {
        username: [{ required: true, trigger: 'blur', validator: validateadminname }],
        password: [{ required: true, trigger: 'blur', validator: validateadminPassword }]
      }
      console.log(this.loginRules.username)
    }

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    zhucei() {
      this.$router.push({ path: '/register' })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.value == '选项2') {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: '/dashboard' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }
          else {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: 'user' })
              this.loading = false
            }).catch((error) => {
              this.loading = false
              console.error('Action 执行失败', error);
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.background {
  background-image: url(../../assets/login_images/lnr1.jpg);
  background-size: cover;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  position: relative;
  top: 200px;
  left: 250px;
}

.main {
  background-color: #edececba;
  height: 100%;
  position: relative;
}

.top {
  background-color: rgb(255, 255, 255);
  height: 70px;
  position: relative;
  overflow: hidden;
}

.icon {
  position: absolute;
  left: 250px;
}

.p {
  position: relative;
  left: 310px;
  top: 24px;
  color: #c9a76f;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2px
}

.p2 {
  position: relative;
  left: 125px;
  top: 50px;
  color: #d6b887;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2px
}

.p3 {
  position: relative;
  left: 200px;
  top: 110px;
  font-size: 14px;

}

.form {
  position: absolute;
  right: 295px;
  top: 230px;
  background-color: rgb(255, 255, 255);
  height: 380px;
  width: 360px;
  border-radius: 10px;
  overflow: hidden;
}

.login {
  position: relative;
  width: 280px;
  left: 40px;
  top: 80px;
}

.login2 {
  position: relative;
  width: 280px;
  left: 40px;
  top: 100px;
}

.login3 {
  position: relative;
  left: 40px;
  top: 70px;
}

.login4 {
  position: relative;
  left: 40px;
  top: 90px;
}

.login5 {
  position: relative;
  left: -20px;
  top: -27.5px;
}

.login_ {
  position: relative;
  top: -10px;
}

.login_2 {
  position: relative;
  top: -30px;
}

.el-select {
  width: 280px;
}

.el-button {
  width: 280px;
}
</style>