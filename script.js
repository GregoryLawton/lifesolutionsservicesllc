const D=[
 {k:'Janitorial',t:'Janitorial services',d:'Clean, well-kept spaces for offices, businesses, and facilities, on a schedule that suits you.',i:[['Office and commercial cleaning','Daily, weekly, or custom schedules'],['Deep and one-time cleaning','Move-ins, move-outs, and resets'],['Restroom and common-area care','Stocked, sanitized, and presentable'],['Floor care','Sweeping, mopping, and upkeep']]},
 {k:'Wholesale',t:'Wholesale supply',d:'Bulk goods and supplies for businesses that want dependable sourcing and fair pricing.',i:[['Janitorial and facility supplies','Cleaning products and paper goods'],['Bulk orders','Volume pricing for repeat buyers'],['Food service supplies','Disposables and kitchen essentials'],['Custom sourcing','Tell us what you’re looking for']]},
 {k:'Catering',t:'Catering',d:'Fresh, well-presented food for meetings, gatherings, and celebrations of any size.',i:[['Corporate catering','Meetings, trainings, and lunches'],['Event catering','Parties, receptions, and community events'],['Drop-off and full service','Choose the level of support you want'],['Custom menus','Built around your guests and budget']]},
 {k:'Retail',t:'Retail goods',d:'Quality everyday products offered directly to customers, with new items added over time.',i:[['Household essentials','Practical goods for home and work'],['Gift items','Ready for any occasion'],['Seasonal selections','Rotating products through the year'],['Special requests','Ask us if you need something specific']]},
 {k:'Events',t:'Event services',d:'Planning and day-of support so your event runs smoothly from setup to cleanup.',i:[['Event planning and coordination','From first idea to final detail'],['Setup and breakdown','Tables, décor, and teardown'],['Catering and supplies included','Pair with our other divisions'],['Post-event cleaning','Leave the venue spotless']]}
];
const tabs=document.querySelector('.tabs'),panels=document.getElementById('panels'),sel=document.getElementById('division');
sel.innerHTML='<option value="">Not sure yet</option>'+D.map(x=>`<option>${x.k}</option>`).join('');
D.forEach((x,n)=>{
  tabs.insertAdjacentHTML('beforeend',`<button role="tab" id="t${n}" aria-controls="p${n}" aria-selected="${n==0}" tabindex="${n==0?0:-1}">${x.k}</button>`);
  panels.insertAdjacentHTML('beforeend',`<div class="panel${n==0?' on':''}" role="tabpanel" id="p${n}" aria-labelledby="t${n}"><div><h3>${x.t}</h3><p>${x.d}</p><a class="btn btn-gold" href="#contact" data-d="${x.k}">Ask about ${x.k.toLowerCase()}</a></div><ul>${x.i.map(a=>`<li>${a[0]}<span>${a[1]}</span></li>`).join('')}</ul></div>`);
});
const bs=[...tabs.children];
function show(n){bs.forEach((b,i)=>{b.setAttribute('aria-selected',i==n);b.tabIndex=i==n?0:-1;document.getElementById('p'+i).classList.toggle('on',i==n)});bs[n].focus()}
bs.forEach((b,n)=>{b.onclick=()=>show(n);b.onkeydown=e=>{if(e.key=='ArrowRight')show((n+1)%bs.length);if(e.key=='ArrowLeft')show((n+bs.length-1)%bs.length)}});
panels.addEventListener('click',e=>{const a=e.target.closest('[data-d]');if(a)sel.value=a.dataset.d});
document.getElementById('quote').addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.target);
  const body=`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone')}\nDivision: ${f.get('division')||'Not sure'}\n\n${f.get('message')}`;
  location.href='mailto:contact@lifesolutionsservicesllc.com?subject='+encodeURIComponent('Quote request: '+(f.get('division')||'General'))+'&body='+encodeURIComponent(body);
  document.getElementById('note').textContent='Opening your email app to send this request.';
});
