import"./index-UH2Wy8GS.js";class c{constructor(t){this.selector=t,customElements.define(t,class extends HTMLElement{constructor(){super();const e=document.createElement("template"),n=document.createElement("style");n.textContent=`
          div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
          h2 { margin: 0 0 10px; }
          ul { margin: 0; }
          p { margin: 10px 0; }
          `;const o=document.createElement("div"),s=document.createElement("slot");s.setAttribute("name","person-name"),o.appendChild(s),e.content.appendChild(n),e.content.appendChild(o),this.attachShadow({mode:"open"}).append(e.content.cloneNode(!0))}})}createComponent(t){const e=document.createElement(this.selector);return e.innerHTML=t,e}}class p extends c{constructor(){super("home-page")}render(){return this.createComponent(`
      <p slot="person-name">
        Home Page
      </p>
      `)}}export{p as HomeComponent};
