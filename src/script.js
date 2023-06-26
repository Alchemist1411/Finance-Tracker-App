// Retrieve transactions from localStorage or initialize an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update the transaction list and balance
function updateTransactions() {
  const transactionsList = document.getElementById('transactions');
  const balanceElement = document.getElementById('balance');
  let income = 0;
  let expense = 0;

  // Clear the current list
  transactionsList.innerHTML = '';

  // Update the list with the transactions
  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class = "transaction-text">${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: Rs.${transaction.amount}<br>${transaction.description} </span>
      <div>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;

    if (transaction.type === 'income') {
      listItem.classList.add('income');
      income += transaction.amount;
    } else {
      listItem.classList.add('expense');
      expense += transaction.amount;
    }

    transactionsList.appendChild(listItem);
  });

  // Update the balance
  const balance = income - expense;
  balanceElement.textContent = 'Rs ' + balance + '.00';

  // Add event listeners to edit and delete buttons
  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  editButtons.forEach(button => {
    button.addEventListener('click', handleEdit);
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDelete);
  });
}

// Function to add a new transaction
function addTransaction(e) {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Validate the inputs
  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter valid values for description and amount.');
    return;
  }

  const transaction = {
    type,
    description,
    amount
  };

  // Add the transaction to the list
  transactions.push(transaction);

  // Save the updated transactions to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update the transaction list and balance
  updateTransactions();

  // Reset the form
  document.getElementById('type').value = 'income';
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

// Function to handle editing a transaction
function handleEdit() {
  const index = this.getAttribute('data-index');
  const transaction = transactions[index];

  // Prompt the user for the updated values
  const newDescription = prompt('Enter the new description:', transaction.description);
  const newAmount = parseFloat(prompt('Enter the new amount:', transaction.amount));

  // Validate the inputs
  if (newDescription.trim() === '' || isNaN(newAmount)) {
    alert('Please enter valid values for description and amount.');
    return;
  }

  // Update the transaction
  transaction.description = newDescription;
  transaction.amount = newAmount;

  // Save the updated transactions to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update the transaction list and balance
  updateTransactions();
}

// Function to handle deleting a transaction
function handleDelete() {
  const index = this.getAttribute('data-index');

  // Remove the transaction from the list
  transactions.splice(index, 1);

  // Save the updated transactions to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update the transaction list and balance
  updateTransactions();
}

// Add event listener to the transaction form
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

// Initial update of the transaction list and balance
updateTransactions();