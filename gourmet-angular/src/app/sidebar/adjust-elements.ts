// Function to dynamically adjust elements in rows
function adjustElementsInRows() {
    const container = document.querySelector('.subcategory-container');

    // Check if the container exists before proceeding
    if (!container) {
        return;
    }

    const rowWidth = container.clientWidth; // Total width of the row
    const elements = container.querySelectorAll('.button-label');

    let currentRowWidth = 0;
    let currentRowElements = [];
    let currentRow = document.createElement('div');

    elements.forEach((element) => {
        const elementWidth = element.clientWidth;

        // Check if the element fits in the current row
        if (currentRowWidth + elementWidth <= rowWidth) {
            currentRowWidth += elementWidth;
            currentRowElements.push(element);
            currentRow.appendChild(element);
        } else {
            // Move to the next row
            container.appendChild(currentRow);

            currentRowWidth = elementWidth;
            currentRowElements = [element];
            currentRow = document.createElement('div');
            currentRow.appendChild(element);
        }
    });

    // Append the last row
    container.appendChild(currentRow);
}

// Call the function when the page loads or when elements change
window.addEventListener('load', adjustElementsInRows);
window.addEventListener('resize', adjustElementsInRows);
