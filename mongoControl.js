const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoUrl =
  'mongodb://TheWebDog:123456987@ac-qk0tbq4-shard-00-00.pjziwos.mongodb.net:27017,ac-qk0tbq4-shard-00-01.pjziwos.mongodb.net:27017,ac-qk0tbq4-shard-00-02.pjziwos.mongodb.net:27017/?ssl=true&replicaSet=atlas-5a6pyu-shard-0&authSource=admin&retryWrites=true&w=majority'
const ObjectId = mongodb.ObjectId

// 类/构造器
var MongoControl = function (kuName, biaoName) {
  // 定义'库'和'表'的名字
  this.kuName = kuName
  this.biaoName = biaoName

  // 插入一条数据
  this.insertOneData = function (newData, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.insertOne(newData, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 插入多条数据
  this.insertManyData = function (newDataArr, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.insertMany(newDataArr, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 删除一条数据
  this.delteOneData = function (conditionObj, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.deleteOne(conditionObj, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 删除多条数据
  this.deleteManyData = function (conditionObj, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.deleteMany(conditionObj, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 通过id来删除数据
  this.delteOneDataById = function (idStr, callback) {
    var idObj = {
      _id: ObjectId(idStr),
    }
    this.delteOneData(idObj, callback)
  }

  // 查找数据
  this.findData = function (conditionObj, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.find(conditionObj).toArray((error, res) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(res)
              } else {
                console.log(res)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 通过id来查找数据
  this.findDataById = function (IdStr, callback) {
    var idObj = {
      _id: ObjectId(IdStr),
    }
    this.findData(idObj, callback)

    // 也可以
    // MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
    //     console.log(this,this.kuName,this.biaoName)
    //     if(err){
    //         console.log(err)
    //         return
    //     }else{
    //         // 选库
    //         var db=client.db(this.kuName)
    //         // 选表
    //         var coll=db.collection(this.biaoName)
    //         // 数据操作
    //         coll.find({_id:ObjectId(IdStr)}).toArray((error,res)=>{
    //             if(error){
    //                 console.log(error)
    //                 return
    //             }else{
    //                 if(callback){
    //                     callback(res[0])
    //                 }else{
    //                     console.log(res[0])
    //                 }
    //                 client.close()
    //             }
    //         })
    //     }
    // })
  }

  // 修改一条数据
  this.updateOneData = function (conditionObj, newData, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.updateOne(conditionObj, { $set: newData }, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 修改多条数据
  this.updateManyData = function (conditionObj, newData, callback) {
    MongoClient.connect(
      mongoUrl,
      { useUnifiedTopology: true },
      (err, client) => {
        // console.log(this,this.kuName,this.biaoName)
        if (err) {
          console.log(err)
          return
        } else {
          // 选库
          var db = client.db(this.kuName)
          // 选表
          var coll = db.collection(this.biaoName)
          // 数据操作
          coll.updateMany(conditionObj, { $set: newData }, (error, final) => {
            if (error) {
              console.log(error)
              return
            } else {
              if (callback) {
                callback(final.result)
              } else {
                console.log(final.result)
              }
              client.close()
            }
          })
        }
      }
    )
  }

  // 通过id修改一条数据
  this.updateOneDataById = function (idStr, newData, callback) {
    var idObj = {
      _id: ObjectId(idStr),
    }
    this.updateOneData(idObj, newData, callback)
  }
}

// 测试

// var addressBook=new MongoControl('ku1','mans')

// addressBook.insertOneData({name:"bgt",number:29474810},(final)=>{
//     console.log('这是有callback的打印结果',final)
// })

// addressBook.findData({})

// addressBook.updateOneDataById('605ed9762200b31ee0dbd0f2',{name:"cdc",age:222},(res)=>{
//     console.log(res)
// })

// 导出
module.exports = MongoControl
