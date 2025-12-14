const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    const perfilSelecionado = document.getElementById("perfil").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // valida perfil
            if (perfilSelecionado !== data.usuario.perfil) {
                mensagem.style.color = "red";
                mensagem.textContent = "Perfil selecionado não corresponde ao usuário.";
                return;
            }

            mensagem.style.color = "green";
            mensagem.textContent = data.mensagem;

            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            // redirecionamento por perfil
            setTimeout(() => {
                if (data.usuario.perfil === "ADMIN") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            }, 1000);

        } else {
            mensagem.style.color = "red";
            mensagem.textContent = data.erro;
        }
    } catch (error) {
        mensagem.style.color = "red";
        mensagem.textContent = "Erro ao conectar com o servidor";
        console.error(error);
    }
});
