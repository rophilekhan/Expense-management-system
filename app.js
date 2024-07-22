


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const list = document.getElementById('list');
    const totalExpenses = document.getElementById('totalExpenses');
    const errorDisplay = document.getElementById('error');

    let expenses = [];

     if (localStorage.getItem('expenses')) {
         expenses = JSON.parse(localStorage.getItem('expenses'));
        renderExpenses();
        calculateTotal();
     }
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const description = document.getElementById('description').value.trim();
        const amount = parseFloat(document.getElementById('amount').value.trim());

        if (description === '' || isNaN(amount) || amount <= 0) {
            errorDisplay.textContent = 'Please enter valid description and amount.';
            return;
        }

        const newExpense = {
            id: Date.now().toString(),
            description: description,
            amount: amount
        };

        expenses.push(newExpense);
        saveToLocalStorage();
        renderExpenses();
        calculateTotal();

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        errorDisplay.textContent = '';
    });

    function renderExpenses() {
        list.innerHTML = '';
        expenses.forEach(function(expense) {
            const item = document.createElement('div');
            item.classList.add('expense-item');
            item.innerHTML =`
                <span>${expense.description}</span>
                <span>$${expense.amount.toFixed(2)}</span>
                <button onclick="removeExpense('${expense.id}')">Remove</button>
                `;
            list.appendChild(item);
        });
    }


    function calculateTotal() {
        let total = 0;
        expenses.forEach(function(expense) {
            total += expense.amount;
        });
        totalExpenses.textContent = `Total: $${total.toFixed(2)}`;
    }

  
    function saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    
    window.removeExpense = function(id) {
        expenses = expenses.filter(function(expense) {
            return expense.id !== id;
        });
        saveToLocalStorage();
        renderExpenses();
        calculateTotal();
    };
});
        