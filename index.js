document.getElementById('loginBtn').addEventListener('click', () => {
    const usernameInput = document.getElementById('loginUser').value;
    const passwordInput = document.getElementById('loginPassword').value;

    // Check if username and password match
    if (usernameInput === "user" && passwordInput === "password") {
        // Save user data to local storage
        const userData = {
            nombre: usernameInput,
            loginUser: usernameInput,
            loginPassword: passwordInput
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirect to steps.html
        window.location.href = "steps.html";
    } else {
        alert("Credenciales incorrectas. Inténtelo de nuevo.");
    }
});

// Add the following code to initializeApp() function to check if the user is already logged in
function initializeApp() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const storedUser = JSON.parse(storedUserData);
        usuarioActual = storedUser.nombre;
        document.getElementById('app').style.display = 'block';
        document.getElementById('loginBtn').style.display = 'none';
        createStepsInputs();
    } else {
        // User is not logged in, show login form
        document.getElementById('loginForm').style.display = 'block';
    }

    // The rest of the initializeApp() function remains unchanged
    document.getElementById('calculateBtn').addEventListener('click', () => {
        if (!usuarioActual) {
            alert("Inicie sesión antes de continuar.");
            return;
        }

        const userName = document.getElementById('userName').value;
        const weight = parseInt(document.getElementById('weight').value);
        const walkTime = parseInt(document.getElementById('walkTime').value);

        if (!userName || isNaN(weight) || isNaN(walkTime)) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const pasos = {};
        dias.forEach(dia => {
            pasos[dia] = parseInt(document.getElementById(dia).value);
        });

        const usuario = {
            nombre: userName,
            pasos: pasos,
            peso: weight,
            tiempoCaminata: walkTime,
        };

        calculateSteps(usuario);
        calcularCalorias(usuario);
        corredores(usuario);
    });
}

