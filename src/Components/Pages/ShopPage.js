
/**
 * Render the Shop Page
 */

 const shopPage = `
 <section></section>
 <div class="container">
     <div class="row">
         <div class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/pokeball.png">
                     <figcaption class="figure-caption">Booster 1</figcaption>
                 </figure>
                 <p>Description du booster, 5 cartes...</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">1000 coins</button></div><strong class="text-center"></strong>
         </div>
         <div class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/pokeball.png">
                     <figcaption class="figure-caption">Booster 1</figcaption>
                 </figure>
                 <p>Description du booster, 5 cartes...</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">1000 coins</button></div><strong class="text-center"></strong>
         </div>
         <div class="col-md-4 text-center text-secondary" style="border-radius: 6px;border: 1px solid var(--bs-blue);">
             <div class="text-center" style="color: var(--bs-blue);">
                 <figure class="figure"><img class="img-fluid figure-img" style="width: auto;height: auto;" src="http://127.0.0.1:8887/pokeball.png">
                     <figcaption class="figure-caption">Booster 1</figcaption>
                 </figure>
                 <p>Description du booster, 5 cartes...</p>
             </div>
             <div style="text-align: center;"><button class="btn border rounded-0" data-bss-hover-animate="pulse" type="button" style="background: #ffde00;text-align: center;width: 330px;height: auto;">1000 coins</button></div><strong class="text-center"></strong>
         </div>
     </div>
 </div>`;

 const ShopPage = () => { 
    const main = document.querySelector("main");
    main.innerHTML = shopPage; 
 
 };
  
  export default ShopPage;