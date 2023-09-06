class Sparkline extends HTMLElement {
	static NAME = "spark-line"

	connectedCallback() {
		if (!this.values) {
			console.log(`Missing \`values\` attribute in <${this.NAME}>`)
			return
		}

		this.init()
	}

	static get observedAttributes() {
		return ["values", "points", "colors", "width", "height", "line-width", "curve", "endpoint", "color", "endpoint-color", "start", "end"]
	}

	attributeChangedCallback() {
		this.init()
	}

	drawPoint(ctx, x, y, color, sizeMultiplier) {
		ctx.moveTo(x, y)
		ctx.beginPath()
		ctx.fillStyle = color
		ctx.arc(x - (this.lineWidth * sizeMultiplier) / 2, y, this.lineWidth * sizeMultiplier * 1.5, 0, Math.PI * 2)
		ctx.fill()
	}

	/**
	 * Curve function for canvas 2.3.1
	 * Epistemex (c) 2013-2014
	 * License: MIT
	 */
	// prettier-ignore
	canvasCurve(d,j,u,g,c){u=(typeof u==="number")?u:0.5;g=g?g:25;var k,e=1,f=j.length,o=0,n=(f-2)*g+2+(c?2*g:0),m=new Float32Array(n),a=new Float32Array((g+2)*4),b=4;k=j.slice(0);if(c){k.unshift(j[f-1]);k.unshift(j[f-2]);k.push(j[0],j[1])}else{k.unshift(j[1]);k.unshift(j[0]);k.push(j[f-2],j[f-1])}a[0]=1;for(;e<g;e++){var p=e/g,q=p*p,s=q*p,r=s*2,t=q*3;a[b++]=r-t+1;a[b++]=t-r;a[b++]=s-2*q+p;a[b++]=s-q}a[++b]=1;h(k,a,f);if(c){k=[];k.push(j[f-4],j[f-3],j[f-2],j[f-1]);k.push(j[0],j[1],j[2],j[3]);h(k,a,4)}function h(H,A,C){for(var B=2,I;B<C;B+=2){var D=H[B],E=H[B+1],F=H[B+2],G=H[B+3],J=(F-H[B-2])*u,K=(G-H[B-1])*u,L=(H[B+4]-D)*u,M=(H[B+5]-E)*u;for(I=0;I<g;I++){var v=I<<2,w=A[v],x=A[v+1],y=A[v+2],z=A[v+3];m[o++]=w*D+x*F+y*J+z*L;m[o++]=w*E+x*G+y*K+z*M}}}f=c?0:j.length-2;m[o++]=j[f];m[o]=j[f+1];for(e=0,f=m.length;e<f;e+=2){d.lineTo(m[e],m[e+1])}return m}

	async init() {
		if (this.getAttribute("values") === "") {
			console.log(`Empty \`values\` attributes in <${this.NAME}>`)
			return
		}

		this.textContent = ""

		this.values = this.getAttribute("values")
		this.width = parseFloat(this.getAttribute("width")) || 160
		this.height = parseFloat(this.getAttribute("height")) || 28
		this.lineWidth = parseFloat(this.getAttribute("line-width")) || 2
		this.curve = this.getAttribute("curve") !== "false"
		this.endpoint = this.getAttribute("endpoint") !== "false"
		this.color = this.getAttribute("color") || window.getComputedStyle(this).getPropertyValue("color")
		this.endpointColor = this.getAttribute("endpoint-color") || this.color
		this.startLabel = this.getAttribute("start-label")
		this.endLabel = this.getAttribute("end-label")
		this.points = this.getAttribute("points") || ""
		this.colors = this.getAttribute("colors") || this.endpointColor

		if (this.startLabel) {
			const startElement = document.createElement("span")
			startElement.textContent = this.startLabel
			this.appendChild(startElement)
		}

		this.appendChild(this.render([...this.values.match(/\d+/g)], this.points.match(/\d+/g) || [], [...this.colors.split(/(?![^(]*\)),\s*/)]))

		if (this.endLabel) {
			const endElement = document.createElement("span")
			endElement.textContent = this.endLabel
			this.appendChild(endElement)
		}
	}

	render(values, points, colors) {
		const canvas = document.createElement("canvas")
		canvas.width = this.width
		canvas.height = this.height
		canvas.tabIndex = 0

		let ctx = canvas.getContext("2d")
		// If the max is zero -- i.e. all values are 0 we don't want to divide-by-zero.
		let max = Math.max.apply(Math, values) || 1;
		let xStep = (this.width - this.lineWidth * 2) / (values.length - 1)
		let yStep = (this.height - this.lineWidth * 3) / max

		ctx.clearRect(0, 0, this.width, this.height)
		ctx.beginPath()
		ctx.translate(0.5, 0.5)
		ctx.strokeStyle = this.color
		ctx.lineWidth = this.lineWidth

		let x, y
		let coordinates = []
		values.forEach((value, i) => {
			x = this.lineWidth + i * xStep
			y = this.height - this.lineWidth * 1.5 - value * yStep
			coordinates.push(x)
			coordinates.push(y)
			if (!this.curve) {
				if (i === 0) {
					ctx.moveTo(x, y)
				} else {
					ctx.lineTo(x, y)
				}
			}
		})
		if (this.curve) {
			this.canvasCurve(ctx, coordinates, 0.5, 25, false)
		}
		ctx.stroke()

		if (points.length > 0) {
			let originalPoints = points
			points = []
			values.forEach((value, i) => {
				points.push(originalPoints[i % originalPoints.length])
			})
			if (colors.length > 0) {
				let originalColors = colors
				colors = []
				values.forEach((value, i) => {
					colors.push(originalColors[i % originalColors.length])
				})
			}
		}
		if (points.length === values.length) {
			points.forEach((point, i) => {
				const color = colors.length === values.length ? colors[i] : this.endpointColor
				if (parseFloat(point) > 0) {
					this.drawPoint(ctx, coordinates[2 * i], coordinates[2 * i + 1], color, parseFloat(point))
				}
			})
		} else if (this.endpoint) {
			this.drawPoint(ctx, x, y, this.colors, 1)
		}

		return canvas
	}
}

if ("customElements" in window && "HTMLCanvasElement" in window) {
	window.customElements.define(Sparkline.NAME, Sparkline)
	window.Sparkline = Sparkline
}

export default Sparkline
