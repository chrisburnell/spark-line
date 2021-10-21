;(function() {
    if (!("customElements" in window) || !("HTMLCanvasElement" in window)) {
        return;
    }

    const NAME = "spark-line";

    customElements.define(NAME, class extends HTMLElement {
        connectedCallback() {
            if (!this.values) {
                console.log(`Missing \`values\` attribute in <${NAME}>`);
                return;
            }

            this.init();
        }

        static get observedAttributes() {
            return ["values", "width", "height", "line-width", "curve", "endpoint", "color", "endpoint-color"];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.init();
        }

        async init() {
            if (this.getAttribute("values") === "") {
                console.log(`Empty \`values\` attributes in <${NAME}>`);
                return;
            }

            this.textContent = "";

            this.values = this.getAttribute("values");
            this.width = parseFloat(this.getAttribute("width")) || 160;
            this.height = parseFloat(this.getAttribute("height")) || 28;
            this.lineWidth = parseFloat(this.getAttribute("line-width")) || 2;
            this.curve = this.getAttribute("curve") !== "false";
            this.endpoint = this.getAttribute("endpoint") !== "false";
            this.color = this.getAttribute("color") || "currentColor";
            this.endpointColor = this.getAttribute("endpoint-color") || "red";

            this.appendChild(this.render(this.values.match(/\d+/g)));
        }

        render(values) {
            const canvas = document.createElement("canvas");
            canvas.className = "sparkline";
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.tabIndex = "0";

            let ctx = canvas.getContext("2d");
            let max = Math.max.apply(Math, values);
            let xStep = (this.width - (this.lineWidth * 2)) / (values.length - 1);
            let yStep = (this.height - this.lineWidth * 3) / max;

            ctx.clearRect(0, 0, this.width, this.height);
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;

            let x, y;
            let coordinates = [];
            for (let i in values) {
                x = this.lineWidth + (i * xStep);
                y = this.height - (this.lineWidth * 1.5) - (values[i] * yStep);
                if (this.curve) {
                    coordinates.push(x);
                    coordinates.push(y);
                }
                else if (i === 0) {
                    ctx.moveTo(x, y);
                }
                else {
                    ctx.lineTo(x, y);
                }
            }
            if (this.curve) {
                curve(ctx, coordinates, 0.5, 25, false);
            }
            ctx.stroke();

            if (this.endpoint) {
                ctx.beginPath();
                ctx.fillStyle = this.endpointColor;
                ctx.arc(x - (this.lineWidth / 2), y, this.lineWidth * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            return canvas;
        }
    });
})();

/**
 * Curve function for canvas 2.3.1
 * Epistemex (c) 2013-2014
 * License: MIT
 */
function curve(d,j,u,g,c){u=(typeof u==="number")?u:0.5;g=g?g:25;var k,e=1,f=j.length,o=0,n=(f-2)*g+2+(c?2*g:0),m=new Float32Array(n),a=new Float32Array((g+2)*4),b=4;k=j.slice(0);if(c){k.unshift(j[f-1]);k.unshift(j[f-2]);k.push(j[0],j[1])}else{k.unshift(j[1]);k.unshift(j[0]);k.push(j[f-2],j[f-1])}a[0]=1;for(;e<g;e++){var p=e/g,q=p*p,s=q*p,r=s*2,t=q*3;a[b++]=r-t+1;a[b++]=t-r;a[b++]=s-2*q+p;a[b++]=s-q}a[++b]=1;h(k,a,f);if(c){k=[];k.push(j[f-4],j[f-3],j[f-2],j[f-1]);k.push(j[0],j[1],j[2],j[3]);h(k,a,4)}function h(H,A,C){for(var B=2,I;B<C;B+=2){var D=H[B],E=H[B+1],F=H[B+2],G=H[B+3],J=(F-H[B-2])*u,K=(G-H[B-1])*u,L=(H[B+4]-D)*u,M=(H[B+5]-E)*u;for(I=0;I<g;I++){var v=I<<2,w=A[v],x=A[v+1],y=A[v+2],z=A[v+3];m[o++]=w*D+x*F+y*J+z*L;m[o++]=w*E+x*G+y*K+z*M}}}f=c?0:j.length-2;m[o++]=j[f];m[o]=j[f+1];for(e=0,f=m.length;e<f;e+=2){d.lineTo(m[e],m[e+1])}return m};
