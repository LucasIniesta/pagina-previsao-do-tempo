async function consultaCep() {

    const cepInput = document.getElementById('cep').value;
    const cep = cepInput.replace(/\D/g,'')

    
    if (cep.length != 8) {
        alert('CEP incorreto. Verifique se digitou corretamente os 8 dígitos.')
    } else {
        try{
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await response.json()

            if (data.erro){
                alert('Cep não encontrado')
            } else {
                    
                document.getElementById('resultadoEndereco').innerHTML = data.logradouro
                document.getElementById('resultadoBairro').innerHTML = data.bairro
                document.getElementById('resultadoUF').innerHTML = data.uf

            }
        } catch (error) {
            alert(error)
        }  
    }

    consultaClima()
}

async function consultaClima() {
    const lat = document.getElementById('latitude').value
    const lon = document.getElementById('longitude').value

    latnumber = parseFloat(lat)
    lonnumber = parseFloat(lon)

    latFalse = latnumber < -90 || latnumber > 90
    lonFalse = lonnumber < -180 || lonnumber > 180

    if (latFalse || lonFalse) {
        alert ('Latitude ou longitude incorreta. Verifique se os campos estão corretos.')
    } else {
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&forecast_days=1`)
            const data = await response.json()

            document.getElementById('resultadoClima').innerHTML = data.current.temperature_2m
        } catch (error) {
            alert('Cordenadas Latitude ou longitude incorreta. Verifique se os campos estão corretos.')
        }
    }
}