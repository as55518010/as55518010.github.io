<template>
  <div id="blog_author_aside">
    <div class="blog-author-aside-wrap">
      <div class="contact-title">聯繫方式</div>
      <div class="contact-item">
        <span class="contact-png">
          <img id="author-email-img" src="https://cjunn.gitee.io/blog_theme_atum/img/ing/email.png" @click="sendEmail">
        </span>
        <span class="contact-content">
          <div class="contact-content-top">email</div>
          <div class="contact-content-bottom">{{ blogAuthorEmail }}</div>
        </span>
      </div>
      <div class="contact-item">
        <span class="contact-png">
          <img id="author-github-img" src="https://cjunn.gitee.io/blog_theme_atum/img/ing/github.png" @click="goGithub">
        </span>
        <span class="contact-content">
          <div class="contact-content-top">github</div>
          <div class="contact-content-bottom">{{ blogAuthorGithub }}</div>
        </span>
      </div>
      <div class="about-me-wrap">
        <div class="about-me-head">關於我</div>
        <a-card class="about-me-body">
          <img
            slot="cover"
            alt="example"
            src="https://images.plurk.com/2CzJcXKK82bJVb3WXilf.jpg"
          >
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    blogGithubUrl() {
      return this.$store.getters['bloginfo/blogGithubUrl']
    },
    blogAuthorGithub() {
      return this.$store.state.bloginfo.author.blogAuthorGithub
    },
    blogAuthorEmail() {
      return this.$store.state.bloginfo.author.blogAuthorEmail
    }
  },
  methods: {
    sendEmail() {
      return window.open(`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${this.blogAuthorEmail}`)
    },
    goGithub() {
      return window.open(this.blogGithubUrl)
    }
  }
}
</script>

<style lang="scss">
  #blog_author_aside {
    display: inline-block;
    vertical-align: top;
    position: absolute;
    bottom: 0px;
    top: 0px;
    border-left: 1px solid #dee5e7;
    box-sizing: border-box;
    transform: translateX(-1px);
    @include ingAsideLeft();
    @include deve4() {
      display: none;
    }
    @include switchHeadBar() {
      display: none;
    }
    width: 255px;
    overflow-x: hidden;
    padding: 15px 18px 15px 18px;
    font-size: 0;
    box-sizing: border-box;

    .blog-author-aside-wrap {
      .contact-title {
        font-size: 16px;
        color: #58666e;
      }

      .contact-item {
        color: #58666e;
        cursor: pointer;
        margin-top: 18px;

        .contact-content {
          display: inline-block;
          margin-left: 10px;
          position: relative;
          bottom: 4px;

          .contact-content-top {
            font-size: 12px;
            color: rgb(122, 126, 123);
            margin-bottom: 3px;
          }

          .contact-content-bottom {
            font-size: 10px;
            color: rgb(152, 166, 173);
          }

        }

        .contact-png {
          display: inline-block;
          border: 2px solid white;
          box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
          border-radius: 31px;
          width: 31px;
          height: 31px;
          padding: 3px;
          overflow: hidden;

          img {
            width: 31px;
            height: 31px;
          }
        }
      }

      .about-me-wrap {
        margin-top: 32px;
        margin-left: -10px;
        margin-right: -10px;
        background-color: rgb(253, 253, 253);

        .about-me-head {
          font-size: 13px;
          cursor: pointer;
          padding: 10px;
          border-top: 1px solid rgb(211, 217, 219);
          border-left: 1px solid rgb(211, 217, 219);
          border-right: 1px solid rgb(211, 217, 219);
          border-bottom: 1px solid rgb(226, 232, 234);
          border-radius: 6px 6px 0px 0px;
        }

        .about-me-body {
          border-left: 1px solid rgb(211, 217, 219);
          border-right: 1px solid rgb(211, 217, 219);
          border-bottom: 1px solid rgb(211, 217, 219);
          border-radius: 0px 0px 6px 6px;
          padding: 10px 20px 20px 20px;
          font-size: 15px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
