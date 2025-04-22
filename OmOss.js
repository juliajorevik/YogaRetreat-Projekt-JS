let element = document.querySelector('#tea')
let teaButton = document.querySelector('#teaFlavours')
let flavourProfile = document.querySelector('#flavorProfile')
let teaName = document.querySelector('#teaName')
let description = document.querySelector('#description')
let brewingMethod = document.querySelector('#brewingMethod')
let region = document.querySelector('#region')
let steepLevel = document.querySelector('#steepLevel')

teaButton.addEventListener('click', getInfo)

function getInfo() {

        fetch('https://tea-api-gules.vercel.app/api')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            for(let i = 0; i < result.length; i++){
            let b = result[i];
            let c = Math.floor(Math.random() * result.length);
            result[i] = result[c];
            result[c] = b;
            }
        element.setAttribute("src", result[0].image_url)
        document.querySelector('#teaName').textContent = result[0].name
        document.querySelector('#flavorProfile').textContent = result[0].flavor_profile    
        document.querySelector('#description').textContent = result[0].description
        document.querySelector('#brewingMethod').textContent = result[0].brewing_method
        document.querySelector('#region').textContent = result[0].region
        document.querySelector('#steepLevel').textContent = result[0].steep_level
        console.log(result)
  })
}

