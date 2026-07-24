let allIssues = [];


const loadAllIssue = () => { 
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayAllIssue(allIssues);

    })
}
const getPriorityBadge = (priority) => {
  if (priority === 'low') return 'bg-pink-100 text-pink-500'
  if (priority === 'medium') return 'bg-blue-100 text-blue-500';
  if (priority === 'high') return 'bg-red-100 text-red-500';
  return 'bg-pink-100 text-pink-500'
  
}
const labelColour = (label) => {
  if (label === 'bug') return 'bg-red-100 text-red-500';
  if (label === 'help wanted') return 'bg-pink-100 text-pink-500';
  if (label === 'enhancement') return 'bg-green-100 text-green-500';
  if (label === 'good first issue') return 'bg-purple-100 text-purple-500';
  return 'bg-red-100 text-red-500';
}
const displayAllIssue = (issues) => {
  manageSpinner(false);
  const issuesContainer = document.getElementById('issues-container');
  issuesContainer.innerHTML = "";
  issues.forEach((data) => {
    const issueDiv = document.createElement('div');
    issueDiv.innerHTML = `
     <div class="px-5 rounded-lg border-t-4 ${data.status === 'open'? 'border-green-300':'border-purple-300'}"> 
        <div class="flex justify-between mb-5 pt-5">
          <img src="${data.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png'}" alt="" class="w-10 h-10 shrink-0">
          <h1 class="py-2 px-4 rounded-full ${getPriorityBadge(data.priority)}">${data.priority}</h1>
        </div>
        <h1 class="font-bold text-2xl">${data.title}</h1>
        <p>${data.description}</p>
        <div class="flex gap-1 sm:gap-2  mt-5">${data.labels.map((label) => `<p class="${labelColour(label)} rounded-lg p-1">${label} </p>`).join("")}
        </div>
        <div class="mt-10  pt-3 border-t border-gray-200">
          <p>${data.id}
            by john_doe</p>
          <p>${data.createdAt}</p>
        </div>
      </div
    `;
     issueDiv.addEventListener('click', () => {
      displayModal(data);
    });

    
    issuesContainer.appendChild(issueDiv);
   
  })
  const displayModal = (issue) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = "";
    const modalHtml = document.createElement('div');
    modalHtml.innerHTML=`<h1 class="font-bold text-2xl pl-5 mb-3">${issue.title}</h1>
        <div class="flex pl-5 ">
          <h5 class=" rounded-full p-2 ${issue.status ==='open' ? 'bg-green-400' :'bg-purple-400'}">${issue.status}</h5>
          <ul class="flex items-center gap-3 pl-5">
            <li>. ${issue.author}</li>
            <li>.${issue.createdAt}</li>
          </ul>
        </div>
        <div class="flex gap-3 pt-10 pl-5">
          ${issue.labels.map((label) => `<p class="${labelColour(label)} rounded-lg p-1">${label} </p>`).join("")}
        </div>
        <p class="pt-10 text-gray-500 pl-5">${issue.description }n</p>
        <div class="flex justify-between w-11/12 bg-slate-100 mx-auto px-5 mt-7 p-6">
          <div>
            <p class="text-gray-600 font-bold">Assignee:</p>
            <h4 class="font-bold ">${issue.assignee ? issue.assignee : "No Name"}</h4>
          </div>
          <div>
            <p class="font-bold text-gray-600">Priority:</p>
            <p class=" rounded-full p-4 ${getPriorityBadge(issue.priority)}">${issue.priority}</p>
          </div>
        </div>
`
    modalContainer.appendChild(modalHtml);
    document.getElementById('my_modal_5').showModal();
}
  
}




const manageSpinner = (load) => {
  if (load == true) {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('issues-container').classList.add('hidden');

  } else {
    document.getElementById('issues-container').classList.remove('hidden');
    document.getElementById('loading').classList.add('hidden')
  }
}
document.getElementById('btn-all').addEventListener("click", () => {
  manageSpinner(true);
  setTimeout(() => {
    const totalAll = document.getElementById('total-issues');
  totalAll.innerText = `50 Issues`;
  displayAllIssue(allIssues);
  
    
  },300);

});
document.getElementById('btn-open').addEventListener("click", () => {
  manageSpinner(true);
  setTimeout(() => {
    const openBtn = allIssues.filter((issues) => issues.status !== 'closed');
  const totalOpen = document.getElementById('total-issues');
  totalOpen.innerText=`44 Issues`
  displayAllIssue(openBtn);
  
  }, 300);
});
document.getElementById('btn-closed').addEventListener("click", () => {
  manageSpinner(true);
  setTimeout(() => {
    const closedBtn = allIssues.filter((closed) => closed.status !== 'open');
  const totalClosed = document.getElementById('total-issues');
  totalClosed.innerText=`6 Issues`

  displayAllIssue(closedBtn);
 },300)
  
});

loadAllIssue()
document.getElementById('search-btn').addEventListener('click', () => {
  const input = document.getElementById('input');
  const inputValue = input.value.trim().toLowerCase();
  console.log(inputValue);

  const issuesFilter = allIssues.filter((issue) => {
    const titleMatch = issue.title?.toLowerCase().includes(inputValue);
    const decMatch = issue.description?.toLowerCase().includes(inputValue);
    const statusMatch = issue.status?.toLowerCase().includes(inputValue);
    const priorityMatch = issue.priority?.toLowerCase().includes(inputValue);
    const autMatch = issue.author?.toLowerCase().includes(inputValue);
    const labelMatch = issue.labels?.some((label) => label.toLowerCase().includes(inputValue));
    return titleMatch || decMatch || statusMatch || priorityMatch || autMatch || labelMatch;

  })
  const totalIssue = document.getElementById('total-issues');
  totalIssue.innerText = `${issuesFilter.length} Issues`
      displayAllIssue(issuesFilter);
});


