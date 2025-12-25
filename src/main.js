const modalScript = document.createElement("script");
modalScript.src = "../src/modal.js";
document.head.appendChild(modalScript);

const dadosScript = document.createElement("script");
dadosScript.src = "../src/dados.js";
dadosScript.onload = () => {
    carregarConteudo();
};
document.head.appendChild(dadosScript);

// localStorage.clear();

function carregarConteudo() {
    carregarDados();

    document.querySelectorAll(".msr").forEach(icon => {
        icon.classList.replace("msr", "material-symbols-rounded");
    });

    let ativo = false;
    
    function checarDados(elementos = []) {
        const possiveisFinais = ["@gmail.com", "@hotmail.com.br", "@outlook.com.br"];

        const emailValido = possiveisFinais.some(final =>
            elementos[0].value.endsWith(final)
        );

        const senhaValida = elementos[1].value.length >= 4;

        return emailValido && senhaValida;
    }

    const inputImagem = document.getElementById("imagem_perfil");
    const cont = document.getElementById("imagem_container");

    if (inputImagem) {
        inputImagem.addEventListener("change", () => {
            const labelImagem = cont.querySelector("label");
            const file = inputImagem.files[0];
            if (!file) return;

            const previewURL = URL.createObjectURL(file);
            labelImagem.style.backgroundImage = `url(${previewURL})`;
            labelImagem.style.backgroundSize = "cover";
            labelImagem.style.backgroundPosition = "center";

            const reader = new FileReader();

            reader.onload = () => {
                dados_usuario.imagem = reader.result;
                localStorage.setItem("dadosSalvo", JSON.stringify(dados_usuario));

                URL.revokeObjectURL(previewURL);
            };

            reader.readAsDataURL(file);
        });
    }  

    document.addEventListener("click", (e) => {
        const iconeBusca = e.target.closest("#icone_busca");
        const iconeMais = e.target.closest(".icone-mais");
        const registrar = e.target.closest(".registrar");
        const fecharModal = e.target.closest(".fechar");
        const salvar = e.target.closest(".salvar");
        const cancelar = e.target.closest(".cancelar");
        const iconePerfil = e.target.closest(".icone-perfil");
        const agendamento = e.target.closest(".agendamento");

        const botaoMenu = document.querySelector(".menu-mobile");
        const menu = document.querySelector(".menu-mobile-container");

        if (botaoMenu) {
            menu.classList.toggle("ativo");

            botaoMenu.textContent = menu.classList.contains("ativo")
                ? "left_panel_close"
                : "right_panel_close";
        };

        if (menu) {
            if (e.target === menu) {
                menu.classList.remove("ativo");
                botaoMenu.textContent = "menu";
            }
        };

        if (agendamento) {
            if (Object.keys(dados_usuario).length === 0) {
                defModal({ type: "registro" });
            } else {
                alert("Certo")
            }
        }

        if (iconePerfil) {
            e.preventDefault();
            window.location.href = "perfil.html";
        }

        if (salvar) {
            e.preventDefault();

            const nomeSalvo = document.getElementById("nome_usuario");
            const emailSalvo = document.getElementById("email_usuario");
            const senhaSalva = document.getElementById("senha_usuario");

            const valido = checarDados([emailSalvo, senhaSalva]);
            if (valido) {
                dados_usuario.nome = nomeSalvo.value;
                dados_usuario.email = emailSalvo.value;
                dados_usuario.senha = senhaSalva.value;

                localStorage.setItem("dadosSalvo", JSON.stringify(dados_usuario));

                defModal({ type: null });
                carregarDados();
            } else {
                alert("Dados inválidos");
            }

        }

        if (fecharModal || cancelar) {
            defModal({ type: null });
        }

        if (registrar) {
            defModal({ type: "registro" });
        }

        if (iconeBusca) {
            const caixa = document.getElementById("caixa_busca");
            if (!caixa) return;

            caixa.classList.toggle("ativo");
        }

        if (iconeMais) {
            const caixaPai = iconeMais.closest("article");
            const span = iconeMais.querySelector("span");
            const p = caixaPai.querySelector("p");
            
            if (p.style.display === "none") {
                p.style.display = "block";
                span.textContent = "keyboard_arrow_up";
            } else {
                p.style.display = "none";
                span.textContent = "keyboard_arrow_down";
            } 
        }
    });
}