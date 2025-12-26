// ==============================
// BASE PATH (index.html ou /pages)
// ==============================
const basePath = location.pathname.includes("/pages/")
    ? ".."
    : ".";

// ==============================
// CARREGAR SCRIPTS
// ==============================
const modalScript = document.createElement("script");
modalScript.src = `${basePath}/src/modal.js`;
document.head.appendChild(modalScript);

const dadosScript = document.createElement("script");
dadosScript.src = `${basePath}/src/dados.js`;
dadosScript.onload = () => {
    carregarConteudo();
};
document.head.appendChild(dadosScript);

// ==============================
// FUNÇÃO PRINCIPAL
// ==============================
function carregarConteudo() {

    // ---- carregar dados do usuário
    if (typeof carregarDados === "function") {
        carregarDados();
    }

    // ---- ajustar ícones material symbols
    document.querySelectorAll(".msr").forEach(icon => {
        icon.classList.replace("msr", "material-symbols-rounded");
    });

    // ==============================
    // FUNÇÕES AUXILIARES
    // ==============================

    function checarDados(emailInput, senhaInput) {
        const finaisValidos = ["@gmail.com", "@hotmail.com.br", "@outlook.com.br"];

        const emailValido = finaisValidos.some(f =>
            emailInput.value.endsWith(f)
        );

        const senhaValida = senhaInput.value.length >= 4;

        return emailValido && senhaValida;
    }

    function salvarImagemPerfil() {
        const inputImagem = document.getElementById("imagem_perfil");
        const container = document.getElementById("imagem_container");

        if (!inputImagem || !container) return;

        const label = container.querySelector("label");
        const file = inputImagem.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);

        label.style.backgroundImage = `url(${previewURL})`;
        label.style.backgroundSize = "cover";
        label.style.backgroundPosition = "center";

        const reader = new FileReader();
        reader.onload = () => {
            dados_usuario.imagem = reader.result;
            localStorage.setItem("dadosSalvo", JSON.stringify(dados_usuario));
            URL.revokeObjectURL(previewURL);
        };

        reader.readAsDataURL(file);
    }

    function salvarRegistro() {
        const nome = document.getElementById("nome_usuario");
        const email = document.getElementById("email_usuario");
        const senha = document.getElementById("senha_usuario");

        if (!nome || !email || !senha) return;

        if (checarDados(email, senha)) {
            dados_usuario.nome = nome.value;
            dados_usuario.email = email.value;
            dados_usuario.senha = senha.value;

            localStorage.setItem("dadosSalvo", JSON.stringify(dados_usuario));

            defModal({ type: null });
            carregarDados();
        } else {
            alert("Dados inválidos");
        }
    }

    // ==============================
    // EVENT LISTENER ÚNICO
    // ==============================
    document.addEventListener("click", (e) => {

        // ---- MENU MOBILE
        const botaoMenu = e.target.closest(".menu-mobile");
        const menu = document.querySelector(".menu-mobile-container");

        if (botaoMenu && menu) {
            menu.classList.toggle("ativo");
            botaoMenu.textContent = menu.classList.contains("ativo")
                ? "left_panel_close"
                : "right_panel_close";
            return;
        }

        if (menu && e.target === menu) {
            menu.classList.remove("ativo");
            document.querySelector(".menu-mobile").textContent = "right_panel_close";
            return;
        }

        // ---- BUSCA
        const iconeBusca = e.target.closest("#icone_busca");
        if (iconeBusca) {
            document.getElementById("caixa_busca")?.classList.toggle("ativo");
            return;
        }

        // ---- REGISTRAR
        const registrar = e.target.closest(".registrar");
        if (registrar) {
            defModal({ type: "registro" });
            return;
        }

        // ---- FECHAR / CANCELAR MODAL
        const fechar = e.target.closest(".fechar, .cancelar");
        if (fechar) {
            defModal({ type: null });
            return;
        }

        // ---- SALVAR REGISTRO
        const salvar = e.target.closest(".salvar");
        if (salvar) {
            e.preventDefault();
            salvarRegistro();
            return;
        }

        // ---- PERFIL
        const iconePerfil = e.target.closest(".icone-perfil");
        if (iconePerfil) {
            window.location.href = `${basePath}/pages/perfil.html`;
            return;
        }

        // ---- AGENDAMENTO
        const agendamento = e.target.closest(".agendamento");
        if (agendamento) {
            if (Object.keys(dados_usuario).length === 0) {
                defModal({ type: "registro" });
            } else {
                alert("Agendamento confirmado!");
            }
            return;
        }

        // ---- ABRIR / FECHAR TEXTO
        const iconeMais = e.target.closest(".icone-mais");
        if (iconeMais) {
            const artigo = iconeMais.closest("article");
            const texto = artigo?.querySelector("p");
            const span = iconeMais.querySelector("span");

            if (texto) {
                const aberto = texto.style.display !== "none";
                texto.style.display = aberto ? "none" : "block";
                span.textContent = aberto
                    ? "keyboard_arrow_down"
                    : "keyboard_arrow_up";
            }
            return;
        }
    });

    // ==============================
    // EVENTOS ESPECÍFICOS
    // ==============================
    const inputImagem = document.getElementById("imagem_perfil");
    if (inputImagem) {
        inputImagem.addEventListener("change", salvarImagemPerfil);
    }
}