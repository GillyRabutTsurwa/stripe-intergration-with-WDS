const button = document.querySelector("button");
button.addEventListener("click", () => {
  // Make request to server for url checkout page with data corresponding to items ie quantity
  fetch("/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // id and quantity of items going from client to server
      // user would likely use buttons, inputs etc to manipulate this. this is hard coded
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((json) => Promise.reject(json));
    })
    .then((sessionData) => {
      // NOTE: Kyle does destructuring here, but i want to see the contents of this object
      console.log(sessionData);
      window.location = sessionData.url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});

const appearance = {
  theme: "night",
  labels: "floating",
};

// Pass the appearance object to the Elements instance
const elements = stripe.elements({ clientSecret, appearance });
