/* MetroHome24 : mode site statique (Netlify). Pas de serveur : annonces dans assets/data.js, contact par WhatsApp et e-mail. */
(function(){
if(!CONFIG.static)return;
const WA=String(CONFIG.phone).replace(/\D/g,''),MAIL=CONFIG.email;
/* nettoyage : ce qui exige un serveur est caché */
const lg=$('#login');if(lg)lg.style.display='none';
const pb=$('#proto');if(pb)pb.remove();
['compte','agences','services'].forEach(h=>{const a=document.querySelector('#nav a[href="#'+h+'"]');if(a)a.remove()});
const ft=document.querySelector('footer');if(ft)ft.innerHTML=ft.innerHTML.replace(/<a href="#admin">[^<]*<\/a>\s*·?/,'').replace(/·?\s*Prototype[^<]*/,'');
const al=$('#alert');if(al&&al.closest('.box'))al.closest('.box').style.display='none';
const sb=$('#sup');if(sb&&sb.closest('.box'))sb.closest('.box').innerHTML=`<p class="mu">Une question ? Écrivez-nous :</p><div class="row"><a class="btn s" target="_blank" rel="noopener" href="https://wa.me/${WA}">WhatsApp</a><a class="btn o s" href="mailto:${MAIL}">E-mail</a></div>`;
window.gate=h=>['compte','admin','agences','services'].includes(h)?'accueil':h;
/* publication assistée : le formulaire prépare un message pour votre équipe */
const lead=document.querySelector('#v-publier .lead');if(lead)lead.textContent='Remplissez le formulaire : il prépare un message WhatsApp pour notre équipe, qui vérifie puis publie votre annonce. Aucun compte nécessaire.';
['#draft'].forEach(s=>{const e=$(s);if(e)e.remove()});
const pl=$('#ph');if(pl&&pl.closest('label'))pl.closest('label').style.display='none';
const fs=$('#pubrole').closest('fieldset');
fs.insertAdjacentHTML('afterbegin','<label>Votre nom<input id="sn" autocomplete="name"></label><label>Votre téléphone ou WhatsApp<input id="sp" type="tel" autocomplete="tel" placeholder="+243…"></label>');
const nt=[...fs.querySelectorAll('p.mu')].pop();if(nt)nt.textContent='Après l’envoi, joignez vos photos dans la conversation WhatsApp. Notre équipe vérifie chaque annonce avant de la publier.';
const _ss=window.showStep;window.showStep=function(){_ss();if(step===3)$('#next').textContent='Préparer mon message'};
window.save=function(){
 const d=Object.fromEntries(new FormData($('#pf'))),g=i=>($(i)?$(i).value:'').trim(),name=g('#sn'),ph=g('#sp'),role=$('#pubrole').value;
 if(!d.t||!d.q||!d.prix){toast('Titre, quartier et prix sont obligatoires');return false}
 if(!name||ph.replace(/\D/g,'').length<9){toast('Indiquez votre nom et un numéro WhatsApp valide');return false}
 if(role!=='Propriétaire'&&(!d.hon||!d.qui||!$('#mand').checked)){toast('Honoraires, payeur et mandat sont obligatoires pour un intermédiaire');return false}
 const t=['NOUVELLE ANNONCE MetroHome24','Titre : '+d.t,'Type : '+d.type+' · '+d.tr,'Lieu : '+[d.q,d.c,d.vi,'Haut-Katanga'].filter(Boolean).join(', '),
  'Prix : '+d.prix+' '+d.dev+(d.tr==='Location'?' / mois':''),'Chambres : '+d.ch+' · Salles de bain : '+d.bain+' · Surface : '+d.m2+' m²',
  'Conditions : '+(d.cond||'non précisées'),'Frais de visite : '+(d.fv==='Aucun'?'Aucun':(d.fvm||'à préciser')),'Description : '+(d.desc||'—'),
  'Publié par : '+name+' ('+role+') · '+ph].concat(role!=='Propriétaire'?['Honoraires : '+d.hon+' ('+d.qui+') · Mandat du propriétaire : oui']:[]).join('\n');
 $('#dlg').innerHTML=`<div class="db"><h3>Votre message est prêt</h3><p class="mu">Envoyez-le, puis joignez vos photos dans la conversation.</p><textarea rows="9" readonly>${esc(t)}</textarea><div class="row"><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(t)}">Envoyer sur WhatsApp</a><a class="btn o" href="mailto:${MAIL}?subject=${encodeURIComponent('Nouvelle annonce : '+d.t)}&body=${encodeURIComponent(t)}">Envoyer par e-mail</a><button class="btn o" data-close>Fermer</button></div></div>`;
 $('#dlg').showModal();return true};
/* fiche d’une annonce : contact direct avec le publieur */
window.open=function(id){const l=L.find(x=>x.id===id);if(!l)return;
 const ph=String(l.phone||WA).replace(/\D/g,''),loc=[l.q,l.c,l.vi].filter(Boolean).join(', '),E=encodeURIComponent,
 tags=a=>(a||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join('');
 $('#dlg').innerHTML=`<div class="dh">${gal(l)}</div><div class="db"><div class="row" style="justify-content:space-between;margin:0"><div><div class="pr">${price(l)}</div><h3 style="margin:0">${esc(l.t)}</h3><div class="mu">${esc(loc)} · ${esc(l.type)} · ${l.m2} m²${l.ch?' · '+l.ch+' ch. · '+l.bain+' sdb':''}</div></div><button class="btn o s" data-close>Fermer</button></div>
 <p>${esc(l.desc||'')}</p>${l.am&&l.am.length?'<div><b>Équipements</b><br>'+tags(l.am)+'</div>':''}
 <div class="fee"><b>Conditions annoncées</b><br>Caution et avance : ${esc(l.cond||'non précisé')}<br>Frais de visite : ${esc(l.fv||'Aucun')}<br>Honoraires : ${esc(l.hon||'Aucun')}</div>
 <div><span class="tag">${esc(l.pub||'Propriétaire')}</span>${(l.v||['Non vérifié']).map(v=>`<span class="tag ${v==='Non vérifié'?'r':''}">${esc(v)}</span>`).join('')}</div>
 <p class="mu">Ne payez jamais avant d’avoir visité le bien et vu les documents.</p>
 <div class="row"><a class="btn s" href="tel:+${ph}">Appeler</a><a class="btn o s" target="_blank" rel="noopener" href="https://wa.me/${ph}?text=${E('Bonjour, je suis intéressé(e) par : '+l.t+' ('+loc+', '+price(l)+') sur MetroHome24.')}">WhatsApp</a><button class="btn o s" data-f="${l.id}">${favs.has(l.id)?'♥ Retirer':'♡ Favori'}</button>
 <a class="btn o s" target="_blank" rel="noopener" href="https://wa.me/?text=${E(l.t+' · '+price(l)+' · '+loc+' sur MetroHome24 '+location.href.split('#')[0])}">Partager</a><a class="btn o s" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${E(loc+', Haut-Katanga')}">Voir sur la carte</a><a class="btn o s" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${E('Signalement MetroHome24 : annonce « '+l.t+' » ('+loc+'). Motif : ')}">Signaler</a></div></div>`;
 if(!$('#dlg').open)$('#dlg').showModal()};
document.addEventListener('click',e=>{if(e.target.closest('[data-close]')&&$('#dlg').open)$('#dlg').close();
 if(e.target.closest('[data-f]'))setTimeout(()=>{try{localStorage.setItem('mh24favs',JSON.stringify([...favs]))}catch(x){}},0)});
try{JSON.parse(localStorage.getItem('mh24favs')||'[]').forEach(i=>favs.add(i))}catch(e){}
if(L.some(l=>l.demo))document.body.insertAdjacentHTML('afterbegin','<div style="background:#FF5A7A;color:#1F1430;padding:8px 12px;text-align:center;font-weight:600">Annonces d’exemple : remplacez-les par vos vraies annonces (assets/data.js) avant le lancement.</div>');
showStep();render();route();
})();
