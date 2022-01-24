import './css/styles.css';
import * as say from "./fetchCountries"
import allCountries from "../templates/allCountries.hbs"
import countrie from "../templates/countrie.hbs"
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const inputFieldEl=document.querySelector("#search-box")
const listOfCountries=document.querySelector(".country-list")
const oneCountryEl=document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;



const filterCountries = event => {
    const proslushka=inputFieldEl.value.trim();
    if(proslushka === "")
    {
        oneCountryEl.innerHTML="";
        listOfCountries.innerHTML=""
        return;
    }
    say.fetchCountries(proslushka).then(response => {
        if(response.length>10)
        {
            oneCountryEl.innerHTML="";
            listOfCountries.innerHTML=""
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
        else if (response.length<10 && response.length>2)
        {
            listOfCountries.innerHTML=allCountries(response);
            oneCountryEl.innerHTML="";
        }
        else if (response.length===1)
        {
            listOfCountries.innerHTML = "";
            oneCountryEl.innerHTML = countrie(response)
            console.log(response);
        }
    }).catch(()=>{
         Notiflix.Notify.failure("Oops, there is no country with that name");
         oneCountryEl.innerHTML="";
        listOfCountries.innerHTML=""
    })
}


inputFieldEl.addEventListener("input",debounce(filterCountries,DEBOUNCE_DELAY ))
