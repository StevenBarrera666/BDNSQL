document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector("#email").value;
        const password = loginForm.querySelector("#password").value;

        const requestBody = {
            email,
            password,
        };

        try {
            const response = await fetch("http://127.0.0.1:3002/login_client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                // Aquí puedes redirigir al usuario a la página de inicio, por ejemplo.
                window.location.href = "home.html";
            } else {
                // Error en el inicio de sesión
                responseMessage.innerHTML = `Error: ${data.msg}`;
            }
        } catch (error) {
            console.error(error);
        }
    });
});