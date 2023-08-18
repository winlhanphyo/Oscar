import React from 'react';
import { useHistory } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import styles from './Header.module.scss';
import axios from '../../axios/index';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header = () => {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const storageData = JSON.parse(localStorage.getItem("user"));

  const indicatorStyle = {
    lineHeight: '5rem', // Adjust the line height as needed
    color: 'black'
  };

  return (
    <>
      	<header class="header-v2">
		{/* <!-- Header desktop --> */}
		<div class="container-menu-desktop trans-03">
			<div class="wrap-menu-desktop">
				<nav class="limiter-menu-desktop p-l-45">
					
					{/* <!-- Logo desktop -->		 */}
					<a href="index.html" class="logo">
						<p class="mtext-103 cl2">
							OSCAR D.CHAVARRIA
						</p>
					</a>

					{/* <!-- Menu desktop --> */}
					<div class="menu-desktop">
						<ul class="main-menu">
							<li class="active-menu">
								<a href="index.html">Home <i class="fa fa-angle-down p-l-7" aria-hidden="true"></i></a>
								<ul class="sub-menu">
									<li><a href="index1.html">Artista One</a></li>
									<li><a href="index2.html">Artista Two</a></li>
									<li><a href="index3.html">Artista Three</a></li>
								</ul>
							</li>
							<li>
								<a href="product.html">Shop <i class="fa fa-angle-down p-l-7" aria-hidden="true"></i></a>
								<ul class="sub-menu">
									<li><a href="product.html">Item One</a></li>
									<li><a href="product.html">Item Two</a></li>
									<li><a href="product.html">Item Three</a></li>
								</ul>
							</li>
							<li>
								<a href="about.html">About</a>
							</li>

							<li>
								<a href="contact.html">Contact</a>
							</li>
						</ul>
					</div>	

					{/* <!-- Icon header --> */}
					<div class="wrap-icon-header flex-w flex-r-m h-full">
						<div class="flex-c-m h-full p-r-24">
							<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
								<i class="zmdi zmdi-search"></i>
							</div>
						</div>
							
						<div class="flex-c-m h-full p-l-18 p-r-25 bor5">
							<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify="3">
								<i class="zmdi zmdi-shopping-cart"></i>
							</div>
						</div>
						<div class="flex-c-m h-full p-l-18 p-r-25">
							<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11">
								<a href="login.html" alt="Login"><i class="zmdi zmdi-account-o text-dark"></i></a>
							</div>
						</div>
					</div>
				</nav>
			</div>	
		</div>

		{/* <!-- Header Mobile --> */}
		<div class="wrap-header-mobile">
			{/* <!-- Logo moblie -->		 */}
			<div class="logo-mobile">
				<a href="index.html">
					<p class="mtext-103 cl2">
						OSCAR D.CHAVARRIA
					</p>
				</a>
			</div>

			{/* <!-- Icon header --> */}
			<div class="wrap-icon-header flex-w flex-r-m h-full m-r-15">
				<div class="flex-c-m h-full p-r-10">
					<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
						<i class="zmdi zmdi-search"></i>
					</div>
				</div>

				<div class="flex-c-m h-full p-lr-10 bor5">
					<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify="2">
						<i class="zmdi zmdi-shopping-cart"></i>
					</div>
				</div>

				<div class="flex-c-m h-full p-l-18 p-r-25 bor5">
					<div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11">
						<a href="login.html" alt="Login"><i class="zmdi zmdi-account-o text-dark"></i></a>
					</div>
				</div>
			</div>

			{/* <!-- Button show menu --> */}
			<div class="btn-show-menu-mobile hamburger hamburger--squeeze">
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</div>
		</div>


		{/* <!-- Menu Mobile --> */}
		<div class="menu-mobile">
			<ul class="main-menu-m">
				<li>
					<a href="index.html">Home</a>
					<ul class="sub-menu-m">
						<li><a href="index1.html">Artista One</a></li>
						<li><a href="index2.html">Artista Two</a></li>
						<li><a href="index3.html">Artista Three</a></li>
					</ul>
					<span class="arrow-main-menu-m">
						<i class="fa fa-angle-right" aria-hidden="true"></i>
					</span>
				</li>
				<li>
					<a href="product.html">Shop</a>
					<ul class="sub-menu-m">
						<li><a href="product.html">Item One</a></li>
						<li><a href="product.html">Item Two</a></li>
						<li><a href="product.html">Item Three</a></li>
					</ul>
					<span class="arrow-main-menu-m">
						<i class="fa fa-angle-right" aria-hidden="true"></i>
					</span>
				</li>
				<li>
					<a href="about.html">About</a>
				</li>

				<li>
					<a href="contact.html">Contact</a>
				</li>
			</ul>
		</div>

		{/* <!-- Modal Search --> */}
		<div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
			<div class="container-search-header">
				<button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
					<img src="images/icons/icon-close2.png" alt="CLOSE" />
				</button>

				<form class="wrap-search-header flex-w p-l-15">
					<button class="flex-c-m trans-04">
						<i class="zmdi zmdi-search"></i>
					</button>
					<input class="plh3" type="text" name="search" placeholder="Search..." />
				</form>
			</div>
		</div>
	</header>
    </>
  )
}

export default Header;