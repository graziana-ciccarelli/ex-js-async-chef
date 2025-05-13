async function getChefBirthday(id) {
  try {
    // Prima richiesta: ottieni la ricetta
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!recipeResponse.ok) {
      throw new Error(`Ricetta con ID ${id} non trovata (status: ${recipeResponse.status})`);
    }

    const recipe = await recipeResponse.json();

    if (!recipe.userId) {
      throw new Error("La ricetta non contiene un userId valido.");
    }

    // Seconda richiesta: ottieni lo chef
    const chefResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
    if (!chefResponse.ok) {
      throw new Error(`Utente con ID ${recipe.userId} non trovato (status: ${chefResponse.status})`);
    }

    const chef = await chefResponse.json();

    if (!chef.birthDate) {
      throw new Error("La data di nascita dell'utente non è disponibile.");
    }

    // BONUS 2: formatto la data nel formato GG/MM/AAAA usando dayjs
    const formattedDate = dayjs(chef.birthDate).format('DD/MM/YYYY');

    return formattedDate;

  } catch (error) {
    console.error("Errore:", error.message);
    throw error;
  }
}

// Esempio di utilizzo
getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
