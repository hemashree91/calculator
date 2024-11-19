let entries = JSON.parse(localStorage.getItem('entries')) || [];
let balance = 0;
let incomeTotal = 0;
let expenseTotal = 0;
console.log(JSON)
function addEntry() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && amount && !isNaN(amount)) {
        const entry = { description, amount, type, id: new Date().getTime() };
        entries.push(entry);
        
        localStorage.setItem('entries', JSON.stringify(entries));
        
        updateEntries();
        resetFields();
    } else {
        alert('Please enter valid entry');
    }
}

function updateEntries() {
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '';

    balance = 0;
    incomeTotal = 0;
    expenseTotal = 0;

    const filter = document.querySelector('input[name="filter"]:checked').value;

    entries.forEach(entry => {
        if (filter === 'all' || filter === entry.type) {
            const li = document.createElement('li');
            li.innerHTML = `${entry.description} - $${entry.amount.toFixed(2)} 
                <button class="edit-button" onclick="editEntry(${entry.id})">Edit</button>
                <button class="delete-button" onclick="deleteEntry(${entry.id})">Delete</button>`;
            entriesList.appendChild(li);
        }

        if (entry.type === 'income') {
            incomeTotal += entry.amount;
        } else {
            expenseTotal += entry.amount;
        }

        balance = incomeTotal - expenseTotal;
    });

    document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;
    document.getElementById('income-total').textContent = `Income: $${incomeTotal.toFixed(2)}`;
    document.getElementById('expense-total').textContent = `Expense: $${expenseTotal.toFixed(2)}`;
}

function editEntry(id) {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
        document.getElementById('description').value = entry.description;
        document.getElementById('amount').value = entry.amount;
        document.getElementById('type').value = entry.type;

        deleteEntry(id);
    }
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    updateEntries();
}

function filterEntries() {
    updateEntries();
}

function resetFields() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '$$$';
    document.getElementById('type').value = 'income';
    document.getElementById('entries').value='';
}

document.addEventListener( () => {
    updateEntries();
    
});
