/* =========================================================
   DADOS DAS CONVERSAS
========================================================= */

const conversationsData = {

    juliana: {

        name: "Juliana Santos",

        type: "Profissional",

        initials: "JS",

        avatar: "avatar-purple",

        online: true,

        messages: [

            {
                sender: "received",
                text: "Oi! Tudo bem?",
                time: "10:28"
            },

            {
                sender: "received",
                text: "Estou com uma dúvida sobre o curso de Trancista. Você poderia me ajudar?",
                time: "10:29"
            },

            {
                sender: "sent",
                text: "Olá, Juliana! Tudo bem sim 💜 Claro! Qual sua dúvida?",
                time: "10:29"
            },

            {
                sender: "received",
                text: "Sobre a finalização das tranças nagô, qual o melhor jeito de não deixar frizz?",
                time: "10:30"
            },

            {
                sender: "sent",
                text: "A melhor forma é umedecer levemente o cabelo antes, usar um bom creme para pentear e finalizar com mousse. Isso ajuda bastante!",
                time: "10:30"
            },

            {
                sender: "received",
                text: "Perfeito! Muito obrigada, vou testar! 💜",
                time: "10:31"
            }

        ]
    },


    beatriz: {

        name: "Beatriz Lima",

        type: "Profissional",

        initials: "BL",

        avatar: "avatar-pink",

        online: true,

        messages: [

            {
                sender: "received",
                text: "Oi! Você conseguiu finalizar aquele trabalho?",
                time: "09:12"
            },

            {
                sender: "sent",
                text: "Consegui sim! Estou terminando os últimos detalhes.",
                time: "09:14"
            },

            {
                sender: "received",
                text: "Obrigada pelas dicas! 💜",
                time: "09:15"
            }

        ]
    },


    carla: {

        name: "Carla Souza",

        type: "Profissional",

        initials: "CS",

        avatar: "avatar-orange",

        online: false,

        messages: [

            {
                sender: "received",
                text: "Oi! Vamos marcar nossa conversa?",
                time: "Ontem"
            },

            {
                sender: "sent",
                text: "Vamos sim! Posso amanhã às 15h.",
                time: "Ontem"
            }

        ]
    },


    grupo: {

        name: "Profissionais da Beleza",

        type: "Grupo",

        initials: "",

        avatar: "avatar-group",

        online: true,

        group: true,

        messages: [

            {
                sender: "received",
                text: "Ana: Boa tarde, meninas!",
                time: "Ontem"
            },

            {
                sender: "received",
                text: "Juliana: Alguém já fez o curso novo?",
                time: "Ontem"
            },

            {
                sender: "sent",
                text: "Eu comecei ontem! Estou gostando bastante.",
                time: "Ontem"
            }

        ]
    },


    fernanda: {

        name: "Fernanda Silva",

        type: "Profissional",

        initials: "FS",

        avatar: "avatar-blue",

        online: false,

        messages: [

            {
                sender: "received",
                text: "Consegui terminar o curso!",
                time: "Seg"
            },

            {
                sender: "sent",
                text: "Que ótimo! Parabéns! 🎉",
                time: "Seg"
            },

            {
                sender: "received",
                text: "Perfeito, obrigada!",
                time: "Seg"
            }

        ]
    }

};


/* =========================================================
   ELEMENTOS
========================================================= */

const conversationItems =
    document.querySelectorAll(".conversation-item");

const messagesArea =
    document.getElementById("messagesArea");

const chatName =
    document.getElementById("chatName");

const chatStatus =
    document.getElementById("chatStatus");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const conversationSearch =
    document.getElementById("conversationSearch");

const globalSearch =
    document.getElementById("globalSearch");

const emptyConversations =
    document.getElementById("emptyConversations");

const typing =
    document.getElementById("typing");

const chatArea =
    document.getElementById("chatArea");


let currentConversation = "juliana";


/* =========================================================
   CARREGAR CONVERSA
========================================================= */

