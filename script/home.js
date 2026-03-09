const displaySection = document.getElementById("all-issues-id");
const loadSection = document.getElementById("load-id");
const allCount = document.getElementById("all-count-id");

const allButtons = document.getElementById('all-btn-id');
const openButtons = document.getElementById('open-btn-id');
const closeButtons = document.getElementById('close-btn-id');


const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="p-2 rounded bg-yellow-200 text-sm">${el}</span>`,
  );
  return htmlElements.join(" ");
};


function toggleStyle(id){
    allButtons.classList.remove('btn', 'btn-primary');
    openButtons.classList.remove('btn', 'btn-primary');
    closeButtons.classList.remove('btn', 'btn-primary');

    allButtons.classList.add('btn-secondary');
    openButtons.classList.add('btn-secondary');
    closeButtons.classList.add('btn-secondary');

    const selected = document.getElementById(id);
    selected.classList.remove('btn-secondary');
    selected.classList.add('btn', 'btn-primary');
    currentPosition = id;


}

// Load spinner
const loadSpinner = (status) => {
  if (status) {
    loadSection.classList.remove("hidden");
    displaySection.classList.add("hidden");
  } else {
    loadSection.classList.add("hidden");
    displaySection.classList.remove("hidden");
  }
};

// Fetching all issues
const fetchAllIssues = async () => {
  loadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
  );
  const data = await res.json();
  displayAllIssues(data.data);
  loadSpinner(false);
};

fetchAllIssues();

const displayAllIssues = (data) => {
  displaySection.innerHTML = "";

  data.forEach((ele) => {
    const isOpen = ele.status === "open";
    const borderColor = isOpen
      ? "border-t-[#00a96eFF]"
      : "border-t-[#a855f7FF]";
    const statusImg = isOpen
      ? "./assets/Open-Status.png"
      : "./assets/Closed- Status .png";
    const div = document.createElement("div");

    const priorityStyles = {
      high: {
        text: "text-[#ef4444FF]",
        bg: "bg-[#feececFF]",
      },
      medium: {
        text: "text-[#f59e0bFF]",
        bg: "bg-[#fff6d1FF]",
      },
      low: {
        text: "text-[#9ca3afFF]",
        bg: "bg-[#eeeff2FF]",
      },
    };
    const style = priorityStyles[ele.priority];
    div.className = `border-t-[3px]  border border-gray-300 rounded p-4 space-y-3 shadow ${borderColor}`;

    div.innerHTML = `
          <div class="flex justify-between items-center">
                <img src="${statusImg}" alt="" srcset=""/>
            <div
              class="pt-[6px] ${style.bg} ${style.text}  pb-[6px] pl-6 pr-6 rounded-3xl  max-w-auto text-center "
            >
              ${ele.priority}
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-semibold">
              ${ele.title}
            </p>
            <p class="text-[#64748bFF] text-xs line-clamp-2">
              ${ele.description}
            </p>
          </div>
            
            <div class="">${createElements(ele.labels)}</div>

          <div class="p-4 space-y-2 border border-[#e4e4e7FF] rounded">
            <p class="text-sm">#${ele.id} by ${ele.author}</p>
            <p class="text-sm">${ele.createdAt.slice(0, 10)}</p>
          </div>
        `;
    displaySection.append(div);
    div.addEventListener("click", () => {
      fetchWordInfo(ele.id);
    });
  });
};

document.getElementById("open-btn-id").addEventListener("click", async () => {
  loadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
  );
  const data = await res.json();
  loadSpinner(false);
  displayOpenIssues(data.data);

  calculateCount(44)
});

const displayOpenIssues = (data) => {
  displaySection.innerHTML = "";

  data.forEach((ele) =>{
    const priorityStyles = {
      high: {
        text: "text-[#ef4444FF]",
        bg: "bg-[#feececFF]",
      },
      medium: {
        text: "text-[#f59e0bFF]",
        bg: "bg-[#fff6d1FF]",
      },
      low: {
        text: "text-[#9ca3afFF]",
        bg: "bg-[#eeeff2FF]",
      },
    };
    const style = priorityStyles[ele.priority];

    if (ele.status == "open") {
      const div = document.createElement("div");
      div.className = `border-t-[3px]  border border-gray-300 rounded p-4 space-y-3 shadow border-t-[#00a96eFF]`;
      div.innerHTML = `
          <div class="flex justify-between items-center">
                <img src="./assets/Open-Status.png" alt="" srcset=""/>
            <div
              class="pt-[6px] ${style.bg} ${style.text}  pb-[6px] pl-6 pr-6 rounded-3xl  max-w-auto text-center "
            >
              ${ele.priority}
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-semibold">
              ${ele.title}
            </p>
            <p class="text-[#64748bFF] text-xs line-clamp-2">
              ${ele.description}
            </p>
          </div>
            
            <div class="">${createElements(ele.labels)}</div>

          <div class="p-4 space-y-2 border border-[#e4e4e7FF] rounded">
            <p class="text-sm">#${ele.id} by ${ele.author}</p>
            <p class="text-sm">${ele.createdAt.slice(0, 10)}</p>
          </div>
        `;
      displaySection.append(div);
      div.addEventListener("click", () => {
      fetchWordInfo(ele.id);
    });
    }
  });
};

