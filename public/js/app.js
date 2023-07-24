const cards = document.getElementById("cards");
const submit = document.querySelector("[type=submit]")


cards.addEventListener('click', async e => {
    if (e.target.className.includes("delete")) {
        let itemID = e.target.parentElement.id;
        let itemDataID = e.target.parentElement.getAttribute("data-id");

        try {
            const params = {
                itemID: itemID,
                itemDataID: itemDataID,
            }

            const options = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params)
            };

            const response = await fetch("/delete", options);

            if (response.ok) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err)
        }
    }
});


submit.addEventListener('click', async e => {
    e.preventDefault();

    let name = document.querySelector("input[name=name]").value;
    let todo = document.querySelector("input[name=todo]").value;

    const params = {
        name: name,
        todo: todo,
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params)
    };

    try {
        const response = await fetch("/submit", options)

        if (response.ok) {
            name = '';
            todo = '';
            window.location.reload();
        }
    } catch (err) {
        console.log(err)
    }
});