export function createMarkup(cats) {
return cats
.map(({ url, breeds }) => {
const { name, origin, temperament, description, weight } =
breeds[0];
const markup = `
<div class="cat-description">
    <img src="${url}" alt="${name}" width="460">
    <div class="cat-text">
        <h2>${name}</h2>
        <h3>Origin</h3>
        <p>${origin}</p>
        <h3>Weight</h3>
        <p>${weight.customary} lb</p>
        <h3>Temperament</h3>
        <p>${temperament}</p>
        <h3>Description</h3>
        <p>${description}</p>
    </div>
</div> `;
return markup;
})
.join('');
}