class Counter {
  constructor(input) {
    this.input = input;
    this.interval;
  }

  
  init() {

   
    const watchBtn = document.querySelector(".management");
    watchBtn.addEventListener("click", (event) => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) return;
      
      if (event.target.id === "startCount") this.startCount();
      if (event.target.id === "pauseCount") this.pauseCount();
      if (event.target.id === "resetCount") this.resetCount();
    });


  }
	startCount() {
    let minuteElement = document.querySelector(".minute");
    let secondsElement = document.querySelector(".seconds");
    let current = this.input.value;

    this.interval = setInterval(() => {

      if (current > 0) {
        current--;
        if (current == 0) {
          alert("Time is up!");
        }
        secondsElement.innerHTML = current < 10 ? "0" + current : current;
      } else {
        alert('Set the time!')
        this.resetCount();
      }
    }, 1000);
  }
  resetCount() { 
    clearInterval(this.interval);
    // let minuteElement = document.querySelector(".minute");
    let secondsElement = document.querySelector(".seconds");
    // minuteElement.innerText = "00";
    secondsElement.innerText = "00";
    this.input.value = 0;
  }
  pauseCount() {
    clearInterval(this.interval);
    this.current = ''
     let secondsElement = document.querySelector(".seconds");
    this.input.value = parseInt(secondsElement.innerText);
  }
}
