"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[130],{130:(e,t,n)=>{n.r(t),n.d(t,{FormField:()=>u,default:()=>l});var i=n(203),o=n(791);function l(e,t,...n){const i=(0,o.Z)("button",{type:"submit",className:"button button_generic button_center",textContent:"POST"===e?"Create":"PUT"===e?"Edit":"Delete"});return"DELETE"===e&&i.classList.add("button_delete"),(0,o.Z)("form",{method:e,className:"form",children:[...n,i],onsubmit:t})}function u(e,t){let n;if("title"===e?(n=(0,o.Z)("input",{type:"text",required:!0}),t&&(n.value=t)):"due"===e?(n=(0,o.Z)("input",{type:"date",required:!0}),t&&(n.value=t)):"done"===e?(n=(0,o.Z)("input",{type:"checkbox"}),t&&(n.checked=t)):"description"===e?(n=(0,o.Z)("textarea",{}),t&&(n.value=t)):n=(0,o.Z)("select",{required:!0}),n.name=e,n.id=e,n.className="input",n instanceof HTMLSelectElement)if("priority"===e){const e=(0,o.Z)("option",{value:"low",textContent:"Low"}),i=(0,o.Z)("option",{value:"medium",textContent:"Medium"}),l=(0,o.Z)("option",{value:"high",textContent:"High"});n.append(e,i,l),n.value=t||"medium"}else i.Z.getProjectsSorted().map((e=>{const t=(0,o.Z)("option",{value:e.id,textContent:e.title});n.appendChild(t)})),n.value=t||n.firstChild.value;return Object.assign((0,o.Z)("label",{htmlFor:e,className:"label",textContent:e[0].toUpperCase()+e.slice(1),children:[n]}),{input:n})}}}]);