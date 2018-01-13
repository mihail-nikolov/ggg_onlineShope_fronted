<template>
	<!-- <headroom> -->
		<header>
			<div class="header-container">
				<a v-bind:href="homeLink" class="logo-img" title="Автостъкла Glass Gold Group: Homepage"></a>
				<div class="header-elements">
					<ul>
						<li v-for="item in menuitems">
							<a :href="toLowerCase(item)">{{ item }}</a>
						</li>
					</ul>
				</div>
				<nuxt-link to="/cart" class="cart-container">
					<div class="cart"></div>
				</nuxt-link>
			</div>
		</header>
	<!-- </headroom> -->
</template>

<script>
	import { headroom } from 'vue-headroom';
	export default {
		components: {
			headroom
		},
		data: function() {
			return {
				menuitems: [
					'Home',
					'About',
					'Contact',
					'Login'
				],
				homeLink: "http://www.glassgoldgroup.eu/"
			};
		},
		methods: {
			toLowerCase(i) {
				if (i.toLowerCase() === 'home') {
					return '/';
				}
				return i.toLowerCase();
			}
		}
	};
</script>

<style scoped>
	header {
		height: 60px;
		background: transparent;
		width: 100vw;
		color: white;
	}
	
	header a {
		color: white;
		text-decoration: none;
		padding: 0 10px;
		-webkit-transition: all 0.2s ease;
		transition: all 0.2s ease;
	}
	
	header a:hover {
		color: #008C4E;
	}
	
	.header-container {
		height: 60px;
		width: inherit;
		color: white;
		position: fixed;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-line-pack: center;
		align-content: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.65);
		-moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.65);
		box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.65);
		background: #292F36;
	} 
	
	.logo-img {
		display: inline-block;
		background-image: url('./../static/logo2.png');
		background-repeat: no-repeat;
		width: 271px;
		background-position-y: center;
		background-position-x: 100px;
		height: inherit;
		justify-content: flex-start;
	}
	
	.logo-img:hover {
		background-image: url('./../static/logo3.png');
		cursor: pointer;
	}
	
	.header-elements {
		font-family: "JosefinSansBold";
		font-size: 18px;
		width: 1450px;
		text-align: right;
		height: 60px;
		display: inline-block;
	}
	
	.cart-container {
		margin-left: 50px;
		padding-top: 15px;
	}
	
	.cart {
		height: 35px;
		width: 35px;
		background-image: url('./../static/cart.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
	
	.cart:hover {
		background-image: url('./../static/cart_focused.png');
	}
</style>
