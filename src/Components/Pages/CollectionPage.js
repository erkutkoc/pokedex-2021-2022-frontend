import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
//le css est dans cette partie si pour pouvoir le modifier façilement et avoir une bonne vue d'ensemble il est facile a bouger dans la page plus tard
const collectionPage = `
    <section></section>
    <div class="container">
        <div class="container">
            <div class="row">
            <div class="col-sm">
                <label for="touch"><span class = "Filtering">Filter</span></label>               
                <input type="checkbox" id="touch"> 
            
                <ul class="slide">
                    <li> <a href="#" class="filterButton1" id="ASC" name="Attack">The most attack</a></li> 
                    <li> <a href="#" class="filterButton1" id="ASC" name="HP">The most hp</a></li>
                    <li> <a href="#" class="filterButton1" id="ASC" name="Defence" ">The most defence</a></li>
                    <li> <a href="#" class="filterButton1" id="ASC" name="Speed">The fastest</a></li>

                </ul
            </div>
            <div class="col-sm">
                
            </div>
            <div class="col-sm">
                
            </div>
            </div>
        </div>
        <div class ="card"  style=" display: inline-block;width: 300px;border-radius: 15px; margin: 10px; background-color: #ffcd39">
            <p class="type" style=" position: relative;
                color: black;
                text-transform: uppercase;
                width: fit-content;
                background: #ffef3b;
                border-style: solid;
                left:0.5em;
                top:0.5em;
                border-color: #fcad03;
                border-radius: 10px" >Electric</p>
            <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;">pikachu</h2>
            <figure class="figure"style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" style="max-height: 150px;margin: auto;display: inline-block;" src="https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg"> </figure>
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
            <p class="type" style=" position: relative;
                color: black;
                text-transform: uppercase;
                width: fit-content;
                background: #ffef3b;
                border-style: solid;
                left:0.5em;
                top:0.5em;
                border-color: #fcad03;
                border-radius: 10px" >Electric</p>
            <h2 class="name" style="text-align: center;font-size: 1.5em;font-weight: 700; letter-spacing: 0.02em;">pikachu</h2>
            <figure class="figure"style="padding: 0 25% 0 25%;"><img class="img-fluid figure-img" style="max-height: 150px;margin: auto;display: inline-block;" src="https://resize-gulli.jnsmedia.fr/r/890,__ym__/img//var/jeunesse/storage/images/gulli/chaine-tv/dessins-animes/pokemon/pokemon/pikachu/26571681-1-fre-FR/Pikachu.jpg"> </figure>
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
    const filterButton1 = document.querySelectorAll(".filterButton1");
        filterButton1.forEach(item => {
            item.addEventListener("click",filterby.bind(event,item.name,item.id))
        })
}
 const filterby = async (filter,value) =>{
    
    try {
            const options = {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                
            };

            const response = await fetch("/api/pokemons/sort/"+filter+"/"+value); // fetch return a promise => we wait for the response

            if (!response.ok) {
                throw new Error(
                "fetch error : " + response.status + " : " + response.statusText
                );
            }
            
            await response.json(); // json() returns a promise => we wait for the data
        } catch (error) {
            console.error("LoginPage::error: ", error);
        }
        
}

export default CollectionPage;
