// 生きもの図鑑の絞り込み: name / scientific name search, sea, rarity, time of day. Reads ?sea= from the URL.
(function(){
 var dex=document.querySelector('[data-dex]');if(!dex)return;
 var cards=[].slice.call(dex.querySelectorAll('.mon')),st={q:'',sea:'',rar:'',day:''},count=document.querySelector('[data-count]');
 var u=new URLSearchParams(location.search);if(u.get('sea'))st.sea=u.get('sea');
 function apply(){var n=0,q=st.q.trim().toLowerCase();
  cards.forEach(function(c){var ok=(!q||c.dataset.name.toLowerCase().indexOf(q)>=0)&&(!st.sea||(' '+c.dataset.sea+' ').indexOf(' '+st.sea+' ')>=0)
   &&(!st.rar||+c.dataset.rar>=+st.rar)&&(!st.day||!c.dataset.day||(' '+c.dataset.day+' ').indexOf(' '+st.day+' ')>=0);
   c.classList.toggle('hide',!ok);if(ok)n++;});
  if(count)count.textContent=n+' / '+cards.length+' 種';}
 document.querySelectorAll('.filters .seg').forEach(function(seg){var f=seg.dataset.f;
  seg.querySelectorAll('button').forEach(function(b){if(b.dataset.v===st[f]){seg.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');}
   b.addEventListener('click',function(){seg.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');st[f]=b.dataset.v;apply();});});});
 var q=document.querySelector('.filters input');if(q)q.addEventListener('input',function(){st.q=q.value;apply();});
 apply();
})();
