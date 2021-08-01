<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="content"
      :toolbars-flag="toolbarsFlag"
      :subfield="subfield"
      :default-open="defaultOpen"
      :ishljs="true"
      code-style="rainbow"
      preview-background="background-color: rgba($color: #fff, $alpha: 0.6);"
      style="min-height: 600px;"
      @change="change"
      @imgAdd="$imgAdd"
    />
    <!-- <button @click="submit">提交</button> -->
  </div>
</template>

<script>
import axios from 'axios'
// 導入組件 及 組件樣式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  // 註冊
  components: {
    mavonEditor
  },
  props: {
    subfield: {
      type: Boolean,
      default: false
    },
    defaultOpen: {
      type: String,
      default: 'edit'
    },
    toolbarsFlag: {
      type: Boolean,
      default: true
    },
    previewBackground: {
      type: String,
      default: '#fbfbfb'
    }
  },
  data() {
    return {
      content: '', // 輸入的markdown
      html: '' // 及時轉的html
    }
  },
  computed: {
    articleImageUpload() {
      return `${this.$store.state.baseURL}/admin/uploadCover`
    }
  },
  mounted() {

  },
  methods: {
    // 上傳文件回調
    async $imgAdd(pos, $file) {
      // 第一步，將圖片上傳到服務器
      const formdata = new FormData()
      formdata.append('file', $file)
      // console.log($file, formdata)
      axios({
        url: `${this.$store.state.baseURL}/admin/uploadCover`,
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((data) => {
        // 第二部，將返回的url替換到文本原位置![...](0) -> ![...](url)
        /**
                 * $vm 指為mavonEditor實例，可以通過如下兩種方式獲取
                 * 1. 通過引入對象獲取: `import {mavonEditor} from ...` 等方式引入後，`$vm`為`mavonEditor`
                 * 2. 通過$refs獲取: html聲明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`為 `this.$refs.md`
                 */
        // console.log(pos)
        this.$refs.md.$img2Url(pos, data.data.file.url)
      })
    },
    // 所有操作都會被解析重新渲染
    change(value, render) {
      // render 為 markdown 解析後的結果[html]
      // console.log(value, render)
      this.html = render
    },
    // 提交
    submit() {
      // console.log(this.content);
      // console.log(this.html);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
