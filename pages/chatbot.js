const form = document.getElementById("messageArea");

function fecha() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + ":" + minutes;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const str_time = fecha();

  const userQuestion = document.getElementById("text");
  const messageFormeight = document.getElementById("messageFormeight");

  const userHTML = document.createElement("div");
  userHTML.innerHTML = `<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">${userQuestion.value}<span class="msg_time_send">${str_time}</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>`;

  console.log(userQuestion.value);

  messageFormeight.appendChild(userHTML);

  let question = userQuestion.value;

  angelBot(question, str_time);

  userQuestion.value = "";
});

function angelBot(question, str_time) {
  let buttons = [];

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      versionID: "production",
      "content-type": "application/json",
      Authorization: "VF.DM.67c191ad3db8b98f63e606b9.VJL92Y2b449QYMyD",
    },
    body: JSON.stringify({
      action: { type: "text", payload: question },
      config: {
        tts: false,
        stripSSML: true,
        stopAll: false,
        excludeTypes: ["block", "debug", "flow"],
      },
    }),
  };

  fetch(
    "https://general-runtime.voiceflow.com/state/user/TEST_USER/interact?logs=off",
    options
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let vfRes = "";
      let buttonsChoices = "";
      res.forEach((values) => {
        if (values.type === "text") {
          vfRes = values.payload.message;
        }
        if (values.type === "choice") {
          values.payload.buttons.forEach((button) => {
            console.log("entra");
            console.log(button.request);
            buttonsChoices += `<button type="button" class="btn btn-primary" onclick="angelBot('${
              button.name
            }', '${fecha()}')">${button.name}</button>`;
          });
        }
      });
      console.log(vfRes);
      if (Array.isArray(res) && res.length > 0) {
        const botHTML = document.createElement("div");
        botHTML.innerHTML = `<div class="d-flex justify-content-start mb-4">
      <img src="../img/logo_cabeza_pipa_trans.png" class="rounded-circle user_img_msg">	
      <div class="msg_cotainer">${vfRes}<span class="msg_time">${str_time}</span><div>${buttonsChoices}</div></div>
      </div>`;
        messageFormeight.appendChild(botHTML);
      }
    })
    .catch((err) => console.error(err));
}
