/* 缓存池*/
const dataCache = {}
/* 進行池*/
const promiseCache = {}
/* 清除无关标签*/
const removeUselessTag = (response) => {
  response = response.replace(/<link.*?(\/)*?>/ig, '')
  response = response.replace(/<style[\s\S]*?<\/style>/ig, '')
  response = response.replace(/<head[\s\S]*?<\/head>/ig, '')
  response = response.replace(/<script/ig, '<cjunscript')
  response = response.replace(/<\/script>/ig, '</cjunscript>')
  response = response.replace(/src=/g, '_src=')
  return '<div>' + response + '</div>'
}
const remoteCallByHtmlCache = function($, url) {
  if (promiseCache[url]) {
    return promiseCache[url]
  }
  const rePromise = new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      complete: function(XHR, TS) {
        resolve((XHR.responseText || ''))
        delete promiseCache[url]
      }
    })
  })
  promiseCache[url] = rePromise
  return rePromise
}
const remoteCallByHtml = function($, url, parser) {
  return new Promise((resolve, reject) => {
    remoteCallByHtmlCache($, url).then((htmlBody) => {
      try {
        const tmpDom = $(removeUselessTag(htmlBody))
        const resObj = parser(tmpDom)
        resolve(resObj)
        tmpDom.empty()
        tmpDom.remove()
      } catch (e) {
        console.error(e)
        console.error('解析地址:' + url + '出现异常,请联系作者')
        resolve(undefined)
      }
    })
  })
}
const remoteCallByPost = function($, url, param, parser) {
  const cacheKey = url + JSON.stringify(param || {})
  if (promiseCache[cacheKey]) {
    return promiseCache[cacheKey]
  }
  const rePromise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'post',
      url: url,
      data: JSON.stringify(param),
      headers: { RequestVerificationToken: $('#antiforgery_token').val() },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      complete: function(XHR, TS) {
        try {
          resolve(parser ? parser((XHR.responseJSON || XHR.responseText)) : (XHR.responseJSON || XHR.responseText))
        } catch (e) {
          console.error(e)
          console.error('解析地址:' + url + '出现异常,请联系作者')
          resolve(undefined)
        } finally {
          delete promiseCache[cacheKey]
        }
      }
    })
  })
  promiseCache[cacheKey] = rePromise
  return rePromise
}
const api = {
  apiRemoteCallByHtml: remoteCallByHtml,
  apiRemoteCallByPost: remoteCallByPost,
  apiLoadMusicSong: ($, param, url) => {
    // {pic,author,title,url,lrc}
    return new Promise((resolve, reject) => {
      $.get(url, (data) => {
        resolve(data[0])
      })
    })
  },
  apiLoadMusicPlayList: ($, param, url) => {
    // [{pic,author,title,url,lrc}]
    return new Promise((resolve, reject) => {
      $.get(url, (data) => {
        resolve(data)
      })
    })
  },
  apiLoadArticleNum: ($, param, url) => {
    // {pageNum,commentNum}
    return remoteCallByHtml($, url, (dom) => {
      console.log(dom.html())
      const pageNum = parseInt((dom.find('#stats_post_count').html() || '').replace('随笔', '').replace('-', '').trim())
      const commentNum = parseInt((dom.find('#stats-comment_count').html() || '').replace('评论', '').replace('-', '').trim())
      console.log({ pageNum, commentNum })
      return { pageNum, commentNum }
    })
  },
  apiLoadBlogPostInfo: ($, param, url) => {
    // {fucus,digg}
    return remoteCallByHtml($, url, (dom) => {
      const reData = {}
      reData.fucus = (dom.find('#green_channel_follow').html() || '').trim() == '关注我'
      reData.digg = (dom.find('#green_channel_digg').html() || '').trim() == '好文要顶'
      return reData
    })
  },
  apiLoadAuthorHeadImg: ($, param, url) => {
    // {face,avatar}
    return remoteCallByHtml($, url, (dom) => {
      const src = dom.find('.author_avatar').attr('_src')
      return {
        face: src,
        avatar: src.replace('face', 'avatar')
      }
    })
  },
  apiLoadCloudLabel: ($, param, url) => {
    // {name,url}
    return remoteCallByHtml($, url, (dom) => {
      return dom.find('#taglist td a').map((i, v) => {
        const name = $(v).html()
        const url = $(v).attr('href')
        return {
          name, url
        }
      })
    })
  },
  apiLoadAuthorBlogInfo: ($, param, url) => {
    // {username,age,follow,focus,guid}
    return remoteCallByHtml($, url, (dom) => {
      const aAttr = dom.find('#profile_block a')
      const reObj = {}
      reObj.username = ($(aAttr[0]).html() || '').trim()
      reObj.age = ($(aAttr[1]).html() || '').trim()
      reObj.follow = ($(aAttr[2]).html() || '').trim()
      reObj.focus = ($(aAttr[3]).html() || '').trim()
      reObj.guid = dom.find("cjunscript:contains(getFollowStatus(')").html().replace("getFollowStatus('", '').replace("');", '')
      return reObj
    })
  },
  apiBlogFollow: ($, param, url) => {
    // msg
    return remoteCallByPost($, url, {
      blogUserGuid: param.blogUserGuid
    })
  },
  apiGetCommentBody: ($, param, url) => {
    return remoteCallByPost($, url, {
      commentId: param.commentId
    })
  },
  apiAddComment: ($, param, url) => {
    return remoteCallByPost($, url, {
      postId: param.postId,
      body: param.body,
      parentCommentId: param.parentCommentId
    })
  },
  apiUpdateComment: ($, param, url) => {
    return remoteCallByPost($, url, {
      commentId: param.commentId,
      body: param.body
    })
  },
  apiDeleteComment: ($, param, url) => {
    return remoteCallByPost($, url, {
      commentId: param.commentId,
      pageIndex: param.pageIndex,
      parentId: param.parentId
    })
  },
  apiDiggComment: ($, param, url) => {
    return remoteCallByPost($, url, {
      commentId: param.commentId,
      isAbandoned: param.isAbandoned,
      postId: param.postId,
      voteType: 'Digg'
    })
  },
  apiBuryComment: ($, param, url) => {
    return remoteCallByPost($, url, {
      commentId: param.commentId,
      isAbandoned: param.isAbandoned,
      postId: param.postId,
      voteType: 'Bury'
    })
  },
  apiVoteBlogPost: ($, param, url) => {
    return remoteCallByPost($, url, {
      isAbandoned: param.isAbandoned,
      postId: param.postId,
      voteType: 'Digg'
    })
  },
  apiBuryBlogPost: ($, param, url) => {
    return remoteCallByPost($, url, {
      isAbandoned: param.isAbandoned,
      postId: param.postId,
      voteType: 'Bury'
    })
  },
  apiLoadCommentList: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      return dom.find('.feedbackItem').map((i, v) => {
        const obj = {}
        obj.commentId = parseInt($(v).find("[class='layer']").attr('href').replace('#', ''))
        obj.level = $(v).find('.layer').html()
        obj.label = $(v).find('.louzhu').html() || ''
        obj.date = $(v).find('.comment_date').html()
        obj.author = $(v).find("[id^='a_comment_author_']").text()
        obj.authorUrl = $(v).find("[id^='a_comment_author_']").attr('href')
        obj.desc = $(v).find("[id^='comment_body_']").html().replace(new RegExp('_src', 'g'), 'src').trim()
        obj.digg = $(v).find('.comment_digg').length >= 1 ? $(v).find('.comment_digg').html().trim().replace('支持(', '').replace(')', '') : undefined
        obj.burry = $(v).find('.comment_burry').length >= 1 ? $(v).find('.comment_burry').html().trim().replace('反对(', '').replace(')', '') : undefined
        obj.avatarUrl = ($(v).find("[id^='comment_'][id$='_avatar']").html() || '').trim()
        obj.avatarHdUrl = (($(v).find("[id^='comment_'][id$='_avatar']").html() || '').trim()).replace('face', 'avatar')
        obj.replayBtn = $(v).find("[onclick^='return ReplyComment']").length > 0
        obj.quoteBtn = $(v).find("[onclick^='return QuoteComment']").length > 0
        obj.delBtn = $(v).find("[onclick^='return DelComment']").length > 0
        obj.updateBtn = $(v).find("[onclick^='return GetCommentBody']").length > 0
        return obj
      })
    })
  },
  apiLoadCategoriesTags: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const obj = {}
      obj.categorys = dom.find('#BlogPostCategory a').map((i, v) => {
        const title = $(v).html()
        const url = $(v).attr('href')
        return { title, url }
      })
      obj.tags = dom.find('#EntryTag a').map((i, v) => {
        const title = $(v).html()
        const url = $(v).attr('href')
        return { title, url }
      })
      return obj
    })
  },
  apiLoadCommentCount: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      return dom.html()
    })
  },
  apiLoadViewCount: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      return dom.html()
    })
  },

  apiLoadArticle: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const obj = {}
      obj.title = dom.find('#topics').find('#cb_post_title_url span').html()
      obj.body = '<div class="postBody">' + dom.find('#topics').find('.postBody').html().replace(new RegExp('_src', 'g'), 'src') + '</div>'
      obj.time = dom.find('#topics .postDesc #post-date').html()
      obj.editUrl = dom.find("#topics .postDesc [rel='nofollow']").attr('href')
      obj.fontNum = dom.find('#topics').find('.postBody').text().length
      obj.readNum = dom.find('#post_view_count').text()
      obj.pageId = param.articleId
      return obj
    })
  },

  apiLoadTagList: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const title = (dom.find('.PostListTitle').html() || '').trim()
      const list = dom.find('#mainContent .PostList').map((i, v) => {
        const obj = {}
        obj.title = $(v).find("[id*='TitleUrl'] span").html().trim()
        obj.url = $(v).find("[id*='TitleUrl']").attr('href').trim()
        const timeSpl = $(v).find('.postDesc2').text().trim().split('\n')[0].split(' ')
        obj.time = timeSpl[1] + ' ' + timeSpl[2]
        obj.readNum = parseInt($(v).find('.postDesc2 .post-view-count').text().replace('阅读:', '').replace(')', ''))
        obj.commentNum = parseInt($(v).find('.postDesc2 .post-comment-count').text().replace('评论:', '').replace(')', ''))
        obj.recommendNum = parseInt($(v).find('.postDesc2 .post-digg-count').text().replace('推荐:', '').replace(')', ''))
        obj.editUrl = $(v).find('.postDesc2 a').attr('href').trim()
        return obj
      })
      return {
        title,
        list
      }
    })
  },
  __loadCommonListParser: (dom) => {
    const title = (dom.find('.entrylistTitle').html() || '').trim()
    const list = dom.find('#mainContent .entrylistItem').map((i, v) => {
      const obj = {}
      obj.title = $(v).find('.entrylistItemTitle span').html().trim()
      obj.url = $(v).find('.entrylistItemTitle').attr('href').trim()
      obj.desc = $(v).find('.c_b_p_desc').html().trim()
      obj.time = $(v).find(".entrylistItemPostDesc [title='permalink']").html().trim()
      obj.readNum = parseInt($(v).find('.entrylistItemPostDesc .post-view-count').text().replace('阅读(', '').replace(')', ''))
      obj.commentNum = parseInt($(v).find('.entrylistItemPostDesc .post-comment-count').text().replace('评论(', '').replace(')', ''))
      obj.recommendNum = parseInt($(v).find('.entrylistItemPostDesc .post-digg-count').text().replace('推荐(', '').replace(')', ''))
      obj.editUrl = $(v).find(".entrylistItemPostDesc [rel='nofollow']").attr('href').trim()
      return obj
    })
    return {
      list, title
    }
  },
  apiLoadArchiveList: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      return api.__loadCommonListParser(dom)
    })
  },
  apiLoadCategoryList: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      return api.__loadCommonListParser(dom)
    })
  },
  apiLoadPrevnext: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const pre = dom.find('.p_n_p_prefix:contains(«)').attr('href')
      const pos = dom.find('.p_n_p_prefix:contains(»)').attr('href')
      let preId, posId
      if (pre) {
        const preArr = pre.split('/')
        preId = preArr[preArr.length - 1].replace('.html', '')
      }
      if (pos) {
        const posArr = pos.split('/')
        posId = posArr[posArr.length - 1].replace('.html', '')
      }
      return { preId, posId }
    })
  },
  apiLoadDefaultCategoryList: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const title = ''
      const list = dom.find('#mainContent .day').map((i, v) => {
        const objArray = []
        const archiveTime = $(v).find('.dayTitle a').html().trim()
        const blockSize = $(v).find('.postTitle').length
        for (let i = 0; i < blockSize; i++) {
          const obj = {}
          obj.archiveTime = archiveTime
          const postTitle = $(v).find('.postTitle').eq(i)
          obj.title = postTitle.find('a span').text().trim()
          obj.url = postTitle.find('a').attr('href')
          const postCon = $(v).find('.postCon')
          postCon.find('.c_b_p_desc a').remove()
          obj.desc = postCon.find('.c_b_p_desc').html().trim()
          const postDesc = $(v).find('.postDesc')
          obj.time = postDesc.html().split('\n')[0].split('@')[1].trim()
          obj.readNum = parseInt(postDesc.text().split('\n')[2].replace('阅读(', '').replace(')', '').trim())
          obj.commentNum = parseInt(postDesc.text().split('\n')[3].replace('评论(', '').replace(')', ''))
          obj.recommendNum = parseInt(postDesc.text().split('\n')[4].replace('推荐(', '').replace(')', ''))
          obj.editUrl = postDesc.find('a').attr('href').trim()
          const idArr = obj.url.split('/')
          obj.pageId = idArr[idArr.length - 1].replace('.html', '')
          objArray.push(obj)
        }
        return objArray
      }).toArray().flat()
      const parseToNum = function(url) {
        return parseInt((url.split('page=')[1] || '').trim())
      }
      let pageList = []
      pageList = dom.find('#nav_next_page a').map((i, item) => {
        item = $(item)
        const num = parseToNum(item.attr('href'))
        const text = item.html().trim()
        const focus = true
        return { num, text, focus }
      })
      pageList = pageList.length > 0 ? pageList : dom.find('#homepage_top_pager .pager').text().split('\n').map((item) => item.trim()).filter((item) => item != '').map((item) => {
        const pageNumDom = dom.find('#homepage_top_pager .pager').find('a:contains(' + item + ')')
        const num = pageNumDom.length > 0 ? parseToNum(pageNumDom.attr('href')) : item
        const text = item
        const focus = pageNumDom.length == 0
        return { num, text, focus }
      })

      return { list, title, pageList }
    })
  },
  apiLoadSideColumn: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      /* 通用解析器*/
      const commonParser = (i, v) => {
        const url = $(v).attr('href')
        const title = $(v).text()
        return { url, title }
      }
      /* 获取常用链接*/
      const catListLink = dom.find('.catListLink li a').map(commonParser)
      /* 获取最新随笔*/
      const catListEssay = dom.find('.catListEssay li a').map(commonParser)
      /* 获取我的标签*/
      const catListTag = dom.find('.catListTag li a').map((i, v) => {
        const re = commonParser(i, v)
        const splitTmp = $(v).parent().remove('a').text().trim().split('(')
        if (splitTmp[1]) {
          re.num = parseInt(splitTmp[1].replace(')', ''))
        }
        return re
      })
      /* 获取积分与排行*/
      const catListBlogRank = {}
      catListBlogRank['liScore'] = dom.find('liScore').text().trim()
      catListBlogRank['liRank'] = dom.find('liRank').text().trim()
      /* 带数字通用解析器*/
      const commentTakeNumParse = (i, v) => {
        const re = commonParser(i, v)
        const splitTmp = re.title.split('(')
        re.title = splitTmp[0]
        re.num = parseInt(splitTmp[1].replace(')', ''))
        return re
      }
      /* 获取随笔分类*/
      const catListPostCategory = dom.find('.catListPostCategory li a').map(commentTakeNumParse)
      /* 获取随笔档案*/
      const catListPostArchive = dom.find('.catListPostArchive li a').map(commentTakeNumParse)
      /* 最新评论*/
      let commentItem = {}
      const catListComment = []
      dom.find('.catListComment li').each((i, v) => {
        const domTmp = $(v)
        if (domTmp.hasClass('recent_comment_title')) {
          commentItem.url = domTmp.find('a').attr('href')
          commentItem.title = domTmp.find('a').text()
        } else if (domTmp.hasClass('recent_comment_body')) {
          commentItem.body = domTmp.text()
        } else if (domTmp.hasClass('recent_comment_author')) {
          commentItem.committer = domTmp.text().replace('--', '')
          catListComment.push(commentItem)
          commentItem = {}
        }
      })
      return {
        catListLink,
        catListEssay,
        catListTag,
        catListBlogRank,
        catListPostCategory,
        catListPostArchive,
        catListComment
      }
    })
  },
  apiLoadTopLists: ($, param, url) => {
    return remoteCallByHtml($, url, (dom) => {
      const commonParser = (i, v) => {
        const url = $(v).attr('href')
        const splTmp = $(v).text().trim().split('(')
        const title = splTmp[0]
        const num = parseInt(splTmp[1].replace(')', '').trim())
        return { url, title, num }
      }
      const topViewPostsBlock = dom.find('#TopViewPostsBlock li a').map(commonParser)
      const topFeedbackPostsBlock = dom.find('#TopFeedbackPostsBlock li a').map(commonParser)
      const topDiggPostsBlock = dom.find('#TopDiggPostsBlock li a').map(commonParser)
      return { topViewPostsBlock, topFeedbackPostsBlock, topDiggPostsBlock }
    })
  },
  __loadFaceCache: {},
  apiLoadCommitterFaceUrl: ($, param, url) => {
    const dataCache = api.__loadFaceCache
    const committerName = param.committerName
    if (dataCache[committerName]) {
      return new Promise((resolve, reject) => {
        resolve(dataCache[committerName])
      })
    }
    return remoteCallByHtml($, url, (dom) => {
      dom.find('.feedbackItem').each((i, v) => {
        const cacheName = ($(v).find("[id^='a_comment_author_']").html() || '').trim()
        const cacheValue = ($(v).find("[id$='_avatar']").html() || '').trim()
        if (cacheName && cacheValue) {
          dataCache[cacheName] = cacheValue
        }
      })
      return dataCache[committerName]
    })
  }
}
export default api
