<template>
  <div id="login">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item>
        <div class="logintitle" :style="{color: Color}">歡迎加入Heartless的小家庭！</div>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name">
          <template slot="prepend"><i class="el-icon-user" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off">
          <template slot="prepend"><i class="el-icon-lock" /></template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="isShow" prop="email">
        <el-input v-model="ruleForm.email" placeholder="Email" style="margin-bottom: 10px">
          <template slot="append">@qq.com</template>
        </el-input>
        <el-button style="padding: 10px 20px" :disabled="showBtn" type="primary" @click="sendMail">{{ btntext }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-if="isShow" v-model="ruleForm.code" placeholder="請輸入驗證碼" />
      </el-form-item>
      <el-form-item>
        <el-button style="padding: 10px 20px" type="primary" @click="submitForm('ruleForm')">登錄</el-button>
        <el-button style="padding: 10px 20px" @click="register">我是新人</el-button>
      </el-form-item>
      <el-form-item>
        <p style="font-size: 1rem" :style="{color: Color}">
          提示:
          沒有賬號可以點擊我是新人進行註冊,只需要驗證郵箱就可以了,歡迎你的加入！
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        password: 'as555180',
        name: 'derrick',
        email: '',
        code: ''
      },
      // 顯示註冊項
      isShow: false,
      // 發送驗證碼按鈕是否可選
      showBtn: false,
      // 驗證碼倒計時
      count: 60,
      // 發送驗證碼按鈕文本
      btntext: '發送驗證碼',
      // 定時器
      timer: null,
      // 重定向
      redirect: undefined,
      rules: {
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '密碼長度最少為8位,最多16位哦,（＞人＜；）',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '用戶名不支持特殊字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    Color() {
      return this.$store.state.Color
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  mounted() {
    if (localStorage.getItem('dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk')) {
      this.showBtn = true
      this.count = parseInt(
        localStorage.getItem('dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk')
      )
      this.timer = setInterval(() => {
        this.count -= 1
        if (this.count === 0) {
          clearInterval(this.timer)
          localStorage.removeItem(
            'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk'
          )
          this.btntext = '發送驗證碼'
          this.showBtn = false
        } else {
          this.btntext = `${this.count}秒後重新發送`
          localStorage.setItem(
            'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk',
            this.count
          )
        }
      }, 1000)
    } else {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 提交表單
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          /* 註冊模式 */
          if (this.isShow) {
            /* this.$store.commit('LoadingTitle',{
                    isShow: true,
                    title: '正在註冊您的賬號請稍等...'
                }) */
            try {
              const res = await this.$api.userLogin(this.ruleForm)
              //   console.log(res);
              if (res.code === 200) {
                this.$message.success(
                  '註冊成功啦小主人,3秒後為您跳轉到首頁(❤ ω ❤)!'
                )
                /* 保存token */
                this.$store.commit('isLogin', true)
                this.$store.commit('saveUser', res.data)
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('token', res.token)
                clearInterval(this.timer)
                localStorage.removeItem(
                  'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk'
                )
                setTimeout(() => {
                  this.$router.back()
                }, 1000)
              } else {
                this.$message.error(res.msg)
              }
              /* this.$store.commit("LoadingTitleChange",{
                        isShow: false,
                        title: ''
                    }) */
            } catch (error) {
              this.$message.error(error)
            }
          } else {
            const loading = this.$loading({
              lock: true,
              text: '正在登錄請稍等片刻...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            try {
              this.$store
                .dispatch('user/login', this.ruleForm)
                .then(() => {
                  const routerPath =
                    this.redirect === '/404' || this.redirect === '/401'
                      ? '/'
                      : this.redirect
                  this.$router.push(routerPath).catch(() => {})
                })
            } catch (error) {
              this.$message.error(error)
            }
            loading.close()
          }
        } else {
          this.$message.error('請輸入完整信息,o(*￣▽￣*)o!')
        }
      })
    },
    // 顯示註冊項
    register() {
      this.isShow = !this.isShow
    },
    // 發送郵箱
    async sendMail() {
      /* 發送郵箱驗證碼 */
      if (this.ruleForm.email !== '') {
        /* 驗證郵箱是正確的的 */
        var reg = /^\d{5,10}$/
        if (reg.test(this.ruleForm.email) === true) {
          try {
            /* 發起驗證碼請求 */
            const res = await this.$api.sendEmail({
              email: this.ruleForm.email + '@qq.com'
            })
            if (res.code === 200) {
              /* 發送成功 */
              this.$message.success('驗證碼已經發送到小主的郵箱了,(●ˇ∀ˇ●)')
              /* 進行倒計時 設置定時一分鐘後可訪問 */
              localStorage.setItem(
                'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk',
                60
              )
              this.showBtn = true
              this.count = 60
              this.timer = setInterval(() => {
                this.count -= 1
                if (this.count === 0) {
                  clearInterval(this.timer)
                  localStorage.removeItem(
                    'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk'
                  )
                  this.btntext = '發送驗證碼'
                  this.showBtn = false
                } else {
                  this.btntext = `${this.count}秒後重新發送`
                  localStorage.setItem(
                    'dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk',
                    this.count
                  )
                }
              }, 1000)
            } else {
              this.$message.error(res.message)
            }
          } catch (error) {
            this.$message.error(error)
          }
        } else {
          this.$message.error('輸入正確的郵箱噢，太馬虎啦！')
        }
      } else {
        this.$message.error('郵箱不能空著呢！')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
#login {
  width: 96%;
  margin: 0 auto;
  margin-top: 12px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .demo-ruleForm {
    min-height: 620px;
    width: 60%;
  }
  .logintitle {
    font-size: 2rem;
  }
}
@media screen and (max-width: 992px) {
  #login {
    width: 100%;
    .demo-ruleForm {
      margin-top: 145px;
      width: 85%;
    }
    .logintitle {
      font-size: 1.45rem;
    }
  }
}
</style>
