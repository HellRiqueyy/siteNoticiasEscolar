import { db } from "./firebaseConfig.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

function getInput() {
    return {
        title: document.getElementById('title'),
        content: document.getElementById('content'),
        category: document.getElementById('category'),
        imagem: document.getElementById('imagem')
    }
}

function getValores() {
    return {
        title: title.value.trim(),
        content: content.value,
        category: category.value,
        imagem: imagem.value
    }
}

document.getElementById("btnPost").addEventListener("click", async function () {
    const Inputs = getInput()
    const dados = getValores(Inputs)
    console.log("dados", dados)

    try {
        const ref = await addDoc(collection(db, "post"), dados);
        console.log("Title", ref.id)
        alert("Postagem feita com sucesso!")
    } catch (e) {
        console.log("Erro: ", e)
    }
})