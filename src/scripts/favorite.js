 import "../styles/favorite.css"
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function toggleFavorite(productId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index === -1) {
        favorites.push(productId);
    } else {
        favorites.splice(index, 1); 
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    return index === -1;
}


export function isFavorite(productId) {
    const favorites = getFavorites();
    return favorites.includes(productId);
}