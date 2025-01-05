document.addEventListener('DOMContentLoaded', function () {
    const ingredientInput = document.getElementById('ingredient-search');
    const searchButton = document.getElementById('search-btn');
    const recipeContainer = document.querySelector('.recipe-container');

    // Función para mostrar todas las recetas o una categoría específica
    function filterRecipes(category) {
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
            card.classList.toggle('hidden', card.dataset.category !== category && category !== 'all');
        });
    }

    // Función de recomendación de recetas basada en ingredientes
    function recommendRecipes(ingredient) {
        const recipes = getRecipeData();

        const recommendations = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(ingredient.toLowerCase()) ||
            recipe.description.toLowerCase().includes(ingredient.toLowerCase())
        );

        recipeContainer.innerHTML = '';

        if (recommendations.length > 0) {
            recommendations.forEach(recipe => {
                const recipeCard = createRecipeCard(recipe);
                recipeContainer.appendChild(recipeCard);
            });
        } else {
            recipeContainer.innerHTML = '<p>No se encontraron recetas para este ingrediente.</p>';
        }
    }

    // Crear tarjeta de receta
    function createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.category = recipe.category;

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <a href="${recipe.link}" class="view-recipe">Ir a la receta</a>
        `;

        return recipeCard;
    }

    // Obtener datos de recetas
    function getRecipeData() {
        return [
            {
                title: 'Ensalada Verde',
                description: 'Una ensalada fresca con espinacas, tomate y aguacate.',
                image: 'ensalada-verde.jpg',
                category: 'ensaladas',
                link: 'receta-verde.html'
            },
            {
                title: 'Smoothie de Frutas',
                description: 'Un batido energético con fresas, plátano y yogur.',
                image: 'smoothie-frutas.jpg',
                category: 'smoothies',
                link: 'receta-smoothie.html'
            },
            {
                title: 'Pollo a la Parrilla',
                description: 'Pollo marinando en hierbas y asado a la parrilla.',
                image: 'pollo-parrilla.jpg',
                category: 'pollo',
                link: 'receta-pollo.html'
            },
            {
                title: 'Tarta de Zanahoria',
                description: 'Postre saludable a base de zanahorias, especias y frutos secos.',
                image: 'tarta-zanahoria.jpg',
                category: 'postres',
                link: 'receta-tarta.html'
            },
            {
                title: 'Ensalada de Quinoa y Garbanzos',
                description: 'Ensalada nutritiva con quinoa, garbanzos, tomate y especias.',
                image: 'ensalada-quinoa.jpg',
                category: 'ensaladas',
                link: 'receta-quinoa.html'
            },
            {
                title: 'Acaí Bowl',
                description: 'Bowl nutritivo con acaí, plátano, frutas y semillas.',
                image: 'acai-bowl.jpg',
                category: 'smoothies',
                link: 'receta-acai.html'
            },
            {
                title: 'Ensalada Vegana con Kale',
                description: 'Ensalada vegana con kale, aguacate y aliño cítrico.',
                image: 'ensalada-vegana.jpg',
                category: 'veganos',
                link: 'receta-kale.html'
            },
            {
                title: 'Brownie de Almendras',
                description: 'Postre saludable a base de almendras, cacao y dátiles.',
                image: 'brownie-almendras.jpg',
                category: 'postres',
                link: 'receta-brownie.html'
            }
        ];
    }

    // Evento de búsqueda al hacer clic o presionar ENTER
    if (searchButton && ingredientInput) {
        searchButton.addEventListener('click', () => {
            const ingredient = ingredientInput.value.trim();
            if (ingredient) {
                recommendRecipes(ingredient);
            } else {
                alert('Por favor, ingresa al menos un ingrediente.');
            }
        });

        ingredientInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const ingredient = ingredientInput.value.trim();
                if (ingredient) {
                    recommendRecipes(ingredient);
                } else {
                    alert('Por favor, ingresa al menos un ingrediente.');
                }
            }
        });
    }
});
