const express = require("express")   // importei
const app = express()   // atribui
const {uuid} = require("uuidv4")
app.use(express.json())  // faz com que o express entenda as aquisições feitas pelo json

const projetos = []

app.get("/projeto", (request, response) => {
        const {title} = request.query
        const resultados = title 
        ? projetos.filter(projeto => projeto.title.includes(title))
        : projetos 


        return response.json(resultados)

        //const query = request.query
        //console.log(query)
        //return response.json([
        //       "Projeto 1", 
        //       "Projeto 2"  

        //])
})  

// query params (parâmetro get, serve para listar, filtrar as minhas informações) 
// route params (identificar recursos, serve para add ou delete, usa os :)
// request body (criar ou editar um recurso => json)


app.post("/projeto", (request, response) => {
        const {title, dev} = request.body
        const projeto = {id: uuid(), title, dev}

        projetos.push(projeto)

        return response.json(projeto)
    
        //const body = request.body
        //console.log(body)

        //return response.json([
        //      "Projeto 1", 
        //      "Projeto 2",
        //      "Projeto 3"  
        //])

})

app.put("/projeto/:id", (request, response) => {
    const {id} = request.params
    const {title, dev} = request.body
    const projectIndex = projetos.findIndex(project => project.id === id)

    if(projectIndex < 0){    
        return response.status(400).json({error: "Projeto não encontrado"})
    }

    const projeto = {
        id, 
        title,
        dev
    }

    projetos[projectIndex] = projeto

    return response.json(projeto)
    
    //const params = request.params
    //console.log(params)
    
    //return response.json([
    //      "Projeto 4", 
    //      "Projeto 2",
    //      "Projeto 3"  
    //])
})              

//http://localhost:3333/projeto/id

app.delete("/projeto/:id", (request, response) => {
    const {id} = request.params
    const projectIndex = projetos.findIndex(project => project.id === id)

    if(projectIndex < 0){    
        return response.status(400).json({error: "Projeto não encontrado"})
    }
    
    projetos.splice(projectIndex, 1)

    return response.status(204).send()

    //return response.json([
    //      "Projeto 2",
    //      "Projeto 3"  
    //])
})


// app.get("/projeto", (request, response) => {
//   return response.json({
//       Nome: "Ivina",
//        Idade: "18"        
//    })
//})

app.listen(3333, () => {
    console.log("O servidor foi acessado com sucesso!")
})    // json para ouvir a porta do servidor   app.listen(3333) - antes era assim      