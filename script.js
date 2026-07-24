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
  if (priority === 'low') return 'bg-gray-100 text-gray-500'
  if (priority === 'medium') return 'bg-yellow-100 text-yellow-500';
  if (priority === 'high') return 'bg-red-100 text-red-500';
  return 'bg-gray-100 text-gray-500'
  
}
const labelColour = (label) => {
  if (label === 'bug') return 'bg-red-100 text-red-500';
  if (label === 'help wanted') return 'bg-yellow-100 text-yellow-500';
  if (label === 'enhancement') return 'bg-green-100 text-green-500';
  if (label === 'good first issue') return 'bg-purple-100 text-purple-500';
  return 'bg-red-100 text-red-500';
}
const displayAllIssue = (issues) => {
  const issuesContainer = document.getElementById('issues-container');
  issuesContainer.innerHTML = "";
  issues.forEach((data) => {
    const issueDiv = document.createElement('div');
    issueDiv.innerHTML = `
     <div class="px-5 bg-[#FFFFFF] rounded-lg"> 
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
    issuesContainer.appendChild(issueDiv);
   
  })
  
}
document.getElementById('btn-all').addEventListener("click", () => {
  displayAllIssue(allIssues);

});
document.getElementById('btn-open').addEventListener("click", () => {
  const openBtn = allIssues.filter((issues) => issues.status !== 'closed');
  displayAllIssue(openBtn);
  
});
document.getElementById('btn-closed').addEventListener("click", () => {
  const closedBtn = allIssues.filter((closed) => closed.status !== 'open');

  displayAllIssue(closedBtn);
  
});


loadAllIssue();