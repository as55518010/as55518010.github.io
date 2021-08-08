import BlogEnv from './BlogEnv.js'
import BlogApi from './BlogApi.js'
import BlogExt from './BlogExt.js'
import BlogFace from './BlogFace.js'
import BlogEncryConst from './BlogEncryConst.js'
window.__BLOG_CONFIG__ = window.__BLOG_CONFIG__ || {}
let BlogContext = {}
BlogContext = Object.assign(BlogContext, BlogEnv)
BlogContext = Object.assign(BlogContext, BlogExt)
BlogContext = Object.assign(BlogContext, BlogFace)
BlogContext = Object.assign(BlogContext, BlogEncryConst)
BlogContext = Object.assign(BlogContext, BlogApi)
BlogContext = Object.assign(BlogContext, window.__BLOG_CONFIG__)
export default BlogContext