function loadConversation(id) {

    const conversation =
        conversationsData[id];

    if (!conversation) {
        return;
    }

    currentConversation = id;


    /* Nome */

    chatName.textContent =
        conversation.name;


    /* Status */

    if (conversation.online) {

        chatStatus.innerHTML = `
            <span class="status-dot"></span>
            Online
        `;

    } else {

        chatStatus.textContent =
            "Offline";

    }


    /* Limpa mensagens */

    messagesArea.innerHTML = `

        <div class="date-divider">
            <span>Hoje</span>
        </div>

    `;


    /* Cria mensagens */

    conversation.messages.forEach(message => {

        addMessageToScreen(
            message.sender,
            message.text,
            message.time,
            conversation
        );

    });


    scrollToBottom();


    /* Marca conversa como ativa */

    conversationItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.id === id) {

            item.classList.add("active");

            const unread =
                item.querySelector(".unread");

            if (unread) {

                unread.remove();

            }

            item.dataset.unread = "false";
        }

    });


    /* Foca no campo */

    messageInput.focus();
}


/* =========================================================
   CRIAR MENSAGEM NA TELA
========================================================= */

function addMessageToScreen(
    sender,
    text,
    time,
    conversation
) {

    const message =
        document.createElement("div");

    message.className =
        `message ${sender}`;


    if (sender === "received") {

        message.innerHTML = `

            <div class="message-avatar avatar ${conversation.avatar}">
                ${conversation.group
                    ? '<i class="bi bi-people-fill"></i>'
                    : conversation.initials
                }
            </div>

            <div>

                <div class="message-bubble">
                    ${escapeHTML(text)}
                </div>

                <span class="message-time">
                    ${time}
                </span>

            </div>

        `;

    } else {

        message.innerHTML = `

            <div>

                <div class="message-bubble">
                    ${escapeHTML(text)}
                </div>

                <span class="message-time">

                    ${time}

                    <i class="bi bi-check2-all"></i>

                </span>

            </div>

        `;
    }


    messagesArea.appendChild(message);
}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================================
   HORÁRIO
========================================================= */

function getCurrentTime() {

    const now =
        new Date();

    return now.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   ENVIAR MENSAGEM
========================================================= */

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    const conversation =
        conversationsData[currentConversation];


    const time =
        getCurrentTime();


    /* Salva nos dados */

    conversation.messages.push({

        sender: "sent",

        text: text,

        time: time

    });


    /* Mostra na tela */

    addMessageToScreen(
        "sent",
        text,
        time,
        conversation
    );


    /* Limpa campo */

    messageInput.value = "";


    scrollToBottom();


    /* Simula resposta */

    simulateReply();
}


/* =========================================================
   SIMULAR RESPOSTA
========================================================= */

function simulateReply() {

    if (currentConversation === "grupo") {
        return;
    }


    typing.style.display =
        "flex";


    scrollToBottom();


    setTimeout(() => {

        typing.style.display =
            "none";


        const conversation =
            conversationsData[currentConversation];


        let reply =
            "Entendi! Obrigada por me avisar 💜";


        if (
            currentConversation === "juliana"
        ) {

            reply =
                "Claro! Se precisar de mais alguma coisa, pode me chamar 😊";

        }


        if (
            currentConversation === "beatriz"
        ) {

            reply =
                "Que bom! Depois me conta como ficou 💜";

        }


        if (
            currentConversation === "carla"
        ) {

            reply =
                "Combinado! Até amanhã 😊";

        }


        if (
            currentConversation === "fernanda"
        ) {

            reply =
                "Obrigada! Estou muito feliz com o resultado! 💜";

        }


        const time =
            getCurrentTime();


        conversation.messages.push({

            sender: "received",

            text: reply,

            time: time

        });


        addMessageToScreen(
            "received",
            reply,
            time,
            conversation
        );


        scrollToBottom();


    }, 1800);
}


/* =========================================================
   ROLAGEM
========================================================= */

function scrollToBottom() {

    setTimeout(() => {

        messagesArea.scrollTop =
            messagesArea.scrollHeight;

    }, 50);
}


/* =========================================================
   CLIQUE NAS CONVERSAS
========================================================= */

conversationItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const id =
                item.dataset.id;

            loadConversation(id);

        }
    );

});


