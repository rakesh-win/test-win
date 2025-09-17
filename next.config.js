const path = require("path");
const withPWA = require("next-pwa");
const nextTranslate = require("next-translate");

module.exports = nextTranslate(
	withPWA({
		pwa: {
			disable: process.env.NODE_ENV === "development",
			// dest: 'public',
			register: true,
			sw: "/sw.js",
		},
		sassOptions: {
			includePaths: [path.join(__dirname, "styles")],
		},
		env: {
			JWT_SECRET: "djhfghbdsgrasklkajsdgf",
			SENDGRID_KEY:
				"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",
			CLOUDINARY_URL:
				"https://api.cloudinary.com/v1_1/dev-empty/image/upload",
			CLOUDINARY_VIDEO_URL:
				"https://api.cloudinary.com/v1_1/dev-empty/video/upload",
			STRIPE_SECRET_KEY: "sk_test_2DqyjEwaU0Nq0PpEMVQ3qSAw00zgrbnfPk",
			STRIPE_PUBLISHABLE_KEY:
				"pk_test_ZaZZWZGlvdIn12yFleIqyjSI00G4e18Kf7",
		},

		images: {
			domains: ['itil4.s3.ap-south-1.amazonaws.com', 'winupskill.s3.ap-south-1.amazonaws.com'],
		},

		async redirects() {
			// Define your dynamic redirection logic here
			const redirects = [
				{
					source: '/courses/itil-foundation',
					destination: '/courses/itil-foundation-training',
					permanent: false
				},
				{
					source: '/courses/itil-hvit',
					destination: '/courses/itil-high-velocity-it-training',
					permanent: false
				},
				{
					source: '/courses/itil-dsv',
					destination: '/courses/itil-drive-stakeholder-value-certification',
					permanent: false
				},
				{
					source: '/courses/itil-dpi',
					destination: '/courses/itil-direct-plan-and-improve-training',
					permanent: false
				},
				{
					source: '/courses/itil-cds',
					destination: '/courses/itil-create-deliver-and-support-training',
					permanent: false
				},
				{
					source: '/courses/itil-dits',
					destination: '/courses/itil-digital-and-it-strategy-certification',
					permanent: false
				},
				{
					source: '/courses/itil-msf',
					destination: '/courses/itil-monitor-support-and-fulfil-training',
					permanent: false
				},
				{
					source: '/courses/itil-managing-professional',
					destination: '/courses/itil-managing-professional-certification',
					permanent: false
				},
				{
					source: '/courses/iso-27001-2022-LA',
					destination: '/courses/iso-27001-lead-auditor-training',
					permanent: false
				},
				{
					source: '/courses/iso-27001-lead-implementer',
					destination: '/courses/iso-27001-lead-implementer-training',
					permanent: false
				},
				{
					source: '/courses/iso-27701-lead-auditor',
					destination: '/courses/iso-27701-lead-auditor-training',
					permanent: false
				},
				{
					source: '/courses/27701-lead-implementer',
					destination: '/courses/iso-27701-lead-implementer-training',
					permanent: false
				},
				{
					source: '/courses/ciso',
					destination: '/courses/information-security-officer-certification',
					permanent: false
				},
				{
					source: '/courses/iso-20000-LA',
					destination: '/courses/iso-20000-lead-auditor-training',
					permanent: false
				},
				{
					source: '/courses/iso-22301-LA',
					destination: '/courses/iso-22301-lead-auditor-training',
					permanent: false
				},
			];

			return redirects;
		},
	})
);
