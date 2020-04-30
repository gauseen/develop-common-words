const path = require('path')
const fs = require('fs')

const srcPath = path.resolve(__dirname, '../src')
const outputFileName = 'gh-pages/allWordList.js'
const globName = 'var allWordList'

fs.readdir(srcPath, (err, files) => {
  if (err) throw err
  let allWordList = generateTypewritingDataList(files)
  generateMarkDown(`${globName} = ${JSON.stringify(allWordList)}`)
})

// 生成练习打字数据
function generateTypewritingDataList (files) {

  let allWords = files.reduce((acc, currFileName) => {
    let oneFileWords = require(`${srcPath}/${currFileName}`)
      .filter(item => Boolean(item.word))

    return acc.concat(oneFileWords)
  }, [])

  let result = []
  let step = 10
  for (let i = 0; i < allWords.length; i += step) {
    result.push(allWords.slice(i, i + step))
  }

  return result
}

// 生成 .js 文件
function generateMarkDown (dataStr) {
  fs.writeFile(outputFileName, dataStr, (err) => {
    if (err) throw err
  })
}