/* =========================================================
   BOTÃO ENVIAR
========================================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================================
   ENTER ENVIA
========================================================= */

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   FILTROS
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const filter =
                button.dataset.filter;


            let visible = 0;


            conversationItems.forEach(item => {

                const category =
                    item.dataset.category;

                const unread =
                    item.dataset.unread === "true";


                let show = true;


                if (
                    filter === "nao-lidas"
                ) {

                    show = unread;

                }


                if (
                    filter === "profissionais"
                ) {

                    show =
                        category ===
                        "profissionais";

                }


                if (
                    filter === "grupos"
                ) {

                    show =
                        category ===
                        "grupos";

                }


                item.style.display =
                    show ? "flex" : "none";


                if (show) {
                    visible++;
                }

            });


            emptyConversations.style.display =
                visible === 0
                    ? "block"
                    : "none";

        }
    );

});


/* =========================================================
   BUSCA
========================================================= */

function searchConversations(value) {

    const search =
        value.toLowerCase().trim();


    let visible = 0;


    conversationItems.forEach(item => {

        const name =
            item
                .querySelector("strong")
                .textContent
                .toLowerCase();


        const preview =
            item
                .querySelector("p")
                .textContent
                .toLowerCase();


        const matches =
            name.includes(search) ||
            preview.includes(search);


        item.style.display =
            matches ? "flex" : "none";


        if (matches) {
            visible++;
        }

    });


    emptyConversations.style.display =
        visible === 0
            ? "block"
            : "none";
}


conversationSearch.addEventListener(
    "input",
    event => {

        searchConversations(
            event.target.value
        );

    }
);


globalSearch.addEventListener(
    "input",
    event => {

        searchConversations(
            event.target.value
        );

    }
);


/* =========================================================
   EMOJI
========================================================= */

const emojiButton =
    document.getElementById("emojiButton");


emojiButton.addEventListener(
    "click",
    () => {

        messageInput.value += " 💜";

        messageInput.focus();

    }
);


/* =========================================================
   ANEXO
========================================================= */

document
    .getElementById("attachButton")
    .addEventListener(
        "click",
        () => {

            alert(
                "A função de anexar arquivos será integrada ao sistema posteriormente."
            );

        }
    );


/* =========================================================
   CÂMERA
========================================================= */

document
    .getElementById("cameraButton")
    .addEventListener(
        "click",
        () => {

            alert(
                "A função de envio de fotos será integrada ao sistema posteriormente."
            );

        }
    );


/* =========================================================
   LIGAÇÃO
========================================================= */

document
    .getElementById("callButton")
    .addEventListener(
        "click",
        () => {

            alert(
                `Iniciando chamada com ${conversationsData[currentConversation].name}...`
            );

        }
    );


/* =========================================================
   VIDEO
========================================================= */

document
    .getElementById("videoButton")
    .addEventListener(
        "click",
        () => {

            alert(
                `Iniciando videochamada com ${conversationsData[currentConversation].name}...`
            );

        }
    );


/* =========================================================
   INFORMAÇÕES
========================================================= */

document
    .getElementById("infoButton")
    .addEventListener(
        "click",
        () => {

            const conversation =
                conversationsData[currentConversation];


            alert(
                `Contato: ${conversation.name}\nTipo: ${conversation.type}`
            );

        }
    );


/* =========================================================
   NOVA CONVERSA
========================================================= */

const newConversation =
    document.getElementById("newConversation");


const newConversationModal =
    new bootstrap.Modal(
        document.getElementById(
            "newConversationModal"
        )
    );


newConversation.addEventListener(
    "click",
    () => {

        newConversationModal.show();

    }
);


/* =========================================================
   CONTATOS DO MODAL
========================================================= */

document
    .querySelectorAll(".new-contact")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button
                        .querySelector("strong")
                        .textContent;


                const id =
                    Object.keys(
                        conversationsData
                    ).find(key =>
                        conversationsData[key].name === name
                    );


                if (id) {

                    newConversationModal.hide();

                    loadConversation(id);

                }

            }
        );

    });



/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("active");

}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("active");

}


menuToggle.addEventListener(
    "click",
    openSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);



document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadConversation("juliana");

    }
);