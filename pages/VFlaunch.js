const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    versionID: "production",
    "content-type": "application/json",
    Authorization: "VF.DM.67c191ad3db8b98f63e606b9.VJL92Y2b449QYMyD",
  },
  body: JSON.stringify({
    action: { type: "launch" },
    config: {
      tts: false,
      stripSSML: true,
      stopAll: false,
      excludeTypes: ["block", "debug", "flow"],
    },
  }),
};

const messageFormeight = document.getElementById("messageFormeight");

fetch(
  "https://general-runtime.voiceflow.com/state/user/TEST_USER/interact?logs=off",
  options
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    let vfRes = res[0].payload.message;
    console.log(vfRes);

    const botHTML = document.createElement("div");
    botHTML.innerHTML = `<div class="d-flex justify-content-start mb-4">
      <img src="../img/logo_cabeza_pipa_trans.png" class="rounded-circle user_img_msg">	
      <div class="msg_cotainer">${vfRes}<span class="msg_time">${fecha()}</span></div>
      </div>`;
    messageFormeight.appendChild(botHTML);
  })
  .catch((err) => console.error(err));

function fecha() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + ":" + minutes;
}
