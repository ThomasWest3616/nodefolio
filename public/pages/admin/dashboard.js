(async () => {
  let response = await fetch("/projects");
  let projects = await response.json();

  const projectsWrapperDiv = document.getElementById("projects-wrapper");

  projects.map(project => {
      const projectDiv = document.createElement("div");
      projectDiv.innerHTML = `
      <form action="/update" method="post" class="w-full max-w-lg mx-auto">
      <input type="hidden" value=${project.id} name="id">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="
          block
          uppercase
          tracking-wide
          text-gray-700 text-xs
          font-bold
          mb-2
        "
        for="grid-first-name"
      >
        Project name
      </label>
      <input
        class="
          appearance-none
          block
          w-full
          bg-gray-200
          text-gray-700
          rounded
          py-3
          px-4
          mb-3
          leading-tight
          focus:outline-none focus:bg-white
        "
        value=${project.name}
        name="name"
        class=""
        type="text"
      />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label
        class="
          block
          uppercase
          tracking-wide
          text-gray-700 text-xs
          font-bold
          mb-2
        "
        for="grid-last-name"
      >
        description
      </label>
      <input
        class="
          appearance-none
          block
          w-full
          bg-gray-200
          text-gray-700
          border border-gray-200
          rounded
          py-3
          px-4
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        id="grid-last-name"
        name="description"
        value=${project.description}
        class=""
        type="text"
      />
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label
        class="
          block
          uppercase
          tracking-wide
          text-gray-700 text-xs
          font-bold
          mb-2
        "
        for="grid-last-name"
      >
        linknology
      </label>
      <input
        class="
          appearance-none
          block
          w-full
          bg-gray-200
          text-gray-700
          border border-gray-200
          rounded
          py-3
          px-4
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        name="link"
        type="text"
        value=${project.link}
      />
    </div>
  </div>
  <button
    class="
      bg-blue-500
      hover:bg-blue-700
      text-white text-xl
      font-bold
      py-4
      px-4
      rounded
      w-64
      focus:outline-none focus:shadow-outline
    "
  >
    Update
  </button>
</form>

      <form
      class="mt-5"
      action="/delete/${project.id}"
      method="get">

      <button
      class="
      bg-red-500
      hover:bg-red-700
      text-white text-xl
      font-bold
      py-4
      px-4
      rounded
      w-64
      focus:outline-none focus:shadow-outline
      ">
          Delete
      </button> 
      </form>

      
      <br/><br/>
      
  `;

      projectsWrapperDiv.appendChild(projectDiv);

  });


})();