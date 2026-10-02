const secretKey = "SimplePost";

let user = {};

// eto yung mga information sa signup
function setUser() {
    const name = document.getElementById("name").value.trim();
    const birthday = document.getElementById("birthday").value;
    const yearLevel = document.getElementById("yearLevel").value;
    const gender = document.getElementById("gender").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // i-checheck nya kung complete na pag hindi, mag a-alert sha
    if (
        name === "" ||
        birthday === "" ||
        yearLevel === "" ||
        gender === "" ||
        username === "" ||
        password === "" 
    ) {
        alert("Please complete all fields.");
        return;
    }

    // Store the user's information
    user = {
        name: name,
        birthday: birthday,
        yearLevel: yearLevel,
        gender: gender,
        username: username,
        password: password
    };

    // Hide the user information section
    document.getElementById("userSection").style.display = "none";

    // Show the posting section
    document.getElementById("postSection").style.display = "block";
}

// Create a new post
function createPost() {
    const post = document.getElementById("post").value.trim();

    // Check if the caption is empty
    if (post === "") {
        alert("Please write a caption.");
        return;
    }

    // Get the current date and time
    const date = new Date().toLocaleString();

    // Combine username, post, and date
    const data = {
        username: user.username,
        post: post,
        date: date
    };

    // Convert the data into a string
    const plainText = JSON.stringify(data);

    // Encrypt the string using AES
    const encrypted = CryptoJS.AES.encrypt(
        plainText,
        secretKey
    ).toString();

    // Create a new post container
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    // Display the original post and encrypted value
    postDiv.innerHTML = `
        <div class="original">ORIGINAL POST</div>

        <p><strong>@${user.username}</strong></p>
        <p>${post}</p>
        <p>${date}</p>

        <strong>ENCRYPTED:</strong>
        <div class="encrypted">${encrypted}</div>
    `;

    // Add the post to the thread
    document.getElementById("thread").prepend(postDiv);

    // Clear the text area
    document.getElementById("post").value = "";
}