const path = require('path')
const fs = require('fs')

const title = `\
## :tada: :heart: 支持在线打字 [戳这里😄](https://gauseen.github.io/develop-common-words/)

## :pencil: 程序员高频单词 :runner: :runner: :runner:
`
const srcPath = path.resolve(__dirname, '../src')
const outputFileName = 'dist/README.md'

fs.readdir(srcPath, (err, files) => {
  if (err) throw err
  generateDataByTemplate(files)
})

// 生成字符串数据
function generateDataByTemplate (files) {
  let result = title
  let count = 0

  for (file of files) {
    let subtitle = file.replace('.js', '').toUpperCase()
    let words = require(`${srcPath}/${file}`)

    if (Array.isArray(words)) {
      result += generateSubtitleTemplate(subtitle)
      for (wordItem of words.sort()) {
        if (!wordItem.word) continue
        result += generateWordTemplate(wordItem)
        count++
      }
    }
  }

  result += generateTailTemplate(count)
  generateMarkDown(result)
}

// 生成 .md 文件
function generateMarkDown (dataStr) {
  fs.writeFile(outputFileName, dataStr, (err) => {
    if (err) throw err
  })
}

// 子标题
function generateSubtitleTemplate (subtitle) {
  return `
  > **${subtitle}**
  `
}

// 一个单词的模板
function generateWordTemplate ({ word, pronounce = `[无]`, translate }) {
  return `
  <details><summary><b>${word}</b></summary>
    <p>
      ${pronounce}：
      ${translate}
    </p>
  </details>
  `
}

// 尾部
function generateTailTemplate (count) {
  return `
  ### :tada: **共计：${count} 个单词**
  `
}
