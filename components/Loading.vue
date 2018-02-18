<template>
	<v-progress-circular class="progressBar" indeterminate v-bind:size="100" v-bind:width="3" color="primary" fill="blue" stroke="loadingColor">
	</v-progress-circular>
</template>

<script>
	export default {
		name: 'loading-screen'
	};
</script>

<style type="text/css" scoped>
	.progressBar {
		width:50px;
		height:50px;
		margin:0 auto;
		position:absolute;
		left:50%;
		top:50%;
		margin-left:-25px;
		margin-top:-25px;
		z-index: 99999;
	}
</style>
