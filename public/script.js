async function fetchIPInfo() {
    const ipInput = document.getElementById('ipInput').value.trim();

    if (!ipInput) {
        alert('Por favor, insira um endereço IP.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/ipinfo/${ipInput}`);

        if (!response.ok) {
            throw new Error('Não foi possível buscar as informações do IP.');
        }

        const data = await response.json();

        const table = document.getElementById('ipInfoTable');
        const tbody = table.querySelector('tbody');

        tbody.innerHTML = '';

        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement('tr');

            const cellKey = document.createElement('td');
            cellKey.textContent = key;
            row.appendChild(cellKey);

            const cellValue = document.createElement('td');

            if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    cellValue.textContent = value.join(', ');
                } else {
                    let formattedValue = '';
                    for (const [subKey, subValue] of Object.entries(value)) {
                        formattedValue += `${subKey}: ${subValue} `;
                    }
                    cellValue.textContent = formattedValue.trim();
                }
            } else {
                cellValue.textContent = value;
            }

            row.appendChild(cellValue);
            tbody.appendChild(row);
        }

        table.style.display = 'table';
    } catch (error) {
        alert(error.message);
    }
}
