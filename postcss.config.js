// module.exports = (context) => ({
//   map: {
//     inline: false,
//     annotation: true,
//     sourcesContent: true
//   },
//   plugins: {
//     autoprefixer: {
//       cascade: false
//     }
//   }
// } )

const config = {
  plugins: [
    require( 'autoprefixer' ),
    require( 'postcss-nested' ),
    require( 'cssnano' )( {
      preset: 'default',
    } ),
  ]
}

module.exports = config

// module.exports = config
