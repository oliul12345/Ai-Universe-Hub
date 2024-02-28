const loadAiHub = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiHub = data.data.tools;
  displayAiHub(aiHub);
};

//////    show the ai hub in the website
const displayAiHub = (aiHub) => {
  const getHUnContainerById = document.getElementById("ai-container");
/////   slice the card amd show the see all button
const getSeeAllButton = document.getElementById('seeAll-btn')
  aiHub = aiHub.slice(0,6)
 if(aiHub.length > 5){
    getSeeAllButton.classList.remove('hidden')
 }
 else{
    getSeeAllButton.classList.add('hidden')
 }
  aiHub.map((hub) => {
    console.log( hub.id);
    const div = document.createElement("div");
    div.innerHTML = `
            

<div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <img class="rounded-t-lg h-[250px] w-full" src=${hub.image} alt="" />

<div class="p-5">
        <ol class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Features
        <li class = 'text-xl font-normal '>1. ${hub.features[0]}</li>
        <li class = 'text-xl font-normal '>2. ${hub.features[1]}</li>
        <li class = 'text-xl font-normal '>3. ${hub.features[2]}</li>
        </ol>

    <hr class='my-8'>
</div>
<div class='flex justify-between mb-5 p-5'>
<div>
    <p class='text-xl font-bold'>${hub.name}</p>
    <p>published Date : ${hub.published_in}</p>
</div>

<button  onclick="loadSingleIdData('${hub.id}'); my_modal_1.showModal()" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Read more
 <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>
</div>
</div>

        `
    getHUnContainerById.appendChild(div)

  });
};

const loadSingleIdData = async(id) => {
    console.log( id)
    const loadSingleData = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const res = await loadSingleData.json();
    const data = res.data;
    console.log('clicked success',data)
    displayDetails(data)
}

////    display the details data in using the modal
const displayDetails =  (data) => {
    const getIdModal = document.getElementById('my_modal_1')
    getIdModal.innerHTML = ''
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="modal-box  w-11/12 max-w-5xl">
            <div class='w-full gap-5 flex justify-between'>
                <div class='md:w-1/2 border-red-600'>
                  <img src=${data.image_link[0]} alt="">
                  <div class="">
                  <p class='text-xl font-bold'>Features</p>
                  <p> ${data.features[1].feature_name}</p>
                  <p> ${data.features[2].feature_name}</p>
                  <p> ${data.features[3].feature_name}</p>
                  </div>
                </div>
                 <div class='md:w-1/2 border-red-600'>
                     <ol class="py-4">${data.integrations }
                      <li>${data.integrations[1]}</li>
                     </ol>
                     <p class="">${data.description}</p>
                     <p class="py-4 text-xl">Tool name : ${data.tool_name}</p>
                     <p class="">Description : ${data.use_cases[0].description}</p>
                       <h3 class="font-bold text-lg">Pricing : ${data.pricing[1].price}</h3>
                       <p class="py-4">${data.accuracy.description ? data.accuracy.description : 'no data found'}</p>
                       <p class="">${data.accuracy.score ? data.accuracy.score : 'no data found'}</p>
                      
                    </div>
            </div>
            <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
    </div>
  `;
  getIdModal.appendChild(div)
}

loadAiHub();
