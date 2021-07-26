<template>
  <div id="Info">
    <div v-if="!token" style="text-align:center;padding-top:8rem;" :style="{color: Color}">
      糟糕，您還沒有登陸檢測不到信息! ~§(*￣▽￣*)§~
      <!-- <p>如果已登錄，刷新頁面即可看到個人信息~</p> -->
    </div>
    <div v-if="token" class="SuccessInfo">
      <h4 style="color:orange;margin-bottom:1rem;" :style="{color: Color}">下面這些就是您的個人信息啦(●ˇ∀ˇ●)~</h4>
      <img :src="userInfo.detail.avatar.url" alt="這是頭像啦啦啦~">
      <el-upload
        v-show="flag"
        class="avatar-uploader"
        :action="ImageUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <i class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <el-button type="primary" class="back_out" @click="open">退出登錄</el-button>
      <p><span>昵稱:</span><input
        v-model="userInfo.name"
        :class="{active:!flag}"
        :disabled="!flag"
        class="name"
        type="text"
      ></p>
      <p><span>介紹:</span><input
        v-model="userInfo.detail.description"
        :class="{active:!flag}"
        :disabled="!flag"
        class="info"
        type="text"
      ></p>
      <p>
        <el-button class="editor_Info" type="default" @click="updateInfo">編輯信息</el-button>
        <el-button v-show="flag" class="primary" type="primary" @click="submit">提交</el-button>
      </p>
      <p :style="{color: Color}">溫馨提示:如果點錯了,再次點擊編輯信息可以取消編輯哦(。・∀・)ノ</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  props: {},
  data() {
    return {
      flag: false,
      modal1: false,
      imageUrl: ''
    }
  },
  computed: {
    ImageUpload() {
      return `${this.$store.state.baseURL}/users/editAvatar`
    },
    Color() {
      return this.$store.state.Color
    },
    ...mapGetters({
      userInfo: 'user/userInfo',
      token: 'user/accessToken'
    })
  },
  methods: {
    // 確認是否`退出`登錄
    open() {
      this.$confirm('確定要退出登陸嗎？(✿◕‿◕✿)', '退出登錄提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$store.dispatch('user/logout', this.ruleForm).then(() => {
            const routerPath = '/'
            this.$router.push(routerPath).catch(() => {})
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '不想退出可以多看看噢！(●ˇ∀ˇ●)'
          })
        })
    },
    // 打開編輯框
    updateInfo() {
      this.flag = !this.flag
    },
    // 提交
    async submit() {
      /* 更改長度不能大於12 */
      if (this.MyInfo.name.length > 12) {
        return this.$message.error('昵稱長度不能大於12')
      }
      const res = await this.$api.updateInfo({
        token: this.token,
        introduction: this.MyInfo.introduction,
        name: this.MyInfo.name,
        avatar: this.MyInfo.avatar
      })
      // console.log(res)
      if (res.code === 200) {
        this.flag = false
        this.$store.commit('saveUser', res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.imageUrl = file.response.file.url
      this.MyInfo.avatar = file.response.file.url
    }
    /* beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上傳頭像圖片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上傳頭像圖片大小不能超過 2MB!');
            }
            return isJPG && isLt2M;
        } */
  }
}
</script>

<style lang='scss' scoped>
#Info {
  height: 100%;
  width: 96%;
  margin: 0 auto;
  margin-top: 12px;
  position: relative;
  // z-index: 5;
  display: flex;
  justify-content: center;
  // align-items: center;
  // background-color: rgba($color: #f2f2f2, $alpha: 0.6);
  .SuccessInfo {
    padding-top: 150px;
    padding-left: 20px;
    min-height: 700px;
    img {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      box-shadow: 0 0 5px #ccc;
      margin: 16px 0 0 16px;
      position: relative;
      z-index: 3;
    }
    p {
      text-align: left;
      font-size: 19.2px;
      margin: 8px;
      font-weight: bold;
      span {
        color: lightblue;
        font-weight: bold;
      }
    }
    .name,
    .info {
      font-size: 14px;
      border: 0;
      outline: none;
      padding: 3.2px;
      transition: all 0.5s;
      font-weight: bold;
      border-radius: 3.2px;
      margin-left: 3.2px;
      margin-bottom: 6px;
      height: 48px;
      background: #f2f2f2;
      padding-left: 16px;
    }
    .info {
      width: 80%;
    }
    .active {
      background: transparent !important;
    }
    .editor_Info,
    .primary,
    .back_out {
      margin: 16px;
      position: relative;
      z-index: 3;
    }
    .back_out {
      font-size: 8px;
      margin: 0 0 24px 32px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  // cursor: pointer;
}
</style>
