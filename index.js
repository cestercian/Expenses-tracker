import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://expense-tracker-d3144-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl1 = document.getElementById("input-el1")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        const [amount, type] = leads[i].split(" ");
        listItems += `
            <li style="display: flex; justify-content: space-around; font-size: 25px">
                <span style="flex: 1; color: antiquewhite">
                       ${amount}
                </span>
                <span style="flex: 1; text-align: right; color: antiquewhite;">${type}</span>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("click", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

// Concatenating inputEl and inputEl1 values with a space in between
inputBtn.addEventListener("click", function() {
    if (inputEl.value && inputEl1.value) {
        const combinedValue = `${inputEl1.value} ${inputEl.value}`;
        push(referenceInDB, combinedValue);
        inputEl.value = "";
        inputEl1.value = "";
    }
})
