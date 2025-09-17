const path = require('path')
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    JWT_SECRET: 'djhfghbdsgrasklkajsdgf',
    SENDGRID_KEY:
      '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',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dev-empty/image/upload',
    CLOUDINARY_VIDEO_URL:
      'https://api.cloudinary.com/v1_1/dev-empty/video/upload',
    STRIPE_SECRET_KEY: 'sk_test_2DqyjEwaU0Nq0PpEMVQ3qSAw00zgrbnfPk',
    STRIPE_PUBLISHABLE_KEY:
      'pk_test_ZaZZWZGlvdIn12yFleIqyjSI00G4e18Kf7'
  },
  images: {
    domains: [
      'itil4.s3.ap-south-1.amazonaws.com',
      'winupskill.s3.ap-south-1.amazonaws.com'
    ]
  }
})
