function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const url = "https://pokeapi.co/api/v2/pokemon/";
const container = document.getElementById("container");
const btn = document.getElementById("btn");
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const abilities = document.getElementById("abilities");
const Hability = document.getElementById("Hability");
const Pokename = document.getElementById("name");
const sBar = document.getElementById("sBar");
const sBarP = document.getElementById("sBar::placeholder");
const photo = document.getElementById("photo");
const image = document.getElementById("image");
const warning = document.getElementById("warning");
const HP =document.getElementById("HP");
const Attack =document.getElementById("Attack");
const Defence =document.getElementById("Defence");
const Sp_Atk =document.getElementById("Sp_Atk");
const Sp_Def =document.getElementById("Sp_Def");
const Speed =document.getElementById("Speed");

btn.addEventListener("click",async () => {
    container.style.display = 'none';
    let name = sBar.value.toLocaleLowerCase();
    let finalURL = url + name;
    
    try 
    {

        if(sBar.value.trim() === "")
        {
            sBar.placeholder = `Enter a name 🗿` ;
            setTimeout(() => {
                sBar.placeholder = `Search here...` ;
            }, 1000);

            container.style.display = 'none';
            warning.style.display = 'block'; 
            return;
        } 

        container.style.display = 'none';
        warning.style.display = 'block';
        warning.innerHTML = "Please wait...";
        const response = await fetch(finalURL);

        if(!response.ok)
        {
            throw new error("Please enter a valid pokemon name");
        }

        warning.style.display = 'none'; 
        container.style.display = 'block';

        const data = await response.json();
        //console.log(data);
        photo.src = data.sprites.front_default;
        Pokename.innerHTML = capitalizeFirstLetter(data.name);

        a2.style.display = 'inline'; 
        Hability.style.display = 'block';

        if (data.types.length === 1) 
        {
            a1.innerHTML = capitalizeFirstLetter(data.types[0].type.name);
            a2.style.display = 'none';
            a1.style.textAlign = 'center';
        } 
        else if(data.types.length === 2)
        {
            a1.innerHTML = capitalizeFirstLetter(data.types[0].type.name);
            a2.innerHTML = capitalizeFirstLetter(data.types[1].type.name);
        }
        if(data.abilities.length === 2 && data.abilities[1].slot === 3)
        {
            abilities.innerHTML = capitalizeFirstLetter(data.abilities[0].ability.name);
            Hability.innerHTML = capitalizeFirstLetter(data.abilities[1].ability.name);
        }
        else if(data.abilities.length === 1)
        {
            abilities.innerHTML = capitalizeFirstLetter(data.abilities[0].ability.name);
            Hability.style.display = 'none';
        }
        else if(data.abilities.length === 2 && data.abilities[1].slot === 2)
        {
            abilities.innerHTML = `${capitalizeFirstLetter(data.abilities[0].ability.name)}/${capitalizeFirstLetter(data.abilities[1].ability.name)}`;
            Hability.style.display = 'none';
        }
        else
        {
            abilities.innerHTML = `${capitalizeFirstLetter(data.abilities[0].ability.name)}/${capitalizeFirstLetter(data.abilities[1].ability.name)}`;
            Hability.innerHTML = capitalizeFirstLetter(data.abilities[2].ability.name);
        }

        HP.innerHTML = `HP: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.stats[0].base_stat }`;
        Attack.innerHTML = `Attack:  &nbsp;&nbsp;&nbsp;${data.stats[1].base_stat }`;
        Defence.innerHTML = `Defence:  ${data.stats[2].base_stat }`;
        Sp_Atk.innerHTML = `Sp. Atk: &nbsp; ${data.stats[3].base_stat }`;
        Sp_Def.innerHTML = `Sp. Def: &nbsp; ${data.stats[4].base_stat }`;
        Speed.innerHTML = `Speed: &nbsp;&nbsp;&nbsp; ${data.stats[5].base_stat }`;

        sBar.value = "";
        sBar.placeholder = "Search here...";
    } 
    catch (error) 
    {
        container.style.display = 'none';
        finalURL = "";
        warning.style.display = 'block';
        warning.innerHTML = "Sorry, no data found!!!";
        warning.style.color = 'red';
        setTimeout(() => {
            warning.innerHTML = "Welcome to MonsterPedia.";
            warning.style.color = 'black';
        }, 2000);
        sBar.value = "";
        sBar.placeholder = "Search here...";
        container.style.display = 'none';
        return;
    }
})
