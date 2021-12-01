import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
const collectionPage = `
    <section></section>
    <div class="container">
    
        <div class ="card"  style=" display: inline-block;width: 300px;border-radius: 15px; margin: 10px; background-color: #ffcd39">
            <p class="type" style="alignment:right;position: relative" >Electrique</p>
            <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;">pikachu</h2>
            <figure class="figure"style="position: center"><img class="img-fluid figure-img" style="max-height: 150px;margin: auto;display: inline-block;" src="https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg"> </figure>
                 <div class="cardText">
                    <div class="StatsContainer" style="display: flex;justify-content: space-between;  background-color: #f2d785">
                        <div class="statList"  >
                            <p class ="stats">attaque :209 </p>
                            <p class ="stats">defense : 159</p>
                            <p class ="stats">vitalite :274 </p>  
                        </div>
                        <div class="statList" >
                            <p class ="stats">attaque SP. :199 </p>
                            <p class ="stats">defense SP. :179 </p>
                            <p class ="stats">vitesse :279</p>
                        </div>
                    </div>
                    <div class="movesContainer" style="display: flex;justify-content: space-between;">
                        <p class =moves> Move 1 </p>
                        <p class =moves> Move 2 </p>
                    </div>
                    <div class="pokemonDescription" style="background-color: #fff1c7; font-size: 10px">
                        <p class =description> 
                        Ces Pokémons attendent patiemment que la foudre leur tombe dessus, 
                        pour pouvoir recharger au maximum leur réserve d'électricité. 
                        </p>
                    </div>
                </div>
        </div>
      
        
        <div class ="card"  style=" display: inline-block;width: 300px;border-radius: 15px; margin: 10px; background-color: #ffcd39">
            <p class="type" style="alignment:right;position: relative" >Electrique</p>
            <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;">pikachu</h2>
            <figure class="figure"style="position: center"><img class="img-fluid figure-img" style="max-height: 150px;margin: auto;display: inline-block;" src="https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg"> </figure>
                 <div class="cardText">
                    <div class="StatsContainer" style="display: flex;justify-content: space-between;  background-color: #f2d785">
                        <div class="statList"  >
                            <p class ="stats">attaque :209 </p>
                            <p class ="stats">defense : 159</p>
                            <p class ="stats">vitalite :274 </p>  
                        </div>
                        <div class="statList" >
                            <p class ="stats">attaque SP. :199 </p>
                            <p class ="stats">defense SP. :179 </p>
                            <p class ="stats">vitesse :279</p>
                        </div>
                    </div>
                    <div class="movesContainer" style="display: flex;justify-content: space-between;">
                        <p class =moves> Move 1 </p>
                        <p class =moves> Move 2 </p>
                    </div>
                    <div class="pokemonDescription" style="background-color: #fff1c7; font-size: 10px">
                        <p class =description> 
                        Ces Pokémons attendent patiemment que la foudre leur tombe dessus, 
                        pour pouvoir recharger au maximum leur réserve d'électricité. 
                        </p>
                
                    </div>
                </div>
        </div>
</div>
 `;


const CollectionPage = () => {
    // Deal with your NewPage content here
    const main = document.querySelector("main");
    main.innerHTML = collectionPage;
    // create a login form

}

export default CollectionPage;
