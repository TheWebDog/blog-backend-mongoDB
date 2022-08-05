const express = require('express')
const router = express.Router()
const path = require('path')
const fsPromises = require('fs').promises
const async = require('async')
const pinyinPro = require('pinyin-pro').pinyin
const multiparty = require('multiparty') // 处理fromdata图片的中间件
const mongoControl = require('../mongoControl')// 引入mongoControl

const pageData = new mongoControl('myblog', 'pageData')
const commentData = new mongoControl('myblog', 'commentData')
const savePageData = new mongoControl('myblog', 'savePageData')
const userData = new mongoControl('myblog', 'userData')

// models 封装好mongodb的对象
const PageModel = require('../models/page')
const SavePageModel = require('../models/savePage')
const UserCommentModel = require('../models/comment')


// 图片--------------------------------------------------------------------------------

// md文章图片获取
// 格式要求：res.send(`http://${req.headers.host}/page/getPic?picUrl=${XXX}`)
router.get('/getPic', function (req, res) {
  var { picUrl } = req.query
  res.sendFile(path.resolve(`./${picUrl}`))
})

// md文章图片删除
router.get('/removePic', function (req, res) {
  var { picUrl } = req.query
  fsPromises.unlink(`./${picUrl}`)
  res.send('removed')
})

// md文章图片增添
router.post('/submitMavonPic', function (req, res) {
  // new一个Form类 并写入存放路径uploadDir
  var form_pic = new multiparty.Form({ uploadDir: './public/images' })
  // 对数据进行处理
  form_pic.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('submitMavonPic时err了')
      res.send('submitMavonPic时err了')
    } else {
      var pic_path = files.mavon_editor_pic[0].path
      var requirePath = `http://${req.headers.host}/page/getPic?picUrl=${pic_path}`
      res.send({ requirePath, pic_path })
    }
  })
})

// 接收文章----------------------------------------------------------------------------
router.post('/submitPage', function (req, res) {
  ; (async () => {
    var resault = await pageData.findData({}, function (e) {
      console.log(e)
    })
    console.log('resault',resault)
    res.send('')
  })()

  // ;(async () => {
  //   // new一个Form类 并写入存放路径uploadDir
  //   var form_pic = new multiparty.Form({ uploadDir: './public/images' })
  //   // 对数据进行处理
  //   form_pic.parse(req, async (err, fields, files) => {
  //     if (err) {
  //       // 数据处理错误
  //       console.log('submitPage时err了')
  //       res.send('submitPage时err了')
  //     } else {
  //       // 数据取出
  //       var { title, category, synopsis, md, html, mdPic } = fields
  //       // 我去太奶奶的 竟然都是数组 就那么一项 给我整数组嘎哈 靠靠靠靠靠 mlgbz的
  //       var title = title[0]
  //       // 判断重名文章
  //       var resault = await pageData.findData({ title: title })
  //       console.log(resault)
  //       // if (resault.length == 0) {
  //       //   // 不重名 规划数据并存入mongoose
  //       //   var category = category[0]
  //       //   var synopsis = synopsis[0]
  //       //   var md = md[0]
  //       //   var html = html[0]
  //       //   var pic_path = files.pic[0].path
  //       //   mdPic[0].length == 0 ? (mdPic = []) : mdPic
  //       //   mdPic.push(pic_path)
  //       //   var coverRequirePath = `http://${req.headers.host}/page/getPic?picUrl=${pic_path}`
  //       //   var now = new Date()
  //       //   var day = now.getDate()
  //       //   var month = now.getMonth() + 1
  //       //   var year = now.getFullYear()
  //       //   var pinyinAndTitle =
  //       //     pinyinPro(title, { toneType: 'none' })
  //       //       .split(' ')
  //       //       .join('')
  //       //       .toLowerCase() + title
  //       //   const thepage = new PageModel({
  //       //     title,
  //       //     pinyinAndTitle,
  //       //     coverRequirePath,
  //       //     category,
  //       //     synopsis,
  //       //     date: `${year}-${month}-${day}`, // 日期
  //       //     md,
  //       //     html,
  //       //     mdPic,
  //       //   })
  //       //   thepage.save(function (err, result) {
  //       //     // 文章存入mongoose
  //       //     if (err) {
  //       //       // console.log(err, '-----------err')
  //       //       res.send('失败')
  //       //     } else {
  //       //       // console.log(result, '-----------res')
  //       //       res.send('成功')
  //       //     }
  //       //   })
  //       // } else {
  //       //   // 重名 删除本次存放的图片 并返回结果提示
  //       //   var pic_path = files.pic[0].path
  //       //   fsPromises.unlink(pic_path)
  //       //   res.send('文章标题重复，请修改')
  //       // }
  //     }
  //   })
  // })().catch((e) => console.error(e, 'err'))
})



module.exports = router