<template>
	<div class="glasses-svg">
		<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 233 164.24">
			<path id="car_body" data-name="car body" class="cls-1" d="M156.12,178.06a46.17,46.17,0,0,1-7.5.6H124.87l-8.9-22.5H42.07L23,178.66H-4.38q-12.4,0-21.2-9.55a32.5,32.5,0,0,1-8.8-22.9V86.81a32.74,32.74,0,0,1,8.8-23,27.94,27.94,0,0,1,21.2-9.45H23.37l19.05,22.5h73.9l8.9-22.5h23.4a50.28,50.28,0,0,1,7.5.55q12.2,18,34.15,23.45a54.85,54.85,0,0,1,8.35,30v16.2a54.85,54.85,0,0,1-8.35,30.05q-21.95,5.35-34.15,23.4" transform="translate(34.38 -34.38)" />
			<path id="path10" class="disabled" d="M156.12,178.06q12.2-18,34.15-23.4a57.39,57.39,0,0,1-6.3,8.15q-11.9,12.85-27.85,15.25m0-123.15q15.95,2.4,27.85,15.25a56,56,0,0,1,6.3,8.2Q168.32,73,156.12,54.91" transform="translate(34.38 -34.38)" />
			<path id="path12" class="cls-1" d="M111.12,178.66H88.87v-22.5H116l8.9,22.5H111.12m-45.65,0H23l19.05-22.5h23.4v22.5M23.37,54.36H65.82v22.5H42.42L23.37,54.36m65.85,0h36l-8.9,22.5H89.22V54.36" transform="translate(34.38 -34.38)" />
			<path id="path14" class="cls-1" d="M89.22,54.36v22.5H65.82V54.36h23.4m-.35,124.3H65.47v-22.5h23.4v22.5" transform="translate(34.38 -34.38)" />
			<path id="path16" class="cls-1" d="M124.87,178.66v.8q-8.35,27.65-22.25,15.4l8.5-16.2h13.75M111.12,54.36l-8.5-16.2q13.9-12.3,22.25,15.4v.8H111.12" transform="translate(34.38 -34.38)" />
			<path id="WS" @click="onElementSelect($event)" v-bind:class="[selected('WS') ? 'selectedWindow': available('WS') ? 'cls-3' : 'disabled']" d="M158.31,113.5a112,112,0,0,0-10.09-44.16L119,78.82a246,246,0,0,1,2.41,28.69l.09,9-.09,9.06A246,246,0,0,1,119,154.25l29.25,9.47a111.75,111.75,0,0,0,10.09-47.22C158.32,115.5,158.33,114.5,158.31,113.5Z" transform="translate(34.38 -34.38)" />
			<path id="WS_detail" data-name="WS detail" class="cls-4" d="M121.37,107.51h4a1.1,1.1,0,0,1,1.25,1.25v15.55a1.1,1.1,0,0,1-1.25,1.25h-4l.1-9.05-.1-9" transform="translate(34.38 -34.38)" />
			<path id="Roof" @click="onElementSelect($event)" v-bind:class="[selected('Roof') ? 'selectedWindow': available('Roof') ? 'cls-3' : 'disabled']" d="M115.17,147.46q0,5-5,5H84q-5,0-5-5V85.21q0-5,5-5h26.15q5,0,5,5v62.25" transform="translate(34.38 -34.38)" />
			<path id="RFQ" data-name="FQ right" @click="onElementSelect($event)" v-bind:class="[selected('RFQ') ? 'selectedWindow': available('RFQ') ? 'cls-3' : 'disabled']" d="M120.12,159.61l26,7.9q-6,6.6-21.25,5.6l-4.75-13.5" transform="translate(34.38 -34.38)" />
			<path id="LFQ" data-name="FQ left" @click="onElementSelect($event)" v-bind:class="[selected('LFQ') ? 'selectedWindow': available('LFQ') ? 'cls-3' : 'disabled']" d="M146.12,65.51l-26,7.95,4.75-13.55q15.25-.95,21.25,5.6" transform="translate(34.38 -34.38)" />
			<path id="RFD" data-name="FD right" @click="onElementSelect($event)" v-bind:class="[selected('RFD') ? 'selectedWindow': available('RFD') ? 'cls-3' : 'disabled']" d="M91.62,158.61h11.5l5.85,15H91.62V158.61" transform="translate(34.38 -34.38)" />
			<path id="LFD" data-name="FD left" @click="onElementSelect($event)" v-bind:class="[selected('LFD') ? 'selectedWindow': available('LFD') ? 'cls-3' : 'disabled']" d="M109,59.41l-5.85,15H91.62v-15H109" transform="translate(34.38 -34.38)" />
			<path id="RFV" data-name="FV right" @click="onElementSelect($event)" v-bind:class="[selected('RFV') ? 'selectedWindow': available('RFV') ? 'cls-3' : 'disabled']" d="M112.57,173.66l-6.5-15.05h8.1q3.15,7.55,6.35,15.05h-7.95" transform="translate(34.38 -34.38)" />
			<path id="LFV" data-name="FV left" @click="onElementSelect($event)" v-bind:class="[selected('LFV') ? 'selectedWindow': available('LFV') ? 'cls-3' : 'disabled']" d="M112.57,59.41h7.95l-6.35,15h-8.1l6.5-15" transform="translate(34.38 -34.38)" />
			<path id="RMQ" data-name="MQ right" @click="onElementSelect($event)" v-bind:class="[selected('RMQ') ? 'selectedWindow': available('RMQ') ? 'cls-3' : 'disabled']" d="M86.77,158.61v15H67.47V158.61h19.3" transform="translate(34.38 -34.38)" />
			<path id="LMQ" data-name="MQ left" @click="onElementSelect($event)" v-bind:class="[selected('LMQ') ? 'selectedWindow': available('LMQ') ? 'cls-3' : 'disabled']" d="M87.17,74.46H67.87v-15h19.3v15" transform="translate(34.38 -34.38)" />
			<path id="RRD" data-name="RD right" @click="onElementSelect($event)" v-bind:class="[selected('RRD') ? 'selectedWindow': available('RRD') ? 'cls-3' : 'disabled']" d="M47.12,173.66l3.45-15.05h12.9v15.05H47.12" transform="translate(34.38 -34.38)" />
			<path id="LRD" data-name="RD left" @click="onElementSelect($event)" v-bind:class="[selected('LRD') ? 'selectedWindow': available('LRD') ? 'cls-3' : 'disabled']" d="M63.47,74.46H50.57l-3.45-15H63.47v15" transform="translate(34.38 -34.38)" />
			<path id="LRV" data-name="RV left" @click="onElementSelect($event)" v-bind:class="[selected('LRV') ? 'selectedWindow': available('LRV') ? 'cls-3' : 'disabled']" d="M48.12,74.46H43.47l-12.7-15H42.92l5.2,15" transform="translate(34.38 -34.38)" />
			<path id="LRQ" data-name="RQ left" @click="onElementSelect($event)" v-bind:class="[selected('LRQ') ? 'selectedWindow': available('LRQ') ? 'cls-3' : 'disabled']" d="M14.07,64.26q3.7-3.7,10.85-4.6l12.3,14L14.07,64.26" transform="translate(34.38 -34.38)" />
			<path id="RRV" data-name="RV right" @click="onElementSelect($event)" v-bind:class="[selected('RRV') ? 'selectedWindow': available('RRV') ? 'cls-3' : 'disabled']" d="M42.92,173.66H30.77l12.7-15.05h4.65l-5.2,15.05" transform="translate(34.38 -34.38)" />
			<path id="RRQ" data-name="RQ right" @click="onElementSelect($event)" v-bind:class="[selected('RRQ') ? 'selectedWindow': available('RRQ') ? 'cls-3' : 'disabled']" d="M14.07,168.81l23.15-9.45-12.3,14.05q-7.15-.9-10.85-4.6" transform="translate(34.38 -34.38)" />
			<path id="BL"  @click="onElementSelect($event)" v-bind:class="[selected('BL') ? 'selectedWindow': available('BL') ? 'cls-3' : 'disabled']" d="M36.53,77,12.18,67.57A183.84,183.84,0,0,0,5.87,116.5a184.13,184.13,0,0,0,6.31,49l24.34-9.44a174,174,0,0,1-4.06-30.5l-.09-9.06.09-9A174.83,174.83,0,0,1,36.53,77Z" transform="translate(34.38 -34.38)" />
			<path id="BL_detail" data-name="BL detail" class="cls-4" d="M32.47,125.56H29.32a1.1,1.1,0,0,1-1.25-1.25V108.76a1.1,1.1,0,0,1,1.25-1.25h3.15l-.1,9,.1,9.05" transform="translate(34.38 -34.38)" />
		</svg>
	</div>
