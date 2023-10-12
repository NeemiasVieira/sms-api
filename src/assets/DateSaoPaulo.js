export class MyDate extends Date {
    constructor() {
        super();
        this.adjustTimezone();
    }

    adjustTimezone() {
        const offset = this.getTimezoneOffset();
        const offsetMilliseconds = offset * 60 * 1000; 
        this.setTime(this.getTime() - offsetMilliseconds);
    }

    toLocaleString() {
        const options = { timeZone: 'America/Sao_Paulo', hour12: false };
        return super.toLocaleString('pt-BR', options);
    }
}