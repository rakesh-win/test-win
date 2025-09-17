import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import { Provider } from "react-redux";
import { useStore } from "../store";
import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import React, { useState, useEffect } from "react";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/meanmenu.min.css";
import "../styles/flaticon.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "react-image-lightbox/style.css";
import "swiper/css/bundle";
import "../styles/style.css";
import "../styles/responsive.css";
import "../styles/elementorprod.css";
import "../styles/swiper-bundle-mod.css";
import "../styles/popup.css";

import Script from 'next/script';

import { GoogleAnalytics } from "nextjs-google-analytics";



// If you want RTL style, comment out below line
// import '../styles/rtl.css'

//ReactGA.initialize('G-TTP9B5Y5VM');


const MyApp = ({ Component, pageProps }) => {
	const store = useStore(pageProps.initialReduxState);
	

   

	return (

		


		<Provider store={store}>
		
			<Layout {...pageProps} >
     

			
  
				<Component {...pageProps} />
			</Layout>

			
		</Provider>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }) => {


	const { token } = parseCookies(ctx);
	//nile - replace this with localstorage - token
	
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	if (token) {
		try {
		//	console.log("try64",token);
			const payload = { headers: { Authorization: 'Bearer '+token } };
		//	console.log(payload);
			const url = `https://winupskill.in/api/api/users`;
			const response = await axios.get(url, payload);
			const user = response.data;

		//	console.log(user)
			// If user status disabled then user autometically logged out
			if (!user || !user.active) {
				//destroyCookie(ctx, "token");
			}

			pageProps.user = user;
		} catch (error) {
			console.error("Error getting current user", error);
			//invalid token
			// console.log(error)
			//destroyCookie(ctx, "token");
		}
	}

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		
		pageProps,
	};
};

export default MyApp;