// display close issues

document.getElementById("close-btn-id").addEventListener("click", async () => {
  loadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
  );
  const data = await res.json();
  console.log(data.data);
  loadSpinner(false);
  displayCloseIssues(data.data);
  calculateCount(6)
});

const displayCloseIssues = (data) => {
  displaySection.innerHTML = "";

  data.forEach((ele) => {
    const priorityStyles = {
      high: {
        text: "text-[#ef4444FF]",
        bg: "bg-[#feececFF]",
      },
      medium: {
        text: "text-[#f59e0bFF]",
        bg: "bg-[#fff6d1FF]",
      },
      low: {
        text: "text-[#9ca3afFF]",
        bg: "bg-[#eeeff2FF]",
      },
    };
    const style = priorityStyles[ele.priority];

    if (ele.status == "closed") {
      const div = document.createElement("div");
      div.className = `border-t-[3px]  border border-gray-300 rounded p-4 space-y-3 shadow border-t-[#a855f7FF]`;
      div.innerHTML = `
          <div class="flex justify-between items-center">
                <img src="./assets/Closed- Status .png" alt="" srcset=""/>
            <div
              class="pt-[6px] ${style.bg} ${style.text}  pb-[6px] pl-6 pr-6 rounded-3xl  max-w-auto text-center "
            >
              ${ele.priority}
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-semibold">
              ${ele.title}
            </p>
            <p class="text-[#64748bFF] text-xs line-clamp-2">
              ${ele.description}
            </p>
          </div>
            
            <div class="">${createElements(ele.labels)}</div>

          <div class="p-4 space-y-2 border border-[#e4e4e7FF] rounded">
            <p class="text-sm">#${ele.id} by ${ele.author}</p>
            <p class="text-sm">${ele.createdAt.slice(0, 10)}</p>
          </div>
        `;
      displaySection.append(div);
      div.addEventListener("click", () => {
      fetchWordInfo(ele.id);
    });
    }
  });
};

// all

document.getElementById("all-btn-id").addEventListener("click", async () => {
  loadSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
  );
  const data = await res.json();
  console.log(data.data);
  loadSpinner(false);
  displayAllIssues(data.data);
});

// modal
// fetching single word to show in modal
const fetchWordInfo = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordInfo(data.data);
};
const displayWordInfo = (data) => {
  const isOpen = data.status === "open";
  const bgColor = isOpen ? "bg-[#00a96eFF]" : "bg-[#a855f7FF]";
  const priorityStyles = {
    high: {
      text: "text-[#ef4444FF]",
      bg: "bg-[#feececFF]",
    },
    medium: {
      text: "text-[#f59e0bFF]",
      bg: "bg-[#fff6d1FF]",
    },
    low: {
      text: "text-[#9ca3afFF]",
      bg: "bg-[#eeeff2FF]",
    },
  };
  const style = priorityStyles[data.priority];
  const modalInfo = document.getElementById("modal-info");
  modalInfo.innerHTML = `
  <div class="max-w-[700px] rounded-md p-8 space-y-6">
      <div>
        <h2 class="text-xl font-bold">${data.title} </h2>
      <div class="flex items-center">
        <button class=" btn-primary ${bgColor} max-w-16 rounded-[100px] text-[10px] p-2 max-h-6 mr-2">${data.status}</button>
      <p class="w-1 h-1 bg-slate-500 mr-2 rounded-full"></p>
      <span class="text-[#64748bFF] text-[12px] mr-2">Opened by ${data.author} </span>    
      <p class="w-1 h-1 bg-slate-500 mr-2 rounded-full"></p>
      <span class="text-[#64748bFF] text-[12px]"> ${data.createdAt.slice(0, 10)}</span>
      </div>
      </div>
      <p class="text-[#64748bFF]">${data.description}</p>
      <div class="flex items-center justify-between">
        <div>
        <p class="text-[#64748bFF]">Assignee:</p>
        <p>${data.author} </p>
      </div>
      <div>
        <p class="text-[#64748bFF]">Priority:</p>
        <button class=" btn-primary ${style.bg} ${style.text} max-w-20 rounded-3xl text-[10px] p-2 max-h-8">${data.priority} </button>
      </div>
      </div>
    </div>
  `;
  wordModal.showModal();
};

// all count
function  calculateCount(nmb){
  allCount.innerText = `${nmb}`;
}