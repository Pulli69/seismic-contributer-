const HTML2CANVAS_OPTIONS = {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: null
};


// CLICK SOUND
const clickSound = new Audio("./assets/sounds/click.mp3");
clickSound.volume = 0.4;

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}


const steps = document.querySelectorAll(".step");
let step = 0;

const state = {
  discord: "",
  pfp: "",
  time: "",
  content: 1,
  art: 1,
  messages: 1000,
  role: ""
};

const ROLE_MAP = {
  "MAG 1":"mag1","MAG 2":"mag2","MAG 3":"mag3","MAG 4":"mag4",
  "MAG 5":"mag5","MAG 6":"mag6","MAG 7":"mag7","MAG 8":"mag8","MAG 9":"mag9",
  "LEADER":"leader","MOD":"mod"
};
const ROLE_GLOW = {
  "MAG 1": "#ffffff",   // normal
  "MAG 2": "#f5e6c8",   // light cream
  "MAG 3": "#3cff6a",   // green
  "MAG 4": "#6bff8f",   // light green
  "MAG 5": "#0b8f3a",   // dark green
  "MAG 6": "#ffd84d",   // yellow
  "MAG 7": "#ff9f1c",   // orange
  "MAG 8": "#ff3b3b",   // red
  "MAG 9": "#4da6ff",   // blue
  "MOD":  "#a855f7",    // purple
  "LEADER": "#8b5a2b"   // brown
};
const ROLE_STROKE = {
  "MAG 1": "#ffffff",   // white
  "MAG 2": "#f5e6c8",   // cream
  "MAG 3": "#3cff6a",   // green
  "MAG 4": "#6bff8f",   // light green
  "MAG 5": "#0b8f3a",   // dark green
  "MAG 6": "#ffd84d",   // yellow
  "MAG 7": "#ff9f1c",   // orange
  "MAG 8": "#ff3b3b",   // red
  "MAG 9": "#4da6ff",   // blue
  "MOD": "#a855f7",     // purple
  "LEADER": "#8b5a2b"   // brown
};

function showStep(n) {
  steps.forEach(s => s.classList.remove("active"));
  steps[n].classList.add("active");
  step = n;
}

/* NEXT BUTTONS */
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.onclick = () => {
    playClick();
    showStep(step + 1);
  };
});


/* IDENTITY */
discordInput.oninput = e => state.discord = e.target.value;

/* PROFILE IMAGE */
pfpInput.onchange = e => {
  const r = new FileReader();
  r.onload = () => {
    state.pfp = r.result;
    pfpPreview.style.backgroundImage = `url(${r.result})`;
  };
  r.readAsDataURL(e.target.files[0]);
};

/* TIME */
document.querySelectorAll("[data-time]").forEach(o => {
  o.onclick = () => {
playClick();

    o.parentElement.querySelectorAll("div").forEach(d => d.classList.remove("active"));
    o.classList.add("active");
    state.time = o.dataset.time;
  };
});

/* SLIDERS */
contentRange.oninput = e => {
  contentVal.innerText = e.target.value;
  state.content = e.target.value;
};

artRange.oninput = e => {
  artVal.innerText = e.target.value;
  state.art = e.target.value;
};

msgRange.oninput = e => {
  msgVal.innerText = e.target.value;
  state.messages = e.target.value;
};

/* ROLES */
Object.keys(ROLE_MAP).forEach(r => {
  const d = document.createElement("div");
  d.innerText = r;

  d.onclick = () => {
    playClick();
    roleGrid.querySelectorAll("div").forEach(x => x.classList.remove("active"));
    d.classList.add("active");
    state.role = r;
  };

  roleGrid.appendChild(d);
});



/* GENERATE CARD */
generateBtn.onclick = () => {
  const k = ROLE_MAP[state.role];
  const glow = ROLE_GLOW[state.role];

  // APPLY GLOW COLOR (SINGLE SOURCE)
  cardPfp.style.setProperty("--glow", glow);
  cardRole.style.setProperty("--glow", glow);

  // ROLE BADGE IMAGE
  cardRole.src = `./assets/images/magnitudes/${k}.png`;

  // CARD BACKGROUND
  card.style.backgroundImage =
    `url(./assets/images/backgrounds/${k}.jpg)`;

  // PROFILE IMAGE
  cardPfp.style.backgroundImage = `url(${state.pfp})`;

  // TEXT
  cardUser.innerText = state.discord.toUpperCase();
  cTime.innerText = state.time;
  cContent.innerText = state.content;
  cMessages.innerText = state.messages;
  cArt.innerText = state.art;

  showStep(steps.length - 1);
};
downloadBtn.onclick = async () => {
  playClick();

  const canvas = await html2canvas(card, HTML2CANVAS_OPTIONS);

  const link = document.createElement("a");
  link.download = "seismic-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};






