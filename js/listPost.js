import { db } from "./firebaseConfig.js"
import { getDoc, getDocs, collection, doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

async function buscarPost() {
    const dadosBanco = await getDocs(collection(db, "post"))
    const post = []
    for (const doc of dadosBanco.docs) {
        post.push({ id: doc.id, ...doc.data() })
    }
    return post;
}

const listaPostDiv = document.getElementById("listar-post")

async function carregarListaPost() {
    listaPostDiv.innerHTML = "<p> Carregando Lista de Noticias...</p>"
    try {
        const post = await buscarPost();
        console.log(post)
        renderizarListaPost(post);
    } catch (error) {
        console.log("Erro ao carregar a lista de noticia: ", error);
        listaPostDiv.innerHTML = "<p> Erro ao carregar a lista de Noticia <p>"
    }

}

function renderizarListaPost(post) {
    listaPostDiv.innerHTML = " "

    if (post.length === 0) {
        listaPostDiv.innerHTML = "<p> Nenhuma noticia encontrada :( </p>"
        return
    }

    for (let posts of post) {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post-item");
        postDiv.innerHTML = `
        <img class="postImagem" src="${posts.imagem}">
        <div class ="postDirection">
        <p class="postTitulo"> ${posts.title} </p>
        <p class="postContent">${posts.content}</p>
        <p class="postCategoria">${posts.category}</p> 
        <button class="btn-excluir" data-id="${posts.id}"> Excluir </button>
        <button class="btn-editar" data-id="${posts.id}"> Editar </button> 
        </div>
        `
        listaPostDiv.appendChild(postDiv)
    }
    addEventListener();
}

async function excluirPost(idPost) {
    try {
        const documentoDeletar = doc(db, "post", idPost);
        await deleteDoc(documentoDeletar)
        console.log("Noticia com id" + idPost + "foi excluida.")
        return true;
    } catch (erro) {
        console.log("Erro ao excluir o Erro ao excluir post", erro)
        alert("Ocorreu um erro ao excluir a noticia. Tente novamente!")
        return false;
    }
}

let edicao = null; // Definindo variável global


async function lidarClique(eventoDeClique) {
    const btnExcluir = eventoDeClique.target.closest('.btn-excluir')
    if (btnExcluir) {
        const certeza = confirm("Tem certeza que deseja fazer essa exclusão?")
        if (certeza) {

            const idPost = btnExcluir.dataset.id;
            const exclusaoBemSucedida = await excluirPost(idPost)

            if (exclusaoBemSucedida) {
                carregarListaPost();
                alert("Noticia excluida com sucesso! \o/ ")
            }
        } else {
            alert("Exclusão cancelada")
        }
    }

    const btnEditar = eventoDeClique.target.closest('.btn-editar')
    if (btnEditar) {
        const idPost = btnEditar.dataset.id
        const posts = await buscarPostPorId(idPost)

        edicao = getValoresEditar()
        edicao.editarImagem.value = posts.imagem
        edicao.editarTitulo.value = posts.title
        edicao.editarCategoria.value = posts.category
        edicao.editarContent.value = posts.content
        edicao.editarId.value = posts.id

        edicao.formularioEdicao.style.display = 'block'
    }
}

function getValoresEditar() {
    return {
        editarImagem: document.getElementById("editar-imagem"),
        editarTitulo: document.getElementById("editar-titulo"),
        editarCategoria: document.getElementById("editar-categoria"),
        editarContent: document.getElementById("editar-content"),
        editarId: document.getElementById("editar-id"),
        formularioEdicao: document.getElementById("formulario-edicao")

    }
}

async function buscarPostPorId(id) {
    try {
        const postDoc = doc(db, "post", id)
        const dadoAtual = await getDoc(postDoc)

        if (dadoAtual.exists()) {
            return { id: dadoAtual.id, ...dadoAtual.data() }
        } else {
            console.log("Noticia não encontrando com o ID", id);
            return null;
        }
    } catch (erro) {
        console.log("Erro ao buscar a noticia por ID ", erro)
        alert("Erro ao buscar noticia para editar")
        return null
    }

}

document.getElementById("btnSalvarEdicao").addEventListener("click", async () => {
    const id = edicao.editarId.value;
    const novoDados = {
        title: edicao.editarTitulo.value.trim(),
        category: edicao.editarCategoria.value,
        content: edicao.editarContent.value.trim(),
        imagem: edicao.editarImagem.value
    }

    try {
        const ref = doc(db, "post", id)
        await setDoc(ref, novoDados)
        alert("NOticia atualizada com sucesso!")
        edicao.formularioEdicao.style.display = 'none'
        carregarListaPost();
    } catch (error) {
        console.log("Erro ao salvar edicão", error);
        alert("Erro ao atualizar noticia.")
    }
})

document.getElementById('btnCancelarEdicao').addEventListener('click', () => {
    document.getElementById("formulario-edicao").style.display = 'none'
})

function addEventListener() {
    listaPostDiv.addEventListener("click", lidarClique)
}


document.addEventListener("DOMContentLoaded", carregarListaPost);