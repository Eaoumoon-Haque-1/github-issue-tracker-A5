const displaySection = document.getElementById("all-issues-id");
const loadSection = document.getElementById("load-id");

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


// displaying all issues

// assignee
// :
// "jane_smith"
// author
// :
// "john_doe"
// createdAt
// :
// "2024-01-15T10:30:00Z"
// description
// :
// "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior."
// id
// :
// 1
// labels
// :
// (2) ['bug', 'help wanted']
// priority
// :
// "high"
// status
// :
// "open"
// title
// :
// "Fix navigation menu on mobile devices"
// updatedAt
// :
// "2024-01-15T10:30:00Z"
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
          <div class="flex mb-4 gap-1">
            <div
              class="flex gap-1 flex-1 p-2 rounded-2xl bg-[#feececFF] border max-w-14 border-[#fecacaFF]"
            >
              <img class="w-3" src="./assets/bugdroid.png" alt="" srcset="" />
              <p class="text-xs text-[#ef4444FF] text-center">BUG</p>
            </div>
            <div
              class="flex gap-1 flex-1 p-2 text-xs rounded-2xl text-[#d97706FF] bg-[#fff8dbFF] max-w-28 text-center border border-[#fde68aFF]"
            >
              <img class="w-2" src="./assets/lifebuoy.png" alt="" srcset="" />
              <p class="text-xs text-[#d97706FF] text-center">HELP WANTED</p>
            </div>
          </div>
          <div class="p-4 space-y-2 border border-[#e4e4e7FF] rounded">
            <p class="text-sm">#${ele.id} by ${ele.author}</p>
            <p class="text-sm">${ele.createdAt.slice(0, 10)}</p>
          </div>
        `;
    displaySection.append(div);
  });
};
