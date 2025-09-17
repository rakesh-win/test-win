import React from "react";
import Head from "next/head";

const SEO = ({ title, description, keywords, image }) => {
	console.log("nileseo",title,description,keywords);
	return (
		<Head>
			// <title>{title}</title>
			// <meta name="description" content={description} />
			// <meta itemProp="name" content={title} />
			// <meta itemProp="image" content={image} />
			// <meta name="keywords" content={keywords} />
		</Head>
	);
};

SEO.defaultProps = {
	title: "win upskill",
	description: "welcome to win upskilling universe",
	image: "/images/whitelogo.png",
};

export default SEO;
