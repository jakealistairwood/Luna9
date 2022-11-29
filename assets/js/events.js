class BatteryEvents {
    constructor(eventDetails) {
        ({
            title: this.title,
            name: this.name,
            id: this.id,
            inventedBy: this.inventedBy,
            location: this.location,
            voltageOutput: this.voltageOutput,
            date: this.date,
            additionalInfo: this.additionalInfo,
            infoDisplayed: this.infoDisplayed,
            imgInfo: this.imgInfo
        } = eventDetails)
    }
    renderEvent() {
        return `<div class="battery-timeline__event">
            <div class="battery-timeline__img-container">
                <img src="${this.imgInfo.src}" alt="${this.imgInfo.alt}" />
            </div>
            <div class="battery-timeline__info">
                <div class="battery-timeline__date">
                    ${Array.from(String(this.date)).map(char => {
                        return `<span>${char}</span>`
                    }).join("")}
                </div>
                <h3>${this.title}</h3>
                <ul>
                    <li>Name:<strong>${this.name}</strong></li>
                    <li>Invented by:<strong>${this.inventedBy}</strong></li>
                    <li>In:<strong>${this.location}</strong></li>
                    <li>Voltage:<strong>${this.voltageOutput}</strong></li>
                </ul>
                <div class="battery-timeline__additional-info additional-info--${this.id}">
                    <p>${this.additionalInfo}</p>
                </div>
                <button class="battery-timeline__btn btn--${this.id}">${this.infoDisplayed ? "Close": "Learn More"}</button>
            </div>
        </div>`;
    }
}

export default BatteryEvents;