const dados_usuario = JSON.parse(localStorage.getItem("dadosSalvo")) || {};

function carregarDados() {
    const container = document.getElementById("imagem_container");
    if (container) {
        const labelImagem = container.querySelector("label");
        if (labelImagem && dados_usuario.imagem) {
            labelImagem.style.backgroundImage = `url(${dados_usuario.imagem})`;
        }
    }

    if (dados_usuario.nome) {
        const cabecalho = document.querySelector("header");
        
        const iconePerfil = document.createElement("div");
        iconePerfil.classList.add("icone-perfil");

        const p = document.createElement("p");
        p.textContent = dados_usuario.nome.split(" ")[0];
        iconePerfil.appendChild(p);

        if (dados_usuario.imagem) {
            const img = document.createElement("img");
            img.classList.add("imagem-minimizada");
            img.src = dados_usuario.imagem;
            img.alt = "Imagem de Perfil";

            iconePerfil.appendChild(img);
        } else {
            const span = document.createElement("span");
            span.classList.add("material-symbols-rounded");
            span.textContent = "account_circle";

            iconePerfil.appendChild(span);
        }

        const registrar = cabecalho.querySelector(".registrar");
        if (registrar) {
            registrar.replaceWith(iconePerfil);
        }
    }
}