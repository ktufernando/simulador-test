class simulador extends HTMLElement{
	slideIndex;
	currentSlideIndex;
	slideArray;
	shadowRoot;

	constructor(){
		super();

		this.slideIndex = 0;
		this.currentSlideIndex = 0;
		this.slideArray = [];
	}

	connectedCallback(){
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
		<style>
			*{
				font-size: 1em;
			}
			.simulador-conteiner{
				display: block;
				width: 100%;
				overflow: hidden;
				position: relative;
			}
			#mySlider {
				overflow: hidden;
			    position: relative;
			    width: 100%;
			    /*height: 300px;*/
			}
			#mySlider .alto{ display:block;width:100%;opacity:0; }
			.singleSlide {
				background-size: cover;
				height: 100%;
				position: absolute;
				left: 100%;
				width: 100%;
				top: 0px;
			}
			.slideOverlay {
				background-color: rgba(0, 0, 0, 0.5);
				padding: 50px;
			}
			#sliderNav {
				position: absolute;
			    top: 10%;
			    width:100%;
			}
			#sliderNav:hover { cursor: pointer; }
			#sliderPrev {
				position: relative;
				float: left;
				left: 50px;
				color: black;
			}
			#sliderNext {
				position: relative;
				float: right;
				right: 50px;
				color: black;
			}
			@-webkit-keyframes slideIn {
			    100% { left: 0; }
			}
			@keyframes slideIn {
			    100% { left: 0; }
			}
			.slideInRight {
				left: -100%;
				-webkit-animation: slideIn 1s forwards;
			    animation: slideIn 1s forwards;
			}
			.slideInLeft {
				left: 100%;
				-webkit-animation: slideIn 1s forwards;
			    animation: slideIn 1s forwards;
			}
			@-webkit-keyframes slideOutLeft {
			    100% { left: -100%; }
			}
			@keyframes slideOutLeft {
			    100% { left: -100%; }
			}
			.slideOutLeft {
				-webkit-animation: slideOutLeft 1s forwards;
			    animation: slideOutLeft 1s forwards;
			}
			@-webkit-keyframes slideOutRight {
			    100% { left: 100%; }
			}
			@keyframes slideOutRight {
			    100% { left: 100%; }
			}
			.slideOutRight {
				-webkit-animation: slideOutRight 1s forwards;
			    animation: slideOutRight 1s forwards;
			}
		</style>
		<div class="simulador-conteiner">
			<div id="mySlider"></div>
			<div id="sliderNav">
				<!--<div id="sliderPrev">anterior</div>-->
				<div id="sliderNext">siguiente</div>
			</div>
		</div>
		`;

		this.Slide(
			"01.png", 
		);

		this.Slide(
			"02.png", 
		);

		this.Slide(
			"03.png", 
		);

		this.Slide(
			"04.png", 
		);

		this.Slide(
			"05.png", 
		);

		this.Slide(
			"06.png", 
		);

		var padre = this;

		//this.shadowRoot.querySelector("#sliderPrev").addEventListener("click", function(){ padre.prevSlide(padre); }, false);
		this.shadowRoot.querySelector("#sliderNext").addEventListener("click", function(){ padre.nextSlide(padre); }, false);

		this.buildSlider();
	}

	Slide(background ) {
		var aux = {};
		aux.background = background;
		aux.id = "slide" + this.slideIndex;
		this.slideIndex++;
		this.slideArray.push(aux);
	}

	buildSlider(){
		var myHTML = '<img class="alto" src="01.png">';
		
		for(var i = 0; i < this.slideArray.length; i++) {
			
			myHTML += "<div id='" + this.slideArray[i].id + 
			"' class='singleSlide' style='background-image:url(" + this.slideArray[i].background + ");'>" + 
			"</div>";	
			
		}
		
		this.shadowRoot.querySelector("#mySlider").innerHTML = myHTML;
			
		this.shadowRoot.querySelector("#slide" + this.currentSlideIndex).style.left = 0;

	}

	prevSlide(padre){
		var nextSlideIndex;

		if (padre.currentSlideIndex === 0 ) {
			nextSlideIndex = padre.slideArray.length - 1;
		} else {
			nextSlideIndex = padre.currentSlideIndex - 1;
		}	
		
		padre.shadowRoot.querySelector("#slide" + nextSlideIndex).style.left = "-100%";
		padre.shadowRoot.querySelector("#slide" + padre.currentSlideIndex).style.left = 0;
		
		padre.shadowRoot.querySelector("#slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
		padre.shadowRoot.querySelector("#slide" + padre.currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");
		
		padre.currentSlideIndex = nextSlideIndex;
	}


	nextSlide(padre){
		var nextSlideIndex;
		
		if (padre.currentSlideIndex === (padre.slideArray.length - 1) ) {
			nextSlideIndex = 0;
		} else {
			nextSlideIndex = padre.currentSlideIndex + 1;
		}	
		
		padre.shadowRoot.querySelector("#slide" + nextSlideIndex).style.left = "100%";
		padre.shadowRoot.querySelector("#slide" + padre.currentSlideIndex).style.left = 0;
		
		padre.shadowRoot.querySelector("#slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
		padre.shadowRoot.querySelector("#slide" + padre.currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");
		
		padre.currentSlideIndex = nextSlideIndex;
	}
}

window.customElements.define("simulador-test", simulador);