export class Timer {

    constructor(element, years, months, days, hours, minutes, seconds) {
        this.element = document.querySelectorAll(element)
        this.deadline = new Date(years, months - 1, days, hours, minutes, seconds);
        this._interval;
        this.start();
        this.render(years = '0', months = '0', days = '0', hours = '0', minutes = '0', seconds = '0');
    }

    get isDateCorrect() {
        if (Date.parse(this.deadline) < new Date().getTime()) {
            return false;
        }
        return true
    }

    start() {
        this._interval = window.setInterval(() => {
            this.isDateCorrect == true ? this.diff() : this.stop()
        }, 1000)
    }

    stop() {
        window.clearInterval(this._interval)
    }

    diff = () => {

        let diffTime = Math.floor(Date.parse(this.deadline) - new Date().getTime());

        let years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        diffTime = diffTime % (1000 * 60 * 60 * 24 * 365);

        let months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
        diffTime = diffTime % (1000 * 60 * 60 * 24 * 30)

        let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        diffTime = diffTime % (1000 * 60 * 60 * 24);


        let hours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime = diffTime % (1000 * 60 * 60)

        let minutes = Math.floor(diffTime / (1000 * 60));
        diffTime = diffTime % (1000 * 60);

        let seconds = Math.floor(diffTime / 1000);
        diffTime = diffTime % 1000;

        this.render(years, months, days, hours, minutes, seconds)
        if (minutes < 5) {
            document.querySelectorAll('.item__time').forEach((item) => {
                item.style.color = 'red'
            })
        }
    }


    render(years, months, days, hours, minutes, seconds) {
        this.element.forEach((el) => {
            el.innerHTML = `
                <div class="deadline"> 
                   Final Day 
${this.deadline.getFullYear()}/${this.deadline.getMonth()}/${this.deadline.getDate()}
${this.deadline.getHours()}:
${this.deadline.getMinutes()}:
${this.deadline.getSeconds()}
                </div>
                <div class="container-wrapp">
                    <div class="timer__item"> <div class="item__time">${years < 9 ? '0' + years : years}</div>Years </div> 
                    <div class="timer__item">  <div class="item__time">${months < 9 ? '0' + months : months}</div> Months</div> 
                    <div class="timer__item"> <div class="item__time"> ${days < 9 ? '0' + days : days} </div> Days</div>  
                    <div class="timer__item"> <div class="item__time"> ${hours < 9 ? '0' + hours : hours} </div> Hours</div> :
                    <div class="timer__item"> <div class="item__time">${minutes < 9 ? '0' + minutes : minutes} </div> Minutes</div> :
                    <div class="timer__item"> <div class="item__time"> ${seconds < 9 ? '0' + seconds : seconds} </div>Seconds</div>
                </div>
                `
        })
    }

}

