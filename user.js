document.addEventListener('DOMContentLoaded', () => {
    // Verificar datos en localStorage y evitar datos simulados si ya existen
    let user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Si no hay datos almacenados, crear datos simulados
        user = {
            name: "Juan Pérez",
            email: "juanperez@example.com",
            phone: "+54 9 11 1234 5678",
            address: "Calle Falsa 123, Ciudad, País"
        };
    }

    // Actualizar elementos con datos del usuario
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-phone').textContent = user.phone;
    document.getElementById('user-address').textContent = user.address;

    // Habilitar edición
    document.getElementById('edit-btn').addEventListener('click', () => {
        document.getElementById('user-name').contentEditable = true;
        document.getElementById('user-email').contentEditable = true;
        document.getElementById('user-phone').contentEditable = true;
        document.getElementById('user-address').contentEditable = true;
    });

    // Guardar cambios en localStorage
    document.getElementById('save-btn').addEventListener('click', () => {
        const updatedUser = {
            name: document.getElementById('user-name').textContent,
            email: document.getElementById('user-email').textContent,
            phone: document.getElementById('user-phone').textContent,
            address: document.getElementById('user-address').textContent
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Cambios guardados!');
        document.getElementById('user-name').contentEditable = false;
        document.getElementById('user-email').contentEditable = false;
        document.getElementById('user-phone').contentEditable = false;
        document.getElementById('user-address').contentEditable = false;
    });

    // Función para cancelar la edición
    document.getElementById('cancel-btn').addEventListener('click', () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            document.getElementById('user-name').textContent = storedUser.name;
            document.getElementById('user-email').textContent = storedUser.email;
            document.getElementById('user-phone').textContent = storedUser.phone;
            document.getElementById('user-address').textContent = storedUser.address;
        }
        document.getElementById('user-name').contentEditable = false;
        document.getElementById('user-email').contentEditable = false;
        document.getElementById('user-phone').contentEditable = false;
        document.getElementById('user-address').contentEditable = false;
    });

    // Cargar datos desde localStorage al cargar la página
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        document.getElementById('user-name').textContent = storedUser.name;
        document.getElementById('user-email').textContent = storedUser.email;
        document.getElementById('user-phone').textContent = storedUser.phone;
        document.getElementById('user-address').textContent = storedUser.address;
    }
});
