//console.log('Client side javaScript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=pofghj').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             // console.log({
//             //     location: data.location,
//             //     forecast: data.forecast
//             // })
//               console.log(data.location)
//               console.log(data.forecast)
//         }

//     })
// })

const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{ //e ==event object

    e.preventDefault()

    const location= search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            // console.log(data.error)
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
 
            //   console.log(data.location)
            //   console.log(data.forecast)
        }
    })
})
})