document.addEventListener('DOMContentLoaded', function() {
        function createTable(rows, cols) {
        const table = document.createElement('table');
        let caption = document.createElement('caption');
        caption.textContent = 'Pythagorean Square';
        table.appendChild(caption);
        for (let i = 0; i <= rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j <= cols; j++) {
                const th = document.createElement('th');
                const td = document.createElement('td');
                if (i === 0 && j === 0) {
                    th.textContent = 'x';
                    tr.appendChild(th);
                } else if (i === 0) {
                    th.textContent = j;
                    tr.appendChild(th);
                } else if (j === 0) {
                    th.textContent = i;
                    tr.appendChild(th);
                } else {
                    td.textContent = i * j; 
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        document.getElementById('tableBox').appendChild(table);
    }
    createTable(10, 10);
});

