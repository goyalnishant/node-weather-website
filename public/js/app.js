const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')
const m3 = document.querySelector('#m3')
const m4 = document.querySelector('#m4')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    m1.textContent = 'Loading...'
    m2.textContent = ''
    m3.textContent = ''
    m4.textContent = ''
    const url = 'http://localhost:3000/weather?address='+ location
    fetch(url).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            m1.textContent = 'Error :' + data.error
            m2.textContent = ' '
            m3.textContent = ' '
            m4.textContent = ' '
            // console.log(data.error)
        }else{
            m1.textContent = 'Address :' + data.location
            m2.textContent = 'Description :' + data.description
            m3.textContent = 'Current Temp :' + data.current_temp
            m4.textContent = 'But Feels Like :' + data.feelslike
            // console.log('Address :',data.location)
            // console.log('Description :',data.description)
            // console.log('Current Temperature :',data.current_temp)
            // console.log('Feels Like :',data.feelslike)
        }
    })
})

})