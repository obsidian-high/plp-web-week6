// ========================================
// SPENDWISE WEEK 6
// Interactive Budget Dashboard
// ========================================


// ========================================
// 1. APPLICATION DATA
// ========================================

// Monthly budget
let monthlyBudget = 100000;


// Array containing multiple expense records.
// Each expense is stored as an object.
let expenses = [

    {
        id: 1,
        name: "Groceries",
        amount: 12500,
        category: "Food"
    },

    {
        id: 2,
        name: "Matatu and Fuel",
        amount: 8500,
        category: "Transport"
    },

    {
        id: 3,
        name: "Electricity",
        amount: 4500,
        category: "Utilities"
    }

];


// ========================================
// 2. DOM ELEMENTS
// ========================================

const expenseForm =
    document.getElementById("expenseForm");

const expenseNameInput =
    document.getElementById("expenseName");

const expenseAmountInput =
    document.getElementById("expenseAmount");

const expenseCategoryInput =
    document.getElementById("expenseCategory");

const expenseList =
    document.getElementById("expenseList");

const formMessage =
    document.getElementById("formMessage");

const budgetDisplay =
    document.getElementById("budgetDisplay");

const totalExpensesDisplay =
    document.getElementById("totalExpensesDisplay");

const remainingDisplay =
    document.getElementById("remainingDisplay");

const recordCountDisplay =
    document.getElementById("recordCountDisplay");

const budgetStatus =
    document.getElementById("budgetStatus");

const percentageDisplay =
    document.getElementById("percentageDisplay");

const progressBar =
    document.getElementById("progressBar");

const clearExpensesButton =
    document.getElementById("clearExpensesButton");


// ========================================
// 3. FORMAT CURRENCY
// ========================================

function formatCurrency(amount) {

    return "KSh " + amount.toLocaleString("en-KE", {

        minimumFractionDigits: 0,

        maximumFractionDigits: 2

    });

}


// ========================================
// 4. CALCULATE TOTAL EXPENSES
// ========================================

function calculateTotalExpenses() {

    let total = 0;


    // Loop through every expense record.
    expenses.forEach(function (expense) {

        total += expense.amount;

    });


    return total;

}


// ========================================
// 5. CALCULATE REMAINING BALANCE
// ========================================

function calculateRemainingBalance(
    budget,
    expensesTotal
) {

    return budget - expensesTotal;

}


// ========================================
// 6. UPDATE BUDGET STATUS
// ========================================

function updateBudgetStatus(
    remainingBalance,
    totalExpenses
) {

    let percentageUsed = 0;


    if (monthlyBudget > 0) {

        percentageUsed =
            (totalExpenses / monthlyBudget) * 100;

    }


    const displayedPercentage =
        Math.min(
            Math.max(percentageUsed, 0),
            100
        );


    percentageDisplay.textContent =
        displayedPercentage.toFixed(0) + "%";


    progressBar.style.width =
        displayedPercentage + "%";


    // ====================================
    // CONDITIONAL STATEMENTS
    // ====================================

    if (remainingBalance > 0) {

        budgetStatus.className =
            "status-box safe";

        budgetStatus.innerHTML = `

            <span
                class="status-icon"
                aria-hidden="true"
            >
                ✓
            </span>

            <div>

                <strong>
                    Budget available
                </strong>

                <p>
                    You still have
                    ${formatCurrency(remainingBalance)}
                    available.
                </p>

            </div>
        `;

    }

    else if (remainingBalance === 0) {

        budgetStatus.className =
            "status-box warning";

        budgetStatus.innerHTML = `

            <span
                class="status-icon"
                aria-hidden="true"
            >
                !
            </span>

            <div>

                <strong>
                    Budget fully used
                </strong>

                <p>
                    You have used your entire
                    monthly budget.
                </p>

            </div>
        `;

    }

    else {

        budgetStatus.className =
            "status-box danger";

        budgetStatus.innerHTML = `

            <span
                class="status-icon"
                aria-hidden="true"
            >
                !
            </span>

            <div>

                <strong>
                    Budget exceeded
                </strong>

                <p>
                    You are
                    ${formatCurrency(
                        Math.abs(remainingBalance)
                    )}
                    over budget.
                </p>

            </div>
        `;

    }

}


// ========================================
// 7. GET CATEGORY ICON
// ========================================

function getCategoryIcon(category) {

    const icons = {

        Food: "🍽️",

        Transport: "🚌",

        Rent: "🏠",

        Entertainment: "🎬",

        Savings: "💰",

        Utilities: "💡"

    };


    return icons[category] || "💳";

}


// ========================================
// 8. ESCAPE USER INPUT
// ========================================

