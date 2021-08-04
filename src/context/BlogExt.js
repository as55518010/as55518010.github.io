const musicApiUrl = 'https://api.i-meto.com/meting/api?server=netease&type=:type&id=:id&r=:r'
const extendStylePath = 'https://cjunn.gitee.io/blog_theme_atum'
const headBackImg = `${extendStylePath}/img/ing/autorbimg.jpg`
const bigBackImg = `${extendStylePath}/img/body/background.jpg`
const panelItemPic = Array.from(Array(35), (v, k) => (`${extendStylePath}/img/pageItem/page-item-$I.jpg`).replace('$I', k + 1))
const panelRightImgPic = Array.from(Array(10), (v, k) => (`${extendStylePath}/img/menuIcon/menuicon-$I.png`).replace('$I', k))
const musicSignImg = `${extendStylePath}/img/body/music_play.png`
const blogSign = '自惭多情污梵行，入山又恐误倾城。世间安得双全法，不负如来不负卿。'
const aboutmeHtml = `<img src='${extendStylePath}/img/ing/aboutme.jpg'/>`
const avatarSign = ' ↗↗点击头像关注我。'
const ingTitle = '你的一字一句犹如刀疤划心上，我的一举一动随你改变多荒唐。'
const blogFriendList = [] // {name: '', url: ''}格式
const blogUsedLinks = [] // {name: '', url: ''}格式
const musicIds = ['1382596189']
const qq = '592571519'
const email = '592571519@qq.com'
const github = 'cjunn'
const defHeadImg = `${extendStylePath}/img/body/defAvatar.jpg`
const themeStyle = 'style0'
const feelingBlogId = 13393903
const mainExtNav = [
  { title: '首页', url: '/subject/category/default.html', icon: 'home' },
  { title: '博客动态', url: 'https://www.cnblogs.com/cjunn/', icon: 'comment1' },
  { title: '博主简历', url: 'https://www.cnblogs.com/cjunn/', icon: 'face2' },
  { title: '主题反馈', url: '/c/subject/p/12494785.html', icon: 'bug' },
  { title: '赞赏博主', url: '/c/subject/p/12495086.html', icon: 'gift' }
]

const adDisplay = '<div class="blog-cloud-ad-item">\n' +
  '            <img src="https://img.alicdn.com/tfs/TB1nkoQDlv0gK0jSZKbXXbK2FXa-440-240.jpg"\n' +
  "                 onclick=\"window.open('https://www.aliyun.com/activity/daily/cloud?userCode=njf7bpon')\">\n" +
  '          </div>\n' +
  '          <div class="blog-cloud-ad-item">\n' +
  '            <img src="https://upload-dianshi-1255598498.file.myqcloud.com/345-60759ea0b2a21d3d1c764570c2a9f2960bfdf128.200.jpg"\n' +
  "                 onclick=\"window.open('https://url.cn/OLi4lNzq')\">\n" +
  '          </div>'
export default {
  musicSignImg,
  panelRightImgPic,
  musicApiUrl,
  extendStylePath,
  panelItemPic,
  headBackImg,
  bigBackImg,
  blogSign,
  aboutmeHtml,
  avatarSign,
  ingTitle,
  blogFriendList,
  blogUsedLinks,
  musicIds,
  qq,
  email,
  github,
  defHeadImg,
  themeStyle,
  feelingBlogId,
  mainExtNav,
  adDisplay
}
