let element = document.querySelector('#poses')
let posesButton = document.querySelector('#yogaPoses')
let poseText = document.querySelector('#poseText')
let poseName = document.querySelector('#poseName')
let sanskritName = document.querySelector('#sanskritName')
let adaptedSanskrit = document.querySelector('#adaptedSanskrit')
let poseBenefits = document.querySelector('#poseBenefits')


posesButton.addEventListener('click', getImages)

function getImages() {
    
        fetch('https://yoga-api-nzy4.onrender.com/v1/poses')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            for(let i = 0; i < result.length; i++){
            let b = result[i];
            let c = Math.floor(Math.random() * result.length);
            result[i] = result[c];
            result[c] = b;
            }
        element.setAttribute("src", result[0].url_png)
        document.querySelector('#poseText').textContent = result[0].pose_description
        document.querySelector('#poseName').textContent = result[0].english_name
        document.querySelector('#sanskritName').textContent = result[0].sanskrit_name
        document.querySelector('#adaptedSanskrit').textContent = result[0].sanskrit_name_adapted
        document.querySelector('#poseBenefits').textContent = result[0].pose_benefits
        console.log(result)
  })
    }
