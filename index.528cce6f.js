fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=c9769c2da639ff9e854a387ed1b7b891").then((e=>{if(!e.ok)throw new Error("Błąd pobierania danych z API TMDB");return e.json()})).then((e=>{const t=e.results,d=document.querySelector(".gallery");t.map((e=>{const t=document.createElement("div");t.classList.add("card"),d.appendChild(t);const n=document.createElement("a");n.href=`https://www.themoviedb.org/movie/${e.id}`;const a=document.createElement("img");a.classList.add("card__pic"),a.src=`https://image.tmdb.org/t/p/w500${e.poster_path}`;const c=document.createElement("div");c.classList.add("card__info");const o=document.createElement("h2");o.textContent=e.title;document.createElement("h3").textContent=e.genre_ids,e.release_date,c.appendChild(o),n.appendChild(a),n.appendChild(c),t.appendChild(n),d.appendChild(t)}))})).catch((e=>console.error(e)));
//# sourceMappingURL=index.528cce6f.js.map
