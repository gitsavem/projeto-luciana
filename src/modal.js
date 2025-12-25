function defModal( data = {}) {
    if (data.type === null) {
        document.querySelector(".modal").remove();
        return;
    }


    const fundo = document.createElement("div");
    fundo.classList.add("modal");
    document.body.appendChild(fundo);
    const form = document.createElement("form");
    fundo.appendChild(form);

    const frag = document.createDocumentFragment();
    let textoSalvar = "";
    let textoCancelar = "";

    const fechar = document.createElement("span");
    fechar.classList.add("fechar", "material-symbols-rounded");
    fechar.textContent = "close";
    frag.appendChild(fechar);

    if (data.type === "registro") {
        const titulo = document.createElement("h1");
        titulo.textContent = "Cadastrar-se";
        frag.appendChild(titulo);

        const nomeTit = document.createElement("label");
        nomeTit.textContent = "Nome";
        nomeTit.htmlFor = "nome_usuario";
        frag.appendChild(nomeTit);

        const nomeInput = document.createElement("input");
        nomeInput.type = "text";
        nomeInput.id = "nome_usuario";
        frag.appendChild(nomeInput);

        const emailTit = document.createElement("label");
        emailTit.textContent = "Email";
        emailTit.htmlFor = "email_usuario";
        frag.appendChild(emailTit);

        const emailInput = document.createElement("input");
        emailInput.type = "text";
        emailInput.id = "email_usuario";
        frag.appendChild(emailInput);

        const senhaTit = document.createElement("label");
        senhaTit.textContent = "Senha";
        senhaTit.htmlFor = "senha_usuario";
        frag.appendChild(senhaTit);

        const senhaInput = document.createElement("input");
        senhaInput.type = "password";
        senhaInput.id = "senha_usuario";
        frag.appendChild(senhaInput);

        const entrar = document.createElement("p");
        entrar.textContent = "Já tenho cadastro";
        entrar.classList.add("atencao", "entrar");
        frag.appendChild(entrar);

        textoSalvar = "Cadastrar e entrar";
        textoCancelar = "Cancelar cadastro";
    }

    const container = document.createElement("div");
    container.classList.add("container");
    frag.appendChild(container);

    const cancelar = document.createElement("button");
    cancelar.textContent = textoCancelar || "Cancelar";
    cancelar.classList.add("bt-circulado", "cancelar");
    container.appendChild(cancelar);

    const salvar = document.createElement("button");
    salvar.textContent = textoSalvar || "Salvar";
    salvar.classList.add("bt-principal", "salvar");
    container.appendChild(salvar);

    form.appendChild(frag);
}