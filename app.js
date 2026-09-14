const WHATSAPP = "919182387752";
const waBase = `https://wa.me/${WHATSAPP}`;

const demoProperties = [
  {title:"Demo Property Listing", location:"Replace with verified location", type:"Residential", purpose:"Buy", area:"Add verified area", price:"Add verified price", image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80", demo:true},
  {title:"Demo Plot / Land Listing", location:"Replace with verified location", type:"Plot / Land", purpose:"Invest", area:"Add verified area", price:"Add verified price", image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80", demo:true},
  {title:"Demo Premium Property", location:"Replace with verified location", type:"Villa", purpose:"Buy", area:"Add verified area", price:"Add verified price", image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80", demo:true}
];

const grid = document.getElementById("propertyGrid");
const empty = document.getElementById("propertyEmpty");
function renderProperties(){
  const type = document.getElementById("filterType").value;
  const purpose = document.getElementById("filterPurpose").value;
  let items = demoProperties.filter(p => (!type || p.type===type) && (!purpose || p.purpose===purpose));
  const sort = document.getElementById("filterSort").value;
  if(sort==="low") items = [...items].sort((a,b)=>a.price.localeCompare(b.price));
  if(sort==="high") items = [...items].sort((a,b)=>b.price.localeCompare(a.price));
  grid.innerHTML = items.map(p=>`
    <article class="property-card">
      <div class="property-img" style="background-image:url('${p.image}')">
        <span class="badge">${p.demo ? "DEMO — REPLACE" : "AVAILABLE"}</span>
      </div>
      <div class="property-body">
        <div class="property-location">${p.location}</div>
        <h3>${p.title}</h3>
        <div class="property-meta"><span>${p.type}</span><span>${p.area}</span><span>${p.purpose}</span></div>
        <div class="property-price">${p.price}</div>
        <div class="property-actions">
          <a class="btn btn-outline" href="#contact" data-property="${p.title}">View Details</a>
          <a class="btn btn-gold" target="_blank" rel="noopener" href="${waBase}?text=${encodeURIComponent(`Hi VERO PROPERTIES, I'm interested in ${p.title}. Please share more details.`)}">Enquire</a>
        </div>
      </div>
    </article>`).join("");
  empty.hidden = items.length > 0;
}
["filterType","filterPurpose","filterSort"].forEach(id=>document.getElementById(id).addEventListener("change",renderProperties));
renderProperties();

const menuBtn=document.getElementById("menuBtn"), mobileMenu=document.getElementById("mobileMenu");
menuBtn.addEventListener("click",()=>{const open=mobileMenu.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

function showToast(text){const t=document.getElementById("toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3500)}

document.querySelectorAll("[data-interest]").forEach(el=>el.addEventListener("click",()=> {
  const value=el.dataset.interest;
  const select=document.querySelector('select[name="interest"]');
  if(select) select.value=value;
}));

document.getElementById("heroSearchForm").addEventListener("submit",e=>{
  e.preventDefault();
  const purpose=document.getElementById("searchPurpose").value;
  const type=document.getElementById("searchType").value;
  const location=document.getElementById("searchLocation").value.trim();
  const budget=document.getElementById("searchBudget").value;
  const msg=`Hi VERO PROPERTIES, I'm looking to ${purpose.toLowerCase()} a property.\nProperty type: ${type}\nLocation: ${location || "Not specified"}\nBudget: ${budget}`;
  window.open(`${waBase}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
});

document.getElementById("leadForm").addEventListener("submit",e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget);
  const msg=`Hi VERO PROPERTIES, I'd like assistance.\n\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email") || "Not provided"}\nInterested in: ${f.get("interest")}\nPreferred location: ${f.get("location") || "Not specified"}\nBudget: ${f.get("budget") || "Not specified"}\nPreferred callback time: ${f.get("callback") || "Not specified"}\nMessage: ${f.get("message") || "Not provided"}`;
  showToast("Opening WhatsApp with your enquiry…");
  setTimeout(()=>window.open(`${waBase}?text=${encodeURIComponent(msg)}`,"_blank","noopener"),350);
});

document.addEventListener("click",e=>{
  const a=e.target.closest("[data-property]");
  if(!a)return;
  const select=document.querySelector('select[name="interest"]');
  if(select)select.value="Buying";
  const msg=`Hi VERO PROPERTIES, I'm interested in ${a.dataset.property}. Please share the property details.`;
  const href=`${waBase}?text=${encodeURIComponent(msg)}`;
  setTimeout(()=>window.open(href,"_blank","noopener"),100);
});

window.addEventListener("scroll",()=>{
  const header=document.querySelector(".site-header");
  header.style.boxShadow=window.scrollY>10?"0 8px 28px rgba(6,63,59,.08)":"none";
});