</template>

<script>
	// Tools
	// NA

	export default {
		name: 'GlassesSVG',
		props: {
			availableWindows: {
				default: () => [],
				type: Array
			}
		},
		computed: {
			selectedWindows() {
				return this.$store.getters["modules/products/getSelectedWindowTypes"];
			}
		},
		methods: {
			onElementSelect(event) {
				const available = this.available(event.target.id);
				const index = this.selectedWindows.indexOf(event.target.id);

				if (available) {
					let selectedElements = [];

					if (index >= 0) {
						selectedElements = this.selectedWindows.slice();
						selectedElements.splice(index, 1);
					}
					else {
						selectedElements = [...this.selectedWindows, event.target.id];
					}

					this.$emit("selectElement", selectedElements);
				}
			},
			selected(part) {
				return this.selectedWindows.includes(part);
			},
			available(part) {
				return this.availableWindows.includes(part);
			}
		}
	};
</script>

<style lang="css" scoped>
	.selectedWindow {
		fill: green;
		cursor: pointer;
	}
	
	.cls-3:hover {
		fill: white;
		cursor: pointer;
	}
	
	.glasses-svg {
		width: 300px;
		height: 220px;
	}
	
	.cls-1 {
		fill: #37474F;
	}
	
	.cls-2 {
		fill: #feeab9;
	}
	
	.cls-3 {
		fill: #feeab9;
	}
	
	.cls-4 {
		fill: #37474F;
	}

	.disabled {
		fill: #ccc;
	}
</style>
