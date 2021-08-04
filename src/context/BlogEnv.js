const blogUrlPre = 'https://www.cnblogs.com/'
const manPage = 'https://i.cnblogs.com/'
let sendPage = 'https://msg.cnblogs.com/send/${BLOG_ACC}'
let subPage = 'https://www.cnblogs.com/${BLOG_ACC}/rss'
let indexPage = blogUrlPre + '${BLOG_ACC}'
const autoInfoReset = true
let blogAcc = 'cjunn'
let blogId = '571504'
let blogPostId = '12436930'
let blogName = 'C君'
let blogUserGuid = '2476b4f3-9f13-4c75-389e-08d789d7fa8d'
const pageBarImgs = 21
const myCommentSize = 10
const blogCommentSize = 50
const commentLength = 10
const openMathJax = false
const urlMathJax = 'https://mathjax.cnblogs.com/2_7_5/MathJax.js?config=TeX-AMS-MML_HTMLorMML'

const setBlogAccAndId = (acc, id) => {
  blogAcc = acc
  blogId = id
  sendPage = sendPage.replace('${BLOG_ACC}', acc)
  subPage = subPage.replace('${BLOG_ACC}', acc)
  indexPage = indexPage.replace('${BLOG_ACC}', acc)
}
const setGidAndName = () => (gid, name) => {
  blogUserGuid = gid
  blogName = name
}
const setPid = (pId) => {
  blogPostId = pId
}
export default {
  blogUrlPre,
  manPage,
  sendPage,
  subPage,
  indexPage,
  autoInfoReset,
  blogAcc,
  blogId,
  blogPostId,
  blogName,
  blogUserGuid,
  setBlogAccAndId,
  setGidAndName,
  setPid,
  pageBarImgs,
  commentLength,
  openMathJax,
  urlMathJax,
  myCommentSize,
  blogCommentSize
}
