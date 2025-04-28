let memory = {
    currentState: {},
    goals: {},
    paths: [],
    timestamp: new Date().toISOString()
};

let conversationState = 0;

const prompts = [
    "Hi, I'm Lorem, the Default Face of Betterward as Collaboration. Where are you now in your life, in your own words?",
    "Understood. Now, where would you like to go — what change would you most like to see?",
    "Thank you. Describe any paths or steps you believe might get you from here to there.",
    "Logged. Would you like to save this as a memory?"
];

function appendMessage(text, sender) {
    const chatbox = document.getElementById("chatbox");
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.innerText = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function processInput() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text === "") return;

    appendMessage(text, "user");
    input.value = "";

    switch (conversationState) {
        case 0:
            memory.currentState = text;
            setTimeout(() => appendMessage(prompts[1], "system"), 500);
            conversationState++;
            break;
        case 1:
            memory.goals = text;
            setTimeout(() => appendMessage(prompts[2], "system"), 500);
            conversationState++;
            break;
        case 2:
            memory.paths.push(text);
            setTimeout(() => appendMessage(prompts[3], "system"), 500);
            conversationState++;
            break;
        case 3:
            if (text.toLowerCase().includes("yes")) {
                saveMemory();
                appendMessage("Memory saved. You may continue your journey at any time.", "system");
            } else {
                appendMessage("Understood. Nothing was saved. You may continue your journey at any time.", "system");
            }
            conversationState = 0;
            setTimeout(() => appendMessage(prompts[0], "system"), 500);
            break;
    }
}

function saveMemory() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memory, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `BaC_UserData/memory_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Initialize Lorem
window.onload = () => {
    setTimeout(() => appendMessage(prompts[0], "system"), 1000);
};
