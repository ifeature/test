module.exports = {
  plugins: [
    require('stylelint')({ /* ...options */ }),
    require('postcss-cssnext')({ /* ...options */ }),
    require('precss')({ /* ...options */ })
  ]
}