function escapeHTML(value) {

    return value

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ========================================
// 9. RENDER EXPENSES
// ========================================

function renderExpenses() {

    // Clear the current expense list.
    expenseList.innerHTML = "";


    // If there are no expenses, show empty state.
    if (expenses.length === 0) {

        expenseList.innerHTML = `

            <div class="empty-state">

                <span aria-hidden="true">
                    📋
                </span>

                <h3>
                    No expenses yet
                </h3>

                <p>
                    Add your first expense
                    to see it appear here.
                </p>

            </div>

        `;

        return;

    }


    // Loop through the expense array.
    expenses.forEach(function (expense) {

        const expenseItem =
            document.createElement("div");


        expenseItem.className =
            "expense-item";


        expenseItem.innerHTML = `

            <div class="expense-info">

                <div
                    class="expense-icon"
                    aria-hidden="true"
                >
                    ${getCategoryIcon(
                        expense.category
                    )}
                </div>

                <div>

                    <div class="expense-name">
                        ${escapeHTML(
                            expense.name
                        )}
                    </div>

                    <div class="expense-category">
                        ${escapeHTML(
                            expense.category
                        )}
                    </div>

                </div>

            </div>


            <div class="expense-right">

                <span class="expense-amount">

                    ${formatCurrency(
                        expense.amount
                    )}

                </span>


                <button
                    type="button"
                    class="delete-button"
                    data-id="${expense.id}"
                    aria-label="Delete ${
                        escapeHTML(expense.name)
                    }"
                >
                    Delete
                </button>

            </div>

        `;


        expenseList.appendChild(expenseItem);

    });


    // Find all dynamically-created delete buttons.
    const deleteButtons =
        document.querySelectorAll(
            ".delete-button"
        );


    // Add click events to the buttons.
    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const expenseId =
                    Number(button.dataset.id);


                deleteExpense(expenseId);

            }
        );

    });

}


// ========================================
// 10. UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    // Calculate total using the array.
    const totalExpenses =
        calculateTotalExpenses();


    // Calculate remaining balance.
    const remainingBalance =
        calculateRemainingBalance(
            monthlyBudget,
            totalExpenses
        );


    // Update DOM elements.
    budgetDisplay.textContent =
        formatCurrency(monthlyBudget);


    totalExpensesDisplay.textContent =
        formatCurrency(totalExpenses);


    remainingDisplay.textContent =
        formatCurrency(remainingBalance);


    recordCountDisplay.textContent =
        expenses.length;


    // Update conditional budget status.
    updateBudgetStatus(
        remainingBalance,
        totalExpenses
    );


    // Update the expense list.
    renderExpenses();

}


// ========================================
// 11. ADD EXPENSE EVENT
// ========================================

expenseForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh.
        event.preventDefault();


        // Get user input.
        const name =
            expenseNameInput.value.trim();


        const amount =
            Number(
                expenseAmountInput.value
            );


        const category =
            expenseCategoryInput.value;


        // ====================================
        // VALIDATION
        // ====================================

        if (name === "") {

            showMessage(
                "Please enter an expense name.",
                "error"
            );

            return;

        }


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            showMessage(
                "Please enter a valid expense amount greater than zero.",
                "error"
            );

            return;

        }


        if (category === "") {

            showMessage(
                "Please select an expense category.",
                "error"
            );

            return;

        }


        // ====================================
        // CREATE EXPENSE OBJECT
        // ====================================

        const newExpense = {

            id: Date.now(),

            name: name,

            amount: amount,

            category: category

        };


        // ====================================
        // ADD TO ARRAY
        // ====================================

        expenses.push(newExpense);


        // ====================================
        // UPDATE PAGE
        // ====================================

        updateDashboard();


        showMessage(
            "Expense added successfully.",
            "success"
        );


        // Clear form.
        expenseForm.reset();

    }
);


// ========================================
// 12. DELETE EXPENSE
// ========================================

function deleteExpense(expenseId) {

    expenses = expenses.filter(
        function (expense) {

            return expense.id !== expenseId;

        }
    );


    updateDashboard();


    showMessage(
        "Expense removed successfully.",
        "success"
    );

}


// ========================================
// 13. CLEAR ALL EXPENSES
// ========================================

clearExpensesButton.addEventListener(
    "click",
    function () {


        // Conditional check.
        if (expenses.length === 0) {

            showMessage(
                "There are no expenses to clear.",
                "error"
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to remove all expense records?"
            );


        if (confirmed) {

            expenses = [];


            updateDashboard();


            showMessage(
                "All expenses have been cleared.",
                "success"
            );

        }

    }
);


// ========================================
// 14. DISPLAY USER MESSAGE
// ========================================

function showMessage(
    message,
    type
) {

    formMessage.textContent =
        message;


    formMessage.className =
        "form-message " + type;


    setTimeout(
        function () {

            formMessage.textContent = "";

            formMessage.className =
                "form-message";

        },
        3000
    );

}


// ========================================
// 15. INITIAL PAGE LOAD
// ========================================

updateDashboard();