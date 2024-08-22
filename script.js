const apiToken = "6c400417dbac6106f22a1f309c5b009e9c4e5274";
const form = document.querySelector("#test");
const loader = document.querySelector(".loading");
const success = document.querySelector(".success");
const successLink = document.querySelector(".success-link");

// таймер для имитации загрузки

setTimeout(() => {
  loader.style.display = "none";
  form.style.display = "flex";
}, 3000);

//  слушатель событей для сабмита формы

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //   получаю поля формы
  const formData = new FormData(form);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const jobType = formData.get("jobType");
  const jobSearch = formData.get("jobSearch");
  const address = formData.get("address");
  const city = formData.get("city");
  const zipCode = formData.get("zipCode");
  const date = formData.get("date");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const testSelect = formData.get("testSelect");

  //   тело запроса

  const dealData = {
    title: `${firstName}'s deal`,
    "057914ed45802d57e21ef4903de22c8cf0834fd7": firstName,
    e400dd97452bb35efc9513b675a256548b5c88eb: lastName,
    ec713e9c2359d9c26d9fb6b6327c2231ecd57b8a: phone,
    e194719f03dcdf28b740ccf5f590c26b12377eff: email,
  };

  //   отправка запроса

  try {
    const response = await fetch(
      `https://api.pipedrive.com/v1/deals?api_token=${apiToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dealData),
      }
    );

    if (!response.ok) {
      throw new Error(`err: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    // если запрос удачный то отображаю сообщение об успешной операции

    form.style.display = "none";
    success.style.display = "flex";
  } catch (error) {
    console.error("Error", error);
  }
});

// перезагрузка страници при клике на сообщение об успехе

successLink.addEventListener("click", () => {
  window.parent.postMessage("reloadParent", "*");
});